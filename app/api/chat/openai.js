// pages/api/openai.js

export default async function handler(req, res) {
    const openaiApiKey = process.env.OPENAI_API_KEY;
  
    if (!openaiApiKey) {
      return res.status(500).json({ error: 'OpenAI API Key is missing' });
    }
  
    // Use the API key in your logic
    const response = await fetch('https://api.openai.com/v1/some-endpoint', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: 'Say hello' }),
    });
  
    const data = await response.json();
    res.status(200).json(data);
  }
  