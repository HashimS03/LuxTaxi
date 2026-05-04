"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer id="contact" className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-semibold text-background">
                Oslo Limousine
              </span>
            </Link>
            <p className="mt-6 text-background/60 leading-relaxed max-w-sm">
              {t("footer.description")}
            </p>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8">
            <div className="grid gap-12 sm:grid-cols-3">
              {/* Quick Links */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-background/40 mb-6">
                  {t("footer.quickLinks")}
                </h4>
                <ul className="flex flex-col gap-4">
                  <li>
                    <Link
                      href="#fleet"
                      className="text-background/70 hover:text-background transition-colors duration-300 flex items-center gap-1 group"
                    >
                      {t("nav.fleet")}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#booking"
                      className="text-background/70 hover:text-background transition-colors duration-300 flex items-center gap-1 group"
                    >
                      {t("nav.book")}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#services"
                      className="text-background/70 hover:text-background transition-colors duration-300 flex items-center gap-1 group"
                    >
                      {t("nav.services")}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-background/40 mb-6">
                  {t("footer.services")}
                </h4>
                <ul className="flex flex-col gap-4">
                  <li className="text-background/70">
                    {t("services.airport")}
                  </li>
                  <li className="text-background/70">
                    {t("services.corporate")}
                  </li>
                  <li className="text-background/70">
                    {t("services.weddings")}
                  </li>
                  <li className="text-background/70">
                    {t("services.hourly")}
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-background/40 mb-6">
                  {t("footer.contactUs")}
                </h4>
                <ul className="flex flex-col gap-4">
                  <li>
                    <a
                      href="tel:+4748420389"
                      className="flex items-center gap-3 text-background/70 hover:text-background transition-colors duration-300"
                    >
                      <Phone className="h-4 w-4" />
                      +47 484 20 389
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:theoslolimousine@gmail.com"
                      className="flex items-start gap-3 text-background/70 hover:text-background transition-colors duration-300"
                    >
                      <Mail className="h-4 w-4 shrink-0 mt-0.5" />
                      <span className="break-all">theoslolimousine@gmail.com</span>
                    </a>
                  </li>
                  <li>
                    <span className="flex items-start gap-3 text-background/70">
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
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-background/40">
              &copy; {new Date().getFullYear()} Oslo Limousine. {t("footer.rights")}
            </p>
            <div className="flex gap-8">
              <Link
                href="#"
                className="text-xs text-background/40 hover:text-background/70 transition-colors duration-300"
              >
                {t("footer.privacy")}
              </Link>
              <Link
                href="#"
                className="text-xs text-background/40 hover:text-background/70 transition-colors duration-300"
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
