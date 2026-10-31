import { motion } from 'motion/react';
import { Lock } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export default function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  return (
    <div className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#f8fafc] text-slate-900 min-h-screen font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md mx-auto text-center flex flex-col items-center"
      >
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="2"></circle>
            <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-medium tracking-tight text-slate-900 mb-4">
          NutriGen
        </h1>

        {/* Subtitle */}
        <h2 className="text-[22px] text-slate-700 mb-2">
          Find what your gut is trying to tell you
        </h2>

        {/* Description */}
        <p className="text-[15px] text-slate-500 mb-10">
          Takes 3 minutes. No calorie counting. No long forms.
        </p>

        {/* Get Started Button */}
        <button 
          onClick={onGetStarted}
          className="w-full py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-semibold text-lg hover:bg-slate-50 transition-colors shadow-sm"
        >
          Get started
        </button>

        {/* Trust Line */}
        <div className="flex items-center justify-center gap-2 mt-6 text-[13px] text-slate-500">
          <Lock className="w-3.5 h-3.5" />
          <span>Not a medical app — a smarter food diary</span>
        </div>
      </motion.div>
    </div>
  );
}
