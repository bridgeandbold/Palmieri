import type { MetadataRoute } from "next";
import { cities, site, type Tier } from "@/lib/site";

// Cidades mais fortes pedem mais prioridade ao Google.
const priority: Record<Tier, number> = { core: 0.9, growth: 0.8, light: 0.7 };

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...cities.map((city) => ({
      url: `${site.url}/cleaning-services/${city.slug}`,
      changeFrequency: "monthly" as const,
      priority: priority[city.tier],
    })),
  ];
}
