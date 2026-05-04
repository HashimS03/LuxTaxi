"use client";

import { useLocale } from "@/lib/locale-context";

export function Stats() {
  const { t } = useLocale();

  const stats = [
    { value: "12K+", label: t("stats.rides") },
    { value: "98%", label: t("stats.satisfaction") },
    { value: "24/7", label: t("stats.availability") },
    { value: "50+", label: t("stats.chauffeurs") },
  ];

  return (
    <section className="py-20 lg:py-24 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-12 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <p className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-background tracking-tight">
                {stat.value}
              </p>
              <p className="mt-3 text-sm font-medium text-background/60 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
