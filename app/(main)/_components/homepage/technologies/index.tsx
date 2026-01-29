/**
 * Node Modules
 */
import {
  IconBrandFigma,
  IconBrandNextjs,
  IconBrandReact,
  IconBrandTailwind,
} from "@tabler/icons-react";

/**
 * Custom Modules
 */
import Section from "../section";
import Card from "./card";

const technologies = [
  {
    name: "Next.js",
    icon: IconBrandNextjs,
  },
  {
    name: "React",
    icon: IconBrandReact,
  },
  {
    name: "Tailwindcss",
    icon: IconBrandTailwind,
  },
  {
    name: "Figma",
    icon: IconBrandFigma,
  },
];

const Technologies = () => {
  return (
    <Section title="TECHNOLOGIEs">
      <div className="flex w-full flex-wrap gap-2 py-2">
        {technologies.map((technology, index) => (
          <Card key={index} name={technology.name} icon={technology.icon} />
        ))}
      </div>
    </Section>
  );
};

export default Technologies;
