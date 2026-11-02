# Design — Ayesha Ysabelle Catolico portfolio

The current design of `index.html` and `css/style.css`. If a value changes in the CSS, change it here too (and in `figma-tokens.json` for colours, radii and type).

**Visual language:** soft rose paper, warm brown ink, bold display headlines, generously rounded surfaces, 3D "keycap" buttons, and a quiet backdrop of pink ribbons and bows. Personal and a little playful, aimed at recruiters and instructors looking at a UI/UX student's work.

Design is steered by the two frontend skills named in `AGENTS.md` (`design-taste-frontend`, `frontend-design`).

---

## 1. Colour

Defined on `:root` and overridden by `[data-theme="dark"]` and `prefers-color-scheme: dark`.

| Token | Light | Dark | Used for |
| --- | --- | --- | --- |
| `--bg` | `#FBE6E8` | `#051F45` | Page background |
| `--glow` | `#FFF6F6` | `#0C2D5E` | Top-of-page radial glow |
| `--card` | `#FFFAFA` | `#0B2B5B` | Card surfaces |
| `--cloud` | `#F2C4CD` | `#F2C4CD` | Soft pink tints |
| `--rose` | `#D9587F` | `#FF86A9` | Accents, decoration, curly lines |
| `--rose-strong` | `#B93E68` | `#FF86A9` | Eyebrows, primary buttons, hover text |
| `--ink` | `#4F281F` | `#FBE6E8` | Text |
| `--gold` | `#C9A27E` | `#C9A27E` | Sparkles, heading underline |
| `--line` | `rgba(79,40,31,.14)` | `rgba(251,230,232,.2)` | 1px borders |
| `--shadow` | `0 18px 40px -20px rgba(150,60,90,.35)` | `0 18px 40px -20px rgba(0,0,0,.6)` | Card elevation |

Project-section extras: `--work-copy` (card text), `--work-cta-start/end`, `--work-glow`, `--work-frost`. Keycap colours are fixed values (light pink gradient, `#4F281F` text) and do not switch with the theme.

## 2. Type

Two families only: **Bricolage Grotesque** (`--font-display`, 600/700) and **Manrope** (`--font-body`, 400/500/700).

| Element | Size | Notes |
| --- | --- | --- |
| Hero title | `clamp(3.2rem, 9.4vw, 7rem)` | Display 700 |
| Section `h2` | `clamp(2.2rem, 6vw, 3.2rem)` | Display 700, gradient underline in About |
| About copy | `clamp(1.05rem, 1.5vw, 1.18rem)`, line-height `1.75` | Wide column, no max line length |
| Toolkit heading | `1.05rem` | Small, on purpose |
| Toolkit keys | `.82rem`, 600 | Manrope |
| Project title | `clamp(2rem, 3.6vw, 2.9rem)` | Display, `-.035em` |
| Project tags | `.74rem`, 700 | Pills |
| Project links | `1rem` | Bold rose / regular ink |
| Carousel text | `.9rem`, 700, `.12em` tracking | Uppercase skill names |

## 3. Page frame

- Content column: `main` max-width `1060px`, gutter `clamp(16px, 5vw, 32px)`.
- Sections are spaced by the `64px` eyebrow margin (`#about` resets its own).
- `scroll-padding-top: 5.5rem` for anchors under the fixed header.

## 4. Background decoration

- **Page-wide (`body::before`)**: fixed, behind everything, `opacity .6`. Two large soft ribbon waves (top and bottom) and three small bows.
- **Per section**: `.about-deco` (About) and `#work::before` (Projects) are full-bleed absolutely positioned layers with more ribbons and bows. The ribbon and bow images are SVG data URIs held in `--deco-ribbon` and `--deco-bow` on `:root`, filled with `#D9587F` at low opacity.
- `html, body { overflow-x: clip }` keeps the full-bleed layers from causing a horizontal scrollbar.
- `#about` also carries a faint clover watermark (CSS mask of `assets/heart-clover.svg`), a twinkling gold sparkle, and a rose-to-gold underline on its heading. The twinkle stops under `prefers-reduced-motion`.

## 5. Sections

### Hero
Two columns: copy (left) and portrait (right, `270px`, slight tilt, rose offset shadow). Copy is the "Welcome to my / portfolio / 2026" block, the two buttons, and the clover key (click for sparkles). Below 900px it stacks: copy, portrait, carousel.

### Carousel (skills ticker)
Full-bleed strip (`100vw`, level, no fill) scrolling `UI/UX DESIGN · PROMPT ENGINEERING · PROJECT MANAGEMENT` with ✿ separators. Above and below the text runs a rose line drawn as a repeating `160px` SVG tile: a small quick curl, a heart in the middle, a wider swoop. The lines are `::before`/`::after` of `.track`, so they scroll with the text. Loop `32s`, pauses on hover and focus.

### About
Two columns (`1.5fr / 1fr`, stacked at 640px). Left: eyebrow, `h2`, two paragraphs. Right: "My Toolkit" — 11 skills as one cluster of 3D keycaps with no group labels and no card behind them, vertically centred (`align-self: center`). Keys keep the sparkle burst on click.

**Keycap recipe** (`.tkey`): pink gradient top, white inset highlight, three stacked solid edges (`2/4/6px`) for thickness, soft floor shadow, ±1.5° tilt. Hover lifts `3px`; press drops `6px` and removes the edges.

### Projects
One full-width card per row (`.proj`, radius `28px`), two columns `1.3fr / 1fr` with the screenshot on alternating sides; stacks below 720px. The screenshot fills its half edge to edge (no inner margin, clipped by the card corners), `min-height: 400px`, anchored top-left.

- **Image flip:** hovering the image (`.shot`) turns it around (`rotateY(180deg)`, `.75s`). The back shows the role line and the description (and the feature list for Click to Borrow). Category and status tags, title and links stay on the card body.
- **Flip button:** a round ↻ control (`.shot-turn`) in the image corner toggles `.is-flipped` for touch and keyboard. Clicking the image still opens the lightbox.
- **Tags:** category pill (`Capstone ★`, `School Project`) first, then status pills (`Live system: Done`, `Redesign: Ongoing`).
- **Links:** text rows, not filled buttons: label left, round arrow right, dashed rose divider above each. The primary link is bold rose, the secondary regular ink. On hover the row shifts `6px` and the arrow fills and turns `45°`.
- Cards reveal on scroll (fade and rise) via `.has-reveal` / `.is-visible`.

### Education, Contact
Education: timeline of cards with a dashed rose line and dot markers. Contact: large rounded card with two rose radial washes, a clover watermark and icon links. See `css/style.css` sections 9 and 10.

## 6. Shape and elevation

| Radius | Where |
| --- | --- |
| `99px` | Pills, tags, buttons |
| `40px` | Contact card |
| `28px` | Project cards |
| `26px` | Portrait |
| `24px` | Education cards |
| `16px` | Toolkit keys |
| `50%` | Round buttons, arrows, dots |

Cards use `var(--shadow)`; project cards add `0 24px 44px -20px var(--work-glow)` and lift `6px` on hover.

## 7. Motion

| Thing | Spec |
| --- | --- |
| Image flip | `750ms cubic-bezier(.2,.8,.2,1)` |
| Card reveal | `550ms`, staggered `120ms` |
| Carousel | `32s` linear loop |
| Key hover / press | `120ms` |
| Link row hover | `200ms` |
| Sparkle burst | `900ms` |
| About sparkle twinkle | `3.2s` loop |

`prefers-reduced-motion` cuts or stops the looping effects. Motion should answer an action; keep decorative loops to the carousel and the single twinkle.

## 8. Responsive

| Width | Change |
| --- | --- |
| `≤ 900px` | Hero stacks (copy, portrait, carousel) |
| `≤ 820px` | Nav becomes a full-screen menu overlay |
| `≤ 720px` | Project cards stack image over text, `6:5` image |
| `≤ 640px` | About stacks into one column |

## 9. Accessibility

- Visible focus rings (`3px solid var(--rose-strong)`); never removed.
- Decorative layers (`.about-deco`, ribbons, bows, carousel) are `aria-hidden` or pseudo-elements.
- Hover-only behaviour has a keyboard/touch path (`.shot-turn`).
- Icon-only controls carry `aria-label`.
- Check dark mode: the carousel text uses `--ink` and the rose lines use a fixed `#D9587F`; both should be re-verified after colour changes.

## 10. Known gaps

- The Click to Borrow card has empty space between its tag and its link (its feature list lives on the image back).
- Education and Contact have no per-section ribbon layers, only the page-wide one.
- Dark mode and mobile have not been re-checked since the latest About, carousel and project-card changes.
- `figma-tokens.json` still reflects the earlier design (card-based toolkit, 3-up project grid); update it when handing off to Figma.
