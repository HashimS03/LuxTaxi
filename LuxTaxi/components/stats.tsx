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
    <section className="py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-10 border-y border-border py-10 lg:grid-cols-4 lg:gap-0 lg:py-9">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center lg:border-r lg:border-border lg:last:border-r-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <p className="font-serif text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
