/**
 * Node Modules
 */
import { Suspense } from "react";

/**
 * Custom Modules
 */
import CardProject from "../../projects/_components/card-project";
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
  return (
    <Section title="PROJECTs">
      <div className="mt-2 grid grid-cols-3 gap-2">
        <Suspense fallback={<CardProjectSkeleton />}>
          <ProjectsGroup projects={projects} />
        </Suspense>
      </div>
    </Section>
  );
};

export default Projects;
