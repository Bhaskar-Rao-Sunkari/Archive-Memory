import React from "react";
import { motion } from "framer-motion";
import { Btn } from "./ui";

// Cinematic full-screen chapter opening: big index watermark, ruled label,
// masked line-by-line title reveal, then a story-driven continue button.
export default function ChapterOpener({ chapter, next, tone = "light" }) {
  const dark = tone === "dark";
  const words = chapter.title.split(" ");
  const ink = dark ? "var(--bg-light)" : "var(--ink)";
  const soft = dark ? "rgba(243,233,216,0.66)" : "var(--ink-soft)";
  const accent = dark ? "rgba(243,233,216,0.85)" : "var(--accent-2)";
  return (
    <motion.section
      data-testid={`chapter-opener-${chapter.n}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
      style={{ backgroundColor: dark ? "var(--accent-2)" : "var(--bg)" }}
      className="fixed inset-0 flex items-center px-8 sm:px-16 overflow-hidden"
    >
      {/* oversized editorial watermark */}
      <motion.span
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: dark ? 0.1 : 0.07, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none select-none absolute -right-6 sm:right-4 top-1/2 -translate-y-1/2 font-serif font-semibold leading-none text-[42vw] sm:text-[30vw]"
        style={{ color: ink }}
        aria-hidden="true"
      >
        {chapter.n}
      </motion.span>

      <div className="relative w-full max-w-3xl">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 origin-left mb-8"
        >
          <span className="h-px w-16" style={{ backgroundColor: accent }} />
          <span className="font-mono text-[0.78rem] tracking-[0.34em] uppercase" style={{ color: accent }}>
            Chapter {chapter.n}
          </span>
        </motion.div>

        <h2
          className="font-serif font-semibold leading-[0.95] text-5xl sm:text-7xl md:text-8xl"
          style={{ color: ink }}
        >
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.22em]">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.35 + i * 0.09, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 + words.length * 0.09 + 0.15, duration: 0.9 }}
          className="font-serif italic text-2xl sm:text-3xl mt-6"
          style={{ color: dark ? soft : "var(--accent-2)" }}
        >
          {chapter.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 + words.length * 0.09 + 0.45, duration: 0.9 }}
          className="mt-12"
        >
          <Btn
            onClick={next}
            data-testid={`chapter-enter-${chapter.n}`}
            className={dark ? "!bg-[color:var(--bg-light)] !text-[color:var(--accent-2)] hover:!bg-[color:var(--bg)]" : ""}
          >
            {chapter.cta}
          </Btn>
        </motion.div>
      </div>
    </motion.section>
  );
}
