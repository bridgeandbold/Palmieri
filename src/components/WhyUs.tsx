import { reasons, site } from "@/lib/site";
import { Sparkle } from "./Sparkle";

export function WhyUs() {
  return (
    <section
      id="why-palmieri"
      className="relative overflow-hidden bg-navy-900 py-24 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-royal-500/15 blur-3xl"
      />
      <Sparkle className="absolute right-[8%] top-16 h-7 w-7 animate-twinkle text-royal-400" />
      <Sparkle
        className="absolute bottom-20 right-[30%] h-4 w-4 animate-twinkle text-white/60"
        style={{ animationDelay: "1.6s" }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-royal-400">
            Why {site.shortName}
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            A clean home you do not have to think about
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-navy-100/75">
            You should come home to a finished house, not a list of things we
            missed. That is the standard we clean to on every visit.
          </p>
          <a
            href="#estimate"
            className="mt-9 inline-block rounded-full bg-white px-8 py-4 font-semibold text-navy-900 transition-colors hover:bg-navy-100"
          >
            Request a free estimate
          </a>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-7"
            >
              <span className="font-display text-sm font-bold text-royal-400">
                0{index + 1}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold text-white">
                {reason.title}
              </h3>
              <p className="mt-3 leading-relaxed text-navy-100/70">
                {reason.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
