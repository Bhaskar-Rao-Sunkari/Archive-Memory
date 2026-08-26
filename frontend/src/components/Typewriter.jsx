import React, { useEffect, useState, useRef } from "react";

// Character-by-character typewriter. Calls onDone when finished.
export default function Typewriter({ text, speed = 45, className = "", cursor = true, onDone, start = true }) {
  const [out, setOut] = useState("");
  const doneRef = useRef(false);

  useEffect(() => {
    if (!start) return;
    setOut("");
    doneRef.current = false;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        if (!doneRef.current) {
          doneRef.current = true;
          onDone && setTimeout(onDone, 350);
        }
      }
    }, speed);
    return () => clearInterval(id);
    // eslint-disable-next-line
  }, [text, start]);

  return (
    <span className={`${className} ${cursor && out.length < text.length ? "blink" : ""}`} data-testid="typewriter">
      {out}
    </span>
  );
}
