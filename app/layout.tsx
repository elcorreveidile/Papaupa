import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import ReproductorCancion from "@/components/audio/ReproductorCancion";
import CookieBanner from "@/components/legal/CookieBanner";
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
  metadataBase: new URL("https://papaupa.espanias.com"),
  title: "Papaupa · Restaurante colombiano-mediterráneo en el Realejo (Granada)",
  description:
    "Cocina colombiano-mediterránea casera y sin prisa en el Realejo (Granada): arepas, ceviches, patacones y pescados, con producto de calidad y opciones veg y sin gluten.",
  openGraph: {
    title: "Papaupa · Retro Fusión Food",
    description:
      "Cocina colombiano-mediterránea casera en el Realejo (Granada): arepas, ceviches, patacones y pescados.",
    locale: "es_ES",
    type: "website",
    images: ["/images/fachada.jpg"],
  },
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
        <LanguageProvider>
          {children}
          <ReproductorCancion />
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
