import React, { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Grain from "../components/Grain";
import ShareButton from "./ShareButton";
import ArchiveTransition from "./ArchiveTransition";
import ChapterOpener from "./ChapterOpener";
import Chapter01 from "./chapters/Chapter01";
import Chapter02 from "./chapters/Chapter02";
import Chapter03 from "./chapters/Chapter03";
import { config as baseConfig } from "./config";
import {
  BootStage, IntroStage, ScoreStage, QuietStage,
  ApologyStage, FinalRequestStage, UnlockStage,
} from "./Stages";

export default function Experience({ cfg }) {
  const [step, setStep] = useState(0);
  const [audioOn, setAudioOn] = useState(false);
  const audioRef = useRef(null);
  const audioUnlockedRef = useRef(false);

  const next = useCallback(() => {
    // Prime audio playback on the very first genuine tap/click of the whole
    // experience — some mobile browsers (notably iOS Safari) only allow a
    // media element to be played programmatically later in the session if
    // it was first played (even silently) directly inside a real user
    // gesture like this one.
    if (!audioUnlockedRef.current && audioRef.current) {
      audioUnlockedRef.current = true;
      const a = audioRef.current;
      a.play().then(() => a.pause()).catch(() => {});
    }
    setStep((s) => s + 1);
  }, []);
  const restart = useCallback(() => setStep(0), []);

  const toggleAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setAudioOn(true)).catch(() => {});
    } else {
      audio.pause();
      setAudioOn(false);
    }
  }, []);

  const chapters = cfg.chapters || baseConfig.chapters;
  const [ch1, ch2, ch3, ch4] = chapters;

  const steps = [
    { ch: null, el: (k) => <BootStage key={k} cfg={cfg} next={next} /> },
    { ch: null, el: (k) => <IntroStage key={k} cfg={cfg} next={next} /> },
    { ch: ch1, el: (k) => <ChapterOpener key={k} chapter={ch1} next={next} /> },
    { ch: ch1, el: (k) => <Chapter01 key={k} cfg={cfg} next={next} /> },
    { ch: ch2, el: (k) => <ChapterOpener key={k} chapter={ch2} next={next} /> },
    { ch: ch2, el: (k) => <Chapter02 key={k} cfg={cfg} next={next} /> },
    { ch: null, el: (k) => <ArchiveTransition key={k} testid="transition-missing" text={cfg.archive.missing} onDone={next} /> },
    { ch: ch3, el: (k) => <ChapterOpener key={k} chapter={ch3} next={next} /> },
    { ch: ch3, el: (k) => <Chapter03 key={k} cfg={cfg} next={next} /> },
    { ch: ch3, el: (k) => <ScoreStage key={k} cfg={cfg} next={next} /> },
    { ch: null, el: (k) => <QuietStage key={k} cfg={cfg} next={next} /> },
    { ch: null, el: (k) => <ArchiveTransition key={k} testid="transition-lost" text={cfg.archive.lost} tone="dark" onDone={next} /> },
    { ch: ch4, el: (k) => <ChapterOpener key={k} chapter={ch4} next={next} tone="dark" /> },
    { ch: ch4, el: (k) => <ApologyStage key={k} cfg={cfg} next={next} />, audioStart: true },
    { ch: ch4, el: (k) => <FinalRequestStage key={k} cfg={cfg} next={next} /> },
    { ch: ch4, el: (k) => <UnlockStage key={k} cfg={cfg} restart={restart} audioOn={audioOn} onToggleAudio={toggleAudio} /> },
  ];

  const idx = Math.min(step, steps.length - 1);
  const current = steps[idx];

  // Start the song the moment Chapter 4 (Real Apology) begins, and let it
  // keep playing — looped — through the final question and unlock screens
  // without restarting on each page. Stepping back out of that range (e.g.
  // on restart) stops and resets it.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !cfg.unlock.audioSrc) return;
    const startIdx = steps.findIndex((s) => s.audioStart);
    if (startIdx !== -1 && idx >= startIdx) {
      if (audio.paused) {
        audio.play().then(() => setAudioOn(true)).catch(() => {});
      }
    } else if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
      setAudioOn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  return (
    <div className="relative min-h-screen vignette" data-testid="experience-root">
      <Grain />
      {cfg.unlock.audioSrc && <audio ref={audioRef} src={cfg.unlock.audioSrc} loop preload="auto" data-testid="background-audio" />}
      <AnimatePresence mode="wait">
        {current.ch && (
          <motion.div
            key={current.ch.n}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="fixed top-4 left-4 sm:left-8 z-40 flex items-center gap-3 pointer-events-none px-2.5 py-1.5 rounded-sm bg-[color:var(--bg)]/70 backdrop-blur-[2px]"
            data-testid="chapter-marker"
          >
            <span className="font-mono text-[0.6rem] tracking-[0.28em] uppercase text-[color:var(--ink-faint)]">
              CH {current.ch.n} / 04
            </span>
            <span className="hidden sm:inline font-serif italic text-sm text-[color:var(--ink-faint)]">
              {current.ch.title}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">{current.el(`step-${idx}`)}</AnimatePresence>
      <ShareButton cfg={cfg} />
    </div>
  );
}
