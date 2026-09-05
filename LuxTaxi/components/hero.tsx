"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="grid lg:grid-cols-2 lg:min-h-screen">
      {/* Text panel — same surface as the rest of the site, no overlay needed */}
      <div className="order-2 lg:order-1 flex items-center bg-background px-6 py-16 lg:px-16 lg:pt-24 lg:pb-24">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            {t("hero.tagline")}
          </p>

          <h1 className="font-serif text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight text-foreground animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {t("hero.title1")}
            <br />
            <span className="text-accent">{t("hero.title2")}</span>
          </h1>

          <p className="mt-8 text-lg text-muted-foreground leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
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
              className="text-base px-8 h-14 border-foreground/20 hover:bg-foreground/5 hover:border-foreground/40 transition-all duration-300"
            >
              <Link href="#fleet">{t("hero.explore")}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Photo panel — full-bleed, untouched */}
      <div className="order-1 lg:order-2 relative h-[45vh] lg:h-auto">
        <Image
          src="/images/hero.jpg"
          alt="Luxury limousine transport in Oslo"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}
