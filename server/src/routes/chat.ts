import { Router } from 'express';
import { HfInference } from '@huggingface/inference';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { message, issContext, newsContext } = req.body;
    
    const hfToken = process.env.VITE_HF_TOKEN;
    if (!hfToken) {
      return res.status(500).json({ error: 'Hugging Face API token not configured' });
    }

    const hf = new HfInference(hfToken);
    const model = process.env.HF_MODEL || 'Qwen/Qwen2.5-Coder-32B-Instruct';

    const systemPrompt = `You are a helpful AI assistant for the Real-Time ISS & News Dashboard.
You can ONLY answer questions using the provided dashboard data context.
If the user asks an unrelated question, you MUST respond EXACTLY with: "I can only answer questions related to ISS tracking and dashboard news data."
Do not hallucinate external knowledge.

CURRENT DASHBOARD CONTEXT:
ISS Data: ${JSON.stringify(issContext)}
News Context (Recent Articles/Categories): ${JSON.stringify(newsContext)}
`;

    const out = await hf.chatCompletion({
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 250,
    });

    res.json({ response: out.choices?.[0]?.message?.content?.trim() || "I didn't understand that." });
  } catch (error: any) {
    console.error('Error in chat API:', error?.message || error);
    res.status(500).json({ error: 'Failed to generate chat response' });
  }
});

export default router;
