/**
 * Node Modules
 */
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex h-svh w-full items-center justify-center gap-4">
      <span className="text-2xl font-bold">404</span>
      <span className="text-faint">
        Page not found,{" "}
        <Link href="/" className="text-accent hover:underline">
          go back to home
        </Link>
      </span>
    </section>
  );
}
