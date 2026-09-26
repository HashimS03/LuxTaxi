import React from "react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { LocaleProvider } from "@/lib/locale-context";

import "./globals.css";

// Fonts are bundled in app/fonts instead of loaded with next/font/google, so
// the build never fetches from Google Fonts. Google sometimes returns
// /l/font?kit=... URLs that next/font/google can't parse, which fails the build.
const dmSans = localFont({
  src: "./fonts/dm-sans-latin.woff2",
  variable: "--font-inter",
  weight: "400 700",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const fraunces = localFont({
  src: "./fonts/fraunces-latin.woff2",
  variable: "--font-playfair",
  weight: "400 600",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const metadata: Metadata = {
  title: "Oslo Limousine | Premium Transport Services",
  description:
    "Experience luxury transportation in Oslo. Professional chauffeurs, elegant vehicles, and exceptional service for airport transfers, corporate events, and special occasions.",
};

export const viewport: Viewport = {
  themeColor: "#FAF6EF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable} bg-background`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
