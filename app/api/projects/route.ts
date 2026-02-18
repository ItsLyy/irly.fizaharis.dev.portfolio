/**
 * Node Modules
 */
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { like, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

/**
 * Custom Modules
 */
import { db } from "@/app/_db";
import { projects } from "@/app/_db/schema";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGES_PROJECTS_DIR = path.join(PUBLIC_DIR, "images", "projects");
const DOCUMENTS_PROJECTS_DIR = path.join(PUBLIC_DIR, "documents", "projects");

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const query = searchParams.get("q") || "";
    const limit = parseInt(searchParams.get("limit") || "0");

    let data = db
      .select({
        id: projects.id,
        name: projects.name,
        slug: projects.slug,
        imagePath: projects.imagePath,
        stacks: projects.stacks,
      })
      .from(projects)
      .where(like(projects.name, `%${query}%`))
      .$dynamic();

    if (limit > 0) data = data.limit(limit);

    return NextResponse.json({
      message: "Projects successfully retrieve.",
      projects: await data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong!",
        error,
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString()?.trim();
    const slug = formData
      .get("slug")
      ?.toString()
      ?.trim()
      .toLowerCase()
      .replace(/\s+/g, "-");
    const githubLink = formData.get("githubLink")?.toString()?.trim() || null;
    const websiteLink = formData.get("websiteLink")?.toString()?.trim() || null;

    const stacksRaw = formData.get("stacks");
    let stacks: string[] = [];
    if (typeof stacksRaw === "string") {
      try {
        const parsed = JSON.parse(stacksRaw) as unknown;
        stacks = Array.isArray(parsed)
          ? parsed.map(String)
          : stacksRaw
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);
      } catch {
        stacks = stacksRaw
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }

    if (!name || !slug) {
      return NextResponse.json(
        { message: "Missing required fields: name, slug" },
        { status: 400 },
      );
    }

    if (!stacks.length) {
      return NextResponse.json(
        {
          message: "stacks must be a non-empty array or comma-separated string",
        },
        { status: 400 },
      );
    }

    const imageFile = formData.get("image") as File | null;
    let imagePath: string;

    if (imageFile && imageFile.size > 0) {
      await mkdir(IMAGES_PROJECTS_DIR, { recursive: true });
      const ext = path.extname(imageFile.name) || ".jpg";
      const filename = `${slug}${ext}`;
      const filePath = path.join(IMAGES_PROJECTS_DIR, filename);
      const bytes = await imageFile.arrayBuffer();
      await writeFile(filePath, Buffer.from(bytes));
      imagePath = `/images/projects/${filename}`;
    } else {
      const imagePathFromField = formData.get("imagePath")?.toString()?.trim();
      if (!imagePathFromField) {
        return NextResponse.json(
          { message: "Either upload an 'image' file or provide 'imagePath'" },
          { status: 400 },
        );
      }
      imagePath = imagePathFromField;
    }

    const contentFile = formData.get("content") as File | null;
    let contentPath: string;

    if (contentFile && contentFile.size > 0) {
      await mkdir(DOCUMENTS_PROJECTS_DIR, { recursive: true });
      const filename = `${slug}.md`;
      const filePath = path.join(DOCUMENTS_PROJECTS_DIR, filename);
      const bytes = await contentFile.arrayBuffer();
      await writeFile(filePath, Buffer.from(bytes));
      contentPath = `/documents/projects/${filename}`;
    } else {
      const contentPathFromField = formData
        .get("contentPath")
        ?.toString()
        ?.trim();
      if (!contentPathFromField) {
        return NextResponse.json(
          {
            message:
              "Either upload a 'content' markdown file or provide 'contentPath'",
          },
          { status: 400 },
        );
      }
      contentPath = contentPathFromField;
    }

    await db.insert(projects).values({
      name,
      slug,
      imagePath,
      contentPath,
      githubLink,
      websiteLink,
      stacks,
    });

    return NextResponse.json(
      {
        message: "Project successfully created.",
        project: { name, slug, imagePath, contentPath },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 },
    );
  }
}
