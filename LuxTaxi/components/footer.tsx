"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer id="contact" className="border-t border-border bg-background">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brandPine text-[13px] font-serif font-semibold text-muted">
                OL
              </span>
              <span className="font-serif text-xl font-semibold text-foreground">
                Oslo Limousine
              </span>
            </Link>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-sm">
              {t("footer.description")}
            </p>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8">
            <div className="grid gap-12 sm:grid-cols-3">
              {/* Quick Links */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-6">
                  {t("footer.quickLinks")}
                </h4>
                <ul className="flex flex-col gap-4">
                  <li>
                    <Link
                      href="/#fleet"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1 group"
                    >
                      {t("nav.fleet")}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#services"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1 group"
                    >
                      {t("nav.services")}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1 group"
                    >
                      {t("nav.pricing")}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#booking"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1 group"
                    >
                      {t("nav.book")}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-6">
                  {t("footer.services")}
                </h4>
                <ul className="flex flex-col gap-4">
                  <li className="text-muted-foreground">
                    {t("services.airport")}
                  </li>
                  <li className="text-muted-foreground">
                    {t("services.corporate")}
                  </li>
                  <li className="text-muted-foreground">
                    {t("services.weddings")}
                  </li>
                  <li className="text-muted-foreground">
                    {t("services.hourly")}
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-6">
                  {t("footer.contactUs")}
                </h4>
                <ul className="flex flex-col gap-4">
                  <li>
                    <a
                      href="tel:+4748420389"
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      <Phone className="h-4 w-4" />
                      +47 484 20 389
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:theoslolimousine@gmail.com"
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
                    >
                      <Mail className="h-4 w-4 shrink-0" />
                      <span className="whitespace-nowrap">theoslolimousine@gmail.com</span>
                    </a>
                  </li>
                  <li>
                    <span className="flex items-start gap-3 text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                      Oslo, Norway
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground/70">
              &copy; {new Date().getFullYear()} Oslo Limousine. {t("footer.rights")}
            </p>
            <div className="flex gap-8">
              <Link
                href="/privacy"
                className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors duration-300"
              >
                {t("footer.privacy")}
              </Link>
              <Link
                href="/terms"
                className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors duration-300"
              >
                {t("footer.terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
