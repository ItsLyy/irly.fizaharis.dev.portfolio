"use client";

/**
 * Node Modules
 */
import { useState, useTransition, useEffect, useRef, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlassIcon,
  XCircleIcon,
  FunnelSimpleIcon,
  ArrowClockwiseIcon,
  SparkleIcon,
} from "@phosphor-icons/react";

/**
 * Custom Modules
 */
import CardProject from "./card-project";

/**
 * Types
 */
import type { IProject } from "@/app/_types";

type ICardProjectProps = Pick<
  IProject,
  "name" | "slug" | "stacks" | "imagePath"
>;

interface ProjectsExplorerProps {
  initialProjects: ICardProjectProps[];
  allProjects: ICardProjectProps[];
  availableStacks: string[];
  initialQuery?: string;
  initialStack?: string;
}

export default function ProjectsExplorer({
  allProjects,
  availableStacks,
  initialQuery = "",
  initialStack = "ALL",
}: ProjectsExplorerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const urlQuery = searchParams.get("q") || "";
  const urlStack = searchParams.get("stack") || "ALL";

  const [query, setQuery] = useState(initialQuery);
  const [activeStack, setActiveStack] = useState(initialStack);
  const [prevParams, setPrevParams] = useState({
    q: urlQuery,
    stack: urlStack,
  });
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync state if URL params change externally (e.g. browser back/forward)
  if (prevParams.q !== urlQuery || prevParams.stack !== urlStack) {
    setPrevParams({ q: urlQuery, stack: urlStack });
    setQuery(urlQuery);
    setActiveStack(urlStack);
  }

  // Keyboard shortcut: "/" to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Update URL params with debounce
  const updateUrl = (newQuery: string, newStack: string) => {
    startTransition(() => {
      const params = new URLSearchParams();
      const trimmed = newQuery.trim();
      if (trimmed) params.set("q", trimmed);
      if (newStack && newStack.toUpperCase() !== "ALL") {
        params.set("stack", newStack);
      }
      const queryString = params.toString();
      router.replace(queryString ? `/projects?${queryString}` : "/projects", {
        scroll: false,
      });
    });
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    updateUrl(val, activeStack);
  };

  const handleStackSelect = (stack: string) => {
    setActiveStack(stack);
    updateUrl(query, stack);
  };

  const handleClearAll = () => {
    setQuery("");
    setActiveStack("ALL");
    updateUrl("", "ALL");
    searchInputRef.current?.focus();
  };

  // Filter projects in-memory with real-time responsiveness
  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();
    const normalizedStack = activeStack.toLowerCase().trim();

    return allProjects.filter((project) => {
      const matchesStack =
        normalizedStack === "all" ||
        project.stacks.some((s) => s.toLowerCase() === normalizedStack);

      if (!matchesStack) return false;

      if (!normalizedQuery) return true;

      const nameMatch = project.name.toLowerCase().includes(normalizedQuery);
      const stackMatch = project.stacks.some((s) =>
        s.toLowerCase().includes(normalizedQuery),
      );

      return nameMatch || stackMatch;
    });
  }, [allProjects, query, activeStack]);

  // Compute counts per stack
  const stackCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: allProjects.length };
    allProjects.forEach((p) => {
      p.stacks.forEach((s) => {
        counts[s] = (counts[s] || 0) + 1;
      });
    });
    return counts;
  }, [allProjects]);

  const isFiltered = query.trim() !== "" || activeStack.toUpperCase() !== "ALL";

  return (
    <div className="space-y-6">
      {/* Search Bar & Controls */}
      <div className="space-y-4">
        <div className="relative">
          <div className="border-border bg-surface/70 focus-within:border-accent focus-within:ring-accent/30 flex items-center rounded-sm border px-3.5 py-2 transition-all duration-200 focus-within:ring-1">
            <MagnifyingGlassIcon
              weight="duotone"
              className="text-muted size-4.5 shrink-0"
            />
            <input
              ref={searchInputRef}
              type="text"
              name="q"
              id="search-projects"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              aria-label="Search projects by name or technology stack"
              autoComplete="off"
              className="text-foreground placeholder:text-dim w-full bg-transparent px-3 py-0.5 text-sm focus:outline-none"
              placeholder="Search projects by title, stack, or keyword..."
            />

            <div className="flex items-center gap-1.5">
              {query && (
                <button
                  type="button"
                  onClick={() => handleQueryChange("")}
                  aria-label="Clear search"
                  className="text-muted hover:text-accent p-0.5 transition-colors"
                >
                  <XCircleIcon className="size-4.5" weight="fill" />
                </button>
              )}
              <kbd className="border-border/80 bg-sunken text-faint hidden items-center rounded-xs border px-1.5 py-0.5 font-mono text-[10px] select-none sm:inline-flex">
                /
              </kbd>
            </div>
          </div>
        </div>

        {/* Tech Stack Filter Pills */}
        <div className="space-y-2">
          <div className="text-muted flex items-center gap-2 font-mono text-[11px]">
            <FunnelSimpleIcon
              weight="duotone"
              className="text-accent size-3.5"
            />
            <span>FILTER BY STACK:</span>
          </div>

          <div
            className="flex flex-wrap items-center gap-1.5"
            role="tablist"
            aria-label="Filter projects by technology stack"
          >
            {["ALL", ...availableStacks].map((stack) => {
              const isSelected =
                activeStack.toUpperCase() === stack.toUpperCase();
              const count = stackCounts[stack] ?? 0;

              return (
                <button
                  key={stack}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleStackSelect(stack)}
                  className={`relative cursor-pointer rounded-xs px-2.5 py-1 font-mono text-xs transition-all duration-200 ${
                    isSelected
                      ? "text-ink font-semibold"
                      : "border-border/70 bg-surface/60 text-muted hover:border-border-strong hover:bg-surface hover:text-foreground border"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeFilterBubble"
                      className="bg-accent absolute inset-0 rounded-xs"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {stack === "ALL" && (
                      <SparkleIcon className="size-3 shrink-0" weight="fill" />
                    )}
                    <span>{stack}</span>
                    <span
                      className={`text-[10px] tabular-nums ${
                        isSelected ? "text-ink/80" : "text-faint"
                      }`}
                    >
                      ({count})
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Status Bar */}
        <div className="border-border/60 text-muted flex flex-wrap items-center justify-between gap-2 border-t pt-2 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span>
              {isFiltered ? (
                <>
                  MATCHING:{" "}
                  <strong className="text-accent font-medium">
                    {filteredProjects.length}
                  </strong>{" "}
                  OF {allProjects.length}
                </>
              ) : (
                `ALL ${allProjects.length} ${allProjects.length === 1 ? "BUILD" : "BUILDS"}`
              )}
            </span>
            {activeStack.toUpperCase() !== "ALL" && (
              <span className="text-faint">
                [STACK: {activeStack.toUpperCase()}]
              </span>
            )}
          </div>

          {isFiltered && (
            <button
              type="button"
              onClick={handleClearAll}
              className="text-accent hover:text-foreground flex cursor-pointer items-center gap-1 text-[11px] transition-colors"
            >
              <ArrowClockwiseIcon className="size-3" />
              <span>[RESET FILTERS]</span>
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid with Framer Motion Layout Animations */}
      {filteredProjects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="border-border bg-surface/50 space-y-4 rounded-sm border p-10 text-center"
        >
          <div className="border-border bg-sunken text-muted mx-auto flex size-12 items-center justify-center rounded-full border">
            <MagnifyingGlassIcon className="size-6" weight="duotone" />
          </div>
          <div className="space-y-1">
            <h3 className="text-foreground text-base font-medium">
              No projects found
            </h3>
            <p className="text-muted mx-auto max-w-sm text-sm">
              No builds match your current search query or stack filter. Try
              refining your terms.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClearAll}
            className="border-accent/40 bg-accent/15 text-accent hover:bg-accent/25 inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm border px-4 py-2 font-mono text-xs font-medium transition-all"
          >
            <ArrowClockwiseIcon className="size-3.5" />
            <span>CLEAR ALL FILTERS</span>
          </button>
        </motion.div>
      ) : (
        <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 8 }}
                transition={{
                  duration: 0.28,
                  ease: "easeOut",
                }}
                className="h-full"
              >
                <CardProject {...project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
