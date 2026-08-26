import React, { useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "../components/Typewriter";

// Cinematic fullscreen archive interlude with typewriter + fade.
export default function ArchiveTransition({ text, tone = "neutral", onDone, testid }) {
  const [typed, setTyped] = useState(false);
  const dark = tone === "dark";
  return (
    <motion.section
      data-testid={testid}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{ backgroundColor: dark ? "var(--accent-2)" : "var(--bg)" }}
      className="fixed inset-0 flex flex-col items-center justify-center px-6"
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-24 mb-10 origin-left"
        style={{ backgroundColor: dark ? "rgba(243,233,216,0.5)" : "var(--line)" }}
      />
      <h2
        className="font-mono text-center text-sm sm:text-base tracking-[0.32em]"
        style={{ color: dark ? "var(--bg-light)" : "var(--ink)" }}
      >
        <Typewriter
          text={text}
          speed={70}
          onDone={() => {
            setTyped(true);
            setTimeout(() => onDone && onDone(), 1400);
          }}
        />
      </h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: typed ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="mt-8 flex gap-1.5"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.25 }}
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: dark ? "var(--bg-light)" : "var(--accent-2)" }}
          />
        ))}
      </motion.div>
    </motion.section>
  );
}
