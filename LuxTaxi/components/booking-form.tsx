"use client";

import { useState } from "react";
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
} from "lucide-react";
import { useLocale } from "@/lib/locale-context";

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const { t } = useLocale();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const body = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      vehicle: selectedVehicle,
      passengerCount: formData.get("passengerCount") as string | null,
      pickup: formData.get("pickup") as string,
      dropoff: formData.get("dropoff") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      notes: formData.get("notes") as string | null,
    };

    try {
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
      setError(
        err instanceof Error ? err.message : t("booking.errorGeneric")
      );
    } finally {
      setLoading(false);
    }
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
              onClick={() => {
                setSubmitted(false);
                setSelectedVehicle("");
              }}
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

  return (
    <section id="booking" className="py-24 lg:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Text */}
          <div className="lg:py-8">
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
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 shrink-0 flex items-center justify-center bg-muted border border-border">
                  <Clock className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">24/7 Service</p>
                  <p className="text-sm text-muted-foreground">Available any time</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 shrink-0 flex items-center justify-center bg-muted border border-border">
                  <CheckCircle2 className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Instant Confirm</p>
                  <p className="text-sm text-muted-foreground">Quick response</p>
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
                        name="name"
                        placeholder={t("booking.namePlaceholder")}
                        required
                        className="pl-10 h-12 bg-muted/50 border-border focus:bg-background transition-colors duration-300"
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
                        name="email"
                        type="email"
                        placeholder={t("booking.emailPlaceholder")}
                        required
                        className="pl-10 h-12 bg-muted/50 border-border focus:bg-background transition-colors duration-300"
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
                        name="phone"
                        type="tel"
                        placeholder={t("booking.phonePlaceholder")}
                        required
                        className="pl-10 h-12 bg-muted/50 border-border focus:bg-background transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehicle" className="text-sm font-medium text-foreground">
                      {t("booking.vehicle")}
                    </Label>
                    <div className="relative">
                      <Car className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                      <Select required onValueChange={setSelectedVehicle} value={selectedVehicle}>
                        <SelectTrigger id="vehicle" className="pl-10 h-12 bg-muted/50 border-border focus:bg-background transition-colors duration-300">
                          <SelectValue placeholder={t("booking.vehiclePlaceholder")} />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-border">
                          <SelectItem value="sedan">{t("booking.sedan")}</SelectItem>
                          <SelectItem value="van">{t("booking.van")}</SelectItem>
                          <SelectItem value="minibus">{t("booking.minibus")}</SelectItem>
                          <SelectItem value="custom">{t("booking.custom")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {selectedVehicle === "custom" && (
                  <div className="space-y-2">
                    <Label htmlFor="passengerCount" className="text-sm font-medium text-foreground">
                      {t("booking.passengerCount")}
                    </Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="passengerCount"
                        name="passengerCount"
                        type="number"
                        min={16}
                        placeholder={t("booking.passengerCountPlaceholder")}
                        required
                        className="pl-10 h-12 bg-muted/50 border-border focus:bg-background transition-colors duration-300"
                      />
                    </div>
                  </div>
                )}

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="pickup" className="text-sm font-medium text-foreground">
                      {t("booking.pickup")}
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="pickup"
                        name="pickup"
                        placeholder={t("booking.pickupPlaceholder")}
                        required
                        className="pl-10 h-12 bg-muted/50 border-border focus:bg-background transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dropoff" className="text-sm font-medium text-foreground">
                      {t("booking.dropoff")}
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="dropoff"
                        name="dropoff"
                        placeholder={t("booking.dropoffPlaceholder")}
                        required
                        className="pl-10 h-12 bg-muted/50 border-border focus:bg-background transition-colors duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-sm font-medium text-foreground">
                      {t("booking.date")}
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        required
                        className="pl-10 h-12 bg-muted/50 border-border focus:bg-background transition-colors duration-300"
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
                        name="time"
                        type="time"
                        required
                        className="pl-10 h-12 bg-muted/50 border-border focus:bg-background transition-colors duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-medium text-foreground">
                    {t("booking.notes")}
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder={t("booking.notesPlaceholder")}
                    rows={4}
                    className="bg-muted/50 border-border focus:bg-background transition-colors duration-300 resize-none"
                  />
                </div>
              </div>

              <div className="mt-8">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-base group"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t("booking.sending")}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {t("booking.submit")}
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
