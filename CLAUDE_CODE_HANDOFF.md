# KINETIQ — CLAUDE CODE HANDOFF
**Created:** 2026-05-23 · **Purpose:** Everything Claude Code needs to pick up exactly where chat left off.

> Drop this file in the repo root. Tell Claude Code: *"Read CLAUDE_CODE_HANDOFF.md and KINETIQ_MASTER_ROADMAP.md before doing anything."*

---

## 1. WHAT KINETIQ IS (60-second version)

Kinetiq is a **mobile-first PWA fitness app** — vanilla JavaScript (no framework), hosted on **GitHub Pages**, backed by **Supabase** (auth + Postgres + cloud sync). It works offline via a service worker and installs to the iOS/Android home screen.

- **Owner/dev:** Heath (solo, learning as he builds — prefers being *taught* the implementation, not just handed code).
- **Live URL:** `https://heathchartier.github.io/kinetiq/`
- **Brand:** Kinetiq = "your personal fitness operating system." No ads, ever.
- **Long game (4 phases):** (1) Core tracker — *we are here*; (2) Community/social + trainer dashboard + Stripe; (3) AI avatar trainer (HeyGen/Synthesia + ElevenLabs voice); (4) **Flagship:** MediaPipe real-time form feedback + multi-user avatar workouts, wrapped native via Capacitor.

Full product detail lives in **`KINETIQ_MASTER_ROADMAP.md`** — that's the source of truth. This doc is the technical handoff.

---

## 2. TECH STACK

| Layer | Choice |
|---|---|
| Frontend | Vanilla HTML/CSS/JS (no build step, no framework) |
| Backend | Supabase (Postgres, Auth, RLS) |
| Hosting | GitHub Pages, repo deploys at `/kinetiq/` path |
| Offline | Service worker + Cache API, localStorage for offline data |
| PWA | `manifest.json`, installable, standalone display |
| Nutrition data | USDA FoodData Central API |

**Important deploy detail:** the app lives under the `/kinetiq/` path, so all asset/start URLs are `/kinetiq/...`. The service worker caches `/kinetiq/`, `/kinetiq/index.html`, etc. Don't switch to root paths without updating the SW + manifest together.

---

## 3. FILE INVENTORY (bring ALL of these into the repo)

### Core app files
- `index.html` — main HTML shell
- `app.js` — main app logic (~1500+ lines: programs, workout tracking, timer, charts)
- `data.js` — all program data (the 9 Kinetiq programs)
- `style.css` — all styles (~2400+ lines)

### Feature modules
- `auth.js` — sign up / in / out + cloud sync logic (`syncWorkoutsToCloud()` lives in this area)
- `supabase-config.js` — Supabase client init + `onUserSignedIn()` flow (onboarding fix lives here)
- `achievements.js` — 17-achievement badge system
- `onboarding.js` — 4-question onboarding wizard + program recommendation

### PWA files
- `service-worker.js` — offline caching. **Current cache name: `kinetiq-v2.3.0`** (bump this on every deploy that changes cached files, or users get stale code)
- `manifest.json` — PWA config, Kinetiq branding, `/kinetiq/` start URL
- `icons/kinetiq-icon.png` — app icon

### Docs (keep in repo root)
- `KINETIQ_MASTER_ROADMAP.md` — product source of truth (this session's revised version)
- `CLAUDE_CODE_HANDOFF.md` — this file
- `TRAINER_DASHBOARD_SPEC.md` — Phase 2 trainer features spec *(if you still have it — recreate if lost)*

> ⚠️ If any of the above files only exist as Claude-chat outputs, **download them from the last chat and commit them**. The repo is the new source of truth — Claude Code reads the actual files, not chat history.

---

## 4. WHERE WE LEFT OFF (exact state — updated 2026-05-23)

### ✅ Completed (2026-05-23 session)
- **Cross-device sync** — FIXED. SW bumped `v1.0.0 → v2.1.0`, dedupe rework. All workouts upload.
- **Password reset / forgot password** — works on desktop + Safari.
- **Onboarding flash after sign-in** — FIXED. `onUserSignedIn()` is now `async`; checks Supabase `profiles.primary_goal` + workouts count before showing onboarding. localStorage used as fast-path for returning devices. Verified in browser (`isAsync: true`).
- **Mobile keyboard overlap** — FIXED. `setupMobileKeyboardFix()` scrolls active input into view on focus (300ms delay). Modal uses `100dvh`/`75dvh` so it shrinks when keyboard opens on iOS 15.4+/Chrome 108+. Verified (`hasKeyboardFix: true`, `dvhFound: true`).
- **iOS PWA localStorage eviction** — FIXED. `syncDataFromCloud()` now restores: active program position (`currentProgram`/`currentWeek`/`currentDay` from `active_programs` table) + onboarding prefs (`primary_goal`/`fitness_level` from `profiles`). After storage eviction, one sign-in restores full state. Verified (`syncActiveProgramFromCloud: true`, `syncOnboardingPrefsFromCloud: true`).
- **Current SW cache version:** `kinetiq-v2.3.0`

### 📋 One manual step still pending
Run this SQL in Supabase SQL Editor (adds `onboarding_complete` column to make the cloud check explicit rather than proxy-based):
```sql
ALTER TABLE public.profiles ADD COLUMN onboarding_complete BOOLEAN DEFAULT false;
```
Then in `auth.js` → `syncOnboardingPrefsToCloud()`, uncomment the `onboarding_complete: true` line.

### Device/environment notes
- **Desktop Chrome:** All fixes verified locally.
- **iPhone Safari / PWA:** Keyboard fix deployed — test on real device to confirm. Safe-area overlap on notch/Dynamic Island still needs testing.
- Benign console error: *"A listener indicated an asynchronous response... message channel closed"* — browser extension noise, not Kinetiq. Ignore.

---

## 5. IMMEDIATE TASK QUEUE (do in this order)

1. ✅ ~~Verify the onboarding cloud-first fix~~ — DONE
2. ✅ ~~Fix mobile login field hidden behind keyboard~~ — DONE
3. ✅ ~~iOS PWA localStorage persistence~~ — DONE (sync restores everything; auth session re-login is acceptable)
4. **Run the Supabase SQL** above to add `onboarding_complete` column, then update `syncOnboardingPrefsToCloud()`.
5. **iOS status-bar / safe-area** — confirm header padding with `env(safe-area-inset-top)` across notch/Dynamic Island devices. Test on real iPhone.
6. **Sync hardening** — retry logic for failed uploads + offline queue that flushes when back online.

Then pick from **Phase 1 Remaining** in the roadmap (program-start-from-beginning, "Strong→Strength" label fix, recommended program back on dashboard, rest-day tracker, export data, etc.).

---

## 6. DATABASE (Supabase) — quick reference

**Project URL:** `https://oywpcylrpgsdorsvysam.supabase.co`
**Anon key:** in `supabase-config.js` (public anon key — fine client-side because RLS is on).

**Tables:** `profiles`, `programs`, `active_programs`, `workouts`, `personal_records`, `kinetiq_foods`, `user_custom_foods`, `food_log`, `nutrition_goals`, `streaks`, plus Phase-2 tables (`workout_posts`, `challenges`, `challenge_participants`, `trainer_clients`).

- `workouts` dedupe key used in sync = `user_id` + `completed_at` + `workout_name`.
- All tables have **RLS** so users only see their own rows. If an insert silently "succeeds" but nothing appears, suspect an RLS policy first.

---

## 7. SECRETS / CONFIG HYGIENE (set this up early in Claude Code)

- Create a **git-ignored** local config (`.env` or `config.local.js`) for any real secrets (USDA key, future HeyGen/ElevenLabs/Stripe keys).
- Add a committed `config.example.js` showing the shape with placeholder values.
- Supabase URL + **anon** key can stay in `supabase-config.js` (public by design).
- **Do NOT** paste secret keys into roadmap/handoff docs or commit them. The old USDA key that was in the roadmap has been redacted there — keep the real value in your password manager / local config. (If it was ever committed publicly, **rotate it**.)

---

## 8. GIT / DEPLOY WORKFLOW REMINDERS

- Repo deploys to GitHub Pages at the `/kinetiq/` path. After pushing, **hard-refresh** and check DevTools → Application → Service Workers to confirm the new SW activated.
- **Every time you change a cached file, bump the cache version** in `service-worker.js` (e.g. `kinetiq-v2.1.0 → v2.2.0`). This is the single most common reason "my fix didn't show up."
- Consider adding a small **"new version available, tap to refresh"** prompt (in the High-Priority technical debt list).

---

## 9. HOW HEATH LIKES TO WORK (for Claude Code)

- Explain the *why*, not just the diff — he's learning the stack.
- Mobile-first: test reasoning against iPhone Safari + installed PWA, not just desktop Chrome.
- Keep the roadmap updated — he treats `KINETIQ_MASTER_ROADMAP.md` as the canonical "nothing gets forgotten" doc. Update it as features land.
- Vanilla JS by choice; don't introduce a framework/build step without discussing the tradeoff.

---

## 10. STARTER PROMPT TO PASTE INTO CLAUDE CODE

> "This is Kinetiq, a vanilla-JS PWA fitness app on GitHub Pages with a Supabase backend. Read `CLAUDE_CODE_HANDOFF.md` and `KINETIQ_MASTER_ROADMAP.md` in the repo root first. We just fixed cross-device sync and applied an onboarding fix in `supabase-config.js` that needs verifying. Start by walking me through the current `onUserSignedIn()` flow, confirm the cloud-first onboarding check is correct, and then we'll fix the mobile login field that's hidden behind the keyboard. Explain your reasoning as we go — I'm learning the stack."
