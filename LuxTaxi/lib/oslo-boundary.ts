export type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

/**
 * Oslo is unique among Norwegian regions in that the municipality and the
 * county are the exact same area, so matching administrative_area_level_1
 * covers the whole city (center and outer boroughs alike), not just
 * downtown. Shared between the server-side geocoding check (compute-fare)
 * and the client-side check on an already-selected Autocomplete place
 * (booking-form), so both agree without a second network round trip.
 */
export function isOsloAdminArea(components: AddressComponent[] | undefined | null): boolean {
  if (!components) return false;
  return components.some(
    (c) => c.types.includes("administrative_area_level_1") && (c.long_name === "Oslo" || c.short_name === "Oslo")
  );
}
