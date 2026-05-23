# KINETIQ MASTER LIST — Complete Feature Checklist

**Purpose:** The detailed, itemized feature backlog for Kinetiq. Complements `KINETIQ_MASTER_ROADMAP.md` (strategy/phases) and `TRAINER_DASHBOARD_SPEC.md` (Phase 2 trainer spec).
**Status legend:** ✅ done · 🔄 in progress · [ ] not started

> Recovered/rebuilt 2026-05-23 from prior chat history during the move to Claude Code.

---

## ✅ COMPLETED (Phase 1)

**Core App**
- ✅ User authentication (Supabase)
- ✅ 9 training programs (Foundation, Strength, Hypertrophy, Balance, Deload, Mobility, HIIT, Resilience, Bodyweight)
- ✅ Workout tracking (sets, reps, weight, notes)
- ✅ Personal Records (PRs) tracking
- ✅ Rest timer with audio alerts (+/− buttons, defaults to 2:00)
- ✅ Workout history with volume charts
- ✅ Progress tracking (12-week volume graphs)
- ✅ Exercise-specific progress charts

**Nutrition**
- ✅ USDA API integration
- ✅ 20 seeded common foods
- ✅ Custom food creation
- ✅ Favorites system
- ✅ Meal templates
- ✅ Recipe builder
- ✅ Water tracker
- ✅ Macro goal setting + daily macro tracking
- ✅ Nutrition dashboard

**Gamification**
- ✅ 17 achievements across 5 categories
- ✅ Badge system (common, rare, epic, legendary)
- ✅ Animated unlock notifications
- ✅ Achievement collection page
- ✅ Streak tracking

**User Experience**
- ✅ 4-question onboarding wizard + smart program recommendations
- ✅ Enhanced dashboard (next workout, recent PRs, week preview, streaks)
- ✅ Search for programs/exercises
- ✅ Dark mode design, mobile-optimized UI

**Technical**
- ✅ PWA (installable, offline mode)
- ✅ Service worker caching (cache `kinetiq-v2.1.0`)
- ✅ Cloud sync (workouts) — core now working
- ✅ Supabase backend (all tables created)
- ✅ localStorage for offline data

---

## 🔄 IN PROGRESS / NEEDS VERIFICATION

- 🔄 Onboarding shows after sign-in/reset until refresh — cloud-first fix applied in `supabase-config.js`, **verify in Claude Code**
- [ ] Persist `onboarding_complete` to Supabase `profiles` row (not just localStorage)
- [ ] Mobile login email field hidden behind keyboard (only username visible)
- [ ] iOS PWA localStorage persistence (Safari eviction)
- [ ] iOS status bar / safe-area overlap (more testing)
- [ ] Sync: retry logic for failed uploads + offline queue

---

## 📝 PHASE 1 REMAINING

### High priority
- [ ] Onboarding should start programs from the beginning (week 1 / day 1, not a random week)
- [ ] Fix program name "Strong" → "Strength" in the recommended message
- [ ] Add recommended program back to dashboard (removed accidentally)
- [ ] Rest Day Tracker (log rest days so streaks don't break — recovery is part of training)
- [ ] Exercise Library (searchable; form cues, common mistakes, alternatives, muscles, equipment; YouTube links now, avatar later)
- [ ] Export Data (CSV/PDF of workouts; nutrition export; charts as images — user data ownership)
- [ ] More Programs (Core, Bulletproof, Physique; also planned: Longevity)
- [ ] UI Polish (animations, loading states, micro-interactions)
- [ ] Cloud sync for ALL data (PRs, body measurements, nutrition, water, active program, preferences — not just workouts)

### Medium priority
- [ ] Deload week automation
- [ ] Program progression tracking
- [ ] Volume recommendations (auto-suggest weight increases)
- [ ] Recovery score
- [ ] Bodyweight graphing
- [ ] Measurement photo tracking (before/after, side-by-side, private by default; Supabase Storage)
- [ ] Recovery tracking (sleep hours, soreness 1–10, energy, mood; correlate with performance)

### Low priority
- [ ] Workout templates (save custom workouts)
- [ ] Exercise substitutions
- [ ] Superset support
- [ ] Tempo tracking (3-0-1-0 notation)
- [ ] More calculators (Wilks score, body-fat % estimator, calorie burn per workout, plate calculator)
- [ ] Warm-up / cool-down templates (5-min dynamic warmup, 10-min mobility flow, post-workout stretch, foam-rolling guide)
- [ ] Program notes / journal (daily notes beyond exercise notes, weekly reflections, monthly reviews, goal setting)
- [ ] Nutrition enhancements (meal planning for the week, shopping lists from meal plan, micronutrient tracking, restaurant database)

---

## 🎤 VOICE / CAMERA / PERMISSIONS (booked for later)

**Voice input (talk-to-text) — needs mic permission**
- [ ] Voice search for food logging (Web Speech API)
- [ ] Voice logging of sets/reps/weight hands-free
- [ ] Voice notes on workouts
- [ ] (Phase 3) Voice control: "Hey Kinetiq, start workout / next exercise"
- Note: Web Speech API support is limited on iOS Safari — plan a fallback or wait for the Phase 4 native build.

**Camera — needs camera permission (also foundation for Phase 4 MediaPipe)**
- [ ] Progress photos (front/side/back), compare over time
- [ ] Barcode scanning for food (revisit — earlier attempt failed; consider html5-qrcode, manual entry as fallback; low priority since most logged foods have no barcode)
- [ ] Build one reusable `requestPermission(type)` helper so Phases 3–4 inherit it

---

## ✨ SOCIAL SHARING & "MAKE IT FUN" (Phase 1 partial → Phase 2 full)

**Shareable content (organic growth)**
- [ ] PR cards (exercise, weight×reps, est. 1RM, date, branding) → canvas image → share/download
- [ ] Workout summary cards ("Today: 12,400 lbs moved, 6 exercises, 45 min")
- [ ] Streak milestone cards ("🔥 30-day streak!")
- [ ] Achievement unlock share (image/GIF)
- [ ] Progress photo collage (before/after, opt-in)
- [ ] Web Share API (`navigator.share`) on mobile; download fallback on desktop

**Fun / engagement / retention**
- [ ] Confetti / haptics on PR, achievement, workout completion
- [ ] Daily/weekly recap with playful framing
- [ ] Monthly personal-bests highlight reel
- [ ] Rest-timer mini-distractions (quote / "did you know")
- [ ] Customizable themes / accent colors (some unlocked via achievements)
- [ ] Sound design (rep-log tick, PR fanfare, timer chime options)
- [ ] Weekly challenges with small rewards

**Quality-of-life**
- [ ] Plate calculator
- [ ] Warmup set suggestions based on working weight
- [ ] "Repeat last workout" one-tap
- [ ] Quick-edit a logged set
- [ ] Friendly empty/loading/error states
- [ ] Onboarding tooltips / coach marks
- [ ] Settings: units (lb/kg), rest-timer default, theme, notifications
- [ ] Reminders / push notifications (needs notification permission)
- [ ] Search across history ("when did I last squat?")

---

## 🎯 PHASE 2 — COMMUNITY & MONETIZATION

**Social**
- [ ] Community profiles (public optional)
- [ ] Workout feed (share workouts/PRs/progress photos)
- [ ] Follow system
- [ ] Like/comment on posts
- [ ] Challenges (e.g., 30-day squat challenge)
- [ ] Leaderboards (volume %-normalized, consistency, PRs, streaks)

**Monetization (Stripe)**
- [ ] Subscription tiers (Free / Paid / Trainer)
- [ ] 7-day free trial
- [ ] Payment portal + billing management

**Trainer features** → see `TRAINER_DASHBOARD_SPEC.md`
- [ ] Trainer dashboard, assign programs, view client history/streaks, client progress

**Content**
- [ ] Article/video curation feed (Heath curates only, no user posting)
- [ ] Newsletter system

---

## 🎬 PHASE 3 — AVATAR COACHING (differentiator)

- [ ] Heath films unique exercises (~200–400 videos, 20–40s each)
- [ ] Record ~5 min audio for voice cloning
- [ ] HeyGen or Synthesia avatar (Heath's likeness)
- [ ] ElevenLabs voice clone
- [ ] 5 coach personalities (Motivator, Drill Sergeant, Zen Master, Best Friend, Scientist)
- [ ] Audio ducking (user's music continues, voice ducks it)
- [ ] User-created avatars for multi-user workouts

---

## 🎥 PHASE 4 — MEDIAPIPE FORM FEEDBACK (flagship)

- [ ] Real-time body pose detection (33 landmarks, in-browser)
- [ ] Form checks: squat (depth, knee valgus, heel, torso), deadlift (back round, bar path, hinge), bench (bar path, elbow, arch), press (bar path, core, lockout), row (torso, pull, ROM)
- [ ] Visual skeleton overlay + audio cues
- [ ] Form quality scoring
- [ ] Multi-user avatar workouts with form comparison + social leaderboards
- [ ] Capacitor native apps (iOS App Store + Google Play) for better camera/background

---

## 🛠️ TECHNICAL DEBT

**High:** better network-failure error handling · sync conflict resolution (last-write-wins) · offline sync queue · service-worker "update available" notification
**Medium:** code splitting (`app.js` 1500+ lines) · lazy-load programs · image optimization · bundle size
**Low:** TypeScript · unit tests for sync · E2E (Playwright) · perf monitoring (Sentry)

---

## ⚡ RECOMMENDED PRIORITY ORDER (original guidance)

🔥 **First:** finish all-data cloud sync · onboarding persistence · rest-day tracker · service-worker update prompt
📊 **Next:** export data · exercise library · measurement photos · share/PR cards
🎨 **Later:** social/community · custom program builder · advanced nutrition · avatar (Phase 3)

**Design philosophy:** keep it simple, mobile-first, fast logging (tap-tap-tap), celebrate wins, don't let perfect be the enemy of good.
