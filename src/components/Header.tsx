"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { phoneHref, site } from "@/lib/site";
import { Logo } from "./Logo";

// "/#..." funciona tanto na home quanto nas paginas de cidade.
const links = [
  { href: "/#services", label: "Services" },
  { href: "/#why-palmieri", label: "Why Palmieri" },
  { href: "/#areas", label: "Service Areas" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-white/95 shadow-lg shadow-navy-900/5 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Link href="/" aria-label={`${site.name} home`}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-navy-700 transition-colors hover:text-royal-600"
            >
              {link.label}
            </a>
          ))}
          {site.phone && (
            <a
              href={phoneHref}
              className="text-sm font-semibold text-navy-900 hover:text-royal-600"
            >
              {site.phone}
            </a>
          )}
          <a
            href="#estimate"
            className="rounded-full bg-royal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-royal-600/20 transition-colors hover:bg-royal-700"
          >
            Free Estimate
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-navy-800 lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-navy-100 bg-white px-5 pb-6 pt-2 lg:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-navy-50 py-3.5 font-medium text-navy-800"
            >
              {link.label}
            </a>
          ))}
          {site.phone && (
            <a
              href={phoneHref}
              className="block border-b border-navy-50 py-3.5 font-semibold text-royal-600"
            >
              Call {site.phone}
            </a>
          )}
          <a
            href="#estimate"
            onClick={() => setOpen(false)}
            className="mt-5 block rounded-full bg-royal-600 px-5 py-3 text-center font-semibold text-white"
          >
            Free Estimate
          </a>
        </nav>
      )}
    </header>
  );
}
