"use client";

/**
 * Node Modules
 */
import { Icon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface INavItemProps {
  name: string;
  link: string;
  icon: Icon;
}

const NavItem = ({ name, link, icon }: INavItemProps) => {
  const pathname = usePathname();
  const onPage: boolean =
    pathname === link || (link !== "/" && pathname.startsWith(link + "/"));

  const Icon = icon;

  return (
    <div className="group relative size-10 origin-right">
      <span
        className={`border-border bg-surface pointer-events-none absolute top-1/2 right-full mr-2 -translate-y-1/2 rounded-xs border px-2 py-0.5 font-mono text-xs tracking-wider whitespace-nowrap uppercase opacity-0 shadow-sm transition-all duration-200 group-hover:mr-3.5 group-hover:opacity-100 ${
          onPage ? "border-accent/60 text-accent" : "text-muted"
        }`}
      >
        {name}
      </span>
      <Link
        href={link}
        aria-label={name}
        aria-current={onPage ? "page" : undefined}
        className={`flex size-full items-center justify-center rounded-sm border transition-all duration-200 ${
          onPage
            ? "border-accent/50 bg-accent/15 text-accent shadow-xs"
            : "border-border/60 bg-surface/50 text-muted hover:border-border-strong hover:bg-surface hover:text-foreground hover:-translate-y-0.5"
        }`}
      >
        <Icon className="size-5" weight={onPage ? "duotone" : "regular"} />
      </Link>
    </div>
  );
};

export default NavItem;
