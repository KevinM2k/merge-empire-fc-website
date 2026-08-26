# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Four audiences arrive at this site, and the page has to work for all of them at once:

- **Idle/merge players** looking for the next one. They judge on progression depth, offline earnings and whether the merge loop feels good.
- **Football fans first**, who want the manager fantasy — squads, transfers, promotion. The merge mechanic is the novelty rather than the draw.
- **Lapsed Football Manager players** who loved deep management sims and no longer have the hours for one.
- **Cold ad traffic**, which bounces fast. For this group the site has one viewport to convert.

The common job: decide, in under a minute, whether this game is worth installing.

## Product Purpose

Merge Empire Football Manager is a free mobile idle/merge football card game for Android and iOS, developed by Kevin Matthews. This site is its marketing surface, and its single success metric is installs from the two store links.

## Positioning

**Depth behind a simple loop.** It presents as a merge game and has a real management sim underneath — seven divisions, transfers and deadline day, sponsors, club buildings, cups, leaderboards. Competing football merge games have the loop and almost none of the depth. That contrast is the reason to install, so the page must show the depth rather than assert it.

## Operating Context

Played in short bursts on a phone, often one-handed, with progress continuing between sessions. Visitors reach the site from ads, store listings and social links, mostly on mobile.

## Capabilities and Constraints

- Merge duplicate player cards to evolve them; 66 player cards across 8 tiers.
- Seven divisions from Sunday League upward; cups, sponsors, transfers and deadline day.
- Club buildings — stadium, training, sponsor, merch.
- Optional sign-in (Google/Apple) for cloud saves and global leaderboards.
- Free to play, supported by AdMob ads and in-app purchases including the VIP Manager Pass, which removes interstitials.
- Static site on GitHub Pages at www.mergeempirefc.co.uk. No build step, no framework: hand-written HTML, one stylesheet, vanilla JS. Any redesign must keep that.
- Firebase Analytics is loaded behind a cookie-consent banner and must be preserved.
- `privacy-policy.html` and `delete-account.html` are compliance surfaces required by Google Play. Their content is legally load-bearing and must not be restyled into inaccuracy.

## Brand Commitments

- The apps are published as **Merge Empire Football Manager**; the site and short-form branding use **Merge Empire FC**. Both names are live.
- Existing icon at `assets/icon-512.png`.
- Store URLs are fixed: Google Play `com.mergeempirefc.app`, App Store id `6766095870`.

## Evidence on Hand

- **Real store ratings**, checked 2026-08-26: Google Play 4.8★ from 29 reviews; App Store 5.0★ from 10 ratings (GB storefront). These are small samples and must be shown with their counts.
- **Gameplay video** on YouTube, id `TiQ95ilm3-I`.
- **Game art** in `assets/`: 60+ player card renders across tiers and positions, stadium photography, trophies, club buildings, penalty sprites.
- No download-count band, no press, no testimonials, no awards. None of these may be invented.

## Product Principles

1. **Show the depth, do not claim it.** The differentiator is a sim underneath a merge loop; a visitor must see evidence of it above the fold.
2. **One viewport to convert.** Cold traffic decides fast, so a store link belongs in the first screen, not only at the bottom of the page.
3. **The card art is the product.** It is the most persuasive asset available and should carry the page.
4. **Never fabricate proof.** Only the ratings above exist; absent evidence stays absent.
5. **Stay static.** No framework, no build step — the site must remain hand-editable HTML/CSS/JS on Pages.

## Accessibility & Inclusion

Motion must respect `prefers-reduced-motion`. The game is rated 9+/PEGI-equivalent and the site should stay legible on small phones in bright light — real contrast, not thin grey text on navy.
