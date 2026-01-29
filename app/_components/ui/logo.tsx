import { MoonIcon } from "@phosphor-icons/react/dist/ssr";
import React from "react";

const Logo = () => {
  return (
    <div className="text-app-400 bg-app-400/20 relative size-13 rounded-3xl p-3.5">
      <div className="border-app-400 shadow-app-400/20 absolute top-0 left-0 -m-1 size-5 scale-60 rounded-md border-t border-l shadow-[-3px_-3px_5px_0.2px]" />
      <div className="border-app-400 shadow-app-400/20 absolute right-0 bottom-0 -m-1 size-5 scale-60 rounded-md border-r border-b shadow-[3px_3px_5px_0.2px]" />
      <div className="border-app-400 shadow-app-400/20 absolute bottom-0 left-0 -m-1 size-5 scale-60 rounded-md border-b border-l shadow-[-3px_3px_5px_0.2px]" />
      <div className="border-app-400 shadow-app-400/20 absolute top-0 right-0 -m-1 size-5 scale-60 rounded-md border-t border-r shadow-[3px_-3px_5px_0.2px]" />
      <MoonIcon className="size-full" />
    </div>
  );
};

export default Logo;
