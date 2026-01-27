import Footer from "./footer";
import Header from "./header";
import Navigation from "./navigation";

export const Sidebar = () => {
  return (
    <aside className="sticky top-0 flex h-dvh flex-col items-end px-2 pt-2 pb-6 transition-all duration-300 ease-in-out md:py-4">
      <Header />
      <Navigation />
      <Footer />
    </aside>
  );
};
