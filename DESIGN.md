---
name: tetuo41 — Identity Card
description: 署名で裏打ちされた静けさ — Keybase 検証つきの名刺ページ
colors:
  bg: "#fafafa"
  fg: "#18181b"
  muted: "#6b6b74"
  hairline: "#e4e4e7"
  surface: "#ffffff"
  hover: "#f4f4f5"
  accent: "#5b5bd6"
  accent-soft: "rgba(91, 91, 214, 0.08)"
  btn-primary-bg: "#18181b"
  btn-primary-fg: "#fafafa"
  selection: "rgba(91, 91, 214, 0.22)"
  glow: "rgba(91, 91, 214, 0.055)"
  bg-dark: "#09090b"
  fg-dark: "#f4f4f5"
  muted-dark: "#94949e"
  hairline-dark: "#232327"
  surface-dark: "#101013"
  hover-dark: "#17171b"
  accent-dark: "#8b8bf2"
  accent-soft-dark: "rgba(139, 139, 242, 0.1)"
  btn-primary-bg-dark: "#f4f4f5"
  btn-primary-fg-dark: "#09090b"
  selection-dark: "rgba(139, 139, 242, 0.28)"
  glow-dark: "rgba(139, 139, 242, 0.07)"
typography:
  display:
    fontFamily: "Geist Sans, Hiragino Kaku Gothic ProN, Noto Sans JP, system-ui, sans-serif"
    fontSize: "clamp(4.5rem, 13vw, 7.5rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  lead:
    fontFamily: "Geist Sans, Hiragino Kaku Gothic ProN, Noto Sans JP, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.7
  body:
    fontFamily: "Geist Sans, Hiragino Kaku Gothic ProN, Noto Sans JP, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Geist Sans, Hiragino Kaku Gothic ProN, Noto Sans JP, system-ui, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 600
    lineHeight: 1.7
    letterSpacing: "0.06em"
  mono:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.8rem"
    fontWeight: 400
    letterSpacing: "0.01em"
rounded:
  pill: "999px"
  control: "12px"
  focus: "4px"
spacing:
  nav-y: "1.4rem 0 0"
  gutter: "1.5rem"
  hero-y: "6.5rem 0 5.5rem"
  cta-gap: "0.75rem"
  row-y: "0.85rem 0.4rem"
  list-gap: "1rem"
  footer-y: "2rem 1.5rem 3.5rem"
components:
  btn-primary:
    backgroundColor: "{colors.btn-primary-bg}"
    textColor: "{colors.btn-primary-fg}"
    rounded: "{rounded.control}"
    padding: "0.62rem 1.15rem"
  btn-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.fg}"
    rounded: "{rounded.control}"
    padding: "0.62rem 1.15rem"
  verification-pill:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "0.35rem 0.85rem"
  list-row:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.fg}"
    padding: "0.85rem 0.4rem"
  list-row-hover:
    backgroundColor: "{colors.hover}"
---

# Design System: tetuo41 — Identity Card

## Overview

**Creative North Star: 「署名で裏打ちされた静けさ」(Quietness backed by a signature)**

This system does not shout. Identity is asserted once — in a giant, precisely-tracked wordmark — and then verified: a single pulsing accent dot tied to a real Keybase proof. Where the category default is a grid of chatty self-introduction cards, this page is a vertical stack of hairline rules and whitespace. One indigo accent is the only voice; everything else is pure neutral, inverting cleanly between OS light and dark themes.

Structure comes from lines, not surfaces. The link list is a bordered editorial index, not a card deck. Depth is a single faint radial glow behind the hero — atmosphere, not elevation. Typography is the protagonist: Geist Sans at extreme sizes with tightened tracking, Geist Mono for the cryptographic fingerprint, Japanese text falling to Hiragino/Noto system fallbacks.

**Key Characteristics:**
- Two full OS-following themes (`prefers-color-scheme`), identical structure, inverted neutrals
- Single indigo accent (#5b5bd6 light / #8b8bf2 dark), used sparingly: dot, pulse, focus ring, hover reveals
- Hairline dividers (#e4e4e7 / #232327) instead of card surfaces
- Verification pill with a 2.4s pulsing accent dot as the signature element
- Full-bleed radial glow at the top of the page, ~5–7% accent opacity
- 150ms ease transitions throughout; reduced-motion disables all animation

## Colors

A near-monochrome zinc palette with one indigo accent, designed in light/dark pairs.

### Primary
- **Indigo** (`--accent`, light `#5b5bd6` / dark `#8b8bf2`): The only chromatic voice. Appears as the wordmark dot, the pulsing verification dot, `:focus-visible` rings, list-row icon tint on hover, footer link hover, and the ghost of the hero glow. Never used as a large fill.
- **Accent soft** (`--accent-soft`, `rgba(91,91,214,.08)` / `rgba(139,139,242,.1)`): the pulse's expanding ring; **Selection** (`--selection`, `.22`/`.28` alpha) tints text selection; **Glow** (`--glow`, `.055`/`.07`) paints the radial backdrop.

### Neutral
- **Page** (`--bg`, `#fafafa` / `#09090b`): page background, also primary-button fill in light (inverted in dark).
- **Ink** (`--fg`, `#18181b` / `#f4f4f5`): all primary text; also primary-button fill in dark.
- **Muted** (`--muted`, `#6b6b74` / `#94949e`): secondary text, notes, icons, footer.
- **Hairline** (`--hairline`, `#e4e4e7` / `#232327`): all dividers, list rows, button and pill borders.
- **Surface** (`--surface`, `#ffffff` / `#101013`): pill and secondary button fills.
- **Hover** (`--hover`, `#f4f4f5` / `#17171b`): list-row hover wash.

### Named Rules
**The One Voice Rule.** Indigo is reserved for verification, focus, and hover reveals. It never fills a surface larger than a dot or a border. Its rarity is the point.

**The Inversion Rule.** The primary button always inverts against the page: dark-fill/light-text in light theme, light-fill/dark-text in dark theme. It is neutral, never accent-colored.

## Typography

**Display Font:** Geist Sans (self-hosted 400/500/700/800) with Hiragino Kaku Gothic ProN → Noto Sans JP → system-ui fallbacks
**Label/Mono Font:** Geist Mono (400/500) with ui-monospace fallback

**Character:** A precise grotesque that goes from whisper (0.8rem mono metadata) to shout (7.5rem display) on one family. Mono is reserved for cryptographic and machine-facing text only — the ed25519 fingerprint and keybase.txt link.

### Hierarchy
- **Display** (800, `clamp(4.5rem, 13vw, 7.5rem)`, 1.02, −0.04em): the H1 "tetuo41" alone. Once per page.
- **Lead** (400, 1.05rem, 1.7, muted color): one-sentence introduction under the H1, max-width 36rem.
- **Row label** (600, 0.95rem): link-list labels; wordmark uses 700 at 0.95rem, −0.01em.
- **Label / Section heading** (600, 0.85rem, +0.06em, uppercase, muted): "リンク" and pill text.
- **Note** (400, 0.85rem, muted, right-aligned): per-link annotations; hidden below 560px.
- **Body / Footer meta** (400, 16px body 1.7 line-height; footer 0.8rem muted).

### Named Rules
**The Mono-as-Proof Rule.** Geist Mono appears only where cryptographic identity is spoken (fingerprint, keybase.txt). Don't use it for decoration.

## Layout

A single centered column, `max-width: 44rem` (704px) with 1.5rem gutters, shared by nav, main, and footer. Vertical rhythm: nav (1.4rem top) → hero (6.5rem top / 5.5rem bottom; 4.5/4 on mobile) → links section (1.5rem top / 4rem bottom) → footer (2rem top / 3.5rem bottom, hairline top border).

The link list is one `grid-template-columns: auto 1fr auto auto` row per link (icon · label · note · arrow) separated by hairlines — first row gets a top border, every row a bottom border. The CTA row wraps (`flex-wrap`) with 0.75rem gap. Single breakpoint at 560px: notes drop out, rows go 3-column, footer stacks vertically, pill shrinks.

## Elevation & Depth

Flat by default. No box-shadow exists at rest anywhere in the system. Depth is conveyed three ways instead: the full-bleed radial glow behind the hero (`radial-gradient(60rem 30rem ellipse at 50% -12rem, var(--glow), transparent 65%)`), hairline lines dividing rows, and the pulse animation's expanding soft ring — motion as depth, not shadow.

## Shapes

Two radii only. **Pill** (999px) marks verification identity: the nav pill and its pulse dot (and the wordmark dot, 50%). **Control** (12px) marks actionable buttons. Focus outlines get a slight 4px radius. Borders are 1px hairlines everywhere; there is no heavy stroke in the system. Icons are 24px-grid line icons at 1.8 stroke (keybase-style) or brand fills (GitHub, X, Medium, SoundCloud).

## Components

### Buttons
- **Shape:** 12px radius, 1px border, inline-flex with 0.55rem icon gap
- **Primary:** page-inverted fill (`--btn-primary-bg`/`--btn-primary-fg`), transparent border, padding 0.62rem × 1.15rem, weight 600 at 0.9rem
- **Secondary:** surface fill, hairline border; hover shifts border to `--muted`
- **Hover / Active / Focus:** primary dims to 88% opacity on hover; all buttons `scale(0.98)` on press; 150ms ease transitions; global `:focus-visible` = 2px accent outline, 3px offset

### Verification Pill (signature)
- **Style:** 999px pill, surface fill, hairline border, muted 0.8rem text, accent dot with 2.4s ease-out infinite pulse (0 → 7px expanding soft ring via box-shadow)
- **Hover:** border turns accent, text brightens to fg
- **Motion:** pulse stops entirely under `prefers-reduced-motion: reduce`

### Link List Rows
- **Structure:** full-width hairline-bordered rows in a 4-column grid (icon 20px · label · note · arrow 15px), padding 0.85rem × 0.4rem, 1rem gap
- **Hover:** background wash (`--hover`), icon recolors to accent, and the diagonal arrow fades in from a (−4px, 4px) offset — all at 150ms
- **State:** static; the page has no selected state

### Navigation
- Flex space-between in the shared 44rem column: 700-weight wordmark + accent dot on the left, verification pill on the right. No active state — the wordmark is the home link.

## Do's and Don'ts

### Do:
- **Do** pair every color change with its dark-theme twin; both themes are first-class and OS-driven.
- **Do** keep all transitions at 150ms ease, and honor `prefers-reduced-motion` (kill the rise animation, pulse, and smooth scroll).
- **Do** use hairlines (1px `--hairline`) for all divisions and containment.
- **Do** reserve Geist Mono for fingerprints, proofs, and machine-facing metadata.
- **Do** invert the primary button against the current theme's page background.

### Don't:
- **Don't** add box-shadows or card surfaces; this system is built from lines and whitespace.
- **Don't** introduce a second accent hue or gradient fills; indigo is the only chromatic voice.
- **Don't** use the accent as a large background fill, badge, or tag color.
- **Don't** fabricate content (bios, article lists) — the page states only verified facts and confirmed links.
- **Don't** track the display type loosely; the −0.04em tightening at 800 weight is the look.
