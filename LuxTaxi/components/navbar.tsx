"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/locale-context";

export function Navbar({ transparent = true }: { transparent?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { locale, setLocale, t } = useLocale();

  useEffect(() => {
    if (!transparent) return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [transparent]);

  // Once scrolled (or on pages without a hero image to sit over), the navbar
  // switches to a solid background with dark text. Before that, on the
  // homepage hero, it needs light text plus a scrim so it stays legible
  // over whatever part of the photo is behind it.
  const solid = !transparent || scrolled;
  const linkClass = solid
    ? "text-muted-foreground hover:text-foreground"
    : "text-white/80 hover:text-white";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-gradient-to-b from-black/60 via-black/25 to-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className={`font-serif text-xl md:text-2xl font-semibold tracking-tight transition-colors duration-300 ${
                solid ? "text-foreground" : "text-white"
              }`}
            >
              Oslo Limousine
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            <Link
              href="/#fleet"
              className={`text-sm font-medium transition-colors duration-300 ${linkClass}`}
            >
              {t("nav.fleet")}
            </Link>
            <Link
              href="/#services"
              className={`text-sm font-medium transition-colors duration-300 ${linkClass}`}
            >
              {t("nav.services")}
            </Link>
            <Link
              href="/pricing"
              className={`text-sm font-medium transition-colors duration-300 ${linkClass}`}
            >
              {t("nav.pricing")}
            </Link>
            <Link
              href="/#booking"
              className={`text-sm font-medium transition-colors duration-300 ${linkClass}`}
            >
              {t("nav.book")}
            </Link>
            <Link
              href="/#contact"
              className={`text-sm font-medium transition-colors duration-300 ${linkClass}`}
            >
              {t("nav.contact")}
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              onClick={() => setLocale(locale === "en" ? "no" : "en")}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${linkClass}`}
              aria-label="Switch language"
            >
              <Globe className="h-4 w-4" />
              <span>{locale === "en" ? "NO" : "EN"}</span>
            </button>
            <Button asChild className="group">
              <Link href="/#booking" className="flex items-center gap-2">
                {t("nav.bookRide")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button
              type="button"
              onClick={() => setLocale(locale === "en" ? "no" : "en")}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${linkClass}`}
              aria-label="Switch language"
            >
              <Globe className="h-4 w-4" />
              <span>{locale === "en" ? "NO" : "EN"}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 transition-colors duration-300 ${solid ? "text-foreground" : "text-white"}`}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-background/98 backdrop-blur-md border-t border-border">
          <div className="px-6 py-8 flex flex-col gap-6">
            <Link
              href="/#fleet"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-foreground hover:text-accent transition-colors duration-300"
            >
              {t("nav.fleet")}
            </Link>
            <Link
              href="/#services"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-foreground hover:text-accent transition-colors duration-300"
            >
              {t("nav.services")}
            </Link>
            <Link
              href="/pricing"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-foreground hover:text-accent transition-colors duration-300"
            >
              {t("nav.pricing")}
            </Link>
            <Link
              href="/#booking"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-foreground hover:text-accent transition-colors duration-300"
            >
              {t("nav.book")}
            </Link>
            <Link
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-foreground hover:text-accent transition-colors duration-300"
            >
              {t("nav.contact")}
            </Link>
            <div className="pt-4 border-t border-border">
              <Button asChild className="w-full">
                <Link href="/#booking" onClick={() => setIsOpen(false)}>
                  {t("nav.bookRide")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
