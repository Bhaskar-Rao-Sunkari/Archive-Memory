import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Stage, Btn, Label, Stamp, StickerNote } from "../ui";
import Typewriter from "../../components/Typewriter";

// CHAPTER 01 — THE CONFESSION. Everything reveals one by one on landing:
// lines slide in left→right, then the big typewritten confession begins.
export default function Chapter01({ cfg, next }) {
  const [confessing, setConfessing] = useState(false);
  const [typed, setTyped] = useState(false);
  const p = cfg.problem;
  const lineDelay = (i) => 0.5 + i * 0.75;
  const confessAt = lineDelay(p.lines.length - 1) + 1.1;

  useEffect(() => {
    const t = setTimeout(() => setConfessing(true), confessAt * 1000);
    return () => clearTimeout(t);
  }, [confessAt]);

  return (
    <Stage testid="stage-chapter-01" className="!justify-start pt-24 pb-20">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Stamp>{p.stamp}</Stamp>
      </motion.div>

      <div className="mt-12 sm:mt-16 space-y-8 sm:space-y-10">
        {p.lines.map((l, i) => (
          <React.Fragment key={i}>
            <motion.p
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: lineDelay(i), duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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
              <div className="!mt-4">
                <StickerNote delay={lineDelay(2) + 0.6} rotate={-2}>
                  {p.marginNote}
                </StickerNote>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* the confession */}
      <div className="mt-16 sm:mt-20 mb-6" data-testid="ch1-confession">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: confessing ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <Label>{cfg.confession.kicker}</Label>
        </motion.div>
        <h2 className="font-serif font-semibold text-5xl sm:text-7xl mt-5 leading-none min-h-[1.1em]">
          {confessing && (
            <Typewriter text={cfg.confession.line} speed={80} onDone={() => setTyped(true)} />
          )}
        </h2>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: typed ? 1 : 0 }} transition={{ duration: 0.9 }}>
          <p className="mt-6 text-lg text-[color:var(--ink-soft)] max-w-lg">{cfg.confession.sub}</p>
          {typed && (
            <div className="mt-4">
              <StickerNote delay={0.3} rotate={-2}>{cfg.confession.annotation}</StickerNote>
            </div>
          )}
          <div className="mt-10">
            <Btn onClick={next} data-testid="confession-cta">
              {cfg.confession.cta}
            </Btn>
          </div>
        </motion.div>
      </div>
    </Stage>
  );
}
