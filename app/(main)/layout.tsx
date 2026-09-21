/**
 * Custom Modules
 */
import MobileHeader from "./_components/mobile-header";
import Sidebar from "./_components/sidebar";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-dvh w-full">
      <MobileHeader />
      <div className="mx-auto flex w-full max-w-5xl justify-center gap-8 px-4 sm:px-6 md:px-8">
        <Sidebar />
        <main className="w-full max-w-2xl min-w-0 py-6 pb-24 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
