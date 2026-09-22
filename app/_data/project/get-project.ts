"server only";

/**
 * Node Modules
 */
import { eq } from "drizzle-orm";

/**
 * Custom Modules
 */
import { db } from "@/app/_db";
import { projects } from "@/app/_db/schema";

export default async function getProject(slug: string) {
  const project = await db
    .select({
      id: projects.id,
      name: projects.name,
      slug: projects.slug,
      contentPath: projects.contentPath,
      imagePath: projects.imagePath,
      githubLink: projects.githubLink,
      websiteLink: projects.websiteLink,
      stacks: projects.stacks,
      createdAt: projects.createdAt,
      updatedAt: projects.updatedAt,
    })
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1);

  return { project: project[0] };
}

export async function getAllProjectSlugs() {
  const rows = await db
    .select({ slug: projects.slug })
    .from(projects)
    .orderBy(projects.createdAt);
  return rows.map((row) => row.slug);
}
