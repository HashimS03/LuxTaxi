import type { MeteredVehicleKey } from "@/lib/pricing";

export type VehicleChoice = MeteredVehicleKey | "sixteenPlus";
export type RateType = "fixed" | "distance";
export type FixedOption = "hourly" | "airport";
export type AirportDirection = "toAirport" | "fromAirport";
export type PaymentChoice = "now" | "later";

/**
 * What the booking form sends to both /api/booking (pay later) and
 * /api/checkout (pay now). The server derives the email summary and, for
 * pay-now, the actual charge, from these structured fields — never from a
 * client-rendered summary or a client-supplied amount.
 */
export type BookingRequest = {
  name: string;
  email: string;
  phone: string;
  vehicle: VehicleChoice;
  rateType?: RateType;
  fixedOption?: FixedOption;
  hours?: number;
  airportDirection?: AirportDirection;
  pickup?: string;
  dropoff?: string;
  passengerCount?: string;
  date: string;
  time: string;
  notes?: string;
  /** Client-computed, display-only. Never trusted for the actual charge. */
  estimatedFare?: number;
};

export type BookingSummaryRow = {
  label: string;
  value: string;
};
