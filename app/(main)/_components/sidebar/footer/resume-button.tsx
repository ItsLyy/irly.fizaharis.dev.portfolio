/**
 * Node Modules
 */
import { ReadCvLogoIcon } from "@phosphor-icons/react/dist/ssr";

const ResumeButton = () => {
  return (
    <a
      href="/documents/resume.pdf"
      target="_blank"
      rel="noreferrer"
      aria-label="Open resume (PDF)"
      className="bg-app-100 text-app-500 flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm px-2 py-2 font-medium md:pr-3"
    >
      <ReadCvLogoIcon className="size-4" weight="duotone" />
      <span className="hidden md:inline">Resume</span>
    </a>
  );
};

export default ResumeButton;
