/**
 * Node Modules
 */
import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

/**
 * Types
 */
import type { Icon } from "@phosphor-icons/react";

const socials = [
  {
    name: "email",
    link: "mailto:irly.fizaharis.dev@gmail.com",
    icon: EnvelopeSimpleIcon,
  },
  {
    name: "instagram",
    link: "https://www.instagram.com/irlydev/",
    icon: InstagramLogoIcon,
  },
  {
    name: "linkedin",
    link: "https://www.linkedin.com/in/irly-fizaharis-aa8896298/",
    icon: LinkedinLogoIcon,
  },
  {
    name: "github",
    link: "https://www.instagram.com/https://github.com/ItsLyy",
    icon: GithubLogoIcon,
  },
];

const MediaSocials = ({ className = "" }: { className?: string }) => (
  <div className={`grid grid-cols-4 gap-2 ${className}`}>
    {socials.map((social) => (
      <SocialBadge key={social.name} link={social.link} icon={social.icon} />
    ))}
  </div>
);

const SocialBadge = ({ icon, link }: { icon: Icon; link: string }) => {
  const Icon = icon;
  return (
    <a
      href={link}
      target="_blank"
      className="border-app-100 from-app-100/10 to-app-100/20 text-app-100 flex size-11 items-center justify-center rounded-xs border bg-radial"
    >
      <Icon weight="duotone" className="size-6" />
    </a>
  );
};

export default MediaSocials;
