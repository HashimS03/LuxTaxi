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
  title: "LuxTaxi - Premium Transport Services",
  description:
    "Book luxury sedans, vans, and minibuses for your premium transport needs. Professional chauffeurs, elegant vehicles, exceptional service.",
};

export const viewport: Viewport = {
  themeColor: "#0b0e17",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
