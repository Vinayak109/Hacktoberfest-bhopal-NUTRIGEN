import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Check } from 'lucide-react';

interface Screen4TriggersProps {
  initialData: { triggers: string[]; isNotSure: boolean };
  onNext: (data: { triggers: string[]; isNotSure: boolean }) => void;
  onBack: (data: { triggers: string[]; isNotSure: boolean }) => void;
}

const CATEGORIES = [
  {
    name: 'DAIRY & EGGS',
    options: ['Milk / dairy', 'Cheese', 'Eggs']
  },
  {
    name: 'GRAINS',
    options: ['Gluten / wheat', 'White rice', 'Oats']
  },
  {
    name: 'VEGETABLES',
    options: ['Onions & garlic', 'Broccoli / cabbage', 'Beans & lentils']
  },
  {
    name: 'DRINKS & OTHER',
    options: ['Spicy food', 'Fried / oily food', 'Coffee', 'Alcohol', 'Carbonated drinks', 'Artificial sweeteners']
  }
];

export default function Screen4Triggers({ initialData, onNext, onBack }: Screen4TriggersProps) {
  const [selectedFoods, setSelectedFoods] = useState<string[]>(initialData.triggers || []);
  const [isNotSure, setIsNotSure] = useState(initialData.isNotSure || false);

  const toggleFood = (food: string) => {
    if (isNotSure) setIsNotSure(false);
    
    if (selectedFoods.includes(food)) {
      setSelectedFoods(selectedFoods.filter(f => f !== food));
    } else {
      setSelectedFoods([...selectedFoods, food]);
    }
  };

  const toggleNotSure = () => {
    setIsNotSure(!isNotSure);
    if (!isNotSure) {
      setSelectedFoods([]);
    }
  };

  const canContinue = selectedFoods.length > 0 || isNotSure;

  const handleContinue = () => {
    if (canContinue) {
      onNext({ triggers: selectedFoods, isNotSure });
    }
  };

  const handleBack = () => {
    onBack({ triggers: selectedFoods, isNotSure });
  };

  return (
    <div className="flex-grow bg-[#f8fafc] flex flex-col font-sans">
      <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-grow flex flex-col">
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-1.5 rounded-full mb-8 overflow-hidden">
          <div className="bg-emerald-500 h-full rounded-full w-[57%]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-grow flex flex-col"
        >
          <div className="text-slate-500 font-medium mb-2">Step 4 of 7</div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
            Do you know any foods that bother you?
          </h2>
          <p className="text-slate-600 mb-10 text-lg">
            Even a rough guess is helpful. Skip if you're totally unsure.
          </p>

          <div className="space-y-8 mb-8">
            {CATEGORIES.map((category) => (
              <div key={category.name}>
                <h3 className="text-sm font-bold text-slate-500 tracking-wider uppercase mb-4">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.options.map((food) => {
                    const isSelected = selectedFoods.includes(food);
                    return (
                      <button
                        key={food}
                        onClick={() => toggleFood(food)}
                        className={`px-5 py-3 rounded-full border text-[15px] font-medium transition-all duration-200 ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                        }`}
                      >
                        {food}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Not Sure Option */}
          <div className="mt-4 mb-12">
            <button
              onClick={toggleNotSure}
              className={`w-full flex items-center p-4 rounded-xl border transition-all duration-200 ${
                isNotSure
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-slate-300 bg-white hover:border-slate-400'
              }`}
            >
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-4 shrink-0 transition-colors ${
                isNotSure ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 bg-white'
              }`}>
                {isNotSure && <Check className="w-4 h-4 text-white" />}
              </div>
              <span className={`text-lg font-medium ${isNotSure ? 'text-emerald-800' : 'text-slate-700'}`}>
                I'm not sure yet — help me find out
              </span>
            </button>
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
            className={`flex-grow py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
              canContinue
                ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm'
                : 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
