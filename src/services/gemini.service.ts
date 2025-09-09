
import { Injectable, signal } from '@angular/core';
import { GoogleGenAI, Type } from "@google/genai";

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private readonly ai: GoogleGenAI;
  
  constructor() {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set.");
    }
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateIdeas(topic: string): Promise<string[]> {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate 5 creative and short project ideas about "${topic}".`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              ideas: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                  description: 'A single, concise project idea.'
                }
              }
            }
          },
        },
      });

      const jsonText = response.text.trim();
      const result = JSON.parse(jsonText);
      
      if (result && Array.isArray(result.ideas)) {
        return result.ideas;
      } else {
        console.error("Unexpected JSON structure:", result);
        return ["Failed to parse ideas from the response."];
      }

    } catch (error) {
      console.error('Error generating ideas:', error);
      throw new Error('Failed to generate ideas. Please check your API key and network connection.');
    }
  }
}
