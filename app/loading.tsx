/**
 * Custom Modules
 */
import Logo from "./_components/ui/logo";

export default function Loading() {
  return (
    <section className="flex h-svh w-full items-center justify-center gap-4">
      <Logo className="scale-120 animate-pulse" />
    </section>
  );
}
