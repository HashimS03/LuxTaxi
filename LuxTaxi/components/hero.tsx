"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowDown, Star } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Luxury limousine transport in Oslo"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center pt-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 mb-8">
          <Star className="h-4 w-4 text-primary fill-primary" />
          <span className="text-sm font-medium text-primary tracking-wide">
            {t("hero.tagline")}
          </span>
        </div>
        <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl text-balance">
          {t("hero.title1")}
          <br />
          <span className="text-primary">{t("hero.title2")}</span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          {t("hero.description")}
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" asChild className="text-base px-8 py-6 shadow-lg shadow-primary/20">
            <Link href="#booking">{t("hero.cta")}</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="text-base px-8 py-6 border-primary/40 text-primary hover:bg-primary/10 bg-transparent hover:border-primary"
          >
            <Link href="#fleet">{t("hero.explore")}</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <Link
          href="#fleet"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          aria-label="Scroll down to fleet section"
        >
          <span className="text-xs uppercase tracking-widest">
            {t("hero.discover")}
          </span>
          <ArrowDown className="h-5 w-5 animate-bounce group-hover:text-primary transition-colors" />
        </Link>
      </div>
    </section>
  );
}
