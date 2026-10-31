import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Lock } from 'lucide-react';

interface Screen2SymptomsProps {
  initialData: { symptoms: string[]; otherSymptom: string };
  onNext: (data: { symptoms: string[]; otherSymptom: string }) => void;
  onBack: (data: { symptoms: string[]; otherSymptom: string }) => void;
}

const SYMPTOMS = [
  'Bloating',
  'Gas or flatulence',
  'Stomach pain or cramps',
  'Constipation',
  'Diarrhea',
  'Acid reflux or heartburn',
  'Nausea',
  'Feel too full after eating',
  'Tired or foggy after eating',
  'Irregular bowel habits',
  'Skin reactions after eating',
];

const HEALTHY_OPTION = 'None — just eating healthier';

export default function Screen2Symptoms({ initialData, onNext, onBack }: Screen2SymptomsProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(initialData.symptoms || []);
  const [otherSymptom, setOtherSymptom] = useState(initialData.otherSymptom || '');
  const [showWhyAsk, setShowWhyAsk] = useState(false);

  const toggleSymptom = (symptom: string) => {
    if (symptom === HEALTHY_OPTION) {
      if (selectedSymptoms.includes(HEALTHY_OPTION)) {
        setSelectedSymptoms([]);
      } else {
        setSelectedSymptoms([HEALTHY_OPTION]);
      }
      return;
    }

    let newSelections = selectedSymptoms.filter(s => s !== HEALTHY_OPTION);
    if (newSelections.includes(symptom)) {
      newSelections = newSelections.filter(s => s !== symptom);
    } else {
      newSelections = [...newSelections, symptom];
    }
    setSelectedSymptoms(newSelections);
  };

  const isHealthyOnly = selectedSymptoms.length === 1 && selectedSymptoms[0] === HEALTHY_OPTION;
  const hasConstipationAndDiarrhea = selectedSymptoms.includes('Constipation') && selectedSymptoms.includes('Diarrhea');
  const hasSkinReactions = selectedSymptoms.includes('Skin reactions after eating');
  const hasFourOrMore = selectedSymptoms.length >= 4;

  const isComplete = selectedSymptoms.length > 0 || otherSymptom.trim() !== '';

  const handleContinue = () => {
    if (isComplete) {
      onNext({ symptoms: selectedSymptoms, otherSymptom });
    }
  };

  const handleBack = () => {
    onBack({ symptoms: selectedSymptoms, otherSymptom });
  };

  // Determine subtext
  let subtext = "Pick everything that applies. Even a rough guess helps us personalize your meals.";
  if (isHealthyOnly) {
    subtext = "You can always add symptoms later if things change.";
  } else if (selectedSymptoms.length >= 4) {
    subtext = "You've picked several — that gives us a lot to work with.";
  } else if (selectedSymptoms.length > 0) {
    subtext = "Keep going — select everything that feels familiar, even occasionally.";
  }

  // Determine contextual notice
  let notice = null;
  if (hasConstipationAndDiarrhea) {
    notice = {
      type: 'teal',
      text: "Having both is very common — it's called IBS-M (mixed type). You're in exactly the right place."
    };
  } else if (hasSkinReactions) {
    notice = {
      type: 'amber',
      text: "Skin flare-ups after eating often point to a specific food sensitivity. NutriGen will help you track and confirm the link."
    };
  } else if (hasFourOrMore) {
    notice = {
      type: 'teal',
      text: "You've picked quite a few — that's actually helpful. It means we can be very precise about what to avoid in your meals."
    };
  } else if (isHealthyOnly) {
    notice = {
      type: 'purple',
      text: "We'll focus on optimizing your nutrition for general wellness and energy."
    };
  }

  const charsRemaining = 80 - otherSymptom.length;

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-100">
        <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: '28%' }}></div>
      </div>

      <div className="max-w-2xl mx-auto w-full px-6 pt-8 pb-32 flex-grow flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <span className="text-slate-400 font-medium tracking-wide">Step 2 of 7</span>
          {!showWhyAsk ? (
            <button 
              onClick={() => setShowWhyAsk(true)}
              className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors flex items-center text-sm"
            >
              Why do we ask? <span className="ml-1">›</span>
            </button>
          ) : (
            <button 
              onClick={() => setShowWhyAsk(false)}
              className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors flex items-center text-sm"
            >
              Got it <span className="ml-1 text-lg leading-none">×</span>
            </button>
          )}
        </div>

        {/* Why Ask Content */}
        {showWhyAsk && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-slate-600 leading-relaxed mb-8"
          >
            Your symptoms tell us which foods might be causing problems. Someone with bloating needs completely different meal suggestions than someone managing acid reflux. This information stays in your personal profile — it's never shared or sold.
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-grow"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {isHealthyOnly ? "Great — what's your focus?" : "What's been bothering you most?"}
          </h1>
          <p className="text-slate-500 mb-8 text-lg">{subtext}</p>

          <div className="flex flex-wrap gap-3 mb-10">
            {SYMPTOMS.map((symptom) => {
              const isSelected = selectedSymptoms.includes(symptom);
              return (
                <button
                  key={symptom}
                  onClick={() => toggleSymptom(symptom)}
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
                  {symptom}
                </button>
              );
            })}
            
            {/* Healthy Option */}
            <button
              onClick={() => toggleSymptom(HEALTHY_OPTION)}
              className={`relative py-3 px-5 rounded-full border border-dashed text-center transition-all duration-200 flex items-center justify-center text-[15px] ${
                isHealthyOnly
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-medium'
                  : 'border-slate-300 text-slate-600 hover:border-emerald-300 hover:bg-slate-50'
              }`}
            >
              {isHealthyOnly && (
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center mr-2 shrink-0">
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                </div>
              )}
              {HEALTHY_OPTION}
            </button>
          </div>

          {/* Something Else Field */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">
              SOMETHING ELSE?
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={otherSymptom}
                onChange={(e) => {
                  if (e.target.value.length <= 80) {
                    setOtherSymptom(e.target.value);
                  }
                }}
                placeholder="Describe in your own words..."
                className="w-full p-4 pr-12 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-lg"
              />
              <span className={`absolute right-4 text-sm ${charsRemaining < 15 ? 'text-amber-500 font-medium' : 'text-slate-400'}`}>
                {charsRemaining}
              </span>
            </div>
          </div>

          {/* Contextual Notice */}
          {notice && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-8 p-4 rounded-xl flex items-start gap-3 border ${
                notice.type === 'teal' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' :
                notice.type === 'amber' ? 'bg-amber-50 border-amber-100 text-amber-800' :
                'bg-purple-50 border-purple-100 text-purple-800'
              }`}
            >
              <Check className={`w-5 h-5 shrink-0 mt-0.5 ${
                notice.type === 'teal' ? 'text-emerald-600' :
                notice.type === 'amber' ? 'text-amber-600' :
                'text-purple-600'
              }`} />
              <p className="text-[15px] leading-relaxed">{notice.text}</p>
            </motion.div>
          )}

          {/* Privacy Note */}
          <div className="bg-slate-50 rounded-xl p-4 flex items-start gap-3 border border-slate-100">
            <Lock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-500 leading-relaxed">
              This is private. We never share, sell, or show your symptoms to anyone.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 sm:p-6 z-10">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <div className="w-full flex items-center justify-between">
            <button 
              onClick={handleBack}
              className="px-6 py-3 rounded-xl font-medium text-slate-600 hover:bg-slate-50 transition-colors flex items-center border border-slate-200 bg-white"
            >
              <span className="mr-2">←</span> Back
            </button>
            <button 
              onClick={handleContinue}
              disabled={!isComplete}
              className={`px-10 py-3.5 rounded-xl font-bold text-lg transition-all duration-300 min-w-[160px] ${
                isComplete 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200 transform hover:-translate-y-0.5' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
          {/* Tally */}
          <div className="h-4 mt-2">
            {selectedSymptoms.length > 0 && (
              <span className="text-[11px] text-slate-400 font-medium">
                {selectedSymptoms.length} symptom{selectedSymptoms.length !== 1 ? 's' : ''} selected
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
