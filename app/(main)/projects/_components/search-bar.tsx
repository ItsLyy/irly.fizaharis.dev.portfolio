/**
 * Node Modules
 */

import {
  MagnifyingGlassIcon,
  XCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const Searchbar = ({ defaultValue = "" }: { defaultValue?: string }) => {
  return (
    <form
      action="/projects"
      method="GET"
      className="border-border bg-surface/70 focus-within:border-accent focus-within:ring-accent/30 flex items-center rounded-sm border px-3 py-1.5 transition-colors focus-within:ring-1"
    >
      <MagnifyingGlassIcon
        weight="duotone"
        className="text-muted size-4 shrink-0"
      />
      <input
        type="text"
        name="q"
        id="search"
        defaultValue={defaultValue}
        aria-label="Search projects"
        autoComplete="off"
        className="text-foreground placeholder:text-dim w-full bg-transparent px-2.5 py-1 text-sm focus:outline-none"
        placeholder="Search projects by name..."
      />
      {defaultValue && (
        <Link
          href="/projects"
          aria-label="Clear search"
          className="text-muted hover:text-accent transition-colors"
        >
          <XCircleIcon className="size-4" weight="fill" />
        </Link>
      )}
    </form>
  );
};

export default Searchbar;
