"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Luxury transport on a night highway"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/75" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center pt-20">
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-primary">
          {t("hero.tagline")}
        </p>
        <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl text-balance">
          {t("hero.title1")}
          <br />
          <span className="text-accent">{t("hero.title2")}</span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          {t("hero.description")}
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" asChild className="text-base px-8 py-6">
            <Link href="#booking">{t("hero.cta")}</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="text-base px-8 py-6 border-primary/30 text-primary hover:bg-primary/10 bg-transparent"
          >
            <Link href="#fleet">{t("hero.explore")}</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <Link
          href="#fleet"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          aria-label="Scroll down to fleet section"
        >
          <span className="text-xs uppercase tracking-widest">
            {t("hero.discover")}
          </span>
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
