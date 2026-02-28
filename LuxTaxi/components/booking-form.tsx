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
          <div className="flex flex-col items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h2 className="font-serif text-4xl font-bold text-foreground">
              {t("booking.confirmedTitle")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("booking.confirmedDescription")}
            </p>
            <Button
              onClick={() => {
                setSubmitted(false);
                setSelectedVehicle("");
              }}
              variant="outline"
              className="mt-4 border-accent text-accent hover:bg-accent/10 bg-transparent"
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
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary mb-4">
            {t("booking.tagline")}
          </p>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            {t("booking.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {t("booking.description")}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-border bg-background p-8 md:p-10"
        >
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
              <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                {t("booking.name")}
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  placeholder={t("booking.namePlaceholder")}
                  required
                  className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
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
                  className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-foreground"
              >
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
                  className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="vehicle"
                className="text-sm font-medium text-foreground"
              >
                {t("booking.vehicle")}
              </Label>
              <div className="relative">
                <Car className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                <Select
                  required
                  onValueChange={setSelectedVehicle}
                  value={selectedVehicle}
                >
                  <SelectTrigger
                    id="vehicle"
                    className="pl-10 bg-secondary border-border text-foreground"
                  >
                    <SelectValue
                      placeholder={t("booking.vehiclePlaceholder")}
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-secondary border-border">
                    <SelectItem value="sedan">
                      {t("booking.sedan")}
                    </SelectItem>
                    <SelectItem value="van">{t("booking.van")}</SelectItem>
                    <SelectItem value="minibus">
                      {t("booking.minibus")}
                    </SelectItem>
                    <SelectItem value="custom">
                      {t("booking.custom")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedVehicle === "custom" && (
              <div className="space-y-2 md:col-span-2">
                <Label
                  htmlFor="passengerCount"
                  className="text-sm font-medium text-foreground"
                >
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
                    className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="pickup"
                className="text-sm font-medium text-foreground"
              >
                {t("booking.pickup")}
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="pickup"
                  name="pickup"
                  placeholder={t("booking.pickupPlaceholder")}
                  required
                  className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="dropoff"
                className="text-sm font-medium text-foreground"
              >
                {t("booking.dropoff")}
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="dropoff"
                  name="dropoff"
                  placeholder={t("booking.dropoffPlaceholder")}
                  required
                  className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="date"
                className="text-sm font-medium text-foreground"
              >
                {t("booking.date")}
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="date"
                  name="date"
                  type="date"
                  required
                  className="pl-10 bg-secondary border-border text-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="time"
                className="text-sm font-medium text-foreground"
              >
                {t("booking.time")}
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="time"
                  name="time"
                  type="time"
                  required
                  className="pl-10 bg-secondary border-border text-foreground"
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label
                htmlFor="notes"
                className="text-sm font-medium text-foreground"
              >
                {t("booking.notes")}
              </Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder={t("booking.notesPlaceholder")}
                rows={4}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground resize-none"
              />
            </div>
          </div>

          <div className="mt-8">
            <Button
              type="submit"
              size="lg"
              className="w-full text-base py-6"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("booking.sending")}
                </span>
              ) : (
                t("booking.submit")
              )}
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              {t("booking.submitNote")}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
