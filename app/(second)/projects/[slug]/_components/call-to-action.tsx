/**
 * Node Modules
 */
import { GithubLogoIcon, GlobeIcon } from "@phosphor-icons/react/dist/ssr";

/**
 * Custom Modules
 */
import { buttonStyles } from "@/app/_components/ui/button";

const CallToAction = ({
  linkGithub,
  linkWebsite,
}: {
  linkGithub?: string | null;
  linkWebsite?: string | null;
}) => {
  if (!linkGithub && !linkWebsite) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {linkWebsite && (
        <a
          href={linkWebsite}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Open live demo website"
          className={`${buttonStyles.primary} px-3 py-1.5 font-mono text-xs`}
        >
          <GlobeIcon className="size-4" weight="duotone" />
          <span>Live Demo</span>
        </a>
      )}
      {linkGithub && (
        <a
          href={linkGithub}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Open GitHub repository"
          className={`${buttonStyles.outline} px-3 py-1.5 font-mono text-xs`}
        >
          <GithubLogoIcon className="size-4" weight="duotone" />
          <span>Source Code</span>
        </a>
      )}
    </div>
  );
};

export default CallToAction;
