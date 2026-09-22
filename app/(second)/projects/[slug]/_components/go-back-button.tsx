import Link from "next/link";
import { CaretLeftIcon } from "@phosphor-icons/react/dist/ssr";

const GoBackButton = () => {
  return (
    <Link
      href="/projects"
      aria-label="Back to all projects"
      className="group text-muted hover:text-accent inline-flex items-center gap-2 font-mono text-xs transition-colors"
    >
      <div className="border-border/70 bg-surface/70 group-hover:border-accent/60 group-hover:bg-accent/15 group-hover:text-accent flex size-7 items-center justify-center rounded-sm border transition-all duration-200">
        <CaretLeftIcon className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
      </div>
      <span>Back to projects</span>
    </Link>
  );
};

export default GoBackButton;
