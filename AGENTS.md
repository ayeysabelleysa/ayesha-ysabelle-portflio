# AGENTS.md

Guidance for coding agents working in this repository. `CLAUDE.md` covers commands and architecture; this file covers how to approach design work.

## Frontend skills

Two frontend skills are installed under `.agents/skills/` (also linked from `.claude/skills/`, pinned in `skills-lock.json`). Use both for any UI work: building, redesigning, restyling, polishing or reviewing a section, component, page or hero.

1. **`design-taste-frontend`** (`.agents/skills/design-taste-frontend/SKILL.md`)
   Art direction and an anti-"AI-made" house style, with a browser inspector (`scripts/inspect.mjs`, `scripts/lint.mjs`) and a look-and-fix loop on screenshots. Follow its run in order: read the brief and what imagery really exists, choose a direction, build, then inspect and screenshot at three widths and fix. This is a portfolio (a page, not an app screen), so follow the page run, not `references/app-screens.md`.
2. **`frontend-design`** (`.agents/skills/frontend-design/SKILL.md`)
   Guidance for distinctive, deliberate choices in palette, typography and layout. Use it for the plan-review-build-critique pass and its list of generic tells.

Load both skills before editing markup or styles, not after. When a request is only a small value change (a colour, a size, a spacing tweak), you do not need to re-run a full direction draw, but still check the result against the skills' tells list.

## Project constraints that override the skills

The skills are for taste; these are the owner's decisions and win when they conflict.

- **Stack:** vanilla HTML, CSS and JS only. No frameworks, no build step, no new dependencies. The skills' scripts run from the project root and write to `.taste-skill/`; do not commit that folder.
- **Visual identity:** soft rose paper, warm brown ink, bold display headlines, rounded cards, 3D "keycap" buttons, the pink ribbon and bow background. Keep it. The owner has asked for it repeatedly and has rejected looks that feel generic or "AI-made", so push for a distinct treatment *within* this identity rather than swapping the palette or fonts.
- **Fonts:** Bricolage Grotesque (display) and Manrope (body) only.
- **Tokens:** use the CSS variables in `css/style.css` (`--bg`, `--card`, `--rose`, `--rose-strong`, `--ink`, `--gold`, `--line`, `--shadow`, `--font-display`, `--font-body`). Do not hard-code colours that already have a token, and keep dark mode (`data-theme="dark"` and `prefers-color-scheme`) working.
- **Content:** use the real copy and projects already on the page. Do not invent statistics, awards or project details.
- **Motion:** respect `prefers-reduced-motion`. Prefer motion that answers a user action (hover, click) over decorative looping.
- **Accessibility:** keep visible focus states, `aria-` labels on icon-only controls, `aria-hidden` on decoration, and a keyboard path for anything that works on hover.

## Design documentation

`DESIGN.md` is the source of truth for the current design: tokens, type, layout, components and their behaviour. Read it before changing the UI, and update it in the same change when you alter a value or add a component. `figma-tokens.json` mirrors the tokens for Figma handoff; keep it in step when colours, radii or type change.

## Verifying UI changes

There are no tests. Serve the repo root (`python3 -m http.server 8000`) and check the result in a real browser at roughly 1366px, 900px and 420px wide, in light and dark themes. Open over `http://`, not `file://`: some effects (CSS `mask` images) only render over HTTP. Report what you actually checked and what you did not.
