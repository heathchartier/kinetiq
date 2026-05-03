// ===== ONBOARDING FLOW =====
// Shows on first sign-in to help users choose the right program

var onboardingAnswers = {
  goal: null,
  level: null,
  equipment: null,
  daysPerWeek: null
};

var currentOnboardingStep = 1;
var totalOnboardingSteps = 4;

function showOnboarding() {
  const modal = document.getElementById('onboarding-modal');
  if (!modal) return;
  
  currentOnboardingStep = 1;
  modal.style.display = 'flex';
  renderOnboardingStep();
}

function hideOnboarding() {
  const modal = document.getElementById('onboarding-modal');
  if (modal) modal.style.display = 'none';
}

function renderOnboardingStep() {
  const content = document.getElementById('onboarding-content');
  if (!content) return;
  
  if (currentOnboardingStep === 1) {
    content.innerHTML = `
      <h2>Welcome to Kinetiq! 🎯</h2>
      <p class="ob-subtitle">Let's find the perfect program for you</p>
      <h3 class="ob-question">What's your main goal?</h3>
      <div class="ob-options">
        <button class="ob-btn" onclick="selectOnboardingAnswer('goal', 'strength')">💪 Build Strength</button>
        <button class="ob-btn" onclick="selectOnboardingAnswer('goal', 'muscle_size')">🏋️ Build Muscle Size</button>
        <button class="ob-btn" onclick="selectOnboardingAnswer('goal', 'mobility')">🤸 Improve Mobility</button>
        <button class="ob-btn" onclick="selectOnboardingAnswer('goal', 'fat_loss')">🔥 Lose Fat / Get Lean</button>
        <button class="ob-btn" onclick="selectOnboardingAnswer('goal', 'longevity')">🧘 Train for Longevity</button>
        <button class="ob-btn" onclick="selectOnboardingAnswer('goal', 'general')">🎯 General Fitness</button>
      </div>
      <div class="ob-progress">Step 1 of 4</div>
    `;
  } else if (currentOnboardingStep === 2) {
    content.innerHTML = `
      <h2>Great choice! 💯</h2>
      <h3 class="ob-question">What's your fitness level?</h3>
      <div class="ob-options">
        <button class="ob-btn" onclick="selectOnboardingAnswer('level', 'beginner')">
          <strong>Beginner</strong>
          <span class="ob-btn-sub">Less than 1 year training</span>
        </button>
        <button class="ob-btn" onclick="selectOnboardingAnswer('level', 'intermediate')">
          <strong>Intermediate</strong>
          <span class="ob-btn-sub">1-3 years training</span>
        </button>
        <button class="ob-btn" onclick="selectOnboardingAnswer('level', 'advanced')">
          <strong>Advanced</strong>
          <span class="ob-btn-sub">3+ years training</span>
        </button>
      </div>
      <div class="ob-progress">Step 2 of 4</div>
    `;
  } else if (currentOnboardingStep === 3) {
    content.innerHTML = `
      <h2>Almost there! 🎉</h2>
      <h3 class="ob-question">What equipment do you have?</h3>
      <div class="ob-options">
        <button class="ob-btn" onclick="selectOnboardingAnswer('equipment', 'bodyweight')">
          <strong>No Equipment</strong>
          <span class="ob-btn-sub">Bodyweight only</span>
        </button>
        <button class="ob-btn" onclick="selectOnboardingAnswer('equipment', 'dumbbells')">
          <strong>Dumbbells</strong>
          <span class="ob-btn-sub">Adjustable dumbbells</span>
        </button>
        <button class="ob-btn" onclick="selectOnboardingAnswer('equipment', 'barbell')">
          <strong>Barbell + Rack</strong>
          <span class="ob-btn-sub">Home gym or gym access</span>
        </button>
        <button class="ob-btn" onclick="selectOnboardingAnswer('equipment', 'full_gym')">
          <strong>Full Gym Access</strong>
          <span class="ob-btn-sub">Commercial gym</span>
        </button>
      </div>
      <div class="ob-progress">Step 3 of 4</div>
    `;
  } else if (currentOnboardingStep === 4) {
    content.innerHTML = `
      <h2>One last thing! ⏱️</h2>
      <h3 class="ob-question">How many days per week can you train?</h3>
      <div class="ob-options">
        <button class="ob-btn" onclick="selectOnboardingAnswer('daysPerWeek', '2-3')">
          <strong>2-3 Days</strong>
          <span class="ob-btn-sub">Busy schedule</span>
        </button>
        <button class="ob-btn" onclick="selectOnboardingAnswer('daysPerWeek', '4-5')">
          <strong>4-5 Days</strong>
          <span class="ob-btn-sub">Regular schedule</span>
        </button>
        <button class="ob-btn" onclick="selectOnboardingAnswer('daysPerWeek', '6+')">
          <strong>6+ Days</strong>
          <span class="ob-btn-sub">Athlete mindset</span>
        </button>
      </div>
      <div class="ob-progress">Step 4 of 4</div>
    `;
  }
}

function selectOnboardingAnswer(field, value) {
  onboardingAnswers[field] = value;
  
  // Save answer to localStorage
  localStorage.setItem('ls_onboarding_' + field, value);
  
  currentOnboardingStep++;
  
  if (currentOnboardingStep > totalOnboardingSteps) {
    showOnboardingRecommendation();
  } else {
    renderOnboardingStep();
  }
}

function recommendProgram(answers) {
  const { goal, level, equipment, daysPerWeek } = answers;
  
  // No equipment → Bodyweight
  if (equipment === 'bodyweight') {
    return 'kinetiq-bodyweight-builtin';
  }
  
  // Beginner → Foundation
  if (level === 'beginner') {
    return 'kinetiq-foundation-builtin';
  }
  
  // Mobility/injury → Mobility or Resilience
  if (goal === 'mobility') {
    return 'kinetiq-mobility-builtin';
  }
  
  if (goal === 'longevity') {
    return 'kinetiq-resilience-builtin';
  }
  
  // Fat loss → HIIT
  if (goal === 'fat_loss') {
    return 'kinetiq-hiit-builtin';
  }
  
  // Build strength → Strength
  if (goal === 'strength' && (equipment === 'barbell' || equipment === 'full_gym')) {
    return 'kinetiq-strength-builtin';
  }
  
  // Build size → Hypertrophy
  if (goal === 'muscle_size' && (level === 'intermediate' || level === 'advanced')) {
    return 'kinetiq-hypertrophy-builtin';
  }
  
  // Default for intermediate/advanced → Strength
  return 'kinetiq-strength-builtin';
}

function getProgramInfo(programId) {
  const programs = {
    'kinetiq-foundation-builtin': {
      name: 'Kinetiq Foundation',
      duration: '10 weeks',
      frequency: '3 days/week',
      description: 'Perfect for beginners. Build strength fundamentals with dumbbells.',
      emoji: '💪'
    },
    'kinetiq-strength-builtin': {
      name: 'Kinetiq Strength',
      duration: '12 weeks',
      frequency: '3 days/week',
      description: 'Build serious strength with barbell compound lifts.',
      emoji: '🏋️'
    },
    'kinetiq-hypertrophy-builtin': {
      name: 'Kinetiq Hypertrophy',
      duration: '12 weeks',
      frequency: '4 days/week',
      description: 'Maximize muscle growth with progressive volume.',
      emoji: '💪'
    },
    'kinetiq-balance-builtin': {
      name: 'Kinetiq Balance',
      duration: '8 weeks',
      frequency: '3 days/week',
      description: 'Fix imbalances with unilateral training.',
      emoji: '⚖️'
    },
    'kinetiq-deload-builtin': {
      name: 'Kinetiq Deload',
      duration: '1 week',
      frequency: '3 days/week',
      description: 'Active recovery to prevent burnout.',
      emoji: '🧘'
    },
    'kinetiq-mobility-builtin': {
      name: 'Kinetiq Mobility',
      duration: '8 weeks',
      frequency: '4 days/week',
      description: 'Improve movement quality and prevent injury.',
      emoji: '🤸'
    },
    'kinetiq-hiit-builtin': {
      name: 'Kinetiq HIIT',
      duration: '6 weeks',
      frequency: '3 days/week',
      description: 'High-intensity metabolic conditioning.',
      emoji: '🔥'
    },
    'kinetiq-resilience-builtin': {
      name: 'Kinetiq Resilience',
      duration: 'Ongoing',
      frequency: '2-4 days/week',
      description: 'Joint health and longevity training.',
      emoji: '🧘'
    },
    'kinetiq-bodyweight-builtin': {
      name: 'Kinetiq Bodyweight',
      duration: '8 weeks',
      frequency: '3 days/week',
      description: 'No equipment needed. Train anywhere.',
      emoji: '💪'
    }
  };
  
  return programs[programId] || programs['kinetiq-strength-builtin'];
}

function showOnboardingRecommendation() {
  const content = document.getElementById('onboarding-content');
  if (!content) return;
  
  const recommendedId = recommendProgram(onboardingAnswers);
  const program = getProgramInfo(recommendedId);
  
  content.innerHTML = `
    <h2>Perfect! 🎉</h2>
    <p class="ob-subtitle">Based on your answers, we recommend:</p>
    
    <div class="ob-recommendation">
      <div class="ob-rec-emoji">${program.emoji}</div>
      <h3 class="ob-rec-name">${program.name}</h3>
      <p class="ob-rec-meta">${program.duration} • ${program.frequency}</p>
      <p class="ob-rec-desc">${program.description}</p>
    </div>
    
    <button class="ob-btn-primary" onclick="startRecommendedProgram('${recommendedId}')">
      Start ${program.name} →
    </button>
    
    <button class="ob-btn-secondary" onclick="browseAllPrograms()">
      Or browse all 9 programs
    </button>
  `;
}

function startRecommendedProgram(programId) {
  // Mark onboarding as complete
  localStorage.setItem('ls_onboarding_complete', 'true');
  
  // Save recommended program ID
  localStorage.setItem('ls_recommended_program', programId);
  
  // Hide onboarding
  hideOnboarding();
  
  // Sync data now that onboarding is done
  if (typeof syncDataFromCloud === 'function') {
    syncDataFromCloud();
  }
  
  // Navigate to programs
  if (typeof showView === 'function') {
    showView('programs');
  }
  
  // Open the program using the global openProg function
  // Use a longer delay to ensure DOM is ready
  setTimeout(function() {
    if (typeof openProg === 'function') {
      // openProg expects just the ID string
      openProg(programId);
    }
  }, 300);
}

function browseAllPrograms() {
  // Mark onboarding as complete
  localStorage.setItem('ls_onboarding_complete', 'true');
  
  // Hide onboarding
  hideOnboarding();
  
  // Sync data now that onboarding is done
  if (typeof syncDataFromCloud === 'function') {
    syncDataFromCloud();
  }
  
  // Navigate to programs tab
  if (typeof showView === 'function') {
    showView('programs');
  }
}

// Skip onboarding (for testing)
function skipOnboarding() {
  localStorage.setItem('ls_onboarding_complete', 'true');
  hideOnboarding();
  
  if (typeof syncDataFromCloud === 'function') {
    syncDataFromCloud();
  }
  
  if (typeof showView === 'function') {
    showView('dashboard');
  }
}
