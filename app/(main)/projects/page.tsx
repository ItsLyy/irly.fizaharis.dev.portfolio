/**
 * Node Modules
 */
import { Suspense } from "react";

/**
 * Custom Modules
 */
import Searchbar from "./_components/search-bar";
import ProjectsGroup from "./_components/projects-group";
import CardProjectSkeleton from "./_components/card-project-skeleton";

/**
 * Data
 */
import getAllProjects from "@/app/_data/project/get-all-projects";

/**
 * Types
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse projects by Irly Fizaharis — web apps and front-end work built with React, Next.js, Tailwind, and more.",
  openGraph: {
    title: "Projects | Irly Fizaharis",
    description:
      "Browse web and front-end projects by Irly Fizaharis. React, Next.js, Tailwind.",
  },
};

export const revalidate = 3600;

export default async function Projects({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const { projects } = await getAllProjects({ query: q });
  return (
    <section className="space-y-4">
      <header>
        <Searchbar />
      </header>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <Suspense fallback={<CardProjectSkeleton />}>
          <ProjectsGroup projects={projects} />
        </Suspense>
      </div>
    </section>
  );
}
