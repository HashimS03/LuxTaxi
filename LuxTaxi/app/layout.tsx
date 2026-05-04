import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { LocaleProvider } from "@/lib/locale-context";

import "./globals.css";

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Oslo Limousine - Premium Transport Services",
  description:
    "Book luxury limousines, sedans, vans, and minibuses for your premium transport needs in Oslo. Professional chauffeurs, elegant vehicles, exceptional service.",
};

export const viewport: Viewport = {
  themeColor: "#0d1117",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased bg-background text-foreground">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
