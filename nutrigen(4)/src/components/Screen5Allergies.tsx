import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Lock } from 'lucide-react';

interface Screen5AllergiesProps {
  initialData: { allergies: string[]; dietaryPreferences: string[] };
  onNext: (data: { allergies: string[]; dietaryPreferences: string[] }) => void;
  onBack: (data: { allergies: string[]; dietaryPreferences: string[] }) => void;
}

const ALLERGIES = [
  'Peanuts', 'Tree nuts', 'Shellfish', 'Fish', 'Soy',
  'Eggs', 'Wheat (celiac)', 'Sesame', 'None'
];

const DIETARY_PREFERENCES = [
  'Vegetarian', 'Vegan', 'Halal', 'Kosher', 'Jain',
  'No pork', 'No beef', 'No restrictions'
];

export default function Screen5Allergies({ initialData, onNext, onBack }: Screen5AllergiesProps) {
  const [allergies, setAllergies] = useState<string[]>(initialData.allergies || []);
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>(initialData.dietaryPreferences || []);

  const toggleAllergy = (allergy: string) => {
    if (allergy === 'None') {
      setAllergies(['None']);
      return;
    }
    
    let newAllergies = allergies.filter(a => a !== 'None');
    if (newAllergies.includes(allergy)) {
      newAllergies = newAllergies.filter(a => a !== allergy);
    } else {
      newAllergies = [...newAllergies, allergy];
    }
    setAllergies(newAllergies);
  };

  const togglePreference = (pref: string) => {
    if (pref === 'No restrictions') {
      setDietaryPreferences(['No restrictions']);
      return;
    }

    let newPrefs = dietaryPreferences.filter(p => p !== 'No restrictions');
    if (newPrefs.includes(pref)) {
      newPrefs = newPrefs.filter(p => p !== pref);
    } else {
      newPrefs = [...newPrefs, pref];
    }
    setDietaryPreferences(newPrefs);
  };

  const canContinue = allergies.length > 0 && dietaryPreferences.length > 0;

  const handleContinue = () => {
    if (canContinue) {
      onNext({ allergies, dietaryPreferences });
    }
  };

  const handleBack = () => {
    onBack({ allergies, dietaryPreferences });
  };

  const handleSkip = () => {
    onNext({ allergies: [], dietaryPreferences: [] });
  };

  return (
    <div className="flex-grow bg-[#f8fafc] flex flex-col font-sans">
      <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-grow flex flex-col">
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-1.5 rounded-full mb-8 overflow-hidden">
          <div className="bg-emerald-500 h-full rounded-full w-[71%]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-grow flex flex-col"
        >
          <span className="text-sm font-semibold text-slate-400 tracking-wider uppercase mb-3 block">
            Step 5 of 7
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Any hard rules or allergies?
          </h1>
          <p className="text-lg text-slate-600 mb-10">
            These will never appear in your suggestions — no exceptions.
          </p>

          {/* Allergies Section */}
          <div className="mb-10">
            <h2 className="text-sm font-bold text-slate-500 tracking-wider uppercase mb-4">
              ALLERGIES
            </h2>
            <div className="flex flex-wrap gap-3">
              {ALLERGIES.map((allergy) => {
                const isSelected = allergies.includes(allergy);
                return (
                  <button
                    key={allergy}
                    onClick={() => toggleAllergy(allergy)}
                    className={`px-5 py-3 rounded-full text-base font-medium transition-all duration-200 border ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {allergy}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dietary Preferences Section */}
          <div className="mb-10">
            <h2 className="text-sm font-bold text-slate-500 tracking-wider uppercase mb-4">
              DIETARY PREFERENCES
            </h2>
            <div className="flex flex-wrap gap-3">
              {DIETARY_PREFERENCES.map((pref) => {
                const isSelected = dietaryPreferences.includes(pref);
                return (
                  <button
                    key={pref}
                    onClick={() => togglePreference(pref)}
                    className={`px-5 py-3 rounded-full text-base font-medium transition-all duration-200 border ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {pref}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Privacy Note */}
          <div className="bg-slate-50 rounded-xl p-4 flex items-start gap-3 border border-slate-200 mb-8">
            <Lock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-500 leading-relaxed">
              Allergy data is stored locally on your account only and never shared.
            </p>
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
                  : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Continue
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
