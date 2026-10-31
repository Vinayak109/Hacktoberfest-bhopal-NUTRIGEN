import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface Screen7GoalProps {
  initialData: { mainGoal: string; microbiomeReport: string };
  onNext: (data: { mainGoal: string; microbiomeReport: string }) => void;
  onBack: (data: { mainGoal: string; microbiomeReport: string }) => void;
}

const MAIN_GOALS = [
  "Find what's causing my digestive issues",
  "Reduce bloating & gas regularly",
  "Build safer eating habits long-term",
  "Manage IBS or a diagnosed condition",
  "Improve my overall gut health",
  "Just eat healthier in general"
];

const MICROBIOME_OPTIONS = [
  "Yes — I have a report",
  "Not yet — maybe later"
];

export default function Screen7Goal({ initialData, onNext, onBack }: Screen7GoalProps) {
  const [mainGoal, setMainGoal] = useState<string>(initialData.mainGoal || '');
  const [microbiomeReport, setMicrobiomeReport] = useState<string>(initialData.microbiomeReport || '');
  const [showTooltip, setShowTooltip] = useState(false);

  const canContinue = mainGoal !== '';

  const handleContinue = () => {
    if (canContinue) {
      onNext({ mainGoal, microbiomeReport });
    }
  };

  const handleBack = () => {
    onBack({ mainGoal, microbiomeReport });
  };

  const handleSkip = () => {
    onNext({ mainGoal: '', microbiomeReport: '' });
  };

  return (
    <div className="flex-grow bg-[#f8fafc] flex flex-col font-sans">
      <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-grow flex flex-col">
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-1.5 rounded-full mb-8 overflow-hidden">
          <div className="bg-emerald-500 h-full rounded-full w-full"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-grow flex flex-col"
        >
          <span className="text-sm font-semibold text-slate-400 tracking-wider uppercase mb-3 block">
            Step 7 of 7
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            What's your main goal?
          </h1>
          <p className="text-lg text-slate-600 mb-10">
            This helps us decide what to show on your dashboard first.
          </p>

          {/* Main Goal Section */}
          <div className="mb-10">
            <div className="flex flex-col gap-3">
              {MAIN_GOALS.map((goal) => {
                const isSelected = mainGoal === goal;
                return (
                  <button
                    key={goal}
                    onClick={() => setMainGoal(goal)}
                    className={`px-5 py-4 rounded-xl text-left text-base font-medium transition-all duration-200 border flex items-center gap-4 ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'
                    }`}>
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    {goal}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Microbiome Section */}
          <div className="mb-10">
            <h2 className="text-sm font-bold text-slate-500 tracking-wider uppercase mb-4">
              DO YOU HAVE A MICROBIOME REPORT? <span className="text-slate-400 normal-case font-normal">(optional)</span>
            </h2>
            <div className="flex flex-wrap gap-3 mb-4">
              {MICROBIOME_OPTIONS.map((option) => {
                const isSelected = microbiomeReport === option;
                return (
                  <button
                    key={option}
                    onClick={() => setMicrobiomeReport(option === microbiomeReport ? '' : option)}
                    className={`px-5 py-3 rounded-full text-base font-medium transition-all duration-200 border ${
                      isSelected
                        ? 'bg-purple-50 border-purple-200 text-purple-700 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
              <button
                onClick={() => setShowTooltip(!showTooltip)}
                className={`px-5 py-3 rounded-full text-base font-medium transition-all duration-200 border ${
                  showTooltip
                    ? 'bg-slate-100 border-slate-300 text-slate-800'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                What's this?
              </button>
            </div>

            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-[#f1f0e8] rounded-xl p-5 text-slate-700 text-base border border-slate-200/60">
                    Microbiome data is an optional advanced layer — it refines suggestions but is never required.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>

        {/* Bottom Navigation */}
        <div className="mt-auto pt-6 pb-8 flex flex-col gap-4 bg-[#f8fafc] sticky bottom-0">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="px-6 py-4 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold text-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <button
              onClick={handleContinue}
              disabled={!canContinue}
              className={`flex-grow py-4 rounded-xl font-semibold text-lg transition-all duration-300 border ${
                canContinue
                  ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50 shadow-sm'
                  : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed text-opacity-50'
              }`}
            >
              See my summary
            </button>
          </div>
          <div className="flex items-center justify-start">
            <button 
              onClick={handleSkip}
              className="px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 font-medium hover:bg-slate-50 transition-colors"
            >
              Skip this step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
