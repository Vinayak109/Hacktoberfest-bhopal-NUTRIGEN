import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, ChevronDown, Loader2 } from 'lucide-react';
import OnboardingForm from './components/OnboardingForm';
import Dashboard from './components/Dashboard';
import WelcomeScreen from './components/WelcomeScreen';
import Screen1Identity from './components/Screen1Identity';
import Screen2Symptoms from './components/Screen2Symptoms';
import Screen3Frequency from './components/Screen3Frequency';
import Screen4Triggers from './components/Screen4Triggers';
import Screen5Allergies from './components/Screen5Allergies';
import Screen6Cuisine from './components/Screen6Cuisine';
import Screen7Goal from './components/Screen7Goal';
import Screen8Summary from './components/Screen8Summary';
import LandingPage from './components/LandingPage';
import { LoginForm, SignUpForm, AuthLayout } from './components/AuthForms';
import { generateNutritionPlan, generatePersonalizedSummary, generateDailyMeals } from './services/gemini';
import { UserProfile, NutritionPlan, DailyMeals } from './types';

type AppState = 'home' | 'welcome' | 'screen1' | 'screen2' | 'screen3' | 'screen4' | 'screen5' | 'screen6' | 'screen7' | 'screen8' | 'login' | 'signup' | 'form' | 'loading' | 'dashboard' | 'generatedSummary';

export interface OnboardingData {
  firstName: string;
  ageRange: string;
  biologicalSex: string;
  symptoms: string[];
  otherSymptom: string;
  frequency: string;
  timing: string[];
  triggers: string[];
  isNotSure: boolean;
  allergies: string[];
  otherAllergy?: string;
  dietaryPreferences: string[];
  cuisines: string[];
  cookingFrequency: string;
  budget: string;
  mainGoal: string;
  microbiomeReport: string;
}

const initialOnboardingData: OnboardingData = {
  firstName: '',
  ageRange: '',
  biologicalSex: '',
  symptoms: [],
  otherSymptom: '',
  frequency: '',
  timing: [],
  triggers: [],
  isNotSure: false,
  allergies: [],
  dietaryPreferences: [],
  cuisines: [],
  cookingFrequency: '',
  budget: '',
  mainGoal: '',
  microbiomeReport: '',
};

export default function App() {
  const [appState, setAppState] = useState<AppState>('home');
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(initialOnboardingData);
  const [plan, setPlan] = useState<NutritionPlan | null>(null);
  const [dailyMeals, setDailyMeals] = useState<DailyMeals | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);

  const handleFormSubmit = async (profile: UserProfile) => {
    setAppState('loading');
    setError(null);
    try {
      const generatedPlan = await generateNutritionPlan(profile);
      setPlan(generatedPlan);
      setAppState('dashboard');
    } catch (err) {
      console.error(err);
      setError('Failed to generate your nutrition plan. Please try again.');
      setAppState('form');
    }
  };

  const handleReset = () => {
    setPlan(null);
    setAppState('home');
  };

  const isHome = appState === 'home';
  const hideHeader = appState === 'welcome' || appState === 'screen1' || appState === 'screen2' || appState === 'screen3' || appState === 'screen4' || appState === 'screen5' || appState === 'screen6' || appState === 'screen7' || appState === 'screen8' || appState === 'generatedSummary';

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 flex flex-col relative">
      {!hideHeader && (
        <header className={`${isHome ? 'absolute top-0 left-0 right-0 bg-[#F7FAF8]/90 backdrop-blur-md border-b border-[#0F6E56]/10 text-slate-900' : 'bg-white border-b border-slate-200 text-slate-900 sticky top-0 shadow-sm'} z-50 transition-colors duration-300`}>
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
            <div className="flex items-center cursor-pointer" onClick={handleReset}>
              <div className="w-14 h-14 rounded-full overflow-hidden mr-3 border-2 border-[#0F6E56] shadow-sm shrink-0 bg-white">
                <img 
                  src="/logo.png" 
                  alt="NutriGen Logo" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%230F6E56"/><path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="%23E1F5EE" stroke-width="4"/><polygon points="50,20 55,35 70,35 58,45 62,60 50,50 38,60 42,45 30,35 45,35" fill="white"/><circle cx="50" cy="65" r="10" fill="white"/></svg>';
                  }}
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-4xl font-black tracking-tighter leading-none text-slate-900">NutriGen</span>
                <span className="text-[11px] font-bold mt-1 uppercase tracking-[0.15em] text-[#0F6E56]">SMART NUTRITION FOR EVERY BODY</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E1F5EE] border border-[#0F6E56]/20 text-[#0F6E56] text-xs font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#0F6E56] animate-pulse"></span>
              <span className="font-extrabold">India's First IBS Trigger Tracking Platform</span>
            </div>

            <div className="flex items-center gap-10">
              {(appState === 'home' || appState === 'login' || appState === 'signup') && (
                <div className="flex items-center space-x-6">
                  <button 
                    onClick={() => setAppState('login')}
                    className="text-[17px] font-medium text-slate-700 hover:text-[#0F6E56] transition-colors"
                  >
                    Log In
                  </button>
                  <button 
                    onClick={() => setAppState('welcome')}
                    className="text-[17px] font-medium px-8 py-2.5 rounded-full transition-all bg-[#0F6E56] hover:bg-[#0b5643] text-white shadow-sm hover:shadow"
                  >
                    Sign Up
                  </button>
                </div>
              )}
              
              {(appState === 'form' || appState === 'dashboard') && (
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                    <img src="https://ui-avatars.com/api/?name=User&background=f1f5f9&color=64748b" alt="User" />
                  </div>
                  <button 
                    onClick={handleReset}
                    className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
      )}

      <main className="flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          {appState === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow"
            >
              <LandingPage 
                onGetStarted={() => setAppState('signup')} 
                onSignIn={() => setAppState('login')} 
              />
            </motion.div>
          )}

          {appState === 'welcome' && (
            <motion.div 
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow flex flex-col"
            >
              <WelcomeScreen 
                onGetStarted={() => setAppState('screen1')} 
              />
            </motion.div>
          )}

          {appState === 'screen1' && (
            <motion.div 
              key="screen1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow flex flex-col"
            >
              <Screen1Identity 
                initialData={onboardingData}
                onNext={(data) => {
                  setOnboardingData(prev => ({ ...prev, ...data }));
                  setAppState('screen2');
                }}
                onBack={(data) => {
                  setOnboardingData(prev => ({ ...prev, ...data }));
                  setAppState('welcome');
                }}
              />
            </motion.div>
          )}

          {appState === 'screen2' && (
            <motion.div 
              key="screen2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow flex flex-col"
            >
              <Screen2Symptoms 
                initialData={onboardingData}
                onNext={(data) => {
                  setOnboardingData(prev => ({ ...prev, ...data }));
                  setAppState('screen3');
                }}
                onBack={(data) => {
                  setOnboardingData(prev => ({ ...prev, ...data }));
                  setAppState('screen1');
                }}
              />
            </motion.div>
          )}

          {appState === 'screen3' && (
            <motion.div 
              key="screen3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow flex flex-col"
            >
              <Screen3Frequency 
                initialData={onboardingData}
                onNext={(data) => {
                  setOnboardingData(prev => ({ ...prev, ...data }));
                  setAppState('screen4');
                }}
                onBack={(data) => {
                  setOnboardingData(prev => ({ ...prev, ...data }));
                  setAppState('screen2');
                }}
              />
            </motion.div>
          )}

          {appState === 'screen4' && (
            <motion.div 
              key="screen4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow flex flex-col"
            >
              <Screen4Triggers 
                initialData={onboardingData}
                onNext={(data) => {
                  setOnboardingData(prev => ({ ...prev, ...data }));
                  setAppState('screen5');
                }}
                onBack={(data) => {
                  setOnboardingData(prev => ({ ...prev, ...data }));
                  setAppState('screen3');
                }}
              />
            </motion.div>
          )}

          {appState === 'screen5' && (
            <motion.div 
              key="screen5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow flex flex-col"
            >
              <Screen5Allergies 
                initialData={onboardingData}
                onNext={(data) => {
                  setOnboardingData(prev => ({ ...prev, ...data }));
                  setAppState('screen6');
                }}
                onBack={(data) => {
                  setOnboardingData(prev => ({ ...prev, ...data }));
                  setAppState('screen4');
                }}
              />
            </motion.div>
          )}

          {appState === 'screen6' && (
            <motion.div 
              key="screen6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow flex flex-col"
            >
              <Screen6Cuisine 
                initialData={onboardingData}
                onNext={(data) => {
                  setOnboardingData(prev => ({ ...prev, ...data }));
                  setAppState('screen7');
                }}
                onBack={(data) => {
                  setOnboardingData(prev => ({ ...prev, ...data }));
                  setAppState('screen5');
                }}
              />
            </motion.div>
          )}

          {appState === 'screen7' && (
            <motion.div 
              key="screen7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow flex flex-col"
            >
              <Screen7Goal 
                initialData={onboardingData}
                onNext={(data) => {
                  setOnboardingData(prev => ({ ...prev, ...data }));
                  setAppState('screen8');
                }}
                onBack={(data) => {
                  setOnboardingData(prev => ({ ...prev, ...data }));
                  setAppState('screen6');
                }}
              />
            </motion.div>
          )}

          {appState === 'screen8' && (
            <motion.div 
              key="screen8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow flex flex-col"
            >
              <Screen8Summary 
                data={onboardingData}
                onNext={async () => {
                  setAppState('loading');
                  try {
                    const html = await generatePersonalizedSummary(onboardingData);
                    setGeneratedHtml(html);
                    setAppState('generatedSummary');
                  } catch (e) {
                    console.error('Failed to generate summary', e);
                    setAppState('dashboard');
                  }
                }}
                onEdit={() => {
                  setAppState('screen1');
                }}
              />
            </motion.div>
          )}

          {appState === 'login' && (
            <motion.div 
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow"
            >
              <AuthLayout 
                imageSrc="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1000"
                quote="Nutrition is the only remedy that can bring full recovery and can be used with any treatment."
                author="Bernard Jensen"
              >
                <LoginForm 
                  onSuccess={() => setAppState('welcome')} 
                  onSwitch={() => setAppState('signup')} 
                />
              </AuthLayout>
            </motion.div>
          )}

          {appState === 'signup' && (
            <motion.div 
              key="signup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow"
            >
              <AuthLayout 
                imageSrc="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000"
                quote="Let food be thy medicine and medicine be thy food."
                author="Hippocrates"
              >
                <SignUpForm 
                  onSuccess={() => setAppState('welcome')} 
                  onSwitch={() => setAppState('login')} 
                />
              </AuthLayout>
            </motion.div>
          )}

          {appState === 'form' && (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full"
            >
              {error && (
                <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center">
                  {error}
                </div>
              )}
              <OnboardingForm onSubmit={handleFormSubmit} />
            </motion.div>
          )}

          {appState === 'loading' && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 flex-grow"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <Loader2 className="w-16 h-16 text-emerald-600 animate-spin relative z-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-2">Analyzing your profile...</h2>
              <p className="text-slate-500 text-center max-w-md">
                Our AI is processing your goals, symptoms, and preferences to build your personalized plan.
              </p>
            </motion.div>
          )}

          {appState === 'generatedSummary' && generatedHtml && (
            <motion.div 
              key="generatedSummary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex-grow flex flex-col items-center justify-center bg-[#f8fafc] p-4 sm:px-6 lg:px-8 py-12"
            >
              <div 
                className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8"
                dangerouslySetInnerHTML={{ __html: generatedHtml }}
              />
              <button 
                onClick={async () => {
                  setAppState('loading');
                  try {
                    const meals = await generateDailyMeals(onboardingData);
                    setDailyMeals(meals);
                    setAppState('dashboard');
                  } catch(e) {
                    console.error('Failed to generate daily meals', e);
                    setAppState('dashboard');
                  }
                }}
                className="mt-8 w-full sm:w-auto px-8 py-4 rounded-xl border border-transparent bg-[#1D9E75] text-white font-semibold text-lg hover:bg-[#15805e] transition-colors shadow-sm"
              >
                Go to my day 1 plan
              </button>
            </motion.div>
          )}

          {appState === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex-grow flex flex-col"
            >
              <Dashboard data={onboardingData} dailyMeals={dailyMeals} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
