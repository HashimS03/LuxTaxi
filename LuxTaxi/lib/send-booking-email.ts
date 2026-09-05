import { Resend } from "resend";
import type { BookingRequest, BookingSummaryRow } from "@/lib/booking-types";
import { buildSummaryRows, vehicleLabels } from "@/lib/booking-summary";
import type { FareResult } from "@/lib/compute-fare";

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = process.env.OWNER_EMAIL!;
const FROM_ADDRESS = "bookings@oslolimousine.com";
const REPLY_TO_ADDRESS = "theoslolimousine@gmail.com";

function renderRows(rows: BookingSummaryRow[]) {
  return rows
    .map(
      (row) => `
      <tr>
        <td style="padding: 8px 0; color: #6b7a8d; width: 160px; vertical-align: top;">${row.label}:</td>
        <td style="padding: 8px 0; color: #d4dce8;">${row.value}</td>
      </tr>`
    )
    .join("");
}

export async function sendBookingEmails(
  booking: BookingRequest,
  payment: { paid: true; fare: FareResult } | { paid: false; fare?: FareResult }
) {
  const { name, email, phone, vehicle, date, time, notes } = booking;

  const paymentRow: BookingSummaryRow = payment.paid
    ? { label: "Payment", value: `Paid online (Stripe) — ${payment.fare.amount.toLocaleString("nb-NO")} kr` }
    : { label: "Payment", value: "Pay later — to be invoiced before the ride" };

  const allRows = [
    { label: "Vehicle", value: vehicleLabels[vehicle] },
    ...buildSummaryRows(booking, payment.paid ? payment.fare : payment.fare ?? booking.estimatedFare),
    { label: "Date", value: date },
    { label: "Time", value: time },
    paymentRow,
    ...(notes ? [{ label: "Notes", value: notes }] : []),
  ];

  await resend.emails.send({
    from: `Oslo Limousine Bookings <${FROM_ADDRESS}>`,
    to: OWNER_EMAIL,
    replyTo: REPLY_TO_ADDRESS,
    subject: `New Booking${payment.paid ? " (Paid)" : ""} from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0e17; color: #d4dce8; padding: 32px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #1cc9d4; font-size: 28px; margin: 0;">Oslo Limousine</h1>
          <p style="color: #6b7a8d; font-size: 14px; margin-top: 4px;">New Booking Request</p>
        </div>

        <div style="background-color: #131826; padding: 24px; border-radius: 8px; border: 1px solid #1e2640;">
          <h2 style="color: #1cc9d4; font-size: 18px; margin-top: 0;">Customer Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7a8d; width: 160px;">Name:</td><td style="padding: 8px 0; color: #d4dce8;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7a8d;">Email:</td><td style="padding: 8px 0; color: #d4dce8;">${email}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7a8d;">Phone:</td><td style="padding: 8px 0; color: #d4dce8;">${phone}</td></tr>
          </table>
        </div>

        <div style="background-color: #131826; padding: 24px; border-radius: 8px; border: 1px solid #1e2640; margin-top: 16px;">
          <h2 style="color: #1cc9d4; font-size: 18px; margin-top: 0;">Trip Details</h2>
          <table style="width: 100%; border-collapse: collapse;">${renderRows(allRows)}</table>
        </div>

        <p style="color: #6b7a8d; font-size: 12px; text-align: center; margin-top: 24px;">
          Please respond to this booking request as soon as possible.
        </p>
      </div>
    `,
  });

  await resend.emails.send({
    from: `Oslo Limousine <${FROM_ADDRESS}>`,
    to: email,
    replyTo: REPLY_TO_ADDRESS,
    subject: payment.paid
      ? "Your Oslo Limousine Booking is Confirmed"
      : "Your Oslo Limousine Booking Request Received",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0e17; color: #d4dce8; padding: 32px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #1cc9d4; font-size: 28px; margin: 0;">Oslo Limousine</h1>
          <p style="color: #6b7a8d; font-size: 14px; margin-top: 4px;">Premium Transport Services</p>
        </div>

        <div style="text-align: center; margin-bottom: 32px;">
          <div style="display: inline-block; background-color: rgba(28, 201, 212, 0.1); border-radius: 50%; padding: 16px; margin-bottom: 16px;">
            <span style="font-size: 32px;">&#10003;</span>
          </div>
          <h2 style="color: #ffffff; font-size: 22px; margin: 0;">Thank you, ${name}!</h2>
          <p style="color: #6b7a8d; margin-top: 8px;">
            ${payment.paid ? "Your payment was received and your ride is booked." : "We have received your booking request."}
          </p>
        </div>

        <div style="background-color: #131826; padding: 24px; border-radius: 8px; border: 1px solid #1e2640;">
          <h3 style="color: #1cc9d4; font-size: 16px; margin-top: 0;">Your Trip Summary</h3>
          <table style="width: 100%; border-collapse: collapse;">${renderRows(allRows)}</table>
        </div>

        <div style="text-align: center; margin-top: 24px; padding: 20px; background-color: #131826; border-radius: 8px; border: 1px solid #1e2640;">
          <p style="color: #d4dce8; margin: 0; font-size: 15px;">
            ${
              payment.paid
                ? "Our team will confirm your chauffeur details closer to your ride."
                : "Our team will review your request and get back to you <strong style=\"color: #1cc9d4;\">within 30 minutes</strong> during business hours."
            }
          </p>
        </div>

        ${
          payment.paid
            ? ""
            : `<div style="margin-top: 16px; padding: 20px; background-color: #1a1f2e; border-radius: 8px; border: 1px solid #2a3548;">
                <h3 style="color: #f5a623; font-size: 14px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 1px;">Important Information</h3>
                <ul style="color: #d4dce8; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.8;">
                  <li>Bookings must be made at least <strong>24 hours</strong> before the scheduled ride.</li>
                  <li>Payment must be completed at least <strong>5 hours</strong> before your ride.</li>
                </ul>
              </div>`
        }

        <div style="text-align: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid #1e2640;">
          <p style="color: #6b7a8d; font-size: 13px; margin: 0;">
            If you have any urgent questions, call us at <a href="tel:+4748420389" style="color: #1cc9d4; text-decoration: none;">+47 484 20 389</a>
          </p>
          <p style="color: #3d4a5c; font-size: 11px; margin-top: 12px;">
            &copy; ${new Date().getFullYear()} Oslo Limousine. All rights reserved.
          </p>
        </div>
      </div>
    `,
  });
}
