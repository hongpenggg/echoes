import { DebateAnalysis } from "../types";

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

  const messages = [
    { role: "system", content: systemInstruction },
    ...history.slice(-6).map((msg) => ({
      role: msg.role === "ai" ? "assistant" : "user",
      content: msg.text,
    })),
    { role: "user", content: latestUserMessage },
  ];

  const response = await fetch("/api/debate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    const errBody = await response.json().catch(() => ({ error: "Unknown error" }));
    const message = errBody?.error ?? `Request failed: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  const content: string = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No content in API response");
  }

  const jsonResponse: DebateResponse = JSON.parse(content);

  return {
    reply: jsonResponse.reply || "I ponder your words...",
    analysis: {
      summary: {
        userPoint: jsonResponse.analysis?.userPoint || "Arguments presented.",
        aiPoint: jsonResponse.analysis?.aiPoint || "Counter-points raised.",
        synthesis: jsonResponse.analysis?.synthesis || "The debate continues.",
      },
      fallacies: jsonResponse.analysis?.fallacies || [],
      sources: jsonResponse.analysis?.sources || [],
      score: jsonResponse.analysis?.score ?? 50,
      status: jsonResponse.analysis?.status || "ongoing",
      winningInsight: jsonResponse.analysis?.winningInsight,
    },
  };
};
