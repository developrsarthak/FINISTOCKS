import React, { useState, useEffect } from 'react';
import { popularStockSymbols } from '../../services/stockSymbols';
import { getQuote, searchSymbols } from '../../services/finnhubService';
import { FinnhubQuote } from '../../types';

interface SearchResult {
    description: string;
    displaySymbol: string;
    symbol: string;
    type: string;
}

const Discover: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [popularStocksData, setPopularStocksData] = useState<FinnhubQuote[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPopularStocks = async () => {
            const promises = popularStockSymbols.map(symbol => getQuote(symbol));
            const results = await Promise.all(promises);
            setPopularStocksData(results.filter(Boolean) as FinnhubQuote[]);
        };
        fetchPopularStocks();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            return;
        }

        const debounce = setTimeout(async () => {
            setIsLoading(true);
            const results = await searchSymbols(searchTerm);
            if (results) {
                setSearchResults(results);
            }
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(debounce);
    }, [searchTerm]);

    const renderQuote = (quote: FinnhubQuote | null) => {
        if (!quote) return <div className="text-text-secondary">Data unavailable</div>;
        const isPositive = quote.d >= 0;
        return (
             <div className="flex justify-between items-center">
                <div>
                    <p className="font-bold text-text-primary">{quote.symbol}</p>
                    <p className="text-sm text-text-secondary">${quote.c.toFixed(2)}</p>
                </div>
                 <div className={`font-semibold ${isPositive ? 'text-gain' : 'text-loss'}`}>
                    {isPositive ? '+' : ''}{quote.dp.toFixed(2)}%
                </div>
            </div>
        );
    }
    
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-text-primary">Discover Stocks</h2>
            
            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for a company or symbol..."
                    className="w-full bg-secondary p-4 rounded-lg text-white placeholder-text-secondary text-lg focus:outline-none focus:ring-2 focus:ring-highlight"
                />
                {isLoading && <div className="absolute right-4 top-4 text-text-secondary">Searching...</div>}
                {searchResults.length > 0 && (
                     <ul className="absolute z-10 w-full mt-2 bg-accent rounded-lg shadow-xl max-h-80 overflow-y-auto">
                        {searchResults.slice(0, 10).map(item => (
                            <li key={item.symbol} className="p-4 border-b border-secondary hover:bg-secondary cursor-pointer">
                                <p className="font-bold text-text-primary">{item.symbol}</p>
                                <p className="text-sm text-text-secondary">{item.description}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div>
                <h3 className="text-2xl font-bold mb-4 text-text-primary">Popular Stocks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {popularStocksData.map(quote => (
                        <div key={quote.symbol} className="bg-secondary p-4 rounded-lg shadow-lg">
                            {renderQuote(quote)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Discover;
