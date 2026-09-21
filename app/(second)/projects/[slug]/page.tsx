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
import getProject, {
  getAllProjectSlugs,
} from "@/app/_data/project/get-project";
import GoBackButton from "./_components/go-back-button";
import StacksGroup from "./_components/stacks-group";
import FadeIn from "@/app/_components/motion/fade-in";
import { defaultMetadata } from "@/app/_lib/metadata";

/**
 * Types
 */
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

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
      images: [imagePath],
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: defaultMetadata.metadataBase?.toString() ?? "",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${defaultMetadata.metadataBase?.toString() ?? ""}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: `${defaultMetadata.metadataBase?.toString() ?? ""}/projects/${project.slug}`,
      },
    ],
  };

  return (
    <FadeIn>
      <section className="p-2">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <header className="mt-3 mb-4">
          <GoBackButton />
          <div className="mt-6 mb-2 flex justify-between">
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
              priority
              sizes="(min-width: 768px) 720px, 100vw"
              className="bg-sunken size-full object-cover transition-discrete duration-300 ease-in-out hover:scale-105"
            />
          </div>
          <div className="my-2 grid grid-cols-2">
            <StacksGroup stacks={project.stacks} />
            <div className="flex justify-end">
              <span className="text-dim text-sm">
                {new Date(project.createdAt).toDateString()}
              </span>
            </div>
          </div>
        </header>
        <div className="pt-2 pb-24">
          <MarkdownRenderer content={content} />
        </div>
      </section>
    </FadeIn>
  );
}
