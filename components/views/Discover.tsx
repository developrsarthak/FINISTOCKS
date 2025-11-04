
import React, { useState, useMemo } from 'react';
import { popularStockSymbols } from '../../services/stockSymbols';
import { SearchIcon } from '../icons/Icons';
import { getQuote } from '../../services/finnhubService';
import { FinnhubQuote } from '../../types';

interface StockData extends FinnhubQuote {
    symbol: string;
}

const Discover: React.FC<{onSelectStock: (symbol: string) => void}> = ({onSelectStock}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [stocksData, setStocksData] = useState<StockData[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    React.useEffect(() => {
        const fetchStockData = async () => {
            setIsLoading(true);
            const data = await Promise.all(
                popularStockSymbols.map(async (symbol) => {
                    try {
                        const quote = await getQuote(symbol);
                        return { symbol, ...quote };
                    } catch (error) {
                        console.error(`Failed to fetch quote for ${symbol}`, error);
                        return null;
                    }
                })
            );
            setStocksData(data.filter((d): d is StockData => d !== null));
            setIsLoading(false);
        };

        fetchStockData();
    }, []);

    const filteredStocks = useMemo(() => {
        if (!searchQuery) return stocksData;
        return stocksData.filter(stock =>
            stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, stocksData]);

    return (
        <div className="space-y-8">
            <div className="bg-secondary p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-text-primary">Discover Stocks</h2>
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search symbols..."
                        className="w-full bg-accent p-3 pl-10 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-highlight"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                 {isLoading && <p className="text-text-secondary">Loading popular stocks...</p>}
                 {!isLoading && filteredStocks.map(stock => (
                     <div key={stock.symbol} onClick={() => onSelectStock(stock.symbol)} className="bg-secondary p-4 rounded-lg shadow-lg hover:bg-accent transition-colors cursor-pointer">
                         <div className="flex justify-between items-center">
                            <h3 className="font-bold text-lg text-text-primary">${stock.symbol}</h3>
                            <p className="font-semibold text-text-primary">${stock.c.toFixed(2)}</p>
                         </div>
                         <div className={`flex items-center text-sm ${stock.d >= 0 ? 'text-gain' : 'text-loss'}`}>
                             <span>{stock.d > 0 ? '+' : ''}{stock.d.toFixed(2)}</span>
                             <span className="ml-2">({stock.dp > 0 ? '+' : ''}{stock.dp.toFixed(2)}%)</span>
                         </div>
                     </div>
                 ))}
                 {!isLoading && filteredStocks.length === 0 && (
                     <p className="text-text-secondary col-span-full text-center">No stocks found.</p>
                 )}
            </div>
        </div>
    );
};

export default Discover;
