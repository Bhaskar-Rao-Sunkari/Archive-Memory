import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stage, Btn, Label, Stamp, fadeUp } from "./ui";
import Typewriter from "../components/Typewriter";

/* ---------------- BOOT — ARCHIVE V.01 ---------------- */
export function BootStage({ cfg, next }) {
  const [phase, setPhase] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (phase < 1) return;
    const id = setInterval(() => {
      setPct((p) => {
        if (p >= 100) {
          clearInterval(id);
          return 100;
        }
        return p + 2;
      });
    }, 26);
    return () => clearInterval(id);
  }, [phase]);

  const logThresholds = [18, 48, 78];
  const corners = [
    "top-6 left-6 border-t border-l",
    "top-6 right-6 border-t border-r",
    "bottom-6 left-6 border-b border-l",
    "bottom-6 right-6 border-b border-r",
  ];

  return (
    <Stage testid="stage-boot">
      {/* delicate registration corners */}
      {corners.map((c, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 + i * 0.12, duration: 0.8 }}
          className={`fixed w-7 h-7 ${c}`}
          style={{ borderColor: "rgba(43,33,23,0.4)" }}
          aria-hidden="true"
        />
      ))}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="fixed left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left font-mono text-[0.55rem] tracking-[0.4em] uppercase text-[color:var(--ink-faint)] hidden sm:block"
        aria-hidden="true"
      >
        I love you IK I messed up
      </motion.span>

      <div className="flex flex-col items-center text-center">
        <Stamp className="mb-12">ARCHIVE v.01</Stamp>
        <h1 className="font-mono text-base sm:text-2xl tracking-[0.28em] text-[color:var(--ink)] font-medium">
          <Typewriter text={`${cfg.archive.boot}…`} speed={60} onDone={() => setPhase(1)} />
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          className="mt-10 w-72 max-w-[76vw]"
        >
          <div className="h-[3px] w-full bg-[color:var(--surface)] rounded-full relative overflow-hidden" style={{ border: "1px solid rgba(43,33,23,0.18)" }}>
            <motion.div
              className="absolute left-0 top-0 h-full bg-[color:var(--accent-2)]"
              animate={{ width: `${pct}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <div className="flex justify-between mt-2.5">
            <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-[color:var(--ink-soft)]">loading memories</span>
            <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-[color:var(--ink)]">{pct}%</span>
          </div>

          {/* playful init log */}
          <div className="mt-6 space-y-1.5 text-left min-h-[3.6rem]" data-testid="boot-log">
            {cfg.archive.log.map((l, i) =>
              pct >= logThresholds[i] ? (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`font-mono text-[0.62rem] tracking-[0.14em] ${l.includes("missing") || l.includes("me") ? "text-[color:var(--accent-2)]" : "text-[color:var(--ink-soft)]"}`}
                >
                  <span className="text-[color:var(--ink-faint)] mr-2">›</span>
                  {l}
                </motion.p>
              ) : null
            )}
          </div>
        </motion.div>

        <AnimatePresence>
          {pct >= 100 && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="mt-10"
            >
              <Btn onClick={next} data-testid="boot-enter">
                {cfg.archive.cta}
              </Btn>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Stage>
  );
}

/* ---------------- PRE-CHAPTER GATE ---------------- */
export function IntroStage({ cfg, next }) {
  return (
    <Stage testid="stage-intro">
      <div className="relative">
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
          <Label>{cfg.intro.kicker}</Label>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-serif font-semibold text-4xl sm:text-6xl leading-[1.05] mt-6"
        >
          {cfg.intro.line}
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-6 text-base text-[color:var(--ink-soft)] max-w-md">
          {cfg.intro.sub}
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-12">
          <Btn onClick={next} data-testid="intro-cta">
            {cfg.intro.cta}
          </Btn>
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="annotation text-lg absolute -right-2 sm:right-4 top-0 rotate-6 hidden sm:block px-3.5 py-1.5 rounded-[3px] paper-shadow"
          style={{ backgroundColor: "#4A3B2C", color: "var(--bg-light)" }}
        >
          this took a while, ok
        </motion.span>
      </div>
    </Stage>
  );
}

/* ---------------- OFFICIAL ASSESSMENT (score) ---------------- */
function Counter({ value, suffix, delay = 0.6 }) {
  const [v, setV] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (started.current) return;
      started.current = true;
      const dur = 1300;
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        setV(value * e);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [value, delay]);
  const out = Number.isInteger(value) ? Math.round(v) : v.toFixed(1);
  return (
    <span className="font-serif font-semibold text-2xl sm:text-3xl text-[color:var(--ink)] tabular-nums">
      {out}
      <span className="font-mono text-[0.62rem] tracking-[0.14em] text-[color:var(--ink-soft)] ml-1">{suffix}</span>
    </span>
  );
}

export function ScoreStage({ cfg, next }) {
  return (
    <Stage testid="stage-score" className="!justify-start pt-28 pb-24">
      <div className="w-full max-w-lg mx-auto">
        <Label>{cfg.score.kicker}</Label>
        <h2 className="font-serif font-semibold text-3xl sm:text-4xl mt-4">{cfg.score.title}</h2>
        <div className="mt-12 space-y-9">
          {cfg.score.rows.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.35, duration: 0.7 }}
              data-testid={`score-row-${i}`}
            >
              <div className="flex items-end justify-between gap-4 mb-2.5">
                <span className="text-sm sm:text-[0.95rem] text-[color:var(--ink)]">{r.label}</span>
                {r.type === "counter" ? (
                  <Counter value={r.value} suffix={r.suffix} delay={0.5 + i * 0.35} />
                ) : (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.35, duration: 0.5, ease: "backOut" }}
                    className="font-serif font-semibold text-2xl sm:text-3xl text-[color:var(--ink)] whitespace-nowrap"
                  >
                    {r.display}
                  </motion.span>
                )}
              </div>
              <div className="h-1 w-full bg-[color:var(--surface)] rounded-full overflow-hidden" style={{ border: "1px solid rgba(43,33,23,0.14)" }}>
                <motion.div
                  className="h-full rounded-full bg-[color:var(--accent-2)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${r.pct}%` }}
                  transition={{ delay: 0.5 + i * 0.35, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              {r.note && (
                <p className="font-mono text-[0.58rem] tracking-[0.2em] uppercase text-[color:var(--accent-2)] mt-1.5">
                  * {r.note}
                </p>
              )}
            </motion.div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Btn onClick={next} data-testid="score-cta">
            {cfg.score.cta}
          </Btn>
        </div>
      </div>
    </Stage>
  );
}

/* ---------------- QUIET TURNING POINT ---------------- */
export function QuietStage({ cfg, next }) {
  useEffect(() => {
    const t = setTimeout(next, 3200);
    return () => clearTimeout(t);
  }, [next]);
  return (
    <Stage testid="stage-quiet" bg="var(--bg-light)">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6 }}
        className="font-serif italic text-3xl sm:text-4xl text-center text-[color:var(--ink)]"
      >
        {cfg.quiet.line}
      </motion.p>
    </Stage>
  );
}

/* ---------------- CHAPTER 04 · THE REAL APOLOGY ---------------- */
export function ApologyStage({ cfg, next }) {
  return (
    <Stage testid="stage-apology" bg="var(--bg-light)" wide>
      <div className="grid sm:grid-cols-[1.1fr_0.8fr] gap-12 sm:gap-16 items-center">
        <div>
          <div className="space-y-7">
            {cfg.apology.lines.map((l, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.55, duration: 1.1 }}
                className="font-serif font-medium text-3xl sm:text-4xl leading-[1.25] text-[color:var(--ink)]"
                data-testid={`apology-line-${i}`}
              >
                {l}
              </motion.p>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + cfg.apology.lines.length * 0.55, duration: 1 }}
            className="annotation text-3xl mt-10"
          >
            {cfg.apology.annotation}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 + cfg.apology.lines.length * 0.55 }}
            className="mt-14"
          >
            <Btn onClick={next} data-testid="apology-cta">
              {cfg.apology.cta}
            </Btn>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6 }}
          className="bg-[color:var(--bg)] p-3 pb-4 paper-shadow rounded-[2px] rotate-1 max-w-lg mx-auto w-full"
        >
          <div className="relative aspect-[3/4] overflow-hidden bg-[color:var(--accent)]">
            <img src={cfg.heroPhoto.src} alt="us" className="absolute inset-0 w-full h-full object-cover photo-warm" />
            <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 70px rgba(43,33,23,0.2)" }} />
          </div>
          {cfg.heroPhoto.caption && <p className="annotation text-lg mt-2">{cfg.heroPhoto.caption}</p>}
        </motion.div>
      </div>
    </Stage>
  );
}

/* ---------------- FINAL QUESTION ---------------- */
export function FinalRequestStage({ cfg, next }) {
  const [view, setView] = useState("question");
  const f = cfg.finalRequest;

  if (view === "notsure") {
    return (
      <Stage testid="stage-notsure" bg="var(--bg-light)">
        <div className="text-center max-w-xl mx-auto">
          <div className="space-y-4">
            {f.notSurePage.lines.map((l, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.5, duration: 1 }}
                className="font-serif font-medium text-2xl sm:text-3xl leading-snug text-[color:var(--ink)]"
                data-testid={`notsure-line-${i}`}
              >
                {l}
              </motion.p>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + f.notSurePage.lines.length * 0.5, duration: 0.9 }}
            className="mt-12"
          >
            <Btn variant="ghost" onClick={() => setView("question")} data-testid="notsure-back">
              {f.notSurePage.back}
            </Btn>
          </motion.div>
        </div>
      </Stage>
    );
  }

  return (
    <Stage testid="stage-final" bg="var(--bg-light)">
      <div className="text-center max-w-xl mx-auto">
        <Label>{f.kicker}</Label>
        <motion.div initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4 }} className="mx-auto mt-8 w-64 sm:w-72 bg-[color:var(--bg)] p-2.5 pb-3 paper-shadow rounded-[2px] -rotate-2">
          <div className="relative aspect-[3/4] overflow-hidden bg-[color:var(--accent)]">
            <img src={cfg.heroPhoto.src} alt="us" className="absolute inset-0 w-full h-full object-cover photo-warm" />
          </div>
        </motion.div>
        <h2 className="font-serif font-semibold text-3xl sm:text-5xl mt-8 leading-tight">{f.line}</h2>
        <p className="mt-4 text-[color:var(--ink-soft)]">{f.sub}</p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6" data-testid="final-choice">
          <Btn size="lg" onClick={next} data-testid="final-yes">
            {f.yes}
          </Btn>
          <Btn size="lg" variant="ghost" onClick={() => setView("notsure")} data-testid="final-notsure">
            {f.notSure}
          </Btn>
        </div>
      </div>
    </Stage>
  );
}

/* ---------------- FINAL SCREEN — warm, not technical ---------------- */
export function UnlockStage({ cfg, restart, audioOn, onToggleAudio }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 1500);
    return () => clearTimeout(t);
  }, []);
  const u = cfg.unlock;

  return (
    <Stage testid="stage-unlock" bg="var(--bg-light)">
      <div className="text-center max-w-lg mx-auto py-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3"
        >
          <motion.span
            className="h-px w-10 bg-[color:var(--accent-2)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1 }}
          />
          <span className="font-mono text-[0.7rem] tracking-[0.32em] uppercase text-[color:var(--accent-2)]" data-testid="unlock-status">
            {u.status}
          </span>
          <motion.span
            className="h-px w-10 bg-[color:var(--accent-2)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1 }}
          />
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }}>
              <motion.div
                initial={{ opacity: 0, scale: 1.06, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 2 }}
                transition={{ duration: 1.4, delay: 0.2 }}
                className="mx-auto mt-10 w-64 sm:w-80 bg-[color:var(--bg)] p-2.5 pb-3 paper-shadow rounded-[2px]"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[color:var(--accent)]">
                  <img src={cfg.heroPhoto.src} alt="us" className="absolute inset-0 w-full h-full object-cover photo-warm" />
                </div>
                {cfg.heroPhoto.caption && <p className="annotation text-base mt-1.5">{cfg.heroPhoto.caption}</p>}
              </motion.div>

              <div className="mt-10 space-y-3">
                {u.lines.map((l, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.5, duration: 1 }}
                    className="font-serif font-medium text-2xl sm:text-3xl leading-snug text-[color:var(--ink)]"
                  >
                    {l}
                  </motion.p>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + u.lines.length * 0.5, duration: 1.2 }}
                className="annotation text-3xl mt-8"
                data-testid="unlock-closer"
              >
                {u.closer}
              </motion.p>

              {u.audioSrc ? (
                <div className="mt-10 inline-flex flex-col items-center gap-2">
                  <button
                    data-testid="audio-toggle"
                    onClick={onToggleAudio}
                    className="rounded-full px-5 py-2 font-mono text-[0.62rem] tracking-[0.2em] uppercase text-[color:var(--ink)] hover:bg-[color:var(--surface)] transition-colors"
                    style={{ border: "1px solid rgba(43,33,23,0.35)" }}
                  >
                    {audioOn ? "pause" : "play"} · {u.songTitle}
                  </button>
                  <span className="label">{u.songTitle} — {u.songArtist}</span>
                </div>
              ) : (
                <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[color:var(--ink-soft)] mt-10">
                  ♪ {u.songTitle} — {u.songArtist} · (add your clip in config)
                </p>
              )}

              <div className="mt-12">
                <button onClick={restart} data-testid="restart-button" className="font-mono text-[0.62rem] tracking-[0.2em] uppercase text-[color:var(--ink-faint)] hover:text-[color:var(--ink)] transition-colors">
                  ↺ {u.restart}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Stage>
  );
}
