"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  XIcon,
  PaperPlaneRightIcon,
  ArrowCounterClockwiseIcon,
  SparkleIcon,
  RobotIcon,
} from "@phosphor-icons/react";
import ChatMessageItem, { type ChatMessage } from "./chat-message-item";

const DEFAULT_WELCOME: ChatMessage = {
  id: "welcome-msg",
  role: "assistant",
  content:
    "Hi there! 👋 I'm **Irly's AI Assistant**.\n\nI can tell you about Irly's **full-stack engineering skills**, **featured projects**, **business offerings**, or how he can build value for your team. What would you like to explore?",
  source: "knowledge-base",
  timestamp: new Date(),
};

const SUGGESTED_PROMPTS = [
  "Tell me about Irly",
  "Why hire Irly for full-stack?",
  "What projects has Irly built?",
  "What services does Irly offer?",
  "How can I contact Irly?",
];

export default function ChatboxWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([DEFAULT_WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages, scrollToBottom]);

  // Global keyboard shortcut to open/close (Cmd+K / Ctrl+K / Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSend = async (textToSend?: string) => {
    const messageContent = (textToSend ?? input).trim();
    if (!messageContent || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: messageContent,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Build conversation history for context
      const history = newMessages
        .filter((m) => m.id !== "welcome-msg")
        .slice(-6)
        .map((m) => ({
          role: m.role === "assistant" ? ("model" as const) : ("user" as const),
          text: m.content,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageContent,
          history,
        }),
      });

      if (!res.ok) {
        throw new Error(`Chat API error: ${res.status}`);
      }

      const data = await res.json();

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: data.reply || "I'm ready to answer any questions about Irly!",
        source: data.mode === "gemini" ? "gemini" : "knowledge-base",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Failed to send message:", err);
      const fallbackMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content:
          "Irly Fizaharis is a Full-Stack Developer based in Bandung, Indonesia specializing in Next.js, TypeScript, PostgreSQL, and scalable digital products. Feel free to contact him directly at [irly.fizaharis.dev@gmail.com](mailto:irly.fizaharis.dev@gmail.com)!",
        source: "knowledge-base",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([DEFAULT_WELCOME]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed right-4 bottom-5 z-40 sm:right-6 sm:bottom-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close AI Chatbox" : "Open AI Chatbox"}
          className="group border-accent/40 bg-surface/90 text-foreground hover:border-accent hover:bg-raised relative flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2.5 font-mono text-xs shadow-xl backdrop-blur-md transition-all"
        >
          {/* Pulsing indicator */}
          <span className="relative flex size-2">
            <span className="bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
            <span className="bg-accent relative inline-flex size-2 rounded-full" />
          </span>

          <SparkleIcon
            weight="fill"
            className="text-accent size-4 transition-transform group-hover:rotate-12"
          />
          <span className="text-foreground font-medium">Ask AI</span>

          <span className="border-border/70 bg-sunken text-faint hidden rounded-xs border px-1.5 py-0.5 text-[10px] sm:inline">
            ⌘K
          </span>
        </motion.button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            role="dialog"
            aria-label="Irly AI Assistant Chatbox"
            className="border-border bg-surface fixed right-3 bottom-18 z-50 flex h-[560px] max-h-[82vh] w-[94vw] max-w-[420px] flex-col overflow-hidden rounded-md border shadow-2xl backdrop-blur-xl sm:right-6"
          >
            {/* Structural design corner brackets */}
            <span className="border-accent pointer-events-none absolute -top-1 -left-1 size-3 border-t-2 border-l-2" />
            <span className="border-accent pointer-events-none absolute -top-1 -right-1 size-3 border-t-2 border-r-2" />
            <span className="border-accent pointer-events-none absolute -bottom-1 -left-1 size-3 border-b-2 border-l-2" />
            <span className="border-accent pointer-events-none absolute -right-1 -bottom-1 size-3 border-r-2 border-b-2" />

            {/* Chat Header */}
            <div className="border-border/80 bg-background/90 flex items-center justify-between border-b px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="border-accent/40 bg-accent/15 text-accent flex size-7 items-center justify-center rounded-sm border">
                  <RobotIcon className="size-4" weight="duotone" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-foreground text-xs font-semibold">
                      Irly AI Assistant
                    </span>
                    <span className="bg-accent/20 py-0.2 text-accent rounded-xs px-1 font-mono text-[9px] font-semibold uppercase">
                      Full-Stack
                    </span>
                  </div>
                  <p className="text-faint font-mono text-[10px]">
                    Centralized Portfolio Memory
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClear}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="text-muted hover:bg-surface hover:text-foreground cursor-pointer rounded-sm p-1.5 transition-colors"
                >
                  <ArrowCounterClockwiseIcon className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  aria-label="Close chat"
                  className="text-muted hover:bg-surface hover:text-foreground cursor-pointer rounded-sm p-1.5 transition-colors"
                >
                  <XIcon className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 space-y-3.5 overflow-y-auto p-4">
              {messages.map((msg) => (
                <ChatMessageItem key={msg.id} message={msg} />
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-muted flex items-center gap-2"
                >
                  <div className="border-border bg-sunken text-accent flex size-7 shrink-0 items-center justify-center rounded-sm border">
                    <SparkleIcon
                      className="text-accent size-3.5 animate-spin"
                      weight="fill"
                    />
                  </div>
                  <div className="border-border/80 bg-surface flex items-center gap-1 rounded-md border px-3 py-2">
                    <span className="bg-accent size-1.5 animate-bounce rounded-full [animation-delay:-0.3s]" />
                    <span className="bg-accent size-1.5 animate-bounce rounded-full [animation-delay:-0.15s]" />
                    <span className="bg-accent size-1.5 animate-bounce rounded-full" />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            {messages.length <= 2 && !isLoading && (
              <div className="border-border/50 bg-sunken/40 border-t px-3 py-2">
                <p className="text-faint mb-1.5 font-mono text-[10px]">
                  SUGGESTED QUESTIONS:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handleSend(prompt)}
                      className="border-border/70 bg-surface/80 text-muted hover:border-accent hover:text-foreground cursor-pointer rounded-xs border px-2 py-1 text-left font-mono text-[11px] transition-all active:scale-95"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Box Area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="border-border/80 bg-background/90 border-t p-3"
            >
              <div className="relative flex items-center">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  rows={1}
                  placeholder="Ask about skills, projects, business value..."
                  className="border-border bg-surface text-foreground placeholder:text-dim focus:border-accent w-full resize-none rounded-sm border px-3 py-2 pr-10 text-xs focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label="Send Message"
                  className="bg-accent text-ink hover:bg-accent/90 absolute right-1.5 flex size-7 cursor-pointer items-center justify-center rounded-xs transition-all disabled:pointer-events-none disabled:opacity-40"
                >
                  <PaperPlaneRightIcon className="size-3.5" weight="fill" />
                </button>
              </div>
              <div className="text-faint mt-2 flex items-center justify-between font-mono text-[10px]">
                <span>[ESC] TO CLOSE</span>
                <span className="text-accent/80">CENTRALIZED MEMORY</span>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
