import React, { useState } from "react";
import { motion } from "framer-motion";

// A single rediscovered photograph. Warm treatment, clipped paper frame,
// caption + handwritten note reveal on tap/click. Responsive to any ratio.
export default function PhotoReveal({ photo, index = 0, rotate = 0, onReveal }) {
  const [open, setOpen] = useState(false);
  const portrait = photo.orientation === "portrait";

  return (
    <motion.figure
      initial={{ opacity: 0, y: 40, rotate: rotate * 1.6 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <motion.button
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        onClick={() => {
          setOpen(true);
          onReveal && onReveal();
        }}
        data-testid={`photo-${index}`}
        className="block w-full text-left cursor-pointer"
      >
        <div className="bg-[color:var(--bg-light)] p-2.5 pb-3 paper-shadow rounded-[2px]">
          <div
            className={`relative overflow-hidden bg-[color:var(--accent)] ${
              portrait ? "aspect-[3/4]" : "aspect-[4/3]"
            }`}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover photo-warm"
            />
            <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 60px rgba(63,53,44,0.18)" }} />
            {!open && (
              <span className="absolute bottom-2 right-2 font-mono text-[0.55rem] tracking-[0.18em] uppercase bg-[color:var(--bg-light)]/80 text-[color:var(--ink-soft)] px-2 py-0.5 rounded-sm">
                tap
              </span>
            )}
          </div>
          <figcaption className="pt-2 flex items-center justify-between">
            <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-[color:var(--ink-faint)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-[0.55rem] tracking-[0.18em] uppercase text-[color:var(--ink-faint)]">
              {photo.note}
            </span>
          </figcaption>
        </div>
      </motion.button>

      <motion.p
        initial={false}
        animate={{ opacity: open ? 1 : 0, y: open ? 0 : -6 }}
        transition={{ duration: 0.6 }}
        className="annotation text-xl sm:text-2xl mt-3 pl-1 leading-snug"
      >
        {photo.caption}
      </motion.p>
    </motion.figure>
  );
}
