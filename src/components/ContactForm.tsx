"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { cities, phoneHref, services, site } from "@/lib/site";
import { CheckIcon } from "./icons";

/**
 * ============================================================
 *  FORMULARIO DE LEAD - Web3Forms
 * ------------------------------------------------------------
 *  O email de destino NAO esta neste arquivo. Ele e definido
 *  pela conta do Web3Forms que gerou a access key.
 *  Trocar o destinatario = gerar uma chave nova naquela conta.
 *
 *  Variavel obrigatoria (Vercel > Environment Variables,
 *  marcando Production + Preview + Development):
 *      NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
 *
 *  Opcional - segundo destinatario sem pagar o plano PRO:
 *      NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY_2
 *
 *  ATENCAO: variavel NEXT_PUBLIC_* e embutida no BUILD. Mudou a
 *  variavel? Tem que fazer REDEPLOY sem cache, senao nada muda.
 * ============================================================
 */

const PRIMARY_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
const SECONDARY_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY_2;

const frequencies = [
  "One-time",
  "Weekly",
  "Every 2 weeks",
  "Monthly",
  "Not sure yet",
];
const bedroomOptions = ["Studio", "1", "2", "3", "4", "5+"];
const bathroomOptions = ["1", "1.5", "2", "2.5", "3", "4+"];

type Status = "idle" | "sending" | "error";

/** Alternativa de contato para mensagens de erro (so o que estiver preenchido). */
function otherWaysToReachUs() {
  const ways = [];
  if (site.phone) ways.push("call " + site.phone);
  if (site.email) ways.push("email " + site.email);
  return ways.length
    ? " Please " + ways.join(" or ") + "."
    : " Please try again in a few minutes.";
}

export function ContactForm({ defaultCity = "" }: { defaultCity?: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot: se veio preenchido, e bot. Finge sucesso e nao envia nada.
    if (data.botcheck) {
      router.push("/thank-you");
      return;
    }

    const keys = [PRIMARY_KEY, SECONDARY_KEY].filter(Boolean) as string[];

    // Guard: sem a chave, o JSON.stringify descarta o campo em silencio e a
    // API devolve 400 para sempre, sem ninguem notar. Falhe alto.
    if (keys.length === 0) {
      console.error(
        "[Palmieri] NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ausente no build. " +
          "Cadastre a variavel na Vercel (Production + Preview + Development) e redeploy sem cache."
      );
      setStatus("error");
      setErrorMessage(
        "Our form is temporarily unavailable." + otherWaysToReachUs()
      );
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    const payload = {
      subject:
        "New estimate request - " +
        (data.name || "Website") +
        " (" +
        (data.city || "no town") +
        ")",
      from_name: site.name + " Website",
      ...data,
    };

    try {
      const results = await Promise.allSettled(
        keys.map((access_key) =>
          fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ ...payload, access_key }),
          }).then(async (response) => {
            const json = await response.json().catch(() => ({}));
            if (!response.ok || !json.success) {
              throw new Error(json.message || "HTTP " + response.status);
            }
            return json;
          })
        )
      );

      results.forEach((result, index) => {
        if (result.status === "rejected") {
          console.error(
            "[Palmieri] Envio " + (index + 1) + " falhou:",
            result.reason
          );
        }
      });

      // allSettled, nunca all: basta um envio dar certo para o lead nao se perder.
      if (!results.some((result) => result.status === "fulfilled")) {
        const first = results.find(
          (result) => result.status === "rejected"
        ) as PromiseRejectedResult | undefined;
        throw new Error(first?.reason?.message ?? "Unknown error");
      }

      form.reset();
      router.push("/thank-you");
    } catch (error) {
      const detail = error instanceof Error ? error.message : "unknown error";
      setStatus("error");
      setErrorMessage(
        "We could not send your request (" + detail + ")." + otherWaysToReachUs()
      );
    }
  }

  const sending = status === "sending";

  const fieldClass =
    "w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-navy-900 placeholder:text-navy-400 outline-none transition focus:border-royal-600 focus:ring-4 focus:ring-royal-600/10";
  const labelClass = "mb-1.5 block text-sm font-semibold text-navy-800";

  return (
    <section
      id="estimate"
      className="relative overflow-hidden bg-navy-900 py-24 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[34rem] w-[34rem] rounded-full bg-royal-500/15 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-royal-400">
            Free estimate
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            Tell us about your home
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-navy-100/75">
            Two minutes now, a clear quote from us soon after. No deposit, no
            obligation.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              {
                label: "A real price, not a guess",
                detail: "Based on your home and the cleaning you need",
              },
              {
                label: "No obligation",
                detail: "Nothing is booked until you say yes",
              },
              {
                label: "Your info stays private",
                detail: "Used only to prepare your estimate",
              },
            ].map((item) => (
              <li key={item.label} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-royal-600 text-white">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                <span>
                  <span className="block font-semibold text-white">
                    {item.label}
                  </span>
                  <span className="text-sm text-navy-200/70">
                    {item.detail}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          {(site.phone || site.email) && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-semibold text-white">
                Prefer to talk?
              </p>
              {site.phone && (
                <a
                  href={phoneHref}
                  className="mt-1 block text-lg font-semibold text-royal-400 hover:text-white"
                >
                  {site.phone}
                </a>
              )}
              {site.email && (
                <a
                  href={"mailto:" + site.email}
                  className="text-sm text-navy-100/80 underline-offset-2 hover:underline"
                >
                  {site.email}
                </a>
              )}
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-6 shadow-2xl shadow-navy-950/40 sm:p-9"
        >
          {/* Honeypot anti-spam: humano nao ve, bot preenche. */}
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClass}>
                Full name <span className="text-royal-600">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Jane Smith"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone <span className="text-royal-600">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="(860) 555-0134"
                className={fieldClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className={labelClass}>
                Email <span className="text-royal-600">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="jane@email.com"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="city" className={labelClass}>
                Town <span className="text-royal-600">*</span>
              </label>
              <select
                id="city"
                name="city"
                required
                defaultValue={defaultCity}
                className={fieldClass}
              >
                <option value="" disabled>
                  Select your town
                </option>
                {cities.map((city) => (
                  <option key={city.slug} value={`${city.name}, CT`}>
                    {city.name}, CT
                  </option>
                ))}
                <option value="Other">Other / nearby</option>
              </select>
            </div>

            <div>
              <label htmlFor="service" className={labelClass}>
                Service needed <span className="text-royal-600">*</span>
              </label>
              <select
                id="service"
                name="service"
                required
                defaultValue=""
                className={fieldClass}
              >
                <option value="" disabled>
                  Select a service
                </option>
                {services.map((service) => (
                  <option key={service.slug} value={service.title}>
                    {service.title}
                  </option>
                ))}
                <option value="Not sure">Not sure, help me choose</option>
              </select>
            </div>

            <div>
              <label htmlFor="bedrooms" className={labelClass}>
                Bedrooms
              </label>
              <select
                id="bedrooms"
                name="bedrooms"
                defaultValue=""
                className={fieldClass}
              >
                <option value="">Select</option>
                {bedroomOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="bathrooms" className={labelClass}>
                Bathrooms
              </label>
              <select
                id="bathrooms"
                name="bathrooms"
                defaultValue=""
                className={fieldClass}
              >
                <option value="">Select</option>
                {bathroomOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="frequency" className={labelClass}>
                How often?
              </label>
              <select
                id="frequency"
                name="frequency"
                defaultValue=""
                className={fieldClass}
              >
                <option value="">Select</option>
                {frequencies.map((frequency) => (
                  <option key={frequency} value={frequency}>
                    {frequency}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="preferred_date" className={labelClass}>
                Preferred start date
              </label>
              <input
                id="preferred_date"
                name="preferred_date"
                type="date"
                className={fieldClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="message" className={labelClass}>
                Anything we should know?
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Pets, allergies, parking, areas that need extra attention..."
                className={fieldClass + " resize-y"}
              />
            </div>
          </div>

          {status === "error" && (
            <p
              role="alert"
              className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            >
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={sending}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-royal-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-royal-600/25 transition-colors hover:bg-royal-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {sending ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Sending...
              </>
            ) : (
              "Send my free estimate request"
            )}
          </button>

          <p className="mt-4 text-center text-xs leading-relaxed text-navy-500">
            By sending this form you agree to be contacted about your estimate.
            We never sell or share your information.
          </p>
        </form>
      </div>
    </section>
  );
}
