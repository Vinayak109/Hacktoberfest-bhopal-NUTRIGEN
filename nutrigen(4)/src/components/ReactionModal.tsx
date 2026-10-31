import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Clock, Sparkles, Tag, ShieldCheck, AlertCircle } from 'lucide-react';
import { ReactionSeverity, ReactionOnset, ReactionLog } from '../types';

interface ReactionModalProps {
  mealId: string;
  mealName: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (reactionData: {
    mealId: string;
    severity: ReactionSeverity;
    emoji: string;
    onset: ReactionOnset;
    onsetLabel: string;
    onsetMinutesEstimate: number;
    tags: string[];
    notes?: string;
  }) => void;
  existingReaction?: ReactionLog | null;
}

interface ReactionOption {
  key: ReactionSeverity;
  label: string;
  emoji: string;
  subtitle: string;
  score: number;
  bgLight: string;
  borderClass: string;
  activeRing: string;
  textColor: string;
  activeBg: string;
}

const REACTION_OPTIONS: ReactionOption[] = [
  {
    key: 'fine',
    label: 'Fine',
    emoji: '😊',
    subtitle: 'Calm gut, zero symptoms',
    score: 0,
    bgLight: 'bg-[#E1F5EE]',
    borderClass: 'border-[#0F6E56]/30',
    activeRing: 'ring-2 ring-[#0F6E56]',
    textColor: 'text-[#0F6E56]',
    activeBg: 'bg-[#0F6E56] text-white'
  },
  {
    key: 'slight',
    label: 'Slight',
    emoji: '😐',
    subtitle: 'Mild rumble or slight discomfort',
    score: 1,
    bgLight: 'bg-amber-50',
    borderClass: 'border-[#BA7517]/30',
    activeRing: 'ring-2 ring-[#BA7517]',
    textColor: 'text-[#BA7517]',
    activeBg: 'bg-[#BA7517] text-white'
  },
  {
    key: 'bloating',
    label: 'Bloating',
    emoji: '🎈',
    subtitle: 'Distended stomach or tightness',
    score: 2,
    bgLight: 'bg-orange-50',
    borderClass: 'border-orange-300',
    activeRing: 'ring-2 ring-orange-500',
    textColor: 'text-orange-700',
    activeBg: 'bg-orange-600 text-white'
  },
  {
    key: 'pain',
    label: 'Pain',
    emoji: '⚡',
    subtitle: 'Sharp cramp, spasm or gut ache',
    score: 3,
    bgLight: 'bg-rose-50',
    borderClass: 'border-rose-300',
    activeRing: 'ring-2 ring-rose-500',
    textColor: 'text-rose-700',
    activeBg: 'bg-rose-600 text-white'
  }
];

interface OnsetOption {
  key: ReactionOnset;
  label: string;
  description: string;
  minutes: number;
}

const ONSET_OPTIONS: OnsetOption[] = [
  { key: 'during_meal', label: 'During meal', description: 'Immediate reflex', minutes: 10 },
  { key: 'within_30m', label: 'Within 30 min', description: 'Gastric phase', minutes: 25 },
  { key: '1_2h', label: '1–2 hours', description: 'Small intestine', minutes: 90 },
  { key: '3_4h', label: '3–4 hours', description: 'Fermentation', minutes: 210 },
  { key: '6h_plus', label: '6h+ / Next morning', description: 'Delayed transit', minutes: 480 }
];

const PRESET_NOTE_TAGS = [
  '💧 Bloating with water',
  '⚠️ Suspected allergy',
  '🤒 Sickness / fever',
  '💊 Took medication',
  '⚡ High stress meal',
  '🏃 After workout'
];

export default function ReactionModal({
  mealId,
  mealName,
  isOpen,
  onClose,
  onSave,
  existingReaction
}: ReactionModalProps) {
  const [selectedSeverity, setSelectedSeverity] = useState<ReactionSeverity | null>(null);
  const [selectedOnset, setSelectedOnset] = useState<ReactionOnset | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [showNoteDetails, setShowNoteDetails] = useState(false);
  const [showCustomMeal, setShowCustomMeal] = useState(false);
  const [customMealName, setCustomMealName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);

  // Initialize or reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setShowCustomMeal(false);
      setCustomMealName('');
      if (existingReaction) {
        setSelectedSeverity(existingReaction.severity);
        setSelectedOnset(existingReaction.onset);
        setSelectedTags(existingReaction.tags || []);
        setNote(existingReaction.notes || '');
        setShowNoteDetails(Boolean(existingReaction.notes || (existingReaction.tags && existingReaction.tags.length > 0)));
      } else {
        setSelectedSeverity(null);
        setSelectedOnset(null);
        setSelectedTags([]);
        setNote('');
        setShowNoteDetails(false);
      }
      setIsSubmitting(false);
      setIsSavedSuccess(false);
    }
  }, [isOpen, existingReaction]);

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const currentOption = REACTION_OPTIONS.find(o => o.key === selectedSeverity);
  const currentOnsetObj = ONSET_OPTIONS.find(o => o.key === selectedOnset);

  // Ready to save once severity (Tap 1) and onset (Tap 2) are chosen
  const isReadyToSave = selectedSeverity !== null && selectedOnset !== null;

  const handleSave = () => {
    if (!selectedSeverity || !selectedOnset || !currentOption || !currentOnsetObj) return;

    setIsSubmitting(true);

    const reactionPayload = {
      mealId,
      severity: selectedSeverity,
      emoji: currentOption.emoji,
      onset: selectedOnset,
      onsetLabel: currentOnsetObj.label,
      onsetMinutesEstimate: currentOnsetObj.minutes,
      tags: selectedTags,
      notes: (showCustomMeal && customMealName.trim() ? `[Custom meal: ${customMealName.trim()}] ` : '') + note.trim()
    };

    setTimeout(() => {
      setIsSavedSuccess(true);
      setTimeout(() => {
        onSave(reactionPayload);
        onClose();
      }, 900);
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm transition-all">
      <motion.div
        initial={{ y: '100%', opacity: 0.8 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-100"
      >
        {/* Top Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-[#F7FAF8] sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-[#E1F5EE] text-[#0F6E56]">
              <Sparkles className="w-3.5 h-3.5" /> 2-Tap Reaction Log NEXT
            </span>
          </div>

          <div className="w-10 h-1 bg-slate-300 rounded-full sm:hidden"></div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSavedSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 flex flex-col items-center justify-center text-center my-auto min-h-[360px]"
          >
            <div className="w-16 h-16 bg-[#E1F5EE] text-[#0F6E56] rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-[#0F6E56]/20">
              <Check className="w-9 h-9 stroke-[2.5]" />
            </div>
            <div className="text-3xl mb-1">{currentOption?.emoji}</div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              {currentOption?.label} logged in 2 taps
            </h3>
            <p className="text-sm text-slate-600 max-w-xs mb-3">
              Noted at <strong className="text-slate-800">{currentOnsetObj?.label}</strong>. Stored in clean structured schema for AI gut pattern correlation.
            </p>
            <div className="inline-flex items-center gap-1 text-[11px] text-[#0F6E56] font-medium bg-[#E1F5EE] px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" /> Clean dataset updated
            </div>
          </motion.div>
        ) : (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
            {/* Meal Title Context with Logged in first */}
            <div className="bg-[#E1F5EE]/60 border border-[#0F6E56]/20 rounded-2xl p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#0F6E56] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  ✓
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-[#0F6E56] block">Logged in first:</span>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    {mealName}
                  </h3>
                </div>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white text-[#0F6E56] border border-[#0F6E56]/20">
                Ready for Reaction
              </span>
            </div>

            {/* TAP 1: 4 Reactions with Dedicated Emojis */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#0F6E56] text-white flex items-center justify-center text-[10px]">1</span>
                  Select Reaction: Fine / Slight / Bloating / Pain
                </label>
                {selectedSeverity && (
                  <span className="text-xs font-bold text-[#0F6E56] bg-[#E1F5EE] px-2 py-0.5 rounded">
                    Selected ✓
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {REACTION_OPTIONS.map((opt) => {
                  const isSelected = selectedSeverity === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => {
                        setSelectedSeverity(opt.key);
                        // If no onset chosen yet, keep focus clean
                      }}
                      className={`relative flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all text-center group cursor-pointer ${
                        isSelected
                          ? `${opt.activeBg} shadow-md scale-[1.02] border-transparent`
                          : `bg-white ${opt.borderClass} hover:bg-slate-50 text-slate-700`
                      }`}
                    >
                      <span className="text-3xl sm:text-4xl leading-none mb-1.5 group-hover:scale-110 transition-transform">
                        {opt.emoji}
                      </span>
                      <span className={`text-sm font-bold tracking-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {opt.label}
                      </span>
                      <span className={`text-[10px] mt-0.5 leading-tight ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                        {opt.subtitle}
                      </span>

                      {isSelected && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white/30 text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TAP 2: When it hit */}
            <AnimatePresence>
              {selectedSeverity && (
                <motion.div
                  initial={{ opacity: 0, y: 12, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="pt-2 border-t border-slate-100"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#0F6E56] text-white flex items-center justify-center text-[10px]">2</span>
                      When did it hit?
                    </label>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Digestion window
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {ONSET_OPTIONS.map((onset) => {
                      const isSelected = selectedOnset === onset.key;
                      return (
                        <button
                          key={onset.key}
                          type="button"
                          onClick={() => setSelectedOnset(onset.key)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-slate-900 text-white border-slate-900 shadow-sm ring-2 ring-slate-900/10'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                            {onset.label}
                          </div>
                          <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                            {onset.description}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom items explicitly requested:
                1). add notes
                2). add the meal yourself and show the reaction with that */}
            <div className="pt-2 border-t border-slate-100 space-y-2.5">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowNoteDetails(!showNoteDetails)}
                  className="text-xs font-bold text-[#0F6E56] hover:text-[#0b5442] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>{showNoteDetails ? '▼' : '▶'} 1). add notes</span>
                  <span className="text-[11px] text-slate-400 font-normal">(allergies, bloating with water, sickness)</span>
                </button>
                <span className="text-[11px] text-slate-400">Optional</span>
              </div>

                {showNoteDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 space-y-3"
                  >
                    {/* Quick Preset Tags */}
                    <div>
                      <span className="text-[11px] font-medium text-slate-500 block mb-1.5">
                        Quick tags:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {PRESET_NOTE_TAGS.map((tag) => {
                          const isTagActive = selectedTags.includes(tag);
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => toggleTag(tag)}
                              className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                                isTagActive
                                  ? 'bg-[#E1F5EE] border-[#0F6E56] text-[#0F6E56] font-semibold'
                                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                              }`}
                            >
                              {tag}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Freeform Notes Input */}
                    <div>
                      <div className="relative">
                        <textarea
                          value={note}
                          onChange={(e) => setNote(e.target.value.slice(0, 140))}
                          placeholder="Tell us anything else: e.g. severe bloating right after drinking cold water, fever/sickness, lactose allergy flair..."
                          rows={2}
                          className="w-full bg-[#F7FAF8] border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F6E56]/20 focus:border-[#0F6E56] resize-none"
                        />
                        <div className="text-[10px] text-slate-400 text-right mt-0.5">
                          {note.length}/140 chars
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

              {/* 2). add the meal yourself and show the reaction with that */}
              <div className="bg-amber-50/50 border border-amber-200/80 rounded-xl p-3">
                <button
                  type="button"
                  onClick={() => setShowCustomMeal(!showCustomMeal)}
                  className="w-full flex items-center justify-between text-left text-xs font-bold text-[#BA7517] hover:text-[#945d12] cursor-pointer"
                >
                  <span>2). add the meal yourself and show the reaction with that</span>
                  <span>{showCustomMeal ? '▲' : '▼'}</span>
                </button>

                {showCustomMeal && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-2.5 pt-2 border-t border-amber-200/60"
                  >
                    <label className="text-[11px] font-bold text-amber-900 block mb-1">
                      Custom Dish Name:
                    </label>
                    <input
                      type="text"
                      value={customMealName}
                      onChange={(e) => setCustomMealName(e.target.value)}
                      placeholder="e.g. Yellow Dal Khichdi, Oats bowl..."
                      className="w-full bg-white border border-amber-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Bottom Actions & Clean Storage Schema Notice */}
            <div className="pt-2">
              <button
                type="button"
                disabled={!isReadyToSave || isSubmitting}
                onClick={handleSave}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-sm ${
                  isReadyToSave && !isSubmitting
                    ? 'bg-[#0F6E56] text-white hover:bg-[#0b5442] active:scale-[0.99] cursor-pointer'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                }`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : !selectedSeverity ? (
                  'Select Fine / Slight / Bloating / Pain above'
                ) : !selectedOnset ? (
                  'Select when it hit to complete 2-tap log'
                ) : (
                  <>
                    <span>Save 2-Tap Reaction</span>
                    <span className="text-base">{currentOption?.emoji}</span>
                  </>
                )}
              </button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0F6E56]" />
                <span>Structured data schema: clean enough for AI to learn from without noise.</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
