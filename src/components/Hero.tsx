import { featuredCities, listNames, site } from "@/lib/site";
import { CheckIcon } from "./icons";
import { LogoMark } from "./Logo";
import { Sparkle } from "./Sparkle";

const checklist = [
  "Kitchen counters, sink and appliances",
  "Bathrooms scrubbed and sanitized",
  "Dusting, top to bottom",
  "Floors vacuumed and mopped",
  "Beds made, trash out",
];

const promises = [
  "Free, no-obligation estimate",
  "Weekly, biweekly or one-time",
  "We bring the supplies",
];

export function Hero() {
  const towns = listNames(featuredCities.map((city) => city.name));
  const cardCity = featuredCities[0];

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-linear-to-b from-navy-50 via-white to-white pb-20 pt-32 sm:pb-28 sm:pt-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-royal-400/10 blur-3xl"
      />
      <Sparkle className="absolute left-[5%] top-40 hidden h-5 w-5 animate-twinkle text-royal-400 md:block" />
      <Sparkle
        className="absolute left-[44%] top-28 hidden h-3 w-3 animate-twinkle text-navy-300 md:block"
        style={{ animationDelay: "1.1s" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-royal-600">
            <Sparkle className="h-3 w-3" />
            House cleaning in Connecticut
          </p>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-navy-900 sm:text-5xl lg:text-[3.6rem]">
            Spotless homes, from the Farmington Valley to the{" "}
            <span className="text-royal-600">shoreline.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-600">
            {site.name} cleans homes in {towns} and nearby towns. Recurring
            visits, deep cleans and move-outs, with a free estimate before
            anything is booked.
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
            {promises.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-royal-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Cartao ilustrativo: substitui foto enquanto nao ha fotos reais */}
        <div className="relative mx-auto w-full max-w-md">
          <div
            aria-hidden="true"
            className="absolute -inset-3 -rotate-3 rounded-[2rem] bg-navy-100/70"
          />
          <div className="relative rounded-[1.75rem] border border-navy-100 bg-white p-7 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <LogoMark className="h-10 w-auto" />
                <div>
                  <p className="text-sm font-bold text-navy-900">
                    Today&apos;s visit
                  </p>
                  <p className="text-xs text-navy-500">
                    {cardCity.name}, CT {cardCity.zip}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold text-royal-600">
                All done
              </span>
            </div>

            <ul className="mt-7 space-y-3.5">
              {checklist.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-royal-600 text-white">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[0.95rem] text-navy-800">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex items-center justify-between border-t border-navy-100 pt-5 text-sm">
              <span className="text-navy-500">Next visit</span>
              <span className="font-semibold text-navy-900">In two weeks</span>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-4 flex items-center gap-2 rounded-2xl border border-navy-100 bg-white px-4 py-3 shadow-soft sm:-left-8">
            <Sparkle className="h-5 w-5 animate-twinkle text-royal-500" />
            <span className="text-sm font-semibold text-navy-900">
              Fresh, every visit
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
