# Design — Ayesha Ysabelle Catolico portfolio

The current design of `index.html` and `css/style.css`. If a value changes in the CSS, change it here too (and in `figma-tokens.json` for colours, radii and type).

**Visual language:** soft rose paper, warm brown ink, bold display headlines, generously rounded surfaces, 3D "keycap" buttons, and a quiet backdrop of pink ribbons and bows. Personal and a little playful, aimed at recruiters and instructors looking at a UI/UX student's work.

Design is steered by the two frontend skills named in `AGENTS.md` (`design-taste-frontend`, `frontend-design`).

---

## 1. Colour

Defined on `:root` and overridden by `[data-theme="dark"]` and `prefers-color-scheme: dark`.

| Token | Light | Dark | Used for |
| --- | --- | --- | --- |
| `--bg` | `#FBE6E8` | `#121014` | Page background |
| `--glow` | `#FFF6F6` | `#1D1920` | Top-of-page radial glow |
| `--card` | `#FFFAFA` | `#1A171D` | Card surfaces |
| `--cloud` | `#F2C4CD` | `#F2C4CD` | Soft pink tints |
| `--rose` | `#D9587F` | `#FF5C9A` | Accents, decoration, curly lines |
| `--rose-strong` | `#B93E68` | `#FF5C9A` | Eyebrows, primary buttons, hover text |
| `--ink` | `#4F281F` | `#F6EEF2` | Text |
| `--gold` | `#C9A27E` | `#C9A27E` | Sparkles, heading underline |
| `--line` | `rgba(79,40,31,.14)` | `rgba(246,238,242,.16)` | 1px borders |
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
No card surface. Two previews side by side, then a wide feature card for the odd last project (`.proj:last-child:nth-child(odd)` spans both columns, image `1.25fr` / text `1fr`, `16:9`). Stacks to one column at `720px`.

- **Preview (`.shot`):** square corners (`border-radius: 0`), `1px var(--line)` border, `aspect-ratio 16/11`, screenshot `object-fit: cover` anchored top-left. Shadow is a rose "print" offset (`10px 10px 0 -2px`, rose `24%`) plus `var(--shadow)`; on hover it settles (`translate(3px,3px)`, offset `5px`).
- **Details on hover:** a rose-tinted panel slides up from the bottom edge of the preview (`translateY(102% → 0)`, `.5s`), max `78%` of the preview, square corners. It holds the role line, the description and (Click to Borrow) the feature list. Shown on `:hover`, `:focus` and `:focus-within`; `.shot` has `tabindex="0"` so keyboard users can reach it. The image also scales `1.04`.
- **Not clickable:** screenshots do not open anything. There is no lightbox and no button on the preview.
- **Below the preview:** title (Display 700, `clamp(1.7rem, 2.6vw, 2.2rem)`) with the tag pills on the right (`Capstone ★`, `Live system: Done`, `Redesign: Ongoing`; `School Project`), a one-line summary, then a dashed rose divider and the link row pinned to the bottom (`margin-top: auto`) so links align across cards.
- **Links:** inline text with a `12px` round arrow; an underline grows on hover and the arrow fills and turns `45°`.
- Cards still reveal on scroll via `.has-reveal` / `.is-visible`.

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
| Details slide-up | `500ms cubic-bezier(.2,.8,.2,1)` |
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
| `≤ 720px` | Project grid becomes one column; the feature card stacks image over text |
| `≤ 640px` | About stacks into one column |

## 9. Dark mode

Dark is a separate charcoal-and-hot-pink palette, not a recolour of the navy it used before: near-black surface (`--bg #121014`, `--card #1A171D`), vivid pink accent `#FF5C9A`, soft white ink `#F6EEF2`, muted text `#BDB1BB`. The browser `theme-color` meta is `#121014` in dark (set in `js/script.js`). Everything that was a fixed light-pink value comes from tokens defined in both themes:

| Token group | Light | Dark |
| --- | --- | --- |
| `--key-*` (toolkit keys, contact icon buttons) | pale pink gradient, white highlight, rose edges, brown text | plum gradient `#4F2440 → #2B1423`, soft pink highlight, near-black plum edges, `#FFD3E4` text |
| `--deco-ribbon`, `--deco-bow` | rose `#D9587F` at 16% / 9% | pink `#FF5C9A` at 11% / 6% (bows 20%) |
| `--curl` (carousel lines) | `#D9587F` | `#FF5C9A` |
| `--work-cta-start/end` | `#E97899 → #C94970` | `#E0457F → #A8265A` |
| `--clover-cap-*` | `#F7CBD6 / #EBA9BC` | `#4B2339 / #34192A` |

Project screenshots are light UI captures and are shown as-is; the preview border, offset shadow and details panel follow the theme tokens. `--navy` is a leftover light-theme token and is unused in dark.

## 10. Accessibility

- Visible focus rings (`3px solid var(--rose-strong)`); never removed.
- Decorative layers (`.about-deco`, ribbons, bows, carousel) are `aria-hidden` or pseudo-elements.
- The project details panel shows on keyboard focus (`.shot` is focusable). Touch has no dedicated control; taps rely on sticky `:hover`.
- Icon-only controls carry `aria-label`.


## 11. Known gaps

- Touch devices have no reliable way to open the project details.
- Education and Contact have no per-section ribbon layers, only the page-wide one.
- Mobile has not been re-checked since the latest About, carousel and project-card changes.
- `figma-tokens.json` still reflects the earlier design (card-based toolkit, 3-up project grid); update it when handing off to Figma.
