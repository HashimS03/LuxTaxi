type DirectionsResult = {
  distanceKm: number;
  durationMinutes: number;
};

/**
 * Server-side route lookup used to price distance-based bookings. Charges
 * must never be derived from client-supplied distance/duration values, since
 * those can be tampered with in the request body.
 */
export async function getServerRoute(
  origin: string,
  destination: string
): Promise<DirectionsResult> {
  const apiKey = process.env.GOOGLE_MAPS_SERVER_API_KEY;
  if (!apiKey) {
    throw new Error("Maps is not configured on the server (GOOGLE_MAPS_SERVER_API_KEY missing).");
  }

  const url = new URL("https://maps.googleapis.com/maps/api/directions/json");
  url.searchParams.set("origin", origin);
  url.searchParams.set("destination", destination);
  url.searchParams.set("mode", "driving");
  url.searchParams.set("region", "no");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error("Failed to reach the directions service.");
  }

  const data = await res.json();
  if (data.status !== "OK" || !data.routes?.[0]?.legs?.[0]) {
    if (data.status === "REQUEST_DENIED") {
      throw new Error(
        "Google rejected the directions request — make sure the Directions API is enabled for this project, and that GOOGLE_MAPS_SERVER_API_KEY isn't restricted to only an HTTP referrer (server requests have none)."
      );
    }
    throw new Error(`Could not calculate a route between the given addresses (${data.status}).`);
  }

  const leg = data.routes[0].legs[0];
  return {
    distanceKm: leg.distance.value / 1000,
    durationMinutes: leg.duration.value / 60,
  };
}
