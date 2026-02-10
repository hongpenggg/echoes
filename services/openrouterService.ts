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

// API Key rotation management
class ApiKeyRotator {
  private apiKeys: string[];
  private currentKeyIndex: number;
  private failedKeys: Set<number>;

  constructor() {
    // Load all three API keys from environment variables
    this.apiKeys = [
      import.meta.env.VITE_OPENROUTER_API_KEY_1,
      import.meta.env.VITE_OPENROUTER_API_KEY_2,
      import.meta.env.VITE_OPENROUTER_API_KEY_3
    ].filter(key => key && key.trim() !== ''); // Remove empty/undefined keys

    if (this.apiKeys.length === 0) {
      throw new Error(
        "No OpenRouter API keys configured. Please add at least VITE_OPENROUTER_API_KEY_1 to your .env.local file."
      );
    }

    // Try to load the last successful key index from localStorage
    const savedIndex = localStorage.getItem('openrouter_key_index');
    this.currentKeyIndex = savedIndex ? parseInt(savedIndex, 10) : 0;
    
    // Ensure index is valid
    if (this.currentKeyIndex >= this.apiKeys.length) {
      this.currentKeyIndex = 0;
    }

    this.failedKeys = new Set();

    console.log(`🔑 API Key Rotator initialized with ${this.apiKeys.length} key(s)`);
  }

  getCurrentKey(): string {
    return this.apiKeys[this.currentKeyIndex];
  }

  getCurrentKeyNumber(): number {
    return this.currentKeyIndex + 1;
  }

  getTotalKeys(): number {
    return this.apiKeys.length;
  }

  switchToNextKey(): boolean {
    // Mark current key as failed
    this.failedKeys.add(this.currentKeyIndex);

    // Try to find next available key
    const startIndex = this.currentKeyIndex;
    do {
      this.currentKeyIndex = (this.currentKeyIndex + 1) % this.apiKeys.length;
      
      // If we've looped back to start, all keys have failed
      if (this.currentKeyIndex === startIndex && this.failedKeys.has(this.currentKeyIndex)) {
        console.error('❌ All API keys have been exhausted');
        return false;
      }

      // Found an unfailed key
      if (!this.failedKeys.has(this.currentKeyIndex)) {
        localStorage.setItem('openrouter_key_index', this.currentKeyIndex.toString());
        console.log(`🔄 Switched to API key #${this.currentKeyIndex + 1}`);
        return true;
      }
    } while (true);
  }

  markCurrentKeySuccessful(): void {
    // Remove from failed keys if it was marked as failed
    this.failedKeys.delete(this.currentKeyIndex);
    localStorage.setItem('openrouter_key_index', this.currentKeyIndex.toString());
  }

  resetFailedKeys(): void {
    // Reset failed keys (useful when rate limits have likely reset, e.g., new day)
    this.failedKeys.clear();
    console.log('🔄 Reset all failed API keys');
  }

  getStatus(): string {
    return `Using API key ${this.currentKeyIndex + 1}/${this.apiKeys.length} (${this.failedKeys.size} failed)`;
  }
}

// Create a singleton instance
const keyRotator = new ApiKeyRotator();

// Reset failed keys once per day (when localStorage date changes)
const checkAndResetDaily = () => {
  const today = new Date().toDateString();
  const lastReset = localStorage.getItem('openrouter_last_reset');
  
  if (lastReset !== today) {
    keyRotator.resetFailedKeys();
    localStorage.setItem('openrouter_last_reset', today);
  }
};

checkAndResetDaily();

// Helper function to check if error is a rate limit error
const isRateLimitError = (status: number, errorData: any): boolean => {
  // OpenRouter returns 429 for rate limit errors
  if (status === 429) return true;
  
  // Check error message for rate limit indicators
  const errorMessage = errorData?.error?.message?.toLowerCase() || '';
  return errorMessage.includes('rate limit') || 
         errorMessage.includes('too many requests') ||
         errorMessage.includes('quota');
};

export const generateDebateTurn = async (
  characterPrompt: string,
  topic: string,
  history: { role: string; text: string }[],
  latestUserMessage: string,
  retryCount: number = 0
): Promise<{ reply: string; analysis: DebateAnalysis }> => {
  const maxRetries = keyRotator.getTotalKeys(); // Try all available keys
  
  if (retryCount >= maxRetries) {
    throw new Error(
      `All ${maxRetries} API key(s) have been exhausted. Please try again later or check your rate limits.`
    );
  }

  const apiKey = keyRotator.getCurrentKey();
  
  if (!apiKey) {
    throw new Error("No API key available. Please configure your OpenRouter API keys.");
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
    console.log(`📡 ${keyRotator.getStatus()}`);
    
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
      
      // Check if this is a rate limit error
      if (isRateLimitError(response.status, errorData)) {
        console.warn(`⚠️ Rate limit hit on API key #${keyRotator.getCurrentKeyNumber()}`);
        
        // Try to switch to next key
        const switched = keyRotator.switchToNextKey();
        if (switched) {
          console.log(`🔄 Retrying with next API key... (Attempt ${retryCount + 1}/${maxRetries})`);
          // Retry with next key
          return generateDebateTurn(characterPrompt, topic, history, latestUserMessage, retryCount + 1);
        } else {
          throw new Error(
            `All ${maxRetries} API key(s) have reached their rate limits. Please try again later.`
          );
        }
      }
      
      // Other errors
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
    
    // Mark this key as successful since we got a valid response
    keyRotator.markCurrentKeySuccessful();
    
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
    // If it's already our custom error about exhausted keys, re-throw it
    if (error instanceof Error && error.message.includes('exhausted')) {
      throw error;
    }
    
    console.error("OpenRouter API Error:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate debate response: ${error.message}`);
    }
    throw new Error("Failed to generate debate response.");
  }
};

// Export rotator for debugging/status checks if needed
export const getApiKeyStatus = () => keyRotator.getStatus();