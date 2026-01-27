/**
 * Node Modules
 */
import { ReadCvLogoIcon } from "@phosphor-icons/react/dist/ssr";

const ResumeButton = () => {
  return (
    <button className="bg-app-100 text-app-500 flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm px-2 py-2 font-medium md:pr-3">
      <ReadCvLogoIcon className="size-4" weight="duotone" />
      <span className="hidden md:inline">Resume</span>
    </button>
  );
};

export default ResumeButton;
