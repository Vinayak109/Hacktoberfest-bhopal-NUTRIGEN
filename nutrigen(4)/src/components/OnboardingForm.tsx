import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserProfile } from '../types';
import { Activity, Apple, ChevronRight, Scale, Target, User } from 'lucide-react';

interface OnboardingFormProps {
  onSubmit: (profile: UserProfile) => void;
}

export default function OnboardingForm({ onSubmit }: OnboardingFormProps) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    goal: 'general health',
    age: '',
    gender: 'unspecified',
    height: '',
    weight: '',
    activityLevel: 'moderate',
    dietType: 'non-veg',
    allergies: '',
    foodDislikes: '',
    budgetRange: 'medium',
    cuisinePreference: 'any'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onSubmit(profile);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-emerald-50 px-8 py-6 border-b border-emerald-100 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-emerald-900">Let's build your profile</h2>
          <p className="text-emerald-700 mt-1">Step {step} of 3</p>
        </div>
        <div className="flex space-x-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-2 w-8 rounded-full ${i <= step ? 'bg-emerald-500' : 'bg-emerald-200'}`} />
          ))}
        </div>
      </div>

      <div className="p-8">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="text-xl font-semibold mb-6 flex items-center text-gray-800">
              <Target className="mr-2 text-emerald-500" /> Goals & Basics
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Goal</label>
                <select name="goal" value={profile.goal} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white">
                  <option value="weight loss">Weight Loss</option>
                  <option value="muscle gain">Muscle Gain</option>
                  <option value="general health">General Health & Maintenance</option>
                  <option value="more energy">More Energy</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input type="number" name="age" value={profile.age} onChange={handleChange} placeholder="e.g. 30" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select name="gender" value={profile.gender} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white">
                    <option value="unspecified">Prefer not to say</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="text-xl font-semibold mb-6 flex items-center text-gray-800">
              <Scale className="mr-2 text-emerald-500" /> Body & Activity
            </h3>
            
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                  <input type="number" name="height" value={profile.height} onChange={handleChange} placeholder="e.g. 175" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                  <input type="number" name="weight" value={profile.weight} onChange={handleChange} placeholder="e.g. 70" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
                <select name="activityLevel" value={profile.activityLevel} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white">
                  <option value="sedentary">Sedentary (little or no exercise)</option>
                  <option value="light">Lightly active (light exercise 1-3 days/week)</option>
                  <option value="moderate">Moderately active (moderate exercise 3-5 days/week)</option>
                  <option value="active">Very active (hard exercise 6-7 days/week)</option>
                  <option value="very active">Extra active (very hard exercise & physical job)</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="text-xl font-semibold mb-6 flex items-center text-gray-800">
              <Apple className="mr-2 text-emerald-500" /> Food Preferences
            </h3>
            
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Diet Type</label>
                  <select name="dietType" value={profile.dietType} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white">
                    <option value="non-veg">Non-Vegetarian</option>
                    <option value="veg">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="keto">Keto</option>
                    <option value="paleo">Paleo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                  <select name="budgetRange" value={profile.budgetRange} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white">
                    <option value="low">Budget-friendly</option>
                    <option value="medium">Moderate</option>
                    <option value="high">Premium</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine Preferences</label>
                <input type="text" name="cuisinePreference" value={profile.cuisinePreference} onChange={handleChange} placeholder="e.g. Mediterranean, Asian, Mexican, Any" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Allergies (comma separated)</label>
                <input type="text" name="allergies" value={profile.allergies} onChange={handleChange} placeholder="e.g. Peanuts, Shellfish, Dairy" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Food Dislikes (comma separated)</label>
                <input type="text" name="foodDislikes" value={profile.foodDislikes} onChange={handleChange} placeholder="e.g. Mushrooms, Cilantro, Olives" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
              </div>
            </div>
          </motion.div>
        )}

        <div className="mt-8 flex justify-between">
          <button 
            onClick={handleBack} 
            disabled={step === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${step === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'}`}
          >
            Back
          </button>
          <button 
            onClick={handleNext}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium flex items-center transition-colors shadow-sm"
          >
            {step === 3 ? 'Generate Plan' : 'Next'} <ChevronRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
