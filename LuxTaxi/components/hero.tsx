"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, ShieldCheck, BadgeDollarSign } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { HeroRouteMap } from "@/components/hero-route-map";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="grid lg:grid-cols-2 lg:min-h-[720px]">
      {/* Text panel */}
      <div className="order-2 lg:order-1 flex items-center bg-background px-6 py-14 lg:px-16 lg:py-24">
        <div className="max-w-xl">
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

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border pt-8 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <div className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">{t("booking.trust247Title")}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">{t("booking.trustDriversTitle")}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <BadgeDollarSign className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">{t("booking.trustPricingTitle")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Route map panel — full-bleed, a real live-styled map with a few
          sample routes and fares, standing in for a hero photograph. */}
      <div className="order-1 lg:order-2 relative h-[45vh] lg:h-auto overflow-hidden">
        <HeroRouteMap />

        {/* Bottom scrim so the fare widget stays legible over any part of the map */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/30 to-transparent" />

        <div className="absolute inset-x-6 bottom-6 sm:inset-x-10 sm:bottom-10">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-card/90 backdrop-blur-md px-5 py-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                {t("hero.mapWidgetBadge")}
              </p>
              <p className="mt-1 font-serif text-sm font-semibold text-foreground">
                {t("hero.mapWidgetTitle")}
              </p>
            </div>
            <Link
              href="#booking"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-xs font-medium text-background transition-opacity hover:opacity-90"
            >
              {t("hero.mapWidgetCta")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
