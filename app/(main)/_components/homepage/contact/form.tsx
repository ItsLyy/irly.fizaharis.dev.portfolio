"use client";

/**
 * Node Modules
 */
import {
  CheckCircleIcon,
  PaperPlaneTiltIcon,
} from "@phosphor-icons/react/dist/ssr";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import emailjs from "@emailjs/browser";

/**
 * Custom Modules
 */
import InputField from "@/app/_components/ui/input-field";
import TextArea from "@/app/_components/ui/text-area";
import { buttonStyles } from "@/app/_components/ui/button";

const SendSchema = z.object({
  name: z
    .string()
    .min(2, "Name needs at least 2 characters")
    .max(50, "Name needs to be less than 50 characters"),
  email: z.string().email("Please provide a valid email address"),
  message: z
    .string()
    .min(5, "Message must be at least 5 characters")
    .max(1000, "Message needs to be less than 1000 characters"),
});

const Form = () => {
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    try {
      const formElement = e.currentTarget;
      const formData = new FormData(formElement);

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

      formElement.reset();
      setSubmitted(true);
      toast.success("Message sent!", {
        description: "Thank you! I'll get back to you soon.",
      });
    } catch {
      toast.error("Something went wrong!", {
        description: "Please try reaching out directly via email.",
      });
    } finally {
      setPending(false);
    }
  };

  if (submitted) {
    return (
      <div className="border-border bg-surface/60 space-y-3 rounded-sm border p-6 text-center">
        <div className="bg-accent/15 text-accent inline-flex size-12 items-center justify-center rounded-full">
          <CheckCircleIcon className="size-6" weight="duotone" />
        </div>
        <h4 className="text-foreground text-lg font-medium">
          Message received!
        </h4>
        <p className="text-muted mx-auto max-w-md text-sm">
          Thank you for reaching out. I&apos;ve received your message and will
          respond as soon as possible.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className={buttonStyles.outline}
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="w-full space-y-3" onSubmit={onSubmitHandler}>
      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <InputField
          id="name"
          name="name"
          label="Your Name"
          placeholder="e.g. John Doe"
          required
        />
        <InputField
          id="email"
          name="email"
          type="email"
          label="Your Email"
          placeholder="e.g. john@example.com"
          required
        />
      </div>
      <TextArea
        label="Project Details / Message"
        name="message"
        id="message"
        placeholder="Tell me about what you want to build, timeline, or any questions..."
        required
      />
      <div className="flex w-full justify-end pt-1">
        <button
          type="submit"
          disabled={pending}
          className={`${buttonStyles.primary} min-w-28`}
        >
          {pending ? (
            <>
              <svg
                role="status"
                aria-live="polite"
                aria-hidden="true"
                className="text-ink inline size-4 animate-spin"
                viewBox="0 0 100 101"
                fill="none"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeOpacity="0.25"
                />
                <path
                  d="M50 5A45 45 0 0 1 95 50"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
              </svg>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <PaperPlaneTiltIcon className="size-4" weight="bold" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default Form;
