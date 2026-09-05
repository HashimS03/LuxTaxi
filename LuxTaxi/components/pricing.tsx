"use client";

import Link from "next/link";
import { Car, Users, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/locale-context";

type MeteredVehicle = {
  key: "luxury" | "four" | "seven" | "sixteen";
  baseFare: number;
  perKm: number;
  perMinute: number;
  minFare: number;
  hourly: number;
  airport: number;
  airportNote?: true;
};

const meteredVehicles: MeteredVehicle[] = [
  { key: "luxury", baseFare: 189, perKm: 22, perMinute: 10, minFare: 690, hourly: 1090, airport: 1850 },
  { key: "four", baseFare: 149, perKm: 20, perMinute: 9, minFare: 590, hourly: 900, airport: 1350 },
  { key: "seven", baseFare: 199, perKm: 33, perMinute: 10, minFare: 790, hourly: 1290, airport: 2150 },
  { key: "sixteen", baseFare: 249, perKm: 55, perMinute: 15, minFare: 990, hourly: 1590, airport: 2990, airportNote: true },
];

function kr(amount: number) {
  return `${amount.toLocaleString("nb-NO")} kr`;
}

export function Pricing() {
  const { t } = useLocale();

  return (
    <section className="pt-40 pb-24 lg:pb-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-4">
            {t("pricing.tagline")}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight">
            {t("pricing.title")}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {t("pricing.description")}
          </p>
        </div>

        {/* Metered Vehicle Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {meteredVehicles.map((vehicle) => (
            <div
              key={vehicle.key}
              className="flex flex-col bg-card border border-border overflow-hidden transition-all duration-500 hover:border-foreground/20 hover:shadow-lg"
            >
              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-6 flex h-14 w-14 items-center justify-center bg-muted border border-border">
                  <Car className="h-6 w-6 text-foreground" />
                </div>

                <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                  {t(`pricing.${vehicle.key}.name`)}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t(`pricing.${vehicle.key}.desc`)}
                </p>

                <dl className="space-y-3 text-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <dt className="text-muted-foreground">{t("pricing.baseFare")}</dt>
                    <dd className="font-medium text-foreground">{kr(vehicle.baseFare)}</dd>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <dt className="text-muted-foreground">{t("pricing.perKm")}</dt>
                    <dd className="font-medium text-foreground">{kr(vehicle.perKm)}</dd>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <dt className="text-muted-foreground">{t("pricing.perMinute")}</dt>
                    <dd className="font-medium text-foreground">{kr(vehicle.perMinute)}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">{t("pricing.minFare")}</dt>
                    <dd className="font-medium text-foreground">{kr(vehicle.minFare)}</dd>
                  </div>
                </dl>

                <div className="mt-6 pt-6 border-t border-dashed border-border">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
                    {t("pricing.fixedTitle")}
                  </p>
                  <dl className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">{t("pricing.hourly")}</dt>
                      <dd className="font-medium text-foreground">{kr(vehicle.hourly)}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-muted-foreground">{t("pricing.airport")}</dt>
                      <dd className="font-medium text-foreground text-right shrink-0">
                        {kr(vehicle.airport)}
                      </dd>
                    </div>
                    {vehicle.airportNote && (
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {t("pricing.sixteen.airportNote")}
                      </p>
                    )}
                  </dl>
                </div>
              </div>

              <div className="p-8 pt-0">
                <Button asChild variant="outline" className="w-full group/btn border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300">
                  <Link href="/#booking" className="flex items-center justify-center gap-2">
                    {t("pricing.cta")}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}

          {/* 16+ Custom Card */}
          <div className="flex flex-col bg-background border-2 border-dashed border-border p-8 transition-all duration-300 hover:border-accent/50">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 border border-accent/20">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
              {t("pricing.sixteenPlus.name")}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
              {t("pricing.sixteenPlus.desc")}
            </p>
            <p className="text-sm font-medium text-foreground mb-6">
              {t("pricing.sixteenPlus.note")}
            </p>
            <Button
              asChild
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 group/btn"
            >
              <Link href="/#booking" className="flex items-center justify-center gap-2">
                {t("pricing.customCta")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-12 flex items-start gap-3 bg-muted/50 border border-border p-6">
          <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("pricing.destinationNote")}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("pricing.footnote")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
