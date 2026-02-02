/**
 * Node Modules
 */
import React from "react";

export default function SecondLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="mx-auto w-full max-w-[800px] p-2">{children}</main>;
}
