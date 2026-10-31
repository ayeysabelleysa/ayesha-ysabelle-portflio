# Design spec — Ayesha Ysabelle Catolico portfolio

The numbers behind the site: colour, type, spacing, corner radii, shadows and the
size of every card. Everything below is what is actually in `css/style.css`, so if
a value changes there, change it here too.

Visual language in one line: **soft rose paper, warm brown ink, bold display sans
headlines, generously rounded cards, one hard "key" accent.**

---

## 1. Colour tokens

Defined in `:root` (light) and swapped by `data-theme="dark"` / OS dark mode.

| Token | Light | Dark | Used for |
| --- | --- | --- | --- |
| `--bg` | `#FBE6E8` | `#051F45` | Page background |
| `--glow` | `#FFF6F6` | `#0C2D5E` | Top-of-page radial glow |
| `--card` | `#FFFAFA` | `#0B2B5B` | All card surfaces |
| `--cloud` | `#F2C4CD` | `#F2C4CD` | Ticker band, clover highlight |
| `--rose` | `#D9587F` | `#FF86A9` | Accents, icons, dots, timeline |
| `--rose-strong` | `#B93E68` | `#FF86A9` | Eyebrows, primary button, hover text |
| `--ink` | `#4F281F` | `#FBE6E8` | Body text |
| `--gold` | `#C9A27E` | `#C9A27E` | Half of the sparkle burst |
| `--navy` | `#051F45` | `#051F45` | Reserved deep tone |
| `--slate` | `#334A78` | `#A9BEEA` | Muted blue text |
| `--line` | `rgba(79,40,31,.14)` | `rgba(251,230,232,.2)` | Every 1px border |
| `--shadow` | `0 18px 40px -20px rgba(150,60,90,.35)` | `0 18px 40px -20px rgba(0,0,0,.6)` | Card elevation |

Two muted-surface shortcuts appear inline in the CSS:

- `color-mix(in srgb, var(--card) 84%, transparent)` — contact field fill.
- `rgba(217, 88, 127, .14–.16)` — rose tint behind the round icons.

---

## 2. Typography

Two fonts only: **Bricolage Grotesque** for display and **Manrope** for body/UI.
The same two roles are used throughout the mobile menu:

| Role | Font |
| --- | --- |
| UI / body | **Manrope** (`--font-body`), 400 / 500 / 700 |
| Display / accents | **Bricolage Grotesque** (`--font-display`), 600 / 700 |

| Element | Size | Notes |
| --- | --- | --- |
| Hero name | `clamp(1.25rem, 3vw, 1.8rem)` | Bricolage Grotesque 600, rose-strong |
| Hero title (`Portfolio`) | `clamp(3.2rem, 9.4vw, 7rem)` | Bricolage Grotesque 700; mobile clamp |
| Section `h2` | `clamp(2.2rem, 6vw, 3.2rem)` | Bricolage Grotesque 700 |
| Card title (`h3`) | `1.7rem` (projects) · `1.6rem` (education) | Bricolage Grotesque 700 |
| Sub-heading (`Toolbox`, `h3`) | `clamp(1.6rem, 3.6vw, 2.1rem)` | Bricolage Grotesque 700 |
| Contact statement | `clamp(1.6rem, 3.2vw, 2.4rem)` | Manrope, max `15em` |
| Body / paragraph | `1rem` (hero tag), `.95rem` (cards) | Manrope; `opacity: .85` on cards |
| Feature list | `.9rem`, `1.5` line-height | Rose 6px bullet |
| Eyebrow (`// 01 · projects`) | `.85rem` | Rose-strong, `64px` top margin |
| Labels (`SAY HELLO`, `EMAIL`) | `.6–.72rem` | Uppercase-ish, `.1em` tracking |
| Chips / keys | `.78–.82rem` | Manrope |
| Nav links | `.8rem` (header) · `.9rem` base | |
| Mobile menu links | `clamp(2.35rem, 11.5vw, 3.3rem)` · Bricolage Grotesque 700 | Right-aligned |
| Mobile menu kicker / button | `.72rem` / `.82rem` · Manrope | `NAVIGATE` label, "Menu +" pill |
| Resume page | `13px / 1.55` | Print-first, white page |

Headings use `line-height: 1.1`; body text uses `line-height: 1.6`.

---

## 3. Page frame

| Thing | Value |
| --- | --- |
| Content max width | `1060px` (`main`) |
| Page gutter | `clamp(16px, 5vw, 32px)` |
| Header gutter | `clamp(16px, 5vw, 56px)` |
| Header height | `16px` top/bottom padding + 36px logo ≈ `69px` |
| Scroll offset for anchors | `scroll-padding-top: 5.5rem` |
| Section spacing | `64px` to the eyebrow, `6px` to the heading, `22px` under it |
| Bottom page padding | `80px` + safe-area inset |

---

## 4. Corner-radius scale

| Radius | Where |
| --- | --- |
| `99px` / `999px` | Pills: chips, ticker band, buttons, theme nav toggle, cover clover |
| `40px` | Contact card |
| `28px` | Project cards |
| `26px` | Portrait photo, toolbox groups |
| `24px` | Education timeline cards |
| `22px` | About pillars, contact fields, resume page |
| `20px` | (retired — the old popup fields) |
| `16px` | Toolbox keys (`.tkey`) |
| `50%` | Round icon buttons (42px), timeline dots, sparkle dots |

Rule of thumb: the bigger the surface, the bigger the radius — but nothing
inside a card is rounder than the card itself.

---

## 5. Cards, at a glance

| Card | Radius | Padding | Border | Background | Shadow |
| --- | --- | --- | --- | --- | --- |
| Project (`.proj`) | 28px | `0` (screenshot + body) | `1px var(--line)` | `var(--card)` | `var(--shadow)` |
| — screenshot (`.shot`) | top 28px | `18px`, 16:9 | bottom hairline | rose→gold 135° wash | — |
| — body (`.pbody`) | — | `22px 24px 26px`, gap 10 | — | — | — |
| About pillar | 22px | `16px 20px` | hairline | `var(--card)` | none |
| Toolbox group (`.tgroup`) | 26px | `20px 22px 26px` | hairline | `var(--card)` | `var(--shadow)` |
| Education card (`li`) | 24px | `22px 26px`, 150px + 1fr | hairline | `var(--card)` | `var(--shadow)` |
| Contact card (`.endcard`) | 40px | `clamp(28px, 5vw, 56px)` | hairline | 2 rose radials over `var(--card)` | `var(--shadow)` |
| Contact field (`.field`) | 22px | `15px 18px`, gap 14 | hairline → rose on hover | `color-mix(card 84%, transparent)` | none → soft on hover |
| Resume page (`resume.html`) | 10px | `clamp(22px, 5vw, 44px)` | none | `#fff` | soft rose |
| Cover clover | pill | `34px` logo | rose border | card fill | sparkle on each click |

Grid rhythm between cards: **18px** (projects, toolbox, education).

---

## 6. Buttons & interactive bits

| Control | Size | Shape | Notes |
| --- | --- | --- | --- |
| `.btn` (primary) | padding `.85rem 1.6rem`, `1rem` text | pill `99px` | Rose-strong fill, glow shadow, lifts `-2px` |
| `.btn.ghost` | same | pill | 1px `--ink` outline, transparent |
| Header CTA (`.navcta`) | `.42rem 1rem`, `.78rem` semibold | pill `99px` | Rose-strong fill, white text (dark ink in dark mode), lifts `-1px` |
| `.themebtn` | `36 × 36` (`44 × 44` in the menu) | circle | 1px line border, icon `18px` |
| `.navtoggle` | `.62rem 1.05rem`, mono `.82rem` | pill, 1px ink 38% outline | "Menu +" / "Close ×", visible under `820px` |
| `.chip` | `.3rem .9rem`, `.78rem` | pill | Card fill + hairline |
| `.tkey` | `.55rem 1.05rem`, `.82rem` | `16px` | Pink gradient, 3D "key" shadow, ±1.5° tilt |
| `.cover-clover` | `34px` logo in pill | `999px` | rose border | card fill | repeatable sparkle |
| Icon button (`.say a`) | `42 × 42` | circle | Rose fill on hover |
| Field icon (`.fi`) | `38 × 38` | circle | Rose-tinted disc, rose glyph |

**Key shadow recipe** (toolbox keys):

```css
box-shadow:
  inset 0 2px 0 rgba(255,255,255,.7),
  0 5px 0 #D79BAA,
  0 10px 14px rgba(120,50,70,.16);
```

Pressed state drops the solid layer to `0 0 0` and pushes the key down `5px`.

### Mobile menu overlay (≤ `820px`)

| Part | Spec |
| --- | --- |
| Surface | `position: fixed; inset: 0`, `background: color-mix(bg 82%, transparent)`, `backdrop-filter: blur(22px) saturate(140%)` |
| Padding | top `96px + safe-area-top`, sides `clamp(20px, 7vw, 44px)`, bottom `28px + safe-area-bottom` |
| Stack | Right-aligned column, `gap: 2px`, closed `visibility: hidden` + `inert` |
| Kicker (`NAVIGATE`) | Manrope `.72rem`, `.22em` tracking, 55% ink, `10–22px` above the first link |
| Links | Bricolage 700, `clamp(2.35rem, 11.5vw, 3.3rem)`, `1.05` line-height, `-.035em`; default `opacity: .7`, hover/focus `1` + `translateX(-6px)` |
| Contact | `var(--pink)` (= `--rose`), stays at full opacity |
| Theme toggle | `44 × 44` circle, bottom-left (`margin-top: auto`), 55% card fill |
| Header pill | "Menu +" / "Close ×", Manrope `.82rem`, 1px `ink 38%` outline, rose when open |
| Open | `300ms` fade; links rise `22px` in `420ms` with a `60ms` stagger; toggle follows at `360ms` |
| Behaviour | Open locks body scroll and inerts `main`; Escape / link click / resize close it; focus goes to the first link and returns to the pill |

---

## 7. Elevation

| Level | Shadow | Where |
| --- | --- | --- |
| Cards | `0 18px 40px -20px rgba(150,60,90,.35)` | Projects, toolbox, education, contact |
| Hero photo | `0 24px 44px -30px rgba(150,60,90,.45)` + `8px 8px 0 -2px` rose offset | Portrait |
| Primary button | `0 8px 20px -8px var(--rose-strong)` | `.btn` |
| Field hover | `0 16px 30px -22px rgba(150,60,90,.6)` | Contact fields |

There is no drop shadow on About pillars — they sit flat on the page.

---

## 8. Decorative layers

- **Clover watermark** — `.endmark`, her `assets/logo.svg` at `clamp(190px, 27vw, 290px)`,
  parked `-40…-110px` past the bottom-right corner at `opacity: .07` (`.05` in dark).
- **Ticker** — full-width band, `13px` vertical padding, `-1°` rotation, `32s` loop,
  pauses on hover/focus, `60s` under reduced motion.
- **Sparkles** — 12-point stars, `12px` default, `900ms` pop, rose + gold.
- **Cursor** — clover PNG `32 × 32`, hotspot `16 16`, pointer variant on links/buttons.

---

## 9. Layout breakpoints

| Width | What changes |
| --- | --- |
| `≤ 980px` | Project cards widen from 2 to 3 of 6 columns |
| `≤ 900px` | Hero becomes one column, portrait centred and capped at `240px` |
| `≤ 820px` | Nav becomes a full-screen overlay: outlined "Menu +" pill in the bar, big stacked links, theme toggle at the foot |
| `≤ 720px` | Projects, About and the contact card go single column; education rows stack |
| `prefers-reduced-motion` | Animations reduced to `.01ms`; ticker keeps moving at `60s`, clover drifts at `16s`; sparkles run (`820ms`) |
| `print` | Cover clicker, sparkles, theme toggle and skip link hidden; the page prints as-is |

---

## 10. Motion

| Thing | Duration / easing |
| --- | --- |
| Hover lifts | `150–200ms` |
| Theme / colour swaps | `200ms` |
| Photo straighten | `350ms ease` |
| Clover click | `580ms cubic-bezier(.18, .89, .32, 1.28)` |
| Sparkle burst | `900ms cubic-bezier(.2, .7, .3, 1)` |
| Header clover idle drift | `6.5s` loop, `±3px` / `±8°` (`16s` under reduced motion) |
| Header clover hover wiggle | `900ms` loop, `-12°…9°`, `1.1` scale |
| Mobile overlay fade | `300ms ease` |
| Mobile overlay links | `420ms cubic-bezier(.2, .9, .25, 1)`, `60ms` stagger, `+22px` rise |
| Key press | `90–160ms` |

---

## 11. Spacing quick reference

`6 · 8 · 10 · 12 · 14 · 18 · 22 · 26 · 32 · 40 · 56 · 64`

- Inside a card: `12–22px`.
- Between cards: `18px`.
- Between sections: `64px` (heading margin).
- Big page blocks: `clamp(36px, 5vw, 56px)`.

---

## 12. Accessibility notes baked into the design

- Focus ring: `3px solid var(--rose)`, `3px` offset, never removed.
- Body text `--ink` on `--card` clears 4.5:1 in both themes; secondary text never
  drops below `opacity: .5` and is decorative only.
- Hit targets: smallest interactive control is `36px` (theme toggle), menu items
  are full-width rows on mobile, icon buttons are `42px`.
- Every decorative SVG is `aria-hidden`, every icon-only link has an `aria-label`.
- Motion is opt-out via the OS setting; sparkles keep a single `820ms` pass rather
  than looping.

---

## 13. Figma handoff

Everything below is the CSS converted to `px` at a `1440px` desktop frame, so the
numbers can be typed straight into Figma. `rem` → `×16`.

### 13.1 Frames and grid

| Frame | Size | Notes |
| --- | --- | --- |
| **Desktop** | `1440 × auto` | Main column `1060` centred (side margins `190`), inner content `996` after the `32px` gutter |
| **Tablet** | `834 × auto` | Content `770`; hero stacks, projects go 2-up |
| **Mobile** | `390 × auto` | Content `351`; everything single column, nav is a menu button |
| **Header** | `1440 × 69` | `56` side padding, `36` logo, `1px` bottom border |

- Section rhythm: `64px` from the previous block to the eyebrow, `6px` from the
  eyebrow to the heading, `22px` under the heading. Nothing else spaces sections
  apart.
- Card grid: 6 columns, `18px` gaps. Project card = 2 columns (`320` wide at
  desktop), so **3 per row**; below `980px` each card spans 3 → **2 per row**.
- Main column edges: `x = 190`, content starts `x = 222`, ends `x = 1218`.

### 13.2 Text styles (name them this way)

| Style | Font | Size / LH | Tracking | Used by |
| --- | --- | --- | --- | --- |
| `Display/Hero` | Bricolage Grotesque 700 | Responsive clamp | `-.015em` | Portfolio title |
| `Display/Name` | Bricolage Grotesque 600 | Responsive clamp | `-.015em` | Ayesha's name |
| `Display/Section` | Bricolage Grotesque 700 | Responsive clamp | `-.015em` | Section headings |
| `Display/Subheading` | Bricolage Grotesque 700 | Responsive clamp | `-.015em` | Toolbox |
| `Display/CardTitle` | Bricolage Grotesque 700 | `1.7rem` | `-.015em` | Project names |
| `Display/CardTitle-S` | Bricolage Grotesque 700 | `1.6rem` | `-.015em` | School names |
| `Body/Base` | Manrope 400 | `16 / 25.6` | `0` | Hero tagline, About copy |
| `Body/Card` | Manrope 400 | `15.2 / 24.3` | `0` | Card paragraphs (85% opacity) |
| `Body/Feature` | Manrope 400 | `14.4 / 21.6` | `0` | Feature bullets |
| `Label/Eyebrow` | Manrope 400 | `13.6 / 21.8` | `+0.27` | `// 01 · projects` |
| `Label/Nav` | Bricolage Grotesque 700 | `12.8 / 20.5` | `-.015em` | Header links |
| `Label/NavCTA` | Bricolage Grotesque 700 | `12.5 / 17.5` | `-.015em` | Contact pill |
| `Label/Chip` | Manrope 400 | `12.5 / 20` | `0` | Skill chips |
| `Label/Micro` | Manrope 700 | `9.6 / 15.4` | `+1.15` | `EMAIL`, `PHONE` |
| `Label/SayHello` | Manrope 500 | `11.5 / 18.4` | `+1.15` | `SAY HELLO` |
| `Label/Key` | Manrope 500 | `13.1 / 21` | `0` | Toolbox keys |
| `Label/Ticker` | Manrope 400 | `13.1 / 21` | `+1.05` | Marquee text |

Only **two families** ship with the design: Bricolage Grotesque (600 / 700) and
Manrope (400 / 500 / 700). No monospace or italic font is used.

### 13.3 Colour, effect and radius styles

Use one variable collection **Theme** with two modes, **Light** and **Dark**, named
`color/bg`, `color/card`, `color/rose`, etc. Values are in the table in §1; the
machine-readable copy is `figma-tokens.json` (see §13.7).

Effect styles:

| Style | Value |
| --- | --- |
| `Shadow/Card` | `0 18 40 -20` · `rgba(150,60,90,.35)` (dark: `rgba(0,0,0,.6)`) |
| `Shadow/Photo` | `0 24 44 -30` · `rgba(150,60,90,.45)` + `8 8 0 -2` rose `16%` |
| `Shadow/Button` | `0 8 20 -8` · rose-strong |
| `Shadow/FieldHover` | `0 16 30 -22` · `rgba(150,60,90,.6)` |
| `Shadow/Key` | `inset 0 2 0 rgba(255,255,255,.7)` + `0 5 0 #D79BAA` + `0 10 14 rgba(120,50,70,.16)` |

Radius tokens: `radius/pill 999` · `radius/key 46` · `radius/card 40` ·
`radius/project 28` · `radius/photo 26` · `radius/edu 24` · `radius/field 22` ·
`radius/tkey 16`.

**Borders:** every card border is `1px` **inside** in Figma (`--line`), otherwise
the frame grows by 2px and the 320/320/320 grid stops lining up.

### 13.4 Auto layout recipes

| Element | Direction | Padding | Gap | Fill | Radius |
| --- | --- | --- | --- | --- | --- |
| Header | Horizontal, space-between, centre | `16 / 56` | `16` | bg @ 85% + blur 10 | 0 |
| Hero | Horizontal, centre | `76 / 0 / 44` | `64` | — | — |
| Hero copy | Vertical, start | `0` | `22` | — | — |
| Chips row | Horizontal, wrap | `0` | `8` | — | — |
| Ticker | Horizontal, hug height | `13 / 0` | `22.4` | cloud | 999 |
| Project card | Vertical, clip content | `0` | `0` | card | 28 |
| Screenshot | Vertical, centre | `18` | `6` | rose→gold 16–18% | — |
| Project body | Vertical | `22 / 24 / 26` | `10` | — | — |
| About | Horizontal, top | `0` | `32` | — | — |
| Pillar | Vertical | `16 / 20` | `2` | card | 22 |
| Toolbox group | Vertical | `20 / 22 / 26` | `16` | card | 26 |
| Toolbox keys | Horizontal, wrap | `0` | `14 / 12` | — | — |
| Education row | Horizontal, top | `22 / 26` | `20` (150 fixed year) | card | 24 |
| Contact card | Horizontal, centre, clip content | `56` | `54` | card + 2 radials | 40 |
| Contact field | Horizontal, centre | `15 / 18` | `14` | card 84% | 22 |
| Contact icons | Horizontal, centre | `0` | `10` | — | — |
| Cover clover | Horizontal, centre | `6` | `9` | card fill | 999 |

Sizing notes: contact columns are `436 / 394` (`1.05fr / .95fr` of `884 − 54`);
hero columns are `602 / 330`; About columns `526 / 438`; project and toolbox cards
`320` wide.

### 13.5 Component set to build

| Component | Variants |
| --- | --- |
| `Nav/CTA` | default, hover, focus (Contact pill) |
| `Nav/Item` | default, hover |
| `Button/Primary` | default, hover, focus |
| `Button/Ghost` | default, hover, focus |
| `Chip` | default |
| `ToolKey` | default, hover, pressed × tilt `-1.5° / 0° / 1°` |
| `IconButton` | email, linkedin × default, hover |
| `ContactField` | email, phone × default, hover |
| `ProjectCard` | 3 content instances (VictorianPass, VHEcoPoint, Click to Borrow) |
| `Pillar` | 3 |
| `ToolboxGroup` | design, build, ai |
| `EducationRow` | 3 |
| `Badge/OpenToInternships` | default |
| `Header` | desktop, mobile-closed, mobile-open |
| `ResumePage` | screen (toolbar visible), print |

### 13.6 Decorative bits that need manual care

- **Clover watermark** — image `assets/logo.svg` at `290px`, `opacity 7%` (5% dark),
  parked about `100px` past the card's bottom-right corner at desktop (it scales
  down to `40–50px` on smaller screens). The card must **clip content** so only
  the top-left of the clover shows.
- **Ticker** — full content width `+12px`, rotated `-1°`, sitting `30px` below the
  hero.
- **Portrait** — `330 × 412.5`, radius `26`, rotated `-0.8°`, with the rose offset
  “print” shadow (`8 8 0 -2`).
- **Cover clover** — the logo button near the cover heading can be clicked
  repeatedly for sparkles. There is no intro screen or sound control.
- **Contact background** — card fill plus two radial gradients: rose `30%` at
  `88% 110%` and pink `38%` at `0% 0%`.
- **Timeline** — 1px dashed rose line at the left of the education list, with
  `13px` dots offset `-31px` and a `4px` bg ring.
- **No cursor in Figma** — prototype with “hand” cursor; the clover cursor is a
  site-only asset (`assets/cursor.png`, `32×32`, hotspot `16 16`).
- **Sparkles** are motion, not layout: 12px 12-point stars, rose + gold, `900ms`.

### 13.7 Tokens file

`figma-tokens.json` in the project root holds the same values in Tokens Studio
format: top-level `light` / `dark` sets, plus `radius`, `space`, `font` and
`shadow` groups. Load it with the free **Tokens Studio** plugin → *Apply to
Figma* to generate variables, text styles and effect styles in one go, or just
copy the numbers by hand.
