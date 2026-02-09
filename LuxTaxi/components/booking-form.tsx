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
} from "lucide-react";
import { useLocale } from "@/lib/locale-context";

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const { t } = useLocale();

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
              onClick={() => setSubmitted(false)}
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
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="rounded-lg border border-border bg-background p-8 md:p-10"
        >
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
                <Select required onValueChange={setSelectedVehicle} value={selectedVehicle}>
                  <SelectTrigger
                    id="vehicle"
                    className="pl-10 bg-secondary border-border text-foreground"
                  >
                    <SelectValue placeholder={t("booking.vehiclePlaceholder")} />
                  </SelectTrigger>
                  <SelectContent className="bg-secondary border-border">
                    <SelectItem value="sedan">{t("booking.sedan")}</SelectItem>
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
                placeholder={t("booking.notesPlaceholder")}
                rows={4}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground resize-none"
              />
            </div>
          </div>

          <div className="mt-8">
            <Button type="submit" size="lg" className="w-full text-base py-6">
              {t("booking.submit")}
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
