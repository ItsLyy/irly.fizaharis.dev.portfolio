"use client";

/**
 * Node Modules
 */
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SparkleIcon, ArrowRightIcon } from "@phosphor-icons/react";

/**
 * Welcoming greetings sequence
 */
const GREETINGS = [
  { text: "Hello", lang: "EN" },
  { text: "Bonjour", lang: "FR" },
  { text: "Hola", lang: "ES" },
  { text: "Selamat Datang", lang: "ID" },
  { text: "Welcome", lang: "GLOBAL" },
];

export default function WelcomeIntro() {
  const [isVisible, setIsVisible] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [isFinalPhase, setIsFinalPhase] = useState(false);

  const finish = useCallback(() => {
    setIsVisible(false);
    try {
      sessionStorage.setItem("welcome_intro_seen", "true");
    } catch {
      // Ignore storage errors in private/iframe modes
    }
  }, []);

  useEffect(() => {
    // Check if user already saw the intro this session or prefers reduced motion
    try {
      const hasSeen = sessionStorage.getItem("welcome_intro_seen");
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (hasSeen || prefersReducedMotion) {
        return;
      }
    } catch {
      // Ignore storage errors
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    // Sequence the greetings rapidly and smoothly
    // 0 -> 250ms, 250 -> 500ms, 500 -> 750ms, 750 -> 1000ms, 1000 -> 1300ms
    const intervals: NodeJS.Timeout[] = [];

    GREETINGS.forEach((_, idx) => {
      if (idx > 0) {
        const t = setTimeout(() => {
          setGreetingIndex(idx);
          if (idx === GREETINGS.length - 1) {
            setIsFinalPhase(true);
          }
        }, idx * 260);
        intervals.push(t);
      }
    });

    // Final exit transition at 2.0s
    const exitTimer = setTimeout(() => {
      finish();
    }, 2100);

    // Global skip listeners (Click, Keypress, Touch, Wheel) for optimal UX
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "Escape" ||
        e.key === " " ||
        e.key === "Enter" ||
        e.key === "ArrowDown"
      ) {
        finish();
      }
    };

    const handleWheel = () => finish();
    const handleTouchMove = () => finish();

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      clearTimeout(timer);
      intervals.forEach(clearTimeout);
      clearTimeout(exitTimer);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [finish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="welcome-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: "-100%",
            transition: {
              duration: 0.65,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          onClick={finish}
          role="dialog"
          aria-label="Welcome Introduction"
          className="fixed inset-0 z-50 flex cursor-pointer flex-col justify-between overflow-hidden bg-[#303446] p-6 select-none sm:p-10"
        >
          {/* Subtle Ambient Background Grid & Radial Focus */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(202,158,230,0.12),transparent_70%)]" />

          {/* Top Bar: Live Status & Monospace Metadata */}
          <div className="relative z-10 flex items-center justify-between font-mono text-xs tracking-wider">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2.5"
            >
              <span className="relative flex size-2">
                <span className="bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                <span className="bg-accent relative inline-flex size-2 rounded-full" />
              </span>
              <span className="text-accent font-semibold">[ONLINE]</span>
              <span className="text-faint hidden sm:inline">
                IRLY FIZAHARIS • PORTFOLIO
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-faint hover:text-foreground flex items-center gap-2 text-[11px] transition-colors"
            >
              <span>[CLICK ANYWHERE TO SKIP]</span>
              <ArrowRightIcon className="size-3" />
            </motion.div>
          </div>

          {/* Center Stage: Animating Greeting Component & Typography */}
          <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center justify-center space-y-6 text-center">
            {/* Animating Geometric Architecture Component */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="border-border bg-surface/90 relative w-full max-w-sm rounded-md border p-5 shadow-2xl backdrop-blur-md"
            >
              {/* Corner structural brackets */}
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="border-accent absolute -top-1 -left-1 size-2.5 border-t-2 border-l-2"
              />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="border-accent absolute -top-1 -right-1 size-2.5 border-t-2 border-r-2"
              />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="border-accent absolute -bottom-1 -left-1 size-2.5 border-b-2 border-l-2"
              />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="border-accent absolute -right-1 -bottom-1 size-2.5 border-r-2 border-b-2"
              />

              {/* Component Header Metadata */}
              <div className="border-border/70 flex items-center justify-between border-b pb-2.5 font-mono text-[11px]">
                <div className="text-accent flex items-center gap-1.5">
                  <SparkleIcon weight="fill" className="size-3" />
                  <span className="font-semibold">INTRO</span>
                </div>
                <span className="text-dim">LOC: BANDUNG, ID</span>
              </div>

              {/* Animating Greeting Word Reel */}
              <div className="relative my-2 flex h-16 items-center justify-center overflow-hidden sm:h-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={GREETINGS[greetingIndex].text}
                    initial={{ y: 25, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -25, opacity: 0, filter: "blur(4px)" }}
                    transition={{
                      duration: 0.22,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-foreground font-sans text-2xl font-semibold tracking-tight sm:text-4xl">
                      {GREETINGS[greetingIndex].text}
                    </span>
                    <span className="text-accent mt-1 font-mono text-[10px] tracking-widest uppercase">
                      [{GREETINGS[greetingIndex].lang}]
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Expanding Brand Identity Preview */}
              <div className="border-border/70 space-y-1 border-t pt-2.5">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isFinalPhase ? 1 : 0.6 }}
                  transition={{ duration: 0.3 }}
                  className="text-muted flex items-center justify-center gap-2 font-mono text-xs"
                >
                  <span className="text-foreground font-medium">
                    Irly Fizaharis
                  </span>
                  <span className="text-border">•</span>
                  <span className="text-accent">Full-Stack Developer</span>
                </motion.div>
                <p className="text-faint text-[11px]">
                  End-to-end digital solutions, thoughtfully engineered.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar: Interactive Action Guidance */}
          <div className="border-border/50 text-dim relative z-10 flex items-center justify-between border-t pt-3 font-mono text-[11px]">
            <span className="hidden sm:inline">
              REACT 19 • NEXT.JS 16 • CRAFT MOTION
            </span>
            <div className="text-faint mx-auto flex items-center gap-2 sm:mx-0">
              <span className="bg-accent size-1 animate-ping rounded-full" />
              <span>PRESS [SPACE], [ESC] OR CLICK ANYWHERE</span>
            </div>
            <span className="hidden sm:inline">2026</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
