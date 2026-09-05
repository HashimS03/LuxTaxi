import { NextResponse } from "next/server";
import { sendBookingEmails } from "@/lib/send-booking-email";
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

    await sendBookingEmails(body, { paid: false });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking email error:", error);
    return NextResponse.json(
      { error: "Failed to send booking emails" },
      { status: 500 }
    );
  }
}
