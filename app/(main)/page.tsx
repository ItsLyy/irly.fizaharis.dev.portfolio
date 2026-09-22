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
    absolute: "Irly Fizaharis — Full-Stack Developer & Software Engineer",
  },
  description:
    "Portfolio of Irly Fizaharis — full-stack developer and software engineer based in Bandung, Indonesia. Delivering scalable web applications, robust APIs, and measurable business value.",
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
        role="Full-Stack Developer"
        location="Bandung, Indonesia"
        experience={new Date().getFullYear() - 2022}
      />

      <FadeIn>
        <section aria-label="About" className="space-y-3">
          <div className="border-border/60 flex items-center gap-2 border-b pb-2 font-mono text-xs font-semibold tracking-wider uppercase">
            <span className="text-accent">[ABOUT]</span>
            <h2 className="text-faint">BACKGROUND & VALUE PROPOSITION</h2>
          </div>
          <div className="text-muted space-y-2 text-sm leading-relaxed md:text-base">
            <p>
              I engineer end-to-end web applications that bridge high-impact
              user experiences with resilient, scalable backend systems.
              Specializing in the modern TypeScript ecosystem (Next.js, Node.js,
              PostgreSQL, Supabase), I help businesses turn product visions and
              complex operational workflows into dependable, high-converting
              digital software.
            </p>
            <p className="text-faint font-mono text-xs md:text-sm">
              &gt; Solving real business problems through clean architecture,
              optimal performance, and reliable delivery.
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
