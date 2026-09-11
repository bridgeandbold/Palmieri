import { services } from "@/lib/site";
import { CheckIcon, ServiceIcon } from "./icons";

export function Services({ city }: { city?: string }) {
  return (
    <section id="services" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-royal-600">
            Services
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-navy-900 sm:text-4xl">
            {city
              ? `Cleaning services in ${city}`
              : "Cleaning for every kind of home"}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-navy-600">
            From a weekly tidy-up to a full move-out, pick what your home needs
            and we will build the visit around it.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.slug}
              className="group rounded-3xl border border-navy-100 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-soft"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-50 text-royal-600 transition-colors group-hover:bg-royal-600 group-hover:text-white">
                <ServiceIcon slug={service.slug} className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-display text-xl font-bold text-navy-900">
                {service.title}
              </h3>
              <p className="mt-3 leading-relaxed text-navy-600">
                {service.blurb}
              </p>
              <ul className="mt-5 space-y-2 border-t border-navy-100 pt-5">
                {service.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2.5 text-sm text-navy-700"
                  >
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-royal-500" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
