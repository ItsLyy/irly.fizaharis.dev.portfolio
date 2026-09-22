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
      <MediaSocials
        className="grid-cols-5! gap-1.5! lg:gap-2!"
        badgeClassName="size-8! md:size-8! lg:size-9!"
        iconClassName="size-4! md:size-4! lg:size-4.5!"
      />
      <ResumeButton />
    </div>
  );
};

export default Footer;
