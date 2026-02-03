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
    pathname === link ||
    pathname.startsWith(link + "/") ||
    (pathname === "/" && link === "/");

  const Icon = icon;

  return (
    <div
      className={`group relative size-11 origin-right transition-discrete duration-300 ease-in-out ${onPage ? "scale-105" : "scale-100"}`}
    >
      <span
        className={`absolute top-0 right-full bottom-0 mx-2 my-auto h-fit text-sm font-medium uppercase opacity-0 transition-all duration-300 ease-in-out group-hover:mx-4 group-hover:opacity-100 ${onPage ? "text-app-400" : "text-app-300"}`}
      >
        {name}
      </span>
      <Link
        href={link}
        aria-current={onPage ? "page" : undefined}
        className={`flex size-full items-center justify-center rounded-md transition-colors duration-300 ease-in-out ${onPage ? "bg-app-400/25 text-app-400" : "text-app-300"}`}
      >
        <Icon className="size-6" />
      </Link>
    </div>
  );
};

export default NavItem;
