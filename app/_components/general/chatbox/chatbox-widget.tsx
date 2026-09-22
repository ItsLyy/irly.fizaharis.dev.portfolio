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
          className="group relative flex cursor-pointer items-center gap-2 rounded-full border border-accent/40 bg-surface/90 px-3.5 py-2.5 text-xs font-mono text-foreground shadow-xl backdrop-blur-md transition-all hover:border-accent hover:bg-raised"
        >
          {/* Pulsing indicator */}
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>

          <SparkleIcon weight="fill" className="size-4 text-accent transition-transform group-hover:rotate-12" />
          <span className="font-medium text-foreground">Ask AI</span>

          <span className="hidden rounded-xs border border-border/70 bg-sunken px-1.5 py-0.5 text-[10px] text-faint sm:inline">
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
            className="fixed right-3 bottom-18 z-50 flex h-[560px] max-h-[82vh] w-[94vw] max-w-[420px] flex-col overflow-hidden rounded-md border border-border bg-surface shadow-2xl backdrop-blur-xl sm:right-6"
          >
            {/* Structural design corner brackets */}
            <span className="pointer-events-none absolute -top-1 -left-1 size-3 border-t-2 border-l-2 border-accent" />
            <span className="pointer-events-none absolute -top-1 -right-1 size-3 border-t-2 border-r-2 border-accent" />
            <span className="pointer-events-none absolute -bottom-1 -left-1 size-3 border-b-2 border-l-2 border-accent" />
            <span className="pointer-events-none absolute -bottom-1 -right-1 size-3 border-b-2 border-r-2 border-accent" />

            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-border/80 bg-background/90 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-7 items-center justify-center rounded-sm border border-accent/40 bg-accent/15 text-accent">
                  <RobotIcon className="size-4" weight="duotone" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-foreground">Irly AI Assistant</span>
                    <span className="rounded-xs bg-accent/20 px-1 py-0.2 font-mono text-[9px] font-semibold text-accent uppercase">
                      Full-Stack
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-faint">Centralized Portfolio Memory</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClear}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="cursor-pointer rounded-sm p-1.5 text-muted transition-colors hover:bg-surface hover:text-foreground"
                >
                  <ArrowCounterClockwiseIcon className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  aria-label="Close chat"
                  className="cursor-pointer rounded-sm p-1.5 text-muted transition-colors hover:bg-surface hover:text-foreground"
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
                  className="flex items-center gap-2 text-muted"
                >
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-sm border border-border bg-sunken text-accent">
                    <SparkleIcon className="size-3.5 animate-spin text-accent" weight="fill" />
                  </div>
                  <div className="flex items-center gap-1 rounded-md border border-border/80 bg-surface px-3 py-2">
                    <span className="size-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.3s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.15s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-accent" />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            {messages.length <= 2 && !isLoading && (
              <div className="border-t border-border/50 bg-sunken/40 px-3 py-2">
                <p className="mb-1.5 font-mono text-[10px] text-faint">SUGGESTED QUESTIONS:</p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handleSend(prompt)}
                      className="cursor-pointer rounded-xs border border-border/70 bg-surface/80 px-2 py-1 text-left font-mono text-[11px] text-muted transition-all hover:border-accent hover:text-foreground active:scale-95"
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
              className="border-t border-border/80 bg-background/90 p-3"
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
                  className="w-full resize-none rounded-sm border border-border bg-surface px-3 py-2 pr-10 text-xs text-foreground placeholder:text-dim focus:border-accent focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label="Send Message"
                  className="absolute right-1.5 flex size-7 cursor-pointer items-center justify-center rounded-xs bg-accent text-ink transition-all hover:bg-accent/90 disabled:pointer-events-none disabled:opacity-40"
                >
                  <PaperPlaneRightIcon className="size-3.5" weight="fill" />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-faint">
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
