/**
 * Logo da Palmieri redesenhada em SVG (casa + borrifador + brilhos + arco).
 * Vetorial: nunca borra. tone="light" para fundo escuro.
 * Para usar o PNG original: salvar em public/logo.png e trocar <Logo /> por
 * <img src="/logo.png" alt="Palmieri Cleaning" /> no Header e no Footer.
 */

type Tone = "dark" | "light";

// Brilho de 4 pontas centrado em (cx, cy)
function star(cx: number, cy: number, r: number) {
  const k = r * 0.16;
  return `M${cx} ${cy - r}Q${cx + k} ${cy - k} ${cx + r} ${cy}Q${cx + k} ${cy + k} ${cx} ${cy + r}Q${cx - k} ${cy + k} ${cx - r} ${cy}Q${cx - k} ${cy - k} ${cx} ${cy - r}Z`;
}

const HOUSE = "M70 8L130 54H119V81Q70 65 21 81V54H10L32 37.1V16H44V27.9Z";
const SPRAY_HEAD = "M52 29H80Q85 29 85 34Q85 39 80 39H65L61 35H52Z";
const BOTTLE =
  "M67 50H81C84 58 90 63 92 74.6Q72 71.6 52 74.1C54 63 63 58 67 50Z";
const SWOOSH = "M2 94Q70 60 138 94Q70 70 2 94Z";
const INNER_STARS = [star(100, 44, 5), star(42, 58, 3.5), star(101, 62, 3.5)];
const OUTER_STARS = [star(12, 28, 4.5), star(130, 30, 4)];

const palette = {
  dark: {
    house: "#1f4a85",
    inside: "#ffffff",
    outside: "#1f4a85",
    swoosh: "#1f4fc8",
  },
  light: {
    house: "#ffffff",
    inside: "#1f4a85",
    outside: "#ffffff",
    swoosh: "#5b8cf0",
  },
};

export function LogoMark({
  className = "h-12 w-auto",
  tone = "dark",
}: {
  className?: string;
  tone?: Tone;
}) {
  const c = palette[tone];

  return (
    <svg
      viewBox="0 0 140 96"
      className={className}
      role="img"
      aria-label="Palmieri Cleaning"
    >
      <path d={HOUSE} fill={c.house} />
      <path d={SPRAY_HEAD} fill={c.inside} />
      <path
        d="M64 39Q59 43 60 50"
        fill="none"
        stroke={c.inside}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="68" y="39" width="12" height="6" fill={c.inside} />
      <rect x="66" y="45" width="16" height="5" rx="1.5" fill={c.inside} />
      <path d={BOTTLE} fill={c.inside} />
      {INNER_STARS.map((d) => (
        <path key={d} d={d} fill={c.inside} />
      ))}
      {OUTER_STARS.map((d) => (
        <path key={d} d={d} fill={c.outside} />
      ))}
      <path d={SWOOSH} fill={c.swoosh} />
    </svg>
  );
}

/** O "A" da logo, em forma de casa com porta. */
function HouseA({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 26 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13 0L26 11H23V24H16V17.5A3 3 0 0 0 10 17.5V24H3V11H0Z" />
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: Tone }) {
  const light = tone === "light";

  return (
    <span className="flex items-center gap-2.5">
      <LogoMark tone={tone} className="h-10 w-auto sm:h-11" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.3rem] font-extrabold tracking-tight sm:text-[1.4rem] ${
            light ? "text-white" : "text-navy-700"
          }`}
        >
          P
          <HouseA className="inline-block h-[0.72em] w-auto align-baseline" />
          LMIERI
          <span className="sr-only">Palmieri</span>
        </span>
        <span
          className={`mt-1 pl-0.5 text-[0.6rem] font-bold tracking-[0.42em] ${
            light ? "text-navy-200" : "text-royal-600"
          }`}
        >
          CLEANING
        </span>
      </span>
    </span>
  );
}
