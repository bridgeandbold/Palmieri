import Link from "next/link";
import { cities, phoneHref, services, site } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 pb-28 pt-16 text-navy-100/70 md:pb-10">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            House cleaning across the Farmington Valley, the southeastern
            shoreline and the Litchfield Hills of Connecticut.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <a href="/#services" className="hover:text-white">
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white">Service areas</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {cities.map((city) => (
              <li key={city.slug}>
                <Link
                  href={`/cleaning-services/${city.slug}`}
                  className="hover:text-white"
                >
                  {city.name}, CT
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white">Get in touch</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {site.phone && (
              <li>
                <a href={phoneHref} className="hover:text-white">
                  {site.phone}
                </a>
              </li>
            )}
            {site.email && (
              <li>
                <a href={"mailto:" + site.email} className="hover:text-white">
                  {site.email}
                </a>
              </li>
            )}
            <li>
              <a
                href="#estimate"
                className="font-semibold text-royal-400 hover:text-white"
              >
                Request a free estimate
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-6xl border-t border-white/10 px-5 pt-6 text-xs text-navy-200/50">
        &copy; {year} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
