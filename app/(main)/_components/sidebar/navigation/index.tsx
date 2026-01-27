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
    <nav className="border-app-300 mr-3 flex h-full flex-col justify-center gap-2 border-r p-2 md:mr-4">
      <NavItem name="home" icon={HouseSimpleIcon} link="/" />
      <NavItem name="projects" icon={CodeBlockIcon} link="/projects" />
    </nav>
  );
};

export default Navigation;
