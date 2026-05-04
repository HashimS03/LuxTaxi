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
    <section id="services" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-4">
              {t("services.tagline")}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight">
              {t("services.title")}
            </h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
            {t("services.description")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3 border border-border">
          {serviceKeys.map((service, index) => (
            <div
              key={service.key}
              className="group bg-card p-10 transition-all duration-500 hover:bg-muted/50"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center bg-muted border border-border transition-all duration-500 group-hover:bg-foreground group-hover:border-foreground">
                <service.icon className="h-6 w-6 text-foreground transition-colors duration-500 group-hover:text-background" />
              </div>
              
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {t(`services.${service.key}`)}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {t(`services.${service.key}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
