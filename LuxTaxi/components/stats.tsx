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
    <section className="border-y border-border bg-card py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-4xl font-bold text-primary md:text-5xl">
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
