/**
 * Data
 */
import { socials } from "@/app/_data/get-all-socials";

/**
 * Types
 */
import type { Icon } from "@phosphor-icons/react";

const MediaSocials = ({ className = "" }: { className?: string }) => (
  <div className={`grid grid-cols-4 gap-2 ${className}`}>
    {socials.map((social) => (
      <SocialBadge
        key={social.name}
        name={social.name}
        link={social.link}
        icon={social.icon}
      />
    ))}
  </div>
);

const SocialBadge = ({
  name,
  icon,
  link,
}: {
  name: string;
  icon: Icon;
  link: string;
}) => {
  const Icon = icon;
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      aria-label={name}
      className="border-app-100 group from-app-100/10 to-app-100/20 text-app-100 flex size-11 items-center justify-center rounded-xs border bg-radial"
    >
      <Icon
        weight="duotone"
        className="size-6 transition-discrete duration-300 ease-in-out group-hover:scale-110"
      />
    </a>
  );
};

export default MediaSocials;
