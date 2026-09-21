"use client";

/**
 * Node Modules
 */
import { ArrowRightIcon, TagIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Custom Modules
 */
import Badge from "@/app/_components/ui/badge";
import Card from "@/app/_components/ui/card";

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
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="h-full w-full"
    >
      <Link href={`/projects/${slug}`} className="group block h-full w-full">
        <Card
          hover={false}
          className="group-hover:border-border-strong flex h-full flex-col justify-between transition-colors duration-200"
        >
          <div>
            <div className="border-border/60 bg-sunken relative aspect-video w-full overflow-hidden border-b">
              <Image
                src={imagePath}
                alt={name}
                sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                priority={false}
                className="bg-sunken object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                fill
              />
            </div>
            <div className="space-y-2.5 p-3.5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-foreground group-hover:text-accent text-base font-medium transition-colors">
                  {name}
                </h3>
                <ArrowRightIcon className="text-muted group-hover:text-accent size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="flex items-center gap-1.5 pt-0.5">
                <TagIcon
                  weight="duotone"
                  className="text-faint size-3.5 shrink-0"
                />
                <div className="flex flex-wrap gap-1">
                  {stacks.map((stack, index) => (
                    <Badge key={index} name={stack} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default CardProject;
