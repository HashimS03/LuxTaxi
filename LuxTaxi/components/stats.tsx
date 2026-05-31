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
    <section className="py-10 sm:py-16 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-background">
                {stat.value}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-background/60 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
