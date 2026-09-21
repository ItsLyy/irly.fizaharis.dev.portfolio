"server only";

/**
 * Node Modules
 */
import { ilike, sql, or, and, desc } from "drizzle-orm";

const escapeLike = (value: string) => value.replace(/([\\_%])/g, "\\$1");

/**
 * Custom Modules
 */
import { db } from "@/app/_db";
import { projects } from "@/app/_db/schema";

export interface GetAllProjectsParams {
  query?: string;
  stack?: string;
  limit?: number;
}

export default async function getAllProjects({
  query = "",
  stack = "",
  limit = 0,
}: GetAllProjectsParams = {}) {
  try {
    let data = db
      .select({
        name: projects.name,
        slug: projects.slug,
        imagePath: projects.imagePath,
        stacks: projects.stacks,
        createdAt: projects.createdAt,
      })
      .from(projects)
      .$dynamic();

    const normalizedQuery = query.trim();
    const normalizedStack = stack.trim();

    const conditions = [];

    if (normalizedQuery) {
      const escaped = escapeLike(normalizedQuery);
      conditions.push(
        or(
          ilike(projects.name, `%${escaped}%`),
          sql`EXISTS (SELECT 1 FROM unnest(${projects.stacks}) s WHERE s ILIKE ${"%" + escaped + "%"})`,
        ),
      );
    }

    if (normalizedStack && normalizedStack.toLowerCase() !== "all") {
      conditions.push(
        sql`EXISTS (SELECT 1 FROM unnest(${projects.stacks}) s WHERE LOWER(s) = LOWER(${normalizedStack}))`,
      );
    }

    if (conditions.length === 1) {
      data = data.where(conditions[0]);
    } else if (conditions.length > 1) {
      data = data.where(and(...conditions));
    }

    data = data.orderBy(desc(projects.createdAt));

    if (limit > 0) {
      data = data.limit(limit);
    }

    return {
      message: "Projects successfully retrieved.",
      projects: await data,
    };
  } catch (error) {
    console.error("Error retrieving projects:", error);
    return {
      message: "Something went wrong",
      projects: [],
    };
  }
}

export async function getAllProjectStacks(): Promise<string[]> {
  try {
    const rows = await db.select({ stacks: projects.stacks }).from(projects);
    const stackSet = new Set<string>();
    rows.forEach((r) => {
      if (Array.isArray(r.stacks)) {
        r.stacks.forEach((s) => stackSet.add(s.trim()));
      }
    });
    return Array.from(stackSet).sort((a, b) => a.localeCompare(b));
  } catch (error) {
    console.error("Error retrieving project stacks:", error);
    return [];
  }
}
