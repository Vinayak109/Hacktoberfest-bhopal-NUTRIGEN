import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface Screen6CuisineProps {
  initialData: { cuisines: string[]; cookingFrequency: string; budget: string };
  onNext: (data: { cuisines: string[]; cookingFrequency: string; budget: string }) => void;
  onBack: (data: { cuisines: string[]; cookingFrequency: string; budget: string }) => void;
}

const CUISINES = [
  'Indian', 'South Indian',
  'Mediterranean', 'Japanese',
  'Chinese', 'Thai',
  'Italian', 'Mexican',
  'Middle Eastern', 'Korean',
  'Continental', 'Mix of everything'
];

const COOKING_FREQUENCIES = [
  'Every day', 'A few times a week',
  'Rarely — mostly eat out', 'Mix of both'
];

const BUDGETS = [
  'Under ₹100', '₹100–₹300', '₹300–₹600', '₹600+', 'Flexible'
];

export default function Screen6Cuisine({ initialData, onNext, onBack }: Screen6CuisineProps) {
  const [cuisines, setCuisines] = useState<string[]>(initialData.cuisines || []);
  const [cookingFrequency, setCookingFrequency] = useState<string>(initialData.cookingFrequency || '');
  const [budget, setBudget] = useState<string>(initialData.budget || '');

  const toggleCuisine = (cuisine: string) => {
    if (cuisine === 'Mix of everything') {
      setCuisines(['Mix of everything']);
      return;
    }

    let newCuisines = cuisines.filter(c => c !== 'Mix of everything');
    if (newCuisines.includes(cuisine)) {
      newCuisines = newCuisines.filter(c => c !== cuisine);
    } else {
      newCuisines = [...newCuisines, cuisine];
    }
    setCuisines(newCuisines);
  };

  const canContinue = cuisines.length > 0 && cookingFrequency !== '' && budget !== '';

  const handleContinue = () => {
    if (canContinue) {
      onNext({ cuisines, cookingFrequency, budget });
    }
  };

  const handleBack = () => {
    onBack({ cuisines, cookingFrequency, budget });
  };

  return (
    <div className="flex-grow bg-[#f8fafc] flex flex-col font-sans">
      <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-grow flex flex-col">
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-1.5 rounded-full mb-8 overflow-hidden">
          <div className="bg-emerald-500 h-full rounded-full w-[85%]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-grow flex flex-col"
        >
          <span className="text-sm font-semibold text-slate-400 tracking-wider uppercase mb-3 block">
            Step 6 of 7
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            What kind of food do you enjoy?
          </h1>
          <p className="text-lg text-slate-600 mb-10">
            Your safe meals should still taste like food you love.
          </p>

          {/* Cuisines Section */}
          <div className="mb-10">
            <div className="grid grid-cols-2 gap-3">
              {CUISINES.map((cuisine) => {
                const isSelected = cuisines.includes(cuisine);
                return (
                  <button
                    key={cuisine}
                    onClick={() => toggleCuisine(cuisine)}
                    className={`px-5 py-4 rounded-xl text-left text-base font-medium transition-all duration-200 border ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {cuisine}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cooking Frequency Section */}
          <div className="mb-10">
            <h2 className="text-sm font-bold text-slate-500 tracking-wider uppercase mb-4">
              HOW OFTEN DO YOU COOK AT HOME?
            </h2>
            <div className="flex flex-wrap gap-3">
              {COOKING_FREQUENCIES.map((freq) => {
                const isSelected = cookingFrequency === freq;
                return (
                  <button
                    key={freq}
                    onClick={() => setCookingFrequency(freq)}
                    className={`px-5 py-3 rounded-full text-base font-medium transition-all duration-200 border ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {freq}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget Section */}
          <div className="mb-10">
            <h2 className="text-sm font-bold text-slate-500 tracking-wider uppercase mb-4">
              ROUGH BUDGET PER MEAL
            </h2>
            <div className="flex flex-wrap gap-3">
              {BUDGETS.map((b) => {
                const isSelected = budget === b;
                return (
                  <button
                    key={b}
                    onClick={() => setBudget(b)}
                    className={`px-5 py-3 rounded-full text-base font-medium transition-all duration-200 border ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>

        </motion.div>

        {/* Bottom Navigation */}
        <div className="mt-auto pt-6 pb-8 flex items-center gap-4 bg-[#f8fafc] sticky bottom-0">
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
      </div>
    </div>
  );
}
