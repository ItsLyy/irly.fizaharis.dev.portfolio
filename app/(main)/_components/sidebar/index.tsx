/**
 * Custom Modules
 */
import Footer from "./footer";
import Profile from "./profile";
import Navigation from "./navigation";

const Sidebar = () => {
  return (
    <aside
      aria-label="Desktop Sidebar"
      className="sticky top-0 hidden h-dvh w-48 shrink-0 flex-col items-end justify-between py-6 pr-0 pb-8 transition-all duration-300 md:flex lg:w-56"
    >
      <Profile />
      <Navigation />
      <Footer />
    </aside>
  );
};

export default Sidebar;
