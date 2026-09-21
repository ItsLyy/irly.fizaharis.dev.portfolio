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
      rel="noreferrer noopener"
      aria-label={name}
      className="border-border bg-surface/70 text-muted hover:border-accent hover:text-accent group flex size-10 items-center justify-center rounded-sm border transition-all duration-200 hover:-translate-y-0.5"
    >
      <Icon
        weight="duotone"
        className="size-5 transition-transform duration-200 group-hover:scale-110"
      />
    </a>
  );
};

export default MediaSocials;
