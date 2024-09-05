import { Configuration, OpenAIApi } from 'openai';

// Initialize the OpenAI client
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Store API key in environment variable for security
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { city } = req.body;

    if (!city) {
      return res.status(400).json({ message: 'City is required' });
    }

    try {
      // Use OpenAI to generate a response
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo', // You can choose another model if needed
        messages: [
          { role: 'system', content: "You're a helpful weather bot." },
          { role: 'user', content: `What's the weather like in ${city}?` },
        ],
      });

      const assistantMessage = response.data.choices[0].message.content;

      return res.status(200).json({ message: assistantMessage });
    } catch (error) {
      console.error('Error with OpenAI API:', error);
      return res
        .status(500)
        .json({ message: "I'm sorry, but I encountered an error. Please try again later." });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
