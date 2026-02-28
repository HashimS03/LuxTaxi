import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = process.env.OWNER_EMAIL!;

interface BookingData {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  passengerCount?: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  notes?: string;
}

const vehicleLabels: Record<string, string> = {
  sedan: "Luxury Sedan (up to 4 passengers)",
  van: "Luxury Van (up to 8 passengers)",
  minibus: "Minibus (up to 15 passengers)",
  custom: "Custom Order (16+ passengers)",
};

export async function POST(request: Request) {
  try {
    const body: BookingData = await request.json();

    const { name, email, phone, vehicle, passengerCount, pickup, dropoff, date, time, notes } = body;

    if (!name || !email || !phone || !vehicle || !pickup || !dropoff || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const vehicleLabel = vehicleLabels[vehicle] || vehicle;
    const customInfo = vehicle === "custom" && passengerCount
      ? `\nNumber of Passengers: ${passengerCount}`
      : "";

    // Email to the owner with booking details
    await resend.emails.send({
      from: "LuxTaxi Bookings <onboarding@resend.dev>",
      to: OWNER_EMAIL,
      subject: `New Booking Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0e17; color: #d4dce8; padding: 32px; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #1cc9d4; font-size: 28px; margin: 0;">LuxTaxi</h1>
            <p style="color: #6b7a8d; font-size: 14px; margin-top: 4px;">New Booking Request</p>
          </div>
          
          <div style="background-color: #131826; padding: 24px; border-radius: 8px; border: 1px solid #1e2640;">
            <h2 style="color: #1cc9d4; font-size: 18px; margin-top: 0;">Customer Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7a8d; width: 140px;">Name:</td>
                <td style="padding: 8px 0; color: #d4dce8;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7a8d;">Email:</td>
                <td style="padding: 8px 0; color: #d4dce8;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7a8d;">Phone:</td>
                <td style="padding: 8px 0; color: #d4dce8;">${phone}</td>
              </tr>
            </table>
          </div>

          <div style="background-color: #131826; padding: 24px; border-radius: 8px; border: 1px solid #1e2640; margin-top: 16px;">
            <h2 style="color: #1cc9d4; font-size: 18px; margin-top: 0;">Trip Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7a8d; width: 140px;">Vehicle:</td>
                <td style="padding: 8px 0; color: #d4dce8;">${vehicleLabel}${customInfo ? `<br/><strong>${passengerCount} passengers</strong>` : ""}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7a8d;">Pickup:</td>
                <td style="padding: 8px 0; color: #d4dce8;">${pickup}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7a8d;">Drop-off:</td>
                <td style="padding: 8px 0; color: #d4dce8;">${dropoff}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7a8d;">Date:</td>
                <td style="padding: 8px 0; color: #d4dce8;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7a8d;">Time:</td>
                <td style="padding: 8px 0; color: #d4dce8;">${time}</td>
              </tr>
              ${notes ? `
              <tr>
                <td style="padding: 8px 0; color: #6b7a8d; vertical-align: top;">Notes:</td>
                <td style="padding: 8px 0; color: #d4dce8;">${notes}</td>
              </tr>
              ` : ""}
            </table>
          </div>

          <p style="color: #6b7a8d; font-size: 12px; text-align: center; margin-top: 24px;">
            Please respond to this booking request as soon as possible.
          </p>
        </div>
      `,
    });

    // Confirmation email to the customer
    await resend.emails.send({
      from: "LuxTaxi <onboarding@resend.dev>",
      to: email,
      subject: "Your LuxTaxi Booking Request Received",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0e17; color: #d4dce8; padding: 32px; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #1cc9d4; font-size: 28px; margin: 0;">LuxTaxi</h1>
            <p style="color: #6b7a8d; font-size: 14px; margin-top: 4px;">Premium Transport Services</p>
          </div>
          
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="display: inline-block; background-color: rgba(28, 201, 212, 0.1); border-radius: 50%; padding: 16px; margin-bottom: 16px;">
              <span style="font-size: 32px;">&#10003;</span>
            </div>
            <h2 style="color: #ffffff; font-size: 22px; margin: 0;">Thank you, ${name}!</h2>
            <p style="color: #6b7a8d; margin-top: 8px;">We have received your booking request.</p>
          </div>

          <div style="background-color: #131826; padding: 24px; border-radius: 8px; border: 1px solid #1e2640;">
            <h3 style="color: #1cc9d4; font-size: 16px; margin-top: 0;">Your Trip Summary</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7a8d; width: 120px;">Vehicle:</td>
                <td style="padding: 8px 0; color: #d4dce8;">${vehicleLabel}</td>
              </tr>
              ${customInfo ? `
              <tr>
                <td style="padding: 8px 0; color: #6b7a8d;">Passengers:</td>
                <td style="padding: 8px 0; color: #d4dce8;">${passengerCount}</td>
              </tr>
              ` : ""}
              <tr>
                <td style="padding: 8px 0; color: #6b7a8d;">Pickup:</td>
                <td style="padding: 8px 0; color: #d4dce8;">${pickup}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7a8d;">Drop-off:</td>
                <td style="padding: 8px 0; color: #d4dce8;">${dropoff}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7a8d;">Date:</td>
                <td style="padding: 8px 0; color: #d4dce8;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7a8d;">Time:</td>
                <td style="padding: 8px 0; color: #d4dce8;">${time}</td>
              </tr>
            </table>
          </div>

          <div style="text-align: center; margin-top: 24px; padding: 20px; background-color: #131826; border-radius: 8px; border: 1px solid #1e2640;">
            <p style="color: #d4dce8; margin: 0; font-size: 15px;">
              Our team will review your request and get back to you <strong style="color: #1cc9d4;">within 30 minutes</strong> during business hours.
            </p>
          </div>

          <div style="text-align: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid #1e2640;">
            <p style="color: #6b7a8d; font-size: 13px; margin: 0;">
              If you have any urgent questions, call us at <a href="tel:+1234567890" style="color: #1cc9d4; text-decoration: none;">+1 (234) 567-890</a>
            </p>
            <p style="color: #3d4a5c; font-size: 11px; margin-top: 12px;">
              &copy; ${new Date().getFullYear()} LuxTaxi. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking email error:", error);
    return NextResponse.json(
      { error: "Failed to send booking emails" },
      { status: 500 }
    );
  }
}
