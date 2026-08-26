# Memory Archive — Private Interactive Apology Experience

## Original Problem
A private, interactive, emotionally playful single-page experience for one friend: a warm nostalgic-beige "memory archive" that moves from playful → nostalgic → sincere, ending in a request for last year's deleted photos. Refinement brief demanded: real interactivity (not an article), progressive archive system messages, a dodging NO button, micro-details, photo reveals, funny "earn it" negotiation, quiet emotional apology, earned final request + unlock.

## User Choices
- Placeholder photos (easy to swap in `config.js`)
- Vague, editable copy
- Photo count: "surprise me" → 5 memory slots + 1 hero photo
- No autoplay audio; optional drop-in clip slot on final screen. Song credit only ("Memories — Maroon 5"); NO lyrics/audio embedded (copyright). User adds own file via `config.unlock.audioSrc`.
- Saved/shareable via link → lightweight backend

## Architecture
- Frontend: React + framer-motion, step-based full-screen stages with AnimatePresence, film-grain + vignette overlays, Cormorant Garamond / Inter / JetBrains Mono.
- Backend: FastAPI + MongoDB. `POST /api/archive` (save config → id), `GET /api/archive/{id}`.
- Routes: `/` default experience; `/a/:id` shared personalized experience.

## Journey (13 steps)
Boot(INITIALISING) → Intro → Problem(progressive reveal) → Confession → Memories(photo reveals) → T:INFINITE MEMORY MISSING → Lost reveal → Earn It(form + moving NO) → Recovery Score(animated bars) → T:MEMORY LOST(dark) → Apology(quiet, hero photo) → Final Request(moving NO, RELEASE THE ARCHIVE) → Unlock(LOCKED→RECOVERED).

## Implemented (2026-08-26)
- All 13 stages, cinematic transitions, typewriter, film grain, vignette
- Moving NO button (mouse+touch, escalating dodge, quips) used selectively (earn + final)
- Photo reveal cards with warm treatment, captions, notes; masonry gallery
- Animated recovery score; playful "MEMORY RECOVERY REQUEST" form
- Backend save/share link + `/a/:id` loader; ShareButton copies private link
- All editable content centralized in `/app/frontend/src/experience/config.js`
- Verified end-to-end (curl + desktop/mobile screenshots), no horizontal overflow

## V2 Cinematic Chapter Redesign (2026-06, user-approved mapping)
- Strict 4-chapter structure with full-screen cinematic openers (`ChapterOpener.jsx`): giant serif watermark number, ruled "CHAPTER 0N" label, masked word-by-word title reveal, story CTA ("Open Chapter 0N")
- Chapters: 01 The Confession · 02 What Survived · 03 The Negotiation · 04 The Real Apology (dark tone opener after MEMORY LOST)
- Persistent chapter marker HUD top-left ("CH 0N / 04 · title"), hidden on prologue/transitions
- Contrast fix: --ink #2B2117, soft/faint opacities raised, --accent-2 #6E5941; display headings bumped to font-semibold
- Story buttons: "step inside", "but wait — there's a catch", chapter CTAs
- 17-step flow verified 100% by testing agent (iteration_1.json): full journey, both moving NO buttons, dark CH04 opener, share link POST/GET, mobile no-overflow

## Backlog (P1/P2)
- Optional per-photo handwritten note editor UI
- Lenis momentum scroll on gallery
- Persist progress / resume
- Real audio clip upload via object storage

## Editing Guide
Swap photos + all copy in `config.js`. Add final-screen music by placing a file in `/public/audio` and setting `config.unlock.audioSrc`.
