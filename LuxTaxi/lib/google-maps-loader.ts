import { useJsApiLoader } from "@react-google-maps/api";

export const GOOGLE_MAPS_LIBRARIES: "places"[] = ["places"];

export const OSLO_CENTER = { lat: 59.9139, lng: 10.7522 };

// Shared brand colors for anything drawn on the map (routes, markers) so
// they always match the site's ink/accent tokens without duplicating hex
// values across components.
export const BRAND_INK = "#1C1A18";
export const BRAND_ACCENT = "#7B2434";

export function useGoogleMapsLoader() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const { isLoaded } = useJsApiLoader({
    id: "oslo-limousine-google-maps",
    googleMapsApiKey: apiKey,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  return { isLoaded, isConfigured: apiKey.length > 0 };
}

// A muted, warm map theme so the map reads as part of the site's ivory /
// pine palette instead of stock Google Maps blue-and-grey.
export const ELEGANT_MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#f6f1e7" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8a8677" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f6f1e7" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ visibility: "off" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#e9e1cd" }] },
  { featureType: "road.arterial", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "road.local", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#f0e6cb" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#dfe1e6" }] },
];
