"use client";

import {
  Plane,
  Building2,
  GlassWater,
  Briefcase,
  Clock,
  Shield,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
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
    <section id="services" className="py-24 lg:py-32 bg-surfaceAlt">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
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
        </Reveal>

        {/* Services Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceKeys.map((service, index) => (
            <Reveal
              key={service.key}
              delay={index * 80}
              className="group bg-card border border-border rounded-3xl p-9 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-28px_rgba(35,38,32,0.25)]"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-all duration-500 group-hover:bg-foreground">
                <service.icon className="h-5 w-5 text-accent transition-colors duration-500 group-hover:text-background" />
              </div>

              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {t(`services.${service.key}`)}
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                {t(`services.${service.key}Desc`)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
