import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Lock, Target, Zap, ChevronLeft, ChevronRight, Activity, Droplet, User, Calendar, Mail, ArrowRight, Brain, Leaf, LineChart, Sparkles, ListChecks, Star, Quote, CheckCircle2 } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export default function LandingPage({ onGetStarted, onSignIn }: LandingPageProps) {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [slideshowIndex, setSlideshowIndex] = React.useState(0);
  return (
    <div className="bg-[#F7FAF8] min-h-screen font-sans text-slate-900 selection:bg-[#E1F5EE] selection:text-[#0F6E56] overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-20">
        {/* Soft background ambient glows */}
        <div className="absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E1F5EE] rounded-full blur-[140px] pointer-events-none opacity-80"></div>
        <div className="absolute top-20 right-[15%] w-[600px] h-[600px] bg-[#BA7517]/5 rounded-full blur-[130px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 xl:gap-8">
            
            {/* Left Column */}
            <div className="lg:w-[35%] z-20">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#E1F5EE] border border-[#0F6E56]/30 text-[#0F6E56] text-xs sm:text-sm font-extrabold tracking-wide mb-6 shadow-xs"
              >
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F6E56] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0F6E56]"></span>
                </span>
                <span className="font-black uppercase tracking-wider">India's First IBS Trigger Tracking Platform</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl xl:text-[5.1rem] font-black text-slate-900 tracking-tight mb-6 leading-[1.05]"
              >
                Your gut map<br/>
                <span className="text-[#0F6E56]">starts here.</span>
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/90 border-l-4 border-[#0F6E56] border-y border-r border-slate-200/80 p-4 rounded-r-2xl mb-8 shadow-xs backdrop-blur-xs"
              >
                <p className="text-base sm:text-lg text-slate-900 font-extrabold leading-snug mb-1">
                  NutriGen: it supports nutrition decisions helps find triggers.
                </p>
                <p className="text-sm text-slate-600 font-medium italic">
                  "Understand your body. Eat with confidence."
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-8 mb-16"
              >
                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-full bg-[#E1F5EE] border border-[#0F6E56]/20 flex items-center justify-center shrink-0 shadow-sm">
                    <ListChecks className="w-6 h-6 text-[#0F6E56]" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Log & Track</h3>
                    <p className="text-slate-600 text-sm">Quickly log your meals and body reactions in seconds</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-full bg-[#E1F5EE] border border-[#0F6E56]/20 flex items-center justify-center shrink-0 shadow-sm">
                    <LineChart className="w-6 h-6 text-[#0F6E56]" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Discover Patterns</h3>
                    <p className="text-slate-600 text-sm">Our smart engine finds the hidden food triggers</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-full bg-[#E1F5EE] border border-[#0F6E56]/20 flex items-center justify-center shrink-0 shadow-sm">
                    <Leaf className="w-6 h-6 text-[#0F6E56]" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Eat Safe, Feel Great</h3>
                    <p className="text-slate-600 text-sm">Get personalized meal suggestions just for you</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex items-center gap-3 px-5 py-4 bg-white/90 border border-[#0F6E56]/15 rounded-2xl w-max shadow-sm backdrop-blur-sm"
              >
                <Shield className="w-6 h-6 text-[#0F6E56]" />
                <div>
                  <div className="text-sm font-bold text-[#0F6E56]">Privacy First</div>
                  <div className="text-xs text-slate-500">Your health data is 100% private and encrypted</div>
                </div>
              </motion.div>
            </div>
            
            {/* Center Column: App Mockup with Fresh Gut-Friendly Food Plate */}
            <div className="lg:w-[32%] relative hidden lg:flex items-center justify-center z-10 scale-95 xl:scale-100">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative flex items-center justify-center"
              >
                {/* Floating Decorative Badges */}
                <div className="absolute -top-6 -right-6 px-3.5 py-1.5 rounded-full bg-white border border-[#0F6E56]/20 flex items-center gap-1.5 text-[#0F6E56] text-xs font-bold shadow-md z-20">
                  <Leaf className="w-3.5 h-3.5 text-[#0F6E56]" />
                  <span>IBS Pattern Match</span>
                </div>
                <div className="absolute top-1/3 -left-12 px-3 py-1.5 rounded-full bg-white border border-amber-200 text-[#BA7517] text-xs font-bold shadow-md z-20 flex items-center gap-1.5 animate-pulse">
                  <span>✨</span>
                  <span>Trigger Alert</span>
                </div>

                {/* Fresh Gut Health Bowl Plate Underneath */}
                <div className="absolute -bottom-10 -left-14 -right-14 h-56 rounded-full overflow-hidden border-4 border-white shadow-2xl z-0 pointer-events-none opacity-90 ring-4 ring-[#E1F5EE]">
                  <img 
                    src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80" 
                    alt="NutriGen Healthy Food" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
                </div>

                {/* Phone Mockup */}
                <div className="w-[310px] h-[610px] bg-white border-[6px] border-slate-200/90 rounded-[3rem] shadow-[0_25px_70px_rgba(15,110,86,0.18)] overflow-hidden relative z-10">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#F7FAF8]/95 via-white/95 to-[#F7FAF8] flex flex-col p-5 z-10 backdrop-blur-[1px]">
                    
                    {/* Top Bar Mockup */}
                    <div className="w-full flex justify-between items-center mb-5 mt-3">
                      <div className="w-8 h-8 rounded-full bg-[#E1F5EE] flex items-center justify-center"><ChevronRight className="w-4 h-4 rotate-180 text-[#0F6E56]" /></div>
                      <div className="text-slate-900 font-bold text-sm">Today's Summary</div>
                      <div className="w-8 h-8"></div>
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-white rounded-2xl p-4 border border-[#0F6E56]/15 mb-3 shadow-xs"
                    >
                      <div className="text-xs text-slate-500 mb-1">Gut Health Score</div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-bold text-slate-900 text-2xl">Good</div>
                          <div className="text-xs text-[#0F6E56] font-semibold">72 / 100</div>
                        </div>
                        <div className="w-12 h-12 rounded-full border-[5px] border-[#E1F5EE] border-t-[#0F6E56] border-r-[#0F6E56]"></div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="bg-white rounded-2xl p-4 border border-amber-200/80 mb-3 shadow-xs"
                    >
                      <div className="text-xs text-slate-500 mb-1">Top Trigger</div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-bold text-slate-900 text-lg">Dairy</div>
                          <div className="text-xs text-[#BA7517] font-semibold">High impact</div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#BA7517]/10 flex items-center justify-center text-[#BA7517] font-bold">✨</div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="bg-white rounded-2xl p-4 border border-[#0F6E56]/15 shadow-xs"
                    >
                      <div className="text-xs text-slate-500 mb-1">Safe Choice</div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-bold text-slate-900 text-lg">Moong Dal Chilla</div>
                          <div className="text-xs text-[#0F6E56] font-semibold">High match</div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#E1F5EE] flex items-center justify-center text-[#0F6E56] text-xl">🥗</div>
                      </div>
                    </motion.div>

                    <div className="mt-3 p-3 rounded-xl bg-[#E1F5EE]/60 border border-[#0F6E56]/15 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#0F6E56] shrink-0" />
                      <span className="text-[11px] text-[#0F6E56] font-semibold">India's 1st IBS Trigger Tracker</span>
                    </div>

                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:w-[33%] w-full relative z-30">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="absolute -top-5 -right-3 sm:-right-5 bg-[#0F6E56] text-white text-xs font-bold px-5 py-2.5 rounded-full border border-[#0F6E56] flex items-center gap-2 z-40 shadow-xl shadow-[#0F6E56]/20">
                  <Sparkles className="w-4 h-4 text-[#E1F5EE]" /> PRE-LAUNCH EXCLUSIVE
                </div>

                <div className="bg-white border border-[#0F6E56]/15 rounded-[2.5rem] p-7 sm:p-8 shadow-[0_20px_50px_rgba(15,110,86,0.08)] relative overflow-hidden backdrop-blur-md">
                  
                  {/* Small Register Here Tab */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#E1F5EE] border border-[#0F6E56]/25 text-[#0F6E56] text-xs font-bold mb-4 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-[#0F6E56] animate-pulse"></span>
                    <span>Register here for the service</span>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 flex items-center gap-2">
                      🚀 Join the <span className="text-[#0F6E56]">Pre-Launch</span>
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Be the first to access NutriGen and get lifetime priority features.
                    </p>
                  </div>
                  
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onGetStarted(); }}>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0F6E56]" />
                        <input 
                          type="text" 
                          placeholder="Your name" 
                          required 
                          className="w-full pl-11 pr-4 py-3.5 bg-[#F7FAF8] border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0F6E56] focus:ring-2 focus:ring-[#0F6E56]/15 transition-colors text-sm" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Age</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0F6E56]" />
                        <input 
                          type="number" 
                          placeholder="Your age" 
                          required 
                          className="w-full pl-11 pr-4 py-3.5 bg-[#F7FAF8] border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0F6E56] focus:ring-2 focus:ring-[#0F6E56]/15 transition-colors text-sm" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0F6E56]" />
                        <input 
                          type="email" 
                          placeholder="Your email" 
                          required 
                          className="w-full pl-11 pr-4 py-3.5 bg-[#F7FAF8] border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0F6E56] focus:ring-2 focus:ring-[#0F6E56]/15 transition-colors text-sm" 
                        />
                      </div>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full py-4 mt-2 bg-[#0F6E56] hover:bg-[#0B5643] text-white rounded-xl font-extrabold text-base flex items-center justify-center gap-2 transition-transform transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-[#0F6E56]/25 cursor-pointer"
                    >
                      START MY GUT MAP <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <div className="flex items-center justify-center gap-2 text-xs text-[#0F6E56] mt-4 font-semibold">
                      <Lock className="w-3.5 h-3.5" /> We respect your privacy. No spam, ever.
                    </div>
                  </form>
                </div>

                <div className="mt-4 bg-white border border-slate-200/90 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                  <div className="flex -space-x-3 shrink-0">
                    <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
                      <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" alt="User" />
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
                      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="User" />
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" />
                    </div>
                  </div>
                  <div className="text-sm text-slate-600">
                    Join <span className="text-slate-900 font-bold">1,200+</span> health-conscious people already on the waitlist
                  </div>
                </div>
              </motion.div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 2. NutriGen 3 Slides Showcase */}
      <section className="py-20 relative z-10 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-4xl mx-auto mb-14">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E1F5EE] border border-[#0F6E56]/25 text-[#0F6E56] text-xs font-black uppercase tracking-wider mb-5 shadow-2xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F6E56] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0F6E56]"></span>
              </span>
              <span>India's First IBS Trigger Tracking Platform</span>
            </div>
            
            {/* Main Headline with Clean Visual Hierarchy */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-[1.18] mb-4">
              <span className="text-[#0F6E56] font-black">NutriGen</span>
              <span className="text-slate-400 font-light mx-2">:</span>
              <span className="text-slate-900">It supports nutrition decisions,</span>{" "}
              <br className="hidden sm:inline" />
              <span className="inline-block relative font-black">
                <span className="relative z-10 text-[#BA7517]">helps find triggers.</span>
                <span className="absolute bottom-1 left-0 w-full h-2.5 bg-[#BA7517]/15 -z-0 rounded-full"></span>
              </span>
            </h2>

            {/* Light, Airy Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
              Explore the 3-stage intelligence engine engineered to uncover personal food sensitivities, prevent painful flare-ups, and restore gut confidence.
            </p>

            {/* Sleek Segmented Slide Navigation Controller */}
            <div className="mt-8 flex justify-center">
              <div className="inline-flex p-1.5 rounded-2xl bg-[#F7FAF8] border border-slate-200/90 shadow-inner max-w-full overflow-x-auto gap-1">
                {[
                  { id: 0, num: '01', title: 'Trigger Tracking', badge: 'Pre-Launch' },
                  { id: 1, num: '02', title: 'Pattern Engine', badge: 'AI Analysis' },
                  { id: 2, num: '03', title: 'Daily Companion', badge: 'Dashboard' }
                ].map((tab) => {
                  const isActive = activeSlide === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveSlide(tab.id)}
                      className={`group flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-[#0F6E56] text-white shadow-md shadow-[#0F6E56]/20'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black transition-colors ${
                        isActive ? 'bg-[#E1F5EE] text-[#0F6E56]' : 'bg-slate-200/70 text-slate-600 group-hover:bg-slate-200'
                      }`}>
                        {tab.num}
                      </span>
                      <span>{tab.title}</span>
                      <span className={`hidden md:inline-block text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-200/60 text-slate-500'
                      }`}>
                        {tab.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Slide 1 Display */}
          {activeSlide === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-[#F7FAF8] border border-slate-200/90 rounded-[2.5rem] p-8 sm:p-12 mb-16 shadow-sm overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row items-center gap-10">
                <div className="lg:w-1/2 space-y-5">
                  <span className="px-3 py-1 rounded-full bg-[#E1F5EE] text-[#0F6E56] text-xs font-black uppercase tracking-wider">Slide 01 · First Feature</span>
                  <h3 className="text-3xl font-extrabold text-slate-900">
                    <strong>India's First IBS Trigger Tracking Platform</strong>
                  </h3>
                  <p className="text-slate-700 text-base leading-relaxed">
                    Designed for Indian & global diets, NutriGen correlates real meals like dal, roti, and dairy against flare-ups in real time.
                  </p>
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                      <div className="w-7 h-7 rounded-full bg-[#E1F5EE] flex items-center justify-center text-[#0F6E56] font-bold">✓</div>
                      <span>Instant trigger identification with high & low sensitivity scoring</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                      <div className="w-7 h-7 rounded-full bg-[#E1F5EE] flex items-center justify-center text-[#0F6E56] font-bold">✓</div>
                      <span>Personalized trigger-safe recipe recommendations (Moong Dal Chilla, Khichdi)</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                      <div className="w-7 h-7 rounded-full bg-[#E1F5EE] flex items-center justify-center text-[#0F6E56] font-bold">✓</div>
                      <span>100% private, clinically grounded algorithm</span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button 
                      onClick={onGetStarted}
                      className="px-6 py-3 bg-[#0F6E56] hover:bg-[#0B5643] text-white rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
                    >
                      Join Early Access Waitlist →
                    </button>
                  </div>
                </div>

                <div className="lg:w-1/2 w-full flex justify-center">
                  <div className="relative max-w-sm w-full bg-white rounded-3xl p-6 border border-slate-200 shadow-xl">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">NutriGen App Preview</div>
                    <div className="p-4 rounded-2xl bg-[#F7FAF8] border border-slate-200 mb-4 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-500 font-medium">Gut Health Score</div>
                        <div className="text-2xl font-black text-slate-900">Good (72/100)</div>
                      </div>
                      <div className="w-12 h-12 rounded-full border-4 border-[#E1F5EE] border-t-[#0F6E56] border-r-[#0F6E56]"></div>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 mb-4 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-amber-700 font-bold uppercase">Top Trigger Detected</div>
                        <div className="text-lg font-bold text-slate-900">Dairy (Milk, Paneer)</div>
                        <span className="text-xs text-[#BA7517] font-semibold">High impact on gut bloating</span>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-[#BA7517] font-bold">✨</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#E1F5EE]/60 border border-[#0F6E56]/20 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-[#0F6E56] font-bold uppercase">Safe Choice Match</div>
                        <div className="text-lg font-bold text-slate-900">Moong Dal Chilla</div>
                        <span className="text-xs text-[#0F6E56] font-semibold">98% Gut-friendly match</span>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#0F6E56] text-xl shadow-xs">🥗</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Slide 2 Display */}
          {activeSlide === 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-[#F7FAF8] border border-slate-200/90 rounded-[2.5rem] p-8 sm:p-12 mb-16 shadow-sm overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row items-center gap-10">
                <div className="lg:w-1/2 space-y-5">
                  <span className="px-3 py-1 rounded-full bg-[#E1F5EE] text-[#0F6E56] text-xs font-black uppercase tracking-wider">Slide 02 · Pattern Detection</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    <span className="text-[#0F6E56]">NutriGen:</span> It supports nutrition decisions, <span className="text-[#BA7517]">helps find triggers.</span>
                  </h3>
                  <p className="text-slate-700 text-base leading-relaxed">
                    Say goodbye to confusing food journals. Our proprietary engine analyzes your symptoms against food components and shows steady gut score improvement.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-3 pt-3">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
                      <div className="text-2xl font-black text-[#0F6E56]">85/100</div>
                      <div className="text-xs text-slate-600 font-medium mt-1">Gut Score</div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
                      <div className="text-2xl font-black text-[#0F6E56]">-78%</div>
                      <div className="text-xs text-slate-600 font-medium mt-1">Less Bloating</div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
                      <div className="text-2xl font-black text-[#BA7517]">Day 2/5</div>
                      <div className="text-xs text-slate-600 font-medium mt-1">Gluten Test</div>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" alt="Sarah" className="w-10 h-10 rounded-full object-cover shrink-0" />
                    <p className="text-xs text-slate-600 italic">"NutriGen helped me finally understand my body. Bloating is gone and I feel amazing!" — Sarah K.</p>
                  </div>
                </div>

                <div className="lg:w-1/2 w-full flex justify-center">
                  <div className="relative max-w-sm w-full bg-white rounded-3xl p-6 border border-slate-200 shadow-xl">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-slate-900 text-sm">Your Progress</span>
                      <span className="text-xs font-bold text-[#0F6E56] bg-[#E1F5EE] px-2.5 py-1 rounded-full">Great</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F7FAF8] border border-slate-200 mb-3">
                      <div className="text-xs text-slate-500 font-medium">Top improvement</div>
                      <div className="text-base font-bold text-slate-900">Bloating reduced by 78%</div>
                      <div className="mt-2 h-7 w-full">
                        <svg viewBox="0 0 100 25" className="w-full h-full stroke-[#0F6E56] fill-none" strokeWidth="2.5">
                          <path d="M0,22 Q15,22 30,16 T60,14 T90,6 T100,4" />
                        </svg>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 mb-3 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-amber-800 font-semibold">Active Isolation Test</div>
                        <div className="text-sm font-bold text-slate-900">Gluten · Test Day 2 of 5</div>
                      </div>
                      <span className="text-xl">🌾</span>
                    </div>

                    <div className="p-3 bg-[#E1F5EE] rounded-xl flex items-center gap-2 text-xs text-[#0F6E56] font-bold">
                      <Leaf className="w-4 h-4 shrink-0" />
                      <span>Pattern detected in 14 days or less</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Slide 3 Display */}
          {activeSlide === 2 && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-[#F7FAF8] border border-slate-200/90 rounded-[2.5rem] p-8 sm:p-12 mb-16 shadow-sm overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row items-center gap-10">
                <div className="lg:w-1/2 space-y-5">
                  <span className="px-3 py-1 rounded-full bg-[#E1F5EE] text-[#0F6E56] text-xs font-black uppercase tracking-wider">Slide 03 · Third Feature</span>
                  <h3 className="text-3xl font-extrabold text-slate-900">
                    <strong>Good morning, Vinayak! Track Nutrition Effortlessly</strong>
                  </h3>
                  <p className="text-slate-700 text-base leading-relaxed">
                    A comprehensive daily command center: track daily calories (1,850/2,200), protein targets (145g/160g), water intake (2.1L/3.0L), and trigger-safe meal plans.
                  </p>

                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">🥑</span>
                        <div>
                          <div className="font-bold text-xs text-slate-900">Breakfast · Avocado Toast & Poached Eggs</div>
                          <span className="text-[10px] text-[#0F6E56] font-bold uppercase">Trigger-Safe</span>
                        </div>
                      </div>
                      <div className="text-xs font-extrabold text-[#0F6E56]">450 kcal</div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">🥗</span>
                        <div>
                          <div className="font-bold text-xs text-slate-900">Lunch · Grilled Chicken Quinoa Bowl</div>
                          <span className="text-[10px] text-[#0F6E56] font-bold uppercase">Trigger-Safe</span>
                        </div>
                      </div>
                      <div className="text-xs font-extrabold text-[#0F6E56]">620 kcal</div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2 w-full flex justify-center">
                  <div className="relative max-w-sm w-full bg-white rounded-3xl p-6 border border-slate-200 shadow-xl">
                    <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                      <div>
                        <div className="text-xs text-slate-500">Dashboard View</div>
                        <div className="font-bold text-slate-900 text-sm">Good morning, Vinayak!</div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#E1F5EE] text-[#0F6E56] font-black flex items-center justify-center text-xs">V</div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="p-2.5 rounded-xl bg-[#F7FAF8] border border-slate-200 text-center">
                        <div className="text-[10px] text-slate-500 font-bold">Calories</div>
                        <div className="font-black text-[#0F6E56] text-sm">1,850</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#F7FAF8] border border-slate-200 text-center">
                        <div className="text-[10px] text-slate-500 font-bold">Protein</div>
                        <div className="font-black text-[#0F6E56] text-sm">145g</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#F7FAF8] border border-slate-200 text-center">
                        <div className="text-[10px] text-slate-500 font-bold">Water</div>
                        <div className="font-black text-[#0F6E56] text-sm">2.1L</div>
                      </div>
                    </div>

                    <div className="p-3 bg-[#E1F5EE]/60 rounded-xl border border-[#0F6E56]/20 flex items-center justify-between">
                      <span className="text-xs text-[#0F6E56] font-bold">Weekly Consistency</span>
                      <span className="text-xs font-black text-[#0F6E56]">92% Peak</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div className="bg-[#E1F5EE]/40 border border-[#0F6E56]/15 rounded-[2.5rem] p-10 md:p-16 flex flex-col lg:flex-row gap-12 items-center">
            
            <div className="lg:w-1/2">
              <div className="text-[#0F6E56] font-bold tracking-wider text-xs uppercase mb-4">Built for your health journey</div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Why NutriGen<br/>
                <span className="text-[#0F6E56]">is different</span>
              </h2>
              <p className="text-slate-600 text-lg mb-12 max-w-md">
                NutriGen isn't just another food tracker. It's your personal gut health companion powered by science and clinically thoughtful design.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <Shield className="w-8 h-8 text-[#0F6E56] mb-4" />
                  <h4 className="text-slate-900 font-bold mb-2">Science-backed insights</h4>
                  <p className="text-slate-600 text-sm">Our AI is trained on nutrition science and clinical gut protocols.</p>
                </div>
                <div>
                  <Lock className="w-8 h-8 text-[#0F6E56] mb-4" />
                  <h4 className="text-slate-900 font-bold mb-2">100% private</h4>
                  <p className="text-slate-600 text-sm">Your health data is encrypted and never sold or shared.</p>
                </div>
                <div>
                  <Target className="w-8 h-8 text-[#0F6E56] mb-4" />
                  <h4 className="text-slate-900 font-bold mb-2">Personalized for you</h4>
                  <p className="text-slate-600 text-sm">Tailored insights based on your unique body responses.</p>
                </div>
                <div>
                  <Zap className="w-8 h-8 text-[#0F6E56] mb-4" />
                  <h4 className="text-slate-900 font-bold mb-2">Simple & easy</h4>
                  <p className="text-slate-600 text-sm">Log in two taps. Understand instantly. Feel better daily.</p>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative w-full h-[500px]">
              {/* Review Card */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="absolute right-0 top-1/4 bg-white border border-slate-200/90 p-6 rounded-2xl w-72 z-20 shadow-xl"
              >
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-[#BA7517] fill-[#BA7517]" />)}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4">
                  "NutriGen helped me finally understand my body. Bloating is gone and I eat without anxiety!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" alt="Sarah" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-slate-900 font-bold text-sm">Sarah K.</div>
                    <div className="text-[#0F6E56] text-xs font-medium">Verified User</div>
                  </div>
                </div>
              </motion.div>
              
              {/* Phone Mockup Representation */}
              <div className="absolute left-10 top-0 w-[260px] h-[520px] bg-white border-4 border-slate-200 rounded-[2.5rem] overflow-hidden z-10 shadow-xl">
                <div className="p-5 bg-[#F7FAF8] h-full overflow-hidden">
                  <div className="text-slate-900 font-bold mb-6 mt-6">Your Progress</div>
                  
                  <div className="bg-white rounded-2xl p-4 mb-4 border border-slate-200 flex justify-between items-center shadow-sm">
                    <div>
                      <div className="text-slate-500 text-xs mb-1">Gut Health Score</div>
                      <div className="text-slate-900 font-bold text-lg">Great</div>
                      <div className="text-[#0F6E56] text-xs font-semibold">85 / 100</div>
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-[#E1F5EE] border-t-[#0F6E56]"></div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-4 mb-4 border border-slate-200 shadow-sm">
                    <div className="text-slate-500 text-xs mb-1">Top improvement</div>
                    <div className="text-slate-900 font-bold">Bloating</div>
                    <div className="text-[#0F6E56] text-xs font-semibold">-78% vs last week</div>
                    <div className="mt-3 h-8 w-full relative">
                      <svg viewBox="0 0 100 30" className="w-full h-full stroke-[#0F6E56] fill-none" strokeWidth="2.5">
                        <path d="M0,25 Q10,25 20,20 T40,15 T60,20 T80,10 T100,5" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-4 mb-4 border border-slate-200 shadow-sm">
                    <div className="text-slate-500 text-xs mb-1">Trigger under test</div>
                    <div className="flex justify-between items-center mt-1">
                      <div>
                        <div className="text-slate-900 font-bold">Gluten</div>
                        <div className="text-[#BA7517] text-xs font-medium">Test day 2 of 5</div>
                      </div>
                      <div className="w-6 h-6 text-[#BA7517] text-xl">🌾</div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-4 mb-4 border border-slate-200 shadow-sm">
                    <div className="text-slate-500 text-xs mb-1">Today's Tip</div>
                    <div className="flex justify-between items-center mt-1">
                      <div className="text-slate-800 font-bold text-xs">Stay hydrated and<br/>choose fiber-rich<br/>foods.</div>
                      <div className="w-8 h-8 rounded-full bg-[#E1F5EE] flex items-center justify-center text-[#0F6E56]"><Droplet className="w-4 h-4"/></div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
            
          </div>
          
          {/* Stats Bar */}
          <div className="mt-12 flex flex-wrap justify-center lg:justify-between items-center gap-12 border-t border-slate-200 pt-10 px-4">
            <div className="flex items-center gap-4">
              <User className="w-8 h-8 text-[#0F6E56]" />
              <div>
                <div className="text-2xl font-bold text-slate-900">5,000+</div>
                <div className="text-slate-500 text-sm">Active Users</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Leaf className="w-8 h-8 text-[#0F6E56]" />
              <div>
                <div className="text-2xl font-bold text-slate-900">1M+</div>
                <div className="text-slate-500 text-sm">Meals Analyzed</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Target className="w-8 h-8 text-[#0F6E56]" />
              <div>
                <div className="text-2xl font-bold text-slate-900">95%</div>
                <div className="text-slate-500 text-sm">Found Triggers in 2 Weeks</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Shield className="w-8 h-8 text-[#0F6E56]" />
              <div>
                <div className="text-2xl font-bold text-slate-900">4.9/5</div>
                <div className="text-slate-500 text-sm">App Store Rating</div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 3. Platform Details Framer Motion Slideshow */}
      <section className="py-24 bg-[#F7FAF8] border-t border-slate-200/80 relative overflow-hidden">
        {/* Soft background ambient glow */}
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#E1F5EE] rounded-full blur-[130px] pointer-events-none opacity-60"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E1F5EE] border border-[#0F6E56]/20 text-[#0F6E56] text-xs font-black uppercase tracking-wider mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#BA7517]" />
              <span>Interactive Platform Tour · In Action</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Explore <span className="text-[#0F6E56]">NutriGen</span> feature by feature.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              See how our intelligent 3-stage platform turns daily food logging into clinical clarity and symptom-free living.
            </p>
          </div>

          {/* Slideshow Segment Navigation Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex flex-wrap justify-center p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm gap-1.5 max-w-full">
              {[
                { id: 0, num: '01', title: '2-Tap Food & Reaction Logging', icon: '📝' },
                { id: 1, num: '02', title: 'Smart Trigger Pattern Engine', icon: '🔬' },
                { id: 2, num: '03', title: 'Safe Meal Plans & Gut Analytics', icon: '🥗' }
              ].map((tab) => {
                const isActive = slideshowIndex === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSlideshowIndex(tab.id)}
                    className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#0F6E56] text-white shadow-md shadow-[#0F6E56]/20 scale-[1.02]'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-[#F7FAF8]'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="opacity-70 text-[11px] font-mono">{tab.num}</span>
                    <span>{tab.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Framer Motion Slideshow Container */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {slideshowIndex === 0 && (
                <motion.div
                  key="slide-0"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="bg-white rounded-[2.5rem] border border-slate-200/90 shadow-xl overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row items-stretch">
                    {/* Visual Media Showcase */}
                    <div className="lg:w-1/2 relative min-h-[380px] lg:min-h-[480px] bg-slate-900 overflow-hidden group">
                      <img
                        src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80"
                        alt="Two Tap Food and Reaction Logging"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent"></div>

                      {/* Overlaid UI Highlights */}
                      <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                        <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#0F6E56] text-xs font-black uppercase tracking-wider shadow-md">
                          Step 01 · Rapid Capture
                        </span>
                        <span className="px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[#E1F5EE] text-xs font-bold border border-white/10">
                          ⏱️ ~5 Sec to Log
                        </span>
                      </div>

                      <div className="absolute bottom-6 left-6 right-6 space-y-3">
                        <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-xl">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-extrabold text-[#0F6E56] uppercase tracking-wider">Logged Meal</span>
                            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#E1F5EE] text-[#0F6E56]">✓ Trigger Safe</span>
                          </div>
                          <div className="text-slate-900 font-bold text-sm">Moong Dal Chilla & Mint Chutney</div>
                          <div className="text-slate-500 text-xs mt-0.5">Reaction recorded 2h later: 0 Bloating · Calm Gut</div>
                        </div>

                        <div className="flex gap-2">
                          <div className="flex-1 p-2.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/15 text-white text-xs">
                            <div className="text-slate-400 text-[10px]">Severity Scale</div>
                            <div className="font-bold text-[#E1F5EE]">Mild / None (0/10)</div>
                          </div>
                          <div className="flex-1 p-2.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/15 text-white text-xs">
                            <div className="text-slate-400 text-[10px]">Time Interval</div>
                            <div className="font-bold text-[#BA7517]">Delayed 4-24h Sync</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content & Feature Breakdown */}
                    <div className="lg:w-1/2 p-8 sm:p-12 flex flex-col justify-between">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E1F5EE] text-[#0F6E56] text-xs font-extrabold uppercase tracking-wider mb-4">
                          <span>📝</span> Frictionless Food Intake
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 leading-snug">
                          Instant Meal & Reaction Logging in Two Simple Taps
                        </h3>
                        <p className="text-slate-600 text-base leading-relaxed mb-6">
                          Traditional calorie counters require endless gram weighing and ignore physical discomfort. NutriGen lets you log authentic Indian and international dishes in seconds, with intuitive sliders for delayed bloating and pain reactions.
                        </p>

                        <div className="space-y-3.5 mb-8">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#0F6E56] shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-bold text-slate-900">Native Indian & Global Food Database</div>
                              <div className="text-xs text-slate-500">Log roti, dal, paneer, spices, and custom recipes without tedious manual entry.</div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#0F6E56] shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-bold text-slate-900">Delayed Reaction Tracking (4–24 Hours)</div>
                              <div className="text-xs text-slate-500">IBS symptoms often appear hours after eating; NutriGen correlates delayed flare-ups accurately.</div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#0F6E56] shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-bold text-slate-900">Zero Pressure & Complete Privacy</div>
                              <div className="text-xs text-slate-500">No calorie obsession—only pure digestive well-being and symptom eradication.</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                        <div className="text-xs text-slate-500 font-medium">Slide 1 of 3 · Logging Engine</div>
                        <button
                          onClick={() => setSlideshowIndex(1)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F6E56] hover:bg-[#0B5643] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                        >
                          Next: Pattern AI <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {slideshowIndex === 1 && (
                <motion.div
                  key="slide-1"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="bg-white rounded-[2.5rem] border border-slate-200/90 shadow-xl overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row items-stretch">
                    {/* Visual Media Showcase */}
                    <div className="lg:w-1/2 relative min-h-[380px] lg:min-h-[480px] bg-slate-900 overflow-hidden group">
                      <img
                        src="https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=1200&q=80"
                        alt="Smart Trigger Pattern Engine"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent"></div>

                      {/* Overlaid UI Highlights */}
                      <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                        <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#BA7517] text-xs font-black uppercase tracking-wider shadow-md">
                          Step 02 · AI Analysis
                        </span>
                        <span className="px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[#E1F5EE] text-xs font-bold border border-white/10">
                          🎯 95% Detection Rate
                        </span>
                      </div>

                      <div className="absolute bottom-6 left-6 right-6 space-y-3">
                        <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-amber-200 shadow-xl">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-extrabold text-[#BA7517] uppercase tracking-wider">Culprit Isolated</span>
                            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 text-[#BA7517]">High Impact Alert</span>
                          </div>
                          <div className="text-slate-900 font-bold text-sm">Dairy (Lactose & Casein)</div>
                          <div className="text-slate-500 text-xs mt-0.5">Correlated with 4 of 5 bloating events over 14 days</div>
                        </div>

                        <div className="flex gap-2">
                          <div className="flex-1 p-2.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/15 text-white text-xs">
                            <div className="text-slate-400 text-[10px]">Gut Health Score</div>
                            <div className="font-bold text-[#0F6E56] text-sm">85 / 100 (Optimal)</div>
                          </div>
                          <div className="flex-1 p-2.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/15 text-white text-xs">
                            <div className="text-slate-400 text-[10px]">Bloating Reduction</div>
                            <div className="font-bold text-[#E1F5EE] text-sm">-78% in 2 Weeks</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content & Feature Breakdown */}
                    <div className="lg:w-1/2 p-8 sm:p-12 flex flex-col justify-between">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#BA7517] border border-amber-200 text-xs font-extrabold uppercase tracking-wider mb-4">
                          <span>🔬</span> Clinical Correlation Engine
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 leading-snug">
                          Smart Pattern Discovery That Finds Hidden Triggers
                        </h3>
                        <p className="text-slate-600 text-base leading-relaxed mb-6">
                          Our clinical AI cross-references meal components with symptom timestamps to separate random stomach aches from true biological intolerances (FODMAPs, lactose, gluten, histamine, and nightshades).
                        </p>

                        <div className="space-y-3.5 mb-8">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#0F6E56] shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-bold text-slate-900">Statistical Trigger Scoring</div>
                              <div className="text-xs text-slate-500">Assigns definitive confidence levels (High, Moderate, Safe) to every suspected food item.</div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#0F6E56] shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-bold text-slate-900">Gut Health Stability Meter</div>
                              <div className="text-xs text-slate-500">Live 0–100 score tracking intestinal inflammation drop as you eliminate reactive foods.</div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#0F6E56] shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-bold text-slate-900">Reintroduction Protocols</div>
                              <div className="text-xs text-slate-500">Safe, guided re-testing to confirm whether an eliminated food can be reintroduced safely.</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                        <button
                          onClick={() => setSlideshowIndex(0)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" /> Previous
                        </button>
                        <div className="text-xs text-slate-500 font-medium">Slide 2 of 3 · Pattern Engine</div>
                        <button
                          onClick={() => setSlideshowIndex(2)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F6E56] hover:bg-[#0B5643] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                        >
                          Next: Safe Meals <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {slideshowIndex === 2 && (
                <motion.div
                  key="slide-2"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="bg-white rounded-[2.5rem] border border-slate-200/90 shadow-xl overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row items-stretch">
                    {/* Visual Media Showcase */}
                    <div className="lg:w-1/2 relative min-h-[380px] lg:min-h-[480px] bg-slate-900 overflow-hidden group">
                      <img
                        src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80"
                        alt="Personalized Gut Safe Meal Planning and Analytics"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent"></div>

                      {/* Overlaid UI Highlights */}
                      <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                        <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#0F6E56] text-xs font-black uppercase tracking-wider shadow-md">
                          Step 03 · Safe Nutrition
                        </span>
                        <span className="px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[#E1F5EE] text-xs font-bold border border-white/10">
                          🥗 100% Trigger Safe
                        </span>
                      </div>

                      <div className="absolute bottom-6 left-6 right-6 space-y-3">
                        <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-extrabold text-[#0F6E56] uppercase tracking-wider">Recommended Meal</span>
                            <span className="text-xs font-bold text-[#0F6E56]">620 kcal · 45g Protein</span>
                          </div>
                          <div className="text-slate-900 font-bold text-sm">Grilled Chicken Quinoa Bowl (Garlic-Free)</div>
                          <div className="text-slate-500 text-xs mt-0.5">Substituted with digestive hing & fresh herbs for optimal tolerance</div>
                        </div>

                        <div className="flex gap-2">
                          <div className="flex-1 p-2.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/15 text-white text-xs">
                            <div className="text-slate-400 text-[10px]">Weekly Progress</div>
                            <div className="font-bold text-[#E1F5EE]">92% Peak Consistency</div>
                          </div>
                          <div className="flex-1 p-2.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/15 text-white text-xs">
                            <div className="text-slate-400 text-[10px]">Hydration Goal</div>
                            <div className="font-bold text-[#0F6E56]">2.1L / 3.0L Tracked</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content & Feature Breakdown */}
                    <div className="lg:w-1/2 p-8 sm:p-12 flex flex-col justify-between">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E1F5EE] text-[#0F6E56] text-xs font-extrabold uppercase tracking-wider mb-4">
                          <span>🥗</span> Personalized Gut Recovery
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 leading-snug">
                          Personalized Trigger-Safe Meal Plans & Live Analytics
                        </h3>
                        <p className="text-slate-600 text-base leading-relaxed mb-6">
                          NutriGen translates your unique trigger profile into satisfying everyday meals. Enjoy chef-crafted recipe substitutions and exportable weekly analytics that you can share with your doctor.
                        </p>

                        <div className="space-y-3.5 mb-8">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#0F6E56] shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-bold text-slate-900">Dynamic Ingredient Swaps</div>
                              <div className="text-xs text-slate-500">Automatic suggestions to swap trigger ingredients with calming, gut-soothing options.</div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#0F6E56] shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-bold text-slate-900">Balanced Nutrition Without Deprivation</div>
                              <div className="text-xs text-slate-500">Hit protein and micronutrient goals safely without triggering digestive distress.</div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#0F6E56] shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-bold text-slate-900">Doctor-Ready Clinical Summary</div>
                              <div className="text-xs text-slate-500">Export PDF logs of verified triggers and symptom trends for clinical appointments.</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                        <button
                          onClick={() => setSlideshowIndex(1)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" /> Previous
                        </button>
                        <div className="text-xs text-slate-500 font-medium">Slide 3 of 3 · Meal Plans</div>
                        <button
                          onClick={() => setSlideshowIndex(0)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F6E56] hover:bg-[#0B5643] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                        >
                          Restart Tour ↺
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Slideshow Progress Dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setSlideshowIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    slideshowIndex === idx ? 'w-10 bg-[#0F6E56]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. The Man Behind the Vision - Small Founder Image & Concise Core Points */}
      <section className="py-20 bg-white border-t border-slate-200/80 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F7FAF8] rounded-[2.5rem] border border-slate-200/90 p-8 sm:p-12 shadow-sm relative overflow-hidden">
            
            {/* Header with Compact Founder Profile Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-200/80">
              <div className="flex items-center gap-4">
                {/* Small, Refined Founder Image */}
                <div className="relative shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#0F6E56]/30 shadow-md bg-slate-200">
                    <img
                      src="/profile.jpg"
                      alt="Vinayak Mishra - Founder of NutriGen"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0F6E56] border-2 border-white flex items-center justify-center text-white text-[10px]">
                    ✓
                  </div>
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E1F5EE] text-[#0F6E56] text-[11px] font-black uppercase tracking-wider mb-1">
                    <Sparkles className="w-3 h-3 text-[#BA7517]" />
                    <span>The Man Behind the Vision</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Vinayak Mishra
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-semibold">
                    Founder & CEO · 21-Year-Old Entrepreneur
                  </p>
                </div>
              </div>

              {/* Identity Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold shadow-2xs">
                  🇮🇳 India's First IBS Platform
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-[#E1F5EE] border border-[#0F6E56]/20 text-[#0F6E56] text-xs font-extrabold shadow-2xs">
                  Age 21 · Visionary
                </span>
              </div>
            </div>

            {/* Core Mission Quote */}
            <div className="mt-8 mb-6">
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                "Nobody should have to live in fear of their next meal."
              </div>
            </div>

            {/* Concise Core Points Paragraph */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs mb-8">
              <p className="text-slate-700 text-base sm:text-[17px] leading-relaxed">
                At 21, <strong>Vinayak Mishra</strong> founded <strong>NutriGen</strong> after experiencing firsthand the daily torment of chronic IBS and the frustrating inadequacy of manual food journals. Recognizing that conventional calorie apps completely fail to correlate meals with painful physical flare-ups, he engineered <strong>India's first dedicated IBS trigger tracking platform</strong>. By combining frictionless 2-tap meal logging with clinical pattern recognition, NutriGen eliminates dietary guesswork—helping thousands isolate hidden sensitivities, eat with confidence, and reclaim lasting gut health.
              </p>
            </div>

            {/* 3 Main Key Points Pill Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-3 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-[#E1F5EE] text-[#0F6E56] flex items-center justify-center font-black text-xs shrink-0">
                  01
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 mb-0.5">Lived IBS Struggle</div>
                  <div className="text-[11px] text-slate-500 leading-normal">Built from personal frustration with painful flare-ups and tedious food journals.</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-3 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#BA7517] flex items-center justify-center font-black text-xs shrink-0 border border-amber-200">
                  02
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 mb-0.5">Identified Market Gap</div>
                  <div className="text-[11px] text-slate-500 leading-normal">Generic calorie trackers count macros but ignore chronic digestive reactions.</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-3 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-[#E1F5EE] text-[#0F6E56] flex items-center justify-center font-black text-xs shrink-0">
                  03
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 mb-0.5">Created NutriGen</div>
                  <div className="text-[11px] text-slate-500 leading-normal">India's first dedicated trigger platform pairing 2-tap entry with pattern AI.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="py-24 bg-[#F7FAF8] border-t border-slate-200/80 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E1F5EE] rounded-full blur-[140px] pointer-events-none opacity-70"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Leaf className="w-12 h-12 text-[#0F6E56] mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Ready to heal your gut?
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Stop guessing and start understanding. Join thousands of members who have reclaimed their health with NutriGen.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-10 py-4 bg-[#0F6E56] hover:bg-[#0B5643] text-white rounded-xl text-xl font-bold transition-all transform hover:scale-[1.02] shadow-xl shadow-[#0F6E56]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              Start Your Journey <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={onSignIn}
              className="w-full sm:w-auto px-10 py-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl text-xl font-bold transition-colors cursor-pointer shadow-sm"
            >
              Sign In
            </button>
          </div>
          <p className="mt-6 text-slate-500 text-sm flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-[#0F6E56]" /> Secure, private, and tailored to you.
          </p>
        </div>
      </section>

    </div>
  );
}
