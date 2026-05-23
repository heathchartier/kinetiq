# KINETIQ MASTER ROADMAP & FEATURE TRACKER
**Last Updated:** 2026-05-23  
**Current Phase:** Phase 1 (~92% complete)  
**Critical Issues:** Onboarding/login persistence + iOS PWA polish (sync core now FIXED)

> **MIGRATION NOTE (2026-05-23):** Project is moving from Claude chat to **Claude Code**.
> See `CLAUDE_CODE_HANDOFF.md` for the full onboarding package, repo setup, and
> exact "where we left off" state. This roadmap remains the product source of truth.

---

## 🎯 PROJECT VISION

**Kinetiq is the world's first AI-powered fitness operating system with:**
1. Real-time form feedback via MediaPipe (Phase 4 - FLAGSHIP FEATURE)
2. AI avatar trainer (Phase 3) that coaches you through workouts
3. Multi-user avatar workouts - users can create avatars to train together (NEW BRAINSTORM)
4. Cross-platform (web, mobile PWA, future native apps)
5. Works offline with cloud sync
6. Complete nutrition tracking + workout programs

---

## ✅ RESOLVED - CROSS-DEVICE SYNC (was Priority 1)

### **Original Problem:**
- Desktop had 14 workouts locally; cloud (Supabase) only had 7; mobile only saw 7.
- Force Sync did not upload the missing 7.

### **What fixed it:**
- Added verbose logging to `syncWorkoutsToCloud()` to see which workouts were skipped/why.
- Bumped service worker cache `kinetiq-v1.0.0` → `kinetiq-v2.1.0` (old SW was serving stale code and blocking the update). **Service worker #209 with cache `kinetiq-v2.1.0` is now activated and running** (confirmed in DevTools 5/3/2026).
- Reworked the dedupe check in the upload loop (match on `user_id` + `completed_at` + `workout_name`).

### **Status:** Core sync works. Still TODO: retry logic for failed uploads + an offline queue (see Technical Debt).

---

## 🚨 CURRENT TOP BLOCKER - ONBOARDING/LOGIN PERSISTENCE (PRIORITY 1)

### **Problem:**
- After password reset OR fresh sign-in, the user is dropped on the **onboarding screen** instead of their dashboard. A manual page **refresh** then correctly shows their account. Logging out re-triggers onboarding.

### **Root Cause:**
`onUserSignedIn()` checks `localStorage` (`ls_onboarding_complete`) **before** cloud data has synced. On a new device / post-reset, that flag isn't present yet, so onboarding shows until a refresh pulls cloud data.

### **Fix applied (needs verification in Claude Code):**
- Reordered `onUserSignedIn()` to check the **cloud profile / workout data first**; if the user already has workouts or a completed-onboarding profile in Supabase, skip onboarding entirely. (Edited in `supabase-config.js`, ~+46/-27 lines.)

### **Verify next:**
1. Fresh sign-in on a device with no localStorage → should land on dashboard, no refresh needed.
2. Password reset flow → should land on dashboard.
3. Logout/login loop → should NOT re-show onboarding.
4. Persist `onboarding_complete` to the Supabase `profiles` row (not just localStorage).

---

## 📱 MOBILE-FIRST STRATEGY

**Goal:** App works perfectly on mobile, scales to desktop/TV

**Requirements:**
- ✅ PWA installable on iOS/Android
- ⚠️ Cross-device sync (BROKEN - fixing now)
- ✅ Offline mode works
- ✅ Touch-optimized UI
- ⚠️ PWA safe areas (needs more testing)
- 🔄 Future: Cast to TV for avatar workouts

**TV Integration Plan (Phase 3+):**
- Users can cast workout to TV
- Avatar appears on big screen
- Phone becomes controller
- MediaPipe uses phone camera for form feedback
- TV shows form cues in real-time

---

## 🤖 PHASE 3: AI AVATAR TRAINER

### **Core Features:**
1. **HeyGen or Synthesia Avatar**
   - Heath's digital likeness
   - Lip-synced to audio
   - Multiple angles (front, side, demo)

2. **ElevenLabs Voice Clone**
   - Heath's actual voice
   - Real-time TTS for exercise cues
   - "5 more reps, you got this!"

3. **5 Coach Personalities**
   - Motivator (hype, energetic)
   - Drill Sergeant (tough love)
   - Zen Master (calm, mindful)
   - Best Friend (supportive, casual)
   - Scientist (technical, data-driven)

4. **Exercise Video Library**
   - Avatar demonstrates each exercise
   - Multiple camera angles
   - Form cues overlaid

5. **Audio Ducking**
   - User's music continues playing
   - Avatar voice ducks music volume
   - Seamless integration

### **User Experience:**
- User starts workout
- Avatar appears (video or 3D model)
- Counts reps, gives form cues
- Motivates between sets
- Adjusts personality based on user preference

### **Technical Stack:**
- HeyGen API or Synthesia API (avatar generation)
- ElevenLabs API (voice synthesis)
- Web Audio API (audio ducking)
- Video.js or custom player
- React/HTML5 video integration

---

## 🎥 PHASE 4: MEDIAPIPE FORM FEEDBACK (FLAGSHIP)

### **The "Hasn't Been Done Yet" Feature**

**What is MediaPipe?**
- Google's ML framework for body pose detection
- Runs IN BROWSER (no server needed!)
- Real-time feedback (30+ FPS)
- Works on phone/laptop camera
- Detects 33 body landmarks

### **How It Works:**
1. User grants camera access
2. MediaPipe detects body pose in real-time
3. Algorithm checks form (squat depth, knee alignment, etc.)
4. Avatar gives instant feedback: "Knees caving! Push them out!"
5. Shows visual overlay (skeleton + form cues)

### **Form Checks We Can Detect:**
- **Squat:** Depth, knee valgus, heel lift, torso angle
- **Deadlift:** Back rounding, bar path, hip hinge
- **Bench Press:** Bar path, elbow flare, arch
- **Overhead Press:** Bar path, core stability, lockout
- **Row:** Torso angle, pull pattern, range of motion

### **NEW BRAINSTORM: Multi-User Avatars**
- Users create their OWN avatars (not just Heath)
- Friend invites friend to workout together
- Both avatars appear on screen
- Real-time form comparison
- "Your friend is going deeper on squats!"
- Leaderboard for form quality scores
- Social motivation + accountability

**Use Cases:**
- Couples training together remotely
- Gym buddies who moved away
- Group fitness classes (5-10 avatars)
- Trainer supervising multiple clients

### **Technical Implementation:**
```javascript
// MediaPipe Pose Detection
import { Pose } from '@mediapipe/pose';

const pose = new Pose({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
});

pose.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: false,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

pose.onResults((results) => {
  if (results.poseLandmarks) {
    // Check squat depth
    const leftHip = results.poseLandmarks[23];
    const leftKnee = results.poseLandmarks[25];
    const leftAnkle = results.poseLandmarks[27];
    
    const squatDepth = calculateSquatDepth(leftHip, leftKnee, leftAnkle);
    
    if (squatDepth < 90) {
      avatar.say("Go deeper! Hips below parallel!");
    }
  }
});
```

### **Platform Requirements:**
- **Phase 4A (Browser):** Works on web (Chrome, Safari)
- **Phase 4B (Native):** Build Capacitor apps for better camera access
  - iOS app (App Store)
  - Android app (Google Play)
  - Better performance, background processing

---

## 📋 COMPLETE FEATURE LIST

### ✅ **COMPLETED (Phase 1)**

**Core App:**
- User authentication (Supabase)
- 9 training programs (Foundation, Strength, Hypertrophy, Balance, Deload, Mobility, HIIT, Resilience, Bodyweight)
- Workout tracking (sets, reps, weight, notes)
- Personal Records (PRs) tracking
- Rest timer with audio alerts
- Workout history with volume charts
- Progress tracking (12-week volume graphs)
- Exercise-specific progress charts

**Nutrition:**
- USDA API integration
- 20 seeded common foods
- Custom food creation
- Favorites system
- Meal templates
- Recipe builder
- Water tracker
- Macro goal setting
- Daily macro tracking
- Nutrition dashboard

**Gamification:**
- 17 achievements across 5 categories
- Badge system (common, rare, epic, legendary)
- Animated unlock notifications
- Achievement collection page
- Streak tracking

**User Experience:**
- 4-question onboarding wizard
- Smart program recommendations
- Enhanced dashboard (next workout, recent PRs, week preview, streaks)
- Search functionality for programs/exercises
- Dark mode design
- Mobile-optimized UI

**Technical:**
- ✅ PWA (installable, offline mode)
- ✅ Service worker caching
- ⚠️ Cloud sync (PARTIALLY WORKING - FIXING NOW)
- ✅ Supabase backend (all tables created)
- ✅ localStorage for offline data

---

### 🔄 **IN PROGRESS**

**Critical Fixes:**
- [x] Cross-device sync (FIXED - SW v2.1.0, dedupe rework, all workouts upload)
- [x] Service worker stuck on old version (FIXED - bumped v1.0.0 → v2.1.0, #209 running)
- [x] Password reset function / forgot password (DONE - flow works on desktop + Safari)
- [x] Onboarding shows after sign-in/reset until refresh (FIXED 2026-05-23 — onUserSignedIn async, checks Supabase profile.primary_goal + workouts; localStorage fast-path for returning devices)
- [x] Login email field hidden behind keyboard on mobile/PWA (FIXED 2026-05-23 — scroll-into-view on focus + 100dvh/75dvh CSS so modal shrinks with keyboard; SW bumped to v2.2.0)
- [x] PWA localStorage persistence on iOS (FIXED 2026-05-23 — syncDataFromCloud() now also restores active program from active_programs table + onboarding prefs from profiles; after storage eviction, one sign-in restores full state. SW bumped to v2.3.0)
- [ ] PWA status bar / safe-area overlap on iOS (header now below status bar but needs more testing) ← NEXT

---

### 📝 **PHASE 1 REMAINING**

**High Priority:**
- [ ] **Save Onboarding to Supabase Profile** (so it persists across devices - IN PROGRESS)
- [ ] **Onboarding Should Start Programs from Beginning** (not random week)
- [ ] **Fix Program Name "Strong" → "Strength"** (in recommended message)
- [ ] **Add Recommended Program to Dashboard** (was removed accidentally)
- [ ] **Password Reset Function** (DONE - but needs onboarding fix)
- [ ] **Fix Login Form on Mobile** (DONE - keyboard overlap)
- [ ] Rest Day Tracker (log rest days, maintain streaks)
- [ ] Exercise Library (searchable, with videos/form cues)
- [ ] Export Data (CSV/PDF of workouts)
- [ ] More Programs (Core, Bulletproof, Physique)
- [ ] UI Polish (animations, loading states, micro-interactions)

**Medium Priority:**
- [ ] Deload week automation
- [ ] Program progression tracking
- [ ] Volume recommendations (auto-suggest weight increases)
- [ ] Recovery score
- [ ] Bodyweight graphing

**Low Priority:**
- [ ] Workout templates (save custom workouts)
- [ ] Exercise substitutions
- [ ] Superset support
- [ ] Tempo tracking (3-0-1-0 notation)

---

### 🎤 **NEW BACKLOG (added 2026-05-23) — VOICE, CAMERA & MEDIA PERMISSIONS**

**Voice input (talk-to-text):** *(booked for later — needs mic permission)*
- [ ] Voice search for food logging ("two eggs and a banana") via Web Speech API (`SpeechRecognition`)
- [ ] Voice logging of sets/reps/weight hands-free during a workout
- [ ] Voice notes on workouts
- [ ] (Later, Phase 3) Voice control: "Hey Kinetiq, start workout / next exercise / start timer"
- **Permission infra needed:** request **microphone** access gracefully, store grant state, handle denial, iOS Safari quirks (Web Speech API support is limited on iOS — may need a fallback or native build in Phase 4).

**Camera (foundation for Phase 4 MediaPipe):** *(booked for later — needs camera permission)*
- [ ] Progress photos (front/side/back), stored per date, swipe to compare over time
- [ ] Barcode scanning for food logging (camera + barcode lib)
- [ ] Camera permission request flow (reused later by MediaPipe form feedback)
- **Note:** Build a single reusable `requestPermission(type)` helper now so Phases 3–4 inherit it.

---

### ✨ **NEW BACKLOG (added 2026-05-23) — SOCIAL SHARING & "MAKE IT FUN" UX**

**Shareable content (drives organic growth — partly Phase 1, fuller in Phase 2):**
- [ ] **Share PR cards** — auto-generate a clean image card (exercise, weight×reps, est. 1RM, date, Kinetiq branding) the user can post to IG/TikTok/X. Use canvas to render → download/share-sheet.
- [ ] **Workout summary card** — "Today: 12,400 lbs moved, 6 exercises, 45 min" as a shareable graphic.
- [ ] **Streak milestone cards** — "🔥 30-day streak!" shareable badge.
- [ ] **Achievement unlock share** — share the badge animation as an image/GIF.
- [ ] **Progress photo collage** — before/after side-by-side export (user opt-in).
- [ ] Web Share API (`navigator.share`) for native share sheet on mobile; download fallback on desktop.

**Fun / engagement / retention:**
- [ ] **Confetti / haptics** on PR, achievement unlock, and workout completion.
- [ ] **Daily/weekly recap** ("You moved a small car's worth of weight this week 🚗").
- [ ] **Personal bests highlight reel** at month end.
- [ ] **Rest-timer mini-distractions** — motivational quote or "did you know" between sets.
- [ ] **Customizable themes / accent colors** (unlock some via achievements).
- [ ] **Sound design** — satisfying rep-log tick, PR fanfare, timer chime options.
- [ ] **Weekly challenges** ("hit 3 workouts this week") with a small reward.

**User-friendliness / quality-of-life:**
- [ ] **Plate calculator** ("load 225 → 45+45+25 per side").
- [ ] **Warmup set suggestions** based on working weight.
- [ ] **"Repeat last workout"** one-tap.
- [ ] **Quick-edit a logged set** without re-entering everything.
- [ ] **Empty/loading/error states** with friendly copy (not blank screens).
- [ ] **Onboarding tooltips / coach marks** on first use of each screen.
- [ ] **Settings: units (lb/kg), rest-timer default, theme, notifications.**
- [ ] **Reminders / push notifications** ("Leg day is today 💪") — needs notification permission.
- [ ] **Search across history** ("when did I last squat?").

---

### 🎯 **PHASE 2: COMMUNITY & SOCIAL** (Not Started)

**See:** `TRAINER_DASHBOARD_SPEC.md` for complete spec

**Features:**
- Workout posts (share PRs, progress photos)
- Follow system
- Like/comment on posts
- Challenges (30-day squat challenge, etc.)
- Leaderboards (PRs, volume, streaks)
- Trainer Dashboard:
  - Client management
  - Program assignment
  - Progress tracking
  - Messaging
  - Payment processing (Stripe)

---

### 🤖 **PHASE 3: AI AVATAR** (Planned)

**Timeline:** After Phase 1 + 2 complete

**Features:**
- HeyGen/Synthesia avatar (Heath's likeness)
- ElevenLabs voice clone
- 5 coach personalities
- Exercise video library
- Audio ducking for user's music
- **NEW:** User-created avatars for multi-user workouts

**Deliverables:**
- Avatar video library (500+ exercise demos)
- Voice line recordings (1000+ cues)
- Personality system (different coaching styles)
- Video player with overlay controls
- Audio mixing system

---

### 🎥 **PHASE 4: MEDIAPIPE FORM FEEDBACK** (Flagship)

**Timeline:** After Phase 3 complete

**Features:**
- Real-time body pose detection (MediaPipe)
- Form feedback during exercises
- Visual skeleton overlay
- Audio cues from avatar
- Form quality scoring
- **NEW:** Multi-user avatar workouts with form comparison
- **NEW:** Social leaderboards for form quality

**Technical Requirements:**
- MediaPipe Pose library
- Camera access (browser + native)
- Real-time pose analysis algorithms
- Form validation logic per exercise
- Capacitor native apps (better camera access)

**Form Checks:**
- Squat: depth, knee alignment, heel position
- Deadlift: back angle, bar path, hip hinge
- Bench: bar path, elbow angle, arch
- Press: bar path, core stability
- Row: torso angle, pull pattern

---

## 🗂️ FILE STRUCTURE & KEY FILES

### **Core App Files:**
- `index.html` - Main HTML
- `app.js` - Main app logic (1500+ lines)
- `data.js` - All 9 programs data
- `style.css` - All styles (2400+ lines)

### **Feature Modules:**
- `auth.js` - Authentication & cloud sync
- `supabase-config.js` - Supabase client config
- `achievements.js` - Achievement system
- `onboarding.js` - User onboarding flow

### **PWA Files:**
- `service-worker.js` - Offline functionality
- `manifest.json` - PWA configuration

### **Supplemental:**
- `kinetiq-bodyweight.js` - Bodyweight exercise data
- `supabase-schema.sql` - Full DB schema reference

### **Documentation (repo root):**
- `KINETIQ_MASTER_LIST.md` - Complete feature checklist
- `TRAINER_DASHBOARD_SPEC.md` - Phase 2 trainer features
- `KINETIQ_MASTER_ROADMAP.md` - This file (master plan)
- `CLAUDE_CODE_HANDOFF.md` - Claude Code onboarding doc

---

## 📊 DATABASE SCHEMA (Supabase)

### **Tables Created:**
1. **profiles** - User info (id, email, bodyweight, fitness_level, primary_goal)
2. **programs** - Custom user programs
3. **active_programs** - Currently active program per user
4. **workouts** - Workout history (user_id, workout_name, started_at, completed_at, total_volume, exercises JSON)
5. **personal_records** - PRs (user_id, exercise_name, weight, reps, estimated_1rm, achieved_at)
6. **kinetiq_foods** - 20 seeded common foods
7. **user_custom_foods** - User-created foods
8. **food_log** - Daily food entries
9. **nutrition_goals** - User macro targets
10. **streaks** - Workout streaks (future)
11. **workout_posts** - Social posts (Phase 2)
12. **challenges** - Fitness challenges (Phase 2)
13. **challenge_participants** - Challenge enrollment (Phase 2)
14. **trainer_clients** - Trainer-client relationships (Phase 2)

### **Row Level Security:**
All tables have RLS policies ensuring users can only access their own data.

---

## 🔑 API KEYS & CREDENTIALS

> **SECURITY NOTE:** Do not commit secret keys to the repo or paste them into shared docs.
> Keep real values in a local `.env` / `config.local.js` that is **git-ignored**.
> The Supabase URL + **anon** key are safe to ship client-side (RLS protects data),
> but the USDA key and any future server keys should be treated as secrets.

**USDA Food API:**
- Key: `<stored separately — in your password manager / local config, NOT in this doc>`
- Usage: Nutrition tracking, food search

**Supabase:**
- URL: `https://oywpcylrpgsdorsvysam.supabase.co`
- Anon key: lives in `supabase-config.js` (public anon key — OK client-side with RLS on)
- Project: Kinetiq production database
- Usage: User data, cloud sync, authentication

**Future APIs (Phase 3+):**
- HeyGen or Synthesia (avatar generation)
- ElevenLabs (voice synthesis)
- Stripe (payments - Phase 2)
- MediaPipe (form feedback - Phase 4)

---

## 💡 KEY DESIGN DECISIONS

### **Why MediaPipe is the Flagship:**
1. **Nobody else does this well** - Peloton, Apple Fitness, etc. don't have real-time form feedback
2. **Runs in browser** - No server costs, instant feedback
3. **Actually useful** - Prevents injury, improves results
4. **Viral potential** - "This app told me my squat form was wrong and it was RIGHT"
5. **Multi-user potential** - NEW idea for avatar workouts together

### **Why Multi-User Avatars are Game-Changing:**
1. **Social + accountability** - Train with friends remotely
2. **Form competition** - "Who has better squat depth?"
3. **Network effects** - Users invite friends to train together
4. **Monetization** - Premium for group workouts
5. **Unique positioning** - No other app has this

### **Why Mobile-First:**
1. Most users workout with phone (not laptop)
2. Camera on phone for MediaPipe (Phase 4)
3. Can cast to TV for big screen avatar
4. PWA = no app store approval needed
5. Faster iteration, easier updates

### **Why Avatar Before MediaPipe:**
1. Avatar provides immediate value (coaching, motivation)
2. Simpler technically (just video playback + TTS)
3. Builds user base before complex features
4. Can gather data on which exercises users do most
5. Phase 3 preps UI for Phase 4 camera integration

---

## 🎮 USER FLOW (End State - All Phases)

1. **Onboarding:**
   - Answer 4 questions
   - Get recommended program
   - Create account
   - Set macro goals

2. **First Workout:**
   - Choose recommended program or browse 9 programs
   - Start workout
   - Avatar appears (Phase 3), demonstrates exercises
   - User performs exercise
   - Camera detects form (Phase 4)
   - Avatar gives real-time feedback: "Deeper!"
   - Log sets/reps/weight
   - Achievement unlocked: "First Step" 🎯

3. **Between Workouts:**
   - Track nutrition (scan barcode or search USDA)
   - View progress charts
   - Check achievements
   - Share PR on social feed (Phase 2)

4. **Social Features (Phase 2):**
   - Post workout selfie + stats
   - Join "30-Day Squat Challenge"
   - Follow Heath's official account
   - Hire Heath as online trainer

5. **Multi-User Workout (Phase 3/4):**
   - Invite friend to train together
   - Both create avatars
   - Both avatars appear on screen (split-screen or side-by-side)
   - Real-time form comparison
   - Compete on form quality scores
   - Celebrate together at end

---

## 🚀 LAUNCH STRATEGY

### **Phase 1 Launch (MVP):**
- All core features complete
- Cross-device sync working (CRITICAL)
- PWA fully functional
- Beta test with 10-20 users
- Gather feedback

### **Phase 2 Launch (Social):**
- Community features live
- Trainer dashboard for Heath
- Monetization enabled (Stripe)
- Marketing push (Instagram, TikTok)
- Target: 1,000 users

### **Phase 3 Launch (Avatar):**
- AI trainer avatar live
- Voice clone working
- Exercise library complete
- Press coverage ("AI personal trainer")
- Target: 10,000 users

### **Phase 4 Launch (MediaPipe - FLAGSHIP):**
- Real-time form feedback live
- Multi-user avatars working
- Native apps on App Store + Google Play
- Major press push
- Target: 100,000+ users
- **Position:** "The only app that watches your form in real-time"

---

## 📈 SUCCESS METRICS

### **Phase 1:**
- Users completing onboarding: >80%
- Workout completion rate: >60%
- 7-day retention: >50%
- Cross-device sync working: 100%

### **Phase 2:**
- Social posts per user: >2/week
- Challenge completion rate: >40%
- Trainer signups: >50
- Paying users: >10%

### **Phase 3:**
- Avatar engagement: >70% use it
- Voice personality preference spread
- User-created avatars: >30% adoption
- Multi-user workouts: >20% use

### **Phase 4:**
- MediaPipe adoption: >60% grant camera
- Form improvement over 30 days
- Injury reduction (survey data)
- Viral coefficient: >1.5 (users invite friends)

---

## 🛠️ TECHNICAL DEBT & KNOWN ISSUES

### **Critical (Must Fix Now):**
1. ⚠️ Cross-device sync (7 vs 14 workouts)
2. ⚠️ PWA localStorage persistence
3. ⚠️ iOS status bar overlap

### **High Priority:**
1. Better error handling for network failures
2. Sync conflict resolution (last-write-wins)
3. Offline queue for syncing when back online
4. Service worker update notification

### **Medium Priority:**
1. Code splitting (app.js is 1500+ lines)
2. Lazy loading for programs
3. Image optimization
4. Bundle size reduction

### **Low Priority:**
1. Add TypeScript for type safety
2. Unit tests for sync logic
3. E2E tests with Playwright
4. Performance monitoring (Sentry)

---

## 📱 PLATFORM STRATEGY

### **Current (Phase 1-2):**
- PWA (works on all devices)
- No app store needed
- Faster iteration
- No approval delays

### **Future (Phase 3-4):**
- Capacitor wrapper for native apps
- Better camera access for MediaPipe
- Push notifications
- Background sync
- App Store + Google Play presence

**Why Native Later:**
- PWA gets us to market faster
- Prove product-market fit first
- Native apps for features that need it (camera, background)
- Can keep PWA version too (dual distribution)

---

## 💰 MONETIZATION STRATEGY

### **Free Tier:**
- All 9 workout programs
- Basic nutrition tracking
- Achievement system
- Limited cloud storage (30 days)

### **Pro Tier ($9.99/month):**
- Unlimited workout history
- Advanced analytics
- Export data
- Priority support
- Avatar trainer (Phase 3)
- Multi-user workouts (Phase 4)

### **Trainer Tier ($29.99/month):**
- All Pro features
- Trainer dashboard
- Unlimited clients
- Custom program builder
- Revenue share on client subscriptions

### **Enterprise (Custom Pricing):**
- White-label for gyms
- Bulk user management
- Custom branding
- Dedicated support

---

## 🎯 COMPETITIVE ADVANTAGES

1. **Real-time form feedback** - Nobody else has this
2. **Multi-user avatars** - Train with friends' avatars
3. **Works offline** - True PWA, no internet needed
4. **AI coach personality** - Choose your coaching style
5. **Complete system** - Training + nutrition + social in one app
6. **Mobile-first** - Designed for phone, works on desktop/TV
7. **Open ecosystem** - Will integrate with other fitness apps/devices

---

## 📝 CHANGELOG

### 2026-05-23:
- ✅ Cross-device sync confirmed FIXED (SW v2.1.0 / #209 running, dedupe rework)
- ✅ Password reset flow working (desktop + Safari)
- ✅ Onboarding flash after sign-in FIXED — `onUserSignedIn` now async, checks Supabase `primary_goal` + workouts before showing onboarding (SW bumped to v2.2.0)
- ✅ Mobile keyboard overlap FIXED — scroll-into-view on input focus + `dvh` CSS so modal shrinks with keyboard
- 💡 NEW BACKLOG: voice/talk-to-text (mic), camera (progress photos, barcode), reusable permission helper
- 💡 NEW BACKLOG: social share cards (PRs, workouts, streaks, achievements) + "make it fun" UX list
- 🔐 Redacted USDA key from this doc; documented secrets handling
- 📦 Migrated project to Claude Code — created `CLAUDE_CODE_HANDOFF.md`

### 2026-05-03:
- ✅ Created 9 Kinetiq training programs
- ✅ Built user onboarding (4-question wizard)
- ✅ Implemented achievement system (17 achievements)
- ✅ Added cloud sync (workouts, PRs, nutrition)
- ✅ Built service worker (offline PWA)
- ⚠️ Identified cross-device sync issue (IN PROGRESS)
- 💡 NEW IDEA: Multi-user avatar workouts
- 📄 Created this master roadmap document

---

## 🔮 FUTURE EXPLORATIONS

### **AI Enhancements:**
- GPT-4 for personalized program generation
- Computer vision for rep counting (in addition to form)
- Voice control ("Hey Kinetiq, start workout")
- Fatigue detection (suggests deload week)

### **Hardware Integration:**
- Apple Watch (heart rate, activity tracking)
- Fitness tracker sync (Fitbit, Garmin, Whoop)
- Smart scales (auto-track bodyweight)
- Connected equipment (Tonal, tempo, etc.)

### **Content Expansion:**
- Yoga programs
- Cardio programs
- Sports-specific training
- Rehabilitation protocols
- Pregnancy/postpartum programs

---

## ✅ REMEMBER: NOTHING GETS FORGOTTEN

This document is the source of truth. Every feature, every phase, every brainstorm is tracked here.

**When in doubt, check this file.**

Last updated: 2026-05-03 by Claude
