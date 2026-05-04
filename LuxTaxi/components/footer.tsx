"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer id="contact" className="border-t border-border bg-card py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold text-foreground">
                Oslo <span className="text-primary">Limousine</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              {t("footer.quickLinks")}
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="#fleet"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("nav.fleet")}
                </Link>
              </li>
              <li>
                <Link
                  href="#booking"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("nav.book")}
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("nav.services")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              {t("footer.services")}
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="text-sm text-muted-foreground">
                {t("services.airport")}
              </li>
              <li className="text-sm text-muted-foreground">
                {t("services.corporate")}
              </li>
              <li className="text-sm text-muted-foreground">
                {t("services.weddings")}
              </li>
              <li className="text-sm text-muted-foreground">
                {t("services.hourly")}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              {t("footer.contactUs")}
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="tel:+4748420389"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  +47 484 20 389
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@oslolimousine.no"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 text-accent" />
                  info@oslolimousine.no
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  Oslo, Norway
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Oslo Limousine. {t("footer.rights")}
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
