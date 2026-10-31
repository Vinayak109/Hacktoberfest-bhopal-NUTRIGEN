import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  ChevronUp, 
  Check, 
  ArrowUpRight, 
  Home, 
  LineChart, 
  Plus, 
  Lock, 
  Target, 
  Clock, 
  Activity, 
  Sparkles, 
  Database, 
  Code2, 
  Filter, 
  Tag, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { OnboardingData } from '../App';
import TriggerHypothesis from './TriggerHypothesis';
import { DailyMeals, StoredMealLog, ReactionLog, ReactionSeverity, ReactionOnset } from '../types';
import MealCard from './MealCard';
import ReactionModal from './ReactionModal';
import QuickDishLoggerModal from './QuickDishLoggerModal';
import { 
  getStoredMealLogs, 
  saveMealLog, 
  updateMealReaction, 
  computeTriggerCorrelations 
} from '../services/logStorage';

interface DashboardProps {
  data: OnboardingData;
  dailyMeals?: DailyMeals | null;
}

interface MealItem {
  id: string;
  type: string;
  time: string;
  name: string;
  status: 'safe' | 'watch';
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  watchLabel?: string;
  ingredients?: string[];
}

export default function Dashboard({ data, dailyMeals }: DashboardProps) {
  // Stored clean meal logs
  const [storedLogs, setStoredLogs] = useState<StoredMealLog[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | ReactionSeverity>('all');
  const [showSchemaInspector, setShowSchemaInspector] = useState(false);

  // Modals state
  const [reactionModalOpen, setReactionModalOpen] = useState(false);
  const [quickDishLoggerOpen, setQuickDishLoggerOpen] = useState(false);
  const [activeMealId, setActiveMealId] = useState<string>('');
  const [activeMealName, setActiveMealName] = useState<string>('');
  const [activeExistingReaction, setActiveExistingReaction] = useState<ReactionLog | null>(null);

  const firstName = data.firstName || 'there';
  const initial = firstName.charAt(0).toUpperCase();

  // Load clean logs from localStorage on mount
  useEffect(() => {
    const logs = getStoredMealLogs();
    setStoredLogs(logs);
  }, []);

  // Compute trigger correlations from the clean data
  const triggerCorrelations = computeTriggerCorrelations(storedLogs);

  // Suggested daily meals
  const suggestedMeals: MealItem[] = dailyMeals ? [
    {
      id: 'suggested-breakfast',
      type: 'BREAKFAST',
      time: dailyMeals.breakfast.time_window,
      name: dailyMeals.breakfast.name,
      status: dailyMeals.breakfast.watch_ingredient ? 'watch' : 'safe',
      description: dailyMeals.breakfast.why_safe + (dailyMeals.breakfast.watch_ingredient ? ` ${dailyMeals.breakfast.watch_ingredient} is marked as 'watch' — log how you feel 1–2 hours after.` : ''),
      ingredients: dailyMeals.breakfast.ingredients,
      icon: <Target className="w-5 h-5" />,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-[#0F6E56]',
      watchLabel: dailyMeals.breakfast.watch_ingredient ? `Watch: ${dailyMeals.breakfast.watch_ingredient}` : undefined
    },
    {
      id: 'suggested-lunch',
      type: 'LUNCH',
      time: dailyMeals.lunch.time_window,
      name: dailyMeals.lunch.name,
      status: dailyMeals.lunch.watch_ingredient ? 'watch' : 'safe',
      description: dailyMeals.lunch.why_safe + (dailyMeals.lunch.watch_ingredient ? ` ${dailyMeals.lunch.watch_ingredient} is marked as 'watch' — log how you feel 1–2 hours after.` : ''),
      ingredients: dailyMeals.lunch.ingredients,
      icon: <Lock className="w-5 h-5" />,
      iconBg: 'bg-amber-50',
      iconColor: 'text-[#BA7517]',
      watchLabel: dailyMeals.lunch.watch_ingredient ? `Watch: ${dailyMeals.lunch.watch_ingredient}` : undefined
    },
    {
      id: 'suggested-dinner',
      type: 'DINNER',
      time: dailyMeals.dinner.time_window,
      name: dailyMeals.dinner.name,
      status: dailyMeals.dinner.watch_ingredient ? 'watch' : 'safe',
      description: dailyMeals.dinner.why_safe + (dailyMeals.dinner.watch_ingredient ? ` ${dailyMeals.dinner.watch_ingredient} is marked as 'watch' — log how you feel 1–2 hours after.` : ''),
      ingredients: dailyMeals.dinner.ingredients,
      icon: <Activity className="w-5 h-5" />,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-[#0F6E56]',
      watchLabel: dailyMeals.dinner.watch_ingredient ? `Watch: ${dailyMeals.dinner.watch_ingredient}` : undefined
    }
  ] : [
    {
      id: 'suggested-breakfast',
      type: 'BREAKFAST',
      time: '7–9 AM',
      name: 'Poha with peanuts & curry leaves',
      status: 'safe',
      description: "Light, familiar, and easy to digest. The tempering uses mustard seeds instead of onion or garlic, directly honoring your flagged triggers.",
      ingredients: ['Flattened rice', 'Peanuts', 'Curry leaves', 'Mustard seeds', 'Turmeric'],
      icon: <Target className="w-5 h-5" />,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-[#0F6E56]'
    },
    {
      id: 'suggested-lunch',
      type: 'LUNCH',
      time: '12–2 PM',
      name: 'Moong dal khichdi + plain raita',
      status: 'watch',
      description: "Khichdi is the gold standard gut-recovery meal — low-FODMAP legume, soft texture, minimal oil. The raita introduces curd. Curd is marked as 'watch' — log how you feel 1–2 hours after.",
      ingredients: ['Yellow moong dal', 'Rice', 'Cumin', 'Ghee', 'Dairy curd'],
      icon: <Lock className="w-5 h-5" />,
      iconBg: 'bg-amber-50',
      iconColor: 'text-[#BA7517]',
      watchLabel: 'Watch: Curd'
    },
    {
      id: 'suggested-dinner',
      type: 'DINNER',
      time: '7–8 PM',
      name: 'Jeera rice + palak with tofu',
      status: 'safe',
      description: "A comforting end to the day. Replaced paneer with tofu to keep this meal completely trigger-safe while still providing clean protein.",
      ingredients: ['Jeera rice', 'Spinach puree', 'Tofu', 'Cumin', 'Olive oil'],
      icon: <Activity className="w-5 h-5" />,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-[#0F6E56]'
    }
  ];

  // Identify previous meal or current suggested meal for 1-tap logging
  const previousMeal = storedLogs.length > 0
    ? {
        name: storedLogs[0].mealName,
        type: storedLogs[0].mealType,
        ingredients: storedLogs[0].ingredients,
        watchIngredient: storedLogs[0].watchIngredient
      }
    : {
        name: suggestedMeals[0].name,
        type: suggestedMeals[0].type.toLowerCase(),
        ingredients: suggestedMeals[0].ingredients,
        watchIngredient: suggestedMeals[0].watchLabel?.replace('Watch: ', '') || null
      };

  // Helper to open reaction modal
  const handleOpenReactionModal = (mealId: string, mealName: string, existing?: ReactionLog | null) => {
    setActiveMealId(mealId);
    setActiveMealName(mealName);
    setActiveExistingReaction(existing || null);
    setReactionModalOpen(true);
  };

  // Called when a new dish is logged from QuickDishLoggerModal
  // CRITICAL FLOW: Dish is logged -> IMMEDIATELY transitions NEXT into 2-tap reaction log!
  const handleDishLogged = (newMealData: Omit<StoredMealLog, 'id' | 'loggedAt'>) => {
    const saved = saveMealLog(newMealData);
    setStoredLogs(prev => [saved, ...prev]);
    setQuickDishLoggerOpen(false);

    // Immediately trigger 2-tap reaction log NEXT!
    setTimeout(() => {
      handleOpenReactionModal(saved.id, saved.mealName, null);
    }, 200);
  };

  // Called when a reaction is saved
  const handleSaveReaction = (reactionPayload: {
    mealId: string;
    severity: ReactionSeverity;
    emoji: string;
    onset: ReactionOnset;
    onsetLabel: string;
    onsetMinutesEstimate: number;
    tags: string[];
    notes?: string;
  }) => {
    // If the meal is one of the suggested meals, make sure it exists in storedLogs
    const existingIndex = storedLogs.findIndex(m => m.id === reactionPayload.mealId);
    
    if (existingIndex === -1) {
      const matchSuggested = suggestedMeals.find(s => s.id === reactionPayload.mealId);
      if (matchSuggested) {
        const newStoredMeal = saveMealLog({
          mealName: matchSuggested.name,
          mealType: matchSuggested.type.toLowerCase() as any,
          timeWindow: matchSuggested.time,
          ingredients: matchSuggested.ingredients || [matchSuggested.name],
          watchIngredient: matchSuggested.watchLabel?.replace('Watch: ', '') || null,
          isTriggerSafe: matchSuggested.status === 'safe',
          source: 'suggested'
        });
        updateMealReaction(newStoredMeal.id, reactionPayload);
      }
    } else {
      updateMealReaction(reactionPayload.mealId, reactionPayload);
    }

    // Refresh logs state
    const refreshed = getStoredMealLogs();
    setStoredLogs(refreshed);
  };

  // Filter logs for display
  const filteredLogs = storedLogs.filter(log => {
    if (selectedFilter === 'all') return true;
    return log.reaction?.severity === selectedFilter;
  });

  return (
    <div className="min-h-screen bg-[#F7FAF8] font-sans pb-28">
      <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
              Good morning, {firstName}
            </h1>
            <p className="text-slate-500 text-sm mb-3">
              Monday, 6 Apr · Day 1 of your gut journey
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E1F5EE] text-[#0F6E56] text-xs font-semibold border border-[#0F6E56]/20">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0F6E56]"></div>
                2-Tap Tracking Active
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white text-slate-600 text-xs font-medium border border-slate-200 shadow-2xs">
                Goal: {data.mainGoal ? data.mainGoal.toLowerCase() : 'identify IBS triggers'}
              </span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-full bg-[#E1F5EE] border border-[#0F6E56]/30 flex items-center justify-center text-[#0F6E56] font-bold text-lg shrink-0 shadow-2xs">
            {initial}
          </div>
        </div>

        {/* Plain simple text in bold as explicitly requested */}
        <div className="mb-6">
          <p className="font-bold text-slate-900 text-base sm:text-lg">
            After each meal , please remember to logged in dish and reaction .
          </p>
        </div>

        {/* Clean Schema Inspector Modal / Accordion */}
        <AnimatePresence>
          {showSchemaInspector && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-slate-900 text-slate-100 rounded-2xl p-5 mb-8 border border-slate-800 shadow-xl overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#0F6E56]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Clean Storage Schema for AI Gut Model
                  </span>
                </div>
                <button 
                  onClick={() => setShowSchemaInspector(false)}
                  className="text-slate-400 hover:text-white text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Every logged dish attaches an exact reaction record with categorical severity, numerical score, digestion onset minutes, and tags:
              </p>
              <pre className="text-[11px] font-mono bg-slate-950 p-3.5 rounded-xl text-emerald-300 overflow-x-auto border border-slate-800/80 leading-relaxed">
{`interface StoredMealLog {
  id: string;               // e.g., "meal-17180293"
  mealName: string;         // "Moong Dal Khichdi"
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  ingredients: string[];    // ['Yellow moong dal', 'Rice', 'Curd']
  watchIngredient?: string; // "Curd"
  loggedAt: string;         // ISO timestamp
  reaction: {
    severity: 'fine' | 'slight' | 'bloating' | 'pain';
    severityScore: 0 | 1 | 2 | 3; // Clean integer for ML
    emoji: '😊' | '😐' | '🎈' | '⚡';
    onset: 'during_meal' | 'within_30m' | '1_2h' | '3_4h' | '6h_plus';
    onsetMinutesEstimate: number; // e.g., 90
    tags: string[];         // ['Bloating with water', 'Allergy flare']
    notes?: string;         // Freeform observations
  }
}`}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Today's Meals with 2-Tap Reaction Log NEXT */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xs font-bold text-slate-700 tracking-wider uppercase">
                Today's Meals
              </h3>
              <p className="text-xs text-slate-500">
                Tap card downward arrow to view meal and log 2-tap reaction
              </p>
            </div>
            <button
              onClick={() => setQuickDishLoggerOpen(true)}
              className="text-xs font-bold text-[#0F6E56] hover:text-[#0b5442] flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E1F5EE] border border-[#0F6E56]/20 transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" /> Add your meal
            </button>
          </div>

          <div className="flex flex-col gap-3 items-center">
            {suggestedMeals.map((meal) => {
              // Find if this meal has a recorded reaction in stored logs
              const matchingStored = storedLogs.find(
                l => l.id === meal.id || l.mealName.toLowerCase() === meal.name.toLowerCase()
              );

              return (
                <MealCard 
                  key={meal.id}
                  id={meal.id}
                  mealType={meal.type}
                  timeWindow={meal.time}
                  mealName={meal.name}
                  ingredients={meal.ingredients}
                  whySafe={meal.description}
                  watchIngredient={meal.status === 'watch' ? meal.watchLabel?.replace('Watch: ', '') || 'Curd' : undefined}
                  icon={meal.icon}
                  iconBg={meal.iconBg}
                  iconColor={meal.iconColor}
                  onOpenReactionModal={(id, name) => handleOpenReactionModal(id, name, matchingStored?.reaction)}
                  onSaveReaction={(reactionPayload) => {
                    handleSaveReaction({
                      mealId: reactionPayload.mealId,
                      severity: reactionPayload.severity,
                      emoji: reactionPayload.emoji,
                      onset: reactionPayload.onset,
                      onsetLabel: reactionPayload.onsetLabel,
                      onsetMinutesEstimate: reactionPayload.onsetMinutesEstimate,
                      tags: reactionPayload.tags || [],
                      notes: reactionPayload.notes
                    });
                    const refreshed = getStoredMealLogs();
                    setStoredLogs(refreshed);
                  }}
                  onOpenCustomMeal={() => setQuickDishLoggerOpen(true)}
                  savedReaction={matchingStored?.reaction}
                  isLogged={Boolean(matchingStored)}
                />
              );
            })}
          </div>
        </div>

        {/* Structured Logs History & Trigger Correlations */}
        <div className="mb-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#0F6E56]" />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Structured Reaction Logs
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Clean dataset trained on your 2-tap responses
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-1">
                {(['all', 'fine', 'slight', 'bloating', 'pain'] as const).map(filter => {
                  const isActive = selectedFilter === filter;
                  const labelMap: Record<string, string> = {
                    all: 'All',
                    fine: '😊 Fine',
                    slight: '😐 Slight',
                    bloating: '🎈 Bloating',
                    pain: '⚡ Pain'
                  };
                  return (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0F6E56] text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {labelMap[filter]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* List of Structured Logs */}
            {filteredLogs.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <p className="text-xs">No logs match this reaction filter.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {filteredLogs.map(log => {
                  const rx = log.reaction;
                  return (
                    <div 
                      key={log.id} 
                      className="p-3.5 bg-[#F7FAF8] border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs font-bold text-slate-900">
                            {log.mealName}
                          </span>
                          <span className="text-[10px] uppercase font-bold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                            {log.mealType}
                          </span>
                          {log.watchIngredient && (
                            <span className="text-[10px] font-bold text-[#BA7517] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              Watch: {log.watchIngredient}
                            </span>
                          )}
                        </div>

                        {log.ingredients && log.ingredients.length > 0 && (
                          <p className="text-[11px] text-slate-500 truncate max-w-md">
                            Ingredients: {log.ingredients.join(', ')}
                          </p>
                        )}

                        {rx?.notes && (
                          <p className="text-xs text-slate-600 italic mt-1 bg-white p-2 rounded-lg border border-slate-100">
                            Note: "{rx.notes}"
                          </p>
                        )}

                        {rx?.tags && rx.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {rx.tags.map(tag => (
                              <span key={tag} className="text-[10px] bg-[#E1F5EE] text-[#0F6E56] font-medium px-2 py-0.5 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Reaction Summary Pill / Button */}
                      <div className="shrink-0 flex items-center gap-2">
                        {rx ? (
                          <button
                            onClick={() => handleOpenReactionModal(log.id, log.mealName, rx)}
                            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs cursor-pointer"
                          >
                            <span className="text-base leading-none">{rx.emoji}</span>
                            <span className="capitalize">{rx.severity}</span>
                            <span className="text-[10px] text-slate-400 font-normal">· {rx.onsetLabel}</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOpenReactionModal(log.id, log.mealName, null)}
                            className="px-3 py-1.5 rounded-xl bg-[#0F6E56] text-white text-xs font-bold hover:bg-[#0b5442] flex items-center gap-1 cursor-pointer"
                          >
                            <Sparkles className="w-3 h-3" /> Log Reaction NEXT
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* AI Pattern Insights Card from Correlations */}
            {triggerCorrelations.length > 0 && (
              <div className="mt-5 p-4 bg-emerald-50/60 border border-[#0F6E56]/20 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#0F6E56] uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Clean Learning Output
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">Real-time inference</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {triggerCorrelations.slice(0, 2).map(c => (
                    <div key={c.ingredient} className="bg-white p-2.5 rounded-lg border border-slate-200">
                      <div className="flex justify-between items-center mb-1">
                        <strong className="text-slate-800">{c.ingredient}</strong>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          c.confidence === 'Suspected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-[#BA7517]'
                        }`}>
                          {c.confidence} ({c.correlationRate}%)
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Primary onset: <strong>{c.primaryOnset}</strong> · {c.bloatingCount} bloating / {c.fineCount} fine
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Watching for your triggers */}
        <TriggerHypothesis data={data} />

        {/* Today's Quick Tips */}
        <div className="mb-8">
          <h3 className="text-xs font-bold text-slate-700 tracking-wider uppercase mb-4">
            Today's Quick Tips
          </h3>
          <div className="flex flex-col gap-3">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex gap-4 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#E1F5EE] text-[#0F6E56] flex items-center justify-center shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-1">Eat at consistent times today</h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Irregular meal timing can trigger symptoms independently of food. Breakfast by 9, lunch by 1, dinner by 7:30.
                </p>
              </div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex gap-4 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#E1F5EE] text-[#0F6E56] flex items-center justify-center shrink-0">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-1">2-tap reaction logging right after</h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Just tap Fine, Slight, Bloating, or Pain, plus when it hit. Structured so AI finds true patterns.
                </p>
              </div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex gap-4 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#BA7517] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-1">Note timing, not just what you ate</h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Reactions that hit 1–2 hours after eating point to small intestine fermentation; reactions within 30 min are gastric.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex gap-3 mb-8 shadow-2xs">
          <Lock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-600 leading-relaxed">
            NutriGen supports personal nutrition decisions — it is not a medical diagnosis tool. If you have severe or worsening symptoms, please consult a gastroenterologist.
          </p>
        </div>

      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-6 py-2 flex justify-between items-center z-50 pb-safe">
        <button className="flex flex-col items-center p-2 text-[#0F6E56] cursor-pointer">
          <Home className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold">Home</span>
        </button>
        
        {/* Floating Log Button - Exactly mapped to CSS selector */}
        <div className="relative -top-6">
          <button 
            onClick={() => setQuickDishLoggerOpen(true)}
            aria-label="Log Dish and Reaction"
            className="w-14 h-14 bg-[#0F6E56] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#0F6E56]/30 hover:bg-[#0b5442] active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-6 h-6" />
          </button>
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-700">
            Log
          </span>
        </div>
        
        <button 
          onClick={() => setShowSchemaInspector(!showSchemaInspector)}
          className="flex flex-col items-center p-2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <LineChart className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Patterns</span>
        </button>
      </div>

      {/* Add your meal Modal with 2-tap reaction and add notes section */}
      <AnimatePresence>
        {quickDishLoggerOpen && (
          <QuickDishLoggerModal
            isOpen={quickDishLoggerOpen}
            onClose={() => setQuickDishLoggerOpen(false)}
            onSaveDishAndReaction={(payload) => {
              const newMeal = saveMealLog({
                mealName: payload.mealName,
                mealType: payload.mealType,
                timeWindow: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                ingredients: payload.ingredients,
                watchIngredient: payload.watchIngredient || null,
                isTriggerSafe: !payload.watchIngredient,
                source: 'manual',
                reaction: null
              });
              if (payload.severity) {
                updateMealReaction(newMeal.id, {
                  severity: payload.severity,
                  emoji: payload.emoji || '😊',
                  onset: payload.onset || '1_2h',
                  onsetLabel: payload.onsetLabel || '1–2 hours',
                  onsetMinutesEstimate: payload.onsetMinutesEstimate || 90,
                  tags: payload.tags || [],
                  notes: payload.notes || ''
                });
              }
              const refreshed = getStoredMealLogs();
              setStoredLogs(refreshed);
            }}
          />
        )}
      </AnimatePresence>

      {/* Step 2: 2-Tap Reaction Modal NEXT */}
      <AnimatePresence>
        {reactionModalOpen && (
          <ReactionModal
            isOpen={reactionModalOpen}
            onClose={() => setReactionModalOpen(false)}
            mealId={activeMealId}
            mealName={activeMealName}
            onSave={handleSaveReaction}
            existingReaction={activeExistingReaction}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
