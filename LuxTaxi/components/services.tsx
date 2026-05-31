"use client";

import { Plane, Building2, GlassWater, Clock } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

const services = [
  { key: "airport", icon: Plane },
  { key: "corporate", icon: Building2 },
  { key: "weddings", icon: GlassWater },
  { key: "hourly", icon: Clock },
];

export function Services() {
  const { t } = useLocale();

  return (
    <section id="services" className="py-12 sm:py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <p className="text-xs font-medium uppercase tracking-widest text-accent mb-2">
            {t("services.tagline")}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground">
            {t("services.title")}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl">
            {t("services.description")}
          </p>
        </div>

        {/* Services Grid - 2x2 on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {services.map((service) => (
            <div
              key={service.key}
              className="p-4 sm:p-6 bg-card border border-border"
            >
              <div className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center bg-muted mb-3 sm:mb-4">
                <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
              </div>
              <h3 className="font-medium text-sm sm:text-base text-foreground mb-1 sm:mb-2">
                {t(`services.${service.key}`)}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">
                {t(`services.${service.key}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
