"use client";

/**
 * Node Modules
 */
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRightIcon,
  ChatCircleDotsIcon,
  CodeBlockIcon,
  FlagBannerFoldIcon,
  MapPinSimpleIcon,
} from "@phosphor-icons/react";

/**
 * Custom Modules
 */
import Logo from "@/app/_components/ui/logo";
import { buttonStyles } from "@/app/_components/ui/button";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const Header = ({
  role = "Full-Stack Developer",
  location = "Bandung, Indonesia",
  experience = 3,
}: {
  role?: string;
  location?: string;
  experience?: number;
}) => {
  return (
    <motion.header
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      <motion.div
        variants={itemVariants}
        className="text-muted flex items-center gap-2 font-mono text-xs tracking-wider uppercase"
      >
        <span className="text-accent font-semibold">[FOCUS]</span>
        <span>FULL-STACK ARCHITECTURE & DIGITAL PRODUCTS</span>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <p className="text-muted text-lg font-normal">Hi, I&apos;m</p>
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Logo className="size-10 md:size-12" />
          </motion.div>
          <h1 className="text-accent text-3xl font-semibold tracking-tight md:text-5xl">
            Irly Fizaharis
          </h1>
        </div>
        <h2 className="text-foreground text-xl font-medium md:text-2xl">
          {role}
        </h2>
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="text-muted max-w-xl text-base leading-relaxed"
      >
        End-to-end digital solutions, thoughtfully engineered. Full-stack
        developer translating business needs into high-converting user
        interfaces, resilient backend architectures, and production-ready
        applications.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center gap-3 pt-1"
      >
        <motion.a
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          href="#contact"
          className={buttonStyles.primary}
        >
          <ChatCircleDotsIcon className="size-4" weight="duotone" />
          <span>Let&apos;s talk business</span>
        </motion.a>
        <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
          <Link href="/projects" className={buttonStyles.outline}>
            <span>View projects</span>
            <ArrowRightIcon className="size-4" />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="border-border/60 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-1"
      >
        <div className="text-faint flex items-center gap-1.5 font-mono text-xs">
          <MapPinSimpleIcon weight="duotone" className="text-accent size-3.5" />
          <span>{location}</span>
        </div>
        <div className="bg-border size-1 rounded-full" />
        <div className="text-faint flex items-center gap-1.5 font-mono text-xs">
          <FlagBannerFoldIcon
            weight="duotone"
            className="text-accent size-3.5"
          />
          <span>{experience} Years Experience</span>
        </div>
        <div className="bg-border size-1 rounded-full" />
        <div className="text-faint flex items-center gap-1.5 font-mono text-xs">
          <CodeBlockIcon weight="duotone" className="text-accent size-3.5" />
          <span>Next.js • TypeScript • PostgreSQL • Node.js</span>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
