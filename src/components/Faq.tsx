import { faqs } from "@/lib/site";

export function Faq() {
  return (
    <section id="faq" className="bg-navy-50 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-5">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-royal-600">
          Questions
        </p>
        <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-navy-900 sm:text-4xl">
          Before you book
        </h2>

        <div className="mt-12 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl bg-white px-6 py-5 ring-1 ring-navy-100 open:ring-navy-200"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold text-navy-900 marker:content-none">
                {faq.q}
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 shrink-0 text-royal-600 transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                >
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </summary>
              <p className="mt-3 pr-11 leading-relaxed text-navy-600">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
