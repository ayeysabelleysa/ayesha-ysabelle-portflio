# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static single-page UI/UX portfolio in vanilla HTML/CSS/JS. There is no package.json, build step, linter, or test suite. Deployed on Vercel (`vercel.json` just sets `outputDirectory: "."`, so the repo root is served as-is).

## Running

Open `index.html` directly, or serve the root: `python -m http.server 8000`.

## Architecture

- `index.html` — the whole site: cover/hero, then `#about`, `#work`, `#education`, `#contact` sections inside `<main>`. Loads `css/style.css` and `js/script.js` (deferred) and Google Fonts (Bricolage Grotesque + Manrope).
- `css/style.css` — all styles (~2000 lines). Theming is via CSS custom properties on `:root`, overridden by `[data-theme="dark"]` and by `prefers-color-scheme: dark`.
- `js/script.js` — numbered sections: sparkle effect helpers, cover clover press/click, toolbox key sparkles, mobile menu (`#navtoggle`/`#navmenu`, marks `<main>` inert and manages focus while open), theme toggle, project cards + lightbox (`#work .grid`, `#project-lightbox`). Every selector lookup is null-safe (`?.`, `if (el)`), so keep that pattern when elements may be missing.
- `resume.html` — standalone printable resume with its own inline `<style>`/`<script>`; does not use `style.css` or `script.js`.
- `PORTFOLIO.html` — just a redirect stub linking to `index.html`.
- `Ayesha_Catolico_Resume.pdf` (repo root) is what the "View resume" button links to; `assets/resume.pdf` is a separate copy.

## Conventions

- Theme: the choice is stored in `localStorage` under `theme` (wrapped in try/catch) and applied as `data-theme` on `<html>`; `<meta name="theme-color">` is kept in sync (`#FBE6E8` light / `#051F45` dark).
- `DESIGN.md` documents the design tokens, type scale, spacing, and card sizes, and states it mirrors `css/style.css`. When changing a value in the CSS, update `DESIGN.md` (and `figma-tokens.json`, the Figma handoff tokens) to match.
- `README.md` has a project-structure listing that is partly out of date (e.g. it omits the root-level resume PDF and `PORTFOLIO.html`); trust the actual file tree.
