/**
 * Node Modules
 */
import { MoonIcon } from "@phosphor-icons/react/dist/ssr";
import React from "react";

const Logo = ({ className = "size-11" }: { className?: string }) => {
  return (
    <div
      className={`border-accent/30 bg-accent/15 text-accent relative inline-flex shrink-0 items-center justify-center rounded-xl border p-2.5 ${className}`}
    >
      <span className="border-accent absolute -top-1 -left-1 size-2 border-t border-l" />
      <span className="border-accent absolute -top-1 -right-1 size-2 border-t border-r" />
      <span className="border-accent absolute -bottom-1 -left-1 size-2 border-b border-l" />
      <span className="border-accent absolute -right-1 -bottom-1 size-2 border-r border-b" />
      <MoonIcon className="size-full" weight="duotone" />
    </div>
  );
};

export default Logo;
