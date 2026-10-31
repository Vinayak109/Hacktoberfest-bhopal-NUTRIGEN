import React from 'react';
import { OnboardingData } from '../App';

interface TriggerHypothesisProps {
  data: OnboardingData;
}

export default function TriggerHypothesis({ data }: TriggerHypothesisProps) {
  const { symptoms = [], triggers = [], isNotSure } = data;
  
  const hasSymptom = (s: string) => symptoms.some(sym => sym.toLowerCase().includes(s.toLowerCase()));
  const hasTrigger = (t: string) => !isNotSure && triggers.some(trg => trg.toLowerCase().includes(t.toLowerCase()));

  const hasBloating = hasSymptom('bloating');
  const hasGas = hasSymptom('gas') || hasSymptom('flatulence');
  const hasStomachPain = hasSymptom('stomach pain') || hasSymptom('stomach');

  const hasDairyTrigger = hasTrigger('dairy') || hasTrigger('cheese') || hasTrigger('milk');
  const hasOnionTrigger = hasTrigger('onion') || hasTrigger('garlic');
  const hasFriedTrigger = hasTrigger('fried') || hasTrigger('oily');

  // Logic:
  // If user selected "bloating" AND dairy is in their known triggers → show Dairy at 75% confidence
  // If user selected "bloating" but dairy NOT mentioned → show Dairy at 45% confidence
  let dairyConf = 15;
  if (hasBloating && hasDairyTrigger) dairyConf = 75;
  else if (hasBloating) dairyConf = 45;
  else if (hasDairyTrigger) dairyConf = 60; // if only trigger

  // If user selected "gas" AND onion/garlic in triggers → show Onion & Garlic at 70%
  let onionConf = 15;
  if (hasGas && hasOnionTrigger) onionConf = 70;
  else if (hasGas) onionConf = 40; // 40-70 is amber
  else if (hasOnionTrigger) onionConf = 60; // if only trigger

  // If user selected "stomach pain" AND fried food in triggers → show Fried food at 65%
  let friedConf = 15;
  if (hasStomachPain && hasFriedTrigger) friedConf = 65;
  else if (hasStomachPain) friedConf = 35; // under 40 is gray
  else if (hasFriedTrigger) friedConf = 55;

  let beansConf = 25; // Default monitoring
  
  const getLabelAndColor = (conf: number) => {
    // red fill for >70%, amber for 40–70%, gray for <40%
    if (conf > 70) return { label: 'Suspected', colorClass: 'bg-red-400' };
    if (conf >= 40) return { label: 'Likely', colorClass: 'bg-amber-500' };
    return { label: 'Monitoring', colorClass: 'bg-slate-300' };
  };

  const allTriggers = [
    { name: 'Dairy', conf: dairyConf },
    { name: 'Onion / garlic', conf: onionConf },
    { name: 'Fried food', conf: friedConf },
    { name: 'Beans & lentils', conf: beansConf }
  ].map(t => ({
    id: t.name,
    name: t.name,
    confidence: t.conf,
    ...getLabelAndColor(t.conf)
  }));

  // Sort by confidence
  allTriggers.sort((a, b) => b.confidence - a.confidence);
  
  const topTriggers = allTriggers.slice(0, 4);

  return (
    <div className="mb-8">
      <h3 className="text-xs font-bold text-slate-500 tracking-wider uppercase mb-4">Watching for your triggers</h3>
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <p className="text-sm text-slate-600 mb-6">
          Based on your onboarding, these are your top suspected triggers. Every meal you log helps us confirm or clear each one.
        </p>
        
        <div className="flex flex-col gap-4 mb-6">
          {topTriggers.map(trigger => (
            <div key={trigger.id} className="flex items-center gap-3">
              <div className="w-28 text-sm font-medium text-slate-900">{trigger.name}</div>
              <div className="flex-grow h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${trigger.colorClass}`} 
                  style={{ width: `${trigger.confidence}%` }}
                ></div>
              </div>
              <div className="w-20 text-right text-xs text-slate-500 font-medium">{trigger.label}</div>
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
          Confidence grows with every meal you log. Check back in 7 days.
        </div>
      </div>
    </div>
  );
}
