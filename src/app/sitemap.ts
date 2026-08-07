import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/** Public, indexable routes. Auth (/login, /dashboard) and /api are excluded. */
const ROUTES: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },
  { path: "/services", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/schedule", priority: 0.9 },
  { path: "/sss", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // While the maintenance gate is on there is nothing to index yet.
  if (process.env.MAINTENANCE_MODE === "on") return [];

  // Build time ≈ last content change; the only lastmod signal a static site has.
  const lastModified = new Date();

  return ROUTES.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
