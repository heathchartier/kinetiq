// ============================================================================
// SUPABASE CONFIGURATION
// ============================================================================

const SUPABASE_URL = 'https://oywpcylrpgsdorsvysam.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95d3BjeWxycGdzZG9yc3Z5c2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MDkzMTMsImV4cCI6MjA5MzI4NTMxM30.9I_gSbybDzNko7ILROohlu0_G05MLPUEW-kOEt2V2aE';

// Initialize Supabase client (avoid naming conflict with CDN global)
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Global auth state
let currentUser = null;

// ============================================================================
// AUTH FUNCTIONS
// ============================================================================

async function signUp(email, password, displayName) {
  try {
    const { data, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          display_name: displayName
        }
      }
    });
    
    if (error) throw error;
    
    console.log('Sign up successful:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Sign up error:', error);
    return { success: false, error: error.message };
  }
}

async function signIn(email, password) {
  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });
    
    if (error) throw error;
    
    currentUser = data.user;
    console.log('Sign in successful:', currentUser);
    return { success: true, data };
  } catch (error) {
    console.error('Sign in error:', error);
    return { success: false, error: error.message };
  }
}

async function signOut() {
  try {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
    
    currentUser = null;
    console.log('Sign out successful');
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    return { success: false, error: error.message };
  }
}

async function getCurrentUser() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  currentUser = user;
  return user;
}

// Check auth state on load
supabaseClient.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event, session);
  currentUser = session?.user || null;
  
  if (event === 'SIGNED_IN') {
    onUserSignedIn(session.user);
  } else if (event === 'SIGNED_OUT') {
    onUserSignedOut();
  }
});

// Callbacks (to be implemented in app.js)
function onUserSignedIn(user) {
  console.log('User signed in:', user);
  
  // Hide auth modal (if function exists)
  if (typeof hideAuthModal === 'function') {
    hideAuthModal();
  }
  
  // Show sign out button
  const signoutBtn = document.getElementById('signout-btn');
  if (signoutBtn) signoutBtn.style.display = 'block';
  
  // Check if user needs onboarding
  const hasCompletedOnboarding = localStorage.getItem('ls_onboarding_complete');
  if (!hasCompletedOnboarding && typeof showOnboarding === 'function') {
    showOnboarding();
    return; // Don't sync yet, wait for onboarding to complete
  }
  
  // Sync data from cloud
  syncDataFromCloud();
  
  // Refresh the dashboard and programs list
  if (typeof rDash === 'function') rDash();
  if (typeof rProgs === 'function') rProgs();
}

function onUserSignedOut() {
  console.log('User signed out');
  
  // Hide sign out button
  const signoutBtn = document.getElementById('signout-btn');
  if (signoutBtn) signoutBtn.style.display = 'none';
  
  // Show auth modal
  showAuthModal();
}

// ============================================================================
// DATABASE HELPER FUNCTIONS
// ============================================================================

// Save workout to Supabase
async function saveWorkoutToCloud(workoutData) {
  if (!currentUser) return { success: false, error: 'Not authenticated' };
  
  try {
    const { data, error } = await supabaseClient
      .from('workouts')
      .insert([{
        user_id: currentUser.id,
        workout_name: workoutData.name,
        program_name: workoutData.programName,
        week_number: workoutData.week,
        day_number: workoutData.day,
        started_at: workoutData.startTime,
        completed_at: workoutData.endTime,
        duration_seconds: workoutData.duration,
        total_volume: workoutData.volume,
        total_sets: workoutData.sets,
        total_reps: workoutData.reps,
        exercises: workoutData.exercises,
        notes: workoutData.notes
      }])
      .select();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error saving workout:', error);
    return { success: false, error: error.message };
  }
}

// Load all workouts from Supabase
async function loadWorkoutsFromCloud() {
  if (!currentUser) return { success: false, error: 'Not authenticated' };
  
  try {
    const { data, error } = await supabaseClient
      .from('workouts')
      .select('*')
      .eq('user_id', currentUser.id)
      .order('completed_at', { ascending: false });
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error loading workouts:', error);
    return { success: false, error: error.message };
  }
}

// Save program to Supabase
async function saveProgramToCloud(programData) {
  if (!currentUser) return { success: false, error: 'Not authenticated' };
  
  try {
    const { data, error } = await supabaseClient
      .from('programs')
      .insert([{
        user_id: currentUser.id,
        name: programData.name,
        description: programData.desc,
        duration_weeks: programData.duration,
        difficulty: programData.difficulty,
        category: programData.category,
        program_data: programData.data,
        is_imported: programData.isImported || false
      }])
      .select();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error saving program:', error);
    return { success: false, error: error.message };
  }
}

// Load user's programs from Supabase
async function loadProgramsFromCloud() {
  if (!currentUser) return { success: false, error: 'Not authenticated' };
  
  try {
    const { data, error } = await supabaseClient
      .from('programs')
      .select('*')
      .eq('user_id', currentUser.id)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error loading programs:', error);
    return { success: false, error: error.message };
  }
}

// Update user profile
async function updateProfile(updates) {
  if (!currentUser) return { success: false, error: 'Not authenticated' };
  
  try {
    const { data, error } = await supabaseClient
      .from('profiles')
      .update(updates)
      .eq('id', currentUser.id)
      .select();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { success: false, error: error.message };
  }
}

// Get user profile
async function getProfile() {
  if (!currentUser) return { success: false, error: 'Not authenticated' };
  
  try {
    const { data, error } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', currentUser.id)
      .single();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error getting profile:', error);
    return { success: false, error: error.message };
  }
}
