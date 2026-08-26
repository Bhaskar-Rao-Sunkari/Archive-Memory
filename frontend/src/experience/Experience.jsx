import React, { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Grain from "../components/Grain";
import ShareButton from "./ShareButton";
import ArchiveTransition from "./ArchiveTransition";
import {
  BootStage, IntroStage, ProblemStage, ConfessionStage, MemoriesStage,
  LostStage, EarnStage, ScoreStage, ApologyStage, FinalRequestStage, UnlockStage,
} from "./Stages";

export default function Experience({ cfg }) {
  const [step, setStep] = useState(0);
  const next = useCallback(() => {
    setStep((s) => s + 1);
    window.scrollTo({ top: 0 });
  }, []);
  const restart = useCallback(() => setStep(0), []);

  const steps = [
    (k) => <BootStage key={k} cfg={cfg} next={next} />,
    (k) => <IntroStage key={k} cfg={cfg} next={next} />,
    (k) => <ProblemStage key={k} cfg={cfg} next={next} />,
    (k) => <ConfessionStage key={k} cfg={cfg} next={next} />,
    (k) => <MemoriesStage key={k} cfg={cfg} next={next} />,
    (k) => <ArchiveTransition key={k} testid="transition-missing" text={cfg.archive.missing} onDone={next} />,
    (k) => <LostStage key={k} cfg={cfg} next={next} />,
    (k) => <EarnStage key={k} cfg={cfg} next={next} />,
    (k) => <ScoreStage key={k} cfg={cfg} next={next} />,
    (k) => <ArchiveTransition key={k} testid="transition-lost" text={cfg.archive.lost} tone="dark" onDone={next} />,
    (k) => <ApologyStage key={k} cfg={cfg} next={next} />,
    (k) => <FinalRequestStage key={k} cfg={cfg} next={next} />,
    (k) => <UnlockStage key={k} cfg={cfg} restart={restart} />,
  ];

  const idx = Math.min(step, steps.length - 1);

  return (
    <div className="relative min-h-screen vignette" data-testid="experience-root">
      <Grain />
      <AnimatePresence mode="wait">{steps[idx](`step-${idx}`)}</AnimatePresence>
      <ShareButton cfg={cfg} />
    </div>
  );
}
