import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link2, Check } from "lucide-react";
import { saveArchive } from "./api";

// Unobtrusive corner control: saves current config to backend and copies a
// private /a/:id link to share. No navbar — just one tiny affordance.
export default function ShareButton({ cfg }) {
  const [state, setState] = useState("idle"); // idle | saving | done

  const share = async () => {
    if (state === "saving") return;
    setState("saving");
    try {
      const id = await saveArchive(cfg);
      const url = `${window.location.origin}/a/${id}`;
      try {
        await navigator.clipboard.writeText(url);
      } catch (_) {}
      setState("done");
      setTimeout(() => setState("idle"), 2600);
    } catch (_) {
      setState("idle");
    }
  };

  return (
    <motion.button
      data-testid="share-button"
      onClick={share}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-4 right-4 z-[70] inline-flex items-center gap-2 px-3 py-2 rounded-full hairline bg-[color:var(--bg-light)]/80 backdrop-blur-sm font-mono text-[0.55rem] tracking-[0.2em] uppercase text-[color:var(--ink-soft)]"
    >
      {state === "done" ? <Check size={12} /> : <Link2 size={12} />}
      {state === "done" ? "link copied" : state === "saving" ? "saving…" : "private link"}
    </motion.button>
  );
}
