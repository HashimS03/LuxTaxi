"use client";

import { useEffect, useMemo, useState } from "react";
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
  carPos: { lat: number; lng: number };
  carHeading: number;
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

// Bearing in degrees (0 = north/up), used to point the car icon the way
// it's actually travelling at that point on the road.
function bearing(from: { lat: number; lng: number }, to: { lat: number; lng: number }) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;
  const lat1 = toRad(from.lat);
  const lat2 = toRad(to.lat);
  const dLng = toRad(to.lng - from.lng);
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

// A simple top-down car silhouette, nose pointing up (bearing 0), so it
// can be rotated to match the road's actual direction of travel.
const CAR_ICON_PATH =
  "M 0,-6 C 1.8,-6 3,-4.6 3,-3 L 3,2.5 C 3,4 1.8,5 0.8,5 L -0.8,5 C -1.8,5 -3,4 -3,2.5 L -3,-3 C -3,-4.6 -1.8,-6 0,-6 Z";

export function HeroRouteMap() {
  const { isLoaded, isConfigured } = useGoogleMapsLoader();
  const routes = useMemo(() => pickRandomRoutes(3), []);
  const [resolved, setResolved] = useState<ResolvedRoute[]>([]);

  useEffect(() => {
    if (!isLoaded) return;
    let cancelled = false;
    const service = new google.maps.DirectionsService();

    Promise.all(
      routes.map(
        (r) =>
          new Promise<ResolvedRoute | null>((resolve) => {
            service.route(
              { origin: r.fromPos, destination: r.toPos, travelMode: google.maps.TravelMode.DRIVING },
              (result, status) => {
                if (status !== "OK" || !result?.routes[0]) {
                  resolve(null);
                  return;
                }
                const overview = result.routes[0].overview_path.map((p) => ({ lat: p.lat(), lng: p.lng() }));
                const midIndex = Math.floor(overview.length / 2);
                const carPos = overview[midIndex] ?? r.toPos;
                const heading = bearing(
                  overview[Math.max(0, midIndex - 1)] ?? r.fromPos,
                  overview[Math.min(overview.length - 1, midIndex + 1)] ?? r.toPos
                );
                resolve({ ...r, path: overview, carPos, carHeading: heading });
              }
            );
          })
      )
    ).then((results) => {
      if (!cancelled) setResolved(results.filter((r): r is ResolvedRoute => r !== null));
    });

    return () => {
      cancelled = true;
    };
  }, [isLoaded, routes]);

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
      options={{
        disableDefaultUI: true,
        gestureHandling: "cooperative",
        styles: ELEGANT_MAP_STYLE,
      }}
    >
      {resolved.map((r) => (
        <div key={r.id}>
          <Polyline
            path={r.path}
            options={{
              strokeColor: BRAND_ACCENT,
              strokeOpacity: 0.85,
              strokeWeight: 3,
            }}
          />
          <Marker
            position={r.fromPos}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 4,
              fillColor: "#FFFFFF",
              fillOpacity: 1,
              strokeColor: BRAND_INK,
              strokeWeight: 1.5,
            }}
          />
          <Marker
            position={r.toPos}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 4,
              fillColor: BRAND_ACCENT,
              fillOpacity: 1,
              strokeColor: "#FFFFFF",
              strokeWeight: 1.5,
            }}
          />
          {/* The "car" en route — a rotated silhouette pointing the way it's driving */}
          <Marker
            position={r.carPos}
            icon={{
              path: CAR_ICON_PATH,
              scale: 2.2,
              rotation: r.carHeading,
              fillColor: BRAND_INK,
              fillOpacity: 1,
              strokeColor: "#FFFFFF",
              strokeWeight: 1,
              anchor: new google.maps.Point(0, 0),
            }}
          />
          <OverlayView position={r.carPos} mapPaneName={OverlayView.FLOAT_PANE}>
            <div className="-translate-x-1/2 translate-y-3 whitespace-nowrap rounded-full border border-border bg-card/95 px-3 py-1.5 shadow-[0_8px_20px_-10px_rgba(28,26,24,0.45)]">
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
