CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"imagePath" varchar NOT NULL,
	"githubLink" varchar,
	"websiteLink" varchar,
	"stacks" varchar[],
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
