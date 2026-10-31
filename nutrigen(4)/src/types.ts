export interface UserProfile {
  firstName?: string;
  ageRange?: string;
  biologicalSex?: string;
  goal: string;
  age: number | ''; // Keeping for backwards compatibility temporarily
  gender: string; // Keeping for backwards compatibility temporarily
  height: number | '';
  weight: number | '';
  activityLevel: string;
  dietType: string;
  allergies: string;
  foodDislikes: string;
  budgetRange: string;
  cuisinePreference: string;
}

export interface Meal {
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface DailyPlan {
  day: string;
  meals: {
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    snacks: Meal[];
  };
  totalCalories: number;
}

export interface GroceryItem {
  category: string;
  items: string[];
}

export interface SuggestedMeal {
  name: string;
  time_window: string;
  ingredients: string[];
  why_safe: string;
  watch_ingredient: string | null;
  is_trigger_safe: boolean;
}

export interface DailyMeals {
  breakfast: SuggestedMeal;
  lunch: SuggestedMeal;
  dinner: SuggestedMeal;
}

export interface NutritionPlan {
  dailyPlans: DailyPlan[];
  groceryList: GroceryItem[];
  summary: string;
}

// ==========================================
// STRUCTURED LOG & REACTION STORAGE SCHEMA
// Structured on purpose so ML/AI models can
// learn clean trigger patterns without noise.
// ==========================================

export type ReactionSeverity = 'fine' | 'slight' | 'bloating' | 'pain';

export type ReactionOnset = 
  | 'during_meal'
  | 'within_30m'
  | '1_2h'
  | '3_4h'
  | '6h_plus';

export interface ReactionLog {
  id: string;
  mealId: string;
  severity: ReactionSeverity;        // 'fine' | 'slight' | 'bloating' | 'pain'
  severityScore: number;            // 0 = Fine, 1 = Slight, 2 = Bloating, 3 = Pain
  emoji: string;                    // Dedicated emoji: 😊, 😐, 🎈, ⚡
  onset: ReactionOnset;             // 'during_meal' | 'within_30m' | '1_2h' | '3_4h' | '6h_plus'
  onsetLabel: string;               // e.g., '1–2 hours later'
  onsetMinutesEstimate: number;     // e.g., 90 (minutes) for statistical correlation
  tags: string[];                   // Quick chips: 'Bloating with water', 'Allergies', 'Sickness', etc.
  notes?: string;                   // Optional freeform notes
  loggedAt: string;                 // ISO 8601 timestamp
}

export interface StoredMealLog {
  id: string;
  mealName: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  timeWindow?: string;
  ingredients: string[];
  watchIngredient?: string | null;
  isTriggerSafe: boolean;
  loggedAt: string;                 // ISO 8601 timestamp
  reaction?: ReactionLog | null;    // 2-tap reaction log attached NEXT
  source: 'suggested' | 'manual';
}

export interface TriggerCorrelation {
  ingredient: string;
  totalLogs: number;
  adverseReactions: number; // slight + bloating + pain
  bloatingCount: number;
  painCount: number;
  fineCount: number;
  primaryOnset: string;
  correlationRate: number; // percentage
  confidence: 'Suspected' | 'Likely' | 'Monitoring';
}
