import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      return res.status(500).json({ error: 'OpenAI API Key is missing' });
    }

    try {
        // Using the OpenAI SDK directly to make a request
        const response = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: 'Say hello',
          max_tokens: 10,
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        res.status(500).json({ error: 'Failed to fetch completion' });
    }
}

  
