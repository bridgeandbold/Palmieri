const steps = [
  {
    title: "Request your estimate",
    text: "Tell us your town, the size of your home and the kind of cleaning you need. It takes about two minutes.",
  },
  {
    title: "Get your quote",
    text: "We reply with a clear price and available dates. No deposit, no obligation, no pressure.",
  },
  {
    title: "Come home to clean",
    text: "We show up with the supplies, work through the checklist, and leave your home fresh.",
  },
];

export function Process() {
  return (
    <section className="bg-navy-50 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-royal-600">
            How it works
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-navy-900 sm:text-4xl">
            Booking takes three simple steps
          </h2>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-3xl bg-white p-8 shadow-sm ring-1 ring-navy-100"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-royal-600 font-display text-lg font-extrabold text-white">
                {index + 1}
              </span>
              <h3 className="mt-6 font-display text-xl font-bold text-navy-900">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-navy-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
