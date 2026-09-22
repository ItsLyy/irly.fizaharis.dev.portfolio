/**
 * Custom Modules
 */
import { db } from "@/app/_db";
import { projects } from "@/app/_db/schema";
import { siteConfig } from "@/app/_lib/metadata";

/**
 * Types
 */
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url.origin;
  const now = new Date();

  let projectEntries: MetadataRoute.Sitemap = [];

  try {
    const rows = await db
      .select({
        slug: projects.slug,
        updatedAt: projects.updatedAt,
      })
      .from(projects);

    projectEntries = rows.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: project.updatedAt ? new Date(project.updatedAt) : now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error generating sitemap project entries:", error);
  }

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...projectEntries,
  ];
}
