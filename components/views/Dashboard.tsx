
import React from 'react';
import { Stock, NewsArticle } from '../../types';
import { mockStocks, mockNews } from '../../services/mockData';
import { ChartBarIcon, NewspaperIcon } from '../icons/Icons';
import AiAssistant from '../AiAssistant';

interface DashboardProps {
    onSelectStock: (symbol: string) => void;
}

const Sparkline: React.FC<{ data: number[] }> = ({ data }) => {
    const width = 100;
    const height = 30;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((d - min) / (max - min)) * height;
        return `${x},${y}`;
    }).join(' ');

    const isGain = data[data.length - 1] >= data[0];

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-24 h-8">
            <polyline
                fill="none"
                stroke={isGain ? '#10B981' : '#EF4444'}
                strokeWidth="2"
                points={points}
            />
        </svg>
    );
};

const StockCard: React.FC<{ stock: Stock, onSelectStock: (symbol: string) => void }> = ({ stock, onSelectStock }) => {
    const isGain = stock.change >= 0;
    return (
        <div onClick={() => onSelectStock(stock.symbol)} className="bg-accent p-4 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-700 transition-colors">
            <div>
                <p className="font-bold text-lg text-text-primary">${stock.symbol}</p>
                <p className="font-semibold text-text-primary">${stock.price.toFixed(2)}</p>
            </div>
            <div className="w-24 h-8">
                <Sparkline data={stock.sparkline} />
            </div>
            <div className={`text-right ${isGain ? 'text-gain' : 'text-loss'}`}>
                <p className="font-semibold">{isGain ? '+' : ''}{stock.change.toFixed(2)}</p>
                <p className="text-sm">{isGain ? '+' : ''}{stock.changePercent.toFixed(2)}%</p>
            </div>
        </div>
    );
};

const NewsCard: React.FC<{ article: NewsArticle }> = ({ article }) => {
    return (
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="block bg-accent p-4 rounded-lg hover:bg-gray-700 transition-colors">
            <img src={article.image} alt={article.headline} className="rounded-md mb-2 w-full h-32 object-cover" />
            <p className="font-semibold text-sm text-text-primary mb-1">{article.headline}</p>
            <p className="text-xs text-text-secondary">{article.source} - {new Date(article.datetime).toLocaleDateString()}</p>
        </a>
    );
};

const Dashboard: React.FC<DashboardProps> = ({ onSelectStock }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {/* Watchlist Section */}
                <div className="bg-secondary p-6 rounded-lg shadow-lg">
                    <div className="flex items-center mb-4">
                        <ChartBarIcon className="text-highlight" />
                        <h2 className="text-xl font-bold ml-2 text-text-primary">Watchlist</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mockStocks.map(stock => <StockCard key={stock.symbol} stock={stock} onSelectStock={onSelectStock} />)}
                    </div>
                </div>

                {/* News Section */}
                <div className="bg-secondary p-6 rounded-lg shadow-lg">
                     <div className="flex items-center mb-4">
                        <NewspaperIcon className="text-highlight" />
                        <h2 className="text-xl font-bold ml-2 text-text-primary">Market News</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mockNews.map(article => <NewsCard key={article.id} article={article} />)}
                    </div>
                </div>
            </div>

            {/* AI Assistant Sidebar */}
            <div className="lg:col-span-1">
                <AiAssistant />
            </div>
        </div>
    );
};

export default Dashboard;
