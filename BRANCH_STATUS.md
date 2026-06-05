# BRANCH_STATUS — Mavado Gully Side

**App path:** `active_apps/artise_sites/mavado-gullyside/`
**Live domain:** mavadogullyside.com (not yet deployed)
**VPS container:** `mw-mavado` (assigned, not yet deployed)
**VPS port:** 7018
**Repo:** `https://github.com/HammazoneRecords/mavadogullyside`

---

## Current State

| Branch | Last Updated | Deployed? | Notes |
|---|---|---|---|
| master | 2026-06-05 | ⬜ Local only | Real→GTA crossfade bg, profile pic, semi-transparent nav |

## Last Action

**Date:** 2026-06-05
**Branch:** master
**Action:** Background hero system + avatar + freeze effect
**What changed:**
- Real photo (`288591b1...jpg`) as base background layer, GTA illustration crossfades in after 3s via CSS opacity transition
- Both images use identical `objectPosition: center top` — matched crop
- Background: `brightness(0.22) saturate(0.5)` on real photo; `brightness(0.2) saturate(0.55) blur(1.4px)` on GTA after freeze
- Dark vignette gradient + scanlines overlay for paused-menu depth
- TopBar avatar: replaced "DB" initials with Photoroom cutout (`...-Photoroom.png`), zoomed to `auto 340%` shoulders-up crop
- TopBar + TabBar opacity reduced to 0.72/0.68 — semi-transparent so CASSAVA PIECE LIVE! text visible through nav
- `frozen` state added to App; triggers 3s after intro exits
- INS-115 captured: semi-transparent nav reinforces UI-as-overlay effect on full-bleed sites
**Schema migration:** none

---

## Active Feature Branches

None.

## Pending Merges

- [ ] `master` → VPS deploy (waiting on: domain configuration + intro video)

---

## History

| Date | Branch | Action | Notes |
|---|---|---|---|
| 2026-06-03 | master | Initial build — GTA V pause menu concept | Repo: HammazoneRecords/mavadogullyside |
