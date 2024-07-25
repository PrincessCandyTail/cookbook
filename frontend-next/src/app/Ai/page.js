"use client";
import { useState } from 'react';
import OpenAI from 'openai';
import 'dotenv/config';

const openAiClient = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
});

const ChatPage = () => {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'system', content: 'You are a helpful assistant' },
        { role: 'user', content: 'Hello' }
    ]);
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newMessages = [
            ...messages,
            { role: 'user', content: userInput },
        ];

        setMessages(newMessages);

        try {
            const chatCompletion = await openAiClient.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: newMessages,
            });

            const assistantMessage = chatCompletion.choices[0].message;

            setMessages([...newMessages, assistantMessage]);
            setResponse(assistantMessage.content);
        } catch (error) {
            console.error(error);
        }

        setUserInput('');
    };

    return (
        <div>
            <h1>Chat with AI</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
            <div>
                <h2>Responses:</h2>
                <p>{response}</p>
            </div>
        </div>
    );
};

export default ChatPage;
