import React from "react";

// Fixed, extremely subtle film grain + vignette applied over the whole app.
export default function Grain() {
  return <div className="grain-layer" aria-hidden="true" data-testid="grain-layer" />;
}
