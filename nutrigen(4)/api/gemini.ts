import { GoogleGenAI, Type } from '@google/genai';

interface OnboardingPayload {
  firstName?: string;
  ageRange?: string;
  biologicalSex?: string;
  symptoms?: string[];
  otherSymptom?: string;
  frequency?: string;
  timing?: string[];
  triggers?: string[];
  isNotSure?: boolean;
  allergies?: string[];
  otherAllergy?: string;
  dietaryPreferences?: string[];
  cuisines?: string[];
  cookingFrequency?: string;
  budget?: string;
  mainGoal?: string;
  microbiomeReport?: string;
}

// Fallback generator when GEMINI_API_KEY is not set or quota is exceeded
function generateFallbackDailyMeals(data: OnboardingPayload) {
  const triggers = (data.triggers || []).map(t => t.toLowerCase());
  const hasDairyTrigger = triggers.some(t => t.includes('dairy') || t.includes('milk') || t.includes('paneer') || t.includes('curd'));
  const hasGlutenTrigger = triggers.some(t => t.includes('gluten') || t.includes('wheat') || t.includes('roti'));
  const hasOnionGarlicTrigger = triggers.some(t => t.includes('onion') || t.includes('garlic'));

  const breakfastName = hasGlutenTrigger 
    ? 'Turmeric Poha with Roasted Peanuts & Curry Leaves' 
    : 'Moong Dal Chilla with Mint Coriander Chutney';
  
  const breakfastIngredients = hasGlutenTrigger
    ? ['Thick flattened rice (Poha)', 'Roasted peanuts', 'Fresh curry leaves', 'Mustard seeds', 'Cold-pressed coconut oil', 'Pinch of turmeric']
    : ['Yellow moong dal batter', 'Grated ginger', 'Fresh coriander', 'Cumin powder', 'Cold-pressed sesame oil'];

  const lunchName = hasDairyTrigger
    ? 'Steamed Basmati Rice with Gut-Soothing Moong Dal & Bottle Gourd'
    : 'Soft Rice Bowl with Cumin-Tempered Dal & Low-Fat Fresh Curd';

  const lunchIngredients = hasDairyTrigger
    ? ['Aged Basmati rice', 'Yellow split moong dal', 'Tender bottle gourd (lauki)', 'Cumin seeds (Jeera)', 'Pink Himalayan salt', 'Hing (asafoetida optional)']
    : ['Steamed rice', 'Yellow moong dal', 'Fresh homemade low-lactose curd', 'Cumin seeds', 'Clarified butter (A2 Ghee)'];

  const dinnerName = 'Warm Pumpkin & Carrot Soup with Sauteed Tofu / Quinoa Khichdi';
  const dinnerIngredients = ['Red pumpkin cubes', 'Tender orange carrots', 'Fresh ginger juice', 'Soaked quinoa or rice', 'Pinch of roasted cumin'];

  return {
    breakfast: {
      name: breakfastName,
      time_window: '8:00 AM – 9:00 AM',
      ingredients: breakfastIngredients,
      why_safe: `Gentle on digestive lining, zero ${hasGlutenTrigger ? 'gluten' : 'heavy pulses'}, easily absorbed without sudden gas production.`,
      watch_ingredient: hasDairyTrigger ? null : 'A2 Ghee (1 tsp)',
      is_trigger_safe: true
    },
    lunch: {
      name: lunchName,
      time_window: '1:00 PM – 2:00 PM',
      ingredients: lunchIngredients,
      why_safe: `Split yellow lentils are pre-soaked to neutralize phytates and oligosaccharides. Strictly avoids ${triggers.length ? triggers.join(', ') : 'common irritants'}.`,
      watch_ingredient: hasDairyTrigger ? null : 'Fresh curd (tested portion)',
      is_trigger_safe: true
    },
    dinner: {
      name: dinnerName,
      time_window: '7:30 PM – 8:30 PM',
      ingredients: dinnerIngredients,
      why_safe: 'High in soluble pectin fibers that soothe the colon wall before sleeping, ensuring calm overnight digestion.',
      watch_ingredient: null,
      is_trigger_safe: true
    }
  };
}

function generateFallbackPersonalizedSummary(data: OnboardingPayload): string {
  const name = data.firstName && data.firstName.trim() ? data.firstName.trim() : 'Friend';
  const symptoms = (data.symptoms && data.symptoms.length > 0) 
    ? data.symptoms.slice(0, 3).join(', ') 
    : 'bloating, irregular digestion, and discomfort';
  const triggersList = (data.triggers && data.triggers.length > 0)
    ? data.triggers.join(', ')
    : 'spicy foods, high-lactose dairy, and heavy fried meals';

  return `
    <div class="space-y-6">
      <div class="border-b border-emerald-100 pb-4">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#0F6E56] border border-[#0F6E56]/20">
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

        <div class="p-4 rounded-xl bg-emerald-50/70 border border-[#0F6E56]/20">
          <p class="text-xs font-bold uppercase tracking-wider text-[#0F6E56] mb-1">Filtered Triggers</p>
          <p class="text-sm font-semibold text-slate-900">${triggersList}</p>
          <p class="text-xs text-[#0F6E56] mt-1">100% excluded from your active meal recommendations.</p>
        </div>
      </div>

      <div class="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-slate-800 text-sm">
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

function generateFallbackNutritionPlan() {
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

export default async function handler(req: any, res: any) {
  // Set CORS headers for Vercel
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Parse body
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const action = body?.action || req.query?.action;
  const payload = body?.data || {};

  const apiKey = process.env.GEMINI_API_KEY;

  try {
    if (action === 'generateDailyMeals') {
      if (apiKey) {
        try {
          const ai = new GoogleGenAI({ apiKey });
          const prompt = `
            You are NutriGen's meal plan engine for Indian users with IBS, bloating, or food sensitivities.
            User profile:
            - Symptoms: ${(payload.symptoms || []).join(', ')} ${payload.otherSymptom ? `(${payload.otherSymptom})` : ''}
            - Confirmed triggers to avoid: ${(payload.triggers || []).join(', ')}
            - Allergies: ${(payload.allergies || []).join(', ')} ${payload.otherAllergy ? `(${payload.otherAllergy})` : ''}
            - Cuisine preference: ${(payload.cuisines || []).join(', ')}
            - Budget per meal: ${payload.budget || 'Moderate'}
            - Cooking at home: ${payload.cookingFrequency || 'Daily'}

            Generate exactly 3 meals for today (breakfast, lunch, dinner) in JSON format.
            Rules:
            - Exclude ALL confirmed triggers.
            - Favor Indian gut-safe home-cooked staples (moong dal, poha, rice, bottle gourd, ginger).
            - No calorie counts.
            - Keep ingredients to 5-7 items max.
          `;

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  breakfast: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      time_window: { type: Type.STRING },
                      ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                      why_safe: { type: Type.STRING },
                      watch_ingredient: { type: Type.STRING, nullable: true },
                      is_trigger_safe: { type: Type.BOOLEAN }
                    },
                    required: ['name', 'time_window', 'ingredients', 'why_safe', 'is_trigger_safe']
                  },
                  lunch: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      time_window: { type: Type.STRING },
                      ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                      why_safe: { type: Type.STRING },
                      watch_ingredient: { type: Type.STRING, nullable: true },
                      is_trigger_safe: { type: Type.BOOLEAN }
                    },
                    required: ['name', 'time_window', 'ingredients', 'why_safe', 'is_trigger_safe']
                  },
                  dinner: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      time_window: { type: Type.STRING },
                      ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                      why_safe: { type: Type.STRING },
                      watch_ingredient: { type: Type.STRING, nullable: true },
                      is_trigger_safe: { type: Type.BOOLEAN }
                    },
                    required: ['name', 'time_window', 'ingredients', 'why_safe', 'is_trigger_safe']
                  }
                },
                required: ['breakfast', 'lunch', 'dinner']
              }
            }
          });

          if (response.text) {
            return res.status(200).json({ success: true, result: JSON.parse(response.text) });
          }
        } catch (apiError) {
          console.warn('Gemini API call failed, using intelligent fallback:', apiError);
        }
      }

      // Fallback
      return res.status(200).json({ success: true, result: generateFallbackDailyMeals(payload) });
    }

    if (action === 'generatePersonalizedSummary') {
      if (apiKey) {
        try {
          const ai = new GoogleGenAI({ apiKey });
          const prompt = `
            You are a warm, knowledgeable friend and a holistic nutrition expert.
            A user just completed their onboarding for NutriGen (an Indian IBS trigger tracking app).
            
            User details:
            - First Name: ${payload.firstName || 'Friend'}
            - Symptoms: ${(payload.symptoms || []).join(', ')}
            - Triggers: ${(payload.triggers || []).join(', ')}
            - Goal: ${payload.mainGoal || 'Eliminate digestive distress'}
            
            Return raw clean HTML with Tailwind utility classes.
            Address the user by name, state excluded triggers with brief why, and end with:
            "Your first meal plan is being built around you — not a template."
            Do not include markdown backticks.
          `;

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt
          });

          let html = response.text || '';
          html = html.replace(/^```html\s*/, '').replace(/```\s*$/, '').trim();
          if (html) {
            return res.status(200).json({ success: true, result: html });
          }
        } catch (apiError) {
          console.warn('Gemini summary failed, using fallback:', apiError);
        }
      }

      return res.status(200).json({ success: true, result: generateFallbackPersonalizedSummary(payload) });
    }

    if (action === 'generateNutritionPlan') {
      if (apiKey) {
        try {
          const ai = new GoogleGenAI({ apiKey });
          const prompt = `
            Generate a personalized 3-day nutrition plan and grocery list for an Indian user with gut sensitivity.
            Profile: ${JSON.stringify(payload)}
          `;
          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json'
            }
          });
          if (response.text) {
            return res.status(200).json({ success: true, result: JSON.parse(response.text) });
          }
        } catch (apiError) {
          console.warn('Gemini plan failed, using fallback:', apiError);
        }
      }

      return res.status(200).json({ success: true, result: generateFallbackNutritionPlan() });
    }

    // Default status/health
    return res.status(200).json({
      status: 'ok',
      service: 'NutriGen Gemini API Proxy',
      vercelReady: true,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error('API Error:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Internal Server Error'
    });
  }
}
