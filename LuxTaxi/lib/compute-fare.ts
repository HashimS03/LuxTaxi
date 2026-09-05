import { isMeteredVehicle, calculateHourlyFare, calculateDistanceFare, getAirportFare } from "@/lib/pricing";
import { getServerRoute } from "@/lib/google-directions";
import type { BookingRequest } from "@/lib/booking-types";

/**
 * Recomputes the trusted charge amount (NOK) for a booking request entirely
 * from server-side data. Throws with a user-facing message if the request
 * can't be priced online (e.g. a 16+ custom quote, or missing fields).
 */
export async function computeServerFare(req: BookingRequest): Promise<number> {
  if (!isMeteredVehicle(req.vehicle)) {
    throw new Error("This vehicle requires a custom quote and can't be paid for online.");
  }

  if (req.rateType === "fixed") {
    if (req.fixedOption === "hourly") {
      const hours = Number(req.hours);
      if (!Number.isFinite(hours) || hours < 1 || hours > 24) {
        throw new Error("Please provide a valid number of hours (1–24).");
      }
      return calculateHourlyFare(req.vehicle, hours);
    }
    if (req.fixedOption === "airport") {
      return getAirportFare(req.vehicle);
    }
    throw new Error("Please select a fixed-price option.");
  }

  if (req.rateType === "distance") {
    if (!req.pickup || !req.dropoff) {
      throw new Error("Please provide both a pickup and a destination.");
    }
    const { distanceKm, durationMinutes } = await getServerRoute(req.pickup, req.dropoff);
    return calculateDistanceFare(req.vehicle, distanceKm, durationMinutes);
  }

  throw new Error("Please select how you'd like to book.");
}
