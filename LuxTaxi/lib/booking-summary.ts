import { kr } from "@/lib/pricing";
import type { BookingRequest, BookingSummaryRow } from "@/lib/booking-types";

export const vehicleLabels: Record<BookingRequest["vehicle"], string> = {
  luxury: "Luxury Sedan (up to 4 passengers)",
  four: "4 Seats — Sedan",
  seven: "7 Seats — Van",
  sixteen: "16 Seats — Minibus",
  sixteenPlus: "16+ Seats — Custom Quote",
};

const airportDirectionLabels: Record<NonNullable<BookingRequest["airportDirection"]>, string> = {
  fromAirport: "From Gardemoen to Oslo",
  toAirport: "From Oslo to Gardemoen",
};

/** Builds the (English) label/value rows shown in confirmation emails, from validated request fields. */
export function buildSummaryRows(req: BookingRequest, fare?: number): BookingSummaryRow[] {
  const rows: BookingSummaryRow[] = [];

  if (req.vehicle === "sixteenPlus") {
    if (req.passengerCount) rows.push({ label: "Passengers", value: req.passengerCount });
    if (req.pickup) rows.push({ label: "Pickup", value: req.pickup });
    if (req.dropoff) rows.push({ label: "Drop-off", value: req.dropoff });
    return rows;
  }

  if (req.rateType === "fixed") {
    if (req.fixedOption === "hourly") {
      rows.push({ label: "Booking Type", value: "Hourly Charter" });
      rows.push({ label: "Duration", value: `${req.hours ?? "?"} hour(s)` });
      if (req.pickup) rows.push({ label: "Pickup", value: req.pickup });
    } else {
      rows.push({ label: "Booking Type", value: "Gardemoen Airport Transfer" });
      if (req.airportDirection) {
        rows.push({ label: "Direction", value: airportDirectionLabels[req.airportDirection] });
      }
      if (req.pickup) rows.push({ label: "Pickup", value: req.pickup });
      if (req.dropoff) rows.push({ label: "Drop-off", value: req.dropoff });
    }
    if (fare != null) rows.push({ label: "Fixed Fare", value: kr(fare) });
  } else if (req.rateType === "distance") {
    rows.push({ label: "Booking Type", value: "Distance-Based Ride" });
    if (req.pickup) rows.push({ label: "Pickup", value: req.pickup });
    if (req.dropoff) rows.push({ label: "Drop-off", value: req.dropoff });
    if (fare != null) rows.push({ label: "Estimated Fare", value: kr(fare) });
  }

  return rows;
}
