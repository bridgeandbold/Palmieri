import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { Sparkle } from "@/components/Sparkle";
import { phoneHref, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank you",
  description: "We received your estimate request.",
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-900 px-5 py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-royal-500/20 blur-3xl"
      />
      <Sparkle className="absolute left-[12%] top-[20%] h-6 w-6 animate-twinkle text-royal-400" />
      <Sparkle
        className="absolute bottom-[22%] right-[14%] h-8 w-8 animate-twinkle text-white/70"
        style={{ animationDelay: "1.2s" }}
      />

      <div className="relative max-w-lg text-center">
        <LogoMark tone="light" className="mx-auto h-20 w-auto" />

        <h1 className="mt-8 font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
          Thank you, your request is in.
        </h1>

        <p className="mt-6 leading-relaxed text-navy-100/80">
          We received your details and will get back to you with your free
          estimate soon. If you do not see our reply, please check your spam
          folder.
        </p>

        {(site.phone || site.email) && (
          <p className="mt-6 text-sm text-navy-200/70">
            Need to add something?{" "}
            {site.phone && (
              <a
                href={phoneHref}
                className="font-semibold text-white underline underline-offset-4 hover:text-royal-400"
              >
                {site.phone}
              </a>
            )}
            {site.phone && site.email && " or "}
            {site.email && (
              <a
                href={"mailto:" + site.email}
                className="font-semibold text-white underline underline-offset-4 hover:text-royal-400"
              >
                {site.email}
              </a>
            )}
          </p>
        )}

        <Link
          href="/"
          className="mt-10 inline-block rounded-full bg-white px-8 py-4 font-semibold text-navy-900 transition-colors hover:bg-navy-100"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
