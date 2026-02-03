/**
 * Custom Modules
 */
import Contact from "./_components/homepage/contact";
import Timelines from "./_components/homepage/timelines";
import Header from "./_components/homepage/header";
import Technologies from "./_components/homepage/technologies";
import Projects from "./_components/homepage/projects";

/**
 * Data
 */
import { educations } from "../_data/get-all-educations";
import { experiences } from "../_data/get-all-experiences";
import getAllProjects from "../_data/project/get-all-projects";

/**
 * Types
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Irly Fizaharis — Front-end web developer. Projects, skills, education, and experience. Based in Bandung, Indonesia.",
  openGraph: {
    title: "Irly Fizaharis | Front-end Developer",
    description:
      "Portfolio of Irly Fizaharis. Projects, skills, education, and experience.",
  },
};

export default async function Home() {
  const { projects } = await getAllProjects({ limit: 3 });
  return (
    <div className="space-y-8">
      <Header
        role="Front-end Web Developer"
        location="Bandung, Indonesia"
        experience={new Date().getFullYear() - 2022}
      />
      <section aria-label="About Me">
        <p className="font-medium">
          I’m a Front-end web developer who loves coding and technology. I’m
          always learning new tools and enjoy solving new problems.
        </p>
      </section>
      <Technologies />
      {projects?.length > 0 && <Projects projects={projects} />}
      <Timelines title="EDUCATIONs" datas={educations} />
      <Timelines title="EXPERIENCEs" datas={experiences} />
      <Contact />
    </div>
  );
}
