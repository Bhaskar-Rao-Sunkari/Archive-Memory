import React from "react";
import { motion } from "framer-motion";

export function Label({ children, className = "", ...rest }) {
  return (
    <span className={`label ${className}`} {...rest}>
      {children}
    </span>
  );
}

// Small stamped-style archive tag
export function Stamp({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 hairline rounded-sm font-mono text-[0.6rem] tracking-[0.22em] uppercase text-[color:var(--ink-soft)] ${className}`}
    >
      <span className="inline-block w-1 h-1 rounded-full bg-[color:var(--accent-2)]" />
      {children}
    </span>
  );
}

// Primary button — pill, warm, tactile
export function Btn({ children, onClick, className = "", variant = "solid", ...rest }) {
  const base =
    "relative inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-mono text-[0.72rem] tracking-[0.2em] uppercase transition-[transform,background-color,color,box-shadow] duration-500 will-change-transform select-none";
  const styles =
    variant === "solid"
      ? "bg-[color:var(--ink)] text-[color:var(--bg-light)] hover:bg-[color:var(--accent-2)] paper-shadow"
      : "hairline text-[color:var(--ink)] hover:bg-[color:var(--surface)]";
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

// Full-viewport stage wrapper with staggered entrance
export function Stage({ children, className = "", testid, bg = "var(--bg)" }) {
  return (
    <motion.section
      data-testid={testid}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ backgroundColor: bg }}
      className={`fixed inset-0 flex flex-col items-center justify-center px-6 py-16 overflow-y-auto no-scrollbar ${className}`}
    >
      <div className="w-full max-w-3xl mx-auto">{children}</div>
    </motion.section>
  );
}

export const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.14, duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  }),
};
