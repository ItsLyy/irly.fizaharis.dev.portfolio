"use client";

import { motion } from "framer-motion";

const Card = ({ name }: { name: string }) => {
  return (
    <motion.span
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
      className="border-border bg-raised/40 text-muted hover:border-accent/60 hover:text-foreground inline-flex cursor-default items-center justify-center rounded-xs border px-2.5 py-1 font-mono text-xs transition-colors duration-200"
    >
      {name}
    </motion.span>
  );
};

export default Card;
