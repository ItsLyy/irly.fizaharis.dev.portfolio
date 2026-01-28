"use client";

/**
 * Node Modules
 */
import { PaperPlaneTiltIcon } from "@phosphor-icons/react/dist/ssr";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import emailjs from "@emailjs/browser";

/**
 * Custom Modules
 */
import InputField from "@/app/_components/ui/input-field";
import TextArea from "@/app/_components/ui/text-area";

const SendSchema = z.object({
  name: z
    .string("Name must be character")
    .min(3, "Name need at least 3 characters")
    .max(30, "Name need less than 30 characters"),
  email: z.email("Email must be valid"),
  message: z
    .string("Message must be character")
    .min(1, "Message required")
    .max(300, "Message need less than 300 characters"),
});

const Form = () => {
  const [pending, setPending] = useState(false);
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    try {
      const formData = new FormData(e.currentTarget);

      const validatedData = SendSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      });

      if (!validatedData.success) {
        setPending(false);
        const firstError =
          validatedData.error.issues[0]?.message ?? "Invalid input";
        return toast.error("Failed!", { description: firstError });
      }

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_KEY || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_KEY || "",
        {
          from_name: validatedData.data.name,
          from_email: validatedData.data.email,
          message: validatedData.data.message,
        },
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
        },
      );

      return toast.success("Successful!", {
        description: "Message successfully sent",
      });
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="w-full space-y-2" onSubmit={onSubmitHandler}>
      <div className="flex w-full flex-col gap-2 md:flex-row md:gap-4">
        <InputField
          id="name"
          name="name"
          label="Name"
          placeholder="e.g. Irly Fizaharis"
        />
        <InputField
          id="email"
          name="email"
          label="Email"
          placeholder="e.g. irly.fizaharis.dev@gmail.com"
        />
      </div>
      <TextArea label="Message" name="message" id="message" />
      <div className="flex w-full justify-end">
        <button
          disabled={pending}
          className="bg-app-400 flex cursor-pointer items-center gap-2 rounded-md py-2.5 pr-5 pl-4 text-zinc-50 disabled:opacity-80"
          type="submit"
        >
          {pending ? (
            <>
              <div className="flex items-center">
                <svg
                  role="status"
                  aria-live="polite"
                  aria-hidden="true"
                  className="text-app-500 inline size-4 animate-spin fill-white"
                  viewBox="0 0 100 101"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium">Sending...</span>
            </>
          ) : (
            <>
              <PaperPlaneTiltIcon />
              <span className="text-sm font-medium">Send</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default Form;
