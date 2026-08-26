// =====================================================================
//  MEMORY ARCHIVE — EDITABLE CONTENT
//  Everything you might want to change lives here: text, photos, captions.
//  Swap the `src` values below with your own photo URLs (or /images/*.jpg).
// =====================================================================

export const config = {
  // ---- Archive system messages (cinematic interludes) ----
  archive: {
    boot: "INITIALISING MEMORY ARCHIVE",
    missing: "INFINITE MEMORY MISSING",
    lost: "MEMORY LOST",
  },

  // ---- The four chapters of the story ----
  chapters: [
    {
      n: "01",
      title: "The Confession",
      sub: "the part where I admit what I did",
      cta: "Open Chapter 01",
    },
    {
      n: "02",
      title: "What Survived",
      sub: "not everything is gone. promise.",
      cta: "Open Chapter 02",
    },
    {
      n: "03",
      title: "The Negotiation",
      sub: "in which I attempt to earn it back",
      cta: "Open Chapter 03",
    },
    {
      n: "04",
      title: "The Real Apology",
      sub: "no more jokes. mostly.",
      cta: "Open Chapter 04",
    },
  ],

  // ---- Current-year photos (placeholders — replace src with real ones) ----
  // orientation just hints the frame ratio: "portrait" | "landscape"
  photos: [
    {
      src: "https://images.unsplash.com/photo-1758225104742-718edea1f371?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
      caption: "the one where neither of us stopped laughing",
      note: "// placeholder — swap me",
      orientation: "portrait",
    },
    {
      src: "https://images.unsplash.com/photo-1532969200589-57f1fe57aaab?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
      caption: "we stayed until the light went gold",
      note: "found: this year",
      orientation: "landscape",
    },
    {
      src: "https://images.unsplash.com/photo-1583606784123-7c244f00d29c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
      caption: "you insisted on this exact spot",
      note: "// placeholder",
      orientation: "portrait",
    },
    {
      src: "https://images.pexels.com/photos/35867832/pexels-photo-35867832.jpeg?auto=compress&cs=tinysrgb&w=1200",
      caption: "somehow it got late again",
      note: "found: this year",
      orientation: "landscape",
    },
    {
      src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
      caption: "proof we still make new ones",
      note: "// keep this one",
      orientation: "landscape",
    },
  ],

  // The single strongest photo used in the quiet emotional section + final
  heroPhoto: {
    src: "https://images.unsplash.com/photo-1552334645-3f7a860728e8?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
    caption: "us — this year",
  },

  // ---- Copy blocks (intentionally vague & easy to edit) ----
  intro: {
    kicker: "PRIVATE ARCHIVE — ACCESS RESTRICTED TO ONE PERSON",
    line: "You already know why this exists.",
    sub: "Go slow. There are little things everywhere.",
    cta: "OPEN THE ARCHIVE",
  },

  problem: [
    "There was a collection of memories.",
    "Ours. From last year.",
    "And then… something happened to them.",
    "You know exactly what happened.",
  ],
  problemCta: "so, about that",

  confession: {
    line: "I deleted them.",
    sub: "The photos from last year. Gone. By my own two, deeply unqualified hands.",
    annotation: "in my defence, I have no defence.",
    cta: "I know. keep going.",
  },

  memoriesIntro: {
    kicker: "WHAT I STILL HAVE",
    line: "But not everything is gone.",
    sub: "Tap each one.",
  },

  lostReveal: {
    line: "The ones from last year, though —",
    sub: "those I can't get back on my own. Only you have them now.",
  },

  earnIt: {
    kicker: "MEMORY RECOVERY REQUEST",
    fields: [
      ["Applicant", "me (the culprit)"],
      ["Reason for request", "deleted the memories"],
      ["Current standing", "under review"],
      ["Regret", "extremely high"],
      ["Common sense during deletion", "under investigation"],
      ["Effort to recover", "suspiciously high"],
      ["Approval", "PENDING"],
    ],
    question: "Does the applicant deserve to have their request reviewed?",
  },

  score: {
    kicker: "MEMORY RECOVERY SCORE",
    rows: [
      { label: "Apology", value: 100, display: "100%" },
      { label: "Regret", value: 100, display: "100%" },
      { label: "Common sense before deleting photos", value: 0, display: "0%" },
      { label: "Effort to fix the situation", value: 100, display: "100%" },
      { label: "Deserving of the archive", value: 62, display: "pending…" },
    ],
    cta: "okay, enough jokes",
  },

  apology: {
    lines: [
      "Deleting them was careless.",
      "And I know it hurt you — not because of the files,",
      "but because of what they held.",
      "Those weren't just photos.",
      "They were things we made together.",
    ],
    annotation: "I'm sorry. Genuinely.",
    cta: "one last thing",
  },

  finalRequest: {
    kicker: "RECOVERY REQUEST — FINAL STEP",
    line: "Would you send me the ones from last year?",
    sub: "That's the whole reason for all of this.",
    yes: "RELEASE THE ARCHIVE",
    no: "not a chance",
  },

  unlock: {
    from: "LOCKED",
    to: "RECOVERED",
    line: "Archive restored.",
    sub: "Now go check your messages — and maybe forgive me.",
    // Optional: drop your own audio file at /public/audio and set path here.
    // Song reference (audio not included): "Memories" — Maroon 5.
    songTitle: "Memories",
    songArtist: "Maroon 5",
    audioSrc: "", // e.g. "/audio/memories.mp3" — leave "" to hide the player
    restart: "replay the archive",
  },
};
