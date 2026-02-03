/**
 * Node Modules
 */
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * Column Helper
 */
const timestamps = {
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$onUpdate(() => new Date()),
};

export const projects = pgTable("projects", {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  slug: varchar().notNull().unique(),
  contentPath: varchar().notNull(),
  imagePath: varchar().notNull(),
  githubLink: varchar(),
  websiteLink: varchar(),
  stacks: varchar().array().notNull(),
  ...timestamps,
});

export type InsertProject = typeof projects.$inferInsert;
export type SelectProject = typeof projects.$inferSelect;
