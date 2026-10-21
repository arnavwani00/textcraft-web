import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { generateSmartReplies } from './src/utils/engine.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize Gemini API client if API key is present
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({});
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client:', err);
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: Date.now(),
  });
});

// Reply generation endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const { message, situation, vibe, toneIntensity = 50, length = 'medium', context } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    // If Gemini API is available, try generating dynamic contextual replies
    if (aiClient && process.env.GEMINI_API_KEY) {
      try {
        const toneDesc = toneIntensity < 35 
          ? 'gentle, soft, and cautious' 
          : toneIntensity > 70 
          ? 'unfiltered, blunt, and direct' 
          : 'balanced and assertive';

        const lengthDesc = length === 'short' 
          ? '1 punchy sentence, concise' 
          : length === 'detailed' 
          ? '2 to 3 sentences with thoughtful nuance' 
          : '1 to 2 balanced sentences';

        const prompt = `You are TextCraft, the ultimate conversational reply engine.
A user received this message:
"${message}"

Category / Situation: ${situation}
Desired Vibe / Personality: ${vibe}
Tone Calibration: ${toneDesc} (Intensity: ${toneIntensity}/100)
Desired Length: ${lengthDesc}
${context ? `Additional Context: "${context}"` : ''}

Generate exactly 3 to 4 distinctly phrased, realistic response options.
They must NOT sound like generic robotic AI assistant responses. They must sound like a real person texting on iMessage or WhatsApp.
Avoid excessive exclamation marks, hollow clichés, and emojis unless natural for the vibe.
For each response, provide:
1. "text": The exact text the user can copy and send.
2. "explanation": A 1-sentence note explaining why this reply works (e.g., "Direct without sounding aggressive" or "Leaves the door open without looking overly eager").
3. "toneScore": A numeric rating between 0 (super soft) and 100 (super direct).`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            temperature: 0.85,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                replies: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      text: { type: Type.STRING },
                      explanation: { type: Type.STRING },
                      toneScore: { type: Type.NUMBER },
                    },
                    required: ['text', 'explanation', 'toneScore'],
                  },
                },
              },
              required: ['replies'],
            },
          },
        });

        const parsed = JSON.parse(response.text || '{}');
        if (Array.isArray(parsed.replies) && parsed.replies.length > 0) {
          const formatted = parsed.replies.map((r: any, idx: number) => ({
            id: `gen-ai-${Date.now()}-${idx}`,
            situationId: situation,
            vibeId: vibe,
            text: r.text,
            explanation: r.explanation,
            toneScore: Math.round(Number(r.toneScore) || toneIntensity),
            lengthType: length,
          }));

          res.json({ replies: formatted, source: 'ai' });
          return;
        }
      } catch (geminiError) {
        console.warn('Gemini generation encountered an error, falling back to smart local engine:', geminiError);
      }
    }

    // Offline / fallback smart generation engine
    const fallbackReplies = generateSmartReplies({
      incoming: message,
      situation,
      vibe,
      intensity: toneIntensity,
      length,
      context,
    });

    res.json({ replies: fallbackReplies, source: 'smart-engine' });
  } catch (error: any) {
    console.error('API Error in /api/generate:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Dev vs Prod Vite handling
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TextCraft server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});
