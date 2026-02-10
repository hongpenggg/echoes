import { GoogleGenAI, Type, Schema } from "@google/genai";
import { DebateAnalysis } from "../types";

// Define the response schema for the debate interaction
const debateResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    reply: {
      type: Type.STRING,
      description: "The character's spoken response to the user.",
    },
    analysis: {
      type: Type.OBJECT,
      properties: {
        userPoint: { type: Type.STRING, description: "A concise summary of the user's last argument." },
        aiPoint: { type: Type.STRING, description: "A concise summary of the AI's counter-argument." },
        synthesis: { type: Type.STRING, description: "The current state of the clash between ideas." },
        fallacies: { 
          type: Type.ARRAY, 
          items: { 
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "The name of the logical fallacy (e.g., Ad Hominem, Straw Man)." },
              explanation: { type: Type.STRING, description: "A brief explanation of why this part of the argument is a fallacy." },
              improvement: { type: Type.STRING, description: "A suggestion on how to rephrase or structure the argument to be logically sound." }
            },
            required: ["name", "explanation", "improvement"]
          },
          description: "Any logical fallacies detected in the user's argument."
        },
        sources: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Relevant historical texts, books, or events cited or relevant to the current point."
        },
        score: {
          type: Type.INTEGER,
          description: "A number between 0 and 100. 0 means User is winning dominantly, 100 means AI is winning dominantly. 50 is even."
        },
        status: {
          type: Type.STRING,
          enum: ["ongoing", "user_victory", "ai_victory", "stalemate"],
          description: "The current status of the debate."
        },
        winningInsight: {
            type: Type.STRING,
            description: "If the debate is over, provide the key insight that decided the winner."
        }
      },
      required: ["userPoint", "aiPoint", "synthesis", "score", "status"],
    },
  },
  required: ["reply", "analysis"],
};

export const generateDebateTurn = async (
  characterPrompt: string,
  topic: string,
  history: { role: string; text: string }[],
  latestUserMessage: string
): Promise<{ reply: string; analysis: DebateAnalysis }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    ${characterPrompt}
    
    You are engaging in a debate on the topic: "${topic}".
    Your goal is to stay in character completely. Do not break character in the "reply" field.
    However, you also act as a neutral judge in the "analysis" field.
    
    In the analysis field:
    1. Summarize both arguments.
    2. Identify fallacies in the USER'S argument if any (e.g., Ad Hominem, Strawman, False Dichotomy, Slippery Slope). Be strict but fair.
    3. If a fallacy is found, provide the Name, a brief Explanation, and an Improvement suggestion.
    4. Cite sources relevant to your character's era or the topic.
    5. Adjust the score based on logical strength, evidence, and rhetoric.
    6. Determine if the debate has concluded (victory/defeat) if one side has completely conceded or been logically cornered.
  `;

  // Format history for the API
  // Note: We only send the last few turns to save tokens and keep context tight, 
  // but for a full app we might send more.
  const contents = [
    ...history.slice(-6).map((msg) => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.text }],
    })),
    {
      role: 'user',
      parts: [{ text: latestUserMessage }],
    },
  ];

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: debateResponseSchema,
        temperature: 0.7, 
      },
    });

    const jsonResponse = JSON.parse(response.text || "{}");
    
    // Default fallback if JSON parsing fails slightly or fields missing
    return {
        reply: jsonResponse.reply || "I ponder your words...",
        analysis: {
            summary: {
                userPoint: jsonResponse.analysis?.userPoint || "Arguments presented.",
                aiPoint: jsonResponse.analysis?.aiPoint || "Counter-points raised.",
                synthesis: jsonResponse.analysis?.synthesis || "The debate continues."
            },
            fallacies: jsonResponse.analysis?.fallacies || [],
            sources: jsonResponse.analysis?.sources || [],
            score: jsonResponse.analysis?.score ?? 50,
            status: jsonResponse.analysis?.status || "ongoing",
            winningInsight: jsonResponse.analysis?.winningInsight
        }
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate debate response.");
  }
};