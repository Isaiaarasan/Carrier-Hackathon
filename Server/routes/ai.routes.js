import express from 'express';
import axios from 'axios';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/chat', protect, async (req, res) => {
  const { message, history } = req.body;
  const apiKey = process.env.AI_API_KEY;

  if (!apiKey || apiKey === 'your_key_here') {
    return res.status(503).json({ 
      message: "AI service is currently unavailable. Please configure the Groq API key." 
    });
  }

  try {
    const messages = [
      { 
        role: "system", 
        content: "You are InternPulse AI, a helpful assistant for interns and managers. " +
                 "You can help with report writing, goal setting, productivity tips, and explaining platform features. " +
                 "Keep your responses concise, professional, and encouraging."
      },
      ...(history || []).map(h => ({ role: h.role, content: h.content })),
      { role: "user", content: message }
    ];

    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: "llama-3.3-70b-versatile",
      messages: messages,
      temperature: 0.7,
      max_tokens: 1024
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('AI Chat Error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: "An error occurred while talking to the AI assistant.",
      details: error.response?.data?.error?.message || error.message
    });
  }
});

export default router;
