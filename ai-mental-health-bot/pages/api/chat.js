// pages/api/chat.js
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { messages } = req.body;
  if (!messages) {
    return res.status(400).json({ error: 'Missing messages in request body' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        stream: false
      })
    });

    if (!response.ok) {
      const errRes = await response.json();
      return res.status(response.status).json({ error: errRes });
    }

    const json = await response.json();
    const reply = json.choices?.[0]?.message;
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Error calling OpenAI:', err);
    return res.status(500).json({ error: 'OpenAI request failed' });
  }
}
