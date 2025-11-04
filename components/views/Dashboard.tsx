// FIX: Create content for Dashboard.tsx to serve as the main view.
import React from 'react';
import { mockNews, mockStocks } from '../../services/mockData';
import { Stock, NewsArticle } from '../../types';

const StockTicker: React.FC<{ stock: Stock }> = ({ stock }) => {
    const isPositive = stock.change >= 0;
    return (
        <div className="bg-secondary p-4 rounded-lg shadow-lg flex justify-between items-center transition-transform transform hover:-translate-y-1">
            <div>
                <p className="font-bold text-lg text-text-primary">{stock.symbol}</p>
                <p className="text-xl font-semibold text-text-primary">${stock.price.toFixed(2)}</p>
                <p className={`text-sm font-medium ${isPositive ? 'text-gain' : 'text-loss'}`}>
                    {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                </p>
            </div>
            {/* Sparkline chart would go here */}
        </div>
    );
};


const NewsCard: React.FC<{ article: NewsArticle }> = ({ article }) => {
    return (
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="block bg-secondary p-4 rounded-lg shadow-lg hover:bg-accent transition-colors">
            <div className="flex flex-col sm:flex-row gap-4">
                 <img src={article.image} alt={article.headline} className="w-full sm:w-48 h-32 object-cover rounded-md" />
                 <div className="flex-1">
                    <p className="text-xs text-text-secondary">{article.source} - {new Date(article.datetime).toLocaleTimeString()}</p>
                    <h4 className="font-bold text-text-primary mt-1">{article.headline}</h4>
                    <p className="text-sm text-text-secondary mt-2 hidden md:block">{article.summary}</p>
                 </div>
            </div>
        </a>
    );
}


const Dashboard: React.FC = () => {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-text-primary mb-4">Market Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockStocks.slice(0, 6).map(stock => (
                        <StockTicker key={stock.symbol} stock={stock} />
                    ))}
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold text-text-primary mb-4">Top News</h2>
                <div className="space-y-4">
                    {mockNews.map(article => (
                        <NewsCard key={article.id} article={article} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
