"use client";

/**
 * Node Modules
 */
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CodeBlockIcon,
  HouseSimpleIcon,
  ReadCvLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

const MobileHeader = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProjects =
    pathname === "/projects" || pathname.startsWith("/projects/");

  return (
    <header className="border-border/80 bg-background/90 sticky top-0 z-40 flex w-full items-center justify-between border-b px-4 py-2.5 backdrop-blur-md md:hidden">
      <Link href="/" className="group flex items-center gap-2.5">
        <div className="border-border relative size-8 shrink-0 overflow-hidden rounded-sm border">
          <Image
            src="/images/profile-headshot.jpeg"
            alt="Irly Fizaharis"
            fill
            sizes="32px"
            className="bg-sunken object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-foreground group-hover:text-accent text-sm leading-tight font-medium transition-colors">
            Irly Fizaharis
          </span>
          <span className="text-muted flex items-center gap-1.5 font-mono text-[10px]">
            <span className="relative flex size-1.5">
              <span className="bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
              <span className="bg-accent relative inline-flex size-1.5 rounded-full" />
            </span>
            Available
          </span>
        </div>
      </Link>

      <nav aria-label="Mobile Navigation" className="flex items-center gap-1">
        <Link
          href="/"
          aria-label="Home"
          aria-current={isHome ? "page" : undefined}
          className={`flex size-8 items-center justify-center rounded-sm border transition-all ${
            isHome
              ? "border-accent/50 bg-accent/15 text-accent"
              : "border-border/60 text-muted hover:text-foreground"
          }`}
        >
          <HouseSimpleIcon
            className="size-4"
            weight={isHome ? "duotone" : "regular"}
          />
        </Link>
        <Link
          href="/projects"
          aria-label="Projects"
          aria-current={isProjects ? "page" : undefined}
          className={`flex size-8 items-center justify-center rounded-sm border transition-all ${
            isProjects
              ? "border-accent/50 bg-accent/15 text-accent"
              : "border-border/60 text-muted hover:text-foreground"
          }`}
        >
          <CodeBlockIcon
            className="size-4"
            weight={isProjects ? "duotone" : "regular"}
          />
        </Link>
        <a
          href="/documents/resume.pdf"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Resume (PDF)"
          className="border-border/60 text-muted hover:border-border-strong hover:text-foreground flex size-8 items-center justify-center rounded-sm border"
        >
          <ReadCvLogoIcon className="size-4" weight="duotone" />
        </a>
      </nav>
    </header>
  );
};

export default MobileHeader;
