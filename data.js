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
