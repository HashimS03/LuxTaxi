import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendBookingEmails } from "@/lib/send-booking-email";
import type { BookingRequest } from "@/lib/booking-types";

// Best-effort de-dupe for webhook retries within a single warm serverless
// instance. Not durable across cold starts — acceptable here since Resend
// re-sending a confirmation email is a minor inconvenience, not a charge.
const processedSessions = new Set<string>();

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!secret || !stripeKey) {
    console.error("Stripe webhook received but STRIPE_WEBHOOK_SECRET/STRIPE_SECRET_KEY is not configured.");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const stripe = new Stripe(stripeKey);
  const signature = request.headers.get("stripe-signature");
  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    if (!signature) throw new Error("Missing stripe-signature header");
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (!processedSessions.has(session.id)) {
      processedSessions.add(session.id);

      const m = session.metadata ?? {};
      const booking: BookingRequest = {
        name: m.name ?? "",
        email: m.email ?? session.customer_email ?? "",
        phone: m.phone ?? "",
        vehicle: (m.vehicle as BookingRequest["vehicle"]) ?? "four",
        rateType: (m.rateType as BookingRequest["rateType"]) || undefined,
        fixedOption: (m.fixedOption as BookingRequest["fixedOption"]) || undefined,
        hours: m.hours ? Number(m.hours) : undefined,
        airportDirection: (m.airportDirection as BookingRequest["airportDirection"]) || undefined,
        pickup: m.pickup || undefined,
        dropoff: m.dropoff || undefined,
        date: m.date ?? "",
        time: m.time ?? "",
        notes: m.notes || undefined,
      };
      const amount = Number(m.amountKr) || (session.amount_total ?? 0) / 100;

      try {
        await sendBookingEmails(booking, { paid: true, amount });
      } catch (err) {
        console.error("Failed to send paid-booking confirmation emails:", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
