/**
 * Node Modules
 */
import { GithubLogoIcon, GlobeIcon } from "@phosphor-icons/react/dist/ssr";

const CallToAction = ({
  linkGithub,
  linkWebsite,
}: {
  linkGithub?: string;
  linkWebsite?: string;
}) => {
  return (
    <div className="flex gap-2">
      {linkGithub && (
        <a
          href={linkGithub}
          target="_blank"
          rel="noreferrer"
          aria-label="Open GitHub repository"
          className="border-app-300 from-app-200/5 to-app-200/20 text-app-250 hover:text-app-200 flex size-11 items-center justify-center rounded-md border bg-radial"
        >
          <GithubLogoIcon className="size-5 transition-colors duration-300 ease-in-out" />
        </a>
      )}
      {linkWebsite && (
        <a
          href={linkWebsite}
          target="_blank"
          rel="noreferrer"
          aria-label="Open project website"
          className="border-app-300 from-app-200/5 to-app-200/20 text-app-250 hover:text-app-200 flex size-11 items-center justify-center rounded-md border bg-radial"
        >
          <GlobeIcon className="size-5 transition-colors duration-300 ease-in-out" />
        </a>
      )}
    </div>
  );
};

export default CallToAction;
