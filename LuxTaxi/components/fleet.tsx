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
    <section id="fleet" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary mb-4">
            {t("fleet.tagline")}
          </p>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            {t("fleet.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {t("fleet.description")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {vehicleKeys.map((vehicle) => {
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
                className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_hsl(185,75%,50%,0.1)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={vehicle.image || "/placeholder.svg"}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-background/80 backdrop-blur-sm px-3 py-1.5">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      {vehicle.seats} {t("fleet.seats")} ({vehicle.passengers}{" "}
                      {t("fleet.passengers")})
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                    {name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <Button asChild className="w-full group/btn">
                    <Link href="#booking" className="flex items-center gap-2">
                      {t("fleet.book")} {name}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Order Card */}
        <div className="mt-8">
          <div className="group relative overflow-hidden rounded-lg border border-dashed border-primary/40 bg-card transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_hsl(185,75%,50%,0.12)]">
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-10">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <UsersRound className="h-10 w-10 text-primary" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                  <h3 className="font-serif text-2xl font-bold text-foreground">
                    {t("fleet.custom.name")}
                  </h3>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {t("fleet.custom.badge")}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
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
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                asChild
                size="lg"
                className="shrink-0 group/btn"
              >
                <Link href="#booking" className="flex items-center gap-2">
                  {t("fleet.custom.cta")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
