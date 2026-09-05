import { NextResponse } from "next/server";
import { sendBookingEmails } from "@/lib/send-booking-email";
import { computeServerFare, type FareResult } from "@/lib/compute-fare";
import type { BookingRequest } from "@/lib/booking-types";

export async function POST(request: Request) {
  try {
    const body: BookingRequest = await request.json();
    const { name, email, phone, vehicle, date, time } = body;

    if (!name || !email || !phone || !vehicle || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Best-effort: an accurate, surcharge-aware fare for the email. No
    // charge happens either way, so fall back to the client's own estimate
    // if this can't be computed (e.g. an address that won't geocode).
    let fare: FareResult | undefined;
    try {
      fare = await computeServerFare(body);
    } catch {
      fare = undefined;
    }

    await sendBookingEmails(body, { paid: false, fare });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking email error:", error);
    return NextResponse.json(
      { error: "Failed to send booking emails" },
      { status: 500 }
    );
  }
}
