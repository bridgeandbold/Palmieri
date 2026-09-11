import Link from "next/link";
import { cities, regions } from "@/lib/site";
import { ArrowIcon } from "./icons";

export function ServiceAreas() {
  return (
    <section id="areas" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-royal-600">
            Service areas
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-navy-900 sm:text-4xl">
            Where we clean in Connecticut
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-navy-600">
            Three corners of the state, one standard of clean. Do not see your
            town? Send a request anyway and we will let you know.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {regions.map((region) => (
            <div
              key={region.id}
              className="rounded-3xl border border-navy-100 bg-navy-50/60 p-7"
            >
              <h3 className="font-display text-lg font-bold text-navy-900">
                {region.name}
              </h3>
              <p className="mt-2 text-sm text-navy-600">{region.blurb}</p>

              <ul className="mt-6 space-y-3">
                {cities
                  .filter((city) => city.region === region.id)
                  .map((city) => (
                    <li key={city.slug}>
                      <Link
                        href={`/cleaning-services/${city.slug}`}
                        className="group flex items-center justify-between rounded-2xl border border-navy-100 bg-white px-5 py-4 transition-colors hover:border-royal-600"
                      >
                        <span>
                          <span className="block font-semibold text-navy-900">
                            {city.name}
                          </span>
                          <span className="text-xs text-navy-500">
                            CT {city.zip}
                          </span>
                        </span>
                        <ArrowIcon className="h-5 w-5 text-navy-300 transition group-hover:translate-x-1 group-hover:text-royal-600" />
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
