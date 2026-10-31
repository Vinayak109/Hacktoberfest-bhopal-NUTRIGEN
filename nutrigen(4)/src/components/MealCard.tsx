import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Check, Info, Sparkles, Clock, Tag, Plus, CheckCircle2 } from 'lucide-react';
import { ReactionLog, ReactionSeverity, ReactionOnset } from '../types';

export interface MealCardProps {
  key?: React.Key | null;
  id: string;
  mealType: string;
  timeWindow: string;
  mealName: string;
  ingredients?: string[];
  whySafe: string;
  watchIngredient?: string | null;
  icon?: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
  onOpenReactionModal?: (id: string, name: string) => void;
  onSaveReaction?: (reactionPayload: {
    mealId: string;
    severity: ReactionSeverity;
    emoji: string;
    onset: ReactionOnset;
    onsetLabel: string;
    onsetMinutesEstimate: number;
    tags?: string[];
    notes?: string;
    customMealName?: string;
    customIngredients?: string[];
  }) => void;
  onOpenCustomMeal?: () => void;
  savedReaction?: ReactionLog | null;
  isLogged?: boolean;
}

const REACTION_OPTIONS = [
  {
    key: 'fine' as ReactionSeverity,
    label: 'Fine',
    emoji: '😊',
    subtitle: 'Calm gut',
    score: 0,
    bgLight: 'bg-[#E1F5EE]',
    borderClass: 'border-[#0F6E56]/30',
    textColor: 'text-[#0F6E56]',
    activeBg: 'bg-[#0F6E56] text-white border-[#0F6E56]'
  },
  {
    key: 'slight' as ReactionSeverity,
    label: 'Slight',
    emoji: '😐',
    subtitle: 'Mild rumble',
    score: 1,
    bgLight: 'bg-amber-50',
    borderClass: 'border-[#BA7517]/30',
    textColor: 'text-[#BA7517]',
    activeBg: 'bg-[#BA7517] text-white border-[#BA7517]'
  },
  {
    key: 'bloating' as ReactionSeverity,
    label: 'Bloating',
    emoji: '🎈',
    subtitle: 'Distension',
    score: 2,
    bgLight: 'bg-orange-50',
    borderClass: 'border-orange-300',
    textColor: 'text-orange-700',
    activeBg: 'bg-orange-600 text-white border-orange-600'
  },
  {
    key: 'pain' as ReactionSeverity,
    label: 'Pain',
    emoji: '⚡',
    subtitle: 'Gut cramp',
    score: 3,
    bgLight: 'bg-rose-50',
    borderClass: 'border-rose-300',
    textColor: 'text-rose-700',
    activeBg: 'bg-rose-600 text-white border-rose-600'
  }
];

const ONSET_OPTIONS: { key: ReactionOnset; label: string; minutes: number }[] = [
  { key: 'during_meal', label: 'During meal', minutes: 10 },
  { key: 'within_30m', label: 'Within 30m', minutes: 25 },
  { key: '1_2h', label: '1–2 hours', minutes: 90 },
  { key: '3_4h', label: '3–4 hours', minutes: 210 },
  { key: '6h_plus', label: '6h+ / Next day', minutes: 480 }
];

const QUICK_TAGS = [
  '💧 Bloating with water',
  '⚠️ Suspected allergy',
  '🤒 Sickness / fever',
  '💊 Medication',
  '⚡ High stress',
  '🏃 After workout'
];

export default function MealCard({
  id,
  mealType,
  timeWindow,
  mealName,
  ingredients = [],
  whySafe,
  watchIngredient,
  icon,
  iconBg,
  iconColor,
  onOpenReactionModal,
  onSaveReaction,
  onOpenCustomMeal,
  savedReaction,
  isLogged = false
}: MealCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSeverity, setSelectedSeverity] = useState<ReactionSeverity | null>(savedReaction?.severity || null);
  const [selectedOnset, setSelectedOnset] = useState<ReactionOnset>(savedReaction?.onset || '1_2h');
  const [isSavedJustNow, setIsSavedJustNow] = useState(false);

  useEffect(() => {
    if (savedReaction) {
      setSelectedSeverity(savedReaction.severity);
      setSelectedOnset(savedReaction.onset);
    }
  }, [savedReaction]);

  const hasReaction = Boolean(savedReaction) || isSavedJustNow;

  const handleSaveInline = () => {
    if (!selectedSeverity) return;

    const opt = REACTION_OPTIONS.find(o => o.key === selectedSeverity);
    const onsetObj = ONSET_OPTIONS.find(o => o.key === selectedOnset) || ONSET_OPTIONS[2];

    const payload = {
      mealId: id,
      severity: selectedSeverity,
      emoji: opt ? opt.emoji : '😊',
      onset: selectedOnset,
      onsetLabel: onsetObj.label,
      onsetMinutesEstimate: onsetObj.minutes,
      tags: []
    };

    if (onSaveReaction) {
      onSaveReaction(payload);
    } else if (onOpenReactionModal) {
      onOpenReactionModal(id, mealName);
    }

    setIsSavedJustNow(true);
    setTimeout(() => {
      setIsSavedJustNow(false);
    }, 2500);
  };

  const getReactionBadgeStyle = () => {
    const sev = savedReaction?.severity || selectedSeverity;
    switch (sev) {
      case 'fine':
        return 'bg-[#E1F5EE] text-[#0F6E56] border-[#0F6E56]/30';
      case 'slight':
        return 'bg-amber-50 text-[#BA7517] border-[#BA7517]/30';
      case 'bloating':
        return 'bg-orange-50 text-orange-700 border-orange-300';
      case 'pain':
        return 'bg-rose-50 text-rose-700 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 max-w-xl w-full shadow-sm hover:border-slate-300">
      {/* Header bar clicked to expand */}
      <div 
        className="p-4 flex items-start gap-3 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {icon && (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg} ${iconColor}`}>
            {icon}
          </div>
        )}
        <div className="flex-grow min-w-0 pt-0.5">
          <div className="flex justify-between items-start mb-1 flex-wrap gap-1">
            <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">
              {mealType} · {timeWindow}
            </div>

            <div className="flex items-center gap-1.5">
              {watchIngredient ? (
                <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-[#BA7517]/10 text-[#BA7517] border border-[#BA7517]/20">
                  Watch: {watchIngredient}
                </span>
              ) : (
                <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-[#E1F5EE] text-[#0F6E56] border border-[#0F6E56]/20">
                  Trigger-safe
                </span>
              )}

              {hasReaction && (
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border capitalize ${getReactionBadgeStyle()}`}>
                  <span>{savedReaction?.emoji || REACTION_OPTIONS.find(o => o.key === selectedSeverity)?.emoji}</span>
                  <span>{savedReaction?.severity || selectedSeverity}</span>
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <h4 className="text-[15px] font-bold text-slate-900 leading-tight pr-2">
              {mealName}
            </h4>
            <div className="text-slate-400 shrink-0">
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </div>

          {/* Quick summary line if reaction already recorded */}
          {hasReaction && !isExpanded && (
            <div className="mt-1.5 flex items-center gap-2 text-[11px] text-slate-500">
              <span className="flex items-center gap-1 text-slate-700 font-medium">
                <Clock className="w-3 h-3 text-slate-400" /> {savedReaction?.onsetLabel || 'Recorded'}
              </span>
              {savedReaction?.notes && (
                <span className="truncate max-w-[200px] text-slate-400 italic">
                  · "{savedReaction.notes}"
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Expanded view when downward arrow is clicked */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className={`px-4 pb-4 pt-2 border-t border-slate-100 ${icon ? 'ml-0 sm:ml-12' : ''}`}>
              <p className="text-[13px] text-slate-600 mb-2 leading-relaxed">
                {whySafe}
              </p>

              {ingredients && ingredients.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {ingredients.map(ing => {
                    const isWatch = watchIngredient && ing.toLowerCase().includes(watchIngredient.toLowerCase());
                    return (
                      <span 
                        key={ing} 
                        className={`text-[11px] px-2.5 py-0.5 rounded-md ${
                          isWatch 
                            ? 'bg-[#BA7517]/10 text-[#BA7517] border border-[#BA7517]/20 font-medium' 
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {ing}
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Seamless Meal Confirmation & 2-Tap Reaction Box */}
              <div className="bg-[#F7FAF8] border border-slate-200 rounded-2xl p-3.5 sm:p-4 mb-2">
                {/* 1. Logged in first notification */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#0F6E56] text-white flex items-center justify-center text-xs shrink-0 font-bold">
                      ✓
                    </span>
                    <div>
                      <span className="text-[11px] text-slate-500 block">Logged in first:</span>
                      <strong className="text-xs sm:text-sm font-bold text-slate-900">
                        {mealName}
                      </strong>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#E1F5EE] text-[#0F6E56] border border-[#0F6E56]/20 shrink-0">
                    Active Meal
                  </span>
                </div>

                {/* 2. 2-Tap Reaction prompt */}
                <div className="mb-3">
                  <label className="text-xs font-bold text-slate-800 block mb-1.5">
                    2-Tap Reaction: How did you feel after eating?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {REACTION_OPTIONS.map(opt => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setSelectedSeverity(opt.key)}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedSeverity === opt.key
                            ? `${opt.activeBg} font-bold shadow-xs scale-[1.02]`
                            : `${opt.bgLight} ${opt.borderClass} ${opt.textColor} hover:opacity-90`
                        }`}
                      >
                        <span className="text-xl block mb-0.5">{opt.emoji}</span>
                        <span className="text-xs block font-bold">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* When it hit options */}
                {selectedSeverity && (
                  <div className="mb-3">
                    <label className="text-[11px] font-bold text-slate-600 block mb-1.5">
                      Plus when did it hit?
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {ONSET_OPTIONS.map(onset => (
                        <button
                          key={onset.key}
                          type="button"
                          onClick={() => setSelectedOnset(onset.key)}
                          className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                            selectedOnset === onset.key
                              ? 'bg-[#0F6E56] text-white border-[#0F6E56] font-semibold'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {onset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Save Action - direct logging & reaction */}
                <div className="pt-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={handleSaveInline}
                    disabled={!selectedSeverity}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      selectedSeverity
                        ? 'bg-[#0F6E56] text-white hover:bg-[#0b5442] shadow-xs active:scale-[0.99]'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isSavedJustNow ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                        <span>Saved 2-Tap Reaction!</span>
                      </>
                    ) : selectedSeverity ? (
                      <>
                        <span>Save 2-Tap Reaction ({selectedSeverity.toUpperCase()})</span>
                        <span>{REACTION_OPTIONS.find(o => o.key === selectedSeverity)?.emoji}</span>
                      </>
                    ) : (
                      'Tap reaction above (Fine / Slight / Bloating / Pain)'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
