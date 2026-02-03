/**
 * Custom Modules
 */
import CardProject from "./card-project";

/**
 * Types
 */
import type { IProject } from "@/app/_types";
type IProjectsGroupProps = Pick<
  IProject,
  "name" | "slug" | "stacks" | "imagePath"
>;

const ProjectsGroup = ({ projects }: { projects: IProjectsGroupProps[] }) => {
  return (
    <>
      {projects?.map((project) => (
        <CardProject key={project.slug} {...project} />
      ))}
    </>
  );
};

export default ProjectsGroup;
