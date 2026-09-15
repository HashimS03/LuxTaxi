"use client";

import { useMemo } from "react";
import { GoogleMap, Marker, Polyline, OverlayView } from "@react-google-maps/api";
import { useGoogleMapsLoader, OSLO_CENTER, ELEGANT_MAP_STYLE } from "@/lib/google-maps-loader";

// Illustrative sample routes for the hero map — approximate landmark
// coordinates and representative fares, not a live quote. The real,
// address-accurate fare comes from the booking form below.
type SampleRoute = {
  id: string;
  from: string;
  to: string;
  fromPos: { lat: number; lng: number };
  toPos: { lat: number; lng: number };
  price: string;
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

function pickRandomRoutes(count: number): SampleRoute[] {
  const shuffled = [...SAMPLE_ROUTES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function midpoint(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  return { lat: (a.lat + b.lat) / 2, lng: (a.lng + b.lng) / 2 };
}

export function HeroRouteMap() {
  const { isLoaded, isConfigured } = useGoogleMapsLoader();
  const routes = useMemo(() => pickRandomRoutes(3), []);

  if (!isConfigured || !isLoaded) {
    // Warm gradient placeholder so the panel still looks intentional
    // when Maps isn't configured (e.g. local dev without an API key).
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[#2B2E27] via-brandPine to-[#4A4331]" />
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={OSLO_CENTER}
      zoom={10}
      options={{
        disableDefaultUI: true,
        gestureHandling: "cooperative",
        styles: ELEGANT_MAP_STYLE,
      }}
    >
      {routes.map((r) => (
        <div key={r.id}>
          <Polyline
            path={[r.fromPos, r.toPos]}
            options={{
              strokeColor: "#B4903F",
              strokeOpacity: 0.85,
              strokeWeight: 2,
              icons: [
                {
                  icon: { path: "M 0,-1 0,1", strokeOpacity: 0.85, scale: 3 },
                  offset: "0",
                  repeat: "14px",
                },
              ],
            }}
          />
          <Marker
            position={r.fromPos}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 5,
              fillColor: "#232620",
              fillOpacity: 1,
              strokeColor: "#FFFFFF",
              strokeWeight: 2,
            }}
          />
          <Marker
            position={r.toPos}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 5,
              fillColor: "#B4903F",
              fillOpacity: 1,
              strokeColor: "#FFFFFF",
              strokeWeight: 2,
            }}
          />
          <OverlayView position={midpoint(r.fromPos, r.toPos)} mapPaneName={OverlayView.FLOAT_PANE}>
            <div className="-translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-border bg-card/95 px-3 py-1.5 shadow-[0_8px_20px_-10px_rgba(35,38,32,0.35)]">
              <span className="text-[11px] font-medium text-foreground">
                {r.from} <span className="text-muted-foreground">→</span> {r.to}
              </span>
              <span className="ml-2 text-[11px] font-semibold text-accent">{r.price}</span>
            </div>
          </OverlayView>
        </div>
      ))}
    </GoogleMap>
  );
}
