import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { cities, seoDescription, site } from "@/lib/site";
import "./globals.css";

const heading = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | House Cleaning in Farmington, Avon & Groton, CT`,
    template: `%s | ${site.name}`,
  },
  description: seoDescription,
  keywords: [
    "house cleaning",
    "cleaning services",
    "deep cleaning",
    "move out cleaning",
    "vacation rental cleaning",
    ...cities.map((city) => `house cleaning ${city.name} CT`),
  ],
  openGraph: {
    title: `${site.name} | House Cleaning in Connecticut`,
    description: seoDescription,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HouseCleaningService",
  name: site.name,
  description: seoDescription,
  url: site.url,
  ...(site.email && { email: site.email }),
  ...(site.phone && { telephone: site.phone }),
  areaServed: cities.map((city) => ({
    "@type": "City",
    name: `${city.name}, CT ${city.zip}`,
  })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </body>
    </html>
  );
}
