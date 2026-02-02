/**
 * Node Modules
 */
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

/**
 * Custom Modules
 */
import { db } from "@/app/_db";
import { projects } from "@/app/_db/schema";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const data = await db
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

    return NextResponse.json({
      message: "Project successfully retrieve.",
      project: data[0],
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong!",
      },
      { status: 500 },
    );
  }
}
