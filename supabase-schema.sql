-- ============================================================================
-- KINETIQ DATABASE SCHEMA
-- Supabase PostgreSQL Schema for Workout Tracking, Nutrition, Community
-- ============================================================================

-- ============================================================================
-- USERS & PROFILES
-- ============================================================================

-- Note: Supabase creates auth.users automatically
-- We extend it with a public profiles table

CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  
  -- User preferences
  preferred_coach TEXT DEFAULT 'motivator', -- drill_sergeant, zen_master, hype_man, motivator, encouraging_friend
  preferred_units TEXT DEFAULT 'imperial', -- imperial or metric
  theme TEXT DEFAULT 'dark', -- dark or light
  
  -- Onboarding data
  fitness_level TEXT, -- beginner, intermediate, advanced
  primary_goal TEXT, -- strength, hypertrophy, mobility, longevity, weight_loss
  training_experience_years INTEGER,
  
  -- Subscription
  subscription_tier TEXT DEFAULT 'free', -- free, paid, trainer
  subscription_status TEXT DEFAULT 'active', -- active, cancelled, expired
  subscription_started_at TIMESTAMPTZ,
  subscription_expires_at TIMESTAMPTZ,
  stripe_customer_id TEXT,
  
  -- Metrics
  current_bodyweight DECIMAL(5,1),
  bodyweight_unit TEXT DEFAULT 'lbs',
  height_inches INTEGER,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can only read/update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- ============================================================================
-- PROGRAMS
-- ============================================================================

CREATE TABLE public.programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Program metadata
  name TEXT NOT NULL,
  description TEXT,
  author TEXT, -- 'Kinetiq', 'User', or trainer name
  duration_weeks INTEGER,
  difficulty TEXT, -- beginner, intermediate, advanced
  category TEXT, -- strength, hypertrophy, mobility, hiit, etc.
  
  -- Program data (JSON structure)
  program_data JSONB NOT NULL, -- Full program structure with weeks/days/exercises
  
  -- Flags
  is_template BOOLEAN DEFAULT false, -- Kinetiq built-in programs
  is_public BOOLEAN DEFAULT false, -- Shared to community
  is_imported BOOLEAN DEFAULT false, -- From PDF upload
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

-- Users can see their own programs + public templates
CREATE POLICY "Users can view own programs" ON public.programs
  FOR SELECT USING (auth.uid() = user_id OR is_template = true OR is_public = true);

CREATE POLICY "Users can insert own programs" ON public.programs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own programs" ON public.programs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own programs" ON public.programs
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================================
-- ACTIVE PROGRAMS (User's current program selection)
-- ============================================================================

CREATE TABLE public.active_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  program_id UUID REFERENCES public.programs(id) ON DELETE CASCADE,
  
  -- Progress tracking
  current_week INTEGER DEFAULT 1,
  current_day INTEGER DEFAULT 1,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  
  -- State
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, program_id, is_active)
);

ALTER TABLE public.active_programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own active programs" ON public.active_programs
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================================
-- WORKOUTS (Completed workout sessions)
-- ============================================================================

CREATE TABLE public.workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  program_id UUID REFERENCES public.programs(id) ON DELETE SET NULL,
  
  -- Workout metadata
  workout_name TEXT NOT NULL,
  program_name TEXT, -- Denormalized for history if program is deleted
  week_number INTEGER,
  day_number INTEGER,
  
  -- Session data
  started_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL,
  duration_seconds INTEGER, -- Total workout time
  
  -- Stats
  total_volume DECIMAL(10,2), -- Total lbs lifted (weight × reps × sets)
  total_sets INTEGER,
  total_reps INTEGER,
  
  -- Exercise data (JSON array)
  exercises JSONB NOT NULL, -- [{ name, sets: [{ weight, reps, rpe }] }]
  
  -- Notes
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast queries
CREATE INDEX idx_workouts_user_id ON public.workouts(user_id);
CREATE INDEX idx_workouts_completed_at ON public.workouts(completed_at DESC);
CREATE INDEX idx_workouts_program_id ON public.workouts(program_id);

ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own workouts" ON public.workouts
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================================
-- PERSONAL RECORDS
-- ============================================================================

CREATE TABLE public.personal_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Exercise info
  exercise_name TEXT NOT NULL,
  
  -- PR data
  weight DECIMAL(6,2) NOT NULL,
  reps INTEGER NOT NULL,
  
  -- One Rep Max calculation (for comparison)
  estimated_1rm DECIMAL(6,2),
  
  -- Context
  workout_id UUID REFERENCES public.workouts(id) ON DELETE SET NULL,
  achieved_at TIMESTAMPTZ DEFAULT NOW(),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, exercise_name) -- One PR per exercise (updates when beaten)
);

CREATE INDEX idx_prs_user_exercise ON public.personal_records(user_id, exercise_name);

ALTER TABLE public.personal_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own PRs" ON public.personal_records
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================================
-- NUTRITION - KINETIQ FOOD DATABASE
-- ============================================================================

CREATE TABLE public.kinetiq_foods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Food info
  name TEXT NOT NULL,
  brand TEXT,
  category TEXT, -- protein, carb, fat, vegetable, fruit, dairy, etc.
  
  -- Serving
  serving_size DECIMAL(6,2) NOT NULL,
  serving_unit TEXT NOT NULL, -- g, oz, cup, tbsp, item, etc.
  
  -- Macros (per serving)
  calories INTEGER NOT NULL,
  protein DECIMAL(5,2) NOT NULL,
  carbs DECIMAL(5,2) NOT NULL,
  fat DECIMAL(5,2) NOT NULL,
  fiber DECIMAL(5,2) DEFAULT 0,
  sugar DECIMAL(5,2) DEFAULT 0,
  
  -- Micronutrients (optional, for future)
  sodium INTEGER,
  
  -- Flags
  is_verified BOOLEAN DEFAULT true, -- Curated vs user-submitted
  is_common BOOLEAN DEFAULT false, -- Show in quick-add suggestions
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast search
CREATE INDEX idx_foods_name ON public.kinetiq_foods USING gin(to_tsvector('english', name));
CREATE INDEX idx_foods_category ON public.kinetiq_foods(category);

-- Public read access (all users can search foods)
ALTER TABLE public.kinetiq_foods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view verified foods" ON public.kinetiq_foods
  FOR SELECT USING (is_verified = true);

-- ============================================================================
-- USER CUSTOM FOODS
-- ============================================================================

CREATE TABLE public.user_custom_foods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Same structure as kinetiq_foods
  name TEXT NOT NULL,
  brand TEXT,
  category TEXT,
  serving_size DECIMAL(6,2) NOT NULL,
  serving_unit TEXT NOT NULL,
  calories INTEGER NOT NULL,
  protein DECIMAL(5,2) NOT NULL,
  carbs DECIMAL(5,2) NOT NULL,
  fat DECIMAL(5,2) NOT NULL,
  fiber DECIMAL(5,2) DEFAULT 0,
  sugar DECIMAL(5,2) DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_foods_user_id ON public.user_custom_foods(user_id);

ALTER TABLE public.user_custom_foods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own custom foods" ON public.user_custom_foods
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================================
-- FOOD LOG (Daily meal tracking)
-- ============================================================================

CREATE TABLE public.food_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- When
  logged_date DATE NOT NULL,
  meal_type TEXT, -- breakfast, lunch, dinner, snack
  logged_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- What (reference to either kinetiq_foods or user_custom_foods)
  food_id UUID, -- NULL if custom entry
  custom_food_id UUID REFERENCES public.user_custom_foods(id) ON DELETE SET NULL,
  food_name TEXT NOT NULL, -- Denormalized for history
  
  -- How much
  servings DECIMAL(5,2) DEFAULT 1,
  
  -- Macros (calculated at log time, stored for history)
  calories INTEGER NOT NULL,
  protein DECIMAL(5,2) NOT NULL,
  carbs DECIMAL(5,2) NOT NULL,
  fat DECIMAL(5,2) NOT NULL,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_food_log_user_date ON public.food_log(user_id, logged_date DESC);

ALTER TABLE public.food_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own food log" ON public.food_log
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================================
-- NUTRITION GOALS (Daily targets)
-- ============================================================================

CREATE TABLE public.nutrition_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Daily targets
  calorie_target INTEGER NOT NULL,
  protein_target DECIMAL(5,2) NOT NULL,
  carbs_target DECIMAL(5,2) NOT NULL,
  fat_target DECIMAL(5,2) NOT NULL,
  
  -- Context
  goal_type TEXT, -- cut, maintain, bulk
  activity_level TEXT, -- sedentary, light, moderate, very_active, athlete
  
  -- Validity
  is_active BOOLEAN DEFAULT true,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, is_active) -- One active goal at a time
);

ALTER TABLE public.nutrition_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own nutrition goals" ON public.nutrition_goals
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================================
-- STREAKS & ACCOUNTABILITY
-- ============================================================================

CREATE TABLE public.streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Streak data
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_workout_date DATE,
  
  -- Milestones
  total_workouts INTEGER DEFAULT 0,
  total_volume DECIMAL(12,2) DEFAULT 0,
  
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id)
);

ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own streak" ON public.streaks
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================================================
-- COMMUNITY FEATURES (Phase 2)
-- ============================================================================

-- Social workout feed
CREATE TABLE public.workout_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  workout_id UUID REFERENCES public.workouts(id) ON DELETE CASCADE,
  
  caption TEXT,
  
  -- Engagement
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_workout_posts_created ON public.workout_posts(created_at DESC);

ALTER TABLE public.workout_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view workout posts" ON public.workout_posts
  FOR SELECT USING (true);

CREATE POLICY "Users can manage own workout posts" ON public.workout_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- CHALLENGES (Phase 2)
-- ============================================================================

CREATE TABLE public.challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  name TEXT NOT NULL,
  description TEXT,
  challenge_type TEXT, -- volume, consistency, exercise_specific
  
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  
  -- Rules (JSONB for flexibility)
  rules JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.challenge_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Progress
  progress_data JSONB,
  rank INTEGER,
  
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(challenge_id, user_id)
);

-- ============================================================================
-- TRAINER FEATURES (Phase 2)
-- ============================================================================

CREATE TABLE public.trainer_clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  status TEXT DEFAULT 'active', -- active, paused, archived
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(trainer_id, client_id)
);

ALTER TABLE public.trainer_clients ENABLE ROW LEVEL SECURITY;

-- Trainers can see their clients
CREATE POLICY "Trainers can view own clients" ON public.trainer_clients
  FOR SELECT USING (auth.uid() = trainer_id);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON public.programs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_active_programs_updated_at BEFORE UPDATE ON public.active_programs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  
  INSERT INTO public.streaks (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- SEED DATA: Kinetiq Built-in Programs
-- ============================================================================

-- This will be inserted via app logic to ensure proper JSON structure
-- Programs like "Kinetiq Strong" will be inserted with is_template = true

-- ============================================================================
-- SEED DATA: Kinetiq Food Database (Starter Set)
-- ============================================================================

-- Common proteins
INSERT INTO public.kinetiq_foods (name, category, serving_size, serving_unit, calories, protein, carbs, fat, is_common) VALUES
('Chicken Breast (skinless)', 'protein', 100, 'g', 165, 31, 0, 3.6, true),
('Ground Beef (93/7)', 'protein', 100, 'g', 176, 21, 0, 10, true),
('Salmon (Atlantic)', 'protein', 100, 'g', 206, 22, 0, 13, true),
('Eggs (large)', 'protein', 50, 'egg', 72, 6.3, 0.4, 4.8, true),
('Greek Yogurt (non-fat)', 'protein', 170, 'g', 100, 17, 7, 0.7, true),
('Whey Protein Powder', 'protein', 30, 'scoop', 120, 24, 3, 1.5, true),

-- Common carbs
('White Rice (cooked)', 'carb', 100, 'g', 130, 2.7, 28, 0.3, true),
('Brown Rice (cooked)', 'carb', 100, 'g', 112, 2.6, 24, 0.9, true),
('Sweet Potato (baked)', 'carb', 100, 'g', 90, 2, 21, 0.2, true),
('Oats (dry)', 'carb', 40, 'g', 152, 5.4, 27, 2.6, true),
('Whole Wheat Bread', 'carb', 28, 'slice', 69, 3.6, 12, 0.9, true),
('Banana', 'carb', 118, 'medium', 105, 1.3, 27, 0.4, true),

-- Common fats
('Almonds', 'fat', 28, 'g', 164, 6, 6, 14, true),
('Peanut Butter', 'fat', 32, 'tbsp', 188, 7.7, 7.7, 16, true),
('Olive Oil', 'fat', 14, 'tbsp', 119, 0, 0, 13.5, true),
('Avocado', 'fat', 100, 'g', 160, 2, 8.5, 15, true),

-- Common vegetables
('Broccoli (raw)', 'vegetable', 100, 'g', 34, 2.8, 7, 0.4, true),
('Spinach (raw)', 'vegetable', 100, 'g', 23, 2.9, 3.6, 0.4, true),
('Bell Pepper', 'vegetable', 100, 'g', 31, 1, 6, 0.3, true),
('Carrots', 'vegetable', 100, 'g', 41, 0.9, 10, 0.2, true);

-- Add more foods over time...

-- ============================================================================
-- NOTES
-- ============================================================================

/*
JSONB Structure Examples:

program_data:
{
  "weeks": [
    {
      "weekNumber": 1,
      "days": [
        {
          "dayNumber": 1,
          "name": "Upper Power",
          "exercises": [
            { "name": "Barbell Bench Press", "sets": "5", "reps": "5", "rest": "3min" }
          ]
        }
      ]
    }
  ]
}

workouts.exercises:
[
  {
    "name": "Barbell Squat",
    "sets": [
      { "weight": 225, "reps": 5, "rpe": 8 },
      { "weight": 225, "reps": 5, "rpe": 8.5 }
    ]
  }
]
*/
