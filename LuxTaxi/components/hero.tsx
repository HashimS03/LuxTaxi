"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, ShieldCheck, BadgeDollarSign } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { HeroBokeh } from "@/components/hero-bokeh";

const MARQUEE_SERVICES = ["airport", "corporate", "weddings", "business", "hourly", "vip"];

export function Hero() {
  const { t } = useLocale();
  const services = MARQUEE_SERVICES.map((key) => t(`services.${key}`));

  return (
    // Pulled up under the floating navbar so the dark scene starts at the
    // very top of the page instead of below an ivory strip.
    <section className="relative isolate -mt-16 flex flex-col overflow-hidden bg-[#0d0b0a] text-white lg:min-h-[max(100svh,760px)]">
      {/* Photo — full width on mobile, the right two-thirds on desktop so
          the car never sits behind the headline. */}
      <div className="relative h-[46svh] min-h-[340px] overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[66%]">
        <Image
          src="/images/hero.webp"
          alt="Chauffeured black sedan on a city highway at night"
          fill
          priority
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="animate-kenburns object-cover object-[45%_55%]"
        />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0d0b0a]/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0d0b0a] to-transparent lg:h-1/3" />
        <div className="absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-[#0d0b0a] to-transparent lg:block" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-grain opacity-[0.07] mix-blend-overlay" />
      <HeroBokeh className="pointer-events-none absolute inset-0 z-20 h-full w-full" />

      <div className="relative z-30 mx-auto -mt-28 flex w-full max-w-7xl flex-1 items-center px-6 pb-14 lg:mt-0 lg:px-8 lg:pb-16 lg:pt-32">
        <div className="max-w-xl">
          <p
            className="mb-4 text-sm font-medium uppercase lg:mb-6 tracking-[0.25em] text-[#D8B676] animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            {t("hero.tagline")}
          </p>

          <h1
            className="font-serif text-5xl font-medium leading-[1.05] tracking-tight animate-fade-in-up md:text-6xl xl:text-7xl"
            style={{ animationDelay: "0.2s" }}
          >
            {t("hero.title1")}
            <br />
            <span className="text-shimmer-gold">{t("hero.title2")}</span>
          </h1>

          <p
            className="mt-5 max-w-md lg:mt-7 text-lg leading-relaxed text-white/70 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            {t("hero.description")}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:gap-4 lg:mt-10 animate-fade-in-up sm:flex-row" style={{ animationDelay: "0.4s" }}>
            <Button
              size="lg"
              asChild
              className="group h-14 rounded-full bg-white px-8 text-base text-[#0d0b0a] hover:bg-white/90"
            >
              <Link href="#booking" className="flex items-center gap-2">
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="h-14 rounded-full border-white/25 bg-white/5 px-8 text-base text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
            >
              <Link href="#fleet">{t("hero.explore")}</Link>
            </Button>
          </div>

          <div
            className="mt-8 flex flex-wrap lg:mt-12 items-center gap-x-7 gap-y-3 animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 text-[#D8B676]" />
              <span className="text-sm text-white/65">{t("booking.trust247Title")}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4 text-[#D8B676]" />
              <span className="text-sm text-white/65">{t("booking.trustDriversTitle")}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <BadgeDollarSign className="h-4 w-4 text-[#D8B676]" />
              <span className="text-sm text-white/65">{t("booking.trustPricingTitle")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slow-scrolling strip of the services offered */}
      <div className="relative z-30 border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="group flex overflow-hidden py-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]">
            {[...services, ...services].map((service, i) => (
              <span key={i} className="flex items-center" aria-hidden={i >= services.length || undefined}>
                <span className="px-10 text-xs font-medium uppercase tracking-[0.3em] text-white/75 md:text-sm">
                  {service}
                </span>
                <span className="text-xs text-[#D8B676]">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
