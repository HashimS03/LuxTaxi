import { isMeteredVehicle, calculateHourlyFare, calculateDistanceFare, getAirportFare } from "@/lib/pricing";
import { getServerRoute } from "@/lib/google-directions";
import { isAddressInOslo } from "@/lib/google-geocode";
import { getPriceMultiplier, getSurchargeLabel } from "@/lib/norway-holidays";
import type { BookingRequest } from "@/lib/booking-types";

export type FareResult = {
  amount: number;
  surchargeLabel: string | null;
  /** True when an airport-fixed booking's address was outside Oslo, so distance pricing was used instead. */
  distanceFallback: boolean;
};

/**
 * Recomputes the trusted charge amount (NOK) for a booking request entirely
 * from server-side data. Throws with a user-facing message if the request
 * can't be priced online (e.g. a 16+ custom quote, or missing fields).
 */
export async function computeServerFare(req: BookingRequest): Promise<FareResult> {
  if (!isMeteredVehicle(req.vehicle)) {
    throw new Error("This vehicle requires a custom quote and can't be paid for online.");
  }

  const multiplier = getPriceMultiplier(req.date);
  const surchargeLabel = getSurchargeLabel(req.date);

  if (req.rateType === "fixed") {
    if (req.fixedOption === "hourly") {
      const hours = Number(req.hours);
      if (!Number.isFinite(hours) || hours < 1 || hours > 24) {
        throw new Error("Please provide a valid number of hours (1–24).");
      }
      return {
        amount: Math.round(calculateHourlyFare(req.vehicle, hours) * multiplier),
        surchargeLabel,
        distanceFallback: false,
      };
    }

    if (req.fixedOption === "airport") {
      if (!req.pickup || !req.dropoff) {
        throw new Error("Please provide the Gardemoen trip details.");
      }
      // The fixed Gardemoen rate only covers trips to/from Oslo itself. If the
      // Oslo-side address is actually outside Oslo, price the whole trip by
      // distance instead.
      const osloSideAddress = req.airportDirection === "toAirport" ? req.pickup : req.dropoff;
      const withinOslo = await isAddressInOslo(osloSideAddress);

      if (withinOslo) {
        return {
          amount: Math.round(getAirportFare(req.vehicle) * multiplier),
          surchargeLabel,
          distanceFallback: false,
        };
      }

      const { distanceKm, durationMinutes } = await getServerRoute(req.pickup, req.dropoff);
      const distanceFare = calculateDistanceFare(req.vehicle, distanceKm, durationMinutes);
      return {
        amount: Math.round(distanceFare * multiplier),
        surchargeLabel,
        distanceFallback: true,
      };
    }

    throw new Error("Please select a fixed-price option.");
  }

  if (req.rateType === "distance") {
    if (!req.pickup || !req.dropoff) {
      throw new Error("Please provide both a pickup and a destination.");
    }
    const { distanceKm, durationMinutes } = await getServerRoute(req.pickup, req.dropoff);
    const fare = calculateDistanceFare(req.vehicle, distanceKm, durationMinutes);
    return {
      amount: Math.round(fare * multiplier),
      surchargeLabel,
      distanceFallback: false,
    };
  }

  throw new Error("Please select how you'd like to book.");
}
