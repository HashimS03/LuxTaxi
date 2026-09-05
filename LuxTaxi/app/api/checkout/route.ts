import { NextResponse } from "next/server";
import Stripe from "stripe";
import { computeServerFare } from "@/lib/compute-fare";
import { vehicleLabels } from "@/lib/booking-summary";
import type { BookingRequest } from "@/lib/booking-types";

function truncate(value: string | undefined, max: number) {
  if (!value) return "";
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Online payment isn't configured yet. Please choose Pay Later instead." },
      { status: 503 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const body: BookingRequest = await request.json();
    const { name, email, phone, vehicle, date, time } = body;

    if (!name || !email || !phone || !vehicle || !date || !time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const fare = await computeServerFare(body);
    const origin = request.headers.get("origin") || new URL(request.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "nok",
            unit_amount: Math.round(fare.amount * 100),
            product_data: {
              name: `Oslo Limousine — ${vehicleLabels[vehicle]}`,
              description: `Booking for ${date} at ${time}`,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?payment=cancelled#booking`,
      metadata: {
        name: truncate(name, 200),
        email: truncate(email, 200),
        phone: truncate(phone, 100),
        vehicle,
        rateType: body.rateType ?? "",
        fixedOption: body.fixedOption ?? "",
        hours: body.hours != null ? String(body.hours) : "",
        airportDirection: body.airportDirection ?? "",
        pickup: truncate(body.pickup, 490),
        dropoff: truncate(body.dropoff, 490),
        date,
        time,
        notes: truncate(body.notes, 490),
        amountKr: String(fare.amount),
        surchargeLabel: fare.surchargeLabel ?? "",
        distanceFallback: fare.distanceFallback ? "true" : "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    const message = error instanceof Error ? error.message : "Failed to start checkout.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
