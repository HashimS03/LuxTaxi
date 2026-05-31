"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/locale-context";

const vehicles = [
  { key: "sedan", image: "/images/sedan.jpg", passengers: 4 },
  { key: "van", image: "/images/van.jpg", passengers: 8 },
  { key: "minibus", image: "/images/minibus.jpg", passengers: 15 },
];

export function Fleet() {
  const { t } = useLocale();

  return (
    <section id="fleet" className="py-12 sm:py-20 lg:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <p className="text-xs font-medium uppercase tracking-widest text-accent mb-2">
            {t("fleet.tagline")}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground">
            {t("fleet.title")}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl">
            {t("fleet.description")}
          </p>
        </div>

        {/* Vehicle Cards - Horizontal scroll on mobile */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.key}
              className="flex-shrink-0 w-72 sm:w-auto bg-background border border-border overflow-hidden"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={vehicle.image}
                  alt={t(`fleet.${vehicle.key}.name`)}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-background/90 px-2 py-1 text-xs font-medium">
                  <Users className="h-3 w-3 text-accent" />
                  {vehicle.passengers} {t("fleet.passengers")}
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground mb-2">
                  {t(`fleet.${vehicle.key}.name`)}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {t(`fleet.${vehicle.key}.description`)}
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="#booking">
                    {t("fleet.book")}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Order - Simplified */}
        <div className="mt-8 sm:mt-12 p-5 sm:p-8 border-2 border-dashed border-border bg-background">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground">
                {t("fleet.custom.name")}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t("fleet.custom.description")}
              </p>
            </div>
            <Button asChild className="shrink-0">
              <Link href="#booking" className="flex items-center gap-2">
                {t("fleet.custom.cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
