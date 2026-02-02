"use client";

/**
 * Node Modules
 */
import { CaretLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";

const GoBackButton = () => {
  const router = useRouter();
  const onClickHandler = () => {
    router.back();
  };
  return (
    <button
      className="group flex cursor-pointer items-center gap-4"
      onClick={onClickHandler}
    >
      <div className="bg-app-300/20 rounded-full p-3">
        <CaretLeftIcon className="text-app-250 group-hover:text-app-200 size-5 transition-all duration-300 ease-in-out group-hover:scale-110" />
      </div>
      <span className="text-app-300 group-hover:text-app-200 transition-colors duration-300 ease-in-out">
        Go Back
      </span>
    </button>
  );
};

export default GoBackButton;
