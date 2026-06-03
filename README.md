# Kidora

Interactive marketing site for **Kidora**, an early-childhood development practice
(ages **0–3**). The centerpiece is a scroll-driven "Growth Journey" where a baby
grows — resting → sitting → crawling → first steps → running — as you scroll.

Built to grow into a full product: client login, client registry, and scheduling.

## Stack

- **Next.js 16** (App Router, TypeScript) + **Tailwind CSS v4**
- **GSAP ScrollTrigger** + **Lenis** — scroll-scrubbed animation & smooth scroll
- **Cal.com** (`@calcom/embed-react`) — appointment booking
- **Supabase** (`@supabase/ssr`) — scaffolded for future auth + registry

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in values (optional for first run)
npm run dev                        # http://localhost:3000
```

All env vars are optional for the first run: with none set, online booking shows a
placeholder and the walk-in lead form still works (logs server-side).

## Environment

See `.env.local.example`:

- `NEXT_PUBLIC_CALCOM_LINK` — Cal.com link like `kidora/visit` (enables live booking)
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — for the future
  auth/registry phase

## Project map

```
src/
  app/
    page.tsx                  # landing (hero -> Growth Journey -> services -> CTA)
    schedule/page.tsx         # Cal.com booking + walk-in lead form
    services/, about/         # info pages
    api/leads/route.ts        # walk-in lead capture
    (auth)/login              # SCAFFOLD - future client login
    (dashboard)/dashboard     # SCAFFOLD - future client area
  components/
    SmoothScroll.tsx          # Lenis <-> ScrollTrigger wiring
    growth-journey/           # GrowthJourney.tsx + CharacterStages.tsx (SVG)
    ScheduleEmbed.tsx, LeadForm.tsx, ui/
  lib/supabase/               # client.ts / server.ts (scaffold)
```

## The Growth Journey animation

`GrowthJourney.tsx` pins a scene and maps scroll progress `0->1` onto the life
stages, cross-fading the placeholder SVG characters in `CharacterStages.tsx`.
It honors `prefers-reduced-motion` with a static stacked timeline.

**Swapping in final art:** replace the SVG stages with a **Rive** component driven
by the same `progress` value — no other code changes. The milestone copy (age /
title / note) lives in `CharacterStages.tsx` and survives the swap.
