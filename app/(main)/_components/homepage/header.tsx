/**
 * Node Modules
 */
import {
  FlagBannerFoldIcon,
  MapPinSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";

/**
 * Custom Modules
 */
import Logo from "@/app/_components/ui/logo";

const Header = ({
  role = "Front-end Web Developer",
  location = "Indonesia",
  experience = 1,
}: {
  role?: string;
  location?: string;
  experience?: number;
}) => {
  return (
    <header className="space-y-4">
      <div className="space-y-1">
        <div className="flex flex-wrap gap-4 font-medium *:text-5xl">
          <h1 className="text-nowrap">Hi👋, I'm</h1>
          <div className="flex items-center gap-2">
            <Logo />
            <h1 className="text-app-400 text-nowrap">Irly Fizaharis</h1>
          </div>
        </div>
        <h2 className="text-app-400/80 text-2xl font-medium">{role}</h2>
      </div>
      <div className="flex flex-wrap items-center gap-x-4">
        <div className="text-app-250 flex w-fit items-center gap-2">
          <MapPinSimpleIcon weight="duotone" />
          <span className="text-sm text-nowrap">{location}</span>
        </div>
        <div className="bg-app-200 rounded-full p-0.5" />
        <div className="text-app-250 flex items-center gap-2">
          <FlagBannerFoldIcon weight="duotone" />
          <span className="text-sm text-nowrap">
            {experience} Years Experience
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
