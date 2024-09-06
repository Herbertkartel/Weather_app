// app/api/chat/route.js
import { OpenAI } from 'openai'; // For SDK v4.x

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request) {
  const { message } = await request.json();

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    return new Response(JSON.stringify({
      reply: completion.data.choices[0].message.content,
    }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch completion" }), { status: 500 });
  }
}

