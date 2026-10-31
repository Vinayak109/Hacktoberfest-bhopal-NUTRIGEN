import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const prompts = [
  {
    name: "feature-1.jpg",
    prompt: "A clean modern layout of healthy meals arranged aesthetically, with digital overlays showing calories, protein, carbs, and personalized nutrition data, minimal style, soft shadows, premium health-tech design"
  },
  {
    name: "feature-2.jpg",
    prompt: "A futuristic AI-powered nutrition system interface, showing personalized meal recommendations, health data visualization, clean UI dashboard, modern minimal design, soft lighting, premium SaaS style, white and gradient background, highly detailed, 4K"
  },
  {
    name: "feature-3.jpg",
    prompt: "A sleek health dashboard UI showing charts for calories, protein intake, progress tracking, weekly goals, modern SaaS interface, minimal and premium design, glassmorphism style, high resolution"
  },
  {
    name: "feature-4.jpg",
    prompt: "Abstract visualization of human gut microbiome data, glowing particles, biological patterns, AI data connections, futuristic health technology concept, dark background with neon accents, ultra detailed"
  }
];

async function generateImages() {
  for (const item of prompts) {
    try {
      console.log(`Generating ${item.name}...`);
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: item.prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "4:3",
            imageSize: "1K"
          }
        }
      });
      
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64Data = part.inlineData.data;
          const buffer = Buffer.from(base64Data, 'base64');
          fs.writeFileSync(path.join(process.cwd(), 'public', item.name), buffer);
          console.log(`Saved ${item.name}`);
        }
      }
    } catch (e) {
      console.error(`Failed to generate ${item.name}:`, e);
    }
  }
}

generateImages();
