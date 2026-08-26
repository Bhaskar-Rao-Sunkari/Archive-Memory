import React, { useState } from "react";
import { motion } from "framer-motion";
import { Stage, Btn, Label } from "../ui";
import MovingNoButton from "../MovingNoButton";

// CHAPTER 03 — THE NEGOTIATION. Two-panel horizontal swipe:
// Panel 1: fictional recovery form. Panel 2: absurdly formal application letter.
// Then the verdict with the dodging NO button.

function FormPanel({ e }) {
  return (
    <div className="relative bg-[color:var(--bg-light)] rounded-sm paper-shadow p-1.5" data-testid="panel-form">
      <div className="border border-dashed rounded-sm p-6 sm:p-8" style={{ borderColor: "rgba(43,33,23,0.3)" }}>
        <div className="flex items-start justify-between gap-4 pb-4 border-b" style={{ borderColor: "rgba(43,33,23,0.25)" }}>
          <div>
            <p className="font-mono text-[0.68rem] tracking-[0.24em] uppercase text-[color:var(--ink)] font-medium">{e.formTitle}</p>
            <p className="font-mono text-[0.58rem] tracking-[0.2em] uppercase text-[color:var(--ink-soft)] mt-1.5">
              dept. of lost archives · confidential
            </p>
          </div>
          <motion.span
            initial={{ opacity: 0, scale: 1.4, rotate: -14 }}
            animate={{ opacity: 0.9, scale: 1, rotate: -8 }}
            transition={{ delay: 1.1, duration: 0.5, ease: "backOut" }}
            className="shrink-0 font-mono text-[0.62rem] tracking-[0.24em] uppercase px-3 py-1.5 rounded-[2px] text-[color:var(--accent-2)]"
            style={{ border: "2px solid var(--accent-2)" }}
            data-testid="form-stamp"
          >
            {e.stamp}
          </motion.span>
        </div>
        <div className="pt-3">
          {e.fields.map(([k, v], i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.6 }}
              className="flex items-baseline gap-3 py-2.5"
            >
              <span className="font-mono text-[0.68rem] tracking-[0.16em] uppercase text-[color:var(--ink)] font-medium whitespace-nowrap">{k}</span>
              <span className="flex-1 border-b border-dotted translate-y-[-3px]" style={{ borderColor: "rgba(43,33,23,0.35)" }} />
              <span className={`text-right ${v === v.toUpperCase() && v.length > 3 ? "font-mono text-[0.72rem] tracking-[0.2em] font-medium text-[color:var(--accent-2)]" : "annotation text-xl !text-[color:var(--ink)]"}`}>
                {v}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LetterPanel({ letter }) {
  return (
    <div className="relative bg-[color:var(--bg-light)] rounded-sm paper-shadow p-1.5" data-testid="panel-letter">
      <div className="border border-dashed rounded-sm p-6 sm:p-8" style={{ borderColor: "rgba(43,33,23,0.3)" }}>
        <div className="flex justify-between items-start mb-6">
          <span className="font-mono text-[0.55rem] tracking-[0.24em] uppercase text-[color:var(--ink-faint)]">{letter.tag}</span>
          <span className="font-mono text-[0.55rem] tracking-[0.24em] uppercase text-[color:var(--ink-faint)]">page 2 / 2</span>
        </div>
        <div className="font-serif text-lg sm:text-xl leading-snug text-[color:var(--ink)]">
          {letter.to.map((l, i) => (
            <p key={i} className={i === 0 ? "" : "font-medium"}>{l}</p>
          ))}
        </div>
        <div className="mt-6 space-y-4 text-[0.95rem] sm:text-base leading-relaxed text-[color:var(--ink-soft)]">
          {letter.body.map((l, i) => (
            <p key={i}>{l}</p>
          ))}
        </div>
        <div className="mt-8 text-right">
          <p className="text-sm text-[color:var(--ink-soft)]">{letter.signoff[0]}</p>
          <p className="annotation text-2xl mt-1">{letter.signoff[1]}</p>
        </div>
      </div>
    </div>
  );
}

export default function Chapter03({ cfg, next }) {
  const e = cfg.earnIt;
  const [panel, setPanel] = useState(0);
  const [answered, setAnswered] = useState(false);

  const onDragEnd = (_ev, info) => {
    if (info.offset.x < -60 && panel === 0) setPanel(1);
    else if (info.offset.x > 60 && panel === 1) setPanel(0);
  };

  return (
    <Stage testid="stage-chapter-03" className="!justify-start pt-28 pb-24">
      <div className="flex items-center justify-between mb-6">
        <Label>{e.kicker}</Label>
        <div className="flex items-center gap-2" data-testid="panel-dots">
          {[0, 1].map((i) => (
            <button
              key={i}
              data-testid={`panel-dot-${i}`}
              onClick={() => setPanel(i)}
              aria-label={`panel ${i + 1}`}
              className="w-2 h-2 rounded-full transition-colors duration-300"
              style={{ backgroundColor: panel === i ? "var(--accent-2)" : "rgba(43,33,23,0.25)" }}
            />
          ))}
        </div>
      </div>

      <div className="overflow-hidden -mx-1">
        <motion.div
          className="flex cursor-grab active:cursor-grabbing"
          style={{ width: "200%", touchAction: "pan-y" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={onDragEnd}
          animate={{ x: panel === 0 ? "0%" : "-50%" }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          data-testid="swipe-track"
        >
          <div className="w-1/2 px-1 select-none">
            <FormPanel e={e} />
          </div>
          <div className="w-1/2 px-1 select-none">
            <LetterPanel letter={e.letter} />
          </div>
        </motion.div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-2">
        <button
          data-testid="swipe-hint"
          onClick={() => setPanel((p) => (p === 0 ? 1 : 0))}
          className="group inline-flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.22em] uppercase text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] transition-colors"
        >
          {panel === 0 ? (
            <>{e.swipeHint}</>
          ) : (
            <>
              <motion.span animate={{ x: [0, -5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>←</motion.span>
              back to the form
            </>
          )}
        </button>
        {panel === 0 && (
          <motion.button
            data-testid="swipe-left-indicator"
            onClick={() => setPanel(1)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[color:var(--surface)]"
            style={{ border: "1px solid rgba(43,33,23,0.3)" }}
          >
            <motion.span
              animate={{ x: [0, -8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="text-[color:var(--accent-2)] text-base leading-none"
            >
              ←
            </motion.span>
            <span className="font-mono text-[0.66rem] tracking-[0.24em] uppercase text-[color:var(--ink)] font-medium">swipe left</span>
          </motion.button>
        )}
      </div>

      {/* the verdict */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.9 }}
        className="mt-16 text-center"
      >
        {!answered ? (
          <>
            <p className="font-serif font-medium text-2xl sm:text-3xl mb-8" data-testid="verdict-question">{e.question}</p>
            <MovingNoButton yesLabel={e.yes} noLabel={e.no} onYes={() => setAnswered(true)} testid="earn-choice" />
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <p className="annotation text-2xl mb-8">{e.afterYes}</p>
            <Btn onClick={next} data-testid="earn-cta">
              {e.cta}
            </Btn>
          </motion.div>
        )}
      </motion.div>
    </Stage>
  );
}
