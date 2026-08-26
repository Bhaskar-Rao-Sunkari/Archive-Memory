import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Btn } from "./ui";

// YES / NO pair where NO runs away freely across the whole screen.
// It avoids the YES button (with margin), the share button corner,
// and always stays fully inside the viewport.
const QUIPS = ["nice try.", "we both know that's not happening.", "you're not even close.", "it lives here now. accept it."];

export default function MovingNoButton({ noLabel = "no", yesLabel = "yes", onYes, testid }) {
  const yesRef = useRef(null);
  const noRef = useRef(null);
  const [free, setFree] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [tries, setTries] = useState(0);

  const dodge = useCallback(() => {
    const bw = noRef.current?.offsetWidth || 150;
    const bh = noRef.current?.offsetHeight || 54;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const pad = 16;
    const avoid = [{ l: vw - 230, t: vh - 96, r: vw, b: vh }]; // share button corner
    if (yesRef.current) {
      const r = yesRef.current.getBoundingClientRect();
      avoid.push({ l: r.left - 28, t: r.top - 28, r: r.right + 28, b: r.bottom + 28 });
    }
    let nx = pos.x, ny = pos.y, ok = false, i = 0;
    while (!ok && i < 40) {
      nx = pad + Math.random() * (vw - bw - pad * 2);
      ny = pad + Math.random() * (vh - bh - pad * 2);
      const clear = !avoid.some((a) => nx < a.r && nx + bw > a.l && ny < a.b && ny + bh > a.t);
      const farEnough = !free || Math.hypot(nx - pos.x, ny - pos.y) > 140;
      ok = clear && farEnough;
      i += 1;
    }
    setFree(true);
    setPos({ x: nx, y: ny });
    setTries((t) => t + 1);
  }, [pos, free]);

  const wobble = Math.min(tries, 6) * (tries % 2 === 0 ? 1.5 : -1.5);
  const scale = Math.max(0.85, 1 - tries * 0.025);
  const quip = tries >= 3 ? QUIPS[Math.min(tries - 3, QUIPS.length - 1)] : null;

  const noButton = (
    <motion.button
      ref={noRef}
      data-testid="no-button"
      onMouseEnter={dodge}
      onClick={dodge}
      onTouchStart={(e) => {
        e.preventDefault();
        dodge();
      }}
      initial={false}
      animate={free ? { x: pos.x, y: pos.y, rotate: wobble, scale } : {}}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className={`rounded-full px-8 py-3.5 font-mono text-[0.78rem] tracking-[0.2em] uppercase bg-[color:var(--surface)] text-[color:var(--ink)] whitespace-nowrap paper-shadow ${
        free ? "fixed left-0 top-0 z-50" : ""
      }`}
      style={{ border: "1px solid rgba(43,33,23,0.35)", touchAction: "none" }}
    >
      {noLabel}
    </motion.button>
  );

  return (
    <div className="w-full flex flex-col items-center gap-6" data-testid={testid}>
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <span ref={yesRef} className="inline-flex">
          <Btn size="lg" onClick={onYes} data-testid="yes-button">
            {yesLabel}
          </Btn>
        </span>
        {noButton}
        {free && (
          <span className="font-mono text-[0.6rem] tracking-[0.24em] uppercase text-[color:var(--ink-faint)]" data-testid="no-attempts">
            attempts: {tries}
          </span>
        )}
      </div>

      <div className="h-6">
        {quip && (
          <motion.p
            key={quip}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="annotation text-lg"
            data-testid="no-quip"
          >
            {quip}
          </motion.p>
        )}
      </div>
    </div>
  );
}
