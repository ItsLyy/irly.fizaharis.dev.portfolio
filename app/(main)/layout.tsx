/**
 * Custom Modules
 */
import Sidebar from "./_components/sidebar";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto grid min-h-svh w-full max-w-[1440px] grid-cols-[auto_1fr] md:grid-cols-[minmax(220px,1fr)_minmax(auto,800px)_1fr]">
      <Sidebar />
      <main className="mb-4 min-h-svh w-full max-w-[800px] p-3">
        {children}
      </main>
    </div>
  );
}
