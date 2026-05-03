// ============================================================================
// KINETIQ ACHIEVEMENT SYSTEM
// Gamification through badges and milestones
// ============================================================================

// Achievement definitions
const ACHIEVEMENTS = {
  // WORKOUT MILESTONES
  first_workout: {
    id: 'first_workout',
    name: 'First Step',
    description: 'Complete your first workout',
    emoji: '🎯',
    category: 'workouts',
    requirement: 1,
    rarity: 'common'
  },
  ten_workouts: {
    id: 'ten_workouts',
    name: 'Building Momentum',
    description: 'Complete 10 workouts',
    emoji: '💪',
    category: 'workouts',
    requirement: 10,
    rarity: 'common'
  },
  fifty_workouts: {
    id: 'fifty_workouts',
    name: 'Dedicated',
    description: 'Complete 50 workouts',
    emoji: '🔥',
    category: 'workouts',
    requirement: 50,
    rarity: 'rare'
  },
  hundred_workouts: {
    id: 'hundred_workouts',
    name: 'Centurion',
    description: 'Complete 100 workouts',
    emoji: '💯',
    category: 'workouts',
    requirement: 100,
    rarity: 'epic'
  },
  
  // STREAK ACHIEVEMENTS
  week_streak: {
    id: 'week_streak',
    name: 'Weekly Warrior',
    description: 'Maintain a 7-day streak',
    emoji: '📅',
    category: 'streaks',
    requirement: 7,
    rarity: 'common'
  },
  month_streak: {
    id: 'month_streak',
    name: 'Consistency King',
    description: 'Maintain a 30-day streak',
    emoji: '🗓️',
    category: 'streaks',
    requirement: 30,
    rarity: 'rare'
  },
  hundred_day_streak: {
    id: 'hundred_day_streak',
    name: 'Unstoppable',
    description: 'Maintain a 100-day streak',
    emoji: '⭐',
    category: 'streaks',
    requirement: 100,
    rarity: 'legendary'
  },
  
  // PR ACHIEVEMENTS
  first_pr: {
    id: 'first_pr',
    name: 'Personal Best',
    description: 'Set your first PR',
    emoji: '🎖️',
    category: 'prs',
    requirement: 1,
    rarity: 'common'
  },
  ten_prs: {
    id: 'ten_prs',
    name: 'Progress Machine',
    description: 'Set 10 PRs',
    emoji: '🏅',
    category: 'prs',
    requirement: 10,
    rarity: 'rare'
  },
  fifty_prs: {
    id: 'fifty_prs',
    name: 'Beast Mode',
    description: 'Set 50 PRs',
    emoji: '👑',
    category: 'prs',
    requirement: 50,
    rarity: 'legendary'
  },
  
  // VOLUME ACHIEVEMENTS
  volume_10k: {
    id: 'volume_10k',
    name: 'Moving Weight',
    description: 'Lift 10,000 lbs total',
    emoji: '💪',
    category: 'volume',
    requirement: 10000,
    rarity: 'common'
  },
  volume_100k: {
    id: 'volume_100k',
    name: 'Iron Warrior',
    description: 'Lift 100,000 lbs total',
    emoji: '🦍',
    category: 'volume',
    requirement: 100000,
    rarity: 'epic'
  },
  volume_1m: {
    id: 'volume_1m',
    name: 'Mountain Mover',
    description: 'Lift 1,000,000 lbs total',
    emoji: '🚀',
    category: 'volume',
    requirement: 1000000,
    rarity: 'legendary'
  },
  
  // NUTRITION ACHIEVEMENTS
  nutrition_week: {
    id: 'nutrition_week',
    name: 'Nutrition Ninja',
    description: 'Track nutrition for 7 days',
    emoji: '🥗',
    category: 'nutrition',
    requirement: 7,
    rarity: 'common'
  },
  nutrition_month: {
    id: 'nutrition_month',
    name: 'Macro Master',
    description: 'Track nutrition for 30 days',
    emoji: '🍎',
    category: 'nutrition',
    requirement: 30,
    rarity: 'rare'
  }
};

// Get unlocked achievements from localStorage
function getUnlockedAchievements() {
  return JSON.parse(localStorage.getItem('ls_achievements') || '[]');
}

// Save unlocked achievements
function saveUnlockedAchievements(achievements) {
  localStorage.setItem('ls_achievements', JSON.stringify(achievements));
}

// Check if achievement is unlocked
function isAchievementUnlocked(achievementId) {
  const unlocked = getUnlockedAchievements();
  return unlocked.includes(achievementId);
}

// Unlock achievement (with notification)
function unlockAchievement(achievementId) {
  if (isAchievementUnlocked(achievementId)) return false;
  
  const unlocked = getUnlockedAchievements();
  unlocked.push(achievementId);
  saveUnlockedAchievements(unlocked);
  
  // Show notification
  const achievement = ACHIEVEMENTS[achievementId];
  if (achievement) {
    showAchievementNotification(achievement);
  }
  
  return true;
}

// Show achievement unlock notification
function showAchievementNotification(achievement) {
  const notification = document.createElement('div');
  notification.className = 'achievement-notification';
  notification.innerHTML = `
    <div class="achievement-content">
      <div class="achievement-emoji">${achievement.emoji}</div>
      <div class="achievement-text">
        <div class="achievement-title">Achievement Unlocked!</div>
        <div class="achievement-name">${achievement.name}</div>
        <div class="achievement-desc">${achievement.description}</div>
      </div>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

// Check all achievements after action
function checkAchievements() {
  const history = DB.get('history', []);
  const prs = DB.get('prs', {});
  
  // Workout count achievements
  const workoutCount = history.length;
  if (workoutCount >= 1) unlockAchievement('first_workout');
  if (workoutCount >= 10) unlockAchievement('ten_workouts');
  if (workoutCount >= 50) unlockAchievement('fifty_workouts');
  if (workoutCount >= 100) unlockAchievement('hundred_workouts');
  
  // PR count achievements
  const prCount = Object.keys(prs).length;
  if (prCount >= 1) unlockAchievement('first_pr');
  if (prCount >= 10) unlockAchievement('ten_prs');
  if (prCount >= 50) unlockAchievement('fifty_prs');
  
  // Volume achievements
  const totalVolume = history.reduce((sum, w) => sum + (w.volume || 0), 0);
  if (totalVolume >= 10000) unlockAchievement('volume_10k');
  if (totalVolume >= 100000) unlockAchievement('volume_100k');
  if (totalVolume >= 1000000) unlockAchievement('volume_1m');
  
  // Streak achievements
  const streak = calculateStreak();
  if (streak >= 7) unlockAchievement('week_streak');
  if (streak >= 30) unlockAchievement('month_streak');
  if (streak >= 100) unlockAchievement('hundred_day_streak');
  
  // Nutrition tracking achievements
  const nutritionDays = getNutritionTrackingDays();
  if (nutritionDays >= 7) unlockAchievement('nutrition_week');
  if (nutritionDays >= 30) unlockAchievement('nutrition_month');
}

// Calculate current streak
function calculateStreak() {
  const history = DB.get('history', []);
  if (history.length === 0) return 0;
  
  const dates = history.map(w => w.date.split('T')[0]).sort().reverse();
  const uniqueDates = [...new Set(dates)];
  
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < uniqueDates.length; i++) {
    const date = new Date(uniqueDates[i]);
    date.setHours(0, 0, 0, 0);
    
    const diffDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === i) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

// Get number of days nutrition has been tracked
function getNutritionTrackingDays() {
  let daysTracked = 0;
  const today = new Date();
  
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const dayLog = JSON.parse(localStorage.getItem('foodLog_' + dateStr) || '[]');
    if (dayLog.length > 0) {
      daysTracked++;
    }
  }
  
  return daysTracked;
}

// Render achievements page
function renderAchievements() {
  const unlocked = getUnlockedAchievements();
  const categories = {
    workouts: [],
    streaks: [],
    prs: [],
    volume: [],
    nutrition: []
  };
  
  // Group achievements by category
  Object.values(ACHIEVEMENTS).forEach(achievement => {
    categories[achievement.category].push(achievement);
  });
  
  let html = `
    <p class="achievements-stats" style="text-align: center; margin-bottom: 24px; color: var(--t2);">${unlocked.length} / ${Object.keys(ACHIEVEMENTS).length} Unlocked</p>
  `;
  
  // Render each category
  Object.entries(categories).forEach(([category, achievements]) => {
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    
    html += `
      <div class="achievement-category">
        <h3>${categoryName}</h3>
        <div class="achievement-grid">
    `;
    
    achievements.forEach(achievement => {
      const isUnlocked = unlocked.includes(achievement.id);
      const lockedClass = isUnlocked ? '' : 'locked';
      
      html += `
        <div class="achievement-card ${lockedClass} ${achievement.rarity}">
          <div class="achievement-emoji">${achievement.emoji}</div>
          <div class="achievement-name">${achievement.name}</div>
          <div class="achievement-desc">${achievement.description}</div>
          ${isUnlocked ? '<div class="achievement-unlocked">✓ Unlocked</div>' : '<div class="achievement-locked">🔒 Locked</div>'}
        </div>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
  });
  
  return html;
}

// Show achievements modal
function showAchievementsModal() {
  const modal = document.createElement('div');
  modal.id = 'achievements-modal';
  modal.className = 'modal-ov show';
  modal.innerHTML = `
    <div class="modal-box" style="max-width: 90%; width: 700px; max-height: 85vh;">
      <div class="modal-hd">
        🏆 Achievements
        <button class="modal-close" onclick="document.getElementById('achievements-modal').remove()">×</button>
      </div>
      <div class="modal-body" style="padding: 20px;">
        ${renderAchievements()}
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}
