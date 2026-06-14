---
name: ux-design
description: >
  Senior UX/UI design guidance and review. Use whenever building, refining, or
  auditing anything user-facing — layout, spacing, typography, color, visual
  hierarchy, motion, component states, accessibility, responsive behavior, forms,
  empty/error/loading states, or general "make it look and feel better." Trigger
  when the user asks to improve look/feel/UX, polish a UI, review a design, build
  a component or page, fix styling, or apply design best practices. Standards are
  current as of 2026 (WCAG 2.2, INP, OKLCH, container queries).
---

# UX/UI Design — Senior Playbook

Act as a senior product designer who ships in code. Your job is not to decorate;
it's to make interfaces **clear, usable, accessible, and quietly polished**.
Taste here = restraint + consistency + respect for the user's time and abilities.

## Operating procedure

Work in this order. Skipping steps is how UIs end up pretty but unusable.

1. **Intent first.** What is the user trying to do on this screen, and what is the
   single most important action? Design the hierarchy around that. If you can't
   name the primary job, stop and ask.
2. **Inherit the system, don't reinvent.** Find the existing design tokens
   (colors, spacing, type, radii, shadows) and *use them*. Introduce a new token
   only when a real gap exists — never a magic one-off value. Consistency beats
   local cleverness every time.
3. **Structure before surface.** Get layout, spacing, and hierarchy right in
   grayscale first. Color and motion are the last 10%, not the first.
4. **Design every state**, not just the happy path: default, hover, focus-visible,
   active, disabled, loading, empty, error, success.
5. **Verify before declaring done** (non-negotiable): contrast passes, keyboard
   reaches and shows focus, works at 360px wide, honors reduced motion, no layout
   shift. See the checklist at the end.

## Decision principles (when rules conflict)

- **Clarity > cleverness.** If a clever interaction needs explaining, cut it.
- **Content-first.** The UI serves the content; chrome recedes.
- **One primary action per view.** Everything else is secondary/tertiary.
- **Constraints enable speed.** A tight token system is a feature, not a cage.
- **Accessibility is a requirement, not a tier.** It is never the thing you cut.
- **Consistency > novelty.** Match established patterns unless you have a strong,
  user-facing reason to diverge.
- **Reduce, then reduce again.** The best edit is usually removal.

## Aesthetic direction & distinctiveness

Usable-but-generic is a failure mode. Aim for interfaces that are both effortless
**and** unmistakably designed for *this* context. Distinctiveness and discipline
are partners, not opposites.

- **Commit to one point of view.** Before styling, name the aesthetic and execute
  it with precision: editorial/magazine, refined-luxury, brutalist/raw,
  organic/soft, retro-futuristic, playful, industrial/utilitarian, etc. Pick what
  fits the audience and brand. **Intentionality beats intensity** — refined-minimal
  and bold-maximal both win when deliberate; both fail when accidental.
- **Find the one memorable thing.** Each screen should have a single signature
  move someone remembers — a distinctive type treatment, a grid-breaking layout,
  an atmospheric background, a delightful load sequence. One, not five.
- **Avoid generic "AI-default" output:**
  - *Fonts:* don't reach for Inter/Roboto/Arial/system as the only option. Pair a
    characterful display face with a clean, legible body face.
  - *Color:* skip the purple-gradient-on-white cliché and timid, evenly-spread
    palettes. Commit to a dominant color with a sharp accent.
  - *Layout:* don't apply the same hero → three-cards → CTA skeleton with no point
    of view. Vary the composition; don't converge on the same trendy choice each time.
- **Match implementation effort to the vision.** Maximalist directions justify
  elaborate effects and orchestration; minimal/refined directions demand restraint
  and pixel-level precision. Elegance is the vision executed well — not the number
  of effects.
- **The non-negotiables still govern.** Distinctiveness serves the content and the
  user; it never overrides contrast, keyboard access, reduced-motion, performance,
  or clarity. A bold idea that fails WCAG or tanks INP isn't bold — it's broken.
  **Be daring with the point of view; disciplined with the fundamentals.**

---

## Layout & spacing

- **Base unit of 4px, rhythm of 8px.** All spacing/sizing should be multiples
  (4, 8, 12, 16, 24, 32, 48, 64…). No `13px`, no `arbitrary` gaps.
- **Whitespace is structural,** not leftover. Generous padding signals quality;
  cramped UIs read as cheap. When unsure, add space.
- **Group by proximity** (Gestalt): related things close, unrelated things apart.
  Spacing *between* groups > spacing *within* a group.
- **Measure (line length): 45–75 characters** for body text. Cap text containers
  (`max-w-prose` / ~65ch). Never let paragraphs run full-bleed on wide screens.
- **Align to a grid;** then make *optical* adjustments (icons, caps, punctuation
  often need a nudge the math doesn't catch).
- **Vertical rhythm:** consistent spacing scale between sections; don't eyeball
  each gap.

## Typography

- **One or two families max, chosen with intent.** Pair a *distinctive* display
  face with a highly readable body face. Don't default to Inter/Roboto/Arial/system
  as the only choice — pick something with character that fits the aesthetic, then
  confirm it stays legible at every size.
- **Modular scale.** Pick a ratio (1.20 minor third → 1.25 → 1.333 perfect
  fourth) and derive sizes from it instead of random numbers.
- **Fluid headings** with `clamp(min, preferred-vw, max)` so type scales smoothly
  across viewports without a dozen breakpoints.
- **Line-height:** ~1.5 for body, **1.1–1.25 for large headings** (tight). Long
  measure → more leading.
- **Letter-spacing:** slightly negative on big headings (`-0.01em` to `-0.02em`);
  slightly positive on small uppercase labels (`+0.05em`). Body stays at 0.
- **Hierarchy via weight + size + color,** not size alone. Two weights of one
  family create more order than five sizes.
- **Don't center multi-line paragraphs.** Center single lines/short headings only.

## Color & contrast

- **Use semantic roles, not raw hex at call sites:** `background`, `surface`,
  `foreground`, `muted`, `primary`, `accent`, `border`, `success/warn/danger`.
  This is what makes theming and dark mode trivial.
- **Contrast (WCAG 2.2):** **4.5:1** for normal text, **3:1** for large text
  (≥24px, or ≥19px bold) and for UI components/borders/icons. Aim *above* the
  minimum; minimum-passing gray-on-white still reads as weak.
- **Modern color:** prefer **OKLCH** for palettes (perceptually uniform — equal
  lightness steps actually look equal) and **`color-mix()`** for tints/shades and
  states instead of hand-picking hex.
- **60-30-10:** ~60% dominant/neutral, 30% secondary, 10% accent. **One** accent
  does the heavy lifting; more than one and nothing pops.
- **Commit, don't hedge.** A confident dominant + one sharp accent beats a timid,
  evenly-distributed palette. Avoid tired clichés (e.g., purple gradient on white).
- **Never encode meaning in color alone** (color-blind users). Pair with icon,
  text, or shape.
- **Dark mode:** not `#000`/`#fff`. Use near-black surfaces (raised surfaces get
  *lighter*, not shadowed) and slightly desaturated colors; pure saturated hues
  vibrate on dark.

## Theme starting points (palette + type pairings)

Principles need a head start. Keep a small library of **vetted, distinctive
themes** — each a cohesive palette mapped to semantic roles plus a font pairing —
to pick from or adapt, rather than assembling color and type from scratch (which
is how generic results happen). These are *starting points*, not straitjackets.

**Workflow:** choose the theme that fits the context (or generate a custom one in
the same shape) → show the palette + pairing for confirmation → wire it into the
token system (roles from *Color & contrast*, families from *Typography*) → verify
every fg/bg and text-on-fill pair against WCAG 2.2 (4.5:1 text, 3:1 large/UI;
deepen a hue if a fill needs white text).

Roles: `bg · surface · fg · muted · primary · accent · border`. Fonts are
distinctive Google families (display + readable body).

- **Editorial Ink** — magazine/editorial, longform, refined publishing.
  *Fraunces* + *Spectral*. bg `#faf7f2` · surface `#ffffff` · fg `#1b1b1a` ·
  muted `#6b6a66` · primary `#8a2b2b` · accent `#c2410c` · border `#e7e1d8`.
  Signature: high contrast, paper tones, hairline rules, big serif headlines.

- **Calm Clinical** — health, fintech, calm/trustworthy product.
  *Bricolage Grotesque* + *IBM Plex Sans*. bg `#f6f9fb` · surface `#ffffff` ·
  fg `#0f2a3a` · muted `#5a7180` · primary `#0e7c86` · accent `#f59e0b` ·
  border `#dbe6ec`. Signature: airy, soft shadows, calm teal, restraint.

- **Brutalist Mono** — bold statement, dev tools, portfolios.
  *Archivo (heavy)* + *JetBrains Mono*. bg `#ffffff` · surface `#f4f4f4` ·
  fg `#0a0a0a` · muted `#555555` · primary `#0a0a0a` · accent `#1f4cff` ·
  border `#0a0a0a`. Signature: hard 2px borders, zero radius, no shadows, mono labels.

- **Organic Soft** — wellness, kids, lifestyle, warmth.
  *Fraunces (soft opsz)* + *Nunito*. bg `#fffaf3` · surface `#ffffff` ·
  fg `#3a3a42` · muted `#7a7682` · primary `#c75e3f` · accent `#f0b429` ·
  border `#f0e7da`. Signature: rounded radii, gentle elevation, hand-warm tones.

- **Luxury Noir** — premium, fashion, dark elegance (dark theme).
  *Cormorant Garamond* + *Jost*. bg `#0e0e10` · surface `#17171a` · fg `#f3f0ea` ·
  muted `#9a958c` · primary `#c8a96a` · accent `#c8a96a` · border `#2a2a2e`.
  Signature: deep black, gold accent, high-contrast serif, generous space.

- **Retro Pop** — playful marketing, launches, energetic brand.
  *Unbounded* + *Manrope*. bg `#fef6e4` · surface `#ffffff` · fg `#172c66` ·
  muted `#5b668f` · primary `#d6452f` · accent `#2ec4b6` · border `#f3dca6`.
  Signature: chunky display, playful shapes, navy ink on cream, coral/teal pops.

To **generate a custom theme**, produce the same shape (name + when-to-use, a
display+body pairing, the seven roles) from the brief, show it for review, then
apply and verify contrast as above.

## Visual hierarchy

- **Squint test:** blur your eyes — the most important thing should still draw the
  eye. If everything is bold, nothing is.
- Guide attention with **size → weight → color → spacing**, roughly in that order
  of strength.
- Establish a clear **F/Z reading path**; put the primary action where the eye
  lands, not where there's empty space.

## Atmosphere, depth & composition

Flat solid-color blocks are a missed opportunity — but every effect must earn its
keep (performance + accessibility aware).

- **Backgrounds with depth, used sparingly:** subtle gradient meshes, low-opacity
  noise/grain, layered transparency, soft large-radius glows, fine geometric
  patterns. Never let texture fight the text — foreground contrast stays intact.
- **Composition beyond the grid — when context fits:** asymmetry, intentional
  overlap, diagonal flow, and grid-breaking accents create energy for brand,
  landing, and editorial work. Keep an underlying alignment logic so "broken"
  reads as deliberate. For dense product UI (dashboards, forms, tables), a strict
  grid and convention win — don't trade scanability for flair.
- **Depth via light, not weight:** soft, layered shadows and consistent elevation
  tokens over thick drop shadows; one or two elevation levels, one light source.
- **Orchestrate the entrance:** one well-staggered load reveal (~30–60ms apart)
  delights more than twitchy hover effects scattered everywhere — and still
  honors `prefers-reduced-motion`.

## Motion

Motion should **orient, give feedback, or express brand** — never decorate or
distract. Default to *less*.

- **Duration:** 150–250ms for most UI feedback; up to ~300–400ms for larger
  enters. Exits are faster than enters.
- **Easing:** `ease-out` (decelerate) for elements **entering**; `ease-in` for
  **exiting**; `ease-in-out` for moves between two on-screen states. A good
  general curve: `cubic-bezier(0.2, 0, 0, 1)`. **Avoid spring overshoot** unless
  the brand is explicitly playful — and even then, keep it subtle.
- **Performance:** animate **only `transform` and `opacity`** (compositor-only).
  Never animate `width/height/top/left/margin` — they cause layout/reflow jank.
- **For SVG sub-element rotation/scale,** set `transform-box: fill-box` and a
  `transform-origin` keyword/percentage relative to the element's own box —
  pixel origins against the default box are a common "it flew off" bug.
- **Always** honor `prefers-reduced-motion: reduce` — drop to a fade or to no
  motion. Never trap users in looping/auto-playing movement.
- Stagger lists sparingly (~30–60ms apart); long staggers feel slow.

## Components & states

- **Every interactive element needs the full set:** default, hover, **focus-visible**,
  active/pressed, disabled, and (where relevant) loading + error. Missing states
  are the #1 tell of unfinished UI.
- **Focus is sacred.** Always show a visible `:focus-visible` ring. If you remove
  the default outline, replace it with something equal or better. Never
  `outline: none` with no replacement.
- **Touch targets ≥ 44×44px** (comfortable) and **≥ 24×24px** (WCAG 2.2 minimum).
- **Affordance:** clickable things must *look* clickable; don't make text look
  like a button or a button look like text.
- **Loading:** prefer **skeletons** over spinners for content; keep the layout
  stable so nothing shifts when data arrives.
- **Empty states** are a design opportunity: explain what goes here + a clear next
  action. Never ship a blank box.
- **Errors:** say what happened, why, and how to fix it — next to the field, in
  plain language, tied to the input via `aria-describedby`.

## Accessibility (WCAG 2.2 — baseline, not bonus)

- **Semantic HTML first.** Real `<button>`, `<a>`, `<nav>`, `<main>`, `<h1–h6>` in
  order. ARIA only to fill gaps, never to paper over the wrong element.
- **Keyboard:** everything operable without a mouse; logical tab order; visible
  focus; manage focus on route change / modal open/close; no keyboard traps.
- **Labels:** every input has a real label (placeholder ≠ label). Associate errors
  and hints programmatically.
- **Images:** meaningful → descriptive `alt`; decorative → `alt=""` / `aria-hidden`.
- **Don't rely on color/motion/sound alone** to convey state.
- **Respect** `prefers-reduced-motion`, `prefers-contrast`, `prefers-color-scheme`.

## Responsive & layout adaptivity

- **Mobile-first.** Design the 360px view first; enhance up. Most real traffic is
  small-screen and thumb-driven.
- **Fluid > fixed** where possible: `clamp()`, `min()`, `max()`, `%`, and grid
  `minmax()` reduce breakpoint sprawl.
- **Container queries (`@container`)** for component-level responsiveness — a card
  should adapt to *its container*, not the viewport. This is the modern default
  over viewport media queries for reusable components.
- **Thumb zones:** primary mobile actions reachable in the lower/centre; avoid
  top-corner critical taps.

## Content & microcopy

- **Clear beats clever.** Buttons are **verb + object** ("Save changes",
  "Create account"), not "Submit" / "OK".
- **Sentence case** for most UI text; reserve Title Case for proper nouns/brand.
- Write for scanning: short, front-loaded, no jargon. Tell users what to do next.

## Performance UX (Core Web Vitals)

Perceived speed *is* UX. Targets: **LCP < 2.5s, INP < 200ms, CLS < 0.1**.

- **Prevent layout shift (CLS):** reserve dimensions for images, embeds, ads, and
  late-loading content. Set width/height or aspect-ratio.
- **Protect the LCP element** (usually the hero image/heading): prioritize it,
  don't lazy-load it.
- **Keep INP low:** avoid heavy work on tap/click; give immediate visual feedback;
  defer non-critical JS.
- **Optimistic UI** and skeletons make the same latency *feel* faster.

---

## Anti-patterns — push back when you see these

- Removing focus outlines; low-contrast light-gray body text.
- Magic-number spacing; inconsistent gaps that ignore the scale.
- More than one primary CTA competing on a screen.
- Centered long paragraphs; text running edge-to-edge with no max width.
- Placeholder text used *as* the label.
- Carousels/auto-rotators for important content (most users never see slide 2).
- Animation that loops, autoplays, overshoots, or fires on every scroll.
- Animating layout properties; jank from `box-shadow`/`width` transitions.
- Dated surface trends as a crutch: heavy glassmorphism, neumorphism, drop
  shadows on everything, rainbow gradients. Modern = clean, content-first, subtle
  depth, generous space.
- Generic AI-default look: Inter/system font on a white page, purple-on-white
  gradients, and the same hero → three-cards → CTA template with no point of view.
- Color as the *only* signal for status or required fields.

## Modern CSS toolkit (use where supported)

`clamp()/min()/max()` fluid sizing · `@container` queries · `:has()` relational
styling · `oklch()` + `color-mix()` color · logical properties
(`margin-inline`, `padding-block`, `inset`) · `accent-color` · `color-scheme` ·
**View Transitions API** for route/state transitions · `prefers-reduced-motion`
/ `prefers-color-scheme` / `prefers-contrast`. In Tailwind v4, express tokens via
`@theme` and lean on logical/utility tokens rather than arbitrary values.

## Review output format

When auditing a UI, return findings **prioritized**, each with the principle and a
concrete fix:

- **P1 — Blocks use or fails a11y** (contrast fail, no keyboard focus, broken
  mobile layout, layout shift, unreadable text).
- **P2 — Hurts clarity/polish** (weak hierarchy, inconsistent spacing, missing
  states, motion jank).
- **P3 — Refinements** (optical alignment, microcopy, subtle motion/timing).

For each: **what** (the issue), **where** (file:line if in code), **why** (the
principle/standard), **fix** (specific, using existing tokens). Lead with the
highest-impact change; don't bury P1s under nitpicks.
```
