import React from "react";
import { motion } from "framer-motion";
import { Stage, Btn, Label } from "../ui";
import PhotoReveal from "../PhotoReveal";

// CHAPTER 02 — WHAT SURVIVED. Asymmetric layered exploration of this
// year's photographs, ending in the emotional "only you have them" turn.
export default function Chapter02({ cfg, next }) {
  const ph = cfg.photos;
  const slots = [
    "sm:col-span-5",
    "sm:col-span-6 sm:col-start-7 sm:mt-24",
    "sm:col-span-4 sm:col-start-2 sm:-mt-10",
    "sm:col-span-6 sm:col-start-7 sm:mt-8",
    "sm:col-span-5 sm:col-start-4 sm:mt-16",
  ];

  return (
    <Stage testid="stage-chapter-02" wide className="!justify-start pt-28 pb-24">
      <div className="relative">
        <Label>{cfg.memoriesIntro.kicker}</Label>
        <h2 className="font-serif font-semibold text-4xl sm:text-6xl mt-4 leading-[1.02] max-w-2xl">
          {cfg.memoriesIntro.line}
        </h2>
        <p className="annotation text-xl sm:text-2xl mt-3">{cfg.memoriesIntro.sub}</p>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1 }}
          className="annotation text-lg absolute right-0 top-2 rotate-3 hidden md:block"
        >
          {cfg.memoriesIntro.aside}
        </motion.span>
      </div>

      <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-12 gap-x-8 gap-y-14 items-start">
        {ph.map((photo, i) => (
          <div key={i} className={slots[i % slots.length]}>
            <PhotoReveal photo={photo} index={i} rotate={i % 2 === 0 ? -1.6 : 1.8} />
          </div>
        ))}
      </div>

      {/* emotional turn — final wording supplied later, edit in config.js */}
      <div className="mt-32 sm:mt-44 mb-10 max-w-xl">
        {cfg.lostReveal.lines.map((l, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: i * 0.18, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className={`font-serif leading-tight ${
              i === cfg.lostReveal.lines.length - 1
                ? "font-semibold text-3xl sm:text-5xl text-[color:var(--ink)] mt-4"
                : "font-medium text-2xl sm:text-4xl text-[color:var(--ink-soft)] mt-2"
            }`}
            data-testid={`ch2-lost-line-${i}`}
          >
            {l}
          </motion.p>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.9 }}
          className="mt-12"
        >
          <Btn onClick={next} data-testid="survived-cta">
            {cfg.lostReveal.cta}
          </Btn>
        </motion.div>
      </div>
    </Stage>
  );
}
