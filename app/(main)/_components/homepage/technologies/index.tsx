/**
 * Custom Modules
 */
import Section from "../section";
import Card from "./card";

const capabilityGroups = [
  {
    category: "01 — Web Interfaces",
    skills: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Responsive UI",
    ],
  },
  {
    category: "02 — Backend & Data",
    skills: ["Node.js", "Supabase", "PostgreSQL", "Drizzle ORM", "REST APIs"],
  },
  {
    category: "03 — Workflow & Tools",
    skills: ["Git / GitHub", "Figma", "Web Performance", "Zod"],
  },
];

const Technologies = () => {
  return (
    <Section title="CAPABILITIES & TECH" badge="[STACK]">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {capabilityGroups.map((group) => (
          <div
            key={group.category}
            className="border-border bg-surface/50 space-y-2 rounded-sm border p-3"
          >
            <h3 className="text-accent/90 font-mono text-xs font-semibold tracking-wider uppercase">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <Card key={skill} name={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Technologies;
