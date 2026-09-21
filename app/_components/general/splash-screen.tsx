"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MoonIcon } from "@phosphor-icons/react";

const steps = [
  "INITIALIZING_ENVIRONMENT",
  "LOADING_CORE_MODULES",
  "PREPARING_INTERFACE",
  "SYSTEM_ONLINE",
];

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    // Check session storage or reduced motion
    const hasSeenSplash = sessionStorage.getItem("splash_viewed");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (hasSeenSplash || prefersReducedMotion) {
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    const startTime = Date.now();
    const duration = 1400; // 1.4 seconds total for snappy experience

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct < 30) setStepIndex(0);
      else if (pct < 65) setStepIndex(1);
      else if (pct < 95) setStepIndex(2);
      else setStepIndex(3);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          sessionStorage.setItem("splash_viewed", "true");
        }, 300);
      }
    }, 20);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearInterval(interval);
        clearTimeout(timer);
        setIsVisible(false);
        sessionStorage.setItem("splash_viewed", "true");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSkip = () => {
    setIsVisible(false);
    sessionStorage.setItem("splash_viewed", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: "-100%",
            transition: {
              duration: 0.7,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          onClick={handleSkip}
          className="fixed inset-0 z-50 flex cursor-pointer flex-col justify-between bg-[#303446] p-6 select-none sm:p-10"
        >
          {/* Top Brand Header */}
          <div className="text-muted flex items-center justify-between font-mono text-xs tracking-wider">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <span className="bg-accent size-2 animate-pulse rounded-full" />
              <span className="text-accent">[SYS_LOADER]</span>
              <span className="text-faint hidden sm:inline">
                IRLY_FIZAHARIS_PORTFOLIO_V1
              </span>
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-faint hover:text-foreground transition-colors"
            >
              [ESC / CLICK TO SKIP]
            </motion.span>
          </div>

          {/* Center Content: Monogram Logo & Title */}
          <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center space-y-6 text-center">
            {/* Geometric animated logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="border-accent/40 bg-accent/15 text-accent shadow-accent/10 relative size-16 rounded-2xl border p-4 shadow-lg sm:size-20"
            >
              <span className="border-accent absolute -top-1.5 -left-1.5 size-3 border-t-2 border-l-2" />
              <span className="border-accent absolute -top-1.5 -right-1.5 size-3 border-t-2 border-r-2" />
              <span className="border-accent absolute -bottom-1.5 -left-1.5 size-3 border-b-2 border-l-2" />
              <span className="border-accent absolute -right-1.5 -bottom-1.5 size-3 border-r-2 border-b-2" />
              <MoonIcon className="size-full animate-pulse" weight="duotone" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-1.5"
            >
              <h1 className="text-foreground font-sans text-2xl font-semibold tracking-tight sm:text-3xl">
                Irly Fizaharis
              </h1>
              <p className="text-accent font-mono text-xs tracking-wider uppercase sm:text-sm">
                Front-end Developer
              </p>
            </motion.div>

            {/* Progress Bar & Status Text */}
            <div className="w-full space-y-2.5 pt-2">
              <div className="bg-sunken border-border/50 relative h-1.5 w-full overflow-hidden rounded-full border">
                <motion.div
                  className="bg-accent h-full rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>

              <div className="text-faint flex items-center justify-between font-mono text-[11px]">
                <span className="text-foreground tracking-wide">
                  &gt; {steps[stepIndex]}
                </span>
                <span className="text-accent font-semibold tabular-nums">
                  {String(progress).padStart(2, "0")}%
                </span>
              </div>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="text-dim border-border/40 flex items-center justify-between border-t pt-3 font-mono text-[10px]">
            <span>LOCATION: BANDUNG, ID</span>
            <span>NEXT.JS • REACT 19 • FRAMER MOTION</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
