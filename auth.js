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
  clearAuthError();
}

function showSignUpForm() {
  document.getElementById('auth-title').textContent = 'Create Account';
  document.getElementById('signin-form').style.display = 'none';
  document.getElementById('signup-form').style.display = 'block';
  clearAuthError();
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
  
  // Get local history (stored as 'ls_history')
  const localHistory = JSON.parse(localStorage.getItem('ls_history') || '[]');
  
  // Upload each workout that's not already in cloud
  for (const workout of localHistory) {
    // Check if this workout already exists in cloud (by date and name)
    const { data: existing } = await supabase
      .from('workouts')
      .select('id')
      .eq('user_id', currentUser.id)
      .eq('completed_at', workout.date)
      .eq('workout_name', workout.name)
      .single();
    
    // Skip if already in cloud
    if (existing) continue;
    
    // Upload to cloud
    await supabase.from('workouts').insert({
      user_id: currentUser.id,
      workout_name: workout.name,
      started_at: workout.date,
      completed_at: workout.date,
      duration: workout.duration || 0,
      total_volume: workout.volume || 0,
      exercises: workout.exercises || []
    });
  }
  
  console.log('Local data synced to cloud');
}

// Sync cloud data to local (on sign in)
async function syncDataFromCloud() {
  if (!currentUser) return;
  
  console.log('Syncing cloud data to local...');
  
  // Load workouts from cloud
  const { data: cloudWorkouts, error } = await supabase
    .from('workouts')
    .select('*')
    .eq('user_id', currentUser.id)
    .order('completed_at', { ascending: false });
  
  if (error) {
    console.error('Error loading from cloud:', error);
    return;
  }
  
  if (cloudWorkouts && cloudWorkouts.length > 0) {
    // Convert cloud format to app's history format
    const cloudHistory = cloudWorkouts.map(w => ({
      id: w.id,
      name: w.workout_name,
      date: w.completed_at,
      duration: w.duration,
      volume: w.total_volume,
      exercises: w.exercises || []
    }));
    
    // Get local history
    const localHistory = JSON.parse(localStorage.getItem('ls_history') || '[]');
    
    // Merge: keep cloud workouts + any local ones not in cloud
    const merged = [...cloudHistory];
    
    for (const local of localHistory) {
      const exists = cloudHistory.some(c => 
        c.date === local.date && c.name === local.name
      );
      if (!exists) merged.push(local);
    }
    
    // Save merged data back to localStorage with correct key
    localStorage.setItem('ls_history', JSON.stringify(merged));
    
    // Refresh dashboard if function exists
    if (typeof rDash === 'function') {
      rDash();
    }
    if (typeof rHist === 'function') {
      rHist();
    }
  }
  
  console.log('Cloud data synced to local');
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
