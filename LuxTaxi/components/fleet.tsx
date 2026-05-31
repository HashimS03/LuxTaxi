"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, ArrowRight, ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/locale-context";

const vehicles = [
  { key: "sedan", image: "/images/sedan.jpg", passengers: 4 },
  { key: "van", image: "/images/van.jpg", passengers: 8 },
  { key: "minibus", image: "/images/minibus.jpg", passengers: 15 },
];

export function Fleet() {
  const { t } = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowScrollHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="fleet" className="py-16 sm:py-24 bg-card">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <p className="text-xs font-medium uppercase tracking-widest text-accent mb-2">
            {t("fleet.tagline")}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground">
            {t("fleet.title")}
          </h2>
        </div>

        {/* Vehicle Cards Container */}
        <div className="relative">
          {/* Scroll buttons - desktop only */}
          <button
            onClick={() => scroll("left")}
            className={`hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-background shadow-lg border border-border transition-opacity ${
              canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-background shadow-lg border border-border transition-opacity ${
              canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible scrollbar-hide"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.key}
                className="flex-shrink-0 w-[280px] sm:w-auto bg-background border border-border overflow-hidden"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={vehicle.image}
                    alt={t(`fleet.${vehicle.key}.name`)}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-background/90 px-2 py-1 text-xs font-medium">
                    <Users className="h-3 w-3 text-accent" />
                    {vehicle.passengers}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                    {t(`fleet.${vehicle.key}.name`)}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {t(`fleet.${vehicle.key}.description`)}
                  </p>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href="#booking">{t("fleet.book")}</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile scroll hint - animated drag indicator */}
          {showScrollHint && (
            <div className="sm:hidden absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-2 animate-scroll-hint">
                <MoveHorizontal className="h-5 w-5 text-foreground/60" />
              </div>
            </div>
          )}
        </div>

        {/* Custom Order */}
        <div className="mt-10 sm:mt-14 p-5 sm:p-8 border border-border bg-background">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground">
                {t("fleet.custom.name")}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t("fleet.custom.description")}
              </p>
            </div>
            <Button asChild className="shrink-0">
              <Link href="#booking" className="flex items-center gap-2">
                {t("fleet.custom.cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
