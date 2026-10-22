---
name: tetuo41 — Theatrical Black
description: 黒いスクリーンに浮かぶ一枚のタイトルカード — A24 流の署名検証インデックス
colors:
  bg: "#050505"
  fg: "#fafafa"
  muted: "#a6a6a6"
  hairline: "rgba(250, 250, 250, 0.16)"
  hairline-strong: "rgba(250, 250, 250, 0.4)"
  invert-bg: "#fafafa"
  invert-fg: "#050505"
  pulse-ring: "rgba(250, 250, 250, 0.35)"
  scrollbar: "#2a2a2a"
typography:
  display:
    fontFamily: "Archivo Black, Archivo, Hiragino Kaku Gothic ProN, Noto Sans JP, system-ui, sans-serif"
    fontSize: "max(3.2rem, min(24rem, calc((100vw - 4rem) / 5.02)))"
    fontWeight: 400
    lineHeight: 0.85
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "Archivo, Hiragino Kaku Gothic ProN, Noto Sans JP, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.7
  body:
    fontFamily: "Archivo, Hiragino Kaku Gothic ProN, Noto Sans JP, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  credits:
    fontFamily: "Archivo, Hiragino Kaku Gothic ProN, Noto Sans JP, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 600
    lineHeight: 1.7
    letterSpacing: "0.14em"
  label:
    fontFamily: "Archivo, Hiragino Kaku Gothic ProN, Noto Sans JP, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1.7
  mono:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.8rem"
    fontWeight: 400
    letterSpacing: "0.01em"
rounded:
  none: "0"
  dot: "50%"
spacing:
  nav-y: "1.4rem 0 0"
  gutter: "1.5rem"
  hero-y: "5.5rem 0 5rem"
  billing-y: "2rem 0 0 1rem"
  cta-gap: "0.75rem"
  row-y: "0.9rem 0.5rem"
  list-gap: "1rem"
  footer-y: "2rem 1.5rem 3.5rem"
components:
  btn-primary:
    backgroundColor: "{colors.invert-bg}"
    textColor: "{colors.invert-fg}"
    rounded: "{rounded.none}"
    padding: "0.72rem 1.3rem"
  btn-primary-hover:
    backgroundColor: "transparent"
    textColor: "{colors.fg}"
    rounded: "{rounded.none}"
    padding: "0.72rem 1.3rem"
  btn-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.fg}"
    rounded: "{rounded.none}"
    padding: "0.72rem 1.3rem"
  verified-chip:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.none}"
    padding: "0.42rem 0.8rem"
  list-row:
    backgroundColor: "transparent"
    textColor: "{colors.fg}"
    padding: "0.9rem 0.5rem"
  list-row-hover:
    backgroundColor: "{colors.invert-bg}"
    textColor: "{colors.invert-fg}"
---

# Design System: tetuo41 — Theatrical Black

## Overview

**Creative North Star: 「黒いスクリーンの一枚のタイトルカード」(A title card on a black screen)**

The page opens like an A24 film: a pure #050505 screen, a viewport-filling white TETUO41 in Archivo Black, and a billing block of tracked microtype underneath. Where the previous identity was a quiet light card with one indigo voice, this world is theatrical monochrome — no chromatic accent exists at all. Verification, focus, and hover all speak in white; the only pulsing element is the white dot of the Keybase proof.

Everything rectangular. Corners are 0; the only circle in the system is the pulse dot. Interaction is one repeated gesture — the title-card inversion: link rows, buttons, and the nav chip flip from black-on-white to white-on-black on hover. Motion is cinematic and authored once: credits roll-in on load, a continuous marquee ticker of verified facts above the footer, and a film-grain overlay jittering at ~1Hz. `prefers-reduced-motion` stops every animation and reveals the hover arrows statically.

**Key Characteristics:**
- Fixed black theme (`color-scheme: dark`); no light variant, pure monochrome
- Viewport-filling Archivo Black poster title, sized to measured ink width (≈5.01em for TETUO41)
- Film-credit microtype: 0.72rem, 600, +0.14em tracking, uppercase — billing, chip, section heading, ticker
- Title-card inversion as the single interaction gesture (160ms)
- Continuous marquee ticker + film grain overlay; reduced-motion disables all animation
- IBM Plex Mono reserved for the cryptographic fingerprint and keybase.txt

## Colors

A pure grayscale palette; the darkest value is the page, the lightest is both the ink and the inversion fill.

### Primary
There is no chromatic primary. **White** (`--fg`, #fafafa) carries identity: display ink, focus rings, the pulse dot, selection fill.

### Neutral
- **Screen** (`--bg`, #050505): the page and all resting surfaces; also the inversion text color.
- **Ink** (`--fg`, #fafafa): all primary text; also the inversion fill (`--invert-bg`).
- **Muted** (`--muted`, #a6a6a6): secondary text, notes, icons, ticker, footer (8.3:1 on Screen).
- **Hairline** (`--hairline`, rgba(250,250,250,.16)): row dividers, ticker rules, chip border.
- **Hairline strong** (`--hairline-strong`, rgba(250,250,250,.4)): secondary button border, billing link underline.
- **Pulse ring** (`rgba(250,250,250,.35)`): the expanding verification ring; the only box-shadow, transient.

### Named Rules
**The Black-Only Rule.** One fixed dark theme; no light variant, no accent hue, no tinted grays. If a design needs color to communicate, it is off-world.

**The Title-Card Rule.** Interaction = inversion. Hover flips background and text between Screen and Ink. Nothing changes hue because no hue exists.

## Typography

**Display Font:** Archivo Black (self-hosted 400) with Archivo → Hiragino Kaku Gothic ProN → Noto Sans JP fallbacks
**Body Font:** Archivo (self-hosted 400/500/600/700), same JP fallbacks
**Mono Font:** IBM Plex Mono (400/500) with ui-monospace fallback

**Character:** One grotesque family in two weights of voice — Archivo Black roars in uppercase at poster scale; Archivo whispers in 0.72rem tracked caps as film credits. Japanese text falls to Hiragino/Noto system faces.

### Hierarchy
- **Display** (Archivo Black 400, `max(3.2rem, min(24rem, calc((100vw - 4rem)/5.02)))`, 0.85, −0.015em, uppercase, centered, nowrap): the H1 wordmark, once per page, full-bleed; sized so the ink spans the viewport with near-constant side margins (~25–40px across widths; growth stops at the 24rem cap on ≈1930px+ viewports).
- **Credits** (600, 0.72rem, +0.14em, uppercase, muted): billing block, nav chip, section heading, ticker; 0.62rem on the chip below 560px.
- **Lead** (400, 0.95rem, 1.7, muted): one Japanese sentence, max-width 36rem.
- **Row label** (600, 0.95rem): link-list labels; wordmark uses Archivo Black at 1rem.
- **Note** (400, 0.85rem, muted, right-aligned): per-link annotations; hidden below 560px.
- **Mono** (IBM Plex Mono 400, 0.8rem): ed25519 fingerprint and keybase.txt link only.

### Named Rules
**The Mono-as-Proof Rule.** IBM Plex Mono appears only where cryptographic identity is spoken. Credits microtype is tracked Archivo caps, never mono.

**The Poster Rule.** Display type fills the viewport once, sized from measured ink width (`calc((100vw - 4rem) / 5.02)` for TETUO41's ≈5.01em ink); it is never set at a comfortable reading size.

## Layout

A single centered column, `max-width: 56rem` (896px) with 1.5rem gutters, shared by nav, main, and footer. The H1 breaks out full-bleed (`margin: 0 calc(50% - 50vw)`). Vertical rhythm: nav (1.4rem top) → hero (5.5rem top / 5rem bottom; 3.5/4 on mobile) with billing under the title (2rem top, hairline rule, 1rem padding) → links section (1.5rem top / 5rem bottom) → full-bleed ticker → footer (2rem top / 3.5rem bottom).

The link list is one `grid-template-columns: auto 1fr auto auto` row per link (icon · label · note · arrow) separated by hairlines. The CTA row wraps with 0.75rem gap. Single breakpoint at 560px: notes drop out, rows go 3-column, footer stacks, chip shrinks and drops its English gloss.

## Elevation & Depth

No shadows at rest. The one box-shadow is the pulse dot's transient expanding ring. Depth is atmosphere: a fixed film-grain overlay (SVG feTurbulence, opacity .055, 180px tile) covering the whole viewport, and motion itself — roll-in, marquee, grain jitter. `html { overflow-x: clip }` guards the nowrap title.

## Shapes

Everything is a rectangle; corner radius is 0 throughout (buttons, chip, rows). The only circle is the 7px pulse dot. Borders are 1px hairlines. Icons are 24px-grid line icons at 1.8 stroke or brand fills (GitHub, X, Medium, SoundCloud), 20px in rows.

## Components

### Buttons
- **Shape:** sharp rectangle, 1px border, inline-flex, 0.6rem icon gap, 0.78rem/600 caps at +0.1em
- **Primary:** Ink fill on Screen text (`--invert-bg`/`--invert-fg`), padding 0.72rem × 1.3rem; hover empties to transparent bg, fg text, hairline-strong border
- **Secondary:** transparent with hairline-strong border; hover inverts to Ink fill
- **Press:** `scale(0.98)`; all transitions 160ms ease; `:focus-visible` = 2px fg outline, 3px offset

### Verified Chip (nav)
- **Style:** hairline-bordered rectangle, credits microtype, muted; white 7px pulse dot (2.4s ring)
- **Hover:** full title-card inversion
- **Mobile:** 0.62rem, gloss dropped

### Link List Rows
- **Structure:** hairline rows, 4-column grid (20px icon · label · note · 15px arrow), 0.9rem × 0.5rem padding, 1rem gap
- **Hover:** the signature — full inversion to Ink fill; icon, note, and arrow flip to inversion-ink; arrow slides in from (−4px, 4px); 160ms
- **Reduced motion:** arrows statically visible

### Ticker (signature motion)
- **Style:** full-bleed strip, hairline rules top and bottom, credits microtype, aria-hidden decorative repetition of verified facts (SIGNATURE VERIFIED · KEYBASE ED25519 · TETUO41.COM · TOKYO · HIROKI HATSUSHIKA)
- **Motion:** seamless `translateX(-50%)` loop, 80s linear (~64px/s); each copy wider than the widest viewport; stops dead under reduced motion

### Film Grain
- **Style:** fixed overlay, feTurbulence noise tile (180px), opacity .055, pointer-events none
- **Motion:** 0.9s `steps(1)` position jitter (~8fps); static under reduced motion

### Navigation
- Flex space-between in the 56rem column: Archivo Black uppercase wordmark left, verified chip right.

## Do's and Don'ts

### Do:
- **Do** keep the theme black-fixed; both `theme-color` metas and `color-scheme` say #050505 / dark.
- **Do** make every interactive surface invert on hover — one gesture, system-wide, 160ms.
- **Do** honor `prefers-reduced-motion`: no roll-in, no pulse, no marquee, no grain jitter; arrows visible.
- **Do** set credits microtype as tracked Archivo caps (+0.14em), and size display type from measured ink, not viewport guesses.
- **Do** keep the ticker and grain decorative: aria-hidden, no unique content, machine text stays in mono.

### Don't:
- **Don't** introduce any chromatic color, gradient, or a light theme; monochrome is the identity.
- **Don't** round corners or add shadows at rest; rectangles and hairlines only.
- **Don't** set body copy in mono, or decoration in mono — mono is proof text only.
- **Don't** fabricate content; the page states only verified facts and confirmed links.
- **Don't** add a second continuous motion; the ticker is the page's only loop.
