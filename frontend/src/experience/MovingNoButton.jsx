import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Btn } from "./ui";

// A YES / NO pair where NO playfully dodges. Escalates, never leaves the area,
// works with mouse + touch. After enough tries it gives up with a quip.
const QUIPS = ["nice try.", "we both know that's not happening.", "you're not even close.", "it's staying right here → YES."];

export default function MovingNoButton({ noLabel = "no", yesLabel = "yes", onYes, testid }) {
  const areaRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [tries, setTries] = useState(0);
  const [scale, setScale] = useState(1);

  const dodge = useCallback(() => {
    const area = areaRef.current;
    if (!area) return;
    const rect = area.getBoundingClientRect();
    // escalate travel distance with attempts, clamp inside the area
    const pad = 12;
    const btnW = 130, btnH = 52;
    const maxX = Math.max(0, rect.width - btnW - pad);
    const maxY = Math.max(0, rect.height - btnH - pad);
    const grow = Math.min(1, 0.35 + tries * 0.18);
    const nx = (Math.random() * 2 - 1) * maxX * grow;
    const ny = (Math.random() * 2 - 1) * maxY * grow;
    setPos({ x: Math.max(-maxX / 2, Math.min(maxX / 2, nx)), y: Math.max(-maxY / 2, Math.min(maxY / 2, ny)) });
    setScale((s) => Math.max(0.72, s - 0.06));
    setTries((t) => t + 1);
  }, [tries]);

  const quip = tries >= 3 ? QUIPS[Math.min(tries - 3, QUIPS.length - 1)] : null;

  return (
    <div className="w-full flex flex-col items-center gap-5" data-testid={testid}>
      <div
        ref={areaRef}
        className="relative w-full max-w-md h-44 flex items-center justify-center gap-4"
      >
        <Btn onClick={onYes} data-testid="yes-button">
          {yesLabel}
        </Btn>

        <motion.div
          className="absolute"
          style={{ left: "50%", top: "50%" }}
          animate={{ x: pos.x + 90, y: pos.y, scale }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
        >
          <button
            data-testid="no-button"
            onMouseEnter={dodge}
            onClick={dodge}
            onTouchStart={(e) => {
              e.preventDefault();
              dodge();
            }}
            className="hairline rounded-full px-6 py-3 font-mono text-[0.72rem] tracking-[0.2em] uppercase bg-[color:var(--surface)] text-[color:var(--ink-soft)] whitespace-nowrap"
          >
            {noLabel}
          </button>
        </motion.div>
      </div>

      <div className="h-5">
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
