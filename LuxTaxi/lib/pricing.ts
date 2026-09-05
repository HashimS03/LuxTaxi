export type MeteredVehicleKey = "luxury" | "four" | "seven" | "sixteen";
export type VehicleKey = MeteredVehicleKey | "sixteenPlus";

export type VehicleRate = {
  key: MeteredVehicleKey;
  baseFare: number;
  perKm: number;
  perMinute: number;
  minFare: number;
  hourly: number;
  airport: number;
  airportNote?: true;
};

// Single source of truth for all published rates (in NOK). Keep this in
// sync with the /pricing page copy. Server-side code must always recompute
// charges from these numbers rather than trusting a client-supplied amount.
export const vehicleRates: Record<MeteredVehicleKey, VehicleRate> = {
  luxury: { key: "luxury", baseFare: 189, perKm: 22, perMinute: 10, minFare: 690, hourly: 1090, airport: 1850 },
  four: { key: "four", baseFare: 149, perKm: 20, perMinute: 9, minFare: 590, hourly: 900, airport: 1350 },
  seven: { key: "seven", baseFare: 199, perKm: 33, perMinute: 10, minFare: 790, hourly: 1290, airport: 2150 },
  sixteen: { key: "sixteen", baseFare: 249, perKm: 55, perMinute: 15, minFare: 990, hourly: 1590, airport: 2990, airportNote: true },
};

export const meteredVehicleKeys: MeteredVehicleKey[] = ["luxury", "four", "seven", "sixteen"];

export function isMeteredVehicle(key: string): key is MeteredVehicleKey {
  return key in vehicleRates;
}

/** Distance-based fare estimate, in NOK, rounded to the nearest krone. */
export function calculateDistanceFare(
  vehicle: MeteredVehicleKey,
  distanceKm: number,
  durationMinutes: number
): number {
  const rate = vehicleRates[vehicle];
  const raw = rate.baseFare + rate.perKm * distanceKm + rate.perMinute * durationMinutes;
  return Math.max(Math.round(raw), rate.minFare);
}

export function calculateHourlyFare(vehicle: MeteredVehicleKey, hours: number): number {
  return vehicleRates[vehicle].hourly * hours;
}

export function getAirportFare(vehicle: MeteredVehicleKey): number {
  return vehicleRates[vehicle].airport;
}

export function kr(amount: number) {
  return `${amount.toLocaleString("nb-NO")} kr`;
}
