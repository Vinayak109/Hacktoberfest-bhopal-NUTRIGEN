import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowUpCircle, Plus, User, TrendingUp, ArrowUpRight } from 'lucide-react';
import { OnboardingData } from '../App';

interface Screen8SummaryProps {
  data: OnboardingData;
  onNext: () => void;
  onEdit: () => void;
}

export default function Screen8Summary({ data, onNext, onEdit }: Screen8SummaryProps) {
  const displayName = data.firstName ? `${data.firstName}, your` : 'Your';

  const formatSymptoms = () => {
    const allSymptoms = [...data.symptoms];
    if (data.otherSymptom) {
      allSymptoms.push(data.otherSymptom);
    }
    return allSymptoms.length > 0 ? allSymptoms.join(', ') : 'Not selected';
  };

  const formatTriggers = () => {
    if (data.isNotSure) return 'Help me find out';
    return data.triggers.length > 0 ? data.triggers.join(', ') : 'Not selected';
  };

  const formatCuisines = () => {
    return data.cuisines.length > 0 ? data.cuisines.join(', ') : 'Not selected';
  };

  const formatGoal = () => {
    return data.mainGoal || 'Not selected';
  };

  return (
    <div className="flex-grow bg-[#f8fafc] flex flex-col font-sans">
      <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex-grow flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col items-center"
        >
          <div className="mb-6">
            <Check className="w-10 h-10 text-slate-900" strokeWidth={1.5} />
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 text-center">
            {displayName} NutriGen profile is ready
          </h1>
          <p className="text-base text-slate-600 mb-10 text-center">
            Here's what we know so far. You can always edit this later.
          </p>

          <div className="w-full flex flex-col gap-3 mb-12">
            {/* Symptoms Card */}
            <div className="bg-[#f6f7f4] rounded-2xl p-4 flex items-start gap-4">
              <div className="bg-emerald-100/50 p-2 rounded-lg text-emerald-600 shrink-0 mt-0.5">
                <ArrowUpCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-0.5">Primary symptoms</div>
                <div className="text-slate-900 font-medium">{formatSymptoms()}</div>
              </div>
            </div>

            {/* Triggers Card */}
            <div className="bg-[#f6f7f4] rounded-2xl p-4 flex items-start gap-4">
              <div className="bg-emerald-100/50 p-2 rounded-lg text-emerald-600 shrink-0 mt-0.5">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-0.5">Known triggers to avoid</div>
                <div className="text-slate-900 font-medium">{formatTriggers()}</div>
              </div>
            </div>

            {/* Cuisine Card */}
            <div className="bg-[#f6f7f4] rounded-2xl p-4 flex items-start gap-4">
              <div className="bg-emerald-100/50 p-2 rounded-lg text-emerald-600 shrink-0 mt-0.5">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-0.5">Cuisine preference</div>
                <div className="text-slate-900 font-medium">{formatCuisines()}</div>
              </div>
            </div>

            {/* Goal Card */}
            <div className="bg-[#f6f7f4] rounded-2xl p-4 flex items-start gap-4">
              <div className="bg-emerald-100/50 p-2 rounded-lg text-emerald-600 shrink-0 mt-0.5">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-0.5">Goal</div>
                <div className="text-slate-900 font-medium">{formatGoal()}</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="w-full flex flex-col items-center gap-4">
            <button
              onClick={onNext}
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-slate-300 bg-white text-slate-900 font-semibold text-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              Show me my first meal plan
              <ArrowUpRight className="w-5 h-5" />
            </button>
            <button
              onClick={onEdit}
              className="px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 transition-colors"
            >
              Edit my profile
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
