/**
 * Custom Modules
 */
import MediaSocials from "@/app/(main)/_components/media-socials";
import StatusWork from "./status-work";
import ResumeButton from "./resume-button";

const Footer = () => {
  return (
    <div className="mr-2 flex shrink-0 flex-col gap-2 md:mr-0">
      <StatusWork isAvailable />
      <MediaSocials className="grid-cols-1! md:grid-cols-4!" />
      <ResumeButton />
    </div>
  );
};

export default Footer;
