import React from 'react';
import { mockNews, mockStocks } from '../../services/mockData';
import { Stock, NewsArticle } from '../../types';
import AiAssistant from '../AiAssistant';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

const StockTicker: React.FC<{ stock: Stock }> = ({ stock }) => {
    const isPositive = stock.change >= 0;
    const chartData = stock.sparkline.map((price, index) => ({ name: index, price }));
    return (
        <div className="bg-secondary p-4 rounded-lg shadow-lg flex items-center justify-between space-x-4">
            <div className="flex-grow">
                <p className="text-lg font-bold text-text-primary">{stock.symbol}</p>
                <p className="text-2xl font-semibold text-white">${stock.price.toFixed(2)}</p>
                <p className={`text-sm font-medium ${isPositive ? 'text-gain' : 'text-loss'}`}>
                    {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                </p>
            </div>
            <div className="w-24 h-12">
                 <ResponsiveContainer>
                    <LineChart data={chartData}>
                        <YAxis domain={['dataMin', 'dataMax']} hide />
                        <Line type="monotone" dataKey="price" stroke={isPositive ? '#48bb78' : '#f56565'} strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const NewsCard: React.FC<{ article: NewsArticle }> = ({ article }) => (
    <div className="bg-secondary rounded-lg shadow-lg overflow-hidden">
        <img src={article.image} alt={article.headline} className="w-full h-40 object-cover" />
        <div className="p-4">
            <p className="text-xs text-text-secondary mb-1">{article.source} &middot; {new Date(article.datetime).toLocaleTimeString()}</p>
            <h3 className="font-bold text-text-primary mb-2 hover:text-highlight transition-colors">
                <a href={article.url} target="_blank" rel="noopener noreferrer">{article.headline}</a>
            </h3>
            <p className="text-sm text-text-secondary">{article.summary}</p>
        </div>
    </div>
);

const Dashboard: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {/* Market Overview */}
                <div>
                    <h2 className="text-3xl font-bold mb-4 text-text-primary">Market Overview</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mockStocks.map(stock => <StockTicker key={stock.symbol} stock={stock} />)}
                    </div>
                </div>

                {/* Latest News */}
                <div>
                    <h2 className="text-3xl font-bold mb-4 text-text-primary">Latest News</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mockNews.map(article => <NewsCard key={article.id} article={article} />)}
                    </div>
                </div>
            </div>
            <div className="lg:col-span-1">
                <AiAssistant />
            </div>
        </div>
    );
};

export default Dashboard;
