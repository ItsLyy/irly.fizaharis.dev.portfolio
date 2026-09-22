"use client";

/**
 * Node Modules
 */
import { Toaster } from "sonner";

const ToasterProvider = ({
  fontClassName = "",
}: {
  fontClassName?: string;
}) => {
  return (
    <Toaster
      richColors
      position="bottom-center"
      theme="dark"
      toastOptions={{
        className: fontClassName,
      }}
    />
  );
};

export default ToasterProvider;
