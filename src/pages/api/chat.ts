// pages/api/chat.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

// Replace 'your_openai_api_key' with your actual OpenAI API key
const openaiApiKey = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
    apiKey: openaiApiKey,
});
const openai = new OpenAIApi(configuration);

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

let messagesHistory: Message[] = [];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { message } = req.body;
    messagesHistory.push({ role: 'user', content: message });

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-4', // Use the appropriate GPT-4 model
            messages: messagesHistory,
            n: 1,
            temperature: 0.8,
        });
        if (
            response.data.choices &&
            response.data.choices[0] &&
            response.data.choices[0].message &&
            response.data.choices[0].message.content
        ) {
        const aiMessage = response.data.choices[0].message.content.trim();
        messagesHistory.push({ role: 'assistant', content: aiMessage });

        res.status(200).json({ content: aiMessage });
        } else {
        res.status(500).json({ message: 'Internal server error' });
        }
    } catch (error) {
        console.error('Error fetching response from OpenAI API:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default handler;
