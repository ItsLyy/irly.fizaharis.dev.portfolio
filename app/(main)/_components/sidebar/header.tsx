/**
 * Node Modules
 */
import Image from "next/image";

const Header = () => {
  return (
    <div className="group relative">
      <div className="border-app-400 shadow-app-400/25 absolute top-0 right-0 size-8 rounded-2xl border-t border-r shadow-[0_0_10px_0.5px] md:size-20" />
      <div className="border-app-400 shadow-app-400/25 absolute bottom-0 left-0 size-8 rounded-2xl border-b border-l shadow-[0_0_10px_0.5px] md:size-20" />
      <div className="border-app-300 relative size-17 shrink-0 overflow-hidden rounded-tl-md rounded-tr-2xl rounded-br-md rounded-bl-2xl border md:size-40">
        <Image
          src="/images/profile-headshot.jpeg"
          alt="Profile Headshot"
          fill
          className="bg-app-500 transition-discrete duration-300 ease-in-out group-hover:scale-110"
        />
      </div>
    </div>
  );
};

export default Header;
