"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/locale-context";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { locale, setLocale, t } = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border" 
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-serif text-lg sm:text-xl font-semibold text-foreground">
            Oslo Limousine
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#fleet" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("nav.fleet")}
            </Link>
            <Link href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("nav.services")}
            </Link>
            <Link href="#booking" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("nav.book")}
            </Link>
            <button
              onClick={() => setLocale(locale === "en" ? "no" : "en")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {locale === "en" ? "Norsk" : "English"}
            </button>
            <Button asChild size="sm">
              <Link href="#booking">{t("nav.bookRide")}</Link>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="tel:+4748420389"
              className="flex items-center justify-center h-9 w-9 rounded-full bg-accent text-accent-foreground"
              aria-label="Call us"
            >
              <Phone className="h-4 w-4" />
            </a>
            <button
              onClick={() => setLocale(locale === "en" ? "no" : "en")}
              className="h-9 px-2 text-xs font-medium text-muted-foreground"
            >
              {locale === "en" ? "NO" : "EN"}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="#fleet"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-foreground font-medium"
            >
              {t("nav.fleet")}
            </Link>
            <Link
              href="#services"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-foreground font-medium"
            >
              {t("nav.services")}
            </Link>
            <Link
              href="#booking"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-foreground font-medium"
            >
              {t("nav.book")}
            </Link>
            <div className="pt-2 space-y-2">
              <Button asChild className="w-full">
                <Link href="#booking" onClick={() => setIsOpen(false)}>
                  {t("nav.bookRide")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
