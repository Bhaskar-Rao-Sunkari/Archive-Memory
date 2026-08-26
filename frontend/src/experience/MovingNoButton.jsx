import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Btn } from "./ui";

// YES / NO pair where NO dodges inside its own containment zone below YES.
// It can never overlap YES, cover text, or leave the screen.
const QUIPS = ["nice try.", "we both know that's not happening.", "you're not even close.", "it lives here now. accept it."];

export default function MovingNoButton({ noLabel = "no", yesLabel = "yes", onYes, testid }) {
  const zoneRef = useRef(null);
  const btnRef = useRef(null);
  const [pos, setPos] = useState(null);
  const [tries, setTries] = useState(0);

  const center = useCallback(() => {
    const zone = zoneRef.current, btn = btnRef.current;
    if (!zone || !btn) return;
    setPos({
      x: (zone.clientWidth - btn.offsetWidth) / 2,
      y: (zone.clientHeight - btn.offsetHeight) / 2,
    });
  }, []);

  useEffect(() => {
    center();
    window.addEventListener("resize", center);
    return () => window.removeEventListener("resize", center);
  }, [center]);

  const dodge = useCallback(() => {
    const zone = zoneRef.current, btn = btnRef.current;
    if (!zone || !btn || !pos) return;
    const pad = 10;
    const maxX = Math.max(0, zone.clientWidth - btn.offsetWidth - pad * 2);
    const maxY = Math.max(0, zone.clientHeight - btn.offsetHeight - pad * 2);
    const minJump = Math.min(110, maxX * 0.45);
    let nx = pos.x, ny = pos.y, attempts = 0;
    do {
      nx = pad + Math.random() * maxX;
      ny = pad + Math.random() * maxY;
      attempts += 1;
    } while (attempts < 14 && Math.hypot(nx - pos.x, ny - pos.y) < minJump);
    setPos({ x: nx, y: ny });
    setTries((t) => t + 1);
  }, [pos]);

  const wobble = Math.min(tries, 6) * (tries % 2 === 0 ? 1.2 : -1.2);
  const scale = Math.max(0.82, 1 - tries * 0.03);
  const quip = tries >= 3 ? QUIPS[Math.min(tries - 3, QUIPS.length - 1)] : null;

  return (
    <div className="w-full flex flex-col items-center gap-6" data-testid={testid}>
      <Btn onClick={onYes} data-testid="yes-button">
        {yesLabel}
      </Btn>

      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-1.5 px-1">
          <span className="font-mono text-[0.55rem] tracking-[0.24em] uppercase text-[color:var(--ink-faint)]">
            no-button containment zone
          </span>
          {tries > 0 && (
            <span className="font-mono text-[0.55rem] tracking-[0.24em] uppercase text-[color:var(--ink-faint)]" data-testid="no-attempts">
              attempts: {tries}
            </span>
          )}
        </div>
        <div
          ref={zoneRef}
          className="relative w-full h-32 sm:h-36 rounded-xl border border-dashed overflow-hidden"
          style={{ borderColor: "rgba(43,33,23,0.28)" }}
        >
          <motion.button
            ref={btnRef}
            data-testid="no-button"
            onMouseEnter={dodge}
            onClick={dodge}
            onTouchStart={(e) => {
              e.preventDefault();
              dodge();
            }}
            initial={false}
            animate={pos ? { x: pos.x, y: pos.y, rotate: wobble, scale } : {}}
            transition={{ type: "spring", stiffness: 340, damping: 24 }}
            className="absolute left-0 top-0 rounded-full px-6 py-2.5 font-mono text-[0.7rem] tracking-[0.2em] uppercase bg-[color:var(--surface)] text-[color:var(--ink)] whitespace-nowrap"
            style={{ border: "1px solid rgba(43,33,23,0.35)", touchAction: "none" }}
          >
            {noLabel}
          </motion.button>
        </div>
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
