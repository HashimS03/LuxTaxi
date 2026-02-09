"use client";

import {
  Plane,
  Building2,
  GlassWater,
  Briefcase,
  Clock,
  Shield,
} from "lucide-react";
import { useLocale } from "@/lib/locale-context";

const serviceKeys = [
  { key: "airport", icon: Plane },
  { key: "corporate", icon: Building2 },
  { key: "weddings", icon: GlassWater },
  { key: "business", icon: Briefcase },
  { key: "hourly", icon: Clock },
  { key: "vip", icon: Shield },
];

export function Services() {
  const { t } = useLocale();

  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary mb-4">
            {t("services.tagline")}
          </p>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            {t("services.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {t("services.description")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceKeys.map((service) => (
            <div
              key={service.key}
              className="group rounded-lg border border-border bg-card p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_hsl(185,75%,50%,0.1)]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                {t(`services.${service.key}`)}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(`services.${service.key}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
