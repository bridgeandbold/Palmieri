/**
 * ============================================================
 *  PAINEL DE CONTROLE DO SITE - Palmieri Cleaning
 *  Quase todo o texto do site sai deste arquivo. Mexeu aqui,
 *  mudou no site inteiro (home, paginas de cidade, SEO, form).
 * ============================================================
 */

export const site = {
  name: "Palmieri Cleaning",
  shortName: "Palmieri",
  // Deixe "" para esconder do site. Preencha assim que o cliente passar.
  phone: "", // ex.: "(860) 555-0134"
  email: "taianypalmiericleaning@gmail.com",
  // Dominio real. Alimenta SEO, sitemap e schema.org.
  url: "https://palmiericleaning.com",
};

/** "(860) 555-0134" -> "tel:+18605550134" */
export const phoneHref = site.phone
  ? "tel:+1" + site.phone.replace(/\D/g, "")
  : "";

/** ["A", "B", "C"] -> "A, B and C" */
export function listNames(names: string[]) {
  if (names.length < 2) return names.join("");
  return names.slice(0, -1).join(", ") + " and " + names[names.length - 1];
}

export type RegionId = "valley" | "shoreline" | "litchfield";

export const regions: { id: RegionId; name: string; blurb: string }[] = [
  {
    id: "valley",
    name: "Farmington Valley & Greater Hartford",
    blurb: "Busy family homes, condos and everything in between.",
  },
  {
    id: "shoreline",
    name: "Southeastern Shoreline",
    blurb: "Year-round homes, beach cottages and vacation rentals.",
  },
  {
    id: "litchfield",
    name: "Litchfield Hills",
    blurb: "Lake houses, weekend homes and in-town living.",
  },
];

/**
 * tier = forca da cidade para o negocio:
 *   core   -> melhores (aparecem no titulo do site e tem prioridade no sitemap)
 *   growth -> potencial
 *   light  -> mais fracas (continuam no site, com menos destaque)
 * A ordem desta lista e a ordem em que as cidades aparecem no site.
 */
export type Tier = "core" | "growth" | "light";

export type City = {
  slug: string;
  name: string;
  zip: string;
  county: string;
  region: RegionId;
  tier: Tier;
  intro: string;
};

export const cities: City[] = [
  {
    slug: "farmington-ct",
    name: "Farmington",
    zip: "06032",
    county: "Hartford County",
    region: "valley",
    tier: "core",
    intro:
      "From Unionville to the older homes around Farmington's historic center, we keep houses across town clean on a schedule that fits your week. Recurring visits, deep cleans before the holidays and move-out cleaning when a home changes hands.",
  },
  {
    slug: "avon-ct",
    name: "Avon",
    zip: "06001",
    county: "Hartford County",
    region: "valley",
    tier: "core",
    intro:
      "From the neighborhoods along Route 44 to the streets below Avon Mountain, we clean Avon homes weekly, every two weeks or once a month, with deep cleaning and move-in cleaning whenever you need a fresh start.",
  },
  {
    slug: "groton-ct",
    name: "Groton",
    zip: "06355",
    county: "New London County",
    region: "shoreline",
    tier: "core",
    intro:
      "We clean homes across Groton and the Groton side of Mystic, from year-round family houses to rentals that need a fast, reliable turnover between guests.",
  },
  {
    slug: "old-lyme-ct",
    name: "Old Lyme",
    zip: "06371",
    county: "New London County",
    region: "shoreline",
    tier: "growth",
    intro:
      "Shoreline homes deal with sand, salt air and summer guests. We handle recurring cleaning for year-round Old Lyme residents and turnovers for beach cottages and vacation rentals near the Sound.",
  },
  {
    slug: "manchester-ct",
    name: "Manchester",
    zip: "06040",
    county: "Hartford County",
    region: "valley",
    tier: "growth",
    intro:
      "Houses, condos and apartments all over Manchester. Recurring cleaning for busy households, deep cleans when the house needs a reset, and move-in or move-out cleaning when a lease ends.",
  },
  {
    slug: "torrington-ct",
    name: "Torrington",
    zip: "06790",
    county: "Litchfield County",
    region: "litchfield",
    tier: "light",
    intro:
      "Recurring and deep cleaning for homes across Torrington, plus move-out cleaning for families on the move and landlords getting a unit ready for the next tenant.",
  },
  {
    slug: "new-preston-ct",
    name: "New Preston",
    zip: "06777",
    county: "Litchfield County",
    region: "litchfield",
    tier: "light",
    intro:
      "Lake houses and weekend homes around Lake Waramaug need someone they can count on while the owners are away. We get homes ready before you arrive, clean up after you leave, and keep them fresh in between.",
  },
];

export const featuredCities = cities.filter((city) => city.tier === "core");

export function cityBySlug(slug: string) {
  return cities.find((city) => city.slug === slug);
}

export const allTowns = listNames(cities.map((city) => city.name));

export const seoDescription = `${site.name} offers house cleaning in ${allTowns}, CT. Recurring, deep, move-out and vacation rental cleaning. Request a free estimate online.`;

export type Service = {
  slug: string;
  title: string;
  blurb: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    slug: "recurring",
    title: "Recurring House Cleaning",
    blurb:
      "Weekly, every two weeks or monthly visits that keep your home consistently fresh, without you lifting a finger.",
    bullets: [
      "Kitchens and bathrooms",
      "Dusting and vacuuming",
      "Floors mopped",
      "Beds made, trash out",
    ],
  },
  {
    slug: "deep",
    title: "Deep Cleaning",
    blurb:
      "A top-to-bottom reset for the spots a regular clean never reaches. The best way to start with us.",
    bullets: [
      "Baseboards and door frames",
      "Inside the oven and fridge",
      "Tile, grout and shower build-up",
      "Light fixtures and vents",
    ],
  },
  {
    slug: "move",
    title: "Move In / Move Out",
    blurb:
      "Hand over the keys with a spotless home, or walk into a new one that already feels like yours.",
    bullets: [
      "Inside all cabinets and drawers",
      "Appliances inside and out",
      "Closets and storage",
      "Timed around your closing or lease",
    ],
  },
  {
    slug: "rental",
    title: "Vacation Rental Turnovers",
    blurb:
      "Fast, dependable cleaning between guests for shoreline rentals, lake houses and Airbnbs.",
    bullets: [
      "Same-day turnovers",
      "Linen change",
      "Restock the essentials",
      "Ready for the next check-in",
    ],
  },
  {
    slug: "construction",
    title: "Post-Construction Cleaning",
    blurb:
      "Fine dust settles everywhere after a remodel. We do the careful, multi-pass cleaning it takes to clear it.",
    bullets: [
      "Dust removal on every surface",
      "Windows, sills and fixtures",
      "Paint and adhesive spots",
      "Final detail pass",
    ],
  },
  {
    slug: "office",
    title: "Office & Small Business",
    blurb:
      "Clean offices, studios and small shops, scheduled around your hours so work never stops.",
    bullets: [
      "After-hours scheduling",
      "Restrooms and break rooms",
      "Desks and common areas",
      "Flexible frequency",
    ],
  },
];

export const reasons = [
  {
    title: "Free estimate, no pressure",
    text: "Tell us about your home and get a clear quote before anything is booked. No deposit, no obligation.",
  },
  {
    title: "A checklist on every visit",
    text: "Kitchens, bathrooms, floors and dusting done the same careful way every time, so nothing gets skipped.",
  },
  {
    title: "Scheduling that fits your life",
    text: "Weekly, every two weeks, monthly or just once. Need to move a visit? Just let us know.",
  },
  {
    title: "Local to Connecticut",
    text: "A local team that knows the towns we serve, from the Farmington Valley to the shoreline.",
  },
];

export const faqs = [
  {
    q: "How do I get a price?",
    a: "Fill out the estimate form with your town, the type of cleaning and the size of your home. We reply with a quote, and the estimate is always free.",
  },
  {
    q: "Do I need to be home during the cleaning?",
    a: "It is up to you. Many clients leave a key or a door code and come home to a finished house. Others like to be there for the first visit.",
  },
  {
    q: "Do you bring your own supplies?",
    a: "Yes. We arrive with the products and equipment the job needs. If you prefer we use specific products in your home, just tell us.",
  },
  {
    q: "I have pets. Is that a problem?",
    a: "Not at all. Mention them in the form so we know who we are meeting, and tell us about anything they are sensitive to.",
  },
  {
    q: "Which towns do you serve?",
    a: `${allTowns}, Connecticut. If you are just outside that list, send a request anyway and we will let you know.`,
  },
  {
    q: "How far in advance should I book?",
    a: "For recurring cleaning we can often start within the same week. Deep cleans, move-outs and construction cleanups take longer, so reach out as early as you can.",
  },
];
