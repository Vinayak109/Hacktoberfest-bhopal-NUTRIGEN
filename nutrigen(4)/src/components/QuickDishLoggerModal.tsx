import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Check, Utensils, Clock, Tag, PlusCircle, AlertCircle } from 'lucide-react';
import { ReactionSeverity, ReactionOnset } from '../types';

interface QuickDishLoggerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveDishAndReaction: (data: {
    mealName: string;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    ingredients: string[];
    watchIngredient?: string | null;
    severity?: ReactionSeverity | null;
    emoji?: string;
    onset?: ReactionOnset;
    onsetLabel?: string;
    onsetMinutesEstimate?: number;
    tags?: string[];
    notes?: string;
  }) => void;
}

const REACTION_OPTIONS = [
  {
    key: 'fine' as ReactionSeverity,
    label: 'Fine',
    emoji: '😊',
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
  '⚡ High stress meal',
  '🏃 After workout'
];

export default function QuickDishLoggerModal({
  isOpen,
  onClose,
  onSaveDishAndReaction
}: QuickDishLoggerModalProps) {
  const [mealName, setMealName] = useState('');
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('lunch');
  const [ingredientsText, setIngredientsText] = useState('');
  
  // 2-Tap Reaction (optional or selected)
  const [selectedSeverity, setSelectedSeverity] = useState<ReactionSeverity | null>(null);
  const [selectedOnset, setSelectedOnset] = useState<ReactionOnset>('1_2h');

  // Add notes section (allergies, bloating with water, sickness)
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [notesText, setNotesText] = useState('');

  // Default meal type based on hour
  useEffect(() => {
    if (isOpen) {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 11) {
        setMealType('breakfast');
      } else if (hour >= 11 && hour < 16) {
        setMealType('lunch');
      } else if (hour >= 16 && hour < 19) {
        setMealType('snack');
      } else {
        setMealType('dinner');
      }
      setMealName('');
      setIngredientsText('');
      setSelectedSeverity(null);
      setSelectedOnset('1_2h');
      setSelectedTags([]);
      setNotesText('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = mealName.trim();
    if (!trimmedName) return;

    const opt = selectedSeverity ? REACTION_OPTIONS.find(o => o.key === selectedSeverity) : null;
    const onsetObj = ONSET_OPTIONS.find(o => o.key === selectedOnset) || ONSET_OPTIONS[2];
    const ingredients = ingredientsText.trim()
      ? ingredientsText.split(',').map(s => s.trim()).filter(Boolean)
      : [trimmedName];

    onSaveDishAndReaction({
      mealName: trimmedName,
      mealType,
      ingredients,
      severity: selectedSeverity,
      emoji: opt ? opt.emoji : undefined,
      onset: selectedSeverity ? selectedOnset : undefined,
      onsetLabel: selectedSeverity ? onsetObj.label : undefined,
      onsetMinutesEstimate: selectedSeverity ? onsetObj.minutes : undefined,
      tags: selectedTags,
      notes: notesText.trim()
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div
        initial={{ y: '100%', opacity: 0.8 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-100"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-[#F7FAF8] sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#E1F5EE] text-[#0F6E56] flex items-center justify-center font-bold">
              <PlusCircle className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">
                Add your meal
              </h2>
              <p className="text-[11px] text-slate-500">
                Log what you ate, 2-tap reaction & notes
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-5 sm:p-6 overflow-y-auto space-y-4">
          
          {/* Meal Category */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Meal Time
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setMealType(t)}
                  className={`py-2 text-xs rounded-xl font-bold capitalize border transition-all cursor-pointer ${
                    mealType === t 
                      ? 'bg-[#0F6E56] text-white border-[#0F6E56] shadow-xs' 
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Dish Name Input */}
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1.5">
              What did you eat? <span className="text-[#0F6E56]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                placeholder="e.g. Moong Dal Khichdi, Oats bowl, Steamed Idli..."
                className="w-full bg-[#F7FAF8] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F6E56] focus:border-[#0F6E56]"
              />
            </div>
          </div>

          {/* Ingredients Input */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Key Ingredients <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={ingredientsText}
              onChange={(e) => setIngredientsText(e.target.value)}
              placeholder="e.g. Moong dal, rice, cumin, ghee"
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0F6E56]"
            />
          </div>

          {/* 2-Tap Reaction Selector */}
          <div className="pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-800 block mb-1">
              2-Tap Reaction: How did you feel?
            </label>
            <p className="text-[11px] text-slate-500 mb-2">
              Fine / Slight / Bloating / Pain
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {REACTION_OPTIONS.map(opt => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setSelectedSeverity(opt.key)}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedSeverity === opt.key
                      ? `${opt.activeBg} font-bold shadow-xs scale-[1.02]`
                      : `${opt.bgLight} ${opt.borderClass} ${opt.textColor} hover:opacity-90`
                  }`}
                >
                  <span className="text-2xl block mb-0.5">{opt.emoji}</span>
                  <span className="text-xs font-bold block">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* When it hit options */}
          {selectedSeverity && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-1.5"
            >
              <label className="text-[11px] font-bold text-slate-700 block">
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
                        ? 'bg-[#0F6E56] text-white border-[#0F6E56] font-bold'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {onset.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Section: Add notes */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#0F6E56]" />
              <label className="text-xs font-bold text-slate-800">
                Add notes
              </label>
              <span className="text-[11px] text-slate-400">
                (allergies, bloating with water, sickness)
              </span>
            </div>

            {/* Quick symptom tags */}
            <div className="flex flex-wrap gap-1">
              {QUICK_TAGS.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                    selectedTags.includes(tag)
                      ? 'bg-[#E1F5EE] border-[#0F6E56] text-[#0F6E56] font-bold'
                      : 'bg-[#F7FAF8] border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <textarea
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="Tell us anything else: e.g. allergies, sickness, bloating after cold water..."
              rows={2}
              className="w-full bg-[#F7FAF8] border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0F6E56] resize-none"
            />
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!mealName.trim()}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs ${
                mealName.trim()
                  ? 'bg-[#0F6E56] text-white hover:bg-[#0b5442] cursor-pointer active:scale-[0.99]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>
                {selectedSeverity
                  ? `Save ${mealName.trim() || 'Meal'} (${selectedSeverity.toUpperCase()} ${REACTION_OPTIONS.find(o => o.key === selectedSeverity)?.emoji})`
                  : `Save ${mealName.trim() || 'Meal'}`}
              </span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
