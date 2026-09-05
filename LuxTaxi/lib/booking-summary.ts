import { kr } from "@/lib/pricing";
import type { BookingRequest, BookingSummaryRow } from "@/lib/booking-types";
import type { FareResult } from "@/lib/compute-fare";

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
export function buildSummaryRows(req: BookingRequest, fare?: FareResult | number): BookingSummaryRow[] {
  const rows: BookingSummaryRow[] = [];
  // Accept a bare number (client-side, display-only estimate) alongside the
  // full server-computed FareResult so callers that never priced a request
  // server-side (e.g. a pay-later booking with a failed fare lookup) can
  // still pass through whatever estimate they have.
  const fareResult: FareResult | undefined =
    typeof fare === "number" ? { amount: fare, surchargeLabel: null, distanceFallback: false } : fare;

  if (req.vehicle === "sixteenPlus") {
    if (req.passengerCount) rows.push({ label: "Passengers", value: req.passengerCount });
    if (req.pickup) rows.push({ label: "Pickup", value: req.pickup });
    if (req.dropoff) rows.push({ label: "Drop-off", value: req.dropoff });
    return rows;
  }

  const isAirportFallback = req.fixedOption === "airport" && fareResult?.distanceFallback;

  if (req.rateType === "fixed" && !isAirportFallback) {
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
    if (fareResult) rows.push({ label: "Fixed Fare", value: kr(fareResult.amount) });
  } else if (req.rateType === "distance" || isAirportFallback) {
    rows.push({
      label: "Booking Type",
      value: isAirportFallback
        ? "Gardemoen Transfer (outside Oslo — priced by distance)"
        : "Distance-Based Ride",
    });
    if (req.airportDirection) {
      rows.push({ label: "Direction", value: airportDirectionLabels[req.airportDirection] });
    }
    if (req.pickup) rows.push({ label: "Pickup", value: req.pickup });
    if (req.dropoff) rows.push({ label: "Drop-off", value: req.dropoff });
    if (fareResult) rows.push({ label: "Estimated Fare", value: kr(fareResult.amount) });
  }

  if (fareResult?.surchargeLabel) {
    rows.push({ label: "Surcharge", value: fareResult.surchargeLabel });
  }

  return rows;
}
