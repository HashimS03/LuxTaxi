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
  const [dateError, setDateError] = useState("");
  const { t } = useLocale();

  function validateDateTime(date: string, time: string): boolean {
    if (!date || !time) return true;
    
    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    const minDateTime = new Date(now.getTime() + 5 * 60 * 60 * 1000);
    
    if (selectedDateTime < minDateTime) {
      setDateError(t("booking.dateError"));
      return false;
    }
    
    setDateError("");
    return true;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setDateError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    
    if (!validateDateTime(date, time)) {
      setLoading(false);
      return;
    }

    const body = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      vehicle: selectedVehicle,
      passengerCount: formData.get("passengerCount") as string | null,
      pickup: formData.get("pickup") as string,
      dropoff: formData.get("dropoff") as string,
      date: date,
      time: time,
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
      setError(err instanceof Error ? err.message : t("booking.errorGeneric"));
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section id="booking" className="py-12 sm:py-20 lg:py-28 bg-card">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 flex items-center justify-center rounded-full bg-accent/10">
              <CheckCircle2 className="h-8 w-8 text-accent" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
              {t("booking.confirmedTitle")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("booking.confirmedDescription")}
            </p>
            <Button
              onClick={() => {
                setSubmitted(false);
                setSelectedVehicle("");
              }}
              variant="outline"
              className="mt-2"
            >
              {t("booking.bookAnother")}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-12 sm:py-20 lg:py-28 bg-card">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs font-medium uppercase tracking-widest text-accent mb-2">
            {t("booking.tagline")}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
            {t("booking.title")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("booking.description")}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-background border border-border p-4 sm:p-6">
          {error && (
            <div className="mb-4 flex items-start gap-2 border border-destructive/50 bg-destructive/5 p-3 text-sm">
              <AlertCircle className="h-4 w-4 shrink-0 text-destructive mt-0.5" />
              <p className="text-destructive">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Name & Email */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm">{t("booking.name")}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="name" name="name" required className="pl-9 h-11" placeholder={t("booking.namePlaceholder")} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm">{t("booking.email")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="email" name="email" type="email" required className="pl-9 h-11" placeholder={t("booking.emailPlaceholder")} />
                </div>
              </div>
            </div>

            {/* Phone & Vehicle */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-sm">{t("booking.phone")}</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="phone" name="phone" type="tel" required className="pl-9 h-11" placeholder={t("booking.phonePlaceholder")} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="vehicle" className="text-sm">{t("booking.vehicle")}</Label>
                <div className="relative">
                  <Car className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                  <Select required onValueChange={setSelectedVehicle} value={selectedVehicle}>
                    <SelectTrigger id="vehicle" className="pl-9 h-11">
                      <SelectValue placeholder={t("booking.vehiclePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">{t("booking.sedan")}</SelectItem>
                      <SelectItem value="van">{t("booking.van")}</SelectItem>
                      <SelectItem value="minibus">{t("booking.minibus")}</SelectItem>
                      <SelectItem value="custom">{t("booking.custom")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Passenger Count (conditional) */}
            {selectedVehicle === "custom" && (
              <div className="space-y-1.5">
                <Label htmlFor="passengerCount" className="text-sm">{t("booking.passengerCount")}</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="passengerCount" name="passengerCount" type="number" min={16} required className="pl-9 h-11" placeholder={t("booking.passengerCountPlaceholder")} />
                </div>
              </div>
            )}

            {/* Pickup & Dropoff */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="pickup" className="text-sm">{t("booking.pickup")}</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="pickup" name="pickup" required className="pl-9 h-11" placeholder={t("booking.pickupPlaceholder")} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dropoff" className="text-sm">{t("booking.dropoff")}</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="dropoff" name="dropoff" required className="pl-9 h-11" placeholder={t("booking.dropoffPlaceholder")} />
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="date" className="text-sm">{t("booking.date")}</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="date" 
                    name="date" 
                    type="date" 
                    required 
                    className={`pl-9 h-11 ${dateError ? "border-destructive" : ""}`}
                    onChange={() => setDateError("")}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="time" className="text-sm">{t("booking.time")}</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="time" 
                    name="time" 
                    type="time" 
                    required 
                    className={`pl-9 h-11 ${dateError ? "border-destructive" : ""}`}
                    onChange={() => setDateError("")}
                  />
                </div>
              </div>
            </div>

            {dateError && (
              <div className="flex items-start gap-2 text-sm text-destructive bg-destructive/5 p-3 border border-destructive/20">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{dateError}</span>
              </div>
            )}

            {/* Notes */}
            <div className="space-y-1.5">
              <Label htmlFor="notes" className="text-sm">{t("booking.notes")}</Label>
              <Textarea id="notes" name="notes" rows={3} className="resize-none" placeholder={t("booking.notesPlaceholder")} />
            </div>
          </div>

          {/* Policy & Submit */}
          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-4">
              {t("booking.policy1")}{" "}
              <a href="tel:+4748420389" className="text-accent font-medium">
                {t("booking.policy2")}
              </a>
            </p>
            <Button type="submit" size="lg" className="w-full h-12" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("booking.sending")}
                </span>
              ) : (
                t("booking.submit")
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
