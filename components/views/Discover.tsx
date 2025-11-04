// FIX: Create content for Discover.tsx view.
import React, { useState } from 'react';
import { popularStockSymbols } from '../../services/stockSymbols';
import { mockStocks } from '../../services/mockData';
import { Stock } from '../../types';

const StockRow: React.FC<{stock: Stock}> = ({ stock }) => {
    const isPositive = stock.change >= 0;
    return (
        <div className="bg-accent p-4 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-4 items-center hover:bg-highlight/20 transition-colors">
             <div>
                <p className="font-bold text-xl">{stock.symbol}</p>
            </div>
            <div>
                 <p className="text-sm text-text-secondary">Price</p>
                 <p className="font-semibold">${stock.price.toFixed(2)}</p>
            </div>
             <div>
                 <p className="text-sm text-text-secondary">Change</p>
                 <p className={`font-semibold ${isPositive ? 'text-gain' : 'text-loss'}`}>
                    {isPositive ? '+' : ''}{stock.change.toFixed(2)}
                 </p>
            </div>
             <div>
                 <p className="text-sm text-text-secondary">% Change</p>
                 <p className={`font-semibold ${isPositive ? 'text-gain' : 'text-loss'}`}>
                     {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                 </p>
            </div>
        </div>
    )
}

const Discover: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const allStocks = popularStockSymbols.map(symbol => {
        return mockStocks.find(s => s.symbol === symbol) || { symbol, price: 0, change: 0, changePercent: 0, sparkline: [] };
    });
    
    const filteredStocks = allStocks.filter(stock => 
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-secondary p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-text-primary">Discover Stocks</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by symbol..."
                className="w-full bg-accent p-3 rounded-lg text-white placeholder-text-secondary mb-6 focus:outline-none focus:ring-2 focus:ring-highlight"
            />
            <div className="space-y-4">
                {filteredStocks.map(stock => (
                    <StockRow key={stock.symbol} stock={stock} />
                ))}
            </div>
        </div>
    );
};

export default Discover;
