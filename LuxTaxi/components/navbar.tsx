"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/locale-context";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-center">
          <Link href="/" className="flex items-center gap-2 absolute left-6 lg:left-20">
            <span className="font-serif text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Oslo <span className="text-primary">Limousine</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-0.5 rounded-full px-2.5 py-1.5 bg-white/7 border border-white/12 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-lg">
            <Link
              href="#fleet"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-white rounded-full hover:bg-white/12 transition-colors"
            >
              {t("nav.fleet")}
            </Link>
            <Link
              href="#booking"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-white rounded-full hover:bg-white/12 transition-colors"
            >
              {t("nav.book")}
            </Link>
            <Link
              href="#services"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-white rounded-full hover:bg-white/12 transition-colors"
            >
              {t("nav.services")}
            </Link>
            <Link
              href="#contact"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-white rounded-full hover:bg-white/12 transition-colors"
            >
              {t("nav.contact")}
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4 absolute right-16 lg:right-20">
            <button
              type="button"
              onClick={() => setLocale(locale === "en" ? "no" : "en")}
              className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-white hover:text-primary hover:border-primary/40 transition-colors"
              aria-label="Switch language"
            >
              <Globe className="h-4 w-4" />
              <span>{locale === "en" ? "NO" : "EN"}</span>
            </button>
            <Button asChild>
              <Link href="#booking">{t("nav.bookRide")}</Link>
            </Button>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <button
              type="button"
              onClick={() => setLocale(locale === "en" ? "no" : "en")}
              className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-white hover:text-primary transition-colors"
              aria-label="Switch language"
            >
              <Globe className="h-4 w-4" />
              <span>{locale === "en" ? "NO" : "EN"}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
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

      {isOpen && (
        <div className="md:hidden border-t border-border bg-background/98 backdrop-blur-md">
          <div className="px-6 py-6 flex flex-col gap-4">
            <Link
              href="#fleet"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-white hover:text-primary transition-colors"
            >
              {t("nav.fleet")}
            </Link>
            <Link
              href="#booking"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-white hover:text-primary transition-colors"
            >
              {t("nav.book")}
            </Link>
            <Link
              href="#services"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-white hover:text-primary transition-colors"
            >
              {t("nav.services")}
            </Link>
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-white hover:text-primary transition-colors"
            >
              {t("nav.contact")}
            </Link>
            <Button asChild className="w-full">
              <Link href="#booking" onClick={() => setIsOpen(false)}>
                {t("nav.bookRide")}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
