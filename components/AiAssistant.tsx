
import React, { useState } from 'react';
import { getAIStockAnalysis } from '../services/geminiService';
import { SparklesIcon } from './icons/Icons';

const AiAssistant: React.FC = () => {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setResponse('');
        setError('');

        try {
            const analysis = await getAIStockAnalysis(query);
            setResponse(analysis);
        } catch (err) {
            setError('Failed to get analysis. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const exampleQueries = [
      "Why is $TSLA volatile recently?",
      "Explain the importance of P/E ratio for $GOOGL.",
      "Summarize the latest earnings report for $AAPL.",
    ];

    return (
        <div className="bg-secondary rounded-lg shadow-lg p-6 sticky top-20">
            <div className="flex items-center mb-4">
                <SparklesIcon className="text-highlight" />
                <h3 className="text-xl font-bold ml-2 text-text-primary">AI Assistant</h3>
            </div>
            <p className="text-sm text-text-secondary mb-4">
                Get AI-powered insights on stocks. This is not financial advice.
            </p>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., Why is the market down today?"
                    className="w-full bg-accent p-2 rounded text-white placeholder-text-secondary h-24 resize-none focus:outline-none focus:ring-2 focus:ring-highlight"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 bg-highlight text-white p-2 rounded hover:bg-teal-500 transition-colors disabled:bg-gray-500"
                >
                    {isLoading ? 'Analyzing...' : 'Get Insights'}
                </button>
            </form>
             <div className="mt-4">
                <p className="text-xs text-text-secondary mb-2">Try an example:</p>
                <div className="flex flex-wrap gap-2">
                    {exampleQueries.map(q => (
                        <button key={q} onClick={() => setQuery(q)} className="text-xs bg-accent text-text-secondary px-2 py-1 rounded-full hover:bg-highlight hover:text-white transition-colors">
                            {q}
                        </button>
                    ))}
                </div>
            </div>
            {response && (
                <div className="mt-4 p-4 bg-accent rounded-lg">
                    <p className="text-sm text-text-primary whitespace-pre-wrap">{response}</p>
                </div>
            )}
            {error && <p className="mt-4 text-sm text-loss">{error}</p>}
        </div>
    );
};

export default AiAssistant;
