import axios from 'axios';

export const summarizeReport = async (content) => {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_key_here') {
    return "AI summarization is unavailable without a valid API key. This is a placeholder summary for hackathon demo purposes.";
  }

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an assistant that summarizes intern weekly reports. Focus on key achievements, challenges, and progress." },
        { role: "user", content: `Summarize this report in 2-3 concise bullet points: ${content}` }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('AI Summary Error:', error.message);
    return "Error generating AI summary. Please review the full report below.";
  }
};
