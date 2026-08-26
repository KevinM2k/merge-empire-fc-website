# Design

<!-- impeccable:design-schema 1 -->

## The world

**A spotlit pack of cards on a dark arena floor.** Rarity is the palette: the
page is near-black and nearly colourless until a card appears, and then the
card's tier colour is the brightest thing on screen. Nothing else is allowed to
compete with the art — the illustrations are the most persuasive asset the
product has, and every other decision defers to them.

Refused, deliberately: the glassy translucent card shell, the blue-to-purple
gradient, the floating 3D phone mockup, and the neon-on-black cyberpunk read.
Those are what this category ships; the arena is lit like a stadium at night,
not like a SaaS landing page.

## Colour

Ground is `--ink #07090f`, raised surfaces `--ink-2 #0d111b` and
`--ink-3 #141a28`. Text is `--paper #f2f5fa`, muted `--mute #8a99b5`, dim
`--dim #55637d`.

The accent set is the game's own tier ladder and is used for nothing else:

| Token | Value | Tier |
|---|---|---|
| `--bronze` | `#ff9a3c` | Bronze Pro |
| `--silver` | `#cfd8dc` | Silver Rising / Silver Star |
| `--gold` | `#ffd23f` | Gold Elite / Gold Superstar |
| `--champion` | `#b79cff` | Champion |
| `--legend` | `#e6a8ff` | Legend |
| `--ultimate` | `#ffe27a` | Ultimate |

Gold is the primary action colour because it is the tier a player is climbing
towards. A colour outside this table is a bug. The one non-tier hue is
`--pitch #00c853`, reserved for the pitch itself and for success states.

## Light

One warm radial spotlight from above centre, `rgba(255,210,63,.16)` falling to
transparent by 70%, with a soft elliptical pool on the floor beneath the cards.
Glow belongs to cards and to nothing else: no glowing buttons, no glowing
section headings, no glowing borders on containers.

## Type

Display is **Big Shoulders Display** 800/900, uppercase, line-height `.86`,
letter-spacing `-.01em`, set large — headline sizes start at `clamp(42px,6vw,88px)`
and the hero runs to `clamp(58px,8.6vw,132px)`. Body is **Archivo** 400/500,
17px base, line-height 1.65, max 62 characters.

Eyebrows are Archivo 600 at 13px with `.22em` tracking, uppercase, in `--mute`.
Roman numerals mark tiers; Arabic numerals mark divisions and ratings.

## Cards

The atom of the system. 3:4.2 ratio, 18px radius, `--ink-3` fill, 1.5px border
in `--edge`. The square art sits flush to the top edge — the art is opaque
512×512 JPEG, so it is framed, never cut out or floated. A meta row beneath
carries position on the left and tier numeral on the right, coloured by tier.
Tier colour appears as an inset ring plus a bottom-up wash, never as a solid
fill behind the art.

## Motion

Snap into place, settle slowly: `cubic-bezier(.16,1,.3,1)` at 850ms for cards,
180ms for hovers. Motion earns its place by explaining the mechanic — the pack
deals, the ladder reveals in sequence, the tier lights as it enters. Ambient
motion is limited to the one breathing spotlight.

Everything is gated on `prefers-reduced-motion`, which collapses transitions to
`.01ms` and puts every revealed element in its final state.

## Structure

Sections are 120px vertical (84px under 900px), inside a 1240px container with
24px gutters. A section opens with an eyebrow, then a display heading, then at
most 52 characters of supporting text.

A store link is on screen at all times: in the hero, and after the hero in a
fixed bottom bar that slides up when the arena scrolls out. This is the site's
one non-negotiable layout rule — the previous design put the only real CTA at
the foot of the page.

## Compliance surfaces

`privacy-policy.html` and `delete-account.html` inherit the world but drop the
arena: no spotlight, no cards, a single measured column at 720px. Their body
copy is legally load-bearing and is never edited for rhythm.
