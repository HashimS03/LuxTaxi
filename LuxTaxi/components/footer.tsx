"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="font-serif text-xl font-semibold text-background">
              Oslo Limousine
            </Link>
            <p className="mt-3 text-sm text-background/60 max-w-xs">
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-background/40 mb-4">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#fleet" className="text-background/70 hover:text-background">{t("nav.fleet")}</Link></li>
              <li><Link href="#services" className="text-background/70 hover:text-background">{t("nav.services")}</Link></li>
              <li><Link href="#booking" className="text-background/70 hover:text-background">{t("nav.book")}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-background/40 mb-4">
              {t("footer.services")}
            </h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>{t("services.airport")}</li>
              <li>{t("services.corporate")}</li>
              <li>{t("services.weddings")}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-background/40 mb-4">
              {t("footer.contactUs")}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+4748420389" className="flex items-center gap-2 text-background/70 hover:text-background">
                  <Phone className="h-4 w-4" />
                  +47 484 20 389
                </a>
              </li>
              <li>
                <a href="mailto:theoslolimousine@gmail.com" className="flex items-center gap-2 text-background/70 hover:text-background">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="truncate">theoslolimousine@gmail.com</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-background/70">
                <MapPin className="h-4 w-4" />
                Oslo, Norway
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-xs text-background/40 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Oslo Limousine. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
