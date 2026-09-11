import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CheckIcon } from "@/components/icons";
import { MobileCta } from "@/components/MobileCta";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Sparkle } from "@/components/Sparkle";
import { cities, cityBySlug, regions, site } from "@/lib/site";

type Props = { params: Promise<{ city: string }> };

// Uma pagina por cidade de src/lib/site.ts. Cidade nova = pagina nova, sozinha.
export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = cityBySlug((await params).city);
  if (!city) return {};

  const title = `House Cleaning in ${city.name}, CT`;
  const description = `${site.name} offers recurring, deep, move-out and vacation rental cleaning in ${city.name}, CT ${city.zip}. Request a free estimate online.`;
  const path = `/cleaning-services/${city.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.name}`, description, url: path },
  };
}

export default async function CityPage({ params }: Props) {
  const city = cityBySlug((await params).city);
  if (!city) notFound();

  const region = regions.find((r) => r.id === city.region);
  const otherTowns = cities.filter((c) => c.slug !== city.slug);

  const citySchema = {
    "@context": "https://schema.org",
    "@type": "HouseCleaningService",
    name: site.name,
    url: `${site.url}/cleaning-services/${city.slug}`,
    areaServed: {
      "@type": "City",
      name: `${city.name}, CT ${city.zip}`,
    },
  };

  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-linear-to-b from-navy-50 via-white to-white pb-20 pt-32 sm:pb-24 sm:pt-40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-royal-400/10 blur-3xl"
          />
          <Sparkle className="absolute right-[10%] top-40 hidden h-8 w-8 animate-twinkle text-royal-400 md:block" />
          <Sparkle
            className="absolute right-[22%] top-72 hidden h-4 w-4 animate-twinkle text-navy-300 md:block"
            style={{ animationDelay: "1.4s" }}
          />

          <div className="relative mx-auto max-w-6xl px-5">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-sm text-navy-500"
            >
              <Link href="/" className="hover:text-royal-600">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link href="/#areas" className="hover:text-royal-600">
                Service areas
              </Link>
              <span aria-hidden="true">/</span>
              <span className="font-medium text-navy-800">{city.name}</span>
            </nav>

            <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-navy-900 sm:text-5xl lg:text-6xl">
              House cleaning in{" "}
              <span className="text-royal-600">{city.name}, CT</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-600">
              {city.intro}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#estimate"
                className="rounded-full bg-royal-600 px-8 py-4 text-center font-semibold text-white shadow-lg shadow-royal-600/25 transition-colors hover:bg-royal-700"
              >
                Get my free estimate
              </a>
              <a
                href="#services"
                className="rounded-full border border-navy-200 bg-white px-8 py-4 text-center font-semibold text-navy-800 transition-colors hover:border-navy-300 hover:bg-navy-50"
              >
                See our services
              </a>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-navy-600">
              {[
                `ZIP ${city.zip}`,
                city.county,
                region?.name ?? "Connecticut",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-royal-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Services city={city.name} />
        <Process />

        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-display text-2xl font-bold text-navy-900">
              We also clean nearby
            </h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {otherTowns.map((town) => (
                <li key={town.slug}>
                  <Link
                    href={`/cleaning-services/${town.slug}`}
                    className="inline-block rounded-full border border-navy-100 bg-navy-50 px-5 py-2.5 text-sm font-medium text-navy-800 transition-colors hover:border-royal-600 hover:bg-royal-600 hover:text-white"
                  >
                    {town.name}, CT
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Faq />
        <ContactForm defaultCity={`${city.name}, CT`} />
      </main>
      <Footer />
      <MobileCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }}
      />
    </>
  );
}
