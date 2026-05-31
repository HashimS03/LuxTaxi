"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Luxury limousine transport in Oslo"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background/80 sm:bg-gradient-to-r sm:from-background/90 sm:via-background/70 sm:to-background/30" />
      </div>

      <div className="relative z-10 w-full px-5 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="max-w-xl pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
          <p className="text-xs font-medium uppercase tracking-widest text-accent mb-3 sm:mb-4">
            {t("hero.tagline")}
          </p>
          
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-foreground">
            {t("hero.title1")}{" "}
            <span className="text-accent">{t("hero.title2")}</span>
          </h1>
          
          <p className="mt-4 sm:mt-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t("hero.description")}
          </p>
          
          <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button size="lg" asChild className="h-12 sm:h-14 text-sm sm:text-base">
              <Link href="#booking">
                {t("hero.cta")}
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="h-12 sm:h-14 text-sm sm:text-base border-foreground/20"
            >
              <a href="tel:+4748420389" className="flex items-center justify-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+47 484 20 389</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
