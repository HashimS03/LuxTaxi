"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Luxury limousine transport in Oslo"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="max-w-2xl pt-32 pb-24 lg:pt-40 lg:pb-32">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/70 mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            {t("hero.tagline")}
          </p>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-white animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {t("hero.title1")}
            <br />
            <span className="text-accent">{t("hero.title2")}</span>
          </h1>

          <p className="mt-8 text-lg text-white/80 leading-relaxed max-w-xl animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            {t("hero.description")}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" asChild className="group text-base px-8 h-14">
              <Link href="#booking" className="flex items-center gap-2">
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="text-base px-8 h-14 border-white/30 hover:bg-white/10 hover:border-white/60 transition-all duration-300"
            >
              <Link href="#fleet">{t("hero.explore")}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <Link
          href="#fleet"
          className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 group"
          aria-label="Scroll down to fleet section"
        >
          <span className="text-xs uppercase tracking-widest font-medium">
            {t("hero.discover")}
          </span>
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
