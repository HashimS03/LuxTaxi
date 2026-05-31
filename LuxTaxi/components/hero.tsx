"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative min-h-[100svh] flex flex-col bg-background">
      {/* Top section with image */}
      <div className="relative flex-1 min-h-[45vh] sm:min-h-[50vh]">
        <Image
          src="/images/hero.jpg"
          alt="Luxury limousine transport in Oslo"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />
      </div>

      {/* Content section */}
      <div className="relative z-10 px-5 sm:px-6 lg:px-8 pb-8 pt-6 sm:pt-10 -mt-16 sm:-mt-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-3">
            Oslo, Norway
          </p>
          
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-foreground">
            Professional Chauffeur & Transport Service
          </h1>
          
          <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
            Airport transfers, business travel, and special occasions. Available 24/7.
          </p>
          
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild className="h-12 sm:h-14 text-sm sm:text-base px-8">
              <Link href="#booking">
                {t("hero.cta")}
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="h-12 sm:h-14 text-sm sm:text-base px-6"
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
