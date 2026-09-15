"use client";

import { useLocale } from "@/lib/locale-context";
import { AnimatedNumber } from "@/components/animated-number";
import { Reveal } from "@/components/reveal";

export function Stats() {
  const { t } = useLocale();

  const stats = [
    { target: 12, suffix: "K+", label: t("stats.rides") },
    { target: 98, suffix: "%", label: t("stats.satisfaction") },
    { target: 24, suffix: "/7", label: t("stats.availability") },
    { target: 50, suffix: "+", label: t("stats.chauffeurs") },
  ];

  return (
    <section className="bg-foreground py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-12 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 100} className="text-center">
              <p className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-background tracking-tight">
                <AnimatedNumber target={stat.target} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-sm font-medium text-background/60 uppercase tracking-wider">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
