var kinetiqBodyweightData = {
  id: 'kinetiq-bodyweight-builtin',
  name: 'Kinetiq Bodyweight',
  source: 'builtin',
  description: "An 8-week bodyweight program that trains your entire body every session. No equipment required — just you and gravity. Built for consistency when life happens: if you miss a day, you haven't skipped a muscle group. Each workout hits push, pull, legs, and core. Perfect for home training, travel, or building a movement foundation. 3 days per week. **Recommended Progression:** Bodyweight → Foundation → Strength. Use this program when you can't access a gym or want to master bodyweight fundamentals.",
  difficulty: 'Beginner',
  duration: '8 weeks (2 phases)',
  phases: [

    // ===================== PHASE 1: MOVEMENT FOUNDATION =====================
    {
      name: 'Phase 1 — Movement Foundation (Weeks 1-4)',
      objective: 'Learn to control your bodyweight through fundamental movement patterns. Build work capacity and movement quality.',
      length: '4 weeks',
      sets: '2-3 sets',
      reps: '8-12 reps',
      rest: '60-90 seconds',
      frequency: '3 days per week — Monday / Wednesday / Friday or any 3 non-consecutive days.',
      notes: 'Focus on quality over quantity. Every rep should look the same. If your form breaks down, the set is over. These movements are simple but not easy — master the basics before adding complexity.',
      weeks: [
        {
          name: 'Week 1 — Learn the Patterns',
          days: [
            {
              name: 'Day 1 — Full Body',
              focus: 'Push, Pull, Squat, Core',
              type: 'workout',
              exercises: [
                { name: 'Jumping Jacks', sets: '1', reps: '30 reps', notes: 'Warmup. Get your heart rate up and joints moving.' },
                { name: 'Bodyweight Squat', sets: '3', reps: '12 reps', notes: 'Feet shoulder-width. Sit back and down. Weight in heels. Arms forward for balance. Stand tall at top. This is your primary leg pattern.' },
                { name: 'Push-Up (Knees or Toes)', sets: '3', reps: '8-12 reps', notes: 'Hands slightly wider than shoulders. Lower chest to floor. Push back up. Use knees if needed — no shame in scaling. This is your horizontal push.' },
                { name: 'Inverted Row (Table or Bar)', sets: '3', reps: '8-10 reps', notes: 'Lie under a table or low bar. Pull chest to table/bar. Lower with control. If no equipment, skip for now and do more glute bridges.' },
                { name: 'Glute Bridge', sets: '3', reps: '15 reps', notes: 'Lie on back, knees bent, feet flat. Drive through heels and lift hips. Squeeze glutes at top. Lower slowly. Builds posterior chain.' },
                { name: 'Plank', sets: '3', reps: '20 seconds', notes: 'Elbows under shoulders. Squeeze glutes and abs. Flat back. Core stability is non-negotiable.' },
                { name: 'Dead Bug', sets: '2', reps: '8 each side', notes: 'Lie on back. Lower opposite arm and leg. Keep lower back flat on floor. Teaches core control.' }
              ]
            },
            {
              name: 'Day 2 — Full Body',
              focus: 'Push, Pull, Lunge, Core',
              type: 'workout',
              exercises: [
                { name: 'Jumping Jacks', sets: '1', reps: '30 reps', notes: 'Warmup.' },
                { name: 'Reverse Lunge', sets: '3', reps: '10 each leg', notes: 'Step back with one leg. Lower back knee toward floor. Stand. Alternate legs. Single-leg strength prevents imbalances.' },
                { name: 'Pike Push-Up', sets: '3', reps: '8 reps', notes: 'Downward dog position. Hands on floor, hips high. Lower head toward floor by bending elbows. Press back up. This is your vertical push.' },
                { name: 'Superman Hold', sets: '3', reps: '15 seconds', notes: 'Lie face down. Lift arms and legs off floor simultaneously. Hold. This strengthens your back and glutes.' },
                { name: 'Bodyweight Squat', sets: '3', reps: '15 reps', notes: 'More squats. Legs need volume.' },
                { name: 'Mountain Climbers', sets: '3', reps: '20 reps (10 each leg)', notes: 'Plank position. Drive knees to chest alternating. Keep hips low. Core and cardio.' },
                { name: 'Side Plank', sets: '2', reps: '15 seconds each side', notes: 'On elbow. Stack feet. Lift hips. Hold. Anti-lateral flexion core work.' }
              ]
            },
            {
              name: 'Day 3 — Full Body',
              focus: 'Push, Pull, Squat, Core',
              type: 'workout',
              exercises: [
                { name: 'High Knees', sets: '1', reps: '30 seconds', notes: 'Warmup. Drive knees high. Quick feet.' },
                { name: 'Squat Jump', sets: '3', reps: '8 reps', notes: 'Bodyweight squat. Explode up and jump. Land softly. Absorb with bent knees. Power development.' },
                { name: 'Push-Up (Knees or Toes)', sets: '3', reps: '10-12 reps', notes: 'Same as Day 1. Aim for one more rep.' },
                { name: 'Glute Bridge (Single-Leg)', sets: '2', reps: '10 each leg', notes: 'One foot on floor. Other leg straight out. Drive through heel. Squeeze glute. Advanced glute work.' },
                { name: 'Bicycle Crunches', sets: '3', reps: '20 reps (10 each side)', notes: 'Lie on back. Opposite elbow to knee. Twist and crunch. Oblique work.' },
                { name: 'Plank', sets: '3', reps: '25 seconds', notes: 'Added 5 seconds from Day 1.' },
                { name: 'Bodyweight Squat', sets: '2', reps: '20 reps', notes: 'Finish with high-rep squats. Burn.' }
              ]
            }
          ]
        },
        {
          name: 'Week 2 — Build Volume',
          days: [
            {
              name: 'Day 1 — Full Body',
              focus: 'Push, Pull, Squat, Core',
              type: 'workout',
              exercises: [
                { name: 'Jumping Jacks', sets: '1', reps: '40 reps', notes: 'Longer warmup.' },
                { name: 'Bodyweight Squat', sets: '3', reps: '15 reps', notes: 'More reps than Week 1.' },
                { name: 'Push-Up', sets: '3', reps: '10-12 reps', notes: 'Try to progress off knees if you were using them.' },
                { name: 'Inverted Row', sets: '3', reps: '10 reps', notes: 'More reps.' },
                { name: 'Walking Lunge', sets: '3', reps: '10 each leg', notes: 'NEW. Step forward into lunge. Stand and step with other leg. Keep going. More challenging than reverse.' },
                { name: 'Glute Bridge', sets: '3', reps: '20 reps', notes: 'Higher reps.' },
                { name: 'Plank', sets: '3', reps: '30 seconds', notes: 'Longer hold.' },
                { name: 'Dead Bug', sets: '3', reps: '10 each side', notes: 'More reps.' }
              ]
            },
            {
              name: 'Day 2 — Full Body',
              focus: 'Push, Pull, Lunge, Core',
              type: 'workout',
              exercises: [
                { name: 'High Knees', sets: '1', reps: '40 seconds', notes: 'Warmup.' },
                { name: 'Reverse Lunge', sets: '3', reps: '12 each leg', notes: 'More reps.' },
                { name: 'Pike Push-Up', sets: '3', reps: '10 reps', notes: 'More reps.' },
                { name: 'Superman Hold', sets: '3', reps: '20 seconds', notes: 'Longer hold.' },
                { name: 'Bodyweight Squat', sets: '3', reps: '20 reps', notes: 'High volume squats.' },
                { name: 'Burpees', sets: '3', reps: '6 reps', notes: 'NEW. Squat down, hands to floor, jump feet back to plank, jump feet forward, stand and jump. Full body power.' },
                { name: 'Mountain Climbers', sets: '3', reps: '30 reps', notes: 'More reps.' },
                { name: 'Side Plank', sets: '3', reps: '20 seconds each side', notes: 'Added one set, longer hold.' }
              ]
            },
            {
              name: 'Day 3 — Full Body',
              focus: 'Push, Pull, Squat, Core',
              type: 'workout',
              exercises: [
                { name: 'Butt Kicks', sets: '1', reps: '40 seconds', notes: 'Warmup. Kick heels to glutes while running in place.' },
                { name: 'Squat Jump', sets: '3', reps: '10 reps', notes: 'More jumps.' },
                { name: 'Push-Up', sets: '3', reps: '12 reps', notes: 'Building push-up strength.' },
                { name: 'Glute Bridge (Single-Leg)', sets: '3', reps: '12 each leg', notes: 'Added one set.' },
                { name: 'Bicycle Crunches', sets: '3', reps: '30 reps', notes: 'More reps.' },
                { name: 'Plank to Down Dog', sets: '3', reps: '10 reps', notes: 'NEW. Start in plank. Push hips up to downward dog. Return to plank. Dynamic core and shoulder work.' },
                { name: 'Bodyweight Squat', sets: '3', reps: '25 reps', notes: 'High volume finish.' }
              ]
            }
          ]
        },
        {
          name: 'Week 3 — Increase Intensity',
          days: [
            {
              name: 'Day 1 — Full Body',
              focus: 'Push, Pull, Squat, Core',
              type: 'workout',
              exercises: [
                { name: 'Jumping Jacks', sets: '1', reps: '50 reps', notes: 'Warmup.' },
                { name: 'Bodyweight Squat (Pause)', sets: '3', reps: '12 reps', notes: 'NEW. Pause for 2 seconds at bottom of squat. Builds strength in the hole.' },
                { name: 'Push-Up (Tempo)', sets: '3', reps: '10 reps', notes: 'Lower for 3 seconds. Pause at bottom. Push up explosively. Time under tension.' },
                { name: 'Inverted Row', sets: '3', reps: '12 reps', notes: 'More reps.' },
                { name: 'Bulgarian Split Squat (Bodyweight)', sets: '3', reps: '10 each leg', notes: 'NEW. Back foot elevated on chair or step. Front leg does the work. Advanced single-leg.' },
                { name: 'Glute Bridge (Single-Leg)', sets: '3', reps: '15 each leg', notes: 'More reps.' },
                { name: 'Plank', sets: '3', reps: '40 seconds', notes: 'Longer hold.' },
                { name: 'Dead Bug', sets: '3', reps: '12 each side', notes: 'More reps.' }
              ]
            },
            {
              name: 'Day 2 — Full Body',
              focus: 'Push, Pull, Lunge, Core',
              type: 'workout',
              exercises: [
                { name: 'High Knees', sets: '1', reps: '50 seconds', notes: 'Warmup.' },
                { name: 'Walking Lunge', sets: '3', reps: '12 each leg', notes: 'More reps.' },
                { name: 'Pike Push-Up (Elevated Feet)', sets: '3', reps: '8 reps', notes: 'NEW. Feet on chair or step. Harder shoulder press angle.' },
                { name: 'Superman Hold', sets: '3', reps: '30 seconds', notes: 'Longer hold.' },
                { name: 'Squat Jump', sets: '3', reps: '12 reps', notes: 'More jumps.' },
                { name: 'Burpees', sets: '3', reps: '8 reps', notes: 'More burpees.' },
                { name: 'Mountain Climbers', sets: '3', reps: '40 reps', notes: 'More reps.' },
                { name: 'Side Plank with Leg Lift', sets: '3', reps: '10 reps each side', notes: 'NEW. In side plank, lift top leg. Lower. Repeat. Oblique and hip work.' }
              ]
            },
            {
              name: 'Day 3 — Full Body',
              focus: 'Push, Pull, Squat, Core',
              type: 'workout',
              exercises: [
                { name: 'Butt Kicks', sets: '1', reps: '50 seconds', notes: 'Warmup.' },
                { name: 'Jump Squat', sets: '3', reps: '12 reps', notes: 'Peak volume for jumps.' },
                { name: 'Diamond Push-Up', sets: '3', reps: '8 reps', notes: 'NEW. Hands close together forming diamond shape. Tricep focus.' },
                { name: 'Glute Bridge (Two-Leg)', sets: '3', reps: '25 reps', notes: 'High volume glutes.' },
                { name: 'V-Ups', sets: '3', reps: '12 reps', notes: 'NEW. Lie flat. Lift legs and torso simultaneously forming a V. Lower. Advanced core.' },
                { name: 'Plank', sets: '3', reps: '45 seconds', notes: 'Almost to 60 seconds.' },
                { name: 'Bodyweight Squat', sets: '3', reps: '30 reps', notes: 'High volume finish.' }
              ]
            }
          ]
        },
        {
          name: 'Week 4 — Deload',
          days: [
            {
              name: 'Day 1 — Full Body (Light)',
              focus: 'Active Recovery',
              type: 'workout',
              exercises: [
                { name: 'Walk or Jog', sets: '1', reps: '5 minutes', notes: 'Easy warmup.' },
                { name: 'Bodyweight Squat', sets: '2', reps: '15 reps', notes: 'Easy movement. Deload week.' },
                { name: 'Push-Up (Knees OK)', sets: '2', reps: '10 reps', notes: 'Light pushing.' },
                { name: 'Glute Bridge', sets: '2', reps: '15 reps', notes: 'Easy glute work.' },
                { name: 'Plank', sets: '2', reps: '30 seconds', notes: 'Reduced volume.' },
                { name: 'Dead Bug', sets: '2', reps: '8 each side', notes: 'Easy core.' }
              ]
            },
            {
              name: 'Day 2 — Full Body (Light)',
              focus: 'Active Recovery',
              type: 'workout',
              exercises: [
                { name: 'Walk or Jog', sets: '1', reps: '5 minutes', notes: 'Easy warmup.' },
                { name: 'Reverse Lunge', sets: '2', reps: '10 each leg', notes: 'Easy lunges.' },
                { name: 'Pike Push-Up', sets: '2', reps: '8 reps', notes: 'Light shoulder work.' },
                { name: 'Superman Hold', sets: '2', reps: '20 seconds', notes: 'Easy back work.' },
                { name: 'Mountain Climbers', sets: '2', reps: '20 reps', notes: 'Light cardio.' },
                { name: 'Side Plank', sets: '2', reps: '15 seconds each side', notes: 'Easy obliques.' }
              ]
            },
            {
              name: 'Day 3 — Full Body (Light)',
              focus: 'Active Recovery',
              type: 'workout',
              exercises: [
                { name: 'Walk or Jog', sets: '1', reps: '10 minutes', notes: 'Longer easy cardio. Recovery week complete. Phase 2 will build strength.' },
                { name: 'Bodyweight Squat', sets: '2', reps: '20 reps', notes: 'Easy squats.' },
                { name: 'Push-Up', sets: '2', reps: '10 reps', notes: 'Easy pushing.' },
                { name: 'Glute Bridge', sets: '2', reps: '20 reps', notes: 'Easy glutes.' },
                { name: 'Plank', sets: '2', reps: '30 seconds', notes: 'You completed Phase 1. Your body now moves better. Phase 2 adds complexity and strength.' }
              ]
            }
          ]
        }
      ]
    },

    // ===================== PHASE 2: BUILD STRENGTH =====================
    {
      name: 'Phase 2 — Build Strength (Weeks 5-8)',
      objective: 'Increase difficulty through tempo, complexity, and volume. Build real bodyweight strength.',
      length: '4 weeks',
      sets: '3-4 sets',
      reps: '8-15 reps',
      rest: '90-120 seconds',
      frequency: '3 days per week.',
      notes: 'Phase 2 adds harder variations and more volume. Some movements will be challenging — that is the point. Scale when needed but push your limits. You are building strength without weights.',
      weeks: [
        {
          name: 'Week 5 — Advanced Variations',
          days: [
            {
              name: 'Day 1 — Full Body',
              focus: 'Push, Pull, Squat, Core',
              type: 'workout',
              exercises: [
                { name: 'Jumping Jacks', sets: '1', reps: '50 reps', notes: 'Warmup.' },
                { name: 'Pistol Squat Progression (Assisted)', sets: '3', reps: '6 each leg', notes: 'NEW. Single-leg squat. Hold onto door frame for balance. Lower as far as you can. This is advanced.' },
                { name: 'Archer Push-Up', sets: '3', reps: '6 each side', notes: 'NEW. Wide hand position. Shift weight to one side as you lower. One arm does most of the work. Very hard.' },
                { name: 'Inverted Row (Feet Elevated)', sets: '3', reps: '10 reps', notes: 'Feet on chair. Harder angle for pulling.' },
                { name: 'Bulgarian Split Squat', sets: '3', reps: '12 each leg', notes: 'Back into the program.' },
                { name: 'Single-Leg Glute Bridge', sets: '3', reps: '15 each leg', notes: 'Glute strength.' },
                { name: 'Plank', sets: '3', reps: '50 seconds', notes: 'Building to 60.' },
                { name: 'Hollow Hold', sets: '3', reps: '20 seconds', notes: 'NEW. Lie on back. Lift shoulders and legs off ground. Arms overhead. Hold. Advanced core.' }
              ]
            },
            {
              name: 'Day 2 — Full Body',
              focus: 'Push, Pull, Lunge, Core',
              type: 'workout',
              exercises: [
                { name: 'High Knees', sets: '1', reps: '60 seconds', notes: 'Warmup.' },
                { name: 'Jump Lunge', sets: '3', reps: '8 each leg', notes: 'NEW. Lunge position. Jump and switch legs in air. Land in lunge. Explosive.' },
                { name: 'Handstand Hold (Wall Supported)', sets: '3', reps: '15 seconds', notes: 'NEW. Kick up to handstand against wall. Hold. If too hard, do pike push-ups. Ultimate vertical push.' },
                { name: 'Pull-Up Progression (Negative or Assisted)', sets: '3', reps: '5 reps', notes: 'NEW. Jump to top of pull-up. Lower slowly over 5 seconds. Or use assistance. Build pull-up strength.' },
                { name: 'Squat Jump', sets: '3', reps: '15 reps', notes: 'More jumps.' },
                { name: 'Burpee to Tuck Jump', sets: '3', reps: '8 reps', notes: 'Burpee but jump and bring knees to chest at top. Very hard.' },
                { name: 'Mountain Climbers', sets: '3', reps: '50 reps', notes: 'High volume.' },
                { name: 'Side Plank with Rotation', sets: '3', reps: '10 reps each side', notes: 'In side plank, rotate torso down and thread arm under body. Return. Oblique rotation.' }
              ]
            },
            {
              name: 'Day 3 — Full Body',
              focus: 'Push, Pull, Squat, Core',
              type: 'workout',
              exercises: [
                { name: 'Butt Kicks', sets: '1', reps: '60 seconds', notes: 'Warmup.' },
                { name: 'Broad Jump', sets: '3', reps: '8 reps', notes: 'NEW. Jump forward as far as you can. Land softly. Walk back. Repeat. Power.' },
                { name: 'Decline Push-Up', sets: '3', reps: '12 reps', notes: 'Feet elevated on chair. Harder push-up angle.' },
                { name: 'Glute Bridge (Elevated Feet)', sets: '3', reps: '20 reps', notes: 'Feet on chair. Harder glute work.' },
                { name: 'Dragon Flag Progression (Tuck)', sets: '3', reps: '6 reps', notes: 'NEW. Lie on bench. Hold bench behind head. Lift hips and tuck knees. Lower slowly. Very advanced core. Scale to V-ups if too hard.' },
                { name: 'Plank', sets: '3', reps: '55 seconds', notes: 'Almost there.' },
                { name: 'Bodyweight Squat (Explosive)', sets: '3', reps: '20 reps', notes: 'Fast concentric. Slow eccentric. Power endurance.' }
              ]
            }
          ]
        },
        {
          name: 'Week 6 — Volume Build',
          days: [
            {
              name: 'Day 1 — Full Body',
              focus: 'Push, Pull, Squat, Core',
              type: 'workout',
              exercises: [
                { name: 'Jumping Jacks', sets: '1', reps: '60 reps', notes: 'Warmup.' },
                { name: 'Pistol Squat Progression', sets: '4', reps: '6 each leg', notes: 'Added one set.' },
                { name: 'Archer Push-Up', sets: '4', reps: '6 each side', notes: 'Added one set.' },
                { name: 'Inverted Row (Feet Elevated)', sets: '4', reps: '10 reps', notes: 'Added one set.' },
                { name: 'Bulgarian Split Squat', sets: '3', reps: '15 each leg', notes: 'More reps.' },
                { name: 'Single-Leg Glute Bridge', sets: '3', reps: '20 each leg', notes: 'More reps.' },
                { name: 'Plank', sets: '3', reps: '60 seconds', notes: 'Full minute!' },
                { name: 'Hollow Hold', sets: '3', reps: '30 seconds', notes: 'Longer hold.' }
              ]
            },
            {
              name: 'Day 2 — Full Body',
              focus: 'Push, Pull, Lunge, Core',
              type: 'workout',
              exercises: [
                { name: 'High Knees', sets: '1', reps: '60 seconds', notes: 'Warmup.' },
                { name: 'Jump Lunge', sets: '4', reps: '10 each leg', notes: 'More reps and sets.' },
                { name: 'Handstand Hold', sets: '3', reps: '20 seconds', notes: 'Longer hold.' },
                { name: 'Pull-Up Progression', sets: '4', reps: '5 reps', notes: 'Added one set.' },
                { name: 'Squat Jump', sets: '3', reps: '20 reps', notes: 'More jumps.' },
                { name: 'Burpee to Tuck Jump', sets: '3', reps: '10 reps', notes: 'More reps.' },
                { name: 'Mountain Climbers', sets: '3', reps: '60 reps', notes: 'Peak volume.' },
                { name: 'Side Plank with Rotation', sets: '3', reps: '12 reps each side', notes: 'More reps.' }
              ]
            },
            {
              name: 'Day 3 — Full Body',
              focus: 'Push, Pull, Squat, Core',
              type: 'workout',
              exercises: [
                { name: 'Butt Kicks', sets: '1', reps: '60 seconds', notes: 'Warmup.' },
                { name: 'Broad Jump', sets: '3', reps: '10 reps', notes: 'More jumps.' },
                { name: 'Decline Push-Up', sets: '4', reps: '12 reps', notes: 'Added one set.' },
                { name: 'Glute Bridge (Elevated Feet)', sets: '3', reps: '25 reps', notes: 'More reps.' },
                { name: 'Dragon Flag Progression', sets: '3', reps: '8 reps', notes: 'More reps.' },
                { name: 'Plank to Push-Up', sets: '3', reps: '10 reps', notes: 'Start in plank. Push up to hands one arm at a time. Return to elbows. Repeat. Dynamic core.' },
                { name: 'Bodyweight Squat (Explosive)', sets: '3', reps: '25 reps', notes: 'High volume.' }
              ]
            }
          ]
        },
        {
          name: 'Week 7 — Peak Strength',
          days: [
            {
              name: 'Day 1 — Full Body',
              focus: 'Push, Pull, Squat, Core',
              type: 'workout',
              exercises: [
                { name: 'Jumping Jacks', sets: '1', reps: '60 reps', notes: 'Warmup.' },
                { name: 'Pistol Squat Progression', sets: '4', reps: '8 each leg', notes: 'More reps. Getting stronger.' },
                { name: 'Archer Push-Up', sets: '4', reps: '8 each side', notes: 'More reps.' },
                { name: 'Inverted Row (Feet Elevated)', sets: '4', reps: '12 reps', notes: 'More reps.' },
                { name: 'Bulgarian Split Squat', sets: '4', reps: '15 each leg', notes: 'Added one set.' },
                { name: 'Single-Leg Glute Bridge', sets: '4', reps: '20 each leg', notes: 'Added one set.' },
                { name: 'Plank', sets: '4', reps: '60 seconds', notes: 'Added one set.' },
                { name: 'Hollow Hold', sets: '3', reps: '40 seconds', notes: 'Longer hold.' }
              ]
            },
            {
              name: 'Day 2 — Full Body',
              focus: 'Push, Pull, Lunge, Core',
              type: 'workout',
              exercises: [
                { name: 'High Knees', sets: '1', reps: '60 seconds', notes: 'Warmup.' },
                { name: 'Jump Lunge', sets: '4', reps: '12 each leg', notes: 'More reps.' },
                { name: 'Handstand Hold', sets: '4', reps: '20 seconds', notes: 'Added one set.' },
                { name: 'Pull-Up Progression', sets: '4', reps: '6 reps', notes: 'More reps.' },
                { name: 'Squat Jump', sets: '4', reps: '20 reps', notes: 'Added one set.' },
                { name: 'Burpee to Tuck Jump', sets: '4', reps: '10 reps', notes: 'Added one set.' },
                { name: 'Mountain Climbers', sets: '4', reps: '60 reps', notes: 'Added one set.' },
                { name: 'Side Plank with Rotation', sets: '4', reps: '12 reps each side', notes: 'Added one set.' }
              ]
            },
            {
              name: 'Day 3 — Full Body',
              focus: 'Push, Pull, Squat, Core',
              type: 'workout',
              exercises: [
                { name: 'Butt Kicks', sets: '1', reps: '60 seconds', notes: 'Warmup.' },
                { name: 'Broad Jump', sets: '4', reps: '10 reps', notes: 'Added one set.' },
                { name: 'Decline Push-Up', sets: '4', reps: '15 reps', notes: 'More reps.' },
                { name: 'Glute Bridge (Elevated Feet)', sets: '4', reps: '25 reps', notes: 'Added one set.' },
                { name: 'Dragon Flag Progression', sets: '3', reps: '10 reps', notes: 'More reps.' },
                { name: 'Plank to Push-Up', sets: '4', reps: '10 reps', notes: 'Added one set.' },
                { name: 'Bodyweight Squat (Explosive)', sets: '4', reps: '25 reps', notes: 'Peak volume.' }
              ]
            }
          ]
        },
        {
          name: 'Week 8 — Completion',
          days: [
            {
              name: 'Day 1 — Full Body (Graduation)',
              focus: 'Final Test',
              type: 'workout',
              exercises: [
                { name: 'Jumping Jacks', sets: '1', reps: '60 reps', notes: 'Final warmup.' },
                { name: 'Pistol Squat Progression', sets: '4', reps: '10 each leg', notes: 'Final single-leg squat session. See how far you have come.' },
                { name: 'Archer Push-Up', sets: '4', reps: '10 each side', notes: 'Final archer push-ups.' },
                { name: 'Inverted Row (Feet Elevated)', sets: '4', reps: '15 reps', notes: 'Final rows.' },
                { name: 'Bulgarian Split Squat', sets: '4', reps: '20 each leg', notes: 'Final split squats. Peak volume.' },
                { name: 'Single-Leg Glute Bridge', sets: '4', reps: '25 each leg', notes: 'Final glute work.' },
                { name: 'Plank', sets: '4', reps: '60 seconds', notes: 'Full minute planks. Strong core.' },
                { name: 'Hollow Hold', sets: '3', reps: '45 seconds', notes: 'Almost there.' }
              ]
            },
            {
              name: 'Day 2 — Full Body (Graduation)',
              focus: 'Final Test',
              type: 'workout',
              exercises: [
                { name: 'High Knees', sets: '1', reps: '60 seconds', notes: 'Final warmup.' },
                { name: 'Jump Lunge', sets: '4', reps: '15 each leg', notes: 'Final jumping lunges.' },
                { name: 'Handstand Hold', sets: '4', reps: '30 seconds', notes: 'Final handstand work. Your shoulders are strong.' },
                { name: 'Pull-Up Progression', sets: '4', reps: '8 reps', notes: 'Final pull-up work. Getting close to unassisted.' },
                { name: 'Squat Jump', sets: '4', reps: '25 reps', notes: 'Final jump squats. Peak power.' },
                { name: 'Burpee to Tuck Jump', sets: '4', reps: '12 reps', notes: 'Final burpees.' },
                { name: 'Mountain Climbers', sets: '4', reps: '80 reps', notes: 'Final mountain climbers. High volume.' },
                { name: 'Side Plank with Rotation', sets: '4', reps: '15 reps each side', notes: 'Final oblique work.' }
              ]
            },
            {
              name: 'Day 3 — Full Body (Celebration)',
              focus: 'Complete the Program',
              type: 'workout',
              exercises: [
                { name: 'Butt Kicks', sets: '1', reps: '60 seconds', notes: 'Final warmup.' },
                { name: 'Broad Jump', sets: '4', reps: '12 reps', notes: 'Final broad jumps.' },
                { name: 'Decline Push-Up', sets: '4', reps: '20 reps', notes: 'Final decline push-ups. You are strong.' },
                { name: 'Glute Bridge (Elevated Feet)', sets: '4', reps: '30 reps', notes: 'Final glute bridges. Peak volume.' },
                { name: 'Dragon Flag Progression', sets: '4', reps: '10 reps', notes: 'Final core work. Advanced movement mastered.' },
                { name: 'Plank to Push-Up', sets: '4', reps: '15 reps', notes: 'Final dynamic plank.' },
                { name: 'Bodyweight Squat (Explosive)', sets: '5', reps: '30 reps', notes: 'Final squats. You completed Kinetiq Bodyweight. You built real strength with just your body. You can train anywhere now. You learned to control your bodyweight through every plane of motion. No gym required. You earned this. Move on to Kinetiq Foundation when you are ready for weights. You are strong.' }
              ]
            }
          ]
        }
      ]
    }
  ]
};
