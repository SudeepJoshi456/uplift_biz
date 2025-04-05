'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

const Counselor = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  
  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
        const docRef = doc(db, 'businesses', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBusinessData(docSnap.data());
        } else {
          router.push('/register-business');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAsk = async () => {
    setLoading(true);
    try {
      // Initialize the Gemini AI API
      const genAI = new GoogleGenAI({ apiKey: API_KEY });

      // Create the prompt with necessary business information
      const prompt = `
        Business Info:
        Name: ${businessData.name}
        Category: ${businessData.category}
        Description: ${businessData.description}

        Previous Questions and Answers:
        ${conversation.map((entry, index) => `Q${index + 1}: ${entry.question}\nA${index + 1}: ${entry.response}`).join('\n\n')}

        User's Current Question: ${query}

        Provide helpful advice and guidance for growing and managing the business. Feel free to ask follow-up questions.
        Keep the response concise.
      `;

      // Make sure that the prompt is passed as an object with a key "prompt"
      const result = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      // Log the result to verify the structure of the response
      console.log('Response from API:', result);

      // Check if the response has the text field and set the state accordingly
      if (result && result.text) {
        // Update the conversation with the new question and answer
        setConversation(prev => [
          ...prev,
          { question: query, response: result.text }
        ]);
        setQuery(''); // Clear the query input after submitting
      } else {
        setConversation(prev => [
          ...prev,
          { question: query, response: 'I could not generate a response. Please try again.' }
        ]);
      }
    } catch (error) {
      console.error('Error from Gemini API:', error);
      setConversation(prev => [
        ...prev,
        { question: query, response: 'An error occurred while generating response.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Business Counselor</h1>

      <div className="space-y-4">
        {/* Render conversation history */}
        <div className="space-y-2">
          {conversation.map((entry, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded-md">
              <div className="font-semibold">Q{index + 1}: {entry.question}</div>
              <div className="mt-1">
                <strong>A{index + 1}:</strong>
                <div className="prose mt-2">
                  <ReactMarkdown>{entry.response}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input section for new questions */}
        <textarea
          className="w-full p-3 border rounded mb-3"
          placeholder="Ask a business-related question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          onClick={handleAsk}
          disabled={loading || !query.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </div>
    </div>
  );
};

export default Counselor;
