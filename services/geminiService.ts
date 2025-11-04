// FIX: Create content for geminiService.ts to provide AI functionality.
import { GoogleGenAI } from "@google/genai";

// FIX: Initialize the GoogleGenAI client as per the guidelines.
// The API key must be obtained from `process.env.API_KEY`.
const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

export const getAIStockAnalysis = async (query: string): Promise<string> => {
    try {
        // FIX: Use ai.models.generateContent to query the model.
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analyze the following stock-related query and provide a concise summary. This is for informational purposes only and does not constitute financial advice. Query: "${query}"`,
            config: {
                systemInstruction: "You are a helpful financial analyst assistant. Provide clear, concise, and informative answers about stock market queries. Always include a disclaimer that this is not financial advice."
            }
        });
        
        // FIX: Directly access the 'text' property from the response for the generated content.
        return response.text;
    } catch (error) {
        console.error("Error getting AI stock analysis:", error);
        throw new Error("Failed to communicate with the AI service.");
    }
};
