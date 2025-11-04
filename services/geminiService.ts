
import { GoogleGenAI } from "@google/genai";

// FIX: Per coding guidelines, the API key is assumed to be set in the environment.
// Redundant checks and local variables for the key have been removed.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getAIStockAnalysis = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a financial analyst. Provide a concise, easy-to-understand analysis for the following query. Do not give financial advice. Keep the response under 150 words. Query: "${prompt}"`,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching AI analysis:", error);
    return "Sorry, I couldn't fetch an analysis at this time. Please try again later.";
  }
};