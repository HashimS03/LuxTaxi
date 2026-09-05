import { Resend } from "resend";
import type { BookingRequest, BookingSummaryRow } from "@/lib/booking-types";
import { buildSummaryRows, vehicleLabels } from "@/lib/booking-summary";
import type { FareResult } from "@/lib/compute-fare";

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = process.env.OWNER_EMAIL!;
const FROM_ADDRESS = "bookings@oslolimousine.com";
const REPLY_TO_ADDRESS = "theoslolimousine@gmail.com";

// Mirrors the site's own palette (app/globals.css) so the emails feel like
// part of the same brand instead of a generic transactional template.
const COLOR = {
  page: "#F4EFE6", // --background
  card: "#FFFFFF", // --card
  border: "#E6DECF", // --border
  divider: "#EFE9DE",
  foreground: "#1A1D24", // --foreground
  muted: "#6B7280", // --muted-foreground
  mutedSoft: "#9CA3AF",
  accent: "#D9622B", // --accent
  accentSoft: "rgba(217, 98, 43, 0.12)",
};

const SERIF = "Georgia, 'Times New Roman', Times, serif";
const SANS = "Arial, Helvetica, sans-serif";

function renderRows(rows: BookingSummaryRow[]) {
  return rows
    .map(
      (row) => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid ${COLOR.divider}; color: ${COLOR.muted}; width: 150px; font-size: 14px; vertical-align: top;">${row.label}</td>
        <td style="padding: 10px 0; border-bottom: 1px solid ${COLOR.divider}; color: ${COLOR.foreground}; font-size: 14px;">${row.value}</td>
      </tr>`
    )
    .join("");
}

function eyebrow(text: string) {
  return `<p style="color: ${COLOR.accent}; font-size: 11px; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase; margin: 0 0 16px;">${text}</p>`;
}

function card(inner: string, extra = "") {
  return `<div style="background-color: ${COLOR.card}; border: 1px solid ${COLOR.border}; border-radius: 6px; padding: 24px; ${extra}">${inner}</div>`;
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
      <div style="font-family: ${SANS}; max-width: 600px; margin: 0 auto; background-color: ${COLOR.page}; color: ${COLOR.foreground}; padding: 40px 32px;">
        <div style="height: 4px; width: 48px; background-color: ${COLOR.accent}; border-radius: 2px; margin: 0 auto 28px;"></div>

        <div style="text-align: center; margin-bottom: 32px;">
          <p style="color: ${COLOR.accent}; font-size: 11px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 10px;">New Booking Request</p>
          <h1 style="font-family: ${SERIF}; color: ${COLOR.foreground}; font-size: 26px; font-weight: 600; margin: 0;">Oslo Limousine</h1>
        </div>

        ${card(`
          ${eyebrow("Customer Details")}
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid ${COLOR.divider}; color: ${COLOR.muted}; width: 150px; font-size: 14px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid ${COLOR.divider}; color: ${COLOR.foreground}; font-size: 14px;">${name}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid ${COLOR.divider}; color: ${COLOR.muted}; font-size: 14px;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid ${COLOR.divider}; color: ${COLOR.foreground}; font-size: 14px;">${email}</td></tr>
            <tr><td style="padding: 10px 0; color: ${COLOR.muted}; font-size: 14px;">Phone</td><td style="padding: 10px 0; color: ${COLOR.foreground}; font-size: 14px;">${phone}</td></tr>
          </table>
        `)}

        <div style="height: 16px;"></div>

        ${card(`
          ${eyebrow("Trip Details")}
          <table style="width: 100%; border-collapse: collapse;">${renderRows(allRows)}</table>
        `)}

        <p style="color: ${COLOR.muted}; font-size: 12px; text-align: center; margin-top: 28px;">
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
      <div style="font-family: ${SANS}; max-width: 600px; margin: 0 auto; background-color: ${COLOR.page}; color: ${COLOR.foreground}; padding: 40px 32px;">
        <div style="height: 4px; width: 48px; background-color: ${COLOR.accent}; border-radius: 2px; margin: 0 auto 28px;"></div>

        <div style="text-align: center; margin-bottom: 4px;">
          <h1 style="font-family: ${SERIF}; color: ${COLOR.foreground}; font-size: 24px; font-weight: 600; margin: 0 0 6px;">Oslo Limousine</h1>
          <p style="color: ${COLOR.muted}; font-size: 11px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin: 0;">Premium Transport Services</p>
        </div>

        <div style="text-align: center; margin: 32px 0 28px;">
          <div style="display: inline-block; width: 56px; height: 56px; line-height: 56px; background-color: ${COLOR.accentSoft}; border-radius: 50%; text-align: center; margin-bottom: 16px;">
            <span style="font-size: 24px; color: ${COLOR.accent};">&#10003;</span>
          </div>
          <h2 style="font-family: ${SERIF}; color: ${COLOR.foreground}; font-size: 22px; font-weight: 600; margin: 0 0 8px;">Thank you, ${name}!</h2>
          <p style="color: ${COLOR.muted}; font-size: 14px; line-height: 1.6; margin: 0 auto; max-width: 380px;">
            ${payment.paid ? "Your payment was received and your ride is booked." : "We have received your booking request."}
          </p>
        </div>

        ${card(`
          ${eyebrow("Your Trip Summary")}
          <table style="width: 100%; border-collapse: collapse;">${renderRows(allRows)}</table>
        `)}

        <div style="height: 16px;"></div>

        ${card(
          `<p style="color: ${COLOR.foreground}; font-size: 14px; line-height: 1.6; margin: 0; text-align: center;">
            ${
              payment.paid
                ? "Our team will confirm your chauffeur details closer to your ride."
                : `Our team will review your request and get back to you <strong style="color: ${COLOR.accent};">within 30 minutes</strong> during business hours.`
            }
          </p>`
        )}

        ${
          payment.paid
            ? ""
            : `<div style="height: 16px;"></div>
              ${card(`
                <p style="color: ${COLOR.accent}; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Important Information</p>
                <ul style="color: ${COLOR.foreground}; font-size: 13px; margin: 0; padding-left: 18px; line-height: 1.9;">
                  <li>Bookings must be made at least <strong>24 hours</strong> before the scheduled ride.</li>
                  <li>Payment must be completed at least <strong>5 hours</strong> before your ride.</li>
                </ul>
              `)}`
        }

        <div style="text-align: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid ${COLOR.border};">
          <p style="color: ${COLOR.muted}; font-size: 13px; margin: 0;">
            If you have any urgent questions, call us at <a href="tel:+4748420389" style="color: ${COLOR.accent}; text-decoration: none; font-weight: bold;">+47 484 20 389</a>
          </p>
          <p style="color: ${COLOR.mutedSoft}; font-size: 11px; margin-top: 12px;">
            &copy; ${new Date().getFullYear()} Oslo Limousine. All rights reserved.
          </p>
        </div>
      </div>
    `,
  });
}
