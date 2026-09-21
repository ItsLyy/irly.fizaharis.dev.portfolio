/**
 * Node Modules
 */
import { ReadCvLogoIcon } from "@phosphor-icons/react/dist/ssr";

/**
 * Custom Modules
 */
import { buttonStyles } from "@/app/_components/ui/button";

const ResumeButton = () => {
  return (
    <a
      href="/documents/resume.pdf"
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Open resume (PDF)"
      className={`${buttonStyles.primary} w-full justify-center font-mono text-xs tracking-wider uppercase`}
    >
      <ReadCvLogoIcon className="size-4" weight="duotone" />
      <span>Resume</span>
    </a>
  );
};

export default ResumeButton;
