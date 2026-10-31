import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Lock, Sparkles } from 'lucide-react';

interface Screen3FrequencyProps {
  initialData: { frequency: string; timing: string[] };
  onNext: (data: { frequency: string; timing: string[] }) => void;
  onBack: (data: { frequency: string; timing: string[] }) => void;
}

const FREQUENCY_OPTIONS = [
  {
    id: 'everyday',
    title: 'Every single day',
    subtitle: 'Symptoms are a daily part of life right now',
    badge: 'Daily',
    badgeColor: 'bg-red-50 text-red-600 border-red-100',
  },
  {
    id: 'few-times-week',
    title: 'A few times a week',
    subtitle: 'More bad days than good, but not every day',
    badge: 'Frequent',
    badgeColor: 'bg-amber-50 text-amber-600 border-amber-100',
  },
  {
    id: 'once-week',
    title: 'About once a week',
    subtitle: 'A consistent pattern but not overwhelming',
    badge: 'Regular',
    badgeColor: 'bg-amber-50 text-amber-600 border-amber-100',
  },
  {
    id: 'occasionally',
    title: 'Occasionally',
    subtitle: 'Less than once a week, hard to predict',
    badge: 'Mild',
    badgeColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  },
  {
    id: 'rarely',
    title: "Rarely — I'm being proactive",
    subtitle: 'No major issues, just want to eat smarter',
    badge: 'Proactive',
    badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
  },
];

const TIMING_OPTIONS = [
  'Right after eating (within 30 min)',
  '1–2 hours after',
  'Several hours later',
  'Next morning',
  'No clear timing',
  'Completely unpredictable',
];

export default function Screen3Frequency({ initialData, onNext, onBack }: Screen3FrequencyProps) {
  const [frequency, setFrequency] = useState<string | null>(initialData.frequency || null);
  const [timing, setTiming] = useState<string[]>(initialData.timing || []);
  const [showTiming, setShowTiming] = useState(!!initialData.frequency);
  const timingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (frequency && !showTiming) {
      setShowTiming(true);
      // Small delay to allow the DOM to update before scrolling
      setTimeout(() => {
        timingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [frequency, showTiming]);

  const toggleTiming = (option: string) => {
    setTiming(prev => 
      prev.includes(option) 
        ? prev.filter(t => t !== option)
        : [...prev, option]
    );
  };

  const handleContinue = () => {
    if (frequency) {
      onNext({ frequency, timing });
    }
  };

  const handleBack = () => {
    onBack({ frequency: frequency || '', timing });
  };

  // Derived states for notices and hints
  const hasNoClearTiming = timing.includes('No clear timing');
  const hasUnpredictable = timing.includes('Completely unpredictable');
  const showUnpredictableNotice = hasNoClearTiming && hasUnpredictable;

  const hasSeveralHours = timing.includes('Several hours later');
  const hasNextMorning = timing.includes('Next morning');

  // Generate Insight
  let insight = null;
  if (frequency && timing.length > 0) {
    if (frequency === 'rarely') {
      insight = "You're ahead of the curve. We'll help you understand your gut before any patterns become problems.";
    } else if (frequency === 'everyday' && timing.includes('Right after eating (within 30 min)')) {
      insight = "Rapid same-meal reactions point strongly to a specific ingredient. We'll help you pinpoint it within your first week.";
    } else if (frequency === 'few-times-week' && timing.includes('Several hours later')) {
      insight = "Delayed reactions a few times a week are a strong signal of food sensitivity — likely one that accumulates.";
    } else if (hasNoClearTiming || hasUnpredictable) {
      insight = "When symptoms lack a clear pattern, it often means multiple mild triggers are stacking up. We'll untangle them for you.";
    } else {
      insight = "We've noted your pattern. Combining how often this happens with when it hits gives us a strong baseline for your meal plan.";
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-100">
        <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: '42%' }}></div>
      </div>

      <div className="max-w-2xl mx-auto w-full px-6 pt-8 pb-32 flex-grow flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <span className="text-slate-400 font-medium tracking-wide">Step 3 of 7</span>
          <span className="text-slate-400 font-medium tracking-wide">Frequency & timing</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-grow"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            How often do symptoms happen?
          </h1>
          <p className="text-slate-500 mb-8 text-lg">
            No right or wrong answer — just pick the closest one.
          </p>

          {/* Frequency Radio Cards */}
          <div className="flex flex-col gap-3 mb-8">
            {FREQUENCY_OPTIONS.map((option) => {
              const isSelected = frequency === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => setFrequency(option.id)}
                  className={`relative w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/30'
                      : 'border-slate-100 hover:border-emerald-200 hover:bg-slate-50'
                  }`}
                >
                  {/* Radio Circle */}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 shrink-0 transition-colors ${
                    isSelected ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'
                  }`}>
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>

                  {/* Content */}
                  <div className="flex-grow pr-4">
                    <div className="text-lg font-bold text-slate-900 mb-0.5">{option.title}</div>
                    <div className="text-slate-500 text-sm">{option.subtitle}</div>
                  </div>

                  {/* Badge */}
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border ${option.badgeColor}`}>
                    {option.badge}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Progressive Reveal: Timing Section */}
          <div 
            ref={timingRef}
            className={`transition-all duration-400 ease-in-out overflow-hidden ${
              showTiming ? 'max-h-[1000px] opacity-100 mt-12' : 'max-h-0 opacity-0 mt-0'
            }`}
          >
            {/* Divider */}
            <div className="relative flex items-center py-5 mb-8">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink-0 mx-4 text-slate-400 text-sm font-medium uppercase tracking-wider">
                when does it hit?
              </span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              {TIMING_OPTIONS.map((option) => {
                const isSelected = timing.includes(option);
                return (
                  <button
                    key={option}
                    onClick={() => toggleTiming(option)}
                    className={`relative py-3 px-5 rounded-full border text-center transition-all duration-200 flex items-center justify-center text-[15px] ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-medium'
                        : 'border-slate-200 text-slate-700 hover:border-emerald-200 hover:bg-slate-50'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center mr-2 shrink-0">
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      </div>
                    )}
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Clinical Hints */}
            <AnimatePresence>
              {(hasSeveralHours || hasNextMorning) && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 space-y-2"
                >
                  {hasSeveralHours && (
                    <p className="text-sm text-slate-500 flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      Reactions several hours later are often linked to high-FODMAP foods or slow gut transit — harder to self-diagnose, but NutriGen tracks this.
                    </p>
                  )}
                  {hasNextMorning && (
                    <p className="text-sm text-slate-500 flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      Morning-after symptoms often trace back to dinner — we'll pay special attention to your evening meals.
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Unpredictable Notice */}
            <AnimatePresence>
              {showUnpredictableNotice && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="mb-8 p-4 rounded-xl flex items-start gap-3 border bg-purple-50 border-purple-100 text-purple-800"
                >
                  <Check className="w-5 h-5 shrink-0 mt-0.5 text-purple-600" />
                  <p className="text-[15px] leading-relaxed">
                    Selecting both is completely valid — many people with gut issues genuinely can't predict when symptoms will hit. We track everything.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Insight Card */}
            <AnimatePresence>
              {insight && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-8 p-5 rounded-2xl bg-emerald-50 border border-emerald-100"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <span className="font-bold text-emerald-900 mr-2">What this tells us:</span>
                      <span className="text-emerald-800 leading-relaxed">{insight}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Privacy Note */}
          <div className="bg-slate-50 rounded-xl p-4 flex items-start gap-3 border border-slate-100 mt-8">
            <Lock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-500 leading-relaxed">
              Your frequency and timing data stays in your private profile only.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 sm:p-6 z-10">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="px-6 py-3 rounded-xl font-medium text-slate-600 hover:bg-slate-50 transition-colors flex items-center border border-slate-200 bg-white"
          >
            <span className="mr-2">←</span> Back
          </button>
          <button 
            onClick={handleContinue}
            disabled={!frequency}
            className={`px-10 py-3.5 rounded-xl font-bold text-lg transition-all duration-300 min-w-[160px] ${
              frequency 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200 transform hover:-translate-y-0.5' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
