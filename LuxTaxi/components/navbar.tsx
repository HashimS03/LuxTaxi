"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/logo-mark";
import { useLocale } from "@/lib/locale-context";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();

  return (
    <nav className="sticky top-4 z-50 px-4 lg:top-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-full border border-border bg-card/95 backdrop-blur-md shadow-[0_12px_32px_-18px_rgba(35,38,32,0.18)] px-5 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <LogoMark className="h-8 w-8 shrink-0" />
            <span className="font-serif text-lg md:text-xl font-semibold tracking-tight text-foreground">
              Oslo Limousine
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              href="/#fleet"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {t("nav.fleet")}
            </Link>
            <Link
              href="/#services"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {t("nav.services")}
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {t("nav.pricing")}
            </Link>
            <Link
              href="/#booking"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {t("nav.book")}
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {t("nav.contact")}
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              onClick={() => setLocale(locale === "en" ? "no" : "en")}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
              aria-label="Switch language"
            >
              <Globe className="h-4 w-4" />
              <span>{locale === "en" ? "NO" : "EN"}</span>
            </button>
            <Button asChild className="group rounded-full">
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
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Switch language"
            >
              <Globe className="h-4 w-4" />
              <span>{locale === "en" ? "NO" : "EN"}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground"
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
          isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-card/98 backdrop-blur-md shadow-[0_12px_32px_-18px_rgba(35,38,32,0.18)]">
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
              <Button asChild className="w-full rounded-full">
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
