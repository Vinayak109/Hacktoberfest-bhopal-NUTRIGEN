import { StoredMealLog, ReactionLog, ReactionSeverity, ReactionOnset, TriggerCorrelation } from '../types';

const STORAGE_KEY_MEALS = 'nutrigen_structured_meals_v1';
const STORAGE_KEY_REACTIONS = 'nutrigen_structured_reactions_v1';

// Seed initial structured logs so the user sees real, clean data immediately
const INITIAL_MEAL_LOGS: StoredMealLog[] = [
  {
    id: 'meal-seed-1',
    mealName: 'Poha with peanuts & curry leaves',
    mealType: 'breakfast',
    timeWindow: '8:00 AM',
    ingredients: ['Flattened rice', 'Peanuts', 'Curry leaves', 'Mustard seeds', 'Turmeric'],
    watchIngredient: null,
    isTriggerSafe: true,
    loggedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    source: 'suggested',
    reaction: {
      id: 'reaction-seed-1',
      mealId: 'meal-seed-1',
      severity: 'fine',
      severityScore: 0,
      emoji: '😊',
      onset: 'during_meal',
      onsetLabel: 'During meal / calm',
      onsetMinutesEstimate: 10,
      tags: [],
      notes: 'Felt very light and energetic. No digestive issues.',
      loggedAt: new Date(Date.now() - 23 * 3600 * 1000).toISOString()
    }
  },
  {
    id: 'meal-seed-2',
    mealName: 'Moong dal khichdi with plain curd',
    mealType: 'lunch',
    timeWindow: '1:15 PM',
    ingredients: ['Yellow moong dal', 'Rice', 'Cumin', 'Ghee', 'Dairy curd'],
    watchIngredient: 'Dairy curd',
    isTriggerSafe: false,
    loggedAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
    source: 'suggested',
    reaction: {
      id: 'reaction-seed-2',
      mealId: 'meal-seed-2',
      severity: 'bloating',
      severityScore: 2,
      emoji: '🎈',
      onset: '1_2h',
      onsetLabel: '1–2 hours later',
      onsetMinutesEstimate: 90,
      tags: ['Bloating with water'],
      notes: 'Drank a glass of cold water at 2:30 PM. Moderate abdominal distension began around 2:45 PM.',
      loggedAt: new Date(Date.now() - 16 * 3600 * 1000).toISOString()
    }
  }
];

export function getStoredMealLogs(): StoredMealLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MEALS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_MEALS, JSON.stringify(INITIAL_MEAL_LOGS));
      return INITIAL_MEAL_LOGS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_MEAL_LOGS;
  } catch (e) {
    console.error('Failed to load meal logs:', e);
    return INITIAL_MEAL_LOGS;
  }
}

export function saveMealLog(mealData: Omit<StoredMealLog, 'id' | 'loggedAt'>): StoredMealLog {
  const currentLogs = getStoredMealLogs();
  const newMeal: StoredMealLog = {
    ...mealData,
    id: `meal-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    loggedAt: new Date().toISOString()
  };

  const updated = [newMeal, ...currentLogs];
  try {
    localStorage.setItem(STORAGE_KEY_MEALS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save meal log:', e);
  }
  return newMeal;
}

export function updateMealReaction(
  mealId: string, 
  reactionData: {
    severity: ReactionSeverity;
    onset: ReactionOnset;
    onsetLabel: string;
    onsetMinutesEstimate: number;
    emoji: string;
    tags: string[];
    notes?: string;
  }
): ReactionLog {
  const currentLogs = getStoredMealLogs();
  const severityScores: Record<ReactionSeverity, number> = {
    fine: 0,
    slight: 1,
    bloating: 2,
    pain: 3
  };

  const reaction: ReactionLog = {
    id: `reaction-${Date.now()}`,
    mealId,
    severity: reactionData.severity,
    severityScore: severityScores[reactionData.severity] ?? 0,
    emoji: reactionData.emoji,
    onset: reactionData.onset,
    onsetLabel: reactionData.onsetLabel,
    onsetMinutesEstimate: reactionData.onsetMinutesEstimate,
    tags: reactionData.tags,
    notes: reactionData.notes || '',
    loggedAt: new Date().toISOString()
  };

  const updated = currentLogs.map(meal => {
    if (meal.id === mealId) {
      return { ...meal, reaction };
    }
    return meal;
  });

  try {
    localStorage.setItem(STORAGE_KEY_MEALS, JSON.stringify(updated));
    // Also save standalone in reaction collection
    const rawReactions = localStorage.getItem(STORAGE_KEY_REACTIONS);
    const reactionsList = rawReactions ? JSON.parse(rawReactions) : [];
    reactionsList.unshift(reaction);
    localStorage.setItem(STORAGE_KEY_REACTIONS, JSON.stringify(reactionsList));
  } catch (e) {
    console.error('Failed to update meal reaction:', e);
  }

  return reaction;
}

export function deleteMealLog(mealId: string): void {
  const currentLogs = getStoredMealLogs();
  const updated = currentLogs.filter(m => m.id !== mealId);
  try {
    localStorage.setItem(STORAGE_KEY_MEALS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete meal log:', e);
  }
}

// Compute structured machine-learning-ready correlations from clean log history
export function computeTriggerCorrelations(logs: StoredMealLog[]): TriggerCorrelation[] {
  const ingredientStats: Record<string, {
    totalLogs: number;
    fine: number;
    slight: number;
    bloating: number;
    pain: number;
    onsets: Record<string, number>;
  }> = {};

  for (const log of logs) {
    const rx = log.reaction;
    const ingredients = log.ingredients && log.ingredients.length > 0 
      ? log.ingredients 
      : [log.mealName];

    for (const ing of ingredients) {
      const normalized = ing.trim().toLowerCase();
      if (!ingredientStats[normalized]) {
        ingredientStats[normalized] = {
          totalLogs: 0,
          fine: 0,
          slight: 0,
          bloating: 0,
          pain: 0,
          onsets: {}
        };
      }
      ingredientStats[normalized].totalLogs += 1;
      if (rx) {
        ingredientStats[normalized][rx.severity] += 1;
        ingredientStats[normalized].onsets[rx.onsetLabel] = (ingredientStats[normalized].onsets[rx.onsetLabel] || 0) + 1;
      }
    }
  }

  const result: TriggerCorrelation[] = [];
  for (const [ingredient, stats] of Object.entries(ingredientStats)) {
    if (stats.totalLogs === 0) continue;
    const adverseReactions = stats.slight + stats.bloating + stats.pain;
    const rate = Math.round((adverseReactions / stats.totalLogs) * 100);

    // Find most frequent onset
    let topOnset = 'Varies';
    let maxOnsetCount = 0;
    for (const [onset, count] of Object.entries(stats.onsets)) {
      if (count > maxOnsetCount) {
        maxOnsetCount = count;
        topOnset = onset;
      }
    }

    let confidence: 'Suspected' | 'Likely' | 'Monitoring' = 'Monitoring';
    if (rate >= 60 && stats.totalLogs >= 2) confidence = 'Suspected';
    else if (rate >= 35 || stats.bloating > 0) confidence = 'Likely';

    result.push({
      ingredient: ingredient.charAt(0).toUpperCase() + ingredient.slice(1),
      totalLogs: stats.totalLogs,
      adverseReactions,
      bloatingCount: stats.bloating,
      painCount: stats.pain,
      fineCount: stats.fine,
      primaryOnset: topOnset,
      correlationRate: rate,
      confidence
    });
  }

  return result.sort((a, b) => b.correlationRate - a.correlationRate);
}
