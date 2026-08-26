import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Experience from "@/experience/Experience";
import { config as defaultConfig } from "@/experience/config";
import { loadArchive } from "@/experience/api";

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <span className="label" data-testid="loader">retrieving archive…</span>
    </div>
  );
}

function SharedExperience() {
  const { id } = useParams();
  const [cfg, setCfg] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    loadArchive(id)
      .then((c) => alive && setCfg(c))
      .catch(() => alive && setFailed(true));
    return () => { alive = false; };
  }, [id]);

  if (failed) return <Experience cfg={defaultConfig} />;
  if (!cfg) return <Loader />;
  return <Experience cfg={cfg} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Experience cfg={defaultConfig} />} />
        <Route path="/a/:id" element={<SharedExperience />} />
      </Routes>
    </BrowserRouter>
  );
}
