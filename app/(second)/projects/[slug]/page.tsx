/**
 * Node Modules
 */
import Image from "next/image";
import { notFound } from "next/navigation";

/**
 * Custom Modules
 */
import MarkdownRenderer from "@/app/_components/general/markdown-renderer";
import CallToAction from "./_components/call-to-action";
import getContentProject from "@/app/_data/project/get-content-project";
import getProject from "@/app/_data/project/get-project";
import GoBackButton from "./_components/go-back-button";
import StacksGroup from "./_components/stacks-group";
import { defaultMetadata } from "@/app/_lib/metadata";

/**
 * Types
 */
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { project } = await getProject(slug);
  if (!project) return { title: "Project Not Found" };

  const title = project.name;
  const description = `${project.name} — ${project.stacks.join(", ")}. View project details and case study.`;
  const baseUrl = defaultMetadata.metadataBase?.toString() ?? "";
  const url = `${baseUrl}/projects/${slug}`;
  const imagePath = project.imagePath.startsWith("http")
    ? project.imagePath
    : `${baseUrl}${project.imagePath.startsWith("/") ? "" : "/"}${project.imagePath}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | Irly Fizaharis`,
      description,
      url,
      type: "article",
      images: [{ url: imagePath, alt: project.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Irly Fizaharis`,
      description,
    },
  };
}

export default async function DetailProjects({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { project } = await getProject(slug);
  if (!project) notFound();

  const content = await getContentProject(project.contentPath);

  return (
    <section>
      <header className="mt-8 mb-4">
        <GoBackButton />
        <div className="mt-8 mb-2 flex justify-between">
          <h1 className="text-4xl font-medium">{project.name}</h1>
          <CallToAction
            linkGithub={project.githubLink}
            linkWebsite={project.websiteLink}
          />
        </div>
        <div className="relative aspect-video w-full overflow-hidden rounded-md">
          <Image
            src={project.imagePath}
            alt={project.name}
            fill
            className="bg-app-300 size-full transition-discrete duration-300 ease-in-out hover:scale-105"
          />
        </div>
        <div className="my-2 grid grid-cols-2">
          <StacksGroup stacks={project.stacks} />
          <div className="flex justify-end">
            <span className="text-app-300 text-sm">
              {new Date(project.createdAt).toDateString()}
            </span>
          </div>
        </div>
      </header>
      <div className="pt-2 pb-24">
        <MarkdownRenderer content={content} />
      </div>
    </section>
  );
}
