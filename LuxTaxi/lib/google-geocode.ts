import { isOsloAdminArea } from "@/lib/oslo-boundary";

/**
 * Checks whether an address is within Oslo (the county/municipality), used
 * to decide whether the fixed Gardemoen Airport rate applies.
 */
export async function isAddressInOslo(address: string): Promise<boolean> {
  const apiKey = process.env.GOOGLE_MAPS_SERVER_API_KEY;
  if (!apiKey) {
    throw new Error("Maps is not configured on the server (GOOGLE_MAPS_SERVER_API_KEY missing).");
  }

  const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
  url.searchParams.set("address", address);
  url.searchParams.set("region", "no");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error("Failed to reach the geocoding service.");
  }

  const data = await res.json();
  if (data.status !== "OK" || !data.results?.[0]) {
    if (data.status === "REQUEST_DENIED") {
      throw new Error(
        "Google rejected the geocoding request — make sure the Geocoding API is enabled for this project, and that GOOGLE_MAPS_SERVER_API_KEY isn't restricted to only an HTTP referrer (server requests have none)."
      );
    }
    throw new Error(`Could not locate this address (${data.status}).`);
  }

  return isOsloAdminArea(data.results[0].address_components ?? []);
}
