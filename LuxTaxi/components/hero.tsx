"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown, Phone } from "lucide-react";
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
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/30" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
          <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground mb-4 sm:mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            {t("hero.tagline")}
          </p>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-foreground animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {t("hero.title1")}
            <br />
            <span className="text-accent">{t("hero.title2")}</span>
          </h1>
          
          <p className="mt-6 sm:mt-8 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            {t("hero.description")}
          </p>
          
          <div className="mt-8 sm:mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" asChild className="group text-base px-6 sm:px-8 h-12 sm:h-14 w-full sm:w-auto">
              <Link href="#booking" className="flex items-center justify-center gap-2">
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="text-base px-6 sm:px-8 h-12 sm:h-14 w-full sm:w-auto border-foreground/20 hover:bg-foreground/5 hover:border-foreground/40 transition-all duration-300"
            >
              <a href="tel:+4748420389" className="flex items-center justify-center gap-2">
                <Phone className="h-4 w-4" />
                +47 484 20 389
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - hidden on mobile */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-fade-in hidden sm:block" style={{ animationDelay: "0.6s" }}>
        <Link
          href="#fleet"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 group"
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
