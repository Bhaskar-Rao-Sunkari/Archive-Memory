import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stage, Btn, Label, Stamp, fadeUp } from "./ui";
import Typewriter from "../components/Typewriter";
import PhotoReveal from "./PhotoReveal";
import MovingNoButton from "./MovingNoButton";

/* ---------------- 0 · BOOT ---------------- */
export function BootStage({ cfg, next }) {
  const [phase, setPhase] = useState(0); // 0 typing, 1 progress done
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
    }, 22);
    return () => clearInterval(id);
  }, [phase]);

  return (
    <Stage testid="stage-boot">
      <div className="flex flex-col items-center text-center">
        <Stamp className="mb-10">ARCHIVE v.01</Stamp>
        <h1 className="font-mono text-sm sm:text-lg tracking-[0.3em] text-[color:var(--ink)]">
          <Typewriter text={`${cfg.archive.boot}…`} speed={65} onDone={() => setPhase(1)} />
        </h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          className="mt-10 w-56 max-w-[70vw]"
        >
          <div className="h-px w-full bg-[color:var(--line)] relative overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-[color:var(--accent-2)]"
              animate={{ width: `${pct}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <Label>loading memories</Label>
            <Label>{pct}%</Label>
          </div>
        </motion.div>

        <AnimatePresence>
          {pct >= 100 && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="mt-12"
            >
              <Btn onClick={next} data-testid="boot-enter">
                enter
              </Btn>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Stage>
  );
}

/* ---------------- 1 · INTRO ---------------- */
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
          className="font-serif text-4xl sm:text-6xl leading-[1.05] mt-6"
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
          className="annotation text-lg absolute -right-2 sm:right-4 top-0 rotate-6 hidden sm:block"
        >
          this took a while, ok
        </motion.span>
      </div>
    </Stage>
  );
}

/* ---------------- 2 · THE PROBLEM (progressive reveal) ---------------- */
export function ProblemStage({ cfg, next }) {
  const lines = cfg.problem;
  const [shown, setShown] = useState(1);
  const done = shown >= lines.length;

  return (
    <Stage testid="stage-problem">
      <Stamp className="mb-10">FILE · CORRUPTED</Stamp>
      <div className="space-y-5">
        {lines.slice(0, shown).map((l, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`font-serif leading-tight ${i === lines.length - 1 ? "text-3xl sm:text-4xl text-[color:var(--ink)]" : "text-2xl sm:text-3xl text-[color:var(--ink-soft)]"}`}
          >
            {l}
          </motion.p>
        ))}
      </div>
      <div className="mt-12">
        {done ? (
          <Btn onClick={next} data-testid="problem-cta">
            {cfg.problemCta}
          </Btn>
        ) : (
          <button
            data-testid="problem-reveal"
            onClick={() => setShown((s) => s + 1)}
            className="group inline-flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.2em] uppercase text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] transition-colors"
          >
            <span className="w-8 h-px bg-[color:var(--accent-2)] group-hover:w-12 transition-all" />
            reveal
          </button>
        )}
      </div>
    </Stage>
  );
}

/* ---------------- 3 · CONFESSION ---------------- */
export function ConfessionStage({ cfg, next }) {
  const [typed, setTyped] = useState(false);
  return (
    <Stage testid="stage-confession">
      <Label>THE PART WHERE I ADMIT IT</Label>
      <h2 className="font-serif text-5xl sm:text-7xl mt-6 leading-none">
        <Typewriter text={cfg.confession.line} speed={80} onDone={() => setTyped(true)} />
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
    </Stage>
  );
}

/* ---------------- 4 · MEMORIES ---------------- */
export function MemoriesStage({ cfg, next }) {
  const [revealed, setRevealed] = useState(0);
  return (
    <Stage testid="stage-memories" className="!justify-start pt-24">
      <div className="text-center mb-12">
        <Label>{cfg.memoriesIntro.kicker}</Label>
        <h2 className="font-serif text-4xl sm:text-5xl mt-4">{cfg.memoriesIntro.line}</h2>
        <p className="annotation text-xl mt-3">{cfg.memoriesIntro.sub}</p>
      </div>
      <div className="columns-1 sm:columns-2 gap-6 [&>*]:mb-6">
        {cfg.photos.map((p, i) => (
          <div key={i} className="break-inside-avoid">
            <PhotoReveal photo={p} index={i} rotate={i % 2 === 0 ? -1.4 : 1.6} onReveal={() => setRevealed((r) => Math.max(r, i + 1))} />
          </div>
        ))}
      </div>
      <div className="text-center mt-14 mb-8">
        <Btn onClick={next} data-testid="memories-cta" variant={revealed > 0 ? "solid" : "ghost"}>
          keep going
        </Btn>
      </div>
    </Stage>
  );
}

/* ---------------- 6 · LOST REVEAL ---------------- */
export function LostStage({ cfg, next }) {
  return (
    <Stage testid="stage-lost">
      <div className="max-w-xl">
        <motion.h2 variants={fadeUp} initial="hidden" animate="show" custom={0} className="font-serif text-3xl sm:text-5xl leading-tight">
          {cfg.lostReveal.line}
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={1} className="mt-6 text-lg text-[color:var(--ink-soft)]">
          {cfg.lostReveal.sub}
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-12">
          <Btn onClick={next} data-testid="lost-cta">
            so here's my case
          </Btn>
        </motion.div>
      </div>
    </Stage>
  );
}

/* ---------------- 7 · EARN IT ---------------- */
export function EarnStage({ cfg, next }) {
  const [answered, setAnswered] = useState(false);
  return (
    <Stage testid="stage-earn" className="!justify-start pt-24">
      <div className="w-full max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Label>{cfg.earnIt.kicker}</Label>
          <Stamp>form 404</Stamp>
        </div>
        <div className="bg-[color:var(--surface)] hairline rounded-md p-6 sm:p-8 paper-shadow">
          {cfg.earnIt.fields.map(([k, v], i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="flex items-baseline justify-between gap-4 py-2.5 border-b border-[color:var(--line)] last:border-0"
            >
              <span className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-[color:var(--ink-faint)]">{k}</span>
              <span className={`text-right ${v === "PENDING" ? "font-mono text-[0.7rem] tracking-[0.2em] text-[color:var(--accent-2)]" : "annotation text-lg"}`}>{v}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          {!answered ? (
            <>
              <p className="font-serif text-2xl sm:text-3xl mb-8">{cfg.earnIt.question}</p>
              <MovingNoButton yesLabel="obviously" noLabel="no" onYes={() => setAnswered(true)} testid="earn-choice" />
            </>
          ) : (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <p className="annotation text-2xl mb-8">knew you'd come around.</p>
              <Btn onClick={next} data-testid="earn-cta">
                see the assessment
              </Btn>
            </motion.div>
          )}
        </div>
      </div>
    </Stage>
  );
}

/* ---------------- 8 · SCORE ---------------- */
export function ScoreStage({ cfg, next }) {
  return (
    <Stage testid="stage-score" className="!justify-start pt-24">
      <div className="w-full max-w-lg mx-auto">
        <Label>{cfg.score.kicker}</Label>
        <div className="mt-10 space-y-7">
          {cfg.score.rows.map((r, i) => (
            <div key={r.label}>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-sm text-[color:var(--ink)] pr-4">{r.label}</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="font-mono text-[0.72rem] tracking-[0.15em] text-[color:var(--accent-2)]"
                >
                  {r.display}
                </motion.span>
              </div>
              <div className="h-1.5 w-full bg-[color:var(--surface)] rounded-full overflow-hidden hairline">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: r.value === 0 ? "#b34a3a" : "var(--accent-2)" }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${r.value}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Btn onClick={next} data-testid="score-cta">
            {cfg.score.cta}
          </Btn>
        </div>
      </div>
    </Stage>
  );
}

/* ---------------- 10 · APOLOGY (quiet) ---------------- */
export function ApologyStage({ cfg, next }) {
  return (
    <Stage testid="stage-apology" bg="var(--bg-light)">
      <div className="grid sm:grid-cols-[1fr_0.9fr] gap-10 items-center">
        <div>
          <div className="space-y-4">
            {cfg.apology.lines.map((l, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.5, duration: 1.1 }}
                className="font-serif text-2xl sm:text-3xl leading-snug text-[color:var(--ink)]"
              >
                {l}
              </motion.p>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + cfg.apology.lines.length * 0.5, duration: 1 }}
            className="annotation text-2xl mt-8"
          >
            {cfg.apology.annotation}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1 + cfg.apology.lines.length * 0.5 }} className="mt-12">
            <Btn onClick={next} data-testid="apology-cta">
              {cfg.apology.cta}
            </Btn>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 1.04 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.6 }} className="bg-[color:var(--bg)] p-3 pb-4 paper-shadow rounded-[2px] rotate-1">
          <div className="relative aspect-[3/4] overflow-hidden bg-[color:var(--accent)]">
            <img src={cfg.heroPhoto.src} alt={cfg.heroPhoto.caption} className="absolute inset-0 w-full h-full object-cover photo-warm" />
          </div>
          <p className="annotation text-lg mt-2">{cfg.heroPhoto.caption}</p>
        </motion.div>
      </div>
    </Stage>
  );
}

/* ---------------- 11 · FINAL REQUEST ---------------- */
export function FinalRequestStage({ cfg, next }) {
  return (
    <Stage testid="stage-final" bg="var(--bg-light)">
      <div className="text-center max-w-xl mx-auto">
        <Label>{cfg.finalRequest.kicker}</Label>
        <motion.div initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4 }} className="mx-auto mt-8 w-44 bg-[color:var(--bg)] p-2.5 pb-3 paper-shadow rounded-[2px] -rotate-2">
          <div className="relative aspect-square overflow-hidden bg-[color:var(--accent)]">
            <img src={cfg.heroPhoto.src} alt="us" className="absolute inset-0 w-full h-full object-cover photo-warm" />
          </div>
        </motion.div>
        <h2 className="font-serif text-3xl sm:text-5xl mt-8 leading-tight">{cfg.finalRequest.line}</h2>
        <p className="mt-4 text-[color:var(--ink-soft)]">{cfg.finalRequest.sub}</p>
        <div className="mt-12">
          <MovingNoButton yesLabel={cfg.finalRequest.yes} noLabel={cfg.finalRequest.no} onYes={next} testid="final-choice" />
        </div>
      </div>
    </Stage>
  );
}

/* ---------------- 12 · UNLOCK ---------------- */
export function UnlockStage({ cfg, restart }) {
  const [recovered, setRecovered] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRecovered(true), 1600);
    return () => clearTimeout(t);
  }, []);
  const u = cfg.unlock;
  return (
    <Stage testid="stage-unlock">
      <div className="text-center max-w-lg mx-auto">
        <Label>ARCHIVE STATUS</Label>
        <div className="mt-8 flex items-center justify-center gap-4 font-mono text-sm sm:text-lg tracking-[0.2em]">
          <span className="text-[color:var(--ink-faint)] line-through">{u.from}</span>
          <motion.span animate={{ x: recovered ? 0 : -6, opacity: recovered ? 1 : 0.3 }}>→</motion.span>
          <AnimatePresence mode="wait">
            {recovered && (
              <motion.span key="rec" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-[color:var(--accent-2)]" data-testid="recovered-label">
                {u.to}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {recovered && (
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
              <h2 className="font-serif text-4xl sm:text-6xl mt-10">{u.line}</h2>
              <p className="mt-5 text-lg text-[color:var(--ink-soft)]">{u.sub}</p>

              {u.audioSrc ? (
                <div className="mt-10 inline-flex flex-col items-center gap-2">
                  <button
                    data-testid="audio-toggle"
                    onClick={() => setAudioOn((v) => !v)}
                    className="hairline rounded-full px-5 py-2 font-mono text-[0.62rem] tracking-[0.2em] uppercase text-[color:var(--ink-soft)] hover:bg-[color:var(--surface)]"
                  >
                    {audioOn ? "pause" : "play a little"} · {u.songTitle}
                  </button>
                  <span className="label">{u.songTitle} — {u.songArtist}</span>
                  <audio src={u.audioSrc} autoPlay={false} loop muted={!audioOn} ref={(el) => { if (el) { audioOn ? el.play().catch(() => {}) : el.pause(); } }} />
                </div>
              ) : (
                <p className="label mt-10">♪ {u.songTitle} — {u.songArtist} · (add your clip in config)</p>
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
