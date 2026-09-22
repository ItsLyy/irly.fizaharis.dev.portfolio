/**
 * Data
 */
import { socials } from "@/app/_data/get-all-socials";

/**
 * Types
 */
import type { Icon } from "@phosphor-icons/react";

const MediaSocials = ({
  className = "",
  badgeClassName = "",
  iconClassName = "",
}: {
  className?: string;
  badgeClassName?: string;
  iconClassName?: string;
}) => (
  <div className={`grid grid-cols-5 gap-2 ${className}`}>
    {socials.map((social) => (
      <SocialBadge
        key={social.name}
        name={social.name}
        link={social.link}
        icon={social.icon}
        className={badgeClassName}
        iconClassName={iconClassName}
      />
    ))}
  </div>
);

const SocialBadge = ({
  name,
  icon,
  link,
  className = "",
  iconClassName = "",
}: {
  name: string;
  icon: Icon;
  link: string;
  className?: string;
  iconClassName?: string;
}) => {
  const Icon = icon;
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={name}
      className={`border-border bg-surface/70 text-muted hover:border-accent hover:text-accent group flex size-10 items-center justify-center rounded-sm border transition-all duration-200 hover:-translate-y-0.5 ${className}`}
    >
      <Icon
        weight="duotone"
        className={`size-5 transition-transform duration-200 group-hover:scale-110 ${iconClassName}`}
      />
    </a>
  );
};

export default MediaSocials;
