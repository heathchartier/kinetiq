// ============================================================================
// AUTH UI HANDLERS
// ============================================================================

// Show/hide auth modal
function showAuthModal() {
  document.getElementById('auth-modal').style.display = 'flex';
  showSignInForm();
}

function hideAuthModal() {
  document.getElementById('auth-modal').style.display = 'none';
  clearAuthError();
}

// Toggle between sign in and sign up forms
function showSignInForm() {
  document.getElementById('auth-title').textContent = 'Sign In';
  document.getElementById('signin-form').style.display = 'block';
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('forgot-form').style.display = 'none';
  clearAuthError();
}

function showSignUpForm() {
  document.getElementById('auth-title').textContent = 'Create Account';
  document.getElementById('signin-form').style.display = 'none';
  document.getElementById('signup-form').style.display = 'block';
  document.getElementById('forgot-form').style.display = 'none';
  clearAuthError();
}

function showForgotPassword() {
  document.getElementById('auth-title').textContent = 'Reset Password';
  document.getElementById('signin-form').style.display = 'none';
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('forgot-form').style.display = 'block';
  clearAuthError();
}

// Handle forgot password
async function handleForgotPassword() {
  const email = document.getElementById('forgot-email').value.trim();
  
  if (!email) {
    showAuthError('Please enter your email address');
    return;
  }
  
  try {
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/kinetiq/'
    });
    
    if (error) throw error;
    
    showAuthError('✅ Password reset link sent! Check your email.');
    setTimeout(() => {
      showSignInForm();
    }, 3000);
  } catch (error) {
    showAuthError(error.message || 'Failed to send reset link');
  }
}

// Error handling
function showAuthError(message) {
  const errorDiv = document.getElementById('auth-error');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
}

function clearAuthError() {
  const errorDiv = document.getElementById('auth-error');
  errorDiv.style.display = 'none';
  errorDiv.textContent = '';
}

// Handle sign in
async function handleSignIn() {
  const email = document.getElementById('signin-email').value.trim();
  const password = document.getElementById('signin-password').value;
  
  if (!email || !password) {
    showAuthError('Please enter email and password');
    return;
  }
  
  const result = await signIn(email, password);
  
  if (result.success) {
    hideAuthModal();
    
    // Show sign out button
    const signoutBtn = document.getElementById('signout-btn');
    if (signoutBtn) signoutBtn.style.display = 'block';
    
    // Sync data from cloud
    await syncDataFromCloud();
    
    // Refresh UI
    if (typeof rDash === 'function') rDash();
    if (typeof rProgs === 'function') rProgs();
  } else {
    showAuthError(result.error || 'Failed to sign in');
  }
}

// Handle sign up
async function handleSignUp() {
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;
  
  if (!name || !email || !password) {
    showAuthError('Please fill in all fields');
    return;
  }
  
  if (password.length < 6) {
    showAuthError('Password must be at least 6 characters');
    return;
  }
  
  if (password !== confirm) {
    showAuthError('Passwords do not match');
    return;
  }
  
  const result = await signUp(email, password, name);
  
  if (result.success) {
    // Show success message
    showAuthError('Account created! Please check your email to verify.');
    // Auto switch to sign in after 3 seconds
    setTimeout(() => {
      showSignInForm();
    }, 3000);
  } else {
    showAuthError(result.error || 'Failed to create account');
  }
}

// Handle sign out
async function handleSignOut() {
  const result = await signOut();
  
  if (result.success) {
    // Clear local data
    localStorage.clear();
    location.reload();
  }
}

// ============================================================================
// DATA SYNC FUNCTIONS
// ============================================================================

// Sync local data to cloud (migration)
async function syncDataToCloud() {
  if (!currentUser) return;
  
  console.log('Syncing local data to cloud...');
  
  try {
    // 1. SYNC WORKOUTS
    await syncWorkoutsToCloud();
    
    // 2. SYNC PERSONAL RECORDS
    await syncPRsToCloud();
    
    // 3. SYNC BODY MEASUREMENTS
    await syncBodyMeasurementsToCloud();
    
    // 4. SYNC NUTRITION GOALS
    await syncNutritionGoalsToCloud();
    
    // 5. SYNC FAVORITE FOODS
    await syncFavoriteFoodsToCloud();
    
    // 6. SYNC FOOD LOGS (last 30 days)
    await syncFoodLogsToCloud();
    
    // 7. SYNC WATER LOGS (last 30 days)
    await syncWaterLogsToCloud();
    
    // 8. SYNC ONBOARDING PREFERENCES
    await syncOnboardingPrefsToCloud();
    
    console.log('✅ All local data synced to cloud');
  } catch (error) {
    console.error('Error syncing to cloud:', error);
  }
}

// === INDIVIDUAL SYNC FUNCTIONS (TO CLOUD) ===

async function syncWorkoutsToCloud() {
  const localHistory = JSON.parse(localStorage.getItem('ls_history') || '[]');
  
  console.log(`📤 Syncing ${localHistory.length} local workouts to cloud...`);
  console.log('Local workouts:', localHistory.map(w => ({ name: w.name, date: w.date })));
  
  let uploaded = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const workout of localHistory) {
    // Check if already in cloud
    const { data: existing, error: checkError } = await supabaseClient
      .from('workouts')
      .select('id')
      .eq('user_id', currentUser.id)
      .eq('completed_at', workout.date)
      .eq('workout_name', workout.name)
      .maybeSingle();
    
    if (checkError) {
      console.error('❌ Error checking workout:', workout.name, workout.date, checkError);
      errors++;
      continue;
    }
    
    if (existing) {
      console.log(`⏭️ Skipped (already in cloud): ${workout.name} on ${workout.date}`);
      skipped++;
      continue;
    }
    
    // Upload to cloud
    console.log(`📤 Uploading: ${workout.name} on ${workout.date}`);
    const { error: insertError } = await supabaseClient.from('workouts').insert({
      user_id: currentUser.id,
      workout_name: workout.name,
      started_at: workout.date,
      completed_at: workout.date,
      total_volume: workout.volume || 0,
      exercises: workout.exercises || []
    });
    
    if (insertError) {
      console.error('❌ Upload failed:', workout.name, workout.date, insertError);
      errors++;
    } else {
      console.log(`✅ Uploaded: ${workout.name} on ${workout.date}`);
      uploaded++;
    }
  }
  
  console.log(`\n📊 SYNC SUMMARY:`);
  console.log(`   ✅ Uploaded: ${uploaded}`);
  console.log(`   ⏭️ Skipped: ${skipped}`);
  console.log(`   ❌ Errors: ${errors}`);
  console.log(`   📦 Total: ${localHistory.length}`);
}

async function syncPRsToCloud() {
  const localPRs = JSON.parse(localStorage.getItem('ls_prs') || '{}');
  
  for (const [exercise, pr] of Object.entries(localPRs)) {
    const { data: existing, error } = await supabaseClient
      .from('personal_records')
      .select('id, weight, reps')
      .eq('user_id', currentUser.id)
      .eq('exercise_name', exercise)
      .maybeSingle();
    
    if (error) {
      console.error('Error checking existing PR:', error);
      continue;
    }
    
    if (existing) {
      // Update if local PR is better
      const localMax = pr.weight * (1 + pr.reps / 30);
      const cloudMax = existing.weight * (1 + existing.reps / 30);
      
      if (localMax > cloudMax) {
        await supabaseClient
          .from('personal_records')
          .update({
            weight: pr.weight,
            reps: pr.reps,
            estimated_1rm: localMax,
            achieved_at: pr.date || new Date().toISOString()
          })
          .eq('id', existing.id);
      }
    } else {
      // Insert new PR
      await supabaseClient.from('personal_records').insert({
        user_id: currentUser.id,
        exercise_name: exercise,
        weight: pr.weight,
        reps: pr.reps,
        estimated_1rm: pr.weight * (1 + pr.reps / 30),
        achieved_at: pr.date || new Date().toISOString()
      });
    }
  }
}

async function syncBodyMeasurementsToCloud() {
  const measurements = JSON.parse(localStorage.getItem('bodyMeasurements') || '[]');
  
  // For now, just store in user's profile as JSON
  // In future, create separate body_measurements table
  if (measurements.length > 0) {
    await supabaseClient
      .from('profiles')
      .update({ 
        current_bodyweight: measurements[measurements.length - 1].weight || null
      })
      .eq('id', currentUser.id);
  }
}

async function syncNutritionGoalsToCloud() {
  const goals = JSON.parse(localStorage.getItem('nutritionGoals') || '{}');
  
  if (Object.keys(goals).length === 0) return;
  
  const { data: existing, error } = await supabaseClient
    .from('nutrition_goals')
    .select('id')
    .eq('user_id', currentUser.id)
    .eq('is_active', true)
    .maybeSingle(); // Use maybeSingle() instead of single() to handle 0 rows gracefully
  
  if (error) {
    console.error('Error checking existing nutrition goals:', error);
    return;
  }
  
  if (existing) {
    await supabaseClient
      .from('nutrition_goals')
      .update({
        calorie_target: goals.calories || 2500,
        protein_target: goals.protein || 185,
        carbs_target: goals.carbs || 280,
        fat_target: goals.fat || 80
      })
      .eq('id', existing.id);
  } else {
    await supabaseClient.from('nutrition_goals').insert({
      user_id: currentUser.id,
      calorie_target: goals.calories || 2500,
      protein_target: goals.protein || 185,
      carbs_target: goals.carbs || 280,
      fat_target: goals.fat || 80,
      is_active: true
    });
  }
}

async function syncFavoriteFoodsToCloud() {
  // Favorite foods are just stored as flags on food items
  // We'll handle this when we build the full food database sync
  // For now, skip
}

async function syncFoodLogsToCloud() {
  // Sync last 30 days of food logs
  const today = new Date();
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const dayLog = JSON.parse(localStorage.getItem('foodLog_' + dateStr) || '[]');
    
    if (dayLog.length === 0) continue;
    
    for (const entry of dayLog) {
      await supabaseClient.from('food_log').insert({
        user_id: currentUser.id,
        logged_date: dateStr,
        meal_type: entry.meal || 'other',
        food_name: entry.name,
        servings: entry.servings || 1,
        calories: entry.calories || 0,
        protein: entry.protein || 0,
        carbs: entry.carbs || 0,
        fat: entry.fat || 0
      });
    }
  }
}

async function syncWaterLogsToCloud() {
  // Water logs don't have a table yet, skip for now
  // TODO: Add water_log table in future
}

async function syncOnboardingPrefsToCloud() {
  const goal = localStorage.getItem('ls_onboarding_goal');
  const level = localStorage.getItem('ls_onboarding_level');
  const equipment = localStorage.getItem('ls_onboarding_equipment');
  
  if (!goal && !level && !equipment) return;
  
  await supabaseClient
    .from('profiles')
    .update({
      primary_goal: goal,
      fitness_level: level,
      training_experience_years: level === 'beginner' ? 0 : level === 'intermediate' ? 2 : 5
    })
    .eq('id', currentUser.id);
}

// Sync cloud data to local (on sign in)
async function syncDataFromCloud() {
  if (!currentUser) return;
  
  // Check if online before syncing
  if (!navigator.onLine) {
    console.log('📴 Offline - skipping cloud sync');
    return;
  }
  
  console.log('Syncing cloud data to local...');
  
  try {
    // 1. SYNC WORKOUTS
    await syncWorkoutsFromCloud();
    
    // 2. SYNC PERSONAL RECORDS
    await syncPRsFromCloud();
    
    // 3. SYNC NUTRITION GOALS
    await syncNutritionGoalsFromCloud();
    
    // 4. SYNC FOOD LOGS (last 7 days)
    await syncFoodLogsFromCloud();
    
    console.log('✅ All cloud data synced to local');
    
    // Refresh UI
    if (typeof rDash === 'function') rDash();
    if (typeof rHist === 'function') rHist();
  } catch (error) {
    console.error('Error syncing from cloud:', error);
  }
}

// === INDIVIDUAL SYNC FUNCTIONS (FROM CLOUD) ===

async function syncWorkoutsFromCloud() {
  const { data: cloudWorkouts, error } = await supabaseClient
    .from('workouts')
    .select('*')
    .eq('user_id', currentUser.id)
    .order('completed_at', { ascending: false });
  
  if (error) {
    console.error('Error loading workouts from cloud:', error);
    return;
  }
  
  if (!cloudWorkouts || cloudWorkouts.length === 0) {
    console.log('📥 No workouts in cloud yet');
    return;
  }
  
  console.log(`📥 Found ${cloudWorkouts.length} workouts in cloud`);
  
  const cloudHistory = cloudWorkouts.map(w => ({
    id: w.id,
    name: w.workout_name,
    date: new Date(w.completed_at).toISOString(), // Normalize to ISO
    duration: w.duration,
    volume: w.total_volume,
    exercises: w.exercises || []
  }));
  
  const localHistory = JSON.parse(localStorage.getItem('ls_history') || '[]');
  
  // Normalize local dates too
  const normalizedLocal = localHistory.map(w => ({
    ...w,
    date: new Date(w.date).toISOString()
  }));
  
  const merged = [...cloudHistory];
  
  for (const local of normalizedLocal) {
    const exists = cloudHistory.some(c => 
      c.date === local.date && c.name === local.name
    );
    if (!exists) merged.push(local);
  }
  
  localStorage.setItem('ls_history', JSON.stringify(merged));
  console.log(`✅ Merged to ${merged.length} total workouts in local storage`);
}

async function syncPRsFromCloud() {
  const { data: cloudPRs, error } = await supabaseClient
    .from('personal_records')
    .select('*')
    .eq('user_id', currentUser.id);
  
  if (error || !cloudPRs || cloudPRs.length === 0) return;
  
  const localPRs = JSON.parse(localStorage.getItem('ls_prs') || '{}');
  
  for (const pr of cloudPRs) {
    const existing = localPRs[pr.exercise_name];
    
    if (!existing) {
      localPRs[pr.exercise_name] = {
        weight: pr.weight,
        reps: pr.reps,
        date: pr.achieved_at
      };
    } else {
      // Keep the better PR
      const cloudMax = pr.weight * (1 + pr.reps / 30);
      const localMax = existing.weight * (1 + existing.reps / 30);
      
      if (cloudMax > localMax) {
        localPRs[pr.exercise_name] = {
          weight: pr.weight,
          reps: pr.reps,
          date: pr.achieved_at
        };
      }
    }
  }
  
  localStorage.setItem('ls_prs', JSON.stringify(localPRs));
}

async function syncNutritionGoalsFromCloud() {
  const { data: goal, error } = await supabaseClient
    .from('nutrition_goals')
    .select('*')
    .eq('user_id', currentUser.id)
    .eq('is_active', true)
    .maybeSingle(); // Use maybeSingle() instead of single() to handle 0 rows gracefully
  
  if (error) {
    console.error('Error loading nutrition goals from cloud:', error);
    return;
  }
  
  if (!goal) return; // No nutrition goal set yet
  
  const goals = {
    calories: goal.calorie_target,
    protein: goal.protein_target,
    carbs: goal.carbs_target,
    fat: goal.fat_target
  };
  
  localStorage.setItem('nutritionGoals', JSON.stringify(goals));
}

async function syncFoodLogsFromCloud() {
  // Sync last 7 days
  const today = new Date().toISOString().split('T')[0];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const { data: entries, error } = await supabaseClient
      .from('food_log')
      .select('*')
      .eq('user_id', currentUser.id)
      .eq('logged_date', dateStr);
    
    if (error || !entries || entries.length === 0) continue;
    
    const dayLog = entries.map(e => ({
      name: e.food_name,
      meal: e.meal_type,
      servings: e.servings,
      calories: e.calories,
      protein: e.protein,
      carbs: e.carbs,
      fat: e.fat
    }));
    
    localStorage.setItem('foodLog_' + dateStr, JSON.stringify(dayLog));
  }
}


// ============================================================================
// AUTO-CHECK AUTH ON PAGE LOAD
// ============================================================================

window.addEventListener('DOMContentLoaded', async () => {
  const user = await getCurrentUser();
  
  if (!user) {
    // Not logged in - show auth modal
    setTimeout(() => {
      showAuthModal();
    }, 500); // Small delay so page loads first
  } else {
    // Logged in - show sign out button and sync data
    const signoutBtn = document.getElementById('signout-btn');
    if (signoutBtn) signoutBtn.style.display = 'block';
    await syncDataFromCloud();
  }
});

// ============================================================================
// ENTER KEY HANDLERS FOR AUTH FORMS
// ============================================================================
document.addEventListener('DOMContentLoaded', function() {
  // Sign in form - Enter key on password field
  const signinPassword = document.getElementById('signin-password');
  const signinEmail = document.getElementById('signin-email');
  
  if (signinPassword) {
    signinPassword.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleSignIn();
      }
    });
  }
  
  if (signinEmail) {
    signinEmail.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleSignIn();
      }
    });
  }
  
  // Sign up form - Enter key on confirm password field
  const signupConfirm = document.getElementById('signup-confirm');
  const signupPassword = document.getElementById('signup-password');
  const signupEmail = document.getElementById('signup-email');
  const signupName = document.getElementById('signup-name');
  
  if (signupConfirm) {
    signupConfirm.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleSignUp();
      }
    });
  }
  
  if (signupPassword) {
    signupPassword.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleSignUp();
      }
    });
  }
  
  if (signupEmail) {
    signupEmail.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleSignUp();
      }
    });
  }
  
  if (signupName) {
    signupName.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleSignUp();
      }
    });
  }
});
