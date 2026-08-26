// =====================================================================
//  MEMORY ARCHIVE — EDITABLE CONTENT
//  Everything you might want to change lives here: text, photos, captions.
//  Swap the `src` values below with your own photo URLs (or /images/*.jpg).
// =====================================================================

export const config = {
  // ---- Archive system messages (cinematic interludes) ----
  archive: {
    boot: "INITIALISING MEMORY ARCHIVE",
    log: [
      "Something is missin----  Memories",
      "The real culprit for this is me",
    ],
    cta: "okay… let's do this",
    missing: "INFINITE MEMORY MISSING",
    lost: "MEMORY LOST",
  },

  // ---- The four chapters of the story ----
  chapters: [
    {
      n: "01",
      title: "The Confession",
      sub: "the part where I admit what I did",
      cta: "let's hear it, then",
    },
    {
      n: "02",
      title: "What Survived",
      sub: "not everything is gone. promise.",
      cta: "show me what's left",
    },
    {
      n: "03",
      title: "The Negotiation",
      sub: "in which I attempt to earn it back",
      cta: "let's negotiate",
    },
    {
      n: "04",
      title: "The Real Apology",
      sub: "no more jokes. mostly.",
      cta: "go on…",
    },
  ],

  // ---- Current-year photos (placeholders — replace src with real ones) ----
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

  // ---- Pre-chapter gate ----
  intro: {
    kicker: "PRIVATE ARCHIVE — ACCESS RESTRICTED TO ONE PERSON",
    line: "You already know why this exists.",
    sub: "Go slow. There are little things everywhere.",
    cta: "I have some explaining to do",
  },

  // ---- Chapter 01 — The Confession (scroll story) ----
  problem: {
    stamp: "FILE · CORRUPTED",
    scrollHint: "scroll — it gets worse",
    lines: [
      "There was a collection of memories.",
      "Ours. From last year.",
      "And then… something happened to them.",
      "You know exactly what happened.",
    ],
    marginNote: "// this is the bad part",
  },

  confession: {
    kicker: "THE PART WHERE I ADMIT IT",
    line: "I deleted them.",
    sub: "The photos from last year. Gone. By my own two, deeply unqualified hands.",
    annotation: "in my defence, I have no defence.",
    cta: "and the rest of the photos?",
  },

  // ---- Chapter 02 — What Survived ----
  memoriesIntro: {
    kicker: "WHAT I STILL HAVE",
    line: "But not everything is gone.",
    sub: "tap each one. they're worth it.",
    aside: "little proof we're still good at this",
  },

  lostReveal: {
    lines: [
      "The ones from last year, though —",
      "those I can't get back on my own.",
      "Only you have them now.",
    ],
    cta: "so what now?",
  },

  // ---- Chapter 03 — The Negotiation ----
  earnIt: {
    kicker: "MEMORY RECOVERY REQUEST",
    formTitle: "FORM 404 — MEMORY RECOVERY REQUEST",
    stamp: "UNDER REVIEW",
    fields: [
      ["Applicant", "me (the culprit)"],
      ["Reason for request", "deleted the memories"],
      ["Request", "access to the lost archive"],
      ["Regret", "extremely high"],
      ["Common sense during deletion", "under investigation"],
      ["Effort to recover", "suspiciously high"],
      ["Current status", "UNDER REVIEW"],
    ],
    swipeHint: "there's a formal application attached",
    letter: {
      tag: "APPLICATION № 001",
      to: ["To,", "The Respected Bansal Baby,", "Department of Last Year's Photos."],
      body: [
        "Respected Baby,",
        "I, the undersigned, hereby formally apologise for the Incident. I write to humbly request re-issuance of the lost archive, which was misplaced due to circumstances entirely within my control.",
        "If approved, I promise to guard it with both hands and at least 60% more common sense.",
      ],
      signoff: ["Yours regretfully,", "Bhaskar aka Rey"],
    },
    question: "Does the applicant deserve to have their request reviewed?",
    yes: "fine… I'm listening",
    no: "no.",
    afterYes: "knew you'd come around.",
    cta: "see the official assessment",
  },

  score: {
    kicker: "OFFICIAL ASSESSMENT",
    title: "The applicant has been evaluated.",
    rows: [
      { label: "Apology", type: "counter", value: 7, suffix: " / 10", pct: 70 },
      { label: "Regret", type: "counter", value: 10, suffix: " / 10", pct: 100 },
      { label: "Common sense before deleting the photos", type: "counter", value: 0, suffix: " / 10", pct: 0, note: "under investigation" },
      { label: "Effort to fix the situation", type: "static", display: "∞ / 10", pct: 100 },
      { label: "Chances of forgiveness", type: "static", display: "it's in you.", pct: 62 },
    ],
    cta: "alright — the serious part",
  },

  // ---- Turning point ----
  quiet: {
    line: "okay. no more jokes.",
  },

  // ---- Chapter 04 — The Real Apology ----
  apology: {
    lines: [
      "Deleting them was careless and the dumbest decision I ever made.",
      "Because of that, I know I don't deserve to have them.",
      "But do I deserve a chance? Forgiveness?",
    ],
    annotation: "I'm genuinely sorry.",
    cta: "can I ask you something?",
  },

  finalRequest: {
    kicker: "ONE LAST QUESTION",
    line: "Would you send me the photos from last year again?",
    sub: "That's the whole reason for all of this.",
    yes: "RELEASE THE ARCHIVE",
    notSure: "not sure",
    notSurePage: {
      lines: [
        "It's okay. It's a big mistake. I understand.",
        "I'll try my best to earn the pictures and get those back.",
        "I'll keep trying every single day.",
        "I'm truly sorry.",
      ],
      back: "okay… ask me again",
    },
  },

  // ---- Final screen ----
  unlock: {
    status: "ARCHIVE UNLOCKED",
    lines: [
      "Thank you for making me work for them.",
      "I promise I won't be stupid with them again.",
    ],
    closer: "thank you. 🤎",
    // Optional: drop your own audio file at /public/audio and set path here.
    // Song reference (audio not included): "Memories" — Maroon 5.
    songTitle: "Memories",
    songArtist: "Maroon 5",
    audioSrc: "", // e.g. "/audio/memories.mp3" — leave "" to hide the player
    restart: "replay the archive",
  },
};
