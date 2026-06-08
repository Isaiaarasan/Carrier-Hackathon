import axios from 'axios';

export const summarizeReport = async (content) => {
  const apiKey = process.env.AI_API_KEY;
  
  if (!apiKey || apiKey === 'your_key_here') {
    return "AI summarization is unavailable without a valid API key. This is a placeholder summary for hackathon demo purposes.";
  }

  try {
    // Using Groq API as provider (OpenAI compatible)
    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are an assistant that summarizes intern weekly reports. Focus on key achievements, challenges, and progress." },
        { role: "user", content: `Summarize this report in 2-3 concise bullet points: ${content}` }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('AI Summary Error:', error.response?.data || error.message);
    return "Error generating AI summary. Please review the full report below.";
  }
};
