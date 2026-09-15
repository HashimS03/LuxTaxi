"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { HeroRouteMap } from "@/components/hero-route-map";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="mx-auto max-w-7xl px-6 pt-10 pb-16 lg:px-8 lg:pt-16 lg:pb-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Text panel */}
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            {t("hero.tagline")}
          </p>

          <h1 className="font-serif text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight text-foreground animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {t("hero.title1")}
            <br />
            <span className="text-accent">{t("hero.title2")}</span>
          </h1>

          <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-lg animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            {t("hero.description")}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" asChild className="group rounded-full text-base px-8 h-14">
              <Link href="#booking" className="flex items-center gap-2">
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="rounded-full text-base px-8 h-14 border-border bg-card hover:bg-muted/60 transition-all duration-300"
            >
              <Link href="#fleet">{t("hero.explore")}</Link>
            </Button>
          </div>
        </div>

        {/* Route map panel — a real, live-styled map with a few sample
            routes and fares, standing in for a hero photograph. */}
        <div className="relative pb-24">
          <div className="relative h-[380px] md:h-[460px] lg:h-[560px] overflow-hidden rounded-[32px] shadow-[0_40px_80px_-30px_rgba(35,38,32,0.35)]">
            <HeroRouteMap />
          </div>

          {/* Floating fare-preview card, overlapping the bottom edge */}
          <div className="absolute inset-x-4 -bottom-10 rounded-3xl border border-border bg-card p-6 shadow-[0_30px_60px_-24px_rgba(35,38,32,0.3)] sm:inset-x-8">
            <div className="flex items-center justify-between mb-3">
              <span className="font-serif text-[15px] font-semibold text-foreground">
                {t("hero.mapWidgetTitle")}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                {t("hero.mapWidgetBadge")}
              </span>
            </div>
            <Link
              href="#booking"
              className="flex items-center justify-between gap-4 rounded-full bg-foreground px-5 py-3 text-background transition-opacity hover:opacity-90"
            >
              <span className="text-sm font-medium">{t("hero.mapWidgetCta")}</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
