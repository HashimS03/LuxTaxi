import { useJsApiLoader } from "@react-google-maps/api";

export const GOOGLE_MAPS_LIBRARIES: "places"[] = ["places"];

export const OSLO_CENTER = { lat: 59.9139, lng: 10.7522 };

export function useGoogleMapsLoader() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const { isLoaded } = useJsApiLoader({
    id: "oslo-limousine-google-maps",
    googleMapsApiKey: apiKey,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  return { isLoaded, isConfigured: apiKey.length > 0 };
}
