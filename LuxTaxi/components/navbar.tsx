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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className={`font-serif text-lg sm:text-xl font-semibold transition-colors duration-300 ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            Oslo Limousine
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="#fleet" 
              className={`text-sm transition-colors duration-300 ${
                scrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"
              }`}
            >
              {t("nav.fleet")}
            </Link>
            <Link 
              href="#services" 
              className={`text-sm transition-colors duration-300 ${
                scrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"
              }`}
            >
              {t("nav.services")}
            </Link>
            <Link 
              href="#booking" 
              className={`text-sm transition-colors duration-300 ${
                scrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"
              }`}
            >
              {t("nav.book")}
            </Link>
            <button
              onClick={() => setLocale(locale === "en" ? "no" : "en")}
              className={`text-sm transition-colors duration-300 ${
                scrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"
              }`}
            >
              {locale === "en" ? "Norsk" : "English"}
            </button>
            <Button asChild size="sm">
              <Link href="#booking">{t("nav.bookRide")}</Link>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-3 md:hidden">
            <a
              href="tel:+4748420389"
              className="flex items-center justify-center h-10 w-10 rounded-full bg-accent text-white"
              aria-label="Call us"
            >
              <Phone className="h-4 w-4" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 transition-colors duration-300 ${
                scrolled ? "text-foreground" : "text-white"
              }`}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-6 h-6">
                <span 
                  className={`absolute left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isOpen ? "top-[11px] rotate-45" : "top-[5px] rotate-0"
                  }`}
                />
                <span 
                  className={`absolute left-0 top-[11px] w-6 h-0.5 bg-current transition-opacity duration-300 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span 
                  className={`absolute left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isOpen ? "top-[11px] -rotate-45" : "top-[17px] rotate-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Full screen overlay */}
      <div 
        className={`fixed inset-0 bg-background z-40 md:hidden transition-all duration-500 ease-out ${
          isOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: "64px" }}
      >
        <div className={`flex flex-col h-full px-6 py-8 transition-transform duration-500 ${
          isOpen ? "translate-y-0" : "-translate-y-8"
        }`}>
          <nav className="flex-1 flex flex-col gap-1">
            <Link
              href="#fleet"
              onClick={() => setIsOpen(false)}
              className="py-4 text-2xl font-serif font-medium text-foreground border-b border-border"
            >
              {t("nav.fleet")}
            </Link>
            <Link
              href="#services"
              onClick={() => setIsOpen(false)}
              className="py-4 text-2xl font-serif font-medium text-foreground border-b border-border"
            >
              {t("nav.services")}
            </Link>
            <Link
              href="#booking"
              onClick={() => setIsOpen(false)}
              className="py-4 text-2xl font-serif font-medium text-foreground border-b border-border"
            >
              {t("nav.book")}
            </Link>
            <button
              onClick={() => {
                setLocale(locale === "en" ? "no" : "en");
                setIsOpen(false);
              }}
              className="py-4 text-2xl font-serif font-medium text-muted-foreground text-left"
            >
              {locale === "en" ? "Norsk" : "English"}
            </button>
          </nav>
          
          <div className="space-y-3 pt-6 border-t border-border">
            <Button asChild className="w-full h-14 text-base">
              <Link href="#booking" onClick={() => setIsOpen(false)}>
                {t("nav.bookRide")}
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full h-14 text-base">
              <a href="tel:+4748420389" className="flex items-center justify-center gap-2">
                <Phone className="h-5 w-5" />
                +47 484 20 389
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
