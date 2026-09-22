/**
 * Node Modules
 */
import { Suspense } from "react";

/**
 * Custom Modules
 */
import ProjectsExplorer from "./_components/projects-explorer";
import CardProjectSkeleton from "./_components/card-project-skeleton";

/**
 * Data
 */
import getAllProjects, {
  getAllProjectStacks,
} from "@/app/_data/project/get-all-projects";

/**
 * Types
 */
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects & Builds",
  description:
    "Browse web applications, experiments, and production builds by Irly Fizaharis — built with React, Next.js, TypeScript, and modern web architecture.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects & Builds | Irly Fizaharis",
    description:
      "Browse web applications, experiments, and production builds by Irly Fizaharis — built with React, Next.js, TypeScript, and modern web architecture.",
    url: "https://irly.fizaharis.dev/projects",
  },
};

export default async function Projects({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; stack?: string }>;
}) {
  const { q, stack } = await searchParams;

  // Fetch all projects for fluid client search/filter experience, and distinct stacks
  const [{ projects: allProjects }, availableStacks] = await Promise.all([
    getAllProjects(),
    getAllProjectStacks(),
  ]);

  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <div className="border-border/60 flex items-center gap-2 border-b pb-2 font-mono text-xs font-semibold tracking-wider uppercase">
          <span className="text-accent">[WORK]</span>
          <h2 className="text-faint">ALL BUILDS & EXPERIMENTS</h2>
        </div>
        <div>
          <h1 className="text-foreground text-2xl font-medium md:text-3xl">
            Projects
          </h1>
          <p className="text-muted mt-1 text-sm leading-relaxed">
            A comprehensive index of web applications, client deliverables, and
            technical explorations.
          </p>
        </div>
      </header>

      <Suspense fallback={<CardProjectSkeleton />}>
        <ProjectsExplorer
          allProjects={allProjects}
          initialProjects={allProjects}
          availableStacks={availableStacks}
          initialQuery={q || ""}
          initialStack={stack || "ALL"}
        />
      </Suspense>
    </section>
  );
}
