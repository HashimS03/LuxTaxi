"use client";

import { useEffect, useMemo, useState } from "react";
import { Car } from "lucide-react";
import { GoogleMap, Marker, Polyline, OverlayView } from "@react-google-maps/api";
import { useGoogleMapsLoader, OSLO_CENTER, ELEGANT_MAP_STYLE, BRAND_INK, BRAND_ACCENT } from "@/lib/google-maps-loader";

// Illustrative sample routes for the hero map — approximate landmark
// coordinates and representative fares, not a live quote. The real,
// address-accurate fare comes from the booking form below. The actual
// on-road path between each pair is fetched from the Directions API so
// the line follows real streets instead of a straight bird's-eye line.
type SampleRoute = {
  id: string;
  from: string;
  to: string;
  fromPos: { lat: number; lng: number };
  toPos: { lat: number; lng: number };
  price: string;
};

type ResolvedRoute = SampleRoute & {
  path: { lat: number; lng: number }[];
  midPos: { lat: number; lng: number };
  bounds: google.maps.LatLngBounds;
};

const SAMPLE_ROUTES: SampleRoute[] = [
  {
    id: "gardemoen-sentrum",
    from: "Gardemoen (OSL)",
    to: "Oslo Sentrum",
    fromPos: { lat: 60.1939, lng: 11.1004 },
    toPos: { lat: 59.9139, lng: 10.7522 },
    price: "1 850 kr",
  },
  {
    id: "sentrum-bygdoy",
    from: "Oslo Sentrum",
    to: "Bygdøy",
    fromPos: { lat: 59.9139, lng: 10.7522 },
    toPos: { lat: 59.9036, lng: 10.6844 },
    price: "420 kr",
  },
  {
    id: "akerbrygge-holmenkollen",
    from: "Aker Brygge",
    to: "Holmenkollen",
    fromPos: { lat: 59.9094, lng: 10.7291 },
    toPos: { lat: 59.9636, lng: 10.6656 },
    price: "510 kr",
  },
  {
    id: "sentrum-fornebu",
    from: "Oslo Sentrum",
    to: "Fornebu",
    fromPos: { lat: 59.9139, lng: 10.7522 },
    toPos: { lat: 59.8964, lng: 10.627 },
    price: "450 kr",
  },
  {
    id: "majorstuen-grunerlokka",
    from: "Majorstuen",
    to: "Grünerløkka",
    fromPos: { lat: 59.9296, lng: 10.7146 },
    toPos: { lat: 59.9226, lng: 10.7597 },
    price: "260 kr",
  },
  {
    id: "sentrum-gardemoen",
    from: "Oslo S",
    to: "Gardemoen (OSL)",
    fromPos: { lat: 59.9139, lng: 10.7522 },
    toPos: { lat: 60.1939, lng: 11.1004 },
    price: "1 850 kr",
  },
];

function pickRandomRoute(): SampleRoute {
  return SAMPLE_ROUTES[Math.floor(Math.random() * SAMPLE_ROUTES.length)];
}

export function HeroRouteMap() {
  const { isLoaded, isConfigured } = useGoogleMapsLoader();
  const route = useMemo(() => pickRandomRoute(), []);
  const [resolved, setResolved] = useState<ResolvedRoute | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (!isLoaded) return;
    let cancelled = false;
    const service = new google.maps.DirectionsService();

    service.route(
      { origin: route.fromPos, destination: route.toPos, travelMode: google.maps.TravelMode.DRIVING },
      (result, status) => {
        if (cancelled) return;
        if (status !== "OK" || !result?.routes[0]) return;
        const path = result.routes[0].overview_path.map((p) => ({ lat: p.lat(), lng: p.lng() }));
        const midPos = path[Math.floor(path.length / 2)] ?? route.toPos;
        setResolved({ ...route, path, midPos, bounds: result.routes[0].bounds });
      }
    );

    return () => {
      cancelled = true;
    };
  }, [isLoaded, route]);

  // Zoom/pan so the whole trip is in view as soon as it resolves, instead
  // of sitting at a fixed city-wide zoom that may crop a longer route.
  useEffect(() => {
    if (map && resolved) {
      map.fitBounds(resolved.bounds, { top: 60, right: 60, bottom: 150, left: 60 });
    }
  }, [map, resolved]);

  if (!isConfigured || !isLoaded) {
    // Warm gradient placeholder so the panel still looks intentional
    // when Maps isn't configured (e.g. local dev without an API key).
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F0D0C] via-brandInk to-[#2A2320]" />
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={OSLO_CENTER}
      zoom={10}
      onLoad={(m) => setMap(m)}
      onUnmount={() => setMap(null)}
      options={{
        disableDefaultUI: true,
        gestureHandling: "cooperative",
        styles: ELEGANT_MAP_STYLE,
      }}
    >
      {resolved && (
        <>
          {/* White casing under the route so it reads as a clean, bordered
              ribbon over the map instead of a thin, harsh line. */}
          <Polyline
            path={resolved.path}
            options={{
              strokeColor: "#FFFFFF",
              strokeOpacity: 1,
              strokeWeight: 7,
              zIndex: 1,
            }}
          />
          <Polyline
            path={resolved.path}
            options={{
              strokeColor: BRAND_ACCENT,
              strokeOpacity: 1,
              strokeWeight: 4,
              zIndex: 2,
            }}
          />

          {/* Trip start and end points */}
          <Marker
            position={resolved.path[0]}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 5,
              fillColor: "#FFFFFF",
              fillOpacity: 1,
              strokeColor: BRAND_INK,
              strokeWeight: 2,
            }}
          />
          <Marker
            position={resolved.path[resolved.path.length - 1]}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 5,
              fillColor: BRAND_ACCENT,
              fillOpacity: 1,
              strokeColor: "#FFFFFF",
              strokeWeight: 2,
            }}
          />

          {/* The car, sitting on the route */}
          <OverlayView position={resolved.midPos} mapPaneName={OverlayView.FLOAT_PANE}>
            <div className="flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-foreground shadow-[0_8px_20px_-6px_rgba(28,26,24,0.5)]">
              <Car className="h-4 w-4 text-background" />
            </div>
          </OverlayView>

          {/* Route + fare label, offset below the car */}
          <OverlayView position={resolved.midPos} mapPaneName={OverlayView.FLOAT_PANE}>
            <div
              className="translate-y-4 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-card/95 px-3 py-1.5 shadow-[0_8px_20px_-10px_rgba(28,26,24,0.45)]"
              style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
            >
              <span className="text-[11px] font-medium text-foreground">
                {resolved.from} <span className="text-muted-foreground">→</span> {resolved.to}
              </span>
              <span className="ml-2 text-[11px] font-semibold text-accent">{resolved.price}</span>
            </div>
          </OverlayView>
        </>
      )}
    </GoogleMap>
  );
}
