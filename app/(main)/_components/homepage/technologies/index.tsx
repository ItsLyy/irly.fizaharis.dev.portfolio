/**
 * Custom Modules
 */
import Section from "../section";
import Card from "./card";

const capabilityGroups = [
  {
    category: "01 — Frontend & Product UX",
    skills: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Responsive UI",
      "Core Web Vitals",
    ],
  },
  {
    category: "02 — Backend, Data & APIs",
    skills: [
      "Node.js",
      "PostgreSQL",
      "Supabase",
      "Drizzle ORM",
      "RESTful APIs",
      "Database Modeling",
    ],
  },
  {
    category: "03 — Architecture & Delivery",
    skills: [
      "System Architecture",
      "Full-Stack Delivery",
      "Web Performance",
      "Zod & Type Safety",
      "Git / CI/CD",
      "Figma to Code",
    ],
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
