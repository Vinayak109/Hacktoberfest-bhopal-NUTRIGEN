import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Lock } from 'lucide-react';

interface Screen1IdentityProps {
  initialData: { firstName: string; ageRange: string; biologicalSex: string };
  onNext: (data: { firstName: string; ageRange: string; biologicalSex: string }) => void;
  onBack: (data: { firstName: string; ageRange: string; biologicalSex: string }) => void;
}

const AGE_RANGES = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
const SEX_OPTIONS = ['Male', 'Female', 'Prefer not to say'];

export default function Screen1Identity({ initialData, onNext, onBack }: Screen1IdentityProps) {
  const [firstName, setFirstName] = useState(initialData.firstName || '');
  const [ageRange, setAgeRange] = useState(initialData.ageRange || '');
  const [biologicalSex, setBiologicalSex] = useState(initialData.biologicalSex || '');
  const [showWhyAsk, setShowWhyAsk] = useState(false);

  const isComplete = firstName.trim() !== '' && ageRange !== '' && biologicalSex !== '';

  const handleContinue = () => {
    if (isComplete) {
      onNext({ firstName, ageRange, biologicalSex });
    }
  };

  const handleBack = () => {
    onBack({ firstName, ageRange, biologicalSex });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-100">
        <div className="h-full bg-emerald-500 w-1/7" style={{ width: '14%' }}></div>
      </div>

      <div className="max-w-2xl mx-auto w-full px-6 pt-8 pb-24 flex-grow flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <span className="text-slate-400 font-medium tracking-wide">Step 1 of 7</span>
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
            Your age and biological sex help us establish accurate nutritional baselines. Caloric needs, macronutrient distribution, and vitamin requirements vary significantly based on these biological factors. This information stays in your personal profile — it's never shared or sold.
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-grow"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Let's get to know you</h1>
          <p className="text-slate-500 mb-10 text-lg">Just a few basics to personalize your experience.</p>

          <div className="space-y-10">
            {/* First Name */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="What should we call you?"
                className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-lg"
              />
            </div>

            {/* Age Range */}
            <div>
              <div className="flex items-baseline gap-2 mb-3">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Age Range
                </label>
                <span className="text-slate-400 text-sm">— for nutritional baselines</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {AGE_RANGES.map((range) => (
                  <button
                    key={range}
                    onClick={() => setAgeRange(range)}
                    className={`relative py-3 px-4 rounded-full border text-center transition-all duration-200 flex items-center justify-center ${
                      ageRange === range
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-medium'
                        : 'border-slate-200 text-slate-600 hover:border-emerald-200 hover:bg-slate-50'
                    }`}
                  >
                    {ageRange === range && (
                      <Check className="w-4 h-4 mr-2 text-emerald-500" />
                    )}
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Biological Sex */}
            <div>
              <div className="flex items-baseline gap-2 mb-3">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Biological Sex
                </label>
                <span className="text-slate-400 text-sm">— for nutritional baselines</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {SEX_OPTIONS.map((sex) => (
                  <button
                    key={sex}
                    onClick={() => setBiologicalSex(sex)}
                    className={`relative py-3 px-6 rounded-full border text-center transition-all duration-200 flex items-center justify-center ${
                      biologicalSex === sex
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-medium'
                        : 'border-slate-200 text-slate-600 hover:border-emerald-200 hover:bg-slate-50'
                    }`}
                  >
                    {biologicalSex === sex && (
                      <Check className="w-4 h-4 mr-2 text-emerald-500" />
                    )}
                    {sex}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Privacy Note */}
        <div className="mt-12 bg-slate-50 rounded-xl p-4 flex items-start gap-3 border border-slate-100">
          <Lock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-sm text-slate-500 leading-relaxed">
            This is private. We never share, sell, or show your personal data to anyone.
          </p>
        </div>
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
            disabled={!isComplete}
            className={`px-10 py-3.5 rounded-xl font-bold text-lg transition-all duration-300 ${
              isComplete 
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
