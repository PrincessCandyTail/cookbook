'use client'

import { useEffect } from "react";

export default function gpt() {
    const apiKey = 'sk-proj-HUisxG9WwOKGpVF19bN9T3BlbkFJxamVS74DOhIiiV53qpor'; // Replace with your actual API key
    const apiEndpoint = 'https://api.openai.com/v1/chat/completions'; // API endpoint for chat completions

    useEffect(() => {
        fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini', // Assuming GPT-4 Turbo; change to 'gpt-4' if using that
                messages: [
                    { role: 'system', content: 'Hello, how are you?' }
                ],
                max_tokens: 150
            })
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
    }, [])

    return (
        <div>
            <p>gpt</p>
        </div>
    )
}