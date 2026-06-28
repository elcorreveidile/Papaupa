import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Papaupa · Retro Fusión Food",
  description:
    "Restaurante colombiano-mediterráneo en el Realejo, Granada. Comida casera llena de cariño. ¿¿Pasas marica??",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
