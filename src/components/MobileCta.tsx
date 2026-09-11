import { phoneHref, site } from "@/lib/site";

/** Barra fixa no rodape do celular: o botao de orcamento sempre a um toque. */
export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-100 bg-white/95 p-3 backdrop-blur-sm md:hidden">
      <div className="flex gap-3">
        {site.phone && (
          <a
            href={phoneHref}
            className="flex-1 rounded-full border border-navy-200 py-3 text-center font-semibold text-navy-900"
          >
            Call
          </a>
        )}
        <a
          href="#estimate"
          className="flex-[2] rounded-full bg-royal-600 py-3 text-center font-semibold text-white"
        >
          Get a free estimate
        </a>
      </div>
    </div>
  );
}
