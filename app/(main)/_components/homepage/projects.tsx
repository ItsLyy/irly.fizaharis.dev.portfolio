/**
 * Node Modules
 */
import { Suspense } from "react";

/**
 * Custom Modules
 */
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

/**
 * Custom Modules
 */
import CardProjectSkeleton from "../../projects/_components/card-project-skeleton";
import ProjectsGroup from "../../projects/_components/projects-group";
import Section from "./section";

/**
 * Types
 */
import type { IProject } from "@/app/_types";

type ICardProjectProps = Pick<
  IProject,
  "name" | "slug" | "stacks" | "imagePath"
>;

const Projects = ({ projects }: { projects: ICardProjectProps[] }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <Section
      title="FEATURED WORK"
      badge="[PROJECTS]"
      action={
        <Link
          href="/projects"
          className="text-muted hover:text-accent flex items-center gap-1 font-mono text-xs transition-colors"
        >
          <span>View all</span>
          <ArrowRightIcon className="size-3.5" />
        </Link>
      }
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Suspense fallback={<CardProjectSkeleton />}>
          <ProjectsGroup projects={projects} />
        </Suspense>
      </div>
    </Section>
  );
};

export default Projects;
