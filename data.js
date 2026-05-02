var kinetiqStrongData = {
  id: 'kinetiq-strong-builtin',
  name: 'Kinetiq Strong',
  source: 'builtin',
  description: "A 12-week strength program built around the Big 4 lifts. Progressive overload is the only rule that matters — add weight, get stronger, don\'t get hurt. Every session includes a built-in mobility warmup because the smartest thing a strong person can do is stay healthy enough to keep training. 3 days per week. No fluff. **Recommended Progression:** Strong → Hypertrophy → Balance → Deload (1 wk) → Repeat with heavier weights. Programs can also run standalone based on your goals.",
  difficulty: 'Intermediate',
  duration: '12 weeks (3 phases)',
  phases: [

    // ===================== PHASE 1 =====================
    {
      name: 'Phase 1 — Foundation (Weeks 1-4)',
      objective: 'Learn the movement patterns under moderate load. Build the habit. Let your joints adapt before you push the weight.',
      length: '4 weeks',
      sets: '3 sets',
      reps: '5 reps',
      rest: '2-3 minutes',
      frequency: '3 days per week — Monday / Wednesday / Friday or any 3 non-consecutive days.',
      notes: 'Start lighter than your ego wants. Week 1 should feel almost easy. That is intentional — you are building a foundation, not testing your max. Add 5 lbs to upper body lifts and 10 lbs to lower body lifts each week when all reps are completed with good form.',
      weeks: [
        {
          name: 'Week 1 — Learn the Patterns',
          days: [
            {
              name: 'Day A — Squat & Press',
              focus: 'Lower + Upper Push',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '8 each side', notes: 'Sit on floor, both legs at 90 degrees. Rotate forward shin to floor, hold 3 sec, return. Non-negotiable warmup.' },
                { name: 'Mobility Warmup — Thoracic Extension over Foam Roller', sets: '2', reps: '10 reps', notes: 'Place roller at mid-back. Arms crossed or hands behind head. Extend gently over roller. Frees up your upper back for pressing and squatting.' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '10 each direction', notes: 'Seated or standing. Full range circles. Stiff ankles kill squat depth.' },
                { name: 'Barbell Back Squat', sets: '3', reps: '5', notes: 'Bar on upper traps. Brace your core before you unrack. Sit back and down — not just down. Drive knees out. Stand tall at the top. Start at 60% of what you think your max is.' },
                { name: 'Barbell Overhead Press', sets: '3', reps: '5', notes: 'Grip just outside shoulder width. Bar starts at collarbone. Press straight up — bar should travel in a vertical line. Lock out fully at the top. Bring bar back to collarbone under control.' },
                { name: 'Plank', sets: '3', reps: '30 seconds', notes: 'Elbows under shoulders. Squeeze glutes and abs. No sagging hips. Core work is not optional when you are squatting heavy.' }
              ]
            },
            {
              name: 'Day B — Deadlift & Row',
              focus: 'Hip Hinge + Upper Pull',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '10 reps', notes: 'On hands and knees. Arch fully (cow), then round fully (cat). Slow and deliberate. Wakes up your spine before deadlifting.' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '5 each side', notes: 'From pushup position, step foot outside hand, drop back knee, rotate top arm to sky. Hold 3 sec. Best single warmup movement for deadlifts.' },
                { name: 'Mobility Warmup — Hip Flexor Stretch', sets: '2', reps: '45 sec each side', notes: 'Lunge position, back knee down. Push hips forward gently. Tight hip flexors cause lower back rounding on deadlifts.' },
                { name: 'Barbell Deadlift', sets: '3', reps: '5', notes: 'Feet hip-width. Bar over mid-foot. Hinge to bar — do not squat down to it. Lats tight (imagine bending the bar around your legs). Drive the floor away. Lock hips and knees at the top simultaneously. Lower with control.' },
                { name: 'Barbell Bent-Over Row', sets: '3', reps: '5', notes: 'Hinge to roughly 45 degrees. Bar starts at floor or from a hang. Pull to lower chest/upper stomach. Lead with elbows. Lower under control. This builds the back thickness that makes every other lift stronger.' },
                { name: 'Dead Bug', sets: '3', reps: '8 each side', notes: 'Lie on back, arms up, knees at 90. Slowly lower opposite arm and leg toward floor without letting lower back lose contact with ground. Best anti-extension core exercise there is.' }
              ]
            },
            {
              name: 'Day C — Squat & Bench',
              focus: 'Lower + Upper Push (Horizontal)',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '8 each side', notes: 'Same as Day A. Do it every time.' },
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '15 reps', notes: 'Hold a band at chest height, arms straight. Pull band apart until arms fully extended out to sides. Warms up rear delts and keeps shoulders healthy for bench pressing.' },
                { name: 'Mobility Warmup — Wrist Circles', sets: '1', reps: '10 each direction', notes: 'Bench pressing is hard on wrists. Warm them up.' },
                { name: 'Barbell Back Squat', sets: '3', reps: '5', notes: 'Same weight as Day A or 5 lbs heavier if Day A felt solid. Every rep the same — consistent form is the whole game at this stage.' },
                { name: 'Barbell Bench Press', sets: '3', reps: '5', notes: 'Flat bench. Grip slightly wider than shoulder width. Unrack with arms fully locked. Lower bar to lower chest — touch and press, do not bounce. Drive feet into floor. Arch is fine, bridge is not.' },
                { name: 'Dumbbell Romanian Deadlift', sets: '3', reps: '8', notes: 'This is accessory work — lighter and more controlled than the barbell deadlift. Hinge at hips, feel the hamstring stretch, drive hips forward to stand. Builds hamstring strength that protects your knees and lower back.' }
              ]
            }
          ]
        },
        {
          name: 'Week 2 — Add Load',
          days: [
            {
              name: 'Day A — Squat & Press',
              focus: 'Lower + Upper Push',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '8 each side' },
                { name: 'Mobility Warmup — Thoracic Extension over Foam Roller', sets: '2', reps: '10 reps' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '10 each direction' },
                { name: 'Barbell Back Squat', sets: '3', reps: '5', notes: 'Add 10 lbs from Week 1. If that feels too big a jump, add 5. Never ego-load at this phase.' },
                { name: 'Barbell Overhead Press', sets: '3', reps: '5', notes: 'Add 5 lbs from Week 1. Overhead press progresses slower than squat — respect that.' },
                { name: 'Plank', sets: '3', reps: '35 seconds', notes: 'Add 5 seconds per week through Phase 1.' }
              ]
            },
            {
              name: 'Day B — Deadlift & Row',
              focus: 'Hip Hinge + Upper Pull',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '10 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '5 each side' },
                { name: 'Mobility Warmup — Hip Flexor Stretch', sets: '2', reps: '45 sec each side' },
                { name: 'Barbell Deadlift', sets: '3', reps: '5', notes: 'Add 10 lbs from Week 1. Deadlift progresses fastest of all the lifts — enjoy it now.' },
                { name: 'Barbell Bent-Over Row', sets: '3', reps: '5', notes: 'Add 5-10 lbs from Week 1.' },
                { name: 'Dead Bug', sets: '3', reps: '8 each side' }
              ]
            },
            {
              name: 'Day C — Squat & Bench',
              focus: 'Lower + Upper Push (Horizontal)',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '8 each side' },
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '15 reps' },
                { name: 'Mobility Warmup — Wrist Circles', sets: '1', reps: '10 each direction' },
                { name: 'Barbell Back Squat', sets: '3', reps: '5', notes: 'Match Day A weight or add 5 lbs.' },
                { name: 'Barbell Bench Press', sets: '3', reps: '5', notes: 'Add 5 lbs from Week 1.' },
                { name: 'Dumbbell Romanian Deadlift', sets: '3', reps: '8', notes: 'Add 5 lbs from Week 1.' }
              ]
            }
          ]
        },
        {
          name: 'Week 3 — Push the Load',
          days: [
            {
              name: 'Day A — Squat & Press',
              focus: 'Lower + Upper Push',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '8 each side' },
                { name: 'Mobility Warmup — Thoracic Extension over Foam Roller', sets: '2', reps: '10 reps' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '10 each direction' },
                { name: 'Barbell Back Squat', sets: '3', reps: '5', notes: 'Week 3 should be challenging. You should be working for these reps but completing all 5 with solid form.' },
                { name: 'Barbell Overhead Press', sets: '3', reps: '5', notes: 'If the last rep of set 3 is a grind, this weight is right.' },
                { name: 'Plank', sets: '3', reps: '45 seconds' }
              ]
            },
            {
              name: 'Day B — Deadlift & Row',
              focus: 'Hip Hinge + Upper Pull',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '10 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '5 each side' },
                { name: 'Mobility Warmup — Hip Flexor Stretch', sets: '2', reps: '45 sec each side' },
                { name: 'Barbell Deadlift', sets: '3', reps: '5', notes: 'Continue adding load. Deadlift should feel heavy but controlled.' },
                { name: 'Barbell Bent-Over Row', sets: '3', reps: '5' },
                { name: 'Dead Bug', sets: '3', reps: '10 each side', notes: 'Added 2 reps from Week 1.' }
              ]
            },
            {
              name: 'Day C — Squat & Bench',
              focus: 'Lower + Upper Push (Horizontal)',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '8 each side' },
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '15 reps' },
                { name: 'Mobility Warmup — Wrist Circles', sets: '1', reps: '10 each direction' },
                { name: 'Barbell Back Squat', sets: '3', reps: '5' },
                { name: 'Barbell Bench Press', sets: '3', reps: '5' },
                { name: 'Dumbbell Romanian Deadlift', sets: '3', reps: '8' }
              ]
            }
          ]
        },
        {
          name: 'Week 4 — Deload (Mandatory)',
          days: [
            {
              name: 'Day A — Deload Squat & Press',
              focus: 'Active Recovery',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '3', reps: '10 each side', notes: 'Take more time with mobility today — this is the whole point of a deload week.' },
                { name: 'Mobility Warmup — Thoracic Extension over Foam Roller', sets: '3', reps: '12 reps' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '15 each direction' },
                { name: 'Barbell Back Squat', sets: '2', reps: '5', notes: 'Use 60% of Week 3 weight. Move perfectly. This is not a light vacation — it is strategic recovery. Your nervous system needs this as much as your muscles.' },
                { name: 'Barbell Overhead Press', sets: '2', reps: '5', notes: '60% of Week 3 weight. Focus on bar path and lockout.' },
                { name: 'Plank', sets: '2', reps: '30 seconds' }
              ]
            },
            {
              name: 'Day B — Deload Deadlift & Row',
              focus: 'Active Recovery',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '3', reps: '12 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '3', reps: '6 each side' },
                { name: 'Mobility Warmup — Hip Flexor Stretch', sets: '2', reps: '60 sec each side' },
                { name: 'Barbell Deadlift', sets: '2', reps: '5', notes: '60% of Week 3 weight. Treat every rep like a technique masterclass.' },
                { name: 'Barbell Bent-Over Row', sets: '2', reps: '5', notes: '60% weight. Slow and controlled.' },
                { name: 'Dead Bug', sets: '2', reps: '8 each side' }
              ]
            },
            {
              name: 'Day C — Deload Squat & Bench',
              focus: 'Active Recovery',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '3', reps: '10 each side' },
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '3', reps: '20 reps' },
                { name: 'Barbell Back Squat', sets: '2', reps: '5', notes: '60% weight. Come out of this week feeling fresh and hungry.' },
                { name: 'Barbell Bench Press', sets: '2', reps: '5', notes: '60% weight.' },
                { name: 'Dumbbell Romanian Deadlift', sets: '2', reps: '8', notes: 'Light. Feel the stretch.' }
              ]
            }
          ]
        }
      ]
    },

    // ===================== PHASE 2 =====================
    {
      name: 'Phase 2 — Build (Weeks 5-8)',
      objective: 'This is where you get strong. 5x5 on the main lifts. Progressive overload every session. The deload prepared you for this — now use it.',
      length: '4 weeks',
      sets: '5 sets',
      reps: '5 reps',
      rest: '3-4 minutes',
      frequency: '3 days per week — same A/B/C structure.',
      notes: 'You are now doing 5 sets instead of 3. The first 2 sets should feel like warmup-heavy work sets. Sets 3-5 are where you earn it. Add 5 lbs upper body, 10 lbs lower body each week you complete all reps. If you miss reps, repeat the weight next session before adding.',
      weeks: [
        {
          name: 'Week 5 — Enter 5x5',
          days: [
            {
              name: 'Day A — Squat & Press',
              focus: 'Lower + Upper Push',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '8 each side' },
                { name: 'Mobility Warmup — Thoracic Extension over Foam Roller', sets: '2', reps: '10 reps' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '10 each direction' },
                { name: 'Barbell Back Squat', sets: '5', reps: '5', notes: 'Start at Week 3 weight. Yes, same weight — you are adding 2 more sets. That is the new stimulus. You will earn the right to add load next week.' },
                { name: 'Barbell Overhead Press', sets: '5', reps: '5', notes: 'Same principle — Week 3 weight, 5 sets now.' },
                { name: 'Plank', sets: '3', reps: '45 seconds' },
                { name: 'Farmer Carry', sets: '3', reps: '40 yards', notes: 'New in Phase 2. Grab the heaviest dumbbells you can walk with good posture. Walk 40 yards. Builds grip, core, traps, and mental toughness simultaneously. This is one of the best exercises nobody does.' }
              ]
            },
            {
              name: 'Day B — Deadlift & Row',
              focus: 'Hip Hinge + Upper Pull',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '10 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '5 each side' },
                { name: 'Mobility Warmup — Hip Flexor Stretch', sets: '2', reps: '45 sec each side' },
                { name: 'Barbell Deadlift', sets: '5', reps: '5', notes: 'Deadlift stays at 1 heavy set beyond the warmup sets in traditional 5x5 programs. Here we do true 5x5 — all sets at working weight. Rest fully between sets. This is not conditioning work.' },
                { name: 'Barbell Bent-Over Row', sets: '5', reps: '5' },
                { name: 'Weighted Pull-Up or Lat Pulldown', sets: '3', reps: '5', notes: 'New in Phase 2. If you can do 5 bodyweight pull-ups, add a dumbbell between your feet. If not, use a lat pulldown machine at heavy weight. Vertical pull balances the horizontal row.' },
                { name: 'Dead Bug', sets: '3', reps: '10 each side' }
              ]
            },
            {
              name: 'Day C — Squat & Bench',
              focus: 'Lower + Upper Push (Horizontal)',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '8 each side' },
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '15 reps' },
                { name: 'Mobility Warmup — Wrist Circles', sets: '1', reps: '10 each direction' },
                { name: 'Barbell Back Squat', sets: '5', reps: '5' },
                { name: 'Barbell Bench Press', sets: '5', reps: '5', notes: 'Week 3 bench weight, now 5 sets.' },
                { name: 'Dumbbell Romanian Deadlift', sets: '4', reps: '8', notes: 'Added a set from Phase 1. Go heavier.' },
                { name: 'Dips or Close-Grip Bench Press', sets: '3', reps: '5', notes: 'New in Phase 2. Tricep strength is the limiting factor on bench press for most people. Fix the weak link.' }
              ]
            }
          ]
        },
        {
          name: 'Week 6 — Add Load',
          days: [
            {
              name: 'Day A — Squat & Press',
              focus: 'Lower + Upper Push',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '8 each side' },
                { name: 'Mobility Warmup — Thoracic Extension over Foam Roller', sets: '2', reps: '10 reps' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '10 each direction' },
                { name: 'Barbell Back Squat', sets: '5', reps: '5', notes: 'Add 10 lbs from Week 5. This is where the program earns its name.' },
                { name: 'Barbell Overhead Press', sets: '5', reps: '5', notes: 'Add 5 lbs from Week 5.' },
                { name: 'Plank', sets: '3', reps: '50 seconds' },
                { name: 'Farmer Carry', sets: '3', reps: '40 yards', notes: 'Add 5-10 lbs from Week 5.' }
              ]
            },
            {
              name: 'Day B — Deadlift & Row',
              focus: 'Hip Hinge + Upper Pull',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '10 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '5 each side' },
                { name: 'Mobility Warmup — Hip Flexor Stretch', sets: '2', reps: '45 sec each side' },
                { name: 'Barbell Deadlift', sets: '5', reps: '5', notes: 'Add 10 lbs. Deadlift should be your biggest number by a wide margin.' },
                { name: 'Barbell Bent-Over Row', sets: '5', reps: '5', notes: 'Add 5-10 lbs.' },
                { name: 'Weighted Pull-Up or Lat Pulldown', sets: '3', reps: '5', notes: 'Add weight or resistance.' },
                { name: 'Dead Bug', sets: '3', reps: '10 each side' }
              ]
            },
            {
              name: 'Day C — Squat & Bench',
              focus: 'Lower + Upper Push (Horizontal)',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '8 each side' },
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '15 reps' },
                { name: 'Mobility Warmup — Wrist Circles', sets: '1', reps: '10 each direction' },
                { name: 'Barbell Back Squat', sets: '5', reps: '5' },
                { name: 'Barbell Bench Press', sets: '5', reps: '5', notes: 'Add 5 lbs.' },
                { name: 'Dumbbell Romanian Deadlift', sets: '4', reps: '8' },
                { name: 'Dips or Close-Grip Bench Press', sets: '3', reps: '5', notes: 'Add weight to dips or load to CGBP.' }
              ]
            }
          ]
        },
        {
          name: 'Week 7 — Heavy',
          days: [
            {
              name: 'Day A — Squat & Press',
              focus: 'Lower + Upper Push',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '8 each side' },
                { name: 'Mobility Warmup — Thoracic Extension over Foam Roller', sets: '2', reps: '10 reps' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '10 each direction' },
                { name: 'Barbell Back Squat', sets: '5', reps: '5', notes: 'Week 7 is heavy. If you have been adding weight consistently, you are now squatting more than you have before. That is the whole point.' },
                { name: 'Barbell Overhead Press', sets: '5', reps: '5' },
                { name: 'Plank', sets: '3', reps: '55 seconds' },
                { name: 'Farmer Carry', sets: '3', reps: '40 yards' }
              ]
            },
            {
              name: 'Day B — Deadlift & Row',
              focus: 'Hip Hinge + Upper Pull',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '10 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '5 each side' },
                { name: 'Mobility Warmup — Hip Flexor Stretch', sets: '2', reps: '45 sec each side' },
                { name: 'Barbell Deadlift', sets: '5', reps: '5' },
                { name: 'Barbell Bent-Over Row', sets: '5', reps: '5' },
                { name: 'Weighted Pull-Up or Lat Pulldown', sets: '3', reps: '5' },
                { name: 'Dead Bug', sets: '3', reps: '12 each side' }
              ]
            },
            {
              name: 'Day C — Squat & Bench',
              focus: 'Lower + Upper Push (Horizontal)',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '8 each side' },
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '15 reps' },
                { name: 'Mobility Warmup — Wrist Circles', sets: '1', reps: '10 each direction' },
                { name: 'Barbell Back Squat', sets: '5', reps: '5' },
                { name: 'Barbell Bench Press', sets: '5', reps: '5' },
                { name: 'Dumbbell Romanian Deadlift', sets: '4', reps: '8' },
                { name: 'Dips or Close-Grip Bench Press', sets: '3', reps: '5' }
              ]
            }
          ]
        },
        {
          name: 'Week 8 — Deload (Mandatory)',
          days: [
            {
              name: 'Day A — Deload Squat & Press',
              focus: 'Active Recovery',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '3', reps: '10 each side', notes: 'Extended mobility today. You have earned a recovery week.' },
                { name: 'Mobility Warmup — Thoracic Extension over Foam Roller', sets: '3', reps: '12 reps' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '15 each direction' },
                { name: 'Barbell Back Squat', sets: '3', reps: '5', notes: '60% of Week 7 weight. 3 sets, not 5. Move perfectly.' },
                { name: 'Barbell Overhead Press', sets: '3', reps: '5', notes: '60% of Week 7 weight.' },
                { name: 'Plank', sets: '2', reps: '45 seconds' }
              ]
            },
            {
              name: 'Day B — Deload Deadlift & Row',
              focus: 'Active Recovery',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '3', reps: '12 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '3', reps: '6 each side' },
                { name: 'Mobility Warmup — Hip Flexor Stretch', sets: '2', reps: '60 sec each side' },
                { name: 'Barbell Deadlift', sets: '3', reps: '5', notes: '60% of Week 7 weight.' },
                { name: 'Barbell Bent-Over Row', sets: '3', reps: '5', notes: '60% weight.' },
                { name: 'Dead Bug', sets: '2', reps: '10 each side' }
              ]
            },
            {
              name: 'Day C — Deload Squat & Bench',
              focus: 'Active Recovery',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '3', reps: '10 each side' },
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '3', reps: '20 reps' },
                { name: 'Barbell Back Squat', sets: '3', reps: '5', notes: '60% weight. Come back next week ready to peak.' },
                { name: 'Barbell Bench Press', sets: '3', reps: '5', notes: '60% weight.' },
                { name: 'Dumbbell Romanian Deadlift', sets: '2', reps: '8', notes: 'Light. Feel the hamstrings.' }
              ]
            }
          ]
        }
      ]
    },

    // ===================== PHASE 3 =====================
    {
      name: 'Phase 3 — Peak (Weeks 9-12)',
      objective: 'You built the foundation. You built the strength. Now you find out what you are capable of. Work up to near-max loads. Set PRs. Week 12 is a full 1RM test day.',
      length: '4 weeks',
      sets: '5 sets',
      reps: '3 reps (then singles in week 11-12)',
      rest: '4-5 minutes',
      frequency: '3 days per week.',
      notes: 'Lower reps, heavier weight. The volume drops but the intensity rises. Every set of 3 should feel like you could not have done 4. If it does not feel that way, add weight. Week 12 has a dedicated PR testing session — this is your graduation day.',
      weeks: [
        {
          name: 'Week 9 — Transition to Triples',
          days: [
            {
              name: 'Day A — Squat & Press',
              focus: 'Lower + Upper Push',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '8 each side' },
                { name: 'Mobility Warmup — Thoracic Extension over Foam Roller', sets: '2', reps: '10 reps' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '10 each direction' },
                { name: 'Barbell Back Squat', sets: '5', reps: '3', notes: 'Drop to 3 reps per set. Start at Week 7 weight. Yes — same weight as 5 reps but now only 3. Next session add 10 lbs.' },
                { name: 'Barbell Overhead Press', sets: '5', reps: '3', notes: 'Same principle.' },
                { name: 'Plank', sets: '3', reps: '60 seconds', notes: 'One minute plank. You have earned this.' },
                { name: 'Farmer Carry', sets: '4', reps: '40 yards', notes: 'Heaviest yet. Add a set from Phase 2.' }
              ]
            },
            {
              name: 'Day B — Deadlift & Row',
              focus: 'Hip Hinge + Upper Pull',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '10 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '5 each side' },
                { name: 'Mobility Warmup — Hip Flexor Stretch', sets: '2', reps: '45 sec each side' },
                { name: 'Barbell Deadlift', sets: '5', reps: '3', notes: 'Week 7 weight, now for 3. Your deadlift should be considerably higher than squat at this point.' },
                { name: 'Barbell Bent-Over Row', sets: '5', reps: '3' },
                { name: 'Weighted Pull-Up or Lat Pulldown', sets: '4', reps: '3', notes: 'Add a set.' },
                { name: 'Dead Bug', sets: '3', reps: '12 each side' }
              ]
            },
            {
              name: 'Day C — Squat & Bench',
              focus: 'Lower + Upper Push (Horizontal)',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '8 each side' },
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '15 reps' },
                { name: 'Mobility Warmup — Wrist Circles', sets: '1', reps: '10 each direction' },
                { name: 'Barbell Back Squat', sets: '5', reps: '3' },
                { name: 'Barbell Bench Press', sets: '5', reps: '3' },
                { name: 'Dumbbell Romanian Deadlift', sets: '4', reps: '6', notes: 'Heavier, fewer reps.' },
                { name: 'Dips or Close-Grip Bench Press', sets: '4', reps: '3' }
              ]
            }
          ]
        },
        {
          name: 'Week 10 — Heavy Triples',
          days: [
            {
              name: 'Day A — Squat & Press',
              focus: 'Lower + Upper Push',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '8 each side' },
                { name: 'Mobility Warmup — Thoracic Extension over Foam Roller', sets: '2', reps: '10 reps' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '10 each direction' },
                { name: 'Barbell Back Squat', sets: '5', reps: '3', notes: 'Add 10 lbs from Week 9. You are in new territory.' },
                { name: 'Barbell Overhead Press', sets: '5', reps: '3', notes: 'Add 5 lbs from Week 9.' },
                { name: 'Plank', sets: '3', reps: '60 seconds' },
                { name: 'Farmer Carry', sets: '4', reps: '40 yards' }
              ]
            },
            {
              name: 'Day B — Deadlift & Row',
              focus: 'Hip Hinge + Upper Pull',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '10 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '5 each side' },
                { name: 'Mobility Warmup — Hip Flexor Stretch', sets: '2', reps: '45 sec each side' },
                { name: 'Barbell Deadlift', sets: '5', reps: '3', notes: 'Add 10-15 lbs from Week 9.' },
                { name: 'Barbell Bent-Over Row', sets: '5', reps: '3' },
                { name: 'Weighted Pull-Up or Lat Pulldown', sets: '4', reps: '3' },
                { name: 'Dead Bug', sets: '3', reps: '12 each side' }
              ]
            },
            {
              name: 'Day C — Squat & Bench',
              focus: 'Lower + Upper Push (Horizontal)',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '8 each side' },
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '15 reps' },
                { name: 'Mobility Warmup — Wrist Circles', sets: '1', reps: '10 each direction' },
                { name: 'Barbell Back Squat', sets: '5', reps: '3' },
                { name: 'Barbell Bench Press', sets: '5', reps: '3' },
                { name: 'Dumbbell Romanian Deadlift', sets: '4', reps: '6' },
                { name: 'Dips or Close-Grip Bench Press', sets: '4', reps: '3' }
              ]
            }
          ]
        },
        {
          name: 'Week 11 — Near Max Singles',
          days: [
            {
              name: 'Day A — Squat & Press',
              focus: 'Lower + Upper Push',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '3', reps: '10 each side', notes: 'Extra warmup today. You are going near-max.' },
                { name: 'Mobility Warmup — Thoracic Extension over Foam Roller', sets: '3', reps: '12 reps' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '15 each direction' },
                { name: 'Barbell Back Squat', sets: '5', reps: '1', notes: 'Work up in sets: 60%, 70%, 80%, 90%, 95% of estimated max. These are not all-out — you are priming the nervous system for next week\'s true 1RM test. Stop at 95%.' },
                { name: 'Barbell Overhead Press', sets: '5', reps: '1', notes: 'Same protocol — work to 95%.' },
                { name: 'Farmer Carry', sets: '3', reps: '40 yards', notes: 'Heaviest you have done. Grip the handles like you mean it.' }
              ]
            },
            {
              name: 'Day B — Deadlift & Row',
              focus: 'Hip Hinge + Upper Pull',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '3', reps: '12 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '3', reps: '6 each side' },
                { name: 'Mobility Warmup — Hip Flexor Stretch', sets: '3', reps: '60 sec each side' },
                { name: 'Barbell Deadlift', sets: '5', reps: '1', notes: 'Work to 95% of estimated max. The best deadlifters in the world say the bar should move fast even when heavy — if it grinds and slows dramatically, you have gone too far.' },
                { name: 'Barbell Bent-Over Row', sets: '3', reps: '3', notes: 'Back off on row volume today — you are peaking the deadlift.' },
                { name: 'Weighted Pull-Up or Lat Pulldown', sets: '3', reps: '3' }
              ]
            },
            {
              name: 'Day C — Bench',
              focus: 'Upper Push Peak',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '10 each side' },
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '3', reps: '20 reps' },
                { name: 'Mobility Warmup — Wrist Circles', sets: '2', reps: '12 each direction' },
                { name: 'Barbell Bench Press', sets: '5', reps: '1', notes: 'Work to 95%. Touch the chest clean. No one is counting a bounce. Do not attempt a grinder today — that is next week.' },
                { name: 'Dips or Close-Grip Bench Press', sets: '3', reps: '3' }
              ]
            }
          ]
        },
        {
          name: 'Week 12 — PR Week (Graduation)',
          days: [
            {
              name: 'Day A — Squat 1RM Test',
              focus: 'Personal Record — Squat',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '3', reps: '10 each side', notes: 'This is the day. Sleep well the night before. Eat well today. Caffeine is allowed.' },
                { name: 'Mobility Warmup — Thoracic Extension over Foam Roller', sets: '3', reps: '12 reps' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '3', reps: '15 each direction' },
                { name: 'Barbell Back Squat — 1RM Attempt', sets: '6', reps: 'Work to true 1RM', notes: 'Warmup sets: 50% x 5, 65% x 3, 75% x 2, 85% x 1, 92% x 1, then your true attempt. Pick a weight you are 90% confident you can hit. Hit it. Then decide if you want to go heavier.' },
                { name: 'Barbell Overhead Press — 1RM Attempt', sets: '5', reps: 'Work to true 1RM', notes: 'Same protocol. Celebrate every PR — you earned it with 12 weeks of consistent work.' }
              ]
            },
            {
              name: 'Day B — Deadlift 1RM Test',
              focus: 'Personal Record — Deadlift',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '3', reps: '12 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '3', reps: '6 each side' },
                { name: 'Mobility Warmup — Hip Flexor Stretch', sets: '3', reps: '60 sec each side' },
                { name: 'Barbell Deadlift — 1RM Attempt', sets: '6', reps: 'Work to true 1RM', notes: 'The deadlift 1RM is the most honest measurement in strength training. There is no bounce, no spot, no stretch reflex. You either pick it up or you do not. Trust the 12 weeks.' }
              ]
            },
            {
              name: 'Day C — Bench 1RM Test',
              focus: 'Personal Record — Bench Press',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '10 each side' },
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '3', reps: '20 reps' },
                { name: 'Mobility Warmup — Wrist Circles', sets: '2', reps: '12 each direction' },
                { name: 'Barbell Bench Press — 1RM Attempt', sets: '6', reps: 'Work to true 1RM', notes: 'After your 1RM, log all four lifts in the app. You now have a baseline. Run this program again — you will beat every single number. That is the nature of progressive overload done right. Welcome to Kinetiq Strong.' }
              ]
            }
          ]
        }
      ]
    }
  ]
};
// =============================================
// KINETIQ HYPERTROPHY — 12-Week Muscle Building Program
// =============================================
var kinetiqHypertrophyData = {
  id: 'kinetiq-hypertrophy-builtin',
  name: 'Kinetiq Hypertrophy',
  source: 'builtin',
  description: "A 12-week muscle building program that progresses through three distinct phases: Bridge (5x8), Growth (4x10-12), and Metabolic (3x12-15). This program is designed to run immediately after Kinetiq Strong — you\'ve built the strength foundation, now it\'s time to build the muscle. Volume increases, intensity adjusts, and your body adapts. Every session includes mobility work because joint health is non-negotiable when you\'re chasing growth. 3-4 days per week. **Recommended Progression:** Strong → Hypertrophy → Balance → Deload (1 wk) → Repeat with heavier weights. Programs can also run standalone based on your goals.",
  difficulty: 'Intermediate',
  duration: '12 weeks (3 phases)',
  phases: [

    // ===================== PHASE 1: BRIDGE =====================
    {
      name: 'Phase 1 — Bridge (Weeks 1-4)',
      objective: 'Transition from strength to hypertrophy. Maintain the intensity from Kinetiq Strong while adding volume. Your body learns to handle more sets, more exercises, and longer time under tension. This phase bridges the gap between pure strength and pure muscle building.',
      length: '4 weeks',
      sets: '5 sets',
      reps: '8 reps',
      rest: '2-3 minutes',
      frequency: '3-4 days per week. If running 3 days: Mon/Wed/Fri or any 3 non-consecutive days. If running 4 days: Mon/Tue, Thu/Fri (upper/lower split with rest days between).',
      notes: 'Drop your Kinetiq Strong working weight by 10-15%. If you were squatting 225 for 3x5, start this program at 185-200 for 5x8. The volume increase is significant — respect it. Add 5 lbs per week on upper body, 10 lbs per week on lower body when all reps are clean.',
      weeks: [
        {
          name: 'Week 1 — Volume Adaptation',
          days: [
            {
              name: 'Day A — Lower Body Push',
              focus: 'Squat Pattern + Quad Emphasis',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '10 each side', notes: 'Same warmup from Strong. Always start here for lower body days.' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '12 each direction', notes: 'Mobile ankles = deeper squats = more quad growth.' },
                { name: 'Mobility Warmup — Glute Bridge', sets: '2', reps: '15 reps', notes: 'Wake up the glutes before you load them. Squeeze at the top for 2 seconds.' },
                { name: 'Barbell Back Squat', sets: '5', reps: '8', notes: 'Your first 5x8. Drop the weight from what you were hitting in Strong. Focus on tempo: 2 seconds down, 1 second pause at bottom, explode up. This is not a strength program anymore — muscle growth happens in the eccentric and the stretch.' },
                { name: 'Leg Press', sets: '4', reps: '12', notes: 'First accessory movement. Feet shoulder-width, mid-platform. Push through heels. Control the descent — do not let the sled crash into the stack. This builds quad size without taxing your lower back after squats.' },
                { name: 'Walking Lunges', sets: '3', reps: '12 each leg', notes: 'Bodyweight or holding dumbbells. Step far enough forward that your back knee nearly touches the ground. Stand tall at the top of each rep. These destroy your quads in the best way.' },
                { name: 'Seated Calf Raise', sets: '4', reps: '15', notes: 'Calves respond to high reps. Full stretch at the bottom, full contraction at the top. Hold the peak for 1 second.' }
              ]
            },
            {
              name: 'Day B — Upper Body Push',
              focus: 'Chest + Shoulders + Triceps',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '20 reps', notes: 'Same as Strong. Keeps your shoulders healthy.' },
                { name: 'Mobility Warmup — Thoracic Extension over Foam Roller', sets: '2', reps: '12 reps', notes: 'Open up your upper back before pressing.' },
                { name: 'Mobility Warmup — Wrist Circles', sets: '2', reps: '12 each direction', notes: 'Pressing is hard on wrists. Warm them up.' },
                { name: 'Barbell Bench Press', sets: '5', reps: '8', notes: 'Drop the weight from Strong. Same cues: feet driving into floor, bar path straight, touch lower chest. But now you\'re doing 5 sets instead of 3. Control the descent for 2 seconds. Chest growth happens on the way down.' },
                { name: 'Incline Dumbbell Press', sets: '4', reps: '10', notes: 'Bench set to 30-45 degrees. Dumbbells allow a deeper stretch than barbell. Lower the dumbbells until you feel a stretch across your upper chest. Press back up and squeeze at the top.' },
                { name: 'Dumbbell Lateral Raise', sets: '4', reps: '12', notes: 'Light weight. Raise dumbbells out to the side until your arms are parallel to the floor. Lead with your elbows, not your hands. This builds shoulder width.' },
                { name: 'Overhead Tricep Extension', sets: '3', reps: '12', notes: 'Dumbbell or cable. Elbows stay pinned next to your head — do not let them flare out. Full stretch at the bottom, full contraction at the top.' }
              ]
            },
            {
              name: 'Day C — Lower Body Pull',
              focus: 'Hinge Pattern + Hamstring/Glute Emphasis',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '12 reps', notes: 'Warm up your spine before deadlifting.' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '6 each side', notes: 'Best single warmup for hip mobility and deadlift prep.' },
                { name: 'Mobility Warmup — Leg Swings', sets: '2', reps: '15 each leg', notes: 'Forward/back and side-to-side. Loosen up the hips.' },
                { name: 'Barbell Deadlift', sets: '5', reps: '8', notes: 'Same setup as Strong. Drop the weight 10-15%. Bar over mid-foot, hinge to the bar, lats tight, drive the floor away. The deadlift builds your entire posterior chain — hamstrings, glutes, lower back, upper back. You\'re doing 5 sets now. Stay disciplined with your setup on every single rep.' },
                { name: 'Romanian Deadlift (Dumbbell)', sets: '4', reps: '12', notes: 'Lighter than barbell deadlifts. Focus on the hamstring stretch. Hinge at the hips, push your butt back, feel the dumbbells travel down your shins. When you feel a deep stretch in your hamstrings, reverse the movement by driving your hips forward.' },
                { name: 'Lying Leg Curl', sets: '4', reps: '12', notes: 'Isolation work for hamstrings. Curl your heels toward your butt. Squeeze at the top for 1 second. Lower with control.' },
                { name: 'Standing Calf Raise', sets: '4', reps: '15', notes: 'Bodyweight or machine. Full range — drop your heels as low as possible, then rise all the way up onto your toes. Calves need volume to grow.' }
              ]
            },
            {
              name: 'Day D — Upper Body Pull (Optional 4th Day)',
              focus: 'Back + Biceps',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '20 reps' },
                { name: 'Mobility Warmup — Scapular Shrugs (Hanging)', sets: '2', reps: '10 reps', notes: 'Hang from a bar. Without bending your elbows, shrug your shoulders down and back. This activates your lats before pulling.' },
                { name: 'Barbell Bent-Over Row', sets: '5', reps: '8', notes: 'Same row from Strong. Hinge to roughly 45 degrees. Pull the bar to your lower chest. Lead with your elbows. Your back should be doing the work — not your biceps.' },
                { name: 'Lat Pulldown', sets: '4', reps: '10', notes: 'Wide grip. Pull the bar down to your upper chest. Lean back slightly. Think about pulling your elbows down and back — not pulling with your hands. This builds lat width.' },
                { name: 'Chest-Supported Dumbbell Row', sets: '4', reps: '12', notes: 'Set an incline bench to 45 degrees. Lie chest-down on it. Row dumbbells up to your ribs. This takes your lower back out of the equation and isolates your mid-back.' },
                { name: 'Dumbbell Bicep Curl', sets: '4', reps: '12', notes: 'Standing. Dumbbells at your sides. Curl them up, supinating (rotating) your wrists as you lift. Full contraction at the top. Lower with control.' },
                { name: 'Hammer Curl', sets: '3', reps: '12', notes: 'Same movement as regular curls, but keep your palms facing each other (neutral grip). This hits the brachialis — the muscle under your bicep that makes your arm look thicker.' }
              ]
            }
          ]
        },
        {
          name: 'Week 2 — Add Load',
          days: [
            {
              name: 'Day A — Lower Body Push',
              focus: 'Squat Pattern + Quad Emphasis',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '10 each side' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '12 each direction' },
                { name: 'Mobility Warmup — Glute Bridge', sets: '2', reps: '15 reps' },
                { name: 'Barbell Back Squat', sets: '5', reps: '8', notes: 'Add 10 lbs from Week 1. Your body is adapting to the volume.' },
                { name: 'Leg Press', sets: '4', reps: '12', notes: 'Add 1-2 plates from Week 1.' },
                { name: 'Walking Lunges', sets: '3', reps: '12 each leg', notes: 'Add 5-10 lbs per dumbbell if Week 1 felt manageable.' },
                { name: 'Seated Calf Raise', sets: '4', reps: '15' }
              ]
            },
            {
              name: 'Day B — Upper Body Push',
              focus: 'Chest + Shoulders + Triceps',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '20 reps' },
                { name: 'Mobility Warmup — Thoracic Extension over Foam Roller', sets: '2', reps: '12 reps' },
                { name: 'Mobility Warmup — Wrist Circles', sets: '2', reps: '12 each direction' },
                { name: 'Barbell Bench Press', sets: '5', reps: '8', notes: 'Add 5 lbs from Week 1.' },
                { name: 'Incline Dumbbell Press', sets: '4', reps: '10', notes: 'Add 5 lbs per dumbbell if all reps were clean in Week 1.' },
                { name: 'Dumbbell Lateral Raise', sets: '4', reps: '12' },
                { name: 'Overhead Tricep Extension', sets: '3', reps: '12' }
              ]
            },
            {
              name: 'Day C — Lower Body Pull',
              focus: 'Hinge Pattern + Hamstring/Glute Emphasis',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '12 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '6 each side' },
                { name: 'Mobility Warmup — Leg Swings', sets: '2', reps: '15 each leg' },
                { name: 'Barbell Deadlift', sets: '5', reps: '8', notes: 'Add 10 lbs from Week 1.' },
                { name: 'Romanian Deadlift (Dumbbell)', sets: '4', reps: '12', notes: 'Add 5 lbs per dumbbell if form was solid in Week 1.' },
                { name: 'Lying Leg Curl', sets: '4', reps: '12' },
                { name: 'Standing Calf Raise', sets: '4', reps: '15' }
              ]
            },
            {
              name: 'Day D — Upper Body Pull (Optional 4th Day)',
              focus: 'Back + Biceps',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '20 reps' },
                { name: 'Mobility Warmup — Scapular Shrugs (Hanging)', sets: '2', reps: '10 reps' },
                { name: 'Barbell Bent-Over Row', sets: '5', reps: '8', notes: 'Add 5-10 lbs from Week 1.' },
                { name: 'Lat Pulldown', sets: '4', reps: '10' },
                { name: 'Chest-Supported Dumbbell Row', sets: '4', reps: '12' },
                { name: 'Dumbbell Bicep Curl', sets: '4', reps: '12' },
                { name: 'Hammer Curl', sets: '3', reps: '12' }
              ]
            }
          ]
        },
        {
          name: 'Week 3 — Peak Volume',
          days: [
            {
              name: 'Day A — Lower Body Push',
              focus: 'Squat Pattern + Quad Emphasis',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '10 each side' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '12 each direction' },
                { name: 'Mobility Warmup — Glute Bridge', sets: '2', reps: '15 reps' },
                { name: 'Barbell Back Squat', sets: '5', reps: '8', notes: 'Add 10 lbs from Week 2. This should feel challenging but doable.' },
                { name: 'Leg Press', sets: '4', reps: '12', notes: 'Continue adding weight.' },
                { name: 'Walking Lunges', sets: '3', reps: '12 each leg' },
                { name: 'Seated Calf Raise', sets: '4', reps: '15' }
              ]
            },
            {
              name: 'Day B — Upper Body Push',
              focus: 'Chest + Shoulders + Triceps',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '20 reps' },
                { name: 'Mobility Warmup — Thoracic Extension over Foam Roller', sets: '2', reps: '12 reps' },
                { name: 'Mobility Warmup — Wrist Circles', sets: '2', reps: '12 each direction' },
                { name: 'Barbell Bench Press', sets: '5', reps: '8', notes: 'Add 5 lbs from Week 2.' },
                { name: 'Incline Dumbbell Press', sets: '4', reps: '10' },
                { name: 'Dumbbell Lateral Raise', sets: '4', reps: '12' },
                { name: 'Overhead Tricep Extension', sets: '3', reps: '12' }
              ]
            },
            {
              name: 'Day C — Lower Body Pull',
              focus: 'Hinge Pattern + Hamstring/Glute Emphasis',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '12 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '6 each side' },
                { name: 'Mobility Warmup — Leg Swings', sets: '2', reps: '15 each leg' },
                { name: 'Barbell Deadlift', sets: '5', reps: '8', notes: 'Add 10 lbs from Week 2.' },
                { name: 'Romanian Deadlift (Dumbbell)', sets: '4', reps: '12' },
                { name: 'Lying Leg Curl', sets: '4', reps: '12' },
                { name: 'Standing Calf Raise', sets: '4', reps: '15' }
              ]
            },
            {
              name: 'Day D — Upper Body Pull (Optional 4th Day)',
              focus: 'Back + Biceps',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '20 reps' },
                { name: 'Mobility Warmup — Scapular Shrugs (Hanging)', sets: '2', reps: '10 reps' },
                { name: 'Barbell Bent-Over Row', sets: '5', reps: '8', notes: 'Add 5-10 lbs from Week 2.' },
                { name: 'Lat Pulldown', sets: '4', reps: '10' },
                { name: 'Chest-Supported Dumbbell Row', sets: '4', reps: '12' },
                { name: 'Dumbbell Bicep Curl', sets: '4', reps: '12' },
                { name: 'Hammer Curl', sets: '3', reps: '12' }
              ]
            }
          ]
        },
        {
          name: 'Week 4 — Deload Before Phase 2',
          days: [
            {
              name: 'Day A — Lower Body Push (Deload)',
              focus: 'Active Recovery',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '10 each side' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '12 each direction' },
                { name: 'Mobility Warmup — Glute Bridge', sets: '2', reps: '15 reps' },
                { name: 'Barbell Back Squat', sets: '3', reps: '8', notes: 'Drop to 60-70% of Week 3 weight. Move well, feel good, recover.' },
                { name: 'Leg Press', sets: '3', reps: '10', notes: 'Light and controlled.' },
                { name: 'Walking Lunges', sets: '2', reps: '10 each leg', notes: 'Bodyweight only.' }
              ]
            },
            {
              name: 'Day B — Upper Body Push (Deload)',
              focus: 'Active Recovery',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '20 reps' },
                { name: 'Mobility Warmup — Thoracic Extension over Foam Roller', sets: '2', reps: '12 reps' },
                { name: 'Mobility Warmup — Wrist Circles', sets: '2', reps: '12 each direction' },
                { name: 'Barbell Bench Press', sets: '3', reps: '8', notes: 'Drop to 60-70% of Week 3 weight.' },
                { name: 'Incline Dumbbell Press', sets: '3', reps: '10', notes: 'Light weight, focus on the stretch.' },
                { name: 'Dumbbell Lateral Raise', sets: '3', reps: '12' }
              ]
            },
            {
              name: 'Day C — Lower Body Pull (Deload)',
              focus: 'Active Recovery',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '12 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '6 each side' },
                { name: 'Mobility Warmup — Leg Swings', sets: '2', reps: '15 each leg' },
                { name: 'Barbell Deadlift', sets: '3', reps: '8', notes: 'Drop to 60-70% of Week 3 weight. Perfect your setup.' },
                { name: 'Romanian Deadlift (Dumbbell)', sets: '3', reps: '12', notes: 'Light. Feel the stretch.' },
                { name: 'Lying Leg Curl', sets: '3', reps: '12' }
              ]
            }
          ]
        }
      ]
    },

    // ===================== PHASE 2: GROWTH =====================
    {
      name: 'Phase 2 — Growth (Weeks 5-8)',
      objective: 'This is where you build muscle. The hypertrophy sweet spot: 4 sets of 10-12 reps. You\'ve adapted to high volume in the Bridge phase. Now we dial in the intensity and push for muscular growth. Time under tension increases. Mind-muscle connection matters. You should feel every rep working the target muscle. This is not about moving weight — this is about building tissue.',
      length: '4 weeks',
      sets: '4 sets',
      reps: '10-12 reps',
      rest: '90 seconds - 2 minutes',
      frequency: '3-4 days per week',
      notes: 'Drop weight again — roughly 10% from where you ended Week 3. Rep range is 10-12, meaning if you hit 12 reps on all sets, add weight next week. If you can only hit 10 reps, stay at that weight until you can hit 12 on all sets. Tempo matters now: 3 seconds down, 1 second pause, 1 second up. Slow eccentrics build muscle.',
      weeks: [
        {
          name: 'Week 5 — Growth Begins',
          days: [
            {
              name: 'Day A — Lower Body Push',
              focus: 'Quad Emphasis',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '12 each side' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '15 each direction' },
                { name: 'Barbell Back Squat', sets: '4', reps: '10-12', notes: 'Drop weight from Week 3. Focus on the tempo: 3 seconds down, 1 second pause at the bottom, explode up. You should feel your quads burning by rep 8.' },
                { name: 'Bulgarian Split Squat (Dumbbell)', sets: '4', reps: '10-12 each leg', notes: 'Back foot elevated on a bench. Front leg does the work. Lower until your back knee nearly touches the ground. This is brutal for quad and glute growth.' },
                { name: 'Leg Extension', sets: '4', reps: '12-15', notes: 'Isolation work. Full contraction at the top — squeeze your quads for 1 second. Lower with control. Do not let the weight stack crash.' },
                { name: 'Goblet Squat', sets: '3', reps: '15', notes: 'Hold a dumbbell or kettlebell at your chest. Squat deep. This is a finisher — your quads should be toast by now.' },
                { name: 'Seated Calf Raise', sets: '4', reps: '20', notes: 'High reps for calves. Full stretch, full contraction.' }
              ]
            },
            {
              name: 'Day B — Upper Body Push',
              focus: 'Chest + Shoulders + Triceps',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '25 reps' },
                { name: 'Mobility Warmup — Thoracic Extension over Foam Roller', sets: '2', reps: '15 reps' },
                { name: 'Barbell Bench Press', sets: '4', reps: '10-12', notes: 'Drop weight from Bridge phase. Control the bar down for 3 seconds. Touch your chest. Press back up. Chest growth happens when you control the eccentric.' },
                { name: 'Incline Dumbbell Flye', sets: '4', reps: '12', notes: 'Bench at 30 degrees. Arms slightly bent. Lower the dumbbells out to the sides until you feel a deep stretch across your chest. Bring them back up and squeeze at the top. This is a stretch-focused movement — do not go heavy.' },
                { name: 'Cable Chest Flye', sets: '3', reps: '15', notes: 'Cables set at chest height. Step forward, arms out to the sides. Bring your hands together in front of your chest. Squeeze. This keeps constant tension on your pecs.' },
                { name: 'Dumbbell Shoulder Press', sets: '4', reps: '10-12', notes: 'Seated or standing. Press dumbbells overhead. Lower them to shoulder level with control. This builds shoulder mass.' },
                { name: 'Cable Tricep Pushdown', sets: '4', reps: '12-15', notes: 'Rope attachment. Elbows pinned to your sides. Extend your arms fully and squeeze your triceps at the bottom. Control the eccentric back up.' }
              ]
            },
            {
              name: 'Day C — Lower Body Pull',
              focus: 'Hamstring + Glute Emphasis',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '15 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '8 each side' },
                { name: 'Romanian Deadlift (Barbell)', sets: '4', reps: '10-12', notes: 'Lighter than conventional deadlifts. Focus on the hamstring stretch. Lower the bar down your shins until you feel a deep pull in your hamstrings. Drive your hips forward to stand back up.' },
                { name: 'Barbell Hip Thrust', sets: '4', reps: '12', notes: 'Upper back on a bench. Barbell across your hips (use a pad). Drive your hips up toward the ceiling. Squeeze your glutes HARD at the top for 2 seconds. Lower with control. This is the king of glute builders.' },
                { name: 'Lying Leg Curl', sets: '4', reps: '12-15', notes: 'Hamstring isolation. Curl your heels toward your butt. Squeeze at the top. Lower slowly.' },
                { name: 'Single-Leg Romanian Deadlift (Dumbbell)', sets: '3', reps: '10 each leg', notes: 'Balance on one leg. Hinge forward, letting the dumbbell travel down your standing leg. Feel the hamstring stretch. Drive your hips forward to stand back up. This also builds single-leg stability.' },
                { name: 'Standing Calf Raise', sets: '4', reps: '20' }
              ]
            },
            {
              name: 'Day D — Upper Body Pull (Optional 4th Day)',
              focus: 'Back + Biceps',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '25 reps' },
                { name: 'Mobility Warmup — Scapular Shrugs (Hanging)', sets: '2', reps: '12 reps' },
                { name: 'Pull-Up or Lat Pulldown', sets: '4', reps: '10-12', notes: 'If you can do pull-ups, do them. If not, use the lat pulldown. Wide grip. Pull your chest to the bar (or the bar to your chest). Squeeze your shoulder blades together at the top.' },
                { name: 'Barbell Bent-Over Row', sets: '4', reps: '10-12', notes: 'Hinge to 45 degrees. Pull the bar to your lower chest. Lead with your elbows. Think about squeezing your shoulder blades together at the top.' },
                { name: 'Seated Cable Row', sets: '4', reps: '12', notes: 'Pull the handle to your lower chest. Squeeze your shoulder blades together. Control the weight back to the start.' },
                { name: 'Dumbbell Bicep Curl', sets: '4', reps: '12', notes: 'Slow eccentric: 3 seconds to lower the dumbbell. Curl back up with control.' },
                { name: 'Cable Bicep Curl', sets: '3', reps: '15', notes: 'Keeps constant tension on the biceps. No rest at the bottom of the rep.' }
              ]
            }
          ]
        },
        {
          name: 'Week 6 — Progressive Overload',
          days: [
            {
              name: 'Day A — Lower Body Push',
              focus: 'Quad Emphasis',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '12 each side' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '15 each direction' },
                { name: 'Barbell Back Squat', sets: '4', reps: '10-12', notes: 'If you hit 12 reps on all 4 sets last week, add 10 lbs. If not, stay at the same weight.' },
                { name: 'Bulgarian Split Squat (Dumbbell)', sets: '4', reps: '10-12 each leg', notes: 'Add 5 lbs per dumbbell if you hit 12 reps on all sets last week.' },
                { name: 'Leg Extension', sets: '4', reps: '12-15' },
                { name: 'Goblet Squat', sets: '3', reps: '15' },
                { name: 'Seated Calf Raise', sets: '4', reps: '20' }
              ]
            },
            {
              name: 'Day B — Upper Body Push',
              focus: 'Chest + Shoulders + Triceps',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '25 reps' },
                { name: 'Mobility Warmup — Thoracic Extension over Foam Roller', sets: '2', reps: '15 reps' },
                { name: 'Barbell Bench Press', sets: '4', reps: '10-12', notes: 'Add 5 lbs if you hit 12 reps on all sets last week.' },
                { name: 'Incline Dumbbell Flye', sets: '4', reps: '12' },
                { name: 'Cable Chest Flye', sets: '3', reps: '15' },
                { name: 'Dumbbell Shoulder Press', sets: '4', reps: '10-12' },
                { name: 'Cable Tricep Pushdown', sets: '4', reps: '12-15' }
              ]
            },
            {
              name: 'Day C — Lower Body Pull',
              focus: 'Hamstring + Glute Emphasis',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '15 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '8 each side' },
                { name: 'Romanian Deadlift (Barbell)', sets: '4', reps: '10-12', notes: 'Add 10 lbs if form was perfect and you hit 12 reps on all sets last week.' },
                { name: 'Barbell Hip Thrust', sets: '4', reps: '12' },
                { name: 'Lying Leg Curl', sets: '4', reps: '12-15' },
                { name: 'Single-Leg Romanian Deadlift (Dumbbell)', sets: '3', reps: '10 each leg' },
                { name: 'Standing Calf Raise', sets: '4', reps: '20' }
              ]
            },
            {
              name: 'Day D — Upper Body Pull (Optional 4th Day)',
              focus: 'Back + Biceps',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '25 reps' },
                { name: 'Mobility Warmup — Scapular Shrugs (Hanging)', sets: '2', reps: '12 reps' },
                { name: 'Pull-Up or Lat Pulldown', sets: '4', reps: '10-12' },
                { name: 'Barbell Bent-Over Row', sets: '4', reps: '10-12' },
                { name: 'Seated Cable Row', sets: '4', reps: '12' },
                { name: 'Dumbbell Bicep Curl', sets: '4', reps: '12' },
                { name: 'Cable Bicep Curl', sets: '3', reps: '15' }
              ]
            }
          ]
        },
        {
          name: 'Week 7 — Peak Growth',
          days: [
            {
              name: 'Day A — Lower Body Push',
              focus: 'Quad Emphasis',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '12 each side' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '15 each direction' },
                { name: 'Barbell Back Squat', sets: '4', reps: '10-12', notes: 'Continue progressive overload if hitting all reps.' },
                { name: 'Bulgarian Split Squat (Dumbbell)', sets: '4', reps: '10-12 each leg' },
                { name: 'Leg Extension', sets: '4', reps: '12-15' },
                { name: 'Goblet Squat', sets: '3', reps: '15' },
                { name: 'Seated Calf Raise', sets: '4', reps: '20' }
              ]
            },
            {
              name: 'Day B — Upper Body Push',
              focus: 'Chest + Shoulders + Triceps',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '25 reps' },
                { name: 'Mobility Warmup — Thoracic Extension over Foam Roller', sets: '2', reps: '15 reps' },
                { name: 'Barbell Bench Press', sets: '4', reps: '10-12' },
                { name: 'Incline Dumbbell Flye', sets: '4', reps: '12' },
                { name: 'Cable Chest Flye', sets: '3', reps: '15' },
                { name: 'Dumbbell Shoulder Press', sets: '4', reps: '10-12' },
                { name: 'Cable Tricep Pushdown', sets: '4', reps: '12-15' }
              ]
            },
            {
              name: 'Day C — Lower Body Pull',
              focus: 'Hamstring + Glute Emphasis',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '15 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '8 each side' },
                { name: 'Romanian Deadlift (Barbell)', sets: '4', reps: '10-12' },
                { name: 'Barbell Hip Thrust', sets: '4', reps: '12' },
                { name: 'Lying Leg Curl', sets: '4', reps: '12-15' },
                { name: 'Single-Leg Romanian Deadlift (Dumbbell)', sets: '3', reps: '10 each leg' },
                { name: 'Standing Calf Raise', sets: '4', reps: '20' }
              ]
            },
            {
              name: 'Day D — Upper Body Pull (Optional 4th Day)',
              focus: 'Back + Biceps',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '25 reps' },
                { name: 'Mobility Warmup — Scapular Shrugs (Hanging)', sets: '2', reps: '12 reps' },
                { name: 'Pull-Up or Lat Pulldown', sets: '4', reps: '10-12' },
                { name: 'Barbell Bent-Over Row', sets: '4', reps: '10-12' },
                { name: 'Seated Cable Row', sets: '4', reps: '12' },
                { name: 'Dumbbell Bicep Curl', sets: '4', reps: '12' },
                { name: 'Cable Bicep Curl', sets: '3', reps: '15' }
              ]
            }
          ]
        },
        {
          name: 'Week 8 — Deload Before Phase 3',
          days: [
            {
              name: 'Day A — Lower Body (Deload)',
              focus: 'Active Recovery',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '12 each side' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '15 each direction' },
                { name: 'Barbell Back Squat', sets: '3', reps: '10', notes: 'Drop to 60% of Week 7 weight. Move well, recover.' },
                { name: 'Bulgarian Split Squat (Dumbbell)', sets: '3', reps: '10 each leg', notes: 'Light weight.' },
                { name: 'Leg Extension', sets: '3', reps: '12' }
              ]
            },
            {
              name: 'Day B — Upper Body (Deload)',
              focus: 'Active Recovery',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '25 reps' },
                { name: 'Mobility Warmup — Thoracic Extension over Foam Roller', sets: '2', reps: '15 reps' },
                { name: 'Barbell Bench Press', sets: '3', reps: '10', notes: 'Drop to 60% of Week 7 weight.' },
                { name: 'Incline Dumbbell Flye', sets: '3', reps: '12', notes: 'Light weight, focus on the stretch.' },
                { name: 'Dumbbell Shoulder Press', sets: '3', reps: '10' }
              ]
            }
          ]
        }
      ]
    },

    // ===================== PHASE 3: METABOLIC =====================
    {
      name: 'Phase 3 — Metabolic (Weeks 9-12)',
      objective: 'High-rep pump work. This is where you push past the burn. Three sets of 12-15 reps with short rest periods. The goal is metabolic stress — flood the muscles with blood, deplete their energy stores, and force them to adapt by growing. This phase teaches you mental toughness. The weights are lighter, but the suffering is real. Embrace the pump.',
      length: '4 weeks',
      sets: '3 sets',
      reps: '12-15 reps',
      rest: '60-90 seconds (short rest = more metabolic stress)',
      frequency: '3-4 days per week',
      notes: 'Drop weight by 15-20% from Week 7. The goal is NOT to lift heavy — the goal is to accumulate volume, create a massive pump, and finish every set feeling like your muscles are about to explode. If you can rest longer than 90 seconds, you\'re going too light. Rest periods are part of the program.',
      weeks: [
        {
          name: 'Week 9 — Metabolic Stress Begins',
          days: [
            {
              name: 'Day A — Lower Body Push',
              focus: 'Quad Pump',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '15 each side' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '20 each direction' },
                { name: 'Barbell Back Squat', sets: '3', reps: '12-15', notes: 'Drop weight significantly from Growth phase. Move with control. By rep 12, your quads should be screaming.' },
                { name: 'Leg Press (Superset with Leg Extension)', sets: '3', reps: '15 (leg press) + 15 (leg extension)', notes: 'No rest between exercises. Do 15 leg press reps, immediately move to leg extension for 15 reps. Rest 90 seconds. Repeat. This is brutal.' },
                { name: 'Walking Lunges', sets: '3', reps: '15 each leg', notes: 'Bodyweight or light dumbbells. High reps. Your legs should feel like jelly.' },
                { name: 'Goblet Squat (Drop Set)', sets: '3', reps: '15, then drop weight and do 15 more', notes: 'Do 15 reps with a moderate weight. Immediately grab a lighter dumbbell and do 15 more reps. No rest between drops. This is a finisher.' },
                { name: 'Seated Calf Raise', sets: '3', reps: '25', notes: 'Burn out your calves.' }
              ]
            },
            {
              name: 'Day B — Upper Body Push',
              focus: 'Chest + Shoulder Pump',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '30 reps' },
                { name: 'Mobility Warmup — Thoracic Extension over Foam Roller', sets: '2', reps: '20 reps' },
                { name: 'Barbell Bench Press', sets: '3', reps: '12-15', notes: 'Lighter weight. Control the eccentric. Squeeze at the top.' },
                { name: 'Incline Dumbbell Press (Superset with Incline Flye)', sets: '3', reps: '12 (press) + 15 (flye)', notes: 'Press for 12 reps, immediately drop to lighter dumbbells and do 15 flyes. Rest 90 seconds. Your chest should be pumped beyond belief.' },
                { name: 'Cable Chest Flye (Tri-Set with Lateral Raise and Tricep Pushdown)', sets: '3', reps: '15 each exercise', notes: 'Do 15 cable flyes, immediately do 15 lateral raises, immediately do 15 tricep pushdowns. Rest 90 seconds. This tri-set will destroy your upper body in the best way.' },
                { name: 'Dumbbell Shoulder Press', sets: '3', reps: '15', notes: 'Light weight, high reps, full range of motion.' }
              ]
            },
            {
              name: 'Day C — Lower Body Pull',
              focus: 'Hamstring + Glute Pump',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '20 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '10 each side' },
                { name: 'Romanian Deadlift (Barbell)', sets: '3', reps: '12-15', notes: 'Lighter weight. Focus on the stretch and contraction. By rep 12, your hamstrings should be on fire.' },
                { name: 'Barbell Hip Thrust (Superset with Lying Leg Curl)', sets: '3', reps: '15 (hip thrust) + 15 (leg curl)', notes: 'Hip thrust for 15 reps, immediately move to lying leg curl for 15 reps. Rest 90 seconds. Your glutes and hamstrings will be pumped.' },
                { name: 'Single-Leg Romanian Deadlift (Dumbbell)', sets: '3', reps: '12 each leg', notes: 'Light weight. Balance and feel the hamstring working.' },
                { name: 'Glute Kickback (Cable or Machine)', sets: '3', reps: '20 each leg', notes: 'Isolation work. Squeeze your glute at the top of every rep.' },
                { name: 'Standing Calf Raise', sets: '3', reps: '25' }
              ]
            },
            {
              name: 'Day D — Upper Body Pull (Optional 4th Day)',
              focus: 'Back + Bicep Pump',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '30 reps' },
                { name: 'Mobility Warmup — Scapular Shrugs (Hanging)', sets: '2', reps: '15 reps' },
                { name: 'Pull-Up or Lat Pulldown', sets: '3', reps: '12-15', notes: 'If doing pull-ups and you can\'t hit 12 reps, use assistance or switch to lat pulldown.' },
                { name: 'Barbell Bent-Over Row (Superset with Seated Cable Row)', sets: '3', reps: '12 (barbell) + 15 (cable)', notes: 'Barbell row for 12 reps, immediately move to seated cable row for 15 reps. Rest 90 seconds. Your back should be pumped.' },
                { name: 'Dumbbell Bicep Curl (Superset with Hammer Curl)', sets: '3', reps: '15 (regular) + 15 (hammer)', notes: 'Regular curls for 15 reps, immediately switch to hammer curls for 15 reps. No rest between. Your biceps will be screaming.' },
                { name: 'Cable Bicep Curl (Drop Set)', sets: '3', reps: '15, then drop and do 15 more', notes: 'Do 15 reps, immediately drop the weight and do 15 more. This is the finisher.' }
              ]
            }
          ]
        },
        {
          name: 'Week 10 — Push the Pump',
          days: [
            {
              name: 'Day A — Lower Body Push',
              focus: 'Quad Pump',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '15 each side' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '20 each direction' },
                { name: 'Barbell Back Squat', sets: '3', reps: '12-15', notes: 'Same weight as Week 9 or add 5-10 lbs if you\'re hitting 15 reps clean.' },
                { name: 'Leg Press (Superset with Leg Extension)', sets: '3', reps: '15 + 15' },
                { name: 'Walking Lunges', sets: '3', reps: '15 each leg' },
                { name: 'Goblet Squat (Drop Set)', sets: '3', reps: '15 + 15' },
                { name: 'Seated Calf Raise', sets: '3', reps: '25' }
              ]
            },
            {
              name: 'Day B — Upper Body Push',
              focus: 'Chest + Shoulder Pump',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '30 reps' },
                { name: 'Mobility Warmup — Thoracic Extension over Foam Roller', sets: '2', reps: '20 reps' },
                { name: 'Barbell Bench Press', sets: '3', reps: '12-15' },
                { name: 'Incline Dumbbell Press (Superset with Incline Flye)', sets: '3', reps: '12 + 15' },
                { name: 'Cable Chest Flye (Tri-Set with Lateral Raise and Tricep Pushdown)', sets: '3', reps: '15 each' },
                { name: 'Dumbbell Shoulder Press', sets: '3', reps: '15' }
              ]
            },
            {
              name: 'Day C — Lower Body Pull',
              focus: 'Hamstring + Glute Pump',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '20 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '10 each side' },
                { name: 'Romanian Deadlift (Barbell)', sets: '3', reps: '12-15' },
                { name: 'Barbell Hip Thrust (Superset with Lying Leg Curl)', sets: '3', reps: '15 + 15' },
                { name: 'Single-Leg Romanian Deadlift (Dumbbell)', sets: '3', reps: '12 each leg' },
                { name: 'Glute Kickback (Cable or Machine)', sets: '3', reps: '20 each leg' },
                { name: 'Standing Calf Raise', sets: '3', reps: '25' }
              ]
            },
            {
              name: 'Day D — Upper Body Pull (Optional 4th Day)',
              focus: 'Back + Bicep Pump',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '30 reps' },
                { name: 'Mobility Warmup — Scapular Shrugs (Hanging)', sets: '2', reps: '15 reps' },
                { name: 'Pull-Up or Lat Pulldown', sets: '3', reps: '12-15' },
                { name: 'Barbell Bent-Over Row (Superset with Seated Cable Row)', sets: '3', reps: '12 + 15' },
                { name: 'Dumbbell Bicep Curl (Superset with Hammer Curl)', sets: '3', reps: '15 + 15' },
                { name: 'Cable Bicep Curl (Drop Set)', sets: '3', reps: '15 + 15' }
              ]
            }
          ]
        },
        {
          name: 'Week 11 — Peak Metabolic Stress',
          days: [
            {
              name: 'Day A — Lower Body Push',
              focus: 'Quad Pump',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '15 each side' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '20 each direction' },
                { name: 'Barbell Back Squat', sets: '3', reps: '12-15' },
                { name: 'Leg Press (Superset with Leg Extension)', sets: '3', reps: '15 + 15' },
                { name: 'Walking Lunges', sets: '3', reps: '15 each leg' },
                { name: 'Goblet Squat (Drop Set)', sets: '3', reps: '15 + 15' },
                { name: 'Seated Calf Raise', sets: '3', reps: '25' }
              ]
            },
            {
              name: 'Day B — Upper Body Push',
              focus: 'Chest + Shoulder Pump',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '30 reps' },
                { name: 'Mobility Warmup — Thoracic Extension over Foam Roller', sets: '2', reps: '20 reps' },
                { name: 'Barbell Bench Press', sets: '3', reps: '12-15' },
                { name: 'Incline Dumbbell Press (Superset with Incline Flye)', sets: '3', reps: '12 + 15' },
                { name: 'Cable Chest Flye (Tri-Set with Lateral Raise and Tricep Pushdown)', sets: '3', reps: '15 each' },
                { name: 'Dumbbell Shoulder Press', sets: '3', reps: '15' }
              ]
            },
            {
              name: 'Day C — Lower Body Pull',
              focus: 'Hamstring + Glute Pump',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '20 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '10 each side' },
                { name: 'Romanian Deadlift (Barbell)', sets: '3', reps: '12-15' },
                { name: 'Barbell Hip Thrust (Superset with Lying Leg Curl)', sets: '3', reps: '15 + 15' },
                { name: 'Single-Leg Romanian Deadlift (Dumbbell)', sets: '3', reps: '12 each leg' },
                { name: 'Glute Kickback (Cable or Machine)', sets: '3', reps: '20 each leg' },
                { name: 'Standing Calf Raise', sets: '3', reps: '25' }
              ]
            },
            {
              name: 'Day D — Upper Body Pull (Optional 4th Day)',
              focus: 'Back + Bicep Pump',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '30 reps' },
                { name: 'Mobility Warmup — Scapular Shrugs (Hanging)', sets: '2', reps: '15 reps' },
                { name: 'Pull-Up or Lat Pulldown', sets: '3', reps: '12-15' },
                { name: 'Barbell Bent-Over Row (Superset with Seated Cable Row)', sets: '3', reps: '12 + 15' },
                { name: 'Dumbbell Bicep Curl (Superset with Hammer Curl)', sets: '3', reps: '15 + 15' },
                { name: 'Cable Bicep Curl (Drop Set)', sets: '3', reps: '15 + 15' }
              ]
            }
          ]
        },
        {
          name: 'Week 12 — Final Push',
          days: [
            {
              name: 'Day A — Lower Body Push',
              focus: 'Quad Pump',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '15 each side' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '20 each direction' },
                { name: 'Barbell Back Squat', sets: '3', reps: '12-15', notes: 'Final squat session of this program. Make every rep count.' },
                { name: 'Leg Press (Superset with Leg Extension)', sets: '3', reps: '15 + 15' },
                { name: 'Walking Lunges', sets: '3', reps: '15 each leg' },
                { name: 'Goblet Squat (Drop Set)', sets: '3', reps: '15 + 15', notes: 'Leave it all on the gym floor.' },
                { name: 'Seated Calf Raise', sets: '3', reps: '25' }
              ]
            },
            {
              name: 'Day B — Upper Body Push',
              focus: 'Chest + Shoulder Pump',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '30 reps' },
                { name: 'Mobility Warmup — Thoracic Extension over Foam Roller', sets: '2', reps: '20 reps' },
                { name: 'Barbell Bench Press', sets: '3', reps: '12-15', notes: 'Final bench press of the program. Finish strong.' },
                { name: 'Incline Dumbbell Press (Superset with Incline Flye)', sets: '3', reps: '12 + 15' },
                { name: 'Cable Chest Flye (Tri-Set with Lateral Raise and Tricep Pushdown)', sets: '3', reps: '15 each' },
                { name: 'Dumbbell Shoulder Press', sets: '3', reps: '15', notes: 'You\'ve earned this pump. Congratulations on completing Kinetiq Hypertrophy.' }
              ]
            },
            {
              name: 'Day C — Lower Body Pull',
              focus: 'Hamstring + Glute Pump',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '20 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '10 each side' },
                { name: 'Romanian Deadlift (Barbell)', sets: '3', reps: '12-15', notes: 'Final RDL session. Feel the hamstring stretch. Appreciate how far you\'ve come.' },
                { name: 'Barbell Hip Thrust (Superset with Lying Leg Curl)', sets: '3', reps: '15 + 15' },
                { name: 'Single-Leg Romanian Deadlift (Dumbbell)', sets: '3', reps: '12 each leg' },
                { name: 'Glute Kickback (Cable or Machine)', sets: '3', reps: '20 each leg' },
                { name: 'Standing Calf Raise', sets: '3', reps: '25', notes: 'Final set. Make it count. You\'re done. Move on to Kinetiq Unilateral to fix imbalances and bulletproof your joints.' }
              ]
            },
            {
              name: 'Day D — Upper Body Pull (Optional 4th Day)',
              focus: 'Back + Bicep Pump',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '30 reps' },
                { name: 'Mobility Warmup — Scapular Shrugs (Hanging)', sets: '2', reps: '15 reps' },
                { name: 'Pull-Up or Lat Pulldown', sets: '3', reps: '12-15' },
                { name: 'Barbell Bent-Over Row (Superset with Seated Cable Row)', sets: '3', reps: '12 + 15' },
                { name: 'Dumbbell Bicep Curl (Superset with Hammer Curl)', sets: '3', reps: '15 + 15' },
                { name: 'Cable Bicep Curl (Drop Set)', sets: '3', reps: '15 + 15', notes: 'Final bicep pump of the program. Well done.' }
              ]
            }
          ]
        }
      ]
    }
  ]
};
// =============================================
// KINETIQ BALANCE — 8-Week Unilateral Training Program
// =============================================
var kinetiqBalanceData = {
  id: 'kinetiq-balance-builtin',
  name: 'Kinetiq Balance',
  source: 'builtin',
  description: "An 8-week program focused on single-leg and single-arm work to fix imbalances, build stability, and bulletproof your joints. After months of heavy bilateral training in Strong and Hypertrophy, your body has developed strength asymmetries — one side is always slightly stronger. This program fixes that. You will work one limb at a time, forcing each side to carry its own weight. CRITICAL RULE: Always start with your weaker side and match the reps on your stronger side. If your left leg can only do 8 reps, your right leg does 8 — not 10, not 12. This is how you build true balance. 3-4 days per week. Recommended Progression: Strong → Hypertrophy → Balance → Deload (1 wk) → Repeat. Programs can run standalone or mixed based on your goals.",
  difficulty: 'Intermediate',
  duration: '8 weeks',
  phases: [

    // ===================== PHASE 1: INTRODUCTION =====================
    {
      name: 'Phase 1 — Introduction (Weeks 1-2)',
      objective: 'Learn unilateral movements and identify imbalances. Single-leg and single-arm work is humbling — weights that feel light bilaterally will challenge you here. Your weaker side will dictate the pace. Accept it. This phase is about movement quality, not load.',
      length: '2 weeks',
      sets: '3 sets',
      reps: '8-10 reps per side',
      rest: '90 seconds between sets',
      frequency: '3-4 days per week',
      notes: 'Start light — use 50-60% of what you would use for bilateral work. Focus on balance and control. ALWAYS start with your weaker side and match reps on your stronger side. If left leg gets 8 reps, right leg does 8. Do not let your strong side do more reps.',
      weeks: [
        {
          name: 'Week 1 — Find Your Imbalances',
          days: [
            {
              name: 'Day A — Lower Body Single-Leg',
              focus: 'Squat Pattern + Balance',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '10 each side', notes: 'Same warmup from Strong and Hypertrophy. Open up the hips before single-leg work.' },
                { name: 'Mobility Warmup — Single-Leg Glute Bridge', sets: '2', reps: '10 each side', notes: 'Lie on your back, one foot on the ground, other leg extended. Drive through the planted heel and lift your hips. Squeeze your glute at the top. This activates each glute independently.' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '12 each direction (both ankles)', notes: 'Single-leg work demands mobile ankles.' },
                { name: 'Bulgarian Split Squat (Dumbbell)', sets: '3', reps: '8-10 each leg', notes: 'Back foot elevated on a bench, dumbbells in hands. Start with your WEAKER leg forward. Lower until your back knee nearly touches the ground. Drive through your front heel to stand. Count your reps. If your weak leg gets 8 reps, your strong leg does 8 — no more. This is the foundational movement of this program. Start light.' },
                { name: 'Single-Leg Press (Machine)', sets: '3', reps: '10 each leg', notes: 'One foot on the platform, the other foot off to the side. Press through your heel. Lower with control. Start with your weaker leg. Match reps.' },
                { name: 'Single-Leg Romanian Deadlift (Dumbbell)', sets: '3', reps: '10 each leg', notes: 'Stand on one leg, dumbbell in the opposite hand. Hinge forward, letting the dumbbell travel down your standing leg. Your non-working leg extends behind you for balance. Feel the hamstring stretch. Drive your hips forward to stand. This challenges balance and hamstring strength simultaneously. Start with your weaker leg.' },
                { name: 'Single-Leg Calf Raise', sets: '3', reps: '15 each leg', notes: 'Stand on one leg, rise up onto your toes. Lower with control. Hold something for balance if needed. Start with your weaker leg.' }
              ]
            },
            {
              name: 'Day B — Upper Body Single-Arm + Core',
              focus: 'Unilateral Pressing + Anti-Rotation',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '20 reps', notes: 'Same as always. Healthy shoulders matter even more when working one arm at a time.' },
                { name: 'Mobility Warmup — Thoracic Rotation', sets: '2', reps: '10 each side', notes: 'On all fours, place one hand behind your head. Rotate your elbow down toward the opposite elbow, then rotate up toward the ceiling. This opens up your thoracic spine before single-arm work.' },
                { name: 'Single-Arm Dumbbell Press', sets: '3', reps: '8-10 each arm', notes: 'Standing or seated. Press one dumbbell overhead. Your core has to resist rotation — do not let your body twist. Start with your weaker arm. If your weak arm gets 8 reps, your strong arm does 8. This will feel strange at first. Your core is working hard to stabilize.' },
                { name: 'Single-Arm Dumbbell Row', sets: '3', reps: '10 each arm', notes: 'One hand and one knee on a bench, dumbbell in the free hand. Pull the dumbbell to your ribs. Do not rotate your torso — keep your shoulders square. Start with your weaker arm.' },
                { name: 'Single-Arm Cable Chest Press', sets: '3', reps: '10 each arm', notes: 'Stand facing away from a cable machine, handle in one hand at chest height. Press forward. Your core fights rotation. Do not let your body twist. Start with your weaker arm.' },
                { name: 'Pallof Press (Anti-Rotation Core)', sets: '3', reps: '12 each side', notes: 'Stand sideways to a cable machine, handle at chest height. Hold the handle with both hands at your chest. Press the handle straight out in front of you. The cable tries to pull you sideways — resist. Your core is learning to resist rotation under load. This is foundational core stability work.' },
                { name: 'Single-Arm Farmer Carry', sets: '3', reps: '40 yards each arm', notes: 'Hold a heavy dumbbell or kettlebell in one hand. Walk. Do not lean to the side. Your core and obliques work to keep you upright. Start with your weaker side.' }
              ]
            },
            {
              name: 'Day C — Lower Body Single-Leg (Hip Hinge Focus)',
              focus: 'Posterior Chain + Stability',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '12 reps', notes: 'Warm up your spine before hinge work.' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '6 each side', notes: 'Best single warmup for hip mobility.' },
                { name: 'Mobility Warmup — Single-Leg Glute Bridge', sets: '2', reps: '10 each side', notes: 'Activate each glute independently.' },
                { name: 'Single-Leg Romanian Deadlift (Barbell)', sets: '3', reps: '8-10 each leg', notes: 'Stand on one leg, barbell in both hands. Hinge forward. Your non-working leg extends behind you. Feel the deep hamstring stretch on your standing leg. This is more challenging than the dumbbell version because the barbell forces you to balance more carefully. Start light. Start with your weaker leg.' },
                { name: 'Single-Leg Hip Thrust', sets: '3', reps: '10 each leg', notes: 'Upper back on a bench, one foot planted on the ground, other leg extended. Drive your hips up. Squeeze your glute hard at the top for 2 seconds. This isolates each glute. Start with your weaker side.' },
                { name: 'Single-Leg Leg Curl', sets: '3', reps: '10 each leg', notes: 'Lying leg curl machine, one leg at a time. Curl your heel toward your butt. Squeeze at the top. Start with your weaker leg.' },
                { name: 'Walking Lunge', sets: '3', reps: '10 each leg', notes: 'Bodyweight or holding dumbbells. Step forward into a lunge. Your back knee nearly touches the ground. Stand up and bring your back leg forward into the next lunge. This is unilateral work in motion. Control every rep.' },
                { name: 'Single-Leg Calf Raise', sets: '3', reps: '15 each leg', notes: 'One leg at a time. Full range of motion.' }
              ]
            },
            {
              name: 'Day D — Upper Body Single-Arm + Core (Optional 4th Day)',
              focus: 'Rowing + Anti-Lateral Flexion',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '20 reps' },
                { name: 'Mobility Warmup — Scapular Shrugs (Hanging)', sets: '2', reps: '10 reps', notes: 'Hang from a bar. Shrug your shoulders down and back without bending your elbows.' },
                { name: 'Single-Arm Cable Row', sets: '3', reps: '10 each arm', notes: 'Seated at a cable row station. Pull with one arm. Do not rotate your torso. Keep your shoulders square. Start with your weaker arm.' },
                { name: 'Single-Arm Lat Pulldown', sets: '3', reps: '10 each arm', notes: 'Pull the handle down to your chest with one arm. Your torso will want to rotate — do not let it. Core stays tight. Start with your weaker arm.' },
                { name: 'Single-Arm Dumbbell Bench Press', sets: '3', reps: '10 each arm', notes: 'Lie on a bench. Press one dumbbell. Your body will want to roll toward the working side — resist. Keep your shoulders flat on the bench. This teaches core stability under pressing load. Start with your weaker arm.' },
                { name: 'Side Plank', sets: '3', reps: '30-45 seconds each side', notes: 'Forearm on the ground, body in a straight line. Do not let your hips sag. This builds anti-lateral flexion strength — your core resists bending sideways. Start with your weaker side.' },
                { name: 'Single-Arm Overhead Carry', sets: '3', reps: '40 yards each arm', notes: 'Hold a dumbbell or kettlebell overhead in one hand. Walk. Do not lean. Your shoulder stabilizers and core work together to keep you upright. Start with your weaker side.' }
              ]
            }
          ]
        },
        {
          name: 'Week 2 — Refine Technique',
          days: [
            {
              name: 'Day A — Lower Body Single-Leg',
              focus: 'Squat Pattern + Balance',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '10 each side' },
                { name: 'Mobility Warmup — Single-Leg Glute Bridge', sets: '2', reps: '10 each side' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '12 each direction (both ankles)' },
                { name: 'Bulgarian Split Squat (Dumbbell)', sets: '3', reps: '8-10 each leg', notes: 'Same weight as Week 1 or add 5 lbs per dumbbell if all reps were clean. Focus on depth and control. Start with your weaker leg. Match reps.' },
                { name: 'Single-Leg Press (Machine)', sets: '3', reps: '10 each leg', notes: 'Add weight if Week 1 felt easy. Start with your weaker leg.' },
                { name: 'Single-Leg Romanian Deadlift (Dumbbell)', sets: '3', reps: '10 each leg', notes: 'Add 5 lbs per dumbbell if balance felt solid in Week 1. Start with your weaker leg.' },
                { name: 'Single-Leg Calf Raise', sets: '3', reps: '15 each leg' }
              ]
            },
            {
              name: 'Day B — Upper Body Single-Arm + Core',
              focus: 'Unilateral Pressing + Anti-Rotation',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '20 reps' },
                { name: 'Mobility Warmup — Thoracic Rotation', sets: '2', reps: '10 each side' },
                { name: 'Single-Arm Dumbbell Press', sets: '3', reps: '8-10 each arm', notes: 'Add 5 lbs if Week 1 was solid. Start with your weaker arm. Match reps.' },
                { name: 'Single-Arm Dumbbell Row', sets: '3', reps: '10 each arm', notes: 'Add weight if form was perfect in Week 1. Start with your weaker arm.' },
                { name: 'Single-Arm Cable Chest Press', sets: '3', reps: '10 each arm', notes: 'Add weight if you controlled rotation well in Week 1. Start with your weaker arm.' },
                { name: 'Pallof Press (Anti-Rotation Core)', sets: '3', reps: '12 each side', notes: 'Add weight or step further from the cable to increase difficulty.' },
                { name: 'Single-Arm Farmer Carry', sets: '3', reps: '40 yards each arm', notes: 'Add 5-10 lbs if Week 1 felt easy. Start with your weaker side.' }
              ]
            },
            {
              name: 'Day C — Lower Body Single-Leg (Hip Hinge Focus)',
              focus: 'Posterior Chain + Stability',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '12 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '6 each side' },
                { name: 'Mobility Warmup — Single-Leg Glute Bridge', sets: '2', reps: '10 each side' },
                { name: 'Single-Leg Romanian Deadlift (Barbell)', sets: '3', reps: '8-10 each leg', notes: 'Add 10 lbs if balance was solid in Week 1. Start with your weaker leg.' },
                { name: 'Single-Leg Hip Thrust', sets: '3', reps: '10 each leg', notes: 'Add weight across your hips if Week 1 felt easy. Start with your weaker side.' },
                { name: 'Single-Leg Leg Curl', sets: '3', reps: '10 each leg', notes: 'Add weight if form was solid. Start with your weaker leg.' },
                { name: 'Walking Lunge', sets: '3', reps: '10 each leg', notes: 'Add 5 lbs per dumbbell if balance was good in Week 1.' },
                { name: 'Single-Leg Calf Raise', sets: '3', reps: '15 each leg' }
              ]
            },
            {
              name: 'Day D — Upper Body Single-Arm + Core (Optional 4th Day)',
              focus: 'Rowing + Anti-Lateral Flexion',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '20 reps' },
                { name: 'Mobility Warmup — Scapular Shrugs (Hanging)', sets: '2', reps: '10 reps' },
                { name: 'Single-Arm Cable Row', sets: '3', reps: '10 each arm', notes: 'Add weight if you controlled rotation in Week 1. Start with your weaker arm.' },
                { name: 'Single-Arm Lat Pulldown', sets: '3', reps: '10 each arm', notes: 'Add weight if form was solid. Start with your weaker arm.' },
                { name: 'Single-Arm Dumbbell Bench Press', sets: '3', reps: '10 each arm', notes: 'Add 5 lbs if you kept your shoulders square in Week 1. Start with your weaker arm.' },
                { name: 'Side Plank', sets: '3', reps: '30-45 seconds each side', notes: 'Add 5-10 seconds if Week 1 was easy. Start with your weaker side.' },
                { name: 'Single-Arm Overhead Carry', sets: '3', reps: '40 yards each arm', notes: 'Add 5-10 lbs if form was solid. Start with your weaker side.' }
              ]
            }
          ]
        }
      ]
    },

    // ===================== PHASE 2: LOAD PROGRESSION =====================
    {
      name: 'Phase 2 — Load Progression (Weeks 3-4)',
      objective: 'Add weight. Your body has adapted to unilateral work. Time to increase the load while maintaining perfect form. The imbalances are shrinking — your weaker side is catching up. Keep the rule: weaker side dictates reps.',
      length: '2 weeks',
      sets: '4 sets',
      reps: '8-10 reps per side',
      rest: '90-120 seconds between sets',
      frequency: '3-4 days per week',
      notes: 'Increase weight by 5-10% from Week 2. Four sets now instead of three. Your weaker side still dictates the rep count. If your weak side hits 8 reps, your strong side does 8.',
      weeks: [
        {
          name: 'Week 3 — Add Volume',
          days: [
            {
              name: 'Day A — Lower Body Single-Leg',
              focus: 'Squat Pattern + Balance',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '12 each side' },
                { name: 'Mobility Warmup — Single-Leg Glute Bridge', sets: '2', reps: '12 each side' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '15 each direction' },
                { name: 'Bulgarian Split Squat (Dumbbell)', sets: '4', reps: '8-10 each leg', notes: 'Add 5 lbs per dumbbell from Week 2. Four sets now. Start with your weaker leg. Match reps.' },
                { name: 'Single-Leg Press (Machine)', sets: '4', reps: '10 each leg', notes: 'Add weight. Start with your weaker leg.' },
                { name: 'Single-Leg Romanian Deadlift (Dumbbell)', sets: '4', reps: '10 each leg', notes: 'Add 5 lbs per dumbbell. Start with your weaker leg.' },
                { name: 'Single-Leg Calf Raise', sets: '4', reps: '15 each leg' }
              ]
            },
            {
              name: 'Day B — Upper Body Single-Arm + Core',
              focus: 'Unilateral Pressing + Anti-Rotation',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '25 reps' },
                { name: 'Mobility Warmup — Thoracic Rotation', sets: '2', reps: '12 each side' },
                { name: 'Single-Arm Dumbbell Press', sets: '4', reps: '8-10 each arm', notes: 'Add 5 lbs from Week 2. Start with your weaker arm. Match reps.' },
                { name: 'Single-Arm Dumbbell Row', sets: '4', reps: '10 each arm', notes: 'Add weight. Start with your weaker arm.' },
                { name: 'Single-Arm Cable Chest Press', sets: '4', reps: '10 each arm', notes: 'Add weight. Start with your weaker arm.' },
                { name: 'Pallof Press (Anti-Rotation Core)', sets: '4', reps: '12 each side', notes: 'Increase resistance or step further from the cable.' },
                { name: 'Single-Arm Farmer Carry', sets: '4', reps: '40 yards each arm', notes: 'Add 10 lbs from Week 2. Start with your weaker side.' }
              ]
            },
            {
              name: 'Day C — Lower Body Single-Leg (Hip Hinge Focus)',
              focus: 'Posterior Chain + Stability',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '15 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '8 each side' },
                { name: 'Mobility Warmup — Single-Leg Glute Bridge', sets: '2', reps: '12 each side' },
                { name: 'Single-Leg Romanian Deadlift (Barbell)', sets: '4', reps: '8-10 each leg', notes: 'Add 10 lbs from Week 2. Start with your weaker leg.' },
                { name: 'Single-Leg Hip Thrust', sets: '4', reps: '10 each leg', notes: 'Add weight across your hips. Start with your weaker side.' },
                { name: 'Single-Leg Leg Curl', sets: '4', reps: '10 each leg', notes: 'Add weight. Start with your weaker leg.' },
                { name: 'Walking Lunge', sets: '4', reps: '10 each leg', notes: 'Add 5 lbs per dumbbell.' },
                { name: 'Single-Leg Calf Raise', sets: '4', reps: '15 each leg' }
              ]
            },
            {
              name: 'Day D — Upper Body Single-Arm + Core (Optional 4th Day)',
              focus: 'Rowing + Anti-Lateral Flexion',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '25 reps' },
                { name: 'Mobility Warmup — Scapular Shrugs (Hanging)', sets: '2', reps: '12 reps' },
                { name: 'Single-Arm Cable Row', sets: '4', reps: '10 each arm', notes: 'Add weight. Start with your weaker arm.' },
                { name: 'Single-Arm Lat Pulldown', sets: '4', reps: '10 each arm', notes: 'Add weight. Start with your weaker arm.' },
                { name: 'Single-Arm Dumbbell Bench Press', sets: '4', reps: '10 each arm', notes: 'Add 5 lbs. Start with your weaker arm.' },
                { name: 'Side Plank', sets: '4', reps: '45 seconds each side', notes: 'Increase hold time. Start with your weaker side.' },
                { name: 'Single-Arm Overhead Carry', sets: '4', reps: '40 yards each arm', notes: 'Add 10 lbs. Start with your weaker side.' }
              ]
            }
          ]
        },
        {
          name: 'Week 4 — Peak Load',
          days: [
            {
              name: 'Day A — Lower Body Single-Leg',
              focus: 'Squat Pattern + Balance',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '12 each side' },
                { name: 'Mobility Warmup — Single-Leg Glute Bridge', sets: '2', reps: '12 each side' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '15 each direction' },
                { name: 'Bulgarian Split Squat (Dumbbell)', sets: '4', reps: '8-10 each leg', notes: 'Add 5 lbs per dumbbell from Week 3 if all reps were clean. This is peak load for Phase 2. Start with your weaker leg. Match reps.' },
                { name: 'Single-Leg Press (Machine)', sets: '4', reps: '10 each leg', notes: 'Add weight. Start with your weaker leg.' },
                { name: 'Single-Leg Romanian Deadlift (Dumbbell)', sets: '4', reps: '10 each leg', notes: 'Add 5 lbs per dumbbell. Start with your weaker leg.' },
                { name: 'Single-Leg Calf Raise', sets: '4', reps: '15 each leg' }
              ]
            },
            {
              name: 'Day B — Upper Body Single-Arm + Core',
              focus: 'Unilateral Pressing + Anti-Rotation',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '25 reps' },
                { name: 'Mobility Warmup — Thoracic Rotation', sets: '2', reps: '12 each side' },
                { name: 'Single-Arm Dumbbell Press', sets: '4', reps: '8-10 each arm', notes: 'Add 5 lbs from Week 3 if form was perfect. Peak load week. Start with your weaker arm. Match reps.' },
                { name: 'Single-Arm Dumbbell Row', sets: '4', reps: '10 each arm', notes: 'Add weight. Start with your weaker arm.' },
                { name: 'Single-Arm Cable Chest Press', sets: '4', reps: '10 each arm', notes: 'Add weight. Start with your weaker arm.' },
                { name: 'Pallof Press (Anti-Rotation Core)', sets: '4', reps: '12 each side', notes: 'Max resistance or max distance from cable.' },
                { name: 'Single-Arm Farmer Carry', sets: '4', reps: '40 yards each arm', notes: 'Add 10 lbs from Week 3. Start with your weaker side.' }
              ]
            },
            {
              name: 'Day C — Lower Body Single-Leg (Hip Hinge Focus)',
              focus: 'Posterior Chain + Stability',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '15 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '8 each side' },
                { name: 'Mobility Warmup — Single-Leg Glute Bridge', sets: '2', reps: '12 each side' },
                { name: 'Single-Leg Romanian Deadlift (Barbell)', sets: '4', reps: '8-10 each leg', notes: 'Add 10 lbs from Week 3. Peak load. Start with your weaker leg.' },
                { name: 'Single-Leg Hip Thrust', sets: '4', reps: '10 each leg', notes: 'Add weight. Start with your weaker side.' },
                { name: 'Single-Leg Leg Curl', sets: '4', reps: '10 each leg', notes: 'Add weight. Start with your weaker leg.' },
                { name: 'Walking Lunge', sets: '4', reps: '10 each leg', notes: 'Add 5 lbs per dumbbell.' },
                { name: 'Single-Leg Calf Raise', sets: '4', reps: '15 each leg' }
              ]
            },
            {
              name: 'Day D — Upper Body Single-Arm + Core (Optional 4th Day)',
              focus: 'Rowing + Anti-Lateral Flexion',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '25 reps' },
                { name: 'Mobility Warmup — Scapular Shrugs (Hanging)', sets: '2', reps: '12 reps' },
                { name: 'Single-Arm Cable Row', sets: '4', reps: '10 each arm', notes: 'Add weight. Peak load week. Start with your weaker arm.' },
                { name: 'Single-Arm Lat Pulldown', sets: '4', reps: '10 each arm', notes: 'Add weight. Start with your weaker arm.' },
                { name: 'Single-Arm Dumbbell Bench Press', sets: '4', reps: '10 each arm', notes: 'Add 5 lbs. Start with your weaker arm.' },
                { name: 'Side Plank', sets: '4', reps: '45-60 seconds each side', notes: 'Max hold time. Start with your weaker side.' },
                { name: 'Single-Arm Overhead Carry', sets: '4', reps: '40 yards each arm', notes: 'Add 10 lbs. Start with your weaker side.' }
              ]
            }
          ]
        }
      ]
    },

    // ===================== PHASE 3: CONSOLIDATION =====================
    {
      name: 'Phase 3 — Consolidation (Weeks 5-6)',
      objective: 'Maintain the load from Phase 2 and refine movement quality. Your imbalances are mostly corrected now. Both sides should feel nearly equal in strength and control. This phase cements the gains.',
      length: '2 weeks',
      sets: '4 sets',
      reps: '8-10 reps per side',
      rest: '90-120 seconds between sets',
      frequency: '3-4 days per week',
      notes: 'Same weight as Week 4. Focus on perfect reps. Your weaker side should be approaching your stronger side in strength. Continue starting with your weaker side and matching reps.',
      weeks: [
        {
          name: 'Week 5 — Maintain and Refine',
          days: [
            {
              name: 'Day A — Lower Body Single-Leg',
              focus: 'Squat Pattern + Balance',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '12 each side' },
                { name: 'Mobility Warmup — Single-Leg Glute Bridge', sets: '2', reps: '12 each side' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '15 each direction' },
                { name: 'Bulgarian Split Squat (Dumbbell)', sets: '4', reps: '8-10 each leg', notes: 'Same weight as Week 4. Perfect every rep. Start with your weaker leg. Match reps.' },
                { name: 'Single-Leg Press (Machine)', sets: '4', reps: '10 each leg', notes: 'Same weight. Focus on depth and control. Start with your weaker leg.' },
                { name: 'Single-Leg Romanian Deadlift (Dumbbell)', sets: '4', reps: '10 each leg', notes: 'Same weight. Feel the hamstring stretch. Start with your weaker leg.' },
                { name: 'Single-Leg Calf Raise', sets: '4', reps: '15 each leg' }
              ]
            },
            {
              name: 'Day B — Upper Body Single-Arm + Core',
              focus: 'Unilateral Pressing + Anti-Rotation',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '25 reps' },
                { name: 'Mobility Warmup — Thoracic Rotation', sets: '2', reps: '12 each side' },
                { name: 'Single-Arm Dumbbell Press', sets: '4', reps: '8-10 each arm', notes: 'Same weight as Week 4. Control the eccentric. Start with your weaker arm. Match reps.' },
                { name: 'Single-Arm Dumbbell Row', sets: '4', reps: '10 each arm', notes: 'Same weight. Perfect form. Start with your weaker arm.' },
                { name: 'Single-Arm Cable Chest Press', sets: '4', reps: '10 each arm', notes: 'Same weight. No rotation. Start with your weaker arm.' },
                { name: 'Pallof Press (Anti-Rotation Core)', sets: '4', reps: '12 each side', notes: 'Same resistance. Your core should feel rock solid by now.' },
                { name: 'Single-Arm Farmer Carry', sets: '4', reps: '40 yards each arm', notes: 'Same weight. Start with your weaker side.' }
              ]
            },
            {
              name: 'Day C — Lower Body Single-Leg (Hip Hinge Focus)',
              focus: 'Posterior Chain + Stability',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '15 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '8 each side' },
                { name: 'Mobility Warmup — Single-Leg Glute Bridge', sets: '2', reps: '12 each side' },
                { name: 'Single-Leg Romanian Deadlift (Barbell)', sets: '4', reps: '8-10 each leg', notes: 'Same weight as Week 4. Perfect your balance. Start with your weaker leg.' },
                { name: 'Single-Leg Hip Thrust', sets: '4', reps: '10 each leg', notes: 'Same weight. Squeeze hard at the top. Start with your weaker side.' },
                { name: 'Single-Leg Leg Curl', sets: '4', reps: '10 each leg', notes: 'Same weight. Start with your weaker leg.' },
                { name: 'Walking Lunge', sets: '4', reps: '10 each leg', notes: 'Same weight. Control every rep.' },
                { name: 'Single-Leg Calf Raise', sets: '4', reps: '15 each leg' }
              ]
            },
            {
              name: 'Day D — Upper Body Single-Arm + Core (Optional 4th Day)',
              focus: 'Rowing + Anti-Lateral Flexion',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '25 reps' },
                { name: 'Mobility Warmup — Scapular Shrugs (Hanging)', sets: '2', reps: '12 reps' },
                { name: 'Single-Arm Cable Row', sets: '4', reps: '10 each arm', notes: 'Same weight. No rotation. Start with your weaker arm.' },
                { name: 'Single-Arm Lat Pulldown', sets: '4', reps: '10 each arm', notes: 'Same weight. Start with your weaker arm.' },
                { name: 'Single-Arm Dumbbell Bench Press', sets: '4', reps: '10 each arm', notes: 'Same weight. Shoulders stay square. Start with your weaker arm.' },
                { name: 'Side Plank', sets: '4', reps: '60 seconds each side', notes: 'Hold strong. Start with your weaker side.' },
                { name: 'Single-Arm Overhead Carry', sets: '4', reps: '40 yards each arm', notes: 'Same weight. Start with your weaker side.' }
              ]
            }
          ]
        },
        {
          name: 'Week 6 — Final Consolidation',
          days: [
            {
              name: 'Day A — Lower Body Single-Leg',
              focus: 'Squat Pattern + Balance',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '12 each side' },
                { name: 'Mobility Warmup — Single-Leg Glute Bridge', sets: '2', reps: '12 each side' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '15 each direction' },
                { name: 'Bulgarian Split Squat (Dumbbell)', sets: '4', reps: '8-10 each leg', notes: 'Same weight. By now both sides should feel nearly equal. Start with your weaker leg. Match reps.' },
                { name: 'Single-Leg Press (Machine)', sets: '4', reps: '10 each leg', notes: 'Same weight. Start with your weaker leg.' },
                { name: 'Single-Leg Romanian Deadlift (Dumbbell)', sets: '4', reps: '10 each leg', notes: 'Same weight. Start with your weaker leg.' },
                { name: 'Single-Leg Calf Raise', sets: '4', reps: '15 each leg' }
              ]
            },
            {
              name: 'Day B — Upper Body Single-Arm + Core',
              focus: 'Unilateral Pressing + Anti-Rotation',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '25 reps' },
                { name: 'Mobility Warmup — Thoracic Rotation', sets: '2', reps: '12 each side' },
                { name: 'Single-Arm Dumbbell Press', sets: '4', reps: '8-10 each arm', notes: 'Same weight. Both arms should feel nearly equal now. Start with your weaker arm. Match reps.' },
                { name: 'Single-Arm Dumbbell Row', sets: '4', reps: '10 each arm', notes: 'Same weight. Start with your weaker arm.' },
                { name: 'Single-Arm Cable Chest Press', sets: '4', reps: '10 each arm', notes: 'Same weight. Start with your weaker arm.' },
                { name: 'Pallof Press (Anti-Rotation Core)', sets: '4', reps: '12 each side' },
                { name: 'Single-Arm Farmer Carry', sets: '4', reps: '40 yards each arm', notes: 'Same weight. Start with your weaker side.' }
              ]
            },
            {
              name: 'Day C — Lower Body Single-Leg (Hip Hinge Focus)',
              focus: 'Posterior Chain + Stability',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '15 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '8 each side' },
                { name: 'Mobility Warmup — Single-Leg Glute Bridge', sets: '2', reps: '12 each side' },
                { name: 'Single-Leg Romanian Deadlift (Barbell)', sets: '4', reps: '8-10 each leg', notes: 'Same weight. Your balance should be excellent by now. Start with your weaker leg.' },
                { name: 'Single-Leg Hip Thrust', sets: '4', reps: '10 each leg', notes: 'Same weight. Start with your weaker side.' },
                { name: 'Single-Leg Leg Curl', sets: '4', reps: '10 each leg', notes: 'Same weight. Start with your weaker leg.' },
                { name: 'Walking Lunge', sets: '4', reps: '10 each leg' },
                { name: 'Single-Leg Calf Raise', sets: '4', reps: '15 each leg' }
              ]
            },
            {
              name: 'Day D — Upper Body Single-Arm + Core (Optional 4th Day)',
              focus: 'Rowing + Anti-Lateral Flexion',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '25 reps' },
                { name: 'Mobility Warmup — Scapular Shrugs (Hanging)', sets: '2', reps: '12 reps' },
                { name: 'Single-Arm Cable Row', sets: '4', reps: '10 each arm', notes: 'Same weight. Start with your weaker arm.' },
                { name: 'Single-Arm Lat Pulldown', sets: '4', reps: '10 each arm', notes: 'Same weight. Start with your weaker arm.' },
                { name: 'Single-Arm Dumbbell Bench Press', sets: '4', reps: '10 each arm', notes: 'Same weight. Start with your weaker arm.' },
                { name: 'Side Plank', sets: '4', reps: '60 seconds each side', notes: 'Start with your weaker side.' },
                { name: 'Single-Arm Overhead Carry', sets: '4', reps: '40 yards each arm', notes: 'Same weight. Start with your weaker side.' }
              ]
            }
          ]
        }
      ]
    },

    // ===================== PHASE 4: METABOLIC FINISH =====================
    {
      name: 'Phase 4 — Metabolic Finish (Weeks 7-8)',
      objective: 'High-rep unilateral work under fatigue. You have built strength and balance. Now you test it with metabolic stress. Lighter weights, higher reps, shorter rest. Your stability under fatigue is the final test.',
      length: '2 weeks',
      sets: '3 sets',
      reps: '12-15 reps per side',
      rest: '60-90 seconds between sets',
      frequency: '3-4 days per week',
      notes: 'Drop weight by 20-30% from Week 6. High reps, short rest. This is about control under fatigue. Your weaker side still dictates reps. By the end of this phase, your imbalances should be minimal.',
      weeks: [
        {
          name: 'Week 7 — High-Rep Stability',
          days: [
            {
              name: 'Day A — Lower Body Single-Leg',
              focus: 'High-Rep Endurance',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '15 each side' },
                { name: 'Mobility Warmup — Single-Leg Glute Bridge', sets: '2', reps: '15 each side' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '20 each direction' },
                { name: 'Bulgarian Split Squat (Dumbbell)', sets: '3', reps: '12-15 each leg', notes: 'Drop weight by 25% from Week 6. High reps. Your legs will burn. Start with your weaker leg. Match reps.' },
                { name: 'Single-Leg Press (Machine)', sets: '3', reps: '15 each leg', notes: 'Lighter weight, more reps. Start with your weaker leg.' },
                { name: 'Single-Leg Romanian Deadlift (Dumbbell)', sets: '3', reps: '12-15 each leg', notes: 'Lighter weight. Control every inch of the movement. Start with your weaker leg.' },
                { name: 'Walking Lunge', sets: '3', reps: '15 each leg', notes: 'Light dumbbells or bodyweight. High volume.' },
                { name: 'Single-Leg Calf Raise', sets: '3', reps: '20 each leg', notes: 'Burn out your calves. Start with your weaker leg.' }
              ]
            },
            {
              name: 'Day B — Upper Body Single-Arm + Core',
              focus: 'High-Rep Stability',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '30 reps' },
                { name: 'Mobility Warmup — Thoracic Rotation', sets: '2', reps: '15 each side' },
                { name: 'Single-Arm Dumbbell Press', sets: '3', reps: '12-15 each arm', notes: 'Drop weight by 25%. High reps. Your core works overtime to stabilize. Start with your weaker arm. Match reps.' },
                { name: 'Single-Arm Dumbbell Row', sets: '3', reps: '15 each arm', notes: 'Lighter weight. Focus on control. Start with your weaker arm.' },
                { name: 'Single-Arm Cable Chest Press', sets: '3', reps: '15 each arm', notes: 'Lighter weight. No rotation. Start with your weaker arm.' },
                { name: 'Pallof Press (Anti-Rotation Core)', sets: '3', reps: '15 each side', notes: 'High reps. Your core should be on fire by the end of each set.' },
                { name: 'Single-Arm Farmer Carry', sets: '3', reps: '60 yards each arm', notes: 'Same weight as Week 6 but longer distance. Start with your weaker side.' }
              ]
            },
            {
              name: 'Day C — Lower Body Single-Leg (Hip Hinge Focus)',
              focus: 'High-Rep Endurance',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '20 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '10 each side' },
                { name: 'Mobility Warmup — Single-Leg Glute Bridge', sets: '2', reps: '15 each side' },
                { name: 'Single-Leg Romanian Deadlift (Barbell)', sets: '3', reps: '12-15 each leg', notes: 'Drop weight by 25%. High reps. Feel the hamstring burn. Start with your weaker leg.' },
                { name: 'Single-Leg Hip Thrust', sets: '3', reps: '15 each leg', notes: 'Lighter weight. Squeeze at the top of every rep. Start with your weaker side.' },
                { name: 'Single-Leg Leg Curl', sets: '3', reps: '15 each leg', notes: 'Lighter weight. High reps. Start with your weaker leg.' },
                { name: 'Walking Lunge', sets: '3', reps: '15 each leg' },
                { name: 'Single-Leg Calf Raise', sets: '3', reps: '20 each leg' }
              ]
            },
            {
              name: 'Day D — Upper Body Single-Arm + Core (Optional 4th Day)',
              focus: 'High-Rep Stability',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '30 reps' },
                { name: 'Mobility Warmup — Scapular Shrugs (Hanging)', sets: '2', reps: '15 reps' },
                { name: 'Single-Arm Cable Row', sets: '3', reps: '15 each arm', notes: 'Lighter weight. Control the rotation. Start with your weaker arm.' },
                { name: 'Single-Arm Lat Pulldown', sets: '3', reps: '15 each arm', notes: 'Lighter weight. Start with your weaker arm.' },
                { name: 'Single-Arm Dumbbell Bench Press', sets: '3', reps: '15 each arm', notes: 'Lighter weight. Shoulders stay square. Start with your weaker arm.' },
                { name: 'Side Plank', sets: '3', reps: '60 seconds each side', notes: 'Max hold. Start with your weaker side.' },
                { name: 'Single-Arm Overhead Carry', sets: '3', reps: '60 yards each arm', notes: 'Same weight, longer distance. Start with your weaker side.' }
              ]
            }
          ]
        },
        {
          name: 'Week 8 — Final Test',
          days: [
            {
              name: 'Day A — Lower Body Single-Leg',
              focus: 'Final Test',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '15 each side' },
                { name: 'Mobility Warmup — Single-Leg Glute Bridge', sets: '2', reps: '15 each side' },
                { name: 'Mobility Warmup — Ankle Circles', sets: '2', reps: '20 each direction' },
                { name: 'Bulgarian Split Squat (Dumbbell)', sets: '3', reps: '12-15 each leg', notes: 'Final week. Same weight as Week 7. Both sides should feel nearly identical in strength and stability. Start with your weaker leg. Match reps. You have fixed the imbalance.' },
                { name: 'Single-Leg Press (Machine)', sets: '3', reps: '15 each leg', notes: 'Same weight. Perfect reps. Start with your weaker leg.' },
                { name: 'Single-Leg Romanian Deadlift (Dumbbell)', sets: '3', reps: '12-15 each leg', notes: 'Same weight. Final test of your balance and hamstring control. Start with your weaker leg.' },
                { name: 'Walking Lunge', sets: '3', reps: '15 each leg', notes: 'Finish strong.' },
                { name: 'Single-Leg Calf Raise', sets: '3', reps: '20 each leg', notes: 'Final calf burn. You are done. Take your deload week and restart the cycle with Kinetiq Strong at heavier weights.' }
              ]
            },
            {
              name: 'Day B — Upper Body Single-Arm + Core',
              focus: 'Final Test',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '30 reps' },
                { name: 'Mobility Warmup — Thoracic Rotation', sets: '2', reps: '15 each side' },
                { name: 'Single-Arm Dumbbell Press', sets: '3', reps: '12-15 each arm', notes: 'Same weight as Week 7. Both arms should feel balanced. Start with your weaker arm. Match reps. You have built symmetry.' },
                { name: 'Single-Arm Dumbbell Row', sets: '3', reps: '15 each arm', notes: 'Same weight. Start with your weaker arm.' },
                { name: 'Single-Arm Cable Chest Press', sets: '3', reps: '15 each arm', notes: 'Same weight. Start with your weaker arm.' },
                { name: 'Pallof Press (Anti-Rotation Core)', sets: '3', reps: '15 each side', notes: 'Your core is bulletproof now.' },
                { name: 'Single-Arm Farmer Carry', sets: '3', reps: '60 yards each arm', notes: 'Final carry. Well done. You have completed Kinetiq Balance.' }
              ]
            },
            {
              name: 'Day C — Lower Body Single-Leg (Hip Hinge Focus)',
              focus: 'Final Test',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '20 reps' },
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '10 each side' },
                { name: 'Mobility Warmup — Single-Leg Glute Bridge', sets: '2', reps: '15 each side' },
                { name: 'Single-Leg Romanian Deadlift (Barbell)', sets: '3', reps: '12-15 each leg', notes: 'Same weight as Week 7. Final test. Both legs should feel equal. Start with your weaker leg.' },
                { name: 'Single-Leg Hip Thrust', sets: '3', reps: '15 each leg', notes: 'Same weight. Final glute burn. Start with your weaker side.' },
                { name: 'Single-Leg Leg Curl', sets: '3', reps: '15 each leg', notes: 'Same weight. Start with your weaker leg.' },
                { name: 'Walking Lunge', sets: '3', reps: '15 each leg', notes: 'Final set of lunges.' },
                { name: 'Single-Leg Calf Raise', sets: '3', reps: '20 each leg', notes: 'You are done. Move on to Kinetiq Deload for one week of active recovery, then restart the cycle.' }
              ]
            },
            {
              name: 'Day D — Upper Body Single-Arm + Core (Optional 4th Day)',
              focus: 'Final Test',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '30 reps' },
                { name: 'Mobility Warmup — Scapular Shrugs (Hanging)', sets: '2', reps: '15 reps' },
                { name: 'Single-Arm Cable Row', sets: '3', reps: '15 each arm', notes: 'Same weight. Final test. Start with your weaker arm.' },
                { name: 'Single-Arm Lat Pulldown', sets: '3', reps: '15 each arm', notes: 'Same weight. Start with your weaker arm.' },
                { name: 'Single-Arm Dumbbell Bench Press', sets: '3', reps: '15 each arm', notes: 'Same weight. Start with your weaker arm.' },
                { name: 'Side Plank', sets: '3', reps: '60 seconds each side', notes: 'Final hold. Start with your weaker side.' },
                { name: 'Single-Arm Overhead Carry', sets: '3', reps: '60 yards each arm', notes: 'Final carry. Congratulations. You have completed Kinetiq Balance. Your body is now balanced, stable, and bulletproof. Take your deload week and restart the cycle.' }
              ]
            }
          ]
        }
      ]
    }
  ]
};
// =============================================
// KINETIQ DELOAD — 1-Week Active Recovery
// =============================================
var kinetiqDeloadData = {
  id: 'kinetiq-deload-builtin',
  name: 'Kinetiq Deload',
  source: 'builtin',
  description: "A 1-week active recovery program designed to be run after completing a 12-week training cycle. This is not rest — this is recovery. You move, but you move light. You lift, but you lift with zero ego. The goal is to flush fatigue from your system, restore movement quality, and prepare your body to attack the next cycle with heavier weights. Do not skip this week. Your body needs it. Recommended Progression: Strong → Hypertrophy → Balance → Deload (1 wk) → Repeat. Run this between training cycles.",
  difficulty: 'All Levels',
  duration: '1 week',
  phases: [
    {
      name: 'Week 1 — Active Recovery',
      objective: 'Flush fatigue, restore movement quality, and prepare for the next training cycle. This week is about moving well, not moving heavy. Drop all weights to 50-60% of your working maxes. Focus on form, tempo, and breathing. Sleep more. Eat well. You are recovering.',
      length: '1 week',
      sets: '2-3 sets',
      reps: '10-15 reps',
      rest: '60-90 seconds',
      frequency: '3-4 days (optional). You can do all 4 days or just pick 2-3. Listen to your body.',
      notes: 'Use 50-60% of your normal working weight. Move slowly and deliberately. This is not a workout — this is recovery. If something feels tight or sore, skip it or go lighter. The goal is to feel better at the end of the week than you did at the start.',
      weeks: [
        {
          name: 'Week 1 — Recovery',
          days: [
            {
              name: 'Day 1 — Lower Body Movement',
              focus: 'Squat and Hinge Patterns, Light Load',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Hip 90/90', sets: '2', reps: '12 each side', notes: 'Take your time. Breathe into the stretch.' },
                { name: 'Mobility Warmup — Cat-Cow', sets: '2', reps: '15 reps', notes: 'Slow and controlled. Feel your spine move.' },
                { name: 'Mobility Warmup — Glute Bridge', sets: '2', reps: '20 reps', notes: 'Bodyweight only. Squeeze at the top for 2 seconds.' },
                { name: 'Goblet Squat', sets: '3', reps: '15', notes: 'Light dumbbell or kettlebell. Focus on depth and control. No load — just movement quality. This is not a workout. This is recovery.' },
                { name: 'Romanian Deadlift (Dumbbell)', sets: '3', reps: '12', notes: 'Very light dumbbells. Feel the hamstring stretch. Do not chase weight. Chase the stretch and the movement.' },
                { name: 'Walking Lunge', sets: '2', reps: '10 each leg', notes: 'Bodyweight only. Step slowly. Feel your balance improve with each rep.' },
                { name: 'Seated Calf Raise', sets: '2', reps: '20', notes: 'Light weight. Full range of motion. Feel the calf stretch at the bottom.' }
              ]
            },
            {
              name: 'Day 2 — Upper Body Movement',
              focus: 'Push and Pull Patterns, Light Load',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — Band Pull-Apart', sets: '2', reps: '25 reps', notes: 'Light band. Feel your upper back wake up.' },
                { name: 'Mobility Warmup — Thoracic Extension over Foam Roller', sets: '2', reps: '15 reps', notes: 'Open up your upper back. Breathe deeply.' },
                { name: 'Mobility Warmup — Arm Circles', sets: '2', reps: '15 each direction', notes: 'Forward and backward. Loosen up your shoulders.' },
                { name: 'Dumbbell Bench Press', sets: '3', reps: '12', notes: 'Light dumbbells — maybe 40-50% of your normal working weight. Slow descent. Control the movement. This is not about strength. This is about form.' },
                { name: 'Dumbbell Row', sets: '3', reps: '12 each arm', notes: 'Light weight. Feel your back muscles work. No jerking. Smooth reps only.' },
                { name: 'Dumbbell Shoulder Press', sets: '2', reps: '15', notes: 'Very light dumbbells. Full range of motion. Feel your shoulders move through space.' },
                { name: 'Push-Up', sets: '2', reps: '15', notes: 'Bodyweight only. Slow and controlled. If regular push-ups are too easy, do them slower — 3 seconds down, 3 seconds up.' }
              ]
            },
            {
              name: 'Day 3 — Full Body Flow',
              focus: 'Movement Quality, Mobility, Core Stability',
              type: 'workout',
              exercises: [
                { name: 'Mobility Warmup — World\'s Greatest Stretch', sets: '2', reps: '8 each side', notes: 'Move slowly. Hold each position for 3-5 seconds. Feel your hips and thoracic spine open up.' },
                { name: 'Mobility Warmup — Hip 90/90 to Windmill', sets: '2', reps: '8 each side', notes: 'From 90/90 position, rotate your torso and reach your arm overhead. This is dynamic mobility work.' },
                { name: 'Bodyweight Squat', sets: '3', reps: '20', notes: 'No weight. Just move. Focus on depth and breathing. By rep 15, your legs should feel warm and loose.' },
                { name: 'Glute Bridge Hold', sets: '3', reps: '30-second hold', notes: 'Drive your hips up and hold. Squeeze your glutes. Breathe. This is isometric work — your glutes are working without moving.' },
                { name: 'Dead Bug', sets: '3', reps: '12 each side', notes: 'Lie on your back. Opposite arm and leg extend while keeping your lower back flat on the ground. This is core stability work.' },
                { name: 'Bird Dog', sets: '3', reps: '10 each side', notes: 'On all fours. Extend opposite arm and leg. Hold for 2 seconds. This teaches your core to stabilize under asymmetric load.' },
                { name: 'Plank Hold', sets: '2', reps: '45-60 seconds', notes: 'Forearms on the ground. Body in a straight line. Do not let your hips sag. Breathe.' }
              ]
            },
            {
              name: 'Day 4 — Optional Cardio and Stretch (Optional)',
              focus: 'Low-Intensity Movement, Full-Body Stretch',
              type: 'workout',
              exercises: [
                { name: 'Walk, Bike, or Swim', sets: '1', reps: '20-30 minutes', notes: 'Low intensity. You should be able to hold a conversation. This is not conditioning. This is active recovery. Move blood through your muscles and flush out metabolic waste.' },
                { name: 'Foam Roll — Quads', sets: '1', reps: '2 minutes', notes: 'Slow passes. Stop on tight spots and breathe into them.' },
                { name: 'Foam Roll — Hamstrings', sets: '1', reps: '2 minutes', notes: 'Same as quads. Find the tight spots and stay there.' },
                { name: 'Foam Roll — Upper Back', sets: '1', reps: '2 minutes', notes: 'Roll between your shoulder blades. Feels amazing after weeks of heavy pressing and rowing.' },
                { name: 'Static Stretch — Hip Flexor', sets: '1', reps: '90 seconds each side', notes: 'Kneel in a lunge position. Push your hips forward. Feel the stretch in the front of your hip. Breathe deeply.' },
                { name: 'Static Stretch — Hamstring', sets: '1', reps: '90 seconds each side', notes: 'Lie on your back. Pull one leg toward your chest with a band or towel. Keep your knee straight. Feel the stretch in your hamstring.' },
                { name: 'Static Stretch — Chest', sets: '1', reps: '90 seconds', notes: 'Stand in a doorway. Place your forearm on the doorframe. Lean forward. Feel your chest open up after weeks of pressing.' },
                { name: 'Static Stretch — Lats', sets: '1', reps: '90 seconds each side', notes: 'Grab something overhead (pull-up bar, doorframe). Let your body hang and shift your weight to one side. Feel your lat stretch.' }
              ]
            }
          ]
        }
      ]
    }
  ]
};
// =============================================
// KINETIQ MOBILITY — 8-Week Movement Quality Program
// =============================================
var kinetiqMobilityData = {
  id: 'kinetiq-mobility-builtin',
  name: 'Kinetiq Mobility',
  source: 'builtin',
  description: "An 8-week program designed to improve movement quality, restore range of motion, and fix the compensation patterns that years of sitting and lifting have created. This is not stretching — this is movement training. You will work on joint mobility, tissue quality, breathing mechanics, and positional strength. This program can be run standalone during an off-season, alongside your lifting as supplemental work, or as rehab after an injury. 20-40 minutes per session, 3-5 days per week. Standalone program — run anytime.",
  difficulty: 'All Levels',
  duration: '8 weeks',
  phases: [

    // ===================== PHASE 1: ASSESSMENT & FOUNDATION =====================
    {
      name: 'Phase 1 — Assessment & Foundation (Weeks 1-2)',
      objective: 'Identify restrictions and build foundational movement patterns. You will test your mobility in key areas (hips, thoracic spine, shoulders, ankles) and begin correcting the biggest limitations. Most people are tight in predictable places — hip flexors from sitting, thoracic spine from desk work, shoulders from pressing. We fix those first.',
      length: '2 weeks',
      sets: '2-3 sets',
      reps: '10-15 reps or 30-60 second holds',
      rest: 'As needed (this is not conditioning)',
      frequency: '3-5 days per week. Can be done as standalone sessions or added before/after lifting.',
      notes: 'Move slowly. Breathe deeply. If something feels restricted, spend more time there. If something feels easy, go deeper into the range. This is self-assessment — you are learning where your body needs work.',
      weeks: [
        {
          name: 'Week 1 — Find Your Restrictions',
          days: [
            {
              name: 'Day 1 — Hip Mobility Focus',
              focus: 'Hip Flexors, Internal/External Rotation, Adductors',
              type: 'workout',
              exercises: [
                { name: 'Hip 90/90 (Assessment)', sets: '2', reps: '60 seconds each side', notes: 'Sit on the ground. Front leg at 90 degrees, back leg at 90 degrees. Sit tall. Do not lean. If you cannot sit upright, your hips are restricted. Note which side feels tighter.' },
                { name: 'Hip Flexor Stretch (Kneeling)', sets: '3', reps: '90 seconds each side', notes: 'Kneel in a lunge position. Push your hips forward. Squeeze your glute on the kneeling side. You should feel a stretch in the front of your hip. Breathe into it. If you sit a lot, this will be tight.' },
                { name: 'Frog Stretch', sets: '3', reps: '90 seconds', notes: 'On your hands and knees. Spread your knees as wide as possible. Lower your hips back and down. Feel the stretch in your inner thighs (adductors). Rock gently side to side.' },
                { name: 'Hip Airplanes', sets: '2', reps: '10 each side', notes: 'Stand on one leg. Hinge forward at the hip. Rotate your free leg open (external rotation) and closed (internal rotation). This tests hip mobility in all planes. Go slow. Most people are restricted in internal rotation.' },
                { name: 'Pigeon Pose', sets: '2', reps: '90 seconds each side', notes: 'Front leg bent at 90 degrees, back leg extended straight behind you. Sit upright. Feel the stretch in your hip and glute. If this is impossible, your hips are very tight. Use blocks or cushions to elevate your hips.' }
              ]
            },
            {
              name: 'Day 2 — Thoracic Spine Mobility Focus',
              focus: 'Extension, Rotation, Lat Stretch',
              type: 'workout',
              exercises: [
                { name: 'Cat-Cow', sets: '3', reps: '15 reps', notes: 'On your hands and knees. Arch your back (cow), then round your back (cat). Move slowly. Feel each vertebra move. Most people have limited thoracic extension from sitting hunched over.' },
                { name: 'Thoracic Extension over Foam Roller', sets: '3', reps: '10 reps', notes: 'Foam roller positioned across your mid-back. Hands behind your head. Extend backward over the roller. This opens up your thoracic spine. If you press a lot, your upper back is probably stiff.' },
                { name: 'Quadruped Thoracic Rotation', sets: '3', reps: '12 each side', notes: 'On all fours. One hand behind your head. Rotate your elbow down toward the opposite elbow, then rotate up toward the ceiling. This is pure thoracic rotation. Go slow. Feel your upper back twist.' },
                { name: 'Wall Angel', sets: '3', reps: '10 reps', notes: 'Stand with your back against a wall. Arms in a W position. Slide your arms up the wall into a Y. Keep your lower back, head, and arms against the wall the entire time. This is harder than it sounds. Most people cannot keep contact with the wall.' },
                { name: 'Lat Hang Stretch', sets: '2', reps: '60 seconds each side', notes: 'Hang from a pull-up bar. Shift your weight to one side. Feel your lat stretch. Your lats get tight from rowing and pulling. This stretch opens them up.' }
              ]
            },
            {
              name: 'Day 3 — Ankle and Shoulder Mobility Focus',
              focus: 'Dorsiflexion, Shoulder Flexion/External Rotation',
              type: 'workout',
              exercises: [
                { name: 'Ankle Dorsiflexion Wall Test', sets: '2', reps: '10 each side', notes: 'Face a wall. Place your toes a few inches from the wall. Drive your knee forward to touch the wall without lifting your heel. If your heel lifts, you have restricted ankle dorsiflexion. Most people do.' },
                { name: 'Calf Stretch (Wall)', sets: '3', reps: '90 seconds each side', notes: 'Hands on a wall. One leg back, heel on the ground. Lean forward. Feel the stretch in your calf. Tight calves limit ankle mobility, which affects your squat depth.' },
                { name: 'Ankle Rocks', sets: '2', reps: '15 each side', notes: 'In a half-kneeling position. Rock your front knee forward over your toes. This actively loads ankle dorsiflexion. Go as far as you can without your heel lifting.' },
                { name: 'Shoulder Flexion Hang', sets: '2', reps: '60 seconds', notes: 'Hang from a pull-up bar with straight arms. Let your shoulders stretch overhead. Most people cannot hang with full shoulder flexion without arching their lower back.' },
                { name: 'Sleeper Stretch', sets: '3', reps: '60 seconds each side', notes: 'Lie on your side. Bottom arm at 90 degrees. Use your top hand to gently press your bottom hand toward the ground. This stretches shoulder internal rotation. If you throw or press a lot, this will be tight.' }
              ]
            },
            {
              name: 'Day 4 — Full Body Flow (Optional)',
              focus: 'Movement Integration',
              type: 'workout',
              exercises: [
                { name: 'World\'s Greatest Stretch', sets: '3', reps: '5 each side', notes: 'From pushup position, step one foot outside your hand. Drop your back knee. Rotate your top arm toward the ceiling. Hold for 5 seconds. This hits hips, thoracic spine, and shoulders in one movement.' },
                { name: 'Inchworm to Push-Up', sets: '3', reps: '8 reps', notes: 'Stand tall. Hinge forward and walk your hands out to a pushup position. Do a pushup. Walk your hands back to your feet. Stand up. This is dynamic mobility and strength.' },
                { name: 'Cossack Squat', sets: '3', reps: '8 each side', notes: 'Wide stance. Shift your weight to one leg and squat down. The other leg stays straight. This is lateral hip mobility and strength. Most people cannot do this with good form.' },
                { name: 'Scorpion Stretch', sets: '2', reps: '10 each side', notes: 'Lie face down. Extend one arm out to the side. Rotate your opposite leg over your body, trying to touch your foot to the ground. This is thoracic and hip rotation combined.' }
              ]
            }
          ]
        },
        {
          name: 'Week 2 — Build Capacity',
          days: [
            {
              name: 'Day 1 — Hip Mobility Focus',
              focus: 'Hip Flexors, Internal/External Rotation, Adductors',
              type: 'workout',
              exercises: [
                { name: 'Hip 90/90', sets: '2', reps: '90 seconds each side', notes: 'Same as Week 1. Sit taller. Go deeper. Your hips should feel more open than last week.' },
                { name: 'Hip Flexor Stretch (Kneeling)', sets: '3', reps: '2 minutes each side', notes: 'Longer holds. Push your hips further forward.' },
                { name: 'Frog Stretch', sets: '3', reps: '2 minutes', notes: 'Longer holds. Knees should be wider than Week 1.' },
                { name: 'Hip Airplanes', sets: '3', reps: '12 each side', notes: 'Slower tempo. Control the rotation.' },
                { name: 'Pigeon Pose', sets: '2', reps: '2 minutes each side', notes: 'Longer holds. Sit more upright than Week 1.' }
              ]
            },
            {
              name: 'Day 2 — Thoracic Spine Mobility Focus',
              focus: 'Extension, Rotation, Lat Stretch',
              type: 'workout',
              exercises: [
                { name: 'Cat-Cow', sets: '3', reps: '20 reps', notes: 'More reps. Move through larger range.' },
                { name: 'Thoracic Extension over Foam Roller', sets: '3', reps: '15 reps', notes: 'More reps. Go deeper into extension.' },
                { name: 'Quadruped Thoracic Rotation', sets: '3', reps: '15 each side', notes: 'More reps. Rotate further.' },
                { name: 'Wall Angel', sets: '3', reps: '15 reps', notes: 'More reps. Maintain wall contact throughout.' },
                { name: 'Lat Hang Stretch', sets: '2', reps: '90 seconds each side', notes: 'Longer holds.' }
              ]
            },
            {
              name: 'Day 3 — Ankle and Shoulder Mobility Focus',
              focus: 'Dorsiflexion, Shoulder Flexion/External Rotation',
              type: 'workout',
              exercises: [
                { name: 'Ankle Dorsiflexion Wall Test', sets: '2', reps: '15 each side', notes: 'More reps. Move further from the wall.' },
                { name: 'Calf Stretch (Wall)', sets: '3', reps: '2 minutes each side', notes: 'Longer holds.' },
                { name: 'Ankle Rocks', sets: '3', reps: '20 each side', notes: 'More reps. Rock further forward.' },
                { name: 'Shoulder Flexion Hang', sets: '2', reps: '90 seconds', notes: 'Longer holds. Relax into the stretch.' },
                { name: 'Sleeper Stretch', sets: '3', reps: '90 seconds each side', notes: 'Longer holds. Press gently deeper.' }
              ]
            },
            {
              name: 'Day 4 — Full Body Flow (Optional)',
              focus: 'Movement Integration',
              type: 'workout',
              exercises: [
                { name: 'World\'s Greatest Stretch', sets: '3', reps: '8 each side', notes: 'More reps. Hold each position longer.' },
                { name: 'Inchworm to Push-Up', sets: '3', reps: '10 reps', notes: 'More reps.' },
                { name: 'Cossack Squat', sets: '3', reps: '10 each side', notes: 'More reps. Squat deeper.' },
                { name: 'Scorpion Stretch', sets: '2', reps: '12 each side', notes: 'More reps. Rotate further.' }
              ]
            }
          ]
        }
      ]
    },

    // ===================== PHASE 2: ACTIVE RANGE BUILDING =====================
    {
      name: 'Phase 2 — Active Range Building (Weeks 3-4)',
      objective: 'Build strength in new ranges of motion. Passive stretching creates temporary mobility. Active control creates permanent mobility. You will load end-ranges with bodyweight exercises, building the strength to own those positions.',
      length: '2 weeks',
      sets: '3 sets',
      reps: '10-12 reps or 45-60 second holds',
      rest: '60 seconds',
      frequency: '3-5 days per week',
      notes: 'You should be stronger in the ranges you have been opening up. If a position felt impossible in Week 1, it should feel challenging but doable now.',
      weeks: [
        {
          name: 'Week 3 — Load End-Ranges',
          days: [
            {
              name: 'Day 1 — Hip Strength in New Ranges',
              focus: 'Loaded Hip Mobility',
              type: 'workout',
              exercises: [
                { name: 'Copenhagen Plank', sets: '3', reps: '30 seconds each side', notes: 'Side plank with your top leg on a bench. This builds adductor strength in a lengthened position. Your inner thigh will burn.' },
                { name: 'Cossack Squat (Bodyweight)', sets: '3', reps: '10 each side', notes: 'You have been stretching your adductors. Now you load them. Shift to one leg and squat deep. The other leg stays straight.' },
                { name: '90/90 Hip Lift', sets: '3', reps: '10 each side', notes: 'In 90/90 position. Lift your back knee off the ground by rotating your hip. This builds active internal rotation.' },
                { name: 'Single-Leg Glute Bridge', sets: '3', reps: '12 each side', notes: 'One foot on the ground, other leg extended. Drive your hips up. This builds glute strength while your hip is in flexion.' },
                { name: 'Deep Squat Hold', sets: '3', reps: '60 seconds', notes: 'Bodyweight squat. Sit in the bottom position. Elbows inside your knees. This is active mobility — you are loading the deepest squat position.' }
              ]
            },
            {
              name: 'Day 2 — Thoracic Spine Loaded Rotation',
              focus: 'Rotational Strength',
              type: 'workout',
              exercises: [
                { name: 'Quadruped Thoracic Rotation with Reach', sets: '3', reps: '12 each side', notes: 'Same as before, but now hold a light dumbbell in your rotating hand. This loads the rotation.' },
                { name: 'Half-Kneeling Windmill', sets: '3', reps: '10 each side', notes: 'Half-kneeling. One arm overhead. Rotate and reach down to the ground with your free hand. This builds strength in thoracic rotation and shoulder stability.' },
                { name: 'Deadbug with Reach', sets: '3', reps: '12 each side', notes: 'Lie on your back. Extend opposite arm and leg while keeping your lower back flat. This is anti-extension core work with rotation.' },
                { name: 'Thread the Needle', sets: '3', reps: '12 each side', notes: 'On all fours. Reach one arm under your body and across to the opposite side. Feel your thoracic spine rotate. This is active rotation under load.' }
              ]
            },
            {
              name: 'Day 3 — Ankle and Shoulder Loaded Positions',
              focus: 'Positional Strength',
              type: 'workout',
              exercises: [
                { name: 'Heel-Elevated Goblet Squat', sets: '3', reps: '12', notes: 'Small plates under your heels. This forces your ankles into deeper dorsiflexion. You are loading the range you have been building.' },
                { name: 'Single-Leg Calf Raise (Slow Eccentric)', sets: '3', reps: '10 each leg', notes: '3 seconds up, 5 seconds down. This builds strength through the full ankle range.' },
                { name: 'Overhead Squat (PVC or Broomstick)', sets: '3', reps: '10', notes: 'Hold a PVC pipe or broomstick overhead with straight arms. Squat. This demands shoulder flexion, thoracic extension, and ankle dorsiflexion all at once. Most people cannot do this with good form.' },
                { name: 'Prone Y-Raise', sets: '3', reps: '15', notes: 'Lie face down. Arms in a Y position. Lift your arms off the ground. This builds strength in shoulder flexion and scapular upward rotation.' }
              ]
            },
            {
              name: 'Day 4 — Full Body Loaded Flow (Optional)',
              focus: 'Movement Integration',
              type: 'workout',
              exercises: [
                { name: 'Turkish Get-Up (Light)', sets: '3', reps: '3 each side', notes: 'With a light dumbbell or kettlebell. This is the king of loaded mobility. You move through every plane of motion while stabilizing a weight overhead.' },
                { name: 'Bear Crawl', sets: '3', reps: '30 seconds', notes: 'On your hands and feet. Knees off the ground. Crawl forward. This builds full-body stability and coordination.' },
                { name: 'Loaded Beast Hold', sets: '3', reps: '45 seconds', notes: 'On your hands and feet. Knees hovering an inch off the ground. Hold. This is isometric full-body tension.' }
              ]
            }
          ]
        },
        {
          name: 'Week 4 — Increase Load and Duration',
          days: [
            {
              name: 'Day 1 — Hip Strength in New Ranges',
              focus: 'Loaded Hip Mobility',
              type: 'workout',
              exercises: [
                { name: 'Copenhagen Plank', sets: '3', reps: '45 seconds each side', notes: 'Longer holds.' },
                { name: 'Cossack Squat (Light Goblet)', sets: '3', reps: '10 each side', notes: 'Add light weight.' },
                { name: '90/90 Hip Lift', sets: '3', reps: '12 each side' },
                { name: 'Single-Leg Glute Bridge', sets: '3', reps: '15 each side' },
                { name: 'Deep Squat Hold', sets: '3', reps: '90 seconds', notes: 'Longer holds. Sit deeper.' }
              ]
            },
            {
              name: 'Day 2 — Thoracic Spine Loaded Rotation',
              focus: 'Rotational Strength',
              type: 'workout',
              exercises: [
                { name: 'Quadruped Thoracic Rotation with Reach', sets: '3', reps: '15 each side', notes: 'Heavier dumbbell.' },
                { name: 'Half-Kneeling Windmill', sets: '3', reps: '12 each side' },
                { name: 'Deadbug with Reach', sets: '3', reps: '15 each side' },
                { name: 'Thread the Needle', sets: '3', reps: '15 each side' }
              ]
            },
            {
              name: 'Day 3 — Ankle and Shoulder Loaded Positions',
              focus: 'Positional Strength',
              type: 'workout',
              exercises: [
                { name: 'Heel-Elevated Goblet Squat', sets: '3', reps: '15', notes: 'Heavier weight.' },
                { name: 'Single-Leg Calf Raise (Slow Eccentric)', sets: '3', reps: '12 each leg' },
                { name: 'Overhead Squat (PVC or Broomstick)', sets: '3', reps: '12' },
                { name: 'Prone Y-Raise', sets: '3', reps: '20' }
              ]
            },
            {
              name: 'Day 4 — Full Body Loaded Flow (Optional)',
              focus: 'Movement Integration',
              type: 'workout',
              exercises: [
                { name: 'Turkish Get-Up (Moderate)', sets: '3', reps: '3 each side', notes: 'Heavier weight.' },
                { name: 'Bear Crawl', sets: '3', reps: '45 seconds' },
                { name: 'Loaded Beast Hold', sets: '3', reps: '60 seconds' }
              ]
            }
          ]
        }
      ]
    },

    // ===================== PHASE 3: CONSOLIDATION =====================
    {
      name: 'Phase 3 — Consolidation (Weeks 5-6)',
      objective: 'Cement your new ranges. By now you have built significant mobility and strength. This phase is about making those gains permanent through repetition and progressive challenge.',
      length: '2 weeks',
      sets: '3-4 sets',
      reps: '12-15 reps or 60 second holds',
      rest: '60 seconds',
      frequency: '4-5 days per week',
      notes: 'Same exercises, more volume. Your body adapts to what you do consistently. Consistency makes mobility permanent.',
      weeks: [
        {
          name: 'Week 5 — Increase Volume',
          days: [
            {
              name: 'Day 1 — Hip Consolidation',
              focus: 'Maintain Hip Mobility Gains',
              type: 'workout',
              exercises: [
                { name: 'Copenhagen Plank', sets: '4', reps: '45 seconds each side' },
                { name: 'Cossack Squat (Goblet)', sets: '4', reps: '12 each side' },
                { name: '90/90 Hip Lift', sets: '4', reps: '15 each side' },
                { name: 'Single-Leg Glute Bridge', sets: '4', reps: '15 each side' },
                { name: 'Deep Squat Hold', sets: '3', reps: '90 seconds' }
              ]
            },
            {
              name: 'Day 2 — Thoracic Spine Consolidation',
              focus: 'Maintain Rotation Gains',
              type: 'workout',
              exercises: [
                { name: 'Quadruped Thoracic Rotation with Reach', sets: '4', reps: '15 each side' },
                { name: 'Half-Kneeling Windmill', sets: '4', reps: '12 each side' },
                { name: 'Deadbug with Reach', sets: '4', reps: '15 each side' },
                { name: 'Thread the Needle', sets: '4', reps: '15 each side' }
              ]
            },
            {
              name: 'Day 3 — Ankle and Shoulder Consolidation',
              focus: 'Maintain Position Gains',
              type: 'workout',
              exercises: [
                { name: 'Heel-Elevated Goblet Squat', sets: '4', reps: '15' },
                { name: 'Single-Leg Calf Raise', sets: '4', reps: '12 each leg' },
                { name: 'Overhead Squat', sets: '4', reps: '12' },
                { name: 'Prone Y-Raise', sets: '4', reps: '20' }
              ]
            }
          ]
        },
        {
          name: 'Week 6 — Peak Volume',
          days: [
            {
              name: 'Day 1 — Hip Consolidation',
              focus: 'Peak Hip Volume',
              type: 'workout',
              exercises: [
                { name: 'Copenhagen Plank', sets: '4', reps: '60 seconds each side' },
                { name: 'Cossack Squat (Goblet)', sets: '4', reps: '15 each side' },
                { name: '90/90 Hip Lift', sets: '4', reps: '15 each side' },
                { name: 'Single-Leg Glute Bridge', sets: '4', reps: '20 each side' },
                { name: 'Deep Squat Hold', sets: '3', reps: '2 minutes' }
              ]
            },
            {
              name: 'Day 2 — Thoracic Spine Consolidation',
              focus: 'Peak Rotation Volume',
              type: 'workout',
              exercises: [
                { name: 'Quadruped Thoracic Rotation with Reach', sets: '4', reps: '20 each side' },
                { name: 'Half-Kneeling Windmill', sets: '4', reps: '15 each side' },
                { name: 'Deadbug with Reach', sets: '4', reps: '20 each side' },
                { name: 'Thread the Needle', sets: '4', reps: '20 each side' }
              ]
            },
            {
              name: 'Day 3 — Ankle and Shoulder Consolidation',
              focus: 'Peak Position Volume',
              type: 'workout',
              exercises: [
                { name: 'Heel-Elevated Goblet Squat', sets: '4', reps: '20' },
                { name: 'Single-Leg Calf Raise', sets: '4', reps: '15 each leg' },
                { name: 'Overhead Squat', sets: '4', reps: '15' },
                { name: 'Prone Y-Raise', sets: '4', reps: '25' }
              ]
            }
          ]
        }
      ]
    },

    // ===================== PHASE 4: INTEGRATION & TESTING =====================
    {
      name: 'Phase 4 — Integration & Testing (Weeks 7-8)',
      objective: 'Integrate your new mobility into complex movement patterns. Test your progress. By the end of Week 8, you should move significantly better than you did in Week 1. This is not the end — this is maintenance. Mobility must be practiced forever.',
      length: '2 weeks',
      sets: '3 sets',
      reps: '10-12 reps or full test',
      rest: '90 seconds',
      frequency: '3-4 days per week',
      notes: 'Final two weeks. You will retest the movements from Week 1 and see how far you have come. Then you will integrate mobility into complex flows.',
      weeks: [
        {
          name: 'Week 7 — Integration',
          days: [
            {
              name: 'Day 1 — Full Body Flow',
              focus: 'Complex Movement Patterns',
              type: 'workout',
              exercises: [
                { name: 'Flow: Inchworm → Push-Up → Down Dog → Pigeon → World\'s Greatest Stretch', sets: '3', reps: '5 reps per side', notes: 'String movements together. Move slowly. This is yoga for lifters.' },
                { name: 'Turkish Get-Up', sets: '3', reps: '3 each side', notes: 'Heavier than Week 4. Slow and controlled.' },
                { name: 'Overhead Squat', sets: '3', reps: '10', notes: 'Test your full-body mobility. By now this should feel significantly better than Week 1.' },
                { name: 'Bear Crawl to Crab Reach', sets: '3', reps: '30 seconds', notes: 'Crawl forward in bear position. Flip to crab position. Reach one hand to the sky. This is full-body rotation and stability.' }
              ]
            },
            {
              name: 'Day 2 — Retest Mobility',
              focus: 'Measure Progress',
              type: 'workout',
              exercises: [
                { name: 'Hip 90/90 (Retest)', sets: '1', reps: '2 minutes each side', notes: 'Compare to Week 1. You should sit taller and feel less restriction.' },
                { name: 'Ankle Dorsiflexion Wall Test (Retest)', sets: '1', reps: 'Max distance each side', notes: 'Measure how far your toes can be from the wall. You should be further than Week 1.' },
                { name: 'Shoulder Flexion Test (Retest)', sets: '1', reps: '2 minutes', notes: 'Hang from a bar. Arms should be straighter overhead than Week 1.' },
                { name: 'Deep Squat Hold (Retest)', sets: '1', reps: '3 minutes', notes: 'Bodyweight squat. Bottom position. Compare to Week 1. You should be deeper and more comfortable.' }
              ]
            },
            {
              name: 'Day 3 — Active Flow',
              focus: 'Movement Quality Under Fatigue',
              type: 'workout',
              exercises: [
                { name: 'Flow: Cossack Squat → Lunge → Twist → Reach', sets: '3', reps: '8 each side', notes: 'Combine lateral, sagittal, and rotational movement.' },
                { name: 'Windmill', sets: '3', reps: '10 each side', notes: 'Light kettlebell or dumbbell. This is hip hinge, thoracic rotation, and shoulder stability in one movement.' },
                { name: 'Scorpion to Thread the Needle', sets: '3', reps: '10 each side', notes: 'String together two rotational movements.' }
              ]
            }
          ]
        },
        {
          name: 'Week 8 — Final Test and Maintenance Protocol',
          days: [
            {
              name: 'Day 1 — Final Mobility Test',
              focus: 'Measure Total Progress',
              type: 'workout',
              exercises: [
                { name: 'Hip 90/90 (Final Test)', sets: '1', reps: '3 minutes each side', notes: 'Final test. Note the difference from Week 1. Take a photo or video if you want to document progress.' },
                { name: 'Overhead Squat (Final Test)', sets: '1', reps: '15 reps', notes: 'Full range. Arms overhead. Compare to Week 1. You should own this position now.' },
                { name: 'Ankle Dorsiflexion (Final Test)', sets: '1', reps: 'Max distance each side', notes: 'Final measurement. You should have gained 2-4 inches from Week 1.' },
                { name: 'Shoulder Flexion Hang (Final Test)', sets: '1', reps: '3 minutes', notes: 'Final hang. Arms should be straighter and more comfortable overhead.' }
              ]
            },
            {
              name: 'Day 2 — Maintenance Flow',
              focus: 'Your New Normal',
              type: 'workout',
              exercises: [
                { name: 'World\'s Greatest Stretch', sets: '2', reps: '5 each side', notes: 'This is now part of your warmup forever.' },
                { name: 'Hip 90/90', sets: '2', reps: '90 seconds each side', notes: 'Keep your hips open. Do this 2-3 times per week from now on.' },
                { name: 'Thoracic Rotation', sets: '2', reps: '15 each side', notes: 'Keep your upper back mobile. Do this before every upper body session.' },
                { name: 'Ankle Rocks', sets: '2', reps: '15 each side', notes: 'Keep your ankles mobile. Do this before every lower body session.' },
                { name: 'Deep Squat Hold', sets: '2', reps: '2 minutes', notes: 'Sit in this position daily. Read on your phone. Watch TV. Just sit here. This is maintenance.' }
              ]
            },
            {
              name: 'Day 3 — Celebrate',
              focus: 'You Are Done',
              type: 'workout',
              exercises: [
                { name: 'Full Body Flow of Your Choice', sets: '1', reps: '10 minutes', notes: 'Move however you want. You have completed Kinetiq Mobility. Your movement quality is better. Your joints feel better. You move better. Now maintain it. Mobility is not a destination — it is a practice. Do the maintenance flow 2-3 times per week forever. Your body will thank you.' }
              ]
            }
          ]
        }
      ]
    }
  ]
};
// =============================================
// KINETIQ HIIT — 6-Week Metabolic Conditioning Program
// =============================================
var kinetiqHIITData = {
  id: 'kinetiq-hiit-builtin',
  name: 'Kinetiq HIIT',
  source: 'builtin',
  description: "A 6-week high-intensity interval training program built around compound movements, not cardio machines. This is not burpees and box jumps — this is kettlebell swings, thrusters, and loaded carries performed in intervals. The goal is simple: improve your work capacity, burn fat, and build conditioning without losing muscle. Each session is 20-30 minutes. You can run this standalone during a cut, or add 1-2 sessions per week alongside your lifting program. Low stamina friendly — you start where you are and build from there. 3-4 days per week. Standalone program — run anytime.",
  difficulty: 'All Levels',
  duration: '6 weeks (2 phases)',
  phases: [

    // ===================== PHASE 1: BUILD THE ENGINE =====================
    {
      name: 'Phase 1 — Build the Engine (Weeks 1-3)',
      objective: 'Build your aerobic base and learn the movement patterns. HIIT does not mean go all-out from day one. That is how you burn out in Week 2. Phase 1 is about building capacity. You will work in intervals, but the rest periods are generous. Your heart rate will spike, then recover. Over three weeks, your recovery gets faster.',
      length: '3 weeks',
      sets: '4-6 rounds',
      reps: '30 seconds work / 60 seconds rest',
      rest: '60 seconds between exercises, 2 minutes between rounds',
      frequency: '3-4 days per week. If running alongside lifting, do HIIT on non-lifting days or after lifting (not before).',
      notes: 'Start conservative. Use lighter weights than you think you need. The goal is to complete all rounds with good form. If you are gasping for air and your form breaks down, you went too hard. Scale back. HIIT is about sustainable intensity, not collapsing after one round.',
      weeks: [
        {
          name: 'Week 1 — Learn the Movements',
          days: [
            {
              name: 'Day 1 — Kettlebell & Bodyweight',
              focus: 'Hip Hinge, Squat, Push',
              type: 'workout',
              exercises: [
                { name: 'Warmup — Jump Rope or Jog', sets: '1', reps: '3 minutes', notes: 'Easy pace. Get your heart rate up slowly. If you do not have a jump rope, jog in place or do jumping jacks.' },
                { name: 'Warmup — Hip Hinge (Unloaded)', sets: '1', reps: '10 reps', notes: 'Practice the hinge pattern before you load it. Hands on your hips. Push your butt back. Feel your hamstrings stretch.' },
                { name: 'Interval 1 — Kettlebell Swing', sets: '5 rounds', reps: '30 sec work / 60 sec rest', notes: 'Moderate weight kettlebell. Hip hinge, explosive hip extension. The kettlebell floats to chest height. This is a hip movement, not an arm movement. If you do not have a kettlebell, use a dumbbell held with both hands.' },
                { name: 'Interval 2 — Goblet Squat', sets: '5 rounds', reps: '30 sec work / 60 sec rest', notes: 'Light kettlebell or dumbbell at your chest. Squat deep. Stand up. Move continuously for 30 seconds. Your legs will burn.' },
                { name: 'Interval 3 — Push-Up', sets: '5 rounds', reps: '30 sec work / 60 sec rest', notes: 'As many reps as possible in 30 seconds. If you cannot do push-ups from your toes, do them from your knees. No shame. Just move.' },
                { name: 'Cooldown — Walk', sets: '1', reps: '5 minutes', notes: 'Slow walk. Let your heart rate come down. Breathe deeply.' }
              ]
            },
            {
              name: 'Day 2 — Dumbbell Complex',
              focus: 'Full Body Movement Flow',
              type: 'workout',
              exercises: [
                { name: 'Warmup — Jump Rope or Jog', sets: '1', reps: '3 minutes', notes: 'Easy pace.' },
                { name: 'Warmup — Arm Circles', sets: '1', reps: '15 each direction', notes: 'Loosen up your shoulders before pressing.' },
                { name: 'Complex — Dumbbell Deadlift → Row → Clean → Press → Squat', sets: '4 rounds', reps: '30 sec work / 90 sec rest', notes: 'Light dumbbells. Perform the movements in sequence without putting the dumbbells down: deadlift, row (both arms), clean to shoulders, press overhead, squat. Repeat for 30 seconds. This is a full-body burner. Your grip will fail before your legs do. That is normal.' },
                { name: 'Finisher — Plank Hold', sets: '3 rounds', reps: '30 sec hold / 30 sec rest', notes: 'Forearms on the ground. Body in a straight line. Hold. Your core is cooked from the complex. This finishes it off.' },
                { name: 'Cooldown — Walk', sets: '1', reps: '5 minutes' }
              ]
            },
            {
              name: 'Day 3 — Bodyweight Circuits',
              focus: 'No Equipment Needed',
              type: 'workout',
              exercises: [
                { name: 'Warmup — Jumping Jacks', sets: '1', reps: '2 minutes', notes: 'Get warm.' },
                { name: 'Warmup — Bodyweight Squat', sets: '1', reps: '15 reps', notes: 'Prime your legs.' },
                { name: 'Circuit — 30 sec each: Squat → Push-Up → Lunge → Mountain Climber → Rest 60 sec', sets: '5 rounds', reps: '30 sec each movement', notes: 'Move from one exercise to the next with no rest between movements. After all four movements, rest 60 seconds. Then repeat. Five total rounds. By round 3, you will be breathing hard. That is the point.' },
                { name: 'Finisher — Burpees', sets: '3 rounds', reps: '30 sec work / 60 sec rest', notes: 'Love them or hate them, burpees work. Squat down, hands on the ground, jump your feet back, push-up (optional), jump your feet in, stand up. Repeat for 30 seconds. If this is too much, step your feet back instead of jumping.' },
                { name: 'Cooldown — Walk', sets: '1', reps: '5 minutes' }
              ]
            },
            {
              name: 'Day 4 — Loaded Carries & Intervals (Optional 4th Day)',
              focus: 'Grip, Core, Conditioning',
              type: 'workout',
              exercises: [
                { name: 'Warmup — Jump Rope or Jog', sets: '1', reps: '3 minutes' },
                { name: 'Interval 1 — Farmer Carry', sets: '5 rounds', reps: '30 sec work / 60 sec rest', notes: 'Heavy dumbbells or kettlebells in each hand. Walk. Do not let your body lean. Your grip will fail. When it does, put the weights down, shake out your hands, pick them back up. Keep moving for 30 seconds.' },
                { name: 'Interval 2 — Kettlebell Swing', sets: '5 rounds', reps: '30 sec work / 60 sec rest', notes: 'Same as Day 1. Hip hinge, explosive extension.' },
                { name: 'Interval 3 — Goblet Squat', sets: '5 rounds', reps: '30 sec work / 60 sec rest', notes: 'Same as Day 1. Squat deep, stand up.' },
                { name: 'Cooldown — Walk', sets: '1', reps: '5 minutes' }
              ]
            }
          ]
        },
        {
          name: 'Week 2 — Increase Density',
          days: [
            {
              name: 'Day 1 — Kettlebell & Bodyweight',
              focus: 'Hip Hinge, Squat, Push',
              type: 'workout',
              exercises: [
                { name: 'Warmup — Jump Rope or Jog', sets: '1', reps: '3 minutes' },
                { name: 'Warmup — Hip Hinge (Unloaded)', sets: '1', reps: '10 reps' },
                { name: 'Interval 1 — Kettlebell Swing', sets: '6 rounds', reps: '30 sec work / 60 sec rest', notes: 'Same weight as Week 1, but now 6 rounds instead of 5. This is progressive overload for conditioning — more volume.' },
                { name: 'Interval 2 — Goblet Squat', sets: '6 rounds', reps: '30 sec work / 60 sec rest', notes: 'Same weight, more rounds.' },
                { name: 'Interval 3 — Push-Up', sets: '6 rounds', reps: '30 sec work / 60 sec rest', notes: 'More rounds. Your chest and triceps will be burning by round 5.' },
                { name: 'Cooldown — Walk', sets: '1', reps: '5 minutes' }
              ]
            },
            {
              name: 'Day 2 — Dumbbell Complex',
              focus: 'Full Body Movement Flow',
              type: 'workout',
              exercises: [
                { name: 'Warmup — Jump Rope or Jog', sets: '1', reps: '3 minutes' },
                { name: 'Warmup — Arm Circles', sets: '1', reps: '15 each direction' },
                { name: 'Complex — Dumbbell Deadlift → Row → Clean → Press → Squat', sets: '5 rounds', reps: '30 sec work / 90 sec rest', notes: 'Same weight, more rounds. Five rounds instead of four.' },
                { name: 'Finisher — Plank Hold', sets: '4 rounds', reps: '30 sec hold / 30 sec rest', notes: 'More rounds.' },
                { name: 'Cooldown — Walk', sets: '1', reps: '5 minutes' }
              ]
            },
            {
              name: 'Day 3 — Bodyweight Circuits',
              focus: 'No Equipment Needed',
              type: 'workout',
              exercises: [
                { name: 'Warmup — Jumping Jacks', sets: '1', reps: '2 minutes' },
                { name: 'Warmup — Bodyweight Squat', sets: '1', reps: '15 reps' },
                { name: 'Circuit — 30 sec each: Squat → Push-Up → Lunge → Mountain Climber → Rest 60 sec', sets: '6 rounds', reps: '30 sec each movement', notes: 'Six rounds now. Your conditioning is improving.' },
                { name: 'Finisher — Burpees', sets: '4 rounds', reps: '30 sec work / 60 sec rest', notes: 'More rounds. You are getting tougher.' },
                { name: 'Cooldown — Walk', sets: '1', reps: '5 minutes' }
              ]
            },
            {
              name: 'Day 4 — Loaded Carries & Intervals (Optional 4th Day)',
              focus: 'Grip, Core, Conditioning',
              type: 'workout',
              exercises: [
                { name: 'Warmup — Jump Rope or Jog', sets: '1', reps: '3 minutes' },
                { name: 'Interval 1 — Farmer Carry', sets: '6 rounds', reps: '30 sec work / 60 sec rest', notes: 'More rounds.' },
                { name: 'Interval 2 — Kettlebell Swing', sets: '6 rounds', reps: '30 sec work / 60 sec rest', notes: 'More rounds.' },
                { name: 'Interval 3 — Goblet Squat', sets: '6 rounds', reps: '30 sec work / 60 sec rest', notes: 'More rounds.' },
                { name: 'Cooldown — Walk', sets: '1', reps: '5 minutes' }
              ]
            }
          ]
        },
        {
          name: 'Week 3 — Peak Phase 1',
          days: [
            {
              name: 'Day 1 — Kettlebell & Bodyweight',
              focus: 'Hip Hinge, Squat, Push',
              type: 'workout',
              exercises: [
                { name: 'Warmup — Jump Rope or Jog', sets: '1', reps: '3 minutes' },
                { name: 'Warmup — Hip Hinge (Unloaded)', sets: '1', reps: '10 reps' },
                { name: 'Interval 1 — Kettlebell Swing', sets: '6 rounds', reps: '30 sec work / 60 sec rest', notes: 'Same as Week 2. You should feel stronger and recover faster between rounds.' },
                { name: 'Interval 2 — Goblet Squat', sets: '6 rounds', reps: '30 sec work / 60 sec rest' },
                { name: 'Interval 3 — Push-Up', sets: '6 rounds', reps: '30 sec work / 60 sec rest' },
                { name: 'Cooldown — Walk', sets: '1', reps: '5 minutes' }
              ]
            },
            {
              name: 'Day 2 — Dumbbell Complex',
              focus: 'Full Body Movement Flow',
              type: 'workout',
              exercises: [
                { name: 'Warmup — Jump Rope or Jog', sets: '1', reps: '3 minutes' },
                { name: 'Warmup — Arm Circles', sets: '1', reps: '15 each direction' },
                { name: 'Complex — Dumbbell Deadlift → Row → Clean → Press → Squat', sets: '5 rounds', reps: '30 sec work / 90 sec rest', notes: 'Same as Week 2. If this feels easy, you can go slightly heavier on the dumbbells.' },
                { name: 'Finisher — Plank Hold', sets: '4 rounds', reps: '30 sec hold / 30 sec rest' },
                { name: 'Cooldown — Walk', sets: '1', reps: '5 minutes' }
              ]
            },
            {
              name: 'Day 3 — Bodyweight Circuits',
              focus: 'No Equipment Needed',
              type: 'workout',
              exercises: [
                { name: 'Warmup — Jumping Jacks', sets: '1', reps: '2 minutes' },
                { name: 'Warmup — Bodyweight Squat', sets: '1', reps: '15 reps' },
                { name: 'Circuit — 30 sec each: Squat → Push-Up → Lunge → Mountain Climber → Rest 60 sec', sets: '6 rounds', reps: '30 sec each movement' },
                { name: 'Finisher — Burpees', sets: '4 rounds', reps: '30 sec work / 60 sec rest' },
                { name: 'Cooldown — Walk', sets: '1', reps: '5 minutes' }
              ]
            },
            {
              name: 'Day 4 — Loaded Carries & Intervals (Optional 4th Day)',
              focus: 'Grip, Core, Conditioning',
              type: 'workout',
              exercises: [
                { name: 'Warmup — Jump Rope or Jog', sets: '1', reps: '3 minutes' },
                { name: 'Interval 1 — Farmer Carry', sets: '6 rounds', reps: '30 sec work / 60 sec rest', notes: 'If this feels manageable, go heavier on the dumbbells.' },
                { name: 'Interval 2 — Kettlebell Swing', sets: '6 rounds', reps: '30 sec work / 60 sec rest' },
                { name: 'Interval 3 — Goblet Squat', sets: '6 rounds', reps: '30 sec work / 60 sec rest' },
                { name: 'Cooldown — Walk', sets: '1', reps: '5 minutes' }
              ]
            }
          ]
        }
      ]
    },

    // ===================== PHASE 2: PUSH THE PACE =====================
    {
      name: 'Phase 2 — Push the Pace (Weeks 4-6)',
      objective: 'Increase intensity by shortening rest periods. The work intervals stay the same — 30 seconds. But now you rest for 45 seconds instead of 60. This is where conditioning really improves. Your heart rate spikes, and you have less time to recover before the next interval. You will be breathing harder. That is the goal.',
      length: '3 weeks',
      sets: '6-8 rounds',
      reps: '30 seconds work / 45 seconds rest',
      rest: '45 seconds between exercises, 90 seconds between rounds',
      frequency: '3-4 days per week',
      notes: 'Rest periods are shorter. If you need more rest, take it — but try to stick to 45 seconds. The goal is to push your capacity, not to collapse. If your form breaks down, you are going too hard. Scale the weight or the intensity.',
      weeks: [
        {
          name: 'Week 4 — Shorten Rest Periods',
          days: [
            {
              name: 'Day 1 — Kettlebell & Bodyweight',
              focus: 'Hip Hinge, Squat, Push',
              type: 'workout',
              exercises: [
                { name: 'Warmup — Jump Rope or Jog', sets: '1', reps: '3 minutes' },
                { name: 'Warmup — Hip Hinge (Unloaded)', sets: '1', reps: '10 reps' },
                { name: 'Interval 1 — Kettlebell Swing', sets: '6 rounds', reps: '30 sec work / 45 sec rest', notes: 'Same weight as Week 3, but only 45 seconds rest now. This is harder. Your heart rate stays elevated.' },
                { name: 'Interval 2 — Goblet Squat', sets: '6 rounds', reps: '30 sec work / 45 sec rest', notes: 'Less rest. Push through.' },
                { name: 'Interval 3 — Push-Up', sets: '6 rounds', reps: '30 sec work / 45 sec rest', notes: 'Less rest. Your chest will be on fire.' },
                { name: 'Cooldown — Walk', sets: '1', reps: '5 minutes' }
              ]
            },
            {
              name: 'Day 2 — Dumbbell Complex',
              focus: 'Full Body Movement Flow',
              type: 'workout',
              exercises: [
                { name: 'Warmup — Jump Rope or Jog', sets: '1', reps: '3 minutes' },
                { name: 'Warmup — Arm Circles', sets: '1', reps: '15 each direction' },
                { name: 'Complex — Dumbbell Deadlift → Row → Clean → Press → Squat', sets: '5 rounds', reps: '30 sec work / 60 sec rest', notes: 'Rest stays at 60 seconds for the complex because it is more technical. Focus on form.' },
                { name: 'Finisher — Plank Hold', sets: '4 rounds', reps: '30 sec hold / 30 sec rest' },
                { name: 'Cooldown — Walk', sets: '1', reps: '5 minutes' }
              ]
            },
            {
              name: 'Day 3 — Bodyweight Circuits',
              focus: 'No Equipment Needed',
              type: 'workout',
              exercises: [
                { name: 'Warmup — Jumping Jacks', sets: '1', reps: '2 minutes' },
                { name: 'Warmup — Bodyweight Squat', sets: '1', reps: '15 reps' },
                { name: 'Circuit — 30 sec each: Squat → Push-Up → Lunge → Mountain Climber → Rest 45 sec', sets: '6 rounds', reps: '30 sec each movement', notes: 'Only 45 seconds rest between rounds now. This is brutal.' },
                { name: 'Finisher — Burpees', sets: '4 rounds', reps: '30 sec work / 45 sec rest', notes: 'Less rest on burpees. Good luck.' },
                { name: 'Cooldown — Walk', sets: '1', reps: '5 minutes' }
              ]
            },
            {
              name: 'Day 4 — Loaded Carries & Intervals (Optional 4th Day)',
              focus: 'Grip, Core, Conditioning',
              type: 'workout',
              exercises: [
                { name: 'Warmup — Jump Rope or Jog', sets: '1', reps: '3 minutes' },
                { name: 'Interval 1 — Farmer Carry', sets: '6 rounds', reps: '30 sec work / 45 sec rest', notes: 'Less rest. Your grip will hate you.' },
                { name: 'Interval 2 — Kettlebell Swing', sets: '6 rounds', reps: '30 sec work / 45 sec rest' },
                { name: 'Interval 3 — Goblet Squat', sets: '6 rounds', reps: '30 sec work / 45 sec rest' },
                { name: 'Cooldown — Walk', sets: '1', reps: '5 minutes' }
              ]
            }
          ]
        },
        {
          name: 'Week 5 — Add Rounds',
          days: [
            {
              name: 'Day 1 — Kettlebell & Bodyweight',
              focus: 'Hip Hinge, Squat, Push',
              type: 'workout',
              exercises: [
                { name: 'Warmup — Jump Rope or Jog', sets: '1', reps: '3 minutes' },
                { name: 'Warmup — Hip Hinge (Unloaded)', sets: '1', reps: '10 reps' },
                { name: 'Interval 1 — Kettlebell Swing', sets: '7 rounds', reps: '30 sec work / 45 sec rest', notes: 'Seven rounds now. More volume at shorter rest.' },
                { name: 'Interval 2 — Goblet Squat', sets: '7 rounds', reps: '30 sec work / 45 sec rest' },
                { name: 'Interval 3 — Push-Up', sets: '7 rounds', reps: '30 sec work / 45 sec rest' },
                { name: 'Cooldown — Walk', sets: '1', reps: '5 minutes' }
              ]
            },
            {
              name: 'Day 2 — Dumbbell Complex',
              focus: 'Full Body Movement Flow',
              type: 'workout',
              exercises: [
                { name: 'Warmup — Jump Rope or Jog', sets: '1', reps: '3 minutes' },
                { name: 'Warmup — Arm Circles', sets: '1', reps: '15 each direction' },
                { name: 'Complex — Dumbbell Deadlift → Row → Clean → Press → Squat', sets: '6 rounds', reps: '30 sec work / 60 sec rest', notes: 'Six rounds now instead of five.' },
                { name: 'Finisher — Plank Hold', sets: '5 rounds', reps: '30 sec hold / 30 sec rest', notes: 'Five rounds.' },
                { name: 'Cooldown — Walk', sets: '1', reps: '5 minutes' }
              ]
            },
            {
              name: 'Day 3 — Bodyweight Circuits',
              focus: 'No Equipment Needed',
              type: 'workout',
              exercises: [
                { name: 'Warmup — Jumping Jacks', sets: '1', reps: '2 minutes' },
                { name: 'Warmup — Bodyweight Squat', sets: '1', reps: '15 reps' },
                { name: 'Circuit — 30 sec each: Squat → Push-Up → Lunge → Mountain Climber → Rest 45 sec', sets: '7 rounds', reps: '30 sec each movement', notes: 'Seven rounds. You are a machine.' },
                { name: 'Finisher — Burpees', sets: '5 rounds', reps: '30 sec work / 45 sec rest', notes: 'Five rounds of burpees. Embrace the pain.' },
                { name: 'Cooldown — Walk', sets: '1', reps: '5 minutes' }
              ]
            },
            {
              name: 'Day 4 — Loaded Carries & Intervals (Optional 4th Day)',
              focus: 'Grip, Core, Conditioning',
              type: 'workout',
              exercises: [
                { name: 'Warmup — Jump Rope or Jog', sets: '1', reps: '3 minutes' },
                { name: 'Interval 1 — Farmer Carry', sets: '7 rounds', reps: '30 sec work / 45 sec rest' },
                { name: 'Interval 2 — Kettlebell Swing', sets: '7 rounds', reps: '30 sec work / 45 sec rest' },
                { name: 'Interval 3 — Goblet Squat', sets: '7 rounds', reps: '30 sec work / 45 sec rest' },
                { name: 'Cooldown — Walk', sets: '1', reps: '5 minutes' }
              ]
            }
          ]
        },
        {
          name: 'Week 6 — Final Test',
          days: [
            {
              name: 'Day 1 — Kettlebell & Bodyweight',
              focus: 'Hip Hinge, Squat, Push',
              type: 'workout',
              exercises: [
                { name: 'Warmup — Jump Rope or Jog', sets: '1', reps: '3 minutes' },
                { name: 'Warmup — Hip Hinge (Unloaded)', sets: '1', reps: '10 reps' },
                { name: 'Interval 1 — Kettlebell Swing', sets: '8 rounds', reps: '30 sec work / 45 sec rest', notes: 'Eight rounds. Final week. Leave nothing in the tank.' },
                { name: 'Interval 2 — Goblet Squat', sets: '8 rounds', reps: '30 sec work / 45 sec rest' },
                { name: 'Interval 3 — Push-Up', sets: '8 rounds', reps: '30 sec work / 45 sec rest' },
                { name: 'Cooldown — Walk', sets: '1', reps: '5 minutes' }
              ]
            },
            {
              name: 'Day 2 — Dumbbell Complex',
              focus: 'Full Body Movement Flow',
              type: 'workout',
              exercises: [
                { name: 'Warmup — Jump Rope or Jog', sets: '1', reps: '3 minutes' },
                { name: 'Warmup — Arm Circles', sets: '1', reps: '15 each direction' },
                { name: 'Complex — Dumbbell Deadlift → Row → Clean → Press → Squat', sets: '6 rounds', reps: '30 sec work / 60 sec rest', notes: 'Final week. Push hard but stay safe.' },
                { name: 'Finisher — Plank Hold', sets: '5 rounds', reps: '30 sec hold / 30 sec rest' },
                { name: 'Cooldown — Walk', sets: '1', reps: '5 minutes' }
              ]
            },
            {
              name: 'Day 3 — Bodyweight Circuits',
              focus: 'No Equipment Needed',
              type: 'workout',
              exercises: [
                { name: 'Warmup — Jumping Jacks', sets: '1', reps: '2 minutes' },
                { name: 'Warmup — Bodyweight Squat', sets: '1', reps: '15 reps' },
                { name: 'Circuit — 30 sec each: Squat → Push-Up → Lunge → Mountain Climber → Rest 45 sec', sets: '8 rounds', reps: '30 sec each movement', notes: 'Eight rounds. You have come a long way since Week 1. Finish strong.' },
                { name: 'Finisher — Burpees', sets: '5 rounds', reps: '30 sec work / 45 sec rest', notes: 'Final burpees of the program. Make them count.' },
                { name: 'Cooldown — Walk', sets: '1', reps: '5 minutes', notes: 'You are done. Congratulations. Your conditioning is significantly better than it was six weeks ago. You can run this program again, or add 1-2 HIIT sessions per week to your lifting program to maintain your conditioning.' }
              ]
            },
            {
              name: 'Day 4 — Loaded Carries & Intervals (Optional 4th Day)',
              focus: 'Grip, Core, Conditioning',
              type: 'workout',
              exercises: [
                { name: 'Warmup — Jump Rope or Jog', sets: '1', reps: '3 minutes' },
                { name: 'Interval 1 — Farmer Carry', sets: '8 rounds', reps: '30 sec work / 45 sec rest', notes: 'Final farmer carries. Go heavy.' },
                { name: 'Interval 2 — Kettlebell Swing', sets: '8 rounds', reps: '30 sec work / 45 sec rest', notes: 'Final swings. Hip power.' },
                { name: 'Interval 3 — Goblet Squat', sets: '8 rounds', reps: '30 sec work / 45 sec rest', notes: 'Final squats. Finish strong.' },
                { name: 'Cooldown — Walk', sets: '1', reps: '5 minutes', notes: 'Well done. You have built real conditioning. Maintain it.' }
              ]
            }
          ]
        }
      ]
    }
  ]
};
// =============================================
// KINETIQ RESILIENCE — Ongoing Joint Health & Longevity Program
// =============================================
var kinetiqResilienceData = {
  id: 'kinetiq-resilience-builtin',
  name: 'Kinetiq Resilience',
  source: 'builtin',
  description: "An ongoing program designed to keep your joints healthy, your movement quality high, and your body resilient enough to train for decades. This is not a 6-week or 12-week program — this is a practice. You will work on tissue quality, joint mobility, controlled articular rotations, and low-load movement patterns that reinforce healthy mechanics. Run this program during an off-season, as supplemental work alongside your lifting 2-3 days per week, or as your primary training when you need a break from heavy loading. This is training for longevity. 30-40 minutes per session, 2-4 days per week. Standalone program — run anytime, for as long as you want.",
  difficulty: 'All Levels',
  duration: 'Ongoing (4-week cycles that repeat)',
  phases: [

    // ===================== CYCLE 1: JOINT HEALTH FOUNDATION =====================
    {
      name: 'Cycle 1 — Joint Health Foundation (Weeks 1-4)',
      objective: 'Build the base. You will focus on the most commonly restricted joints — hips, shoulders, thoracic spine, and ankles — and restore their natural movement capacity. Every session includes controlled articular rotations (CARs), tissue quality work with foam rolling, and low-load strength in end ranges. This is not about getting stronger or bigger. This is about moving well and staying healthy.',
      length: '4 weeks (repeats indefinitely)',
      sets: '2-3 sets',
      reps: '8-12 reps or 60 second holds',
      rest: 'As needed (this is not conditioning)',
      frequency: '2-4 days per week. Can be done as standalone sessions, before lifting, or on off days.',
      notes: 'Move slowly. Breathe deeply. If a joint feels restricted, spend more time there. The goal is to restore and maintain joint health, not to chase a pump or break a sweat. This is intelligent movement.',
      weeks: [
        {
          name: 'Week 1 — Hip and Shoulder CARs',
          days: [
            {
              name: 'Day 1 — Hip Focus',
              focus: 'Hip CARs, Tissue Quality, End-Range Strength',
              type: 'workout',
              exercises: [
                { name: 'Breathing Drill — 90/90 Breathing', sets: '2', reps: '10 breaths', notes: 'Lie on your back, knees bent, feet flat. Inhale through your nose, filling your belly. Exhale slowly through your mouth, feeling your ribs drop. This primes your nervous system for movement quality work.' },
                { name: 'Hip CARs (Controlled Articular Rotations)', sets: '2', reps: '5 each direction, each hip', notes: 'Stand on one leg. Lift your other knee to 90 degrees. Slowly rotate your hip through its full range: lift knee, rotate out (abduction), extend back, rotate in (adduction), return to start. Move as slowly as possible. This is active joint health work. Your hip is moving through every plane of motion under control.' },
                { name: 'Foam Roll — Hip Flexors', sets: '1', reps: '2 minutes each side', notes: 'Lie face down with a foam roller under your hip flexor (front of your hip). Slowly roll. Stop on tight spots and breathe into them. Your hip flexors are probably tight from sitting. This releases them.' },
                { name: 'Foam Roll — Glutes', sets: '1', reps: '2 minutes each side', notes: 'Sit on a foam roller. Cross one ankle over the opposite knee (figure-4 position). Roll slowly. Your glutes get tight from deadlifts and squats. This keeps them healthy.' },
                { name: '90/90 Hip Stretch', sets: '2', reps: '90 seconds each side', notes: 'Sit in 90/90 position. Front leg at 90 degrees, back leg at 90 degrees. Sit tall. Breathe. Feel your hips open up. This is passive hip mobility.' },
                { name: 'Copenhagen Plank', sets: '2', reps: '30 seconds each side', notes: 'Side plank with your top leg on a bench. This builds strength in your adductors (inner thigh) in a lengthened position. Strong adductors protect your hips and knees.' },
                { name: 'Deep Squat Hold', sets: '2', reps: '2 minutes', notes: 'Bodyweight squat. Sit in the bottom position. Elbows inside your knees. This is end-range hip and ankle mobility. Just sit here and breathe. Your hips will thank you.' }
              ]
            },
            {
              name: 'Day 2 — Shoulder Focus',
              focus: 'Shoulder CARs, Tissue Quality, Rotator Cuff',
              type: 'workout',
              exercises: [
                { name: 'Breathing Drill — 90/90 Breathing', sets: '2', reps: '10 breaths' },
                { name: 'Shoulder CARs', sets: '2', reps: '5 each direction, each shoulder', notes: 'Arm at your side. Slowly raise your arm forward and overhead, then out to the side and down. Move through the full range of your shoulder. Control every inch. This is active shoulder health. Most people have restricted shoulders from pressing and rowing. CARs fix that.' },
                { name: 'Foam Roll — Lats', sets: '1', reps: '2 minutes each side', notes: 'Lie on your side with a foam roller under your lat (side of your back). Roll slowly. Your lats get tight from pulling. This releases them and improves shoulder mobility.' },
                { name: 'Foam Roll — Upper Back (Thoracic Spine)', sets: '1', reps: '3 minutes', notes: 'Foam roller positioned across your mid-back. Roll up and down. Stop on tight spots. Your upper back gets stiff from sitting and pressing. This opens it up.' },
                { name: 'Wall Angel', sets: '3', reps: '12 reps', notes: 'Stand with your back against a wall. Arms in a W position. Slide your arms up the wall into a Y. Keep your lower back, head, and arms against the wall the entire time. This builds scapular upward rotation and shoulder mobility. Most people cannot keep contact with the wall. That is a sign of restriction.' },
                { name: 'Band Pull-Apart (Slow)', sets: '3', reps: '15 reps', notes: 'Hold a resistance band at chest height. Pull it apart, squeezing your shoulder blades together. 3 seconds to pull apart, 3 seconds to return. This strengthens your rear delts and mid-back, which protects your shoulders from pressing injuries.' },
                { name: 'Prone Y-Raise', sets: '3', reps: '12 reps', notes: 'Lie face down. Arms in a Y position. Lift your arms off the ground. Hold for 2 seconds at the top. This builds strength in shoulder flexion and scapular upward rotation. Healthy shoulders require strong scapular stabilizers.' }
              ]
            },
            {
              name: 'Day 3 — Thoracic Spine and Ankle Focus',
              focus: 'Spinal Mobility, Ankle Mobility',
              type: 'workout',
              exercises: [
                { name: 'Breathing Drill — 90/90 Breathing', sets: '2', reps: '10 breaths' },
                { name: 'Cat-Cow', sets: '3', reps: '15 reps', notes: 'On your hands and knees. Arch your back (cow), then round your back (cat). Move slowly. Feel each vertebra move. This is spinal segmentation work. Most people have stiff thoracic spines from sitting. Cat-cow restores movement.' },
                { name: 'Quadruped Thoracic Rotation', sets: '3', reps: '12 each side', notes: 'On all fours. One hand behind your head. Rotate your elbow down toward the opposite elbow, then rotate up toward the ceiling. This is pure thoracic rotation. Your upper back should rotate freely. If it does not, you are compensating with your lower back, which leads to pain.' },
                { name: 'Foam Roll — Thoracic Spine', sets: '1', reps: '3 minutes', notes: 'Same as Day 2. Roll your upper back. Stop on tight spots.' },
                { name: 'Thread the Needle', sets: '3', reps: '12 each side', notes: 'On all fours. Reach one arm under your body and across to the opposite side. Feel your thoracic spine rotate. This is active rotation under load. It builds rotational strength and mobility.' },
                { name: 'Ankle CARs', sets: '2', reps: '10 each direction, each ankle', notes: 'Sit or stand. Lift one foot off the ground. Rotate your ankle through its full range: point your toes, circle out, flex your foot, circle in. Move slowly. Your ankles need mobility for squatting and running. CARs maintain it.' },
                { name: 'Foam Roll — Calves', sets: '1', reps: '2 minutes each side', notes: 'Sit with a foam roller under your calf. Roll slowly. Your calves get tight from walking, running, and lifting. This keeps them supple.' },
                { name: 'Ankle Rocks', sets: '3', reps: '15 each side', notes: 'Half-kneeling position. Rock your front knee forward over your toes. This actively loads ankle dorsiflexion. Tight ankles limit your squat depth. This opens them up.' }
              ]
            },
            {
              name: 'Day 4 — Full Body Flow (Optional 4th Day)',
              focus: 'Movement Integration',
              type: 'workout',
              exercises: [
                { name: 'Breathing Drill — 90/90 Breathing', sets: '2', reps: '10 breaths' },
                { name: 'World\'s Greatest Stretch', sets: '3', reps: '5 each side', notes: 'From pushup position, step one foot outside your hand. Drop your back knee. Rotate your top arm toward the ceiling. Hold for 5 seconds. This hits hips, thoracic spine, and shoulders in one movement. It is the single best warmup movement for full-body mobility.' },
                { name: 'Inchworm', sets: '3', reps: '8 reps', notes: 'Stand tall. Hinge forward and walk your hands out to a pushup position. Walk your hands back to your feet. Stand up. This is dynamic hamstring and shoulder mobility.' },
                { name: 'Bear Crawl', sets: '3', reps: '30 seconds', notes: 'On your hands and feet. Knees off the ground. Crawl forward. This builds full-body coordination and shoulder stability.' },
                { name: 'Dead Bug', sets: '3', reps: '12 each side', notes: 'Lie on your back. Opposite arm and leg extend while keeping your lower back flat on the ground. This is core stability work. Your lower back stays protected when your core is strong and stable.' },
                { name: 'Child\'s Pose', sets: '1', reps: '2 minutes', notes: 'Kneel on the ground. Sit your hips back toward your heels. Arms extended forward. This is a resting position that opens your hips, shoulders, and spine. Just breathe and relax.' }
              ]
            }
          ]
        },
        {
          name: 'Week 2 — Increase Duration',
          days: [
            {
              name: 'Day 1 — Hip Focus',
              focus: 'Hip CARs, Tissue Quality, End-Range Strength',
              type: 'workout',
              exercises: [
                { name: 'Breathing Drill — 90/90 Breathing', sets: '2', reps: '10 breaths' },
                { name: 'Hip CARs', sets: '3', reps: '5 each direction, each hip', notes: 'More sets. Move even slower.' },
                { name: 'Foam Roll — Hip Flexors', sets: '1', reps: '3 minutes each side', notes: 'Longer duration. Find the tight spots and stay there.' },
                { name: 'Foam Roll — Glutes', sets: '1', reps: '3 minutes each side' },
                { name: '90/90 Hip Stretch', sets: '2', reps: '2 minutes each side', notes: 'Longer holds. Breathe deeper.' },
                { name: 'Copenhagen Plank', sets: '3', reps: '30 seconds each side', notes: 'More sets.' },
                { name: 'Deep Squat Hold', sets: '2', reps: '3 minutes', notes: 'Longer holds. Get comfortable in the bottom position.' }
              ]
            },
            {
              name: 'Day 2 — Shoulder Focus',
              focus: 'Shoulder CARs, Tissue Quality, Rotator Cuff',
              type: 'workout',
              exercises: [
                { name: 'Breathing Drill — 90/90 Breathing', sets: '2', reps: '10 breaths' },
                { name: 'Shoulder CARs', sets: '3', reps: '5 each direction, each shoulder', notes: 'More sets. Explore the edges of your range.' },
                { name: 'Foam Roll — Lats', sets: '1', reps: '3 minutes each side' },
                { name: 'Foam Roll — Upper Back', sets: '1', reps: '4 minutes' },
                { name: 'Wall Angel', sets: '3', reps: '15 reps', notes: 'More reps. Maintain wall contact.' },
                { name: 'Band Pull-Apart (Slow)', sets: '3', reps: '20 reps' },
                { name: 'Prone Y-Raise', sets: '3', reps: '15 reps' }
              ]
            },
            {
              name: 'Day 3 — Thoracic Spine and Ankle Focus',
              focus: 'Spinal Mobility, Ankle Mobility',
              type: 'workout',
              exercises: [
                { name: 'Breathing Drill — 90/90 Breathing', sets: '2', reps: '10 breaths' },
                { name: 'Cat-Cow', sets: '3', reps: '20 reps' },
                { name: 'Quadruped Thoracic Rotation', sets: '3', reps: '15 each side' },
                { name: 'Foam Roll — Thoracic Spine', sets: '1', reps: '4 minutes' },
                { name: 'Thread the Needle', sets: '3', reps: '15 each side' },
                { name: 'Ankle CARs', sets: '3', reps: '10 each direction, each ankle' },
                { name: 'Foam Roll — Calves', sets: '1', reps: '3 minutes each side' },
                { name: 'Ankle Rocks', sets: '3', reps: '20 each side' }
              ]
            },
            {
              name: 'Day 4 — Full Body Flow (Optional 4th Day)',
              focus: 'Movement Integration',
              type: 'workout',
              exercises: [
                { name: 'Breathing Drill — 90/90 Breathing', sets: '2', reps: '10 breaths' },
                { name: 'World\'s Greatest Stretch', sets: '3', reps: '8 each side' },
                { name: 'Inchworm', sets: '3', reps: '10 reps' },
                { name: 'Bear Crawl', sets: '3', reps: '45 seconds' },
                { name: 'Dead Bug', sets: '3', reps: '15 each side' },
                { name: 'Child\'s Pose', sets: '1', reps: '3 minutes' }
              ]
            }
          ]
        },
        {
          name: 'Week 3 — Add Complexity',
          days: [
            {
              name: 'Day 1 — Hip Focus',
              focus: 'Hip CARs, Tissue Quality, End-Range Strength',
              type: 'workout',
              exercises: [
                { name: 'Breathing Drill — 90/90 Breathing', sets: '2', reps: '10 breaths' },
                { name: 'Hip CARs', sets: '3', reps: '8 each direction, each hip', notes: 'More reps. Challenge your range.' },
                { name: 'Foam Roll — Hip Flexors', sets: '1', reps: '3 minutes each side' },
                { name: 'Foam Roll — Glutes', sets: '1', reps: '3 minutes each side' },
                { name: '90/90 Hip Stretch with Rotation', sets: '2', reps: '2 minutes each side', notes: 'In 90/90 position, slowly rotate your torso side to side. This adds thoracic rotation to the hip stretch.' },
                { name: 'Copenhagen Plank', sets: '3', reps: '45 seconds each side', notes: 'Longer holds.' },
                { name: 'Deep Squat Hold', sets: '2', reps: '3 minutes' }
              ]
            },
            {
              name: 'Day 2 — Shoulder Focus',
              focus: 'Shoulder CARs, Tissue Quality, Rotator Cuff',
              type: 'workout',
              exercises: [
                { name: 'Breathing Drill — 90/90 Breathing', sets: '2', reps: '10 breaths' },
                { name: 'Shoulder CARs', sets: '3', reps: '8 each direction, each shoulder' },
                { name: 'Foam Roll — Lats', sets: '1', reps: '3 minutes each side' },
                { name: 'Foam Roll — Upper Back', sets: '1', reps: '4 minutes' },
                { name: 'Wall Angel', sets: '4', reps: '15 reps' },
                { name: 'Band Pull-Apart (Slow)', sets: '4', reps: '20 reps' },
                { name: 'Prone Y-Raise', sets: '4', reps: '15 reps' }
              ]
            },
            {
              name: 'Day 3 — Thoracic Spine and Ankle Focus',
              focus: 'Spinal Mobility, Ankle Mobility',
              type: 'workout',
              exercises: [
                { name: 'Breathing Drill — 90/90 Breathing', sets: '2', reps: '10 breaths' },
                { name: 'Cat-Cow', sets: '3', reps: '20 reps' },
                { name: 'Quadruped Thoracic Rotation', sets: '4', reps: '15 each side' },
                { name: 'Foam Roll — Thoracic Spine', sets: '1', reps: '4 minutes' },
                { name: 'Thread the Needle', sets: '4', reps: '15 each side' },
                { name: 'Ankle CARs', sets: '3', reps: '12 each direction, each ankle' },
                { name: 'Foam Roll — Calves', sets: '1', reps: '3 minutes each side' },
                { name: 'Ankle Rocks', sets: '4', reps: '20 each side' }
              ]
            },
            {
              name: 'Day 4 — Full Body Flow (Optional 4th Day)',
              focus: 'Movement Integration',
              type: 'workout',
              exercises: [
                { name: 'Breathing Drill — 90/90 Breathing', sets: '2', reps: '10 breaths' },
                { name: 'World\'s Greatest Stretch', sets: '4', reps: '8 each side' },
                { name: 'Inchworm', sets: '4', reps: '10 reps' },
                { name: 'Bear Crawl', sets: '4', reps: '45 seconds' },
                { name: 'Dead Bug', sets: '4', reps: '15 each side' },
                { name: 'Child\'s Pose', sets: '1', reps: '3 minutes' }
              ]
            }
          ]
        },
        {
          name: 'Week 4 — Consolidate and Repeat',
          days: [
            {
              name: 'Day 1 — Hip Focus',
              focus: 'Hip CARs, Tissue Quality, End-Range Strength',
              type: 'workout',
              exercises: [
                { name: 'Breathing Drill — 90/90 Breathing', sets: '2', reps: '10 breaths' },
                { name: 'Hip CARs', sets: '3', reps: '8 each direction, each hip', notes: 'Same as Week 3. This is your new baseline. After Week 4, restart at Week 1 or continue at Week 4 intensity. This is ongoing practice.' },
                { name: 'Foam Roll — Hip Flexors', sets: '1', reps: '3 minutes each side' },
                { name: 'Foam Roll — Glutes', sets: '1', reps: '3 minutes each side' },
                { name: '90/90 Hip Stretch with Rotation', sets: '2', reps: '2 minutes each side' },
                { name: 'Copenhagen Plank', sets: '3', reps: '45 seconds each side' },
                { name: 'Deep Squat Hold', sets: '2', reps: '3 minutes', notes: 'Final squat hold of the cycle. By now you should be comfortable sitting here. This is maintenance. Keep doing this forever.' }
              ]
            },
            {
              name: 'Day 2 — Shoulder Focus',
              focus: 'Shoulder CARs, Tissue Quality, Rotator Cuff',
              type: 'workout',
              exercises: [
                { name: 'Breathing Drill — 90/90 Breathing', sets: '2', reps: '10 breaths' },
                { name: 'Shoulder CARs', sets: '3', reps: '8 each direction, each shoulder', notes: 'Final shoulder CARs of the cycle. Keep doing these before every upper body session forever.' },
                { name: 'Foam Roll — Lats', sets: '1', reps: '3 minutes each side' },
                { name: 'Foam Roll — Upper Back', sets: '1', reps: '4 minutes' },
                { name: 'Wall Angel', sets: '4', reps: '15 reps' },
                { name: 'Band Pull-Apart (Slow)', sets: '4', reps: '20 reps' },
                { name: 'Prone Y-Raise', sets: '4', reps: '15 reps', notes: 'Final Y-raises. Your shoulders are healthier now than they were four weeks ago. Maintain it.' }
              ]
            },
            {
              name: 'Day 3 — Thoracic Spine and Ankle Focus',
              focus: 'Spinal Mobility, Ankle Mobility',
              type: 'workout',
              exercises: [
                { name: 'Breathing Drill — 90/90 Breathing', sets: '2', reps: '10 breaths' },
                { name: 'Cat-Cow', sets: '3', reps: '20 reps' },
                { name: 'Quadruped Thoracic Rotation', sets: '4', reps: '15 each side' },
                { name: 'Foam Roll — Thoracic Spine', sets: '1', reps: '4 minutes' },
                { name: 'Thread the Needle', sets: '4', reps: '15 each side' },
                { name: 'Ankle CARs', sets: '3', reps: '12 each direction, each ankle' },
                { name: 'Foam Roll — Calves', sets: '1', reps: '3 minutes each side' },
                { name: 'Ankle Rocks', sets: '4', reps: '20 each side', notes: 'Final ankle work of the cycle. Your ankles move better. Your squat is deeper. Keep doing this.' }
              ]
            },
            {
              name: 'Day 4 — Full Body Flow (Optional 4th Day)',
              focus: 'Movement Integration',
              type: 'workout',
              exercises: [
                { name: 'Breathing Drill — 90/90 Breathing', sets: '2', reps: '10 breaths' },
                { name: 'World\'s Greatest Stretch', sets: '4', reps: '8 each side' },
                { name: 'Inchworm', sets: '4', reps: '10 reps' },
                { name: 'Bear Crawl', sets: '4', reps: '45 seconds' },
                { name: 'Dead Bug', sets: '4', reps: '15 each side' },
                { name: 'Child\'s Pose', sets: '1', reps: '3 minutes', notes: 'You have completed one cycle of Kinetiq Resilience. Restart at Week 1, or continue at Week 4 intensity. This is not a program with an end date. This is a practice. Do this 2-4 times per week for the rest of your training life. Your joints will stay healthy. Your movement will stay clean. You will train for decades without breaking down. This is resilience.' }
              ]
            }
          ]
        }
      ]
    }
  ]
};
