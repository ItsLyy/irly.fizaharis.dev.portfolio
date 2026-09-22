"use client";

import { motion } from "framer-motion";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SparkleIcon, UserIcon } from "@phosphor-icons/react";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  source?: "gemini" | "fallback" | "knowledge-base";
  timestamp: Date;
}

export default function ChatMessageItem({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar icon */}
      <div
        className={`flex size-7 shrink-0 items-center justify-center rounded-sm border ${
          isUser
            ? "border-accent/40 bg-accent/20 text-accent"
            : "border-border bg-sunken text-accent"
        }`}
      >
        {isUser ? (
          <UserIcon className="size-3.5" weight="bold" />
        ) : (
          <SparkleIcon className="size-3.5" weight="fill" />
        )}
      </div>

      {/* Message content */}
      <div
        className={`flex max-w-[84%] flex-col gap-1 ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`rounded-md px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
            isUser
              ? "bg-accent font-medium text-ink shadow-sm"
              : "border-border/80 bg-surface/90 text-foreground border shadow-sm backdrop-blur-xs"
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="markdown-chat space-y-2 [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:text-xs sm:[&_h3]:text-sm [&_h4]:font-medium [&_h4]:text-accent [&_h4]:text-xs [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:my-0.5 [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:opacity-80 [&_hr]:border-border/60 [&_hr]:my-2 [&_strong]:text-foreground">
              <Markdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </Markdown>
            </div>
          )}
        </div>

        {/* Source indicator */}
        {!isUser && (
          <div className="flex items-center gap-1.5 px-1 font-mono text-[10px] text-faint">
            <span>Irly AI</span>
            <span>•</span>
            <span className="uppercase">
              {message.source === "gemini" ? "Gemini 2.5" : "Centralized Memory"}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
