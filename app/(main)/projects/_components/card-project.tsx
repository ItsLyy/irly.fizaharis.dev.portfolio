/**
 * Node Modules
 */
import { ArrowRightIcon, TagIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

/**
 * Custom Modules
 */
import StackBadge from "@/app/_components/ui/stack-badge";

/**
 * Types
 */
import type { IProject } from "@/app/_types";

type ICardProjectProps = Pick<
  IProject,
  "name" | "slug" | "stacks" | "imagePath"
>;

const CardProject = ({ name, slug, stacks, imagePath }: ICardProjectProps) => {
  return (
    <Link
      href={`/projects/${slug}`}
      className="border-app-300 group w-full cursor-pointer overflow-hidden rounded-md border-[0.5px] shadow-[0_0_10px_.5px] shadow-black/10"
    >
      <div className="relative aspect-video w-full">
        <Image
          src={imagePath}
          alt={name}
          className="bg-app-300 origin-bottom object-cover transition-discrete duration-300 ease-in-out group-hover:scale-105"
          fill
        />
      </div>
      <div className="space-y-2 pt-2 pr-3 pb-3 pl-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base group-hover:underline">{name}</h2>
          <ArrowRightIcon className="transition-discrete duration-300 ease-in-out group-hover:-rotate-45" />
        </div>
        <div className="flex gap-2">
          <TagIcon weight="duotone" className="text-app-250 shrink-0" />
          <div className="flex flex-wrap gap-1">
            {stacks.map((stack, index) => (
              <StackBadge key={index} name={stack} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardProject;
