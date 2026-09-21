import React from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  HouseSimpleIcon,
  ReadCvLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import Logo from "../_components/ui/logo";

export default function SecondLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh w-full">
      <header className="border-border/80 bg-background/90 sticky top-0 z-40 border-b px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href="/"
            className="text-foreground hover:text-accent group flex items-center gap-2.5 transition-colors"
          >
            <Logo className="size-8" />
            <span className="text-sm font-medium">Irly Fizaharis</span>
          </Link>

          <nav
            aria-label="Page Navigation"
            className="flex items-center gap-2 font-mono text-xs"
          >
            <Link
              href="/"
              className="border-border/60 text-muted hover:border-border-strong hover:text-foreground flex items-center gap-1.5 rounded-sm border px-2.5 py-1.5 transition-all"
            >
              <HouseSimpleIcon className="size-3.5" />
              <span>Home</span>
            </Link>
            <Link
              href="/projects"
              className="border-border/60 text-muted hover:border-border-strong hover:text-foreground flex items-center gap-1.5 rounded-sm border px-2.5 py-1.5 transition-all"
            >
              <ArrowLeftIcon className="size-3.5" />
              <span>Projects</span>
            </Link>
            <a
              href="/documents/resume.pdf"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Resume (PDF)"
              className="border-border/60 text-muted hover:border-accent hover:text-accent hidden items-center gap-1.5 rounded-sm border px-2.5 py-1.5 transition-all sm:flex"
            >
              <ReadCvLogoIcon className="size-3.5" weight="duotone" />
              <span>Resume</span>
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 py-6 md:py-10">
        {children}
      </main>
    </div>
  );
}
