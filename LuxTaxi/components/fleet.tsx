"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, ArrowRight, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/locale-context";

const vehicleKeys = [
  { key: "sedan", image: "/images/sedan.jpg", seats: 5, passengers: 4 },
  { key: "van", image: "/images/van.jpg", seats: 9, passengers: 8 },
  { key: "minibus", image: "/images/minibus.jpg", seats: 16, passengers: 15 },
];

export function Fleet() {
  const { t } = useLocale();

  return (
    <section id="fleet" className="py-24 lg:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-4">
            {t("fleet.tagline")}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight">
            {t("fleet.title")}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {t("fleet.description")}
          </p>
        </div>

        {/* Vehicle Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {vehicleKeys.map((vehicle, index) => {
            const name = t(`fleet.${vehicle.key}.name`);
            const description = t(`fleet.${vehicle.key}.description`);
            const features = [
              t(`fleet.${vehicle.key}.f1`),
              t(`fleet.${vehicle.key}.f2`),
              t(`fleet.${vehicle.key}.f3`),
              t(`fleet.${vehicle.key}.f4`),
            ];

            return (
              <div
                key={vehicle.key}
                className="group bg-background border border-border overflow-hidden transition-all duration-500 hover:border-foreground/20 hover:shadow-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={vehicle.image || "/placeholder.svg"}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-background/90 backdrop-blur-sm px-3 py-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <Users className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium text-foreground">
                      {vehicle.passengers} {t("fleet.passengers")}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                    {name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1.5 text-xs font-medium text-muted-foreground bg-muted border border-border"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <Button asChild variant="outline" className="w-full group/btn border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300">
                    <Link href="#booking" className="flex items-center justify-center gap-2">
                      {t("fleet.book")} {name}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Order Card */}
        <div className="mt-12">
          <div className="bg-background border-2 border-dashed border-border p-10 lg:p-12 flex flex-col md:flex-row items-center gap-8 lg:gap-12 transition-all duration-300 hover:border-accent/50">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-accent/10 border border-accent/20">
              <UsersRound className="h-10 w-10 text-accent" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                <h3 className="font-serif text-2xl font-semibold text-foreground">
                  {t("fleet.custom.name")}
                </h3>
                <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                  {t("fleet.custom.badge")}
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-xl">
                {t("fleet.custom.description")}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {[
                  t("fleet.custom.f1"),
                  t("fleet.custom.f2"),
                  t("fleet.custom.f3"),
                  t("fleet.custom.f4"),
                ].map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1.5 text-xs font-medium bg-muted text-muted-foreground border border-border"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="shrink-0 bg-accent text-accent-foreground hover:bg-accent/90 group/btn"
            >
              <Link href="#booking" className="flex items-center gap-2">
                {t("fleet.custom.cta")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
