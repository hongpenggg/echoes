import type { VercelRequest, VercelResponse } from '@vercel/node';

// API keys live ONLY in server-side environment variables (no VITE_ prefix)
const API_KEYS = [
  process.env.OPENROUTER_API_KEY_1,
  process.env.OPENROUTER_API_KEY_2,
  process.env.OPENROUTER_API_KEY_3,
].filter((key): key is string => Boolean(key?.trim()));

if (API_KEYS.length === 0) {
  console.error('No OpenRouter API keys configured on the server.');
}

let currentKeyIndex = 0;

function getNextKey(failedIndex: number): string | null {
  const next = (failedIndex + 1) % API_KEYS.length;
  if (next === failedIndex) return null;
  currentKeyIndex = next;
  return API_KEYS[next];
}

async function callOpenRouter(apiKey: string, messages: object[]): Promise<Response> {
  return fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.APP_URL ?? 'https://echoes.vercel.app',
      'X-Title': 'Echoes - Debate with Historical Figures',
    },
    body: JSON.stringify({
      model: 'openrouter/free',
      messages,
      temperature: 0.7,
      response_format: { type: 'json_object' },
    }),
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (API_KEYS.length === 0) {
    return res.status(500).json({ error: 'Server is not configured with API keys.' });
  }

  const { messages } = req.body as { messages: object[] };
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request body: messages array required.' });
  }

  let attemptIndex = currentKeyIndex;
  let triedKeys = 0;

  while (triedKeys < API_KEYS.length) {
    const apiKey = API_KEYS[attemptIndex];
    let upstream: Response;

    try {
      upstream = await callOpenRouter(apiKey, messages);
    } catch (networkErr) {
      console.error(`Network error with key #${attemptIndex + 1}:`, networkErr);
      const next = getNextKey(attemptIndex);
      if (!next) break;
      attemptIndex = currentKeyIndex;
      triedKeys++;
      continue;
    }

    if (upstream.ok) {
      const data = await upstream.json();
      return res.status(200).json(data);
    }

    if (upstream.status === 429) {
      console.warn(`Rate limit on key #${attemptIndex + 1}, rotating...`);
      const next = getNextKey(attemptIndex);
      if (!next) break;
      attemptIndex = currentKeyIndex;
      triedKeys++;
      continue;
    }

    const errBody = await upstream.json().catch(() => ({ error: 'Unknown upstream error' }));
    console.error(`OpenRouter error ${upstream.status}:`, errBody);
    return res.status(upstream.status).json(errBody);
  }

  return res.status(429).json({
    error: 'All API keys have been rate-limited. Please try again later.',
  });
}
