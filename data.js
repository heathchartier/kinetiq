var kinetiqStrongData = {
  id: 'kinetiq-strong-builtin',
  name: 'Kinetiq Strong',
  source: 'builtin',
  description: "A 12-week strength program built around the Big 4 lifts. Progressive overload is the only rule that matters — add weight, get stronger, don\'t get hurt. Every session includes a built-in mobility warmup because the smartest thing a strong person can do is stay healthy enough to keep training. 3 days per week. No fluff.",
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
  description: "A 12-week muscle building program that progresses through three distinct phases: Bridge (5x8), Growth (4x10-12), and Metabolic (3x12-15). This program is designed to run immediately after Kinetiq Strong — you\'ve built the strength foundation, now it\'s time to build the muscle. Volume increases, intensity adjusts, and your body adapts. Every session includes mobility work because joint health is non-negotiable when you\'re chasing growth. 3-4 days per week.",
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
