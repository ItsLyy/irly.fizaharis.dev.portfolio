"use client";

/**
 * Node Modules
 */
import { CodeBlockIcon, HouseSimpleIcon } from "@phosphor-icons/react/dist/ssr";

/**
 * Custom Modules
 */
import NavItem from "./nav-item";

const Navigation = () => {
  return (
    <nav
      aria-label="Main Navigation"
      className="border-border mr-3 flex h-full flex-col justify-center gap-3 border-r pr-3 md:mr-4 md:pr-4"
    >
      <NavItem name="home" icon={HouseSimpleIcon} link="/" />
      <NavItem name="projects" icon={CodeBlockIcon} link="/projects" />
    </nav>
  );
};

export default Navigation;
