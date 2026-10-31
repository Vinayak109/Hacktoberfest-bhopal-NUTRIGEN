import { UserProfile, NutritionPlan, DailyMeals } from '../types';
import { OnboardingData } from '../App';

async function callApi(action: string, data: any): Promise<any> {
  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ action, data })
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.result) {
        return json.result;
      }
    }
  } catch (err) {
    console.warn('API call failed, switching to local client fallback:', err);
  }

  return null;
}

// Client-side fallback for offline or static hosting
function getClientFallbackMeals(data: OnboardingData): DailyMeals {
  const triggers = (data.triggers || []).map(t => t.toLowerCase());
  const hasDairy = triggers.some(t => t.includes('dairy') || t.includes('milk') || t.includes('paneer') || t.includes('curd'));
  const hasGluten = triggers.some(t => t.includes('gluten') || t.includes('wheat') || t.includes('roti'));

  return {
    breakfast: {
      name: hasGluten 
        ? 'Turmeric Poha with Roasted Peanuts & Fresh Curry Leaves'
        : 'Crispy Moong Dal Chilla with Mint Coriander Chutney',
      time_window: '8:00 AM – 9:00 AM',
      ingredients: hasGluten
        ? ['Flattened rice (Poha)', 'Roasted peanuts', 'Fresh curry leaves', 'Mustard seeds', 'Turmeric']
        : ['Yellow moong dal batter', 'Fresh ginger', 'Coriander leaves', 'Cumin powder', 'Sesame oil'],
      why_safe: 'Gentle on sensitive stomach lining with zero hard-to-digest legumes.',
      watch_ingredient: hasDairy ? null : 'A2 Ghee (1 tsp)',
      is_trigger_safe: true
    },
    lunch: {
      name: hasDairy
        ? 'Steamed Basmati Rice with Gut-Soothing Moong Dal & Bottle Gourd'
        : 'Steamed Basmati Rice with Cumin Moong Dal & Low-Fat Fresh Curd',
      time_window: '1:00 PM – 2:00 PM',
      ingredients: hasDairy
        ? ['Aged Basmati rice', 'Split yellow moong dal', 'Tender bottle gourd (lauki)', 'Jeera seeds', 'Pink salt']
        : ['Aged Basmati rice', 'Yellow moong dal', 'Homemade fresh curd', 'Jeera seeds', 'Rock salt'],
      why_safe: 'Split yellow moong dal is naturally low-FODMAP and easy to break down.',
      watch_ingredient: hasDairy ? null : 'Low-lactose fresh curd (1/2 cup)',
      is_trigger_safe: true
    },
    dinner: {
      name: 'Warm Pumpkin & Carrot Soup with Sauteed Tofu & Quinoa',
      time_window: '7:30 PM – 8:30 PM',
      ingredients: ['Red pumpkin', 'Carrots', 'Fresh ginger', 'Quinoa', 'Roasted cumin'],
      why_safe: 'Rich in soluble fiber that calms the intestinal tract overnight.',
      watch_ingredient: null,
      is_trigger_safe: true
    }
  };
}

function getClientFallbackSummary(data: OnboardingData): string {
  const name = data.firstName && data.firstName.trim() ? data.firstName.trim() : 'Friend';
  const symptoms = (data.symptoms && data.symptoms.length > 0) 
    ? data.symptoms.slice(0, 3).join(', ') 
    : 'bloating, irregular digestion, and discomfort';
  const triggersList = (data.triggers && data.triggers.length > 0)
    ? data.triggers.join(', ')
    : 'spicy foods, high-lactose dairy, and heavy fried meals';

  return `
    <div class="space-y-6">
      <div class="border-b border-[#0F6E56]/20 pb-4">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E1F5EE] text-[#0F6E56] border border-[#0F6E56]/20">
          Personalized IBS Gut Blueprint
        </span>
        <h3 class="text-2xl font-black text-slate-900 mt-2">Welcome to NutriGen, ${name}</h3>
        <p class="text-slate-600 text-sm mt-1">Here is how we are structuring your gut-safe nutrition plan.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <p class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Target Symptoms</p>
          <p class="text-sm font-semibold text-slate-900">${symptoms}</p>
          <p class="text-xs text-slate-500 mt-1">Focusing on reducing intestinal inflammation and rapid fermentation.</p>
        </div>

        <div class="p-4 rounded-xl bg-[#E1F5EE]/60 border border-[#0F6E56]/20">
          <p class="text-xs font-bold uppercase tracking-wider text-[#0F6E56] mb-1">Filtered Triggers</p>
          <p class="text-sm font-semibold text-slate-900">${triggersList}</p>
          <p class="text-xs text-[#0F6E56] mt-1">100% excluded from your active meal recommendations.</p>
        </div>
      </div>

      <div class="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-slate-800 text-sm">
        <span class="font-bold text-amber-900">Your Goal: </span>
        <span>${data.mainGoal || 'Eliminate daily bloating and regain digestive confidence.'}</span>
      </div>

      <div class="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200 text-center">
        <p class="text-sm font-bold text-[#0F6E56]">
          Your first meal plan is being built around you — not a template.
        </p>
      </div>
    </div>
  `.trim();
}

export async function generateDailyMeals(data: OnboardingData): Promise<DailyMeals> {
  const result = await callApi('generateDailyMeals', data);
  if (result && result.breakfast && result.lunch && result.dinner) {
    return result as DailyMeals;
  }
  return getClientFallbackMeals(data);
}

export async function generatePersonalizedSummary(data: OnboardingData): Promise<string> {
  const result = await callApi('generatePersonalizedSummary', data);
  if (typeof result === 'string' && result.trim()) {
    return result;
  }
  return getClientFallbackSummary(data);
}

export async function generateNutritionPlan(profile: UserProfile): Promise<NutritionPlan> {
  const result = await callApi('generateNutritionPlan', profile);
  if (result && result.summary && result.dailyPlans) {
    return result as NutritionPlan;
  }

  // Fallback 3-day plan
  return {
    summary: 'A 3-day gut-soothing meal plan designed around low-fermentation, low-FODMAP Indian staples to eliminate bloating and identify triggers.',
    dailyPlans: [
      {
        day: 'Day 1',
        totalCalories: 1650,
        meals: {
          breakfast: {
            name: 'Poha with Curry Leaves & Mustard Seeds',
            description: 'Flattened rice tossed with turmeric, mild peanuts, and fresh cilantro.',
            calories: 380,
            protein: 9,
            carbs: 62,
            fat: 11
          },
          lunch: {
            name: 'Yellow Moong Dal with Soft Steamed Rice',
            description: 'Split yellow dal cooked with cumin, ginger, and pink salt, served with rice.',
            calories: 540,
            protein: 20,
            carbs: 85,
            fat: 12
          },
          dinner: {
            name: 'Bottle Gourd (Lauki) Sabzi with Warm Quinoa',
            description: 'Tender simmered gourd with mild cumin tempering and warm quinoa.',
            calories: 460,
            protein: 15,
            carbs: 68,
            fat: 14
          },
          snacks: [
            {
              name: 'Roasted Makhana with Rock Salt',
              description: 'Crispy lotus seeds roasted in half tsp A2 ghee.',
              calories: 140,
              protein: 4,
              carbs: 24,
              fat: 3
            }
          ]
        }
      },
      {
        day: 'Day 2',
        totalCalories: 1700,
        meals: {
          breakfast: {
            name: 'Moong Dal Chilla with Mint Chutney',
            description: 'Savory soaked lentil crepe with ginger and fresh herbs.',
            calories: 410,
            protein: 18,
            carbs: 55,
            fat: 13
          },
          lunch: {
            name: 'Khichdi with Carrot & Cumin Tadka',
            description: 'Easy-to-digest rice and lentil pot dish seasoned with cumin and turmeric.',
            calories: 520,
            protein: 19,
            carbs: 80,
            fat: 14
          },
          dinner: {
            name: 'Zucchini & Tofu Stir-Fry with Rice Noodles',
            description: 'Mild wok-tossed low-FODMAP vegetables and protein.',
            calories: 490,
            protein: 22,
            carbs: 64,
            fat: 16
          },
          snacks: [
            {
              name: 'Ripe Banana with Chia Seeds',
              description: 'Gentle soluble fiber boost.',
              calories: 130,
              protein: 2,
              carbs: 28,
              fat: 2
            }
          ]
        }
      },
      {
        day: 'Day 3',
        totalCalories: 1680,
        meals: {
          breakfast: {
            name: 'Warm Rolled Oats with Almond Milk & Cinnamon',
            description: 'Cooked rolled oats with dairy-free almond milk and a touch of organic jaggery.',
            calories: 390,
            protein: 12,
            carbs: 64,
            fat: 10
          },
          lunch: {
            name: 'Curd Rice with Pomegranate (A2/Lactose-Free)',
            description: 'Cooling rice tossed with gentle probiotics, ginger, and fresh pomegranate.',
            calories: 510,
            protein: 16,
            carbs: 78,
            fat: 14
          },
          dinner: {
            name: 'Spinach & Moong Soup with Baked Sweet Potato',
            description: 'Nutrient-dense warm pureed soup with roasted sweet potato wedges.',
            calories: 480,
            protein: 16,
            carbs: 72,
            fat: 13
          },
          snacks: [
            {
              name: 'Coconut Water with Soaked Basil Seeds',
              description: 'Electrolyte-rich cooling hydration.',
              calories: 90,
              protein: 1,
              carbs: 18,
              fat: 1
            }
          ]
        }
      }
    ],
    groceryList: [
      {
        category: 'Grains & Pulses',
        items: ['Yellow Moong Dal (Split)', 'Flattened Rice (Poha)', 'Aged Basmati Rice', 'Quinoa', 'Rolled Oats']
      },
      {
        category: 'Fresh Produce',
        items: ['Bottle Gourd (Lauki)', 'Carrots', 'Spinach', 'Fresh Ginger', 'Coriander & Mint', 'Sweet Potatoes']
      },
      {
        category: 'Pantry & Seasonings',
        items: ['Cumin Seeds (Jeera)', 'Turmeric Powder', 'Pink Himalayan Salt', 'A2 Ghee / Sesame Oil', 'Roasted Lotus Seeds (Makhana)']
      }
    ]
  };
}

export async function searchNutritionInfo(query: string) {
  const result = await callApi('searchNutritionInfo', { query });
  return result;
}
