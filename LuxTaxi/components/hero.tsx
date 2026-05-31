"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, ChevronDown } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative min-h-[100svh] flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Luxury limousine transport in Oslo"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content - Centered on mobile */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 pt-20 pb-24">
        <div className="max-w-3xl mx-auto text-center sm:text-left sm:mx-0 sm:ml-auto sm:mr-auto lg:ml-[10%]">
          <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-white/80 mb-4">
            Oslo, Norway
          </p>
          
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] text-white">
            Chauffeur &<br />
            <span className="text-accent">Transport Service</span>
          </h1>
          
          <p className="mt-5 text-base sm:text-lg text-white/80 max-w-md mx-auto sm:mx-0">
            Professional transport for airport transfers, business travel, and special occasions.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-sm mx-auto sm:mx-0 sm:max-w-none">
            <Button 
              size="lg" 
              asChild 
              className="h-14 text-base bg-accent hover:bg-accent/90 text-white"
            >
              <Link href="#booking">
                {t("hero.cta")}
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="h-14 text-base bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <a href="tel:+4748420389" className="flex items-center justify-center gap-2">
                <Phone className="h-5 w-5" />
                <span>Call Now</span>
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <Link
          href="#fleet"
          className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors"
          aria-label="Scroll down"
        >
          <span className="text-[10px] uppercase tracking-widest">Explore</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
