/**
 * Custom Modules
 */
import Contact from "./_components/homepage/contact";
import Timelines from "./_components/homepage/timelines";
import Header from "./_components/homepage/header";
import Technologies from "./_components/homepage/technologies";

/**
 * Data
 */
import { educations } from "../_data/get-all-educations";
import { experiences } from "../_data/get-all-experiences";

export default function Home() {
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
      <Timelines title="EDUCATIONs" datas={educations} />
      <Timelines title="EXPERIENCEs" datas={experiences} />
      <Contact />
    </div>
  );
}
