/**
 * Custom Modules
 */
import Contact from "./_components/homepage/contact";
import Timelines from "./_components/homepage/timelines";
import Header from "./_components/homepage/header";
import Technologies from "./_components/homepage/technologies";
import Projects from "./_components/homepage/projects";
import FadeIn from "../_components/motion/fade-in";

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
  title: {
    absolute: "Irly Fizaharis — Front-end Developer & Software Engineer",
  },
  description:
    "Portfolio of Irly Fizaharis — front-end web developer based in Bandung, Indonesia. Projects, skills, education, and experience.",
  alternates: {
    canonical: "/",
  },
};

export const revalidate = 3600;

export default async function Home() {
  const { projects } = await getAllProjects({ limit: 3 });
  return (
    <div className="space-y-10">
      <Header
        role="Front-end Developer"
        location="Bandung, Indonesia"
        experience={new Date().getFullYear() - 2022}
      />

      <FadeIn>
        <section aria-label="About" className="space-y-3">
          <div className="border-border/60 flex items-center gap-2 border-b pb-2 font-mono text-xs font-semibold tracking-wider uppercase">
            <span className="text-accent">[ABOUT]</span>
            <h2 className="text-faint">BACKGROUND & APPROACH</h2>
          </div>
          <div className="text-muted space-y-2 text-sm leading-relaxed md:text-base">
            <p>
              I specialize in building responsive, accessible web interfaces and
              frontend architecture with React and Next.js. My focus is on
              turning ideas into clean, maintainable software with high
              performance and solid UX.
            </p>
            <p className="text-faint font-mono text-xs md:text-sm">
              &gt; Committed to structure over decoration, fast execution, and
              reliable delivery.
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.05}>
        <Technologies />
      </FadeIn>

      <FadeIn delay={0.05}>
        <Projects projects={projects} />
      </FadeIn>

      <FadeIn delay={0.05}>
        <Timelines title="EDUCATION" badge="[ACADEMIC]" datas={educations} />
      </FadeIn>

      <FadeIn delay={0.05}>
        <Timelines title="EXPERIENCE" badge="[CAREER]" datas={experiences} />
      </FadeIn>

      <FadeIn delay={0.05}>
        <Contact />
      </FadeIn>
    </div>
  );
}
