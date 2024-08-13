
"use client";
import { useState } from 'react';

const AskChat: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.text);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponse('An error occurred. Please try again.');
    }
  };

  return (
    <div className="p-56 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Chat with AI</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={6}
        className="w-full p-4 bg-gray-200 rounded-lg text-gray-800 resize-none"
        placeholder="Type your message here..."
      />
      <button
        onClick={handleSubmit}
        className="w-full mt-4 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700"
      >
        Submit
      </button>
      {response && (
        <div className="mt-4 p-4 bg-gray-50 text-gray-800 rounded-lg">
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default AskChat;
