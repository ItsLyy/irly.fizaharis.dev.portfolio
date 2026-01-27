import Footer from "./footer";
import Header from "./header";
import Navigation from "./navigation";

const Sidebar = () => {
  return (
    <aside
      aria-label="Sidebar"
      className="sticky top-0 flex h-dvh flex-col items-end p-3 pb-6 transition-all duration-300 ease-in-out md:py-4"
    >
      <Header />
      <Navigation />
      <Footer />
    </aside>
  );
};

export default Sidebar;
