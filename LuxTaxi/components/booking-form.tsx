"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Calendar,
  Clock,
  Car,
  User,
  Mail,
  Phone,
  CheckCircle2,
  Users,
  Loader2,
  AlertCircle,
  ArrowRight,
  Info,
  ShieldCheck,
  BadgeDollarSign,
  Timer,
  Plane,
  Navigation,
  CreditCard,
  Wallet,
} from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import {
  Autocomplete,
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import {
  isMeteredVehicle,
  calculateHourlyFare,
  calculateDistanceFare,
  getAirportFare,
  kr,
  type MeteredVehicleKey,
} from "@/lib/pricing";
import { getPriceMultiplier, getSurchargeType } from "@/lib/norway-holidays";
import type {
  VehicleChoice,
  RateType,
  FixedOption,
  AirportDirection,
  PaymentChoice,
  BookingRequest,
} from "@/lib/booking-types";

const GOOGLE_MAPS_LIBRARIES: "places"[] = ["places"];
const OSLO_CENTER = { lat: 59.9139, lng: 10.7522 };
const GARDEMOEN_ADDRESS = "Oslo Lufthavn, Gardemoen, Norway";

export function BookingForm() {
  const { t } = useLocale();

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dateError, setDateError] = useState("");
  const [cancelledNotice, setCancelledNotice] = useState(false);

  // Contact
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Vehicle & rate
  const [vehicle, setVehicle] = useState<VehicleChoice | "">("");
  const [rateType, setRateType] = useState<RateType>("fixed");
  const [fixedOption, setFixedOption] = useState<FixedOption>("hourly");
  const [hours, setHours] = useState(2);
  const [airportDirection, setAirportDirection] = useState<AirportDirection>("fromAirport");
  const [fixedAddress, setFixedAddress] = useState("");

  // Distance mode
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [route, setRoute] = useState<{ distanceKm: number; durationMin: number } | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState(false);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  // 16+ custom quote
  const [customPickup, setCustomPickup] = useState("");
  const [customDropoff, setCustomDropoff] = useState("");
  const [passengerCount, setPassengerCount] = useState("");

  // Schedule
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<PaymentChoice>("later");

  const pickupAutoRef = useRef<google.maps.places.Autocomplete | null>(null);
  const dropoffAutoRef = useRef<google.maps.places.Autocomplete | null>(null);

  const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const mapsConfigured = mapsApiKey.length > 0;
  const { isLoaded: mapsLoaded } = useJsApiLoader({
    googleMapsApiKey: mapsApiKey,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  useEffect(() => {
    if (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("payment") === "cancelled") {
      setCancelledNotice(true);
    }
  }, []);

  useEffect(() => {
    if (vehicle === "sixteenPlus") setPaymentMethod("later");
  }, [vehicle]);

  const isMetered = vehicle !== "" && isMeteredVehicle(vehicle);

  // Calculate the live route once both distance-mode addresses are set.
  // Debounced so typing (rather than picking a suggestion) doesn't fire a
  // Directions request on every keystroke.
  useEffect(() => {
    if (rateType !== "distance" || !isMetered || !mapsLoaded || !pickup || !dropoff) {
      setRoute(null);
      setDirections(null);
      setRouteError(false);
      return;
    }
    setRouteLoading(true);
    setRouteError(false);
    const timeout = setTimeout(() => {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        { origin: pickup, destination: dropoff, travelMode: google.maps.TravelMode.DRIVING },
        (result, status) => {
          setRouteLoading(false);
          if (status === "OK" && result) {
            setDirections(result);
            const leg = result.routes[0]?.legs[0];
            if (leg?.distance && leg?.duration) {
              setRoute({ distanceKm: leg.distance.value / 1000, durationMin: leg.duration.value / 60 });
            }
          } else {
            setDirections(null);
            setRoute(null);
            setRouteError(true);
          }
        }
      );
    }, 600);
    return () => clearTimeout(timeout);
  }, [pickup, dropoff, rateType, isMetered, mapsLoaded]);

  // Display-only estimate. The airport fixed rate assumes the address is
  // within Oslo — the server independently verifies that (and falls back to
  // distance pricing if not) before ever charging a card.
  const estimatedFare = useMemo(() => {
    if (!isMetered || !date) return null;
    const meteredVehicle = vehicle as MeteredVehicleKey;
    const multiplier = getPriceMultiplier(date);
    let base: number | null = null;
    if (rateType === "fixed") {
      base = fixedOption === "hourly" ? (hours >= 1 ? calculateHourlyFare(meteredVehicle, hours) : null) : getAirportFare(meteredVehicle);
    } else if (route) {
      base = calculateDistanceFare(meteredVehicle, route.distanceKm, route.durationMin);
    }
    return base == null ? null : Math.round(base * multiplier);
  }, [isMetered, vehicle, rateType, fixedOption, hours, route, date]);

  const surchargeType = date ? getSurchargeType(date) : null;
  const surchargeLabel =
    surchargeType === "holiday"
      ? t("booking.surchargeHoliday")
      : surchargeType === "weekend"
      ? t("booking.surchargeWeekend")
      : null;

  function validateDateTime(d: string, tm: string): boolean {
    if (!d || !tm) return true;
    const selectedDateTime = new Date(`${d}T${tm}`);
    const now = new Date();
    const minDateTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    if (selectedDateTime < minDateTime) {
      setDateError(t("booking.dateError"));
      return false;
    }
    setDateError("");
    return true;
  }

  function onPickupPlaceChanged() {
    const place = pickupAutoRef.current?.getPlace();
    if (place?.formatted_address) setPickup(place.formatted_address);
  }

  function onDropoffPlaceChanged() {
    const place = dropoffAutoRef.current?.getPlace();
    if (place?.formatted_address) setDropoff(place.formatted_address);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setDateError("");

    if (!validateDateTime(date, time)) return;

    if (!vehicle) {
      setError(t("booking.errorGeneric"));
      return;
    }

    let effectivePickup = "";
    let effectiveDropoff = "";

    if (vehicle === "sixteenPlus") {
      effectivePickup = customPickup;
      effectiveDropoff = customDropoff;
    } else if (rateType === "fixed") {
      if (fixedOption === "hourly") {
        effectivePickup = fixedAddress;
      } else if (airportDirection === "fromAirport") {
        effectivePickup = GARDEMOEN_ADDRESS;
        effectiveDropoff = fixedAddress;
      } else {
        effectivePickup = fixedAddress;
        effectiveDropoff = GARDEMOEN_ADDRESS;
      }
    } else {
      effectivePickup = pickup;
      effectiveDropoff = dropoff;
    }

    const body: BookingRequest = {
      name,
      email,
      phone,
      vehicle,
      rateType: vehicle === "sixteenPlus" ? undefined : rateType,
      fixedOption: isMetered && rateType === "fixed" ? fixedOption : undefined,
      hours: isMetered && rateType === "fixed" && fixedOption === "hourly" ? hours : undefined,
      airportDirection: isMetered && rateType === "fixed" && fixedOption === "airport" ? airportDirection : undefined,
      pickup: effectivePickup || undefined,
      dropoff: effectiveDropoff || undefined,
      passengerCount: vehicle === "sixteenPlus" ? passengerCount : undefined,
      date,
      time,
      notes: notes || undefined,
      estimatedFare: estimatedFare ?? undefined,
    };

    setLoading(true);
    try {
      if (paymentMethod === "now" && isMetered) {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (!res.ok || !data.url) {
          throw new Error(data.error || t("booking.errorGeneric"));
        }
        window.location.href = data.url;
        return;
      }

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || t("booking.errorGeneric"));
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("booking.errorGeneric"));
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setSubmitted(false);
    setVehicle("");
    setRateType("fixed");
    setFixedOption("hourly");
    setHours(2);
    setFixedAddress("");
    setPickup("");
    setDropoff("");
    setRoute(null);
    setDirections(null);
    setCustomPickup("");
    setCustomDropoff("");
    setPassengerCount("");
    setPaymentMethod("later");
  }

  if (submitted) {
    return (
      <section id="booking" className="py-24 lg:py-32 bg-card">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="flex flex-col items-center gap-8">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-accent/10">
              <CheckCircle2 className="h-12 w-12 text-accent" />
            </div>
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
                {t("booking.confirmedTitle")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
                {t("booking.confirmedDescription")}
              </p>
            </div>
            <Button
              onClick={resetForm}
              variant="outline"
              className="mt-4 border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300"
            >
              {t("booking.bookAnother")}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const inputClass =
    "pl-10 h-12 bg-muted/50 border-border focus:bg-background transition-colors duration-300";

  return (
    <section id="booking" className="py-24 lg:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Text */}
          <div className="lg:py-8 lg:sticky lg:top-32 lg:self-start">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-4">
              {t("booking.tagline")}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight mb-6">
              {t("booking.title")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t("booking.description")}
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 shrink-0 flex items-center justify-center bg-muted border border-border">
                  <Clock className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{t("booking.trust247Title")}</p>
                  <p className="text-sm text-muted-foreground">{t("booking.trust247Desc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 shrink-0 flex items-center justify-center bg-muted border border-border">
                  <CheckCircle2 className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{t("booking.trustConfirmTitle")}</p>
                  <p className="text-sm text-muted-foreground">{t("booking.trustConfirmDesc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 shrink-0 flex items-center justify-center bg-muted border border-border">
                  <ShieldCheck className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{t("booking.trustDriversTitle")}</p>
                  <p className="text-sm text-muted-foreground">{t("booking.trustDriversDesc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 shrink-0 flex items-center justify-center bg-muted border border-border">
                  <BadgeDollarSign className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{t("booking.trustPricingTitle")}</p>
                  <p className="text-sm text-muted-foreground">{t("booking.trustPricingDesc")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-background border border-border p-8 lg:p-10"
            >
              {error && (
                <div className="mb-6 flex items-center gap-3 border border-destructive/50 bg-destructive/5 p-4">
                  <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {cancelledNotice && (
                <div className="mb-6 flex items-center gap-3 border border-border bg-muted/50 p-4">
                  <Info className="h-5 w-5 shrink-0 text-accent" />
                  <p className="text-sm text-muted-foreground">{t("booking.paymentCancelled")}</p>
                </div>
              )}

              <div className="grid gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-foreground">
                      {t("booking.name")}
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t("booking.namePlaceholder")}
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                      {t("booking.email")}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("booking.emailPlaceholder")}
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                      {t("booking.phone")}
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t("booking.phonePlaceholder")}
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehicle" className="text-sm font-medium text-foreground">
                      {t("booking.vehicle")}
                    </Label>
                    <div className="relative">
                      <Car className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                      <Select
                        required
                        onValueChange={(v) => setVehicle(v as VehicleChoice)}
                        value={vehicle}
                      >
                        <SelectTrigger id="vehicle" className={inputClass}>
                          <SelectValue placeholder={t("booking.vehiclePlaceholder")} />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-border">
                          <SelectItem value="luxury">{t("booking.vehicleLuxury")}</SelectItem>
                          <SelectItem value="four">{t("booking.vehicleFour")}</SelectItem>
                          <SelectItem value="seven">{t("booking.vehicleSeven")}</SelectItem>
                          <SelectItem value="sixteen">{t("booking.vehicleSixteen")}</SelectItem>
                          <SelectItem value="sixteenPlus">{t("booking.vehicleSixteenPlus")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {vehicle === "sixteenPlus" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="passengerCount" className="text-sm font-medium text-foreground">
                        {t("booking.passengerCount")}
                      </Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="passengerCount"
                          type="number"
                          min={16}
                          value={passengerCount}
                          onChange={(e) => setPassengerCount(e.target.value)}
                          placeholder={t("booking.passengerCountPlaceholder")}
                          required
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="customPickup" className="text-sm font-medium text-foreground">
                          {t("booking.pickup")}
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="customPickup"
                            value={customPickup}
                            onChange={(e) => setCustomPickup(e.target.value)}
                            placeholder={t("booking.pickupPlaceholder")}
                            required
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="customDropoff" className="text-sm font-medium text-foreground">
                          {t("booking.dropoff")}
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="customDropoff"
                            value={customDropoff}
                            onChange={(e) => setCustomDropoff(e.target.value)}
                            placeholder={t("booking.dropoffPlaceholder")}
                            required
                            className={inputClass}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-muted/50 border border-border p-4">
                      <Info className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">{t("booking.customQuoteNote")}</p>
                    </div>
                  </>
                )}

                {isMetered && (
                  <>
                    {/* Rate Type */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">{t("booking.rateType")}</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setRateType("fixed")}
                          className={`text-left p-4 border transition-all duration-300 ${
                            rateType === "fixed"
                              ? "border-foreground bg-foreground text-background"
                              : "border-border bg-muted/50 hover:bg-muted"
                          }`}
                        >
                          <span className="flex items-center gap-2 font-medium text-sm">
                            <Timer className="h-4 w-4" />
                            {t("booking.rateTypeFixed")}
                          </span>
                          <span
                            className={`block text-xs mt-1 ${
                              rateType === "fixed" ? "text-background/70" : "text-muted-foreground"
                            }`}
                          >
                            {t("booking.rateTypeFixedDesc")}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setRateType("distance")}
                          className={`text-left p-4 border transition-all duration-300 ${
                            rateType === "distance"
                              ? "border-foreground bg-foreground text-background"
                              : "border-border bg-muted/50 hover:bg-muted"
                          }`}
                        >
                          <span className="flex items-center gap-2 font-medium text-sm">
                            <Navigation className="h-4 w-4" />
                            {t("booking.rateTypeDistance")}
                          </span>
                          <span
                            className={`block text-xs mt-1 ${
                              rateType === "distance" ? "text-background/70" : "text-muted-foreground"
                            }`}
                          >
                            {t("booking.rateTypeDistanceDesc")}
                          </span>
                        </button>
                      </div>
                    </div>

                    {rateType === "fixed" && (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setFixedOption("hourly")}
                            className={`flex items-center justify-center gap-2 p-3 border text-sm font-medium transition-all duration-300 ${
                              fixedOption === "hourly"
                                ? "border-foreground bg-foreground text-background"
                                : "border-border bg-muted/50 hover:bg-muted"
                            }`}
                          >
                            <Timer className="h-4 w-4" />
                            {t("booking.fixedOptionHourly")}
                          </button>
                          <button
                            type="button"
                            onClick={() => setFixedOption("airport")}
                            className={`flex items-center justify-center gap-2 p-3 border text-sm font-medium transition-all duration-300 ${
                              fixedOption === "airport"
                                ? "border-foreground bg-foreground text-background"
                                : "border-border bg-muted/50 hover:bg-muted"
                            }`}
                          >
                            <Plane className="h-4 w-4" />
                            {t("booking.fixedOptionAirport")}
                          </button>
                        </div>

                        {fixedOption === "hourly" ? (
                          <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="fixedAddress" className="text-sm font-medium text-foreground">
                                {t("booking.hourlyAddressLabel")}
                              </Label>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                  id="fixedAddress"
                                  value={fixedAddress}
                                  onChange={(e) => setFixedAddress(e.target.value)}
                                  placeholder={t("booking.pickupPlaceholder")}
                                  required
                                  className={inputClass}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="hours" className="text-sm font-medium text-foreground">
                                {t("booking.hoursLabel")}
                              </Label>
                              <div className="relative">
                                <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                  id="hours"
                                  type="number"
                                  min={1}
                                  max={24}
                                  value={hours}
                                  onChange={(e) => setHours(Number(e.target.value) || 1)}
                                  required
                                  className={inputClass}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="airportDirection" className="text-sm font-medium text-foreground">
                                {t("booking.airportDirection")}
                              </Label>
                              <div className="relative">
                                <Plane className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                                <Select
                                  onValueChange={(v) => setAirportDirection(v as AirportDirection)}
                                  value={airportDirection}
                                >
                                  <SelectTrigger id="airportDirection" className={inputClass}>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-background border-border">
                                    <SelectItem value="fromAirport">{t("booking.airportFromAirport")}</SelectItem>
                                    <SelectItem value="toAirport">{t("booking.airportToAirport")}</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="airportAddress" className="text-sm font-medium text-foreground">
                                {t("booking.airportAddressLabel")}
                              </Label>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                  id="airportAddress"
                                  value={fixedAddress}
                                  onChange={(e) => setFixedAddress(e.target.value)}
                                  placeholder={t("booking.pickupPlaceholder")}
                                  required
                                  className={inputClass}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {fixedOption === "airport" && (
                          <p className="text-xs text-muted-foreground">{t("booking.airportOutsideOsloNote")}</p>
                        )}
                      </>
                    )}

                    {rateType === "distance" && (
                      <>
                        <div className="grid gap-6 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="pickup" className="text-sm font-medium text-foreground">
                              {t("booking.pickup")}
                            </Label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                              {mapsConfigured && mapsLoaded ? (
                                <Autocomplete
                                  onLoad={(a) => (pickupAutoRef.current = a)}
                                  onPlaceChanged={onPickupPlaceChanged}
                                  options={{ componentRestrictions: { country: "no" } }}
                                >
                                  <Input
                                    id="pickup"
                                    value={pickup}
                                    onChange={(e) => setPickup(e.target.value)}
                                    placeholder={t("booking.pickupPlaceholder")}
                                    required
                                    className={inputClass}
                                  />
                                </Autocomplete>
                              ) : (
                                <Input
                                  id="pickup"
                                  value={pickup}
                                  onChange={(e) => setPickup(e.target.value)}
                                  placeholder={t("booking.pickupPlaceholder")}
                                  required
                                  className={inputClass}
                                />
                              )}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dropoff" className="text-sm font-medium text-foreground">
                              {t("booking.dropoff")}
                            </Label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                              {mapsConfigured && mapsLoaded ? (
                                <Autocomplete
                                  onLoad={(a) => (dropoffAutoRef.current = a)}
                                  onPlaceChanged={onDropoffPlaceChanged}
                                  options={{ componentRestrictions: { country: "no" } }}
                                >
                                  <Input
                                    id="dropoff"
                                    value={dropoff}
                                    onChange={(e) => setDropoff(e.target.value)}
                                    placeholder={t("booking.dropoffPlaceholder")}
                                    required
                                    className={inputClass}
                                  />
                                </Autocomplete>
                              ) : (
                                <Input
                                  id="dropoff"
                                  value={dropoff}
                                  onChange={(e) => setDropoff(e.target.value)}
                                  placeholder={t("booking.dropoffPlaceholder")}
                                  required
                                  className={inputClass}
                                />
                              )}
                            </div>
                          </div>
                        </div>

                        {!mapsConfigured && (
                          <div className="flex items-start gap-3 bg-muted/50 border border-border p-4">
                            <Info className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                            <p className="text-sm text-muted-foreground">{t("booking.mapsUnavailable")}</p>
                          </div>
                        )}

                        {mapsConfigured && (pickup || dropoff) && (
                          <div className="border border-border overflow-hidden">
                            {routeLoading ? (
                              <div className="h-56 flex items-center justify-center bg-muted/50 text-sm text-muted-foreground gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                {t("booking.calculatingRoute")}
                              </div>
                            ) : routeError ? (
                              <div className="h-56 flex items-center justify-center bg-muted/50 text-sm text-destructive px-6 text-center">
                                {t("booking.routeError")}
                              </div>
                            ) : directions ? (
                              mapsLoaded && (
                                <GoogleMap
                                  mapContainerStyle={{ width: "100%", height: "224px" }}
                                  center={OSLO_CENTER}
                                  zoom={11}
                                  options={{ disableDefaultUI: true, zoomControl: true }}
                                >
                                  <DirectionsRenderer directions={directions} />
                                </GoogleMap>
                              )
                            ) : (
                              <div className="h-56 flex items-center justify-center bg-muted/50 text-sm text-muted-foreground px-6 text-center">
                                {t("booking.enterAddresses")}
                              </div>
                            )}
                          </div>
                        )}

                        {route && (
                          <div className="flex gap-6 text-sm text-muted-foreground">
                            <span>
                              {t("booking.distanceSummary")}: <strong className="text-foreground">{route.distanceKm.toFixed(1)} km</strong>
                            </span>
                            <span>
                              {t("booking.durationSummary")}: <strong className="text-foreground">{Math.round(route.durationMin)} min</strong>
                            </span>
                          </div>
                        )}
                      </>
                    )}

                    {estimatedFare != null && (
                      <div className="bg-accent/5 border border-accent/20 p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">
                            {rateType === "distance" ? t("booking.estimatedFare") : t("booking.fixedFare")}
                          </span>
                          <span className="font-serif text-2xl font-semibold text-accent">{kr(estimatedFare)}</span>
                        </div>
                        {surchargeLabel && (
                          <p className="mt-2 text-xs font-medium text-accent">{surchargeLabel}</p>
                        )}
                      </div>
                    )}
                    {rateType === "distance" && (
                      <p className="text-xs text-muted-foreground -mt-2">{t("booking.fareEstimateNote")}</p>
                    )}
                  </>
                )}

                <div className="space-y-2">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-sm font-medium text-foreground">
                        {t("booking.date")}
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="date"
                          type="date"
                          value={date}
                          onChange={(e) => {
                            setDate(e.target.value);
                            setDateError("");
                          }}
                          required
                          className={`${inputClass} ${dateError ? "border-destructive" : ""}`}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-sm font-medium text-foreground">
                        {t("booking.time")}
                      </Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="time"
                          type="time"
                          value={time}
                          onChange={(e) => {
                            setTime(e.target.value);
                            setDateError("");
                          }}
                          required
                          className={`${inputClass} ${dateError ? "border-destructive" : ""}`}
                        />
                      </div>
                    </div>
                  </div>
                  {dateError && (
                    <div className="flex items-center gap-2 text-destructive text-sm mt-2">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{dateError}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-medium text-foreground">
                    {t("booking.notes")}
                  </Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t("booking.notesPlaceholder")}
                    rows={4}
                    className="bg-muted/50 border-border focus:bg-background transition-colors duration-300 resize-none"
                  />
                </div>

                {isMetered && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">{t("booking.paymentMethod")}</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("now")}
                        className={`text-left p-4 border transition-all duration-300 ${
                          paymentMethod === "now"
                            ? "border-foreground bg-foreground text-background"
                            : "border-border bg-muted/50 hover:bg-muted"
                        }`}
                      >
                        <span className="flex items-center gap-2 font-medium text-sm">
                          <CreditCard className="h-4 w-4" />
                          {t("booking.payNow")}
                        </span>
                        <span
                          className={`block text-xs mt-1 ${
                            paymentMethod === "now" ? "text-background/70" : "text-muted-foreground"
                          }`}
                        >
                          {t("booking.payNowDesc")}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("later")}
                        className={`text-left p-4 border transition-all duration-300 ${
                          paymentMethod === "later"
                            ? "border-foreground bg-foreground text-background"
                            : "border-border bg-muted/50 hover:bg-muted"
                        }`}
                      >
                        <span className="flex items-center gap-2 font-medium text-sm">
                          <Wallet className="h-4 w-4" />
                          {t("booking.payLater")}
                        </span>
                        <span
                          className={`block text-xs mt-1 ${
                            paymentMethod === "later" ? "text-background/70" : "text-muted-foreground"
                          }`}
                        >
                          {t("booking.payLaterDesc")}
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Booking Policy Notice */}
              <div className="mt-6 p-4 bg-muted/50 border border-border">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">{t("booking.policyTitle")}</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>{t("booking.policy1")}</li>
                      <li>{t("booking.policy2")}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-base group"
                  disabled={loading || (paymentMethod === "now" && estimatedFare == null)}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {paymentMethod === "now" ? t("booking.redirecting") : t("booking.sending")}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {paymentMethod === "now" && estimatedFare != null
                        ? `${kr(estimatedFare)} — ${t("booking.payNowCta")}`
                        : t("booking.submit")}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  {t("booking.submitNote")}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
