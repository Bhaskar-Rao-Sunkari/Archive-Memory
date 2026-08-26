import React, { useState } from "react";
import { motion } from "framer-motion";
import { Stage, Btn, Label, Stamp } from "../ui";
import Typewriter from "../../components/Typewriter";

// CHAPTER 01 — THE CONFESSION. Scroll-based storytelling: lines slide in
// left→right as she scrolls, ending in the big typewritten confession.
export default function Chapter01({ cfg, next }) {
  const [confessing, setConfessing] = useState(false);
  const [typed, setTyped] = useState(false);
  const p = cfg.problem;

  return (
    <Stage testid="stage-chapter-01" className="!justify-start pt-28 pb-24">
      <div className="flex items-center justify-between">
        <Stamp>{p.stamp}</Stamp>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="font-mono text-[0.6rem] tracking-[0.24em] uppercase text-[color:var(--ink-soft)]"
          data-testid="ch1-scroll-hint"
        >
          {p.scrollHint} ↓
        </motion.span>
      </div>

      <div className="mt-24 sm:mt-32">
        {p.lines.map((l, i) => (
          <div key={i} className={`relative ${i === 0 ? "" : "mt-28 sm:mt-36"}`}>
            <motion.p
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`font-serif leading-tight ${
                i === p.lines.length - 1
                  ? "font-semibold text-4xl sm:text-6xl text-[color:var(--ink)]"
                  : "font-medium text-3xl sm:text-4xl text-[color:var(--ink-soft)]"
              }`}
              data-testid={`ch1-line-${i}`}
            >
              {l}
            </motion.p>
            {i === 2 && (
              <motion.span
                initial={{ opacity: 0, rotate: 0 }}
                whileInView={{ opacity: 1, rotate: 5 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="annotation text-xl absolute -top-8 right-0 sm:right-8"
              >
                {p.marginNote}
              </motion.span>
            )}
          </div>
        ))}
      </div>

      {/* the confession */}
      <motion.div
        className="mt-40 sm:mt-52 mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        onViewportEnter={() => setConfessing(true)}
        transition={{ duration: 0.6 }}
        data-testid="ch1-confession"
      >
        <Label>{cfg.confession.kicker}</Label>
        <h2 className="font-serif font-semibold text-5xl sm:text-7xl mt-6 leading-none min-h-[1.1em]">
          {confessing && (
            <Typewriter text={cfg.confession.line} speed={80} onDone={() => setTyped(true)} />
          )}
        </h2>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: typed ? 1 : 0 }} transition={{ duration: 0.9 }}>
          <p className="mt-7 text-lg text-[color:var(--ink-soft)] max-w-lg">{cfg.confession.sub}</p>
          <p className="annotation text-2xl mt-4">{cfg.confession.annotation}</p>
          <div className="mt-12">
            <Btn onClick={next} data-testid="confession-cta">
              {cfg.confession.cta}
            </Btn>
          </div>
        </motion.div>
      </motion.div>
    </Stage>
  );
}
