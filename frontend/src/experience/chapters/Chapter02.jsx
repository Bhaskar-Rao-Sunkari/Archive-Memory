import React from "react";
import { motion } from "framer-motion";
import { Stage, Btn, Label, StickerNote } from "../ui";
import PhotoReveal from "../PhotoReveal";

// CHAPTER 02 — WHAT SURVIVED. Photographs appear one by one on landing,
// then the emotional "only you have them" turn.
export default function Chapter02({ cfg, next }) {
  const ph = cfg.photos;
  const slots = [
    "sm:col-span-5",
    "sm:col-span-6 sm:col-start-7 sm:mt-24",
    "sm:col-span-4 sm:col-start-2 sm:-mt-10",
    "sm:col-span-6 sm:col-start-7 sm:mt-8",
    "sm:col-span-5 sm:col-start-4 sm:mt-16",
  ];
  const photoDelay = (i) => 0.5 + i * 0.35;
  const lostBase = photoDelay(ph.length - 1) + 0.7;

  return (
    <Stage testid="stage-chapter-02" wide className="!justify-start pt-28 pb-24">
      <div className="relative">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Label>{cfg.memoriesIntro.kicker}</Label>
          <h2 className="font-serif font-semibold text-4xl sm:text-6xl mt-4 leading-[1.02] max-w-2xl">
            {cfg.memoriesIntro.line}
          </h2>
          <p className="annotation text-xl sm:text-2xl mt-3">{cfg.memoriesIntro.sub}</p>
        </motion.div>
        <StickerNote delay={1.1} rotate={4} className="absolute right-0 top-2 hidden md:inline-block">
          {cfg.memoriesIntro.aside}
        </StickerNote>
      </div>

      <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-12 gap-x-8 gap-y-14 items-start">
        {ph.map((photo, i) => (
          <div key={i} className={slots[i % slots.length]}>
            <PhotoReveal photo={photo} index={i} rotate={i % 2 === 0 ? -1.6 : 1.8} delay={photoDelay(i)} />
          </div>
        ))}
      </div>

      {/* emotional turn — final wording supplied later, edit in config.js */}
      <div className="mt-24 sm:mt-32 mb-10 max-w-xl">
        {cfg.lostReveal.lines.map((l, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: lostBase + i * 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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
          animate={{ opacity: 1 }}
          transition={{ delay: lostBase + cfg.lostReveal.lines.length * 0.35 + 0.3, duration: 0.9 }}
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
