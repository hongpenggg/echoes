import { DebateAnalysis } from "../types";

// Define the response schema structure we expect from OpenRouter
interface DebateResponse {
  reply: string;
  analysis: {
    userPoint: string;
    aiPoint: string;
    synthesis: string;
    fallacies: Array<{
      name: string;
      explanation: string;
      improvement: string;
    }>;
    sources: string[];
    score: number;
    status: "ongoing" | "user_victory" | "ai_victory" | "stalemate";
    winningInsight?: string;
  };
}

export const generateDebateTurn = async (
  characterPrompt: string,
  topic: string,
  history: { role: string; text: string }[],
  latestUserMessage: string
): Promise<{ reply: string; analysis: DebateAnalysis }> => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  
  if (!apiKey) {
    throw new Error("OpenRouter API key is not configured. Please add VITE_OPENROUTER_API_KEY to your .env.local file.");
  }

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
    
    YOU MUST respond in valid JSON format matching this exact structure:
    {
      "reply": "Your in-character response here",
      "analysis": {
        "userPoint": "Summary of user's argument",
        "aiPoint": "Summary of AI's argument",
        "synthesis": "Current state of debate",
        "fallacies": [
          {
            "name": "Fallacy name",
            "explanation": "Why it's a fallacy",
            "improvement": "How to improve the argument"
          }
        ],
        "sources": ["Relevant source 1", "Relevant source 2"],
        "score": 50,
        "status": "ongoing",
        "winningInsight": "Optional: key insight if debate ended"
      }
    }
  `;

  // Format conversation history for OpenRouter
  const messages = [
    {
      role: "system",
      content: systemInstruction
    },
    ...history.slice(-6).map((msg) => ({
      role: msg.role === 'ai' ? 'assistant' : 'user',
      content: msg.text,
    })),
    {
      role: "user",
      content: latestUserMessage,
    },
  ];

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "Echoes - Debate with Historical Figures",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: messages,
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
      console.error("OpenRouter API Error:", errorData);
      throw new Error(`OpenRouter API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error("No content in OpenRouter response");
    }

    // Parse the JSON response
    const jsonResponse: DebateResponse = JSON.parse(content);
    
    // Validate and return with fallback values
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
    console.error("OpenRouter API Error:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate debate response: ${error.message}`);
    }
    throw new Error("Failed to generate debate response.");
  }
};