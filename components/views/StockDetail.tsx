
import React, { useState, useEffect } from 'react';
import { FinnhubProfile, FinnhubQuote, NewsArticle } from '../../types';
import { getCompanyProfile2, getQuote, getCompanyNews } from '../../services/finnhubService';
import { ChevronLeftIcon, ArrowUpIcon, ArrowDownIcon } from '../icons/Icons';
import { mockCommunityPosts } from '../../services/mockData';

interface StockDetailProps {
    symbol: string;
    onBack: () => void;
}

const StockDetail: React.FC<StockDetailProps> = ({ symbol, onBack }) => {
    const [profile, setProfile] = useState<FinnhubProfile | null>(null);
    const [quote, setQuote] = useState<FinnhubQuote | null>(null);
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const profileData = getCompanyProfile2(symbol);
                const quoteData = getQuote(symbol);
                const newsData = getCompanyNews(symbol);

                const [profileRes, quoteRes, newsRes] = await Promise.all([profileData, quoteData, newsData]);

                setProfile(profileRes);
                setQuote(quoteRes);
                setNews(newsRes);

            } catch (err: any) {
                setError(`Failed to load data for ${symbol}. Please try again.`);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [symbol]);

    if (loading) {
        return <div className="text-center p-10">Loading data for ${symbol}...</div>;
    }

    if (error) {
        return (
             <div className="text-center p-10">
                <p className="text-loss">{error}</p>
                <button onClick={onBack} className="mt-4 bg-highlight text-white p-2 rounded">Go Back</button>
            </div>
        );
    }
    
    if (!profile || !quote || Object.keys(profile).length === 0) {
        return (
            <div className="text-center p-10">
                <p className="text-loss">No data found for ${symbol}.</p>
                <button onClick={onBack} className="mt-4 bg-highlight text-white p-2 rounded">Go Back</button>
            </div>
        );
    }
    
    const isGain = quote.d >= 0;

    return (
        <div className="space-y-8">
            <button onClick={onBack} className="flex items-center text-highlight font-semibold hover:underline">
                <ChevronLeftIcon className="h-5 w-5" />
                <span>Back to Dashboard</span>
            </button>

            <div className="bg-secondary p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-4 mb-4">
                    <img src={profile.logo} alt={`${profile.name} logo`} className="w-16 h-16 rounded-full bg-white p-1" />
                    <div>
                        <h1 className="text-3xl font-bold text-text-primary">{profile.name} ({profile.ticker})</h1>
                        <p className="text-text-secondary">{profile.exchange} | {profile.finnhubIndustry}</p>
                    </div>
                </div>

                <div className="flex items-baseline space-x-4">
                    <p className="text-4xl font-bold text-text-primary">${quote.c.toFixed(2)}</p>
                    <div className={`flex items-center font-semibold text-xl ${isGain ? 'text-gain' : 'text-loss'}`}>
                        {isGain ? <ArrowUpIcon /> : <ArrowDownIcon />}
                        <span>{quote.d.toFixed(2)} ({quote.dp.toFixed(2)}%)</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2 space-y-8">
                     <div className="bg-secondary p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-text-primary">Market Data</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div><p className="text-sm text-text-secondary">Open</p><p>${quote.o.toFixed(2)}</p></div>
                            <div><p className="text-sm text-text-secondary">High</p><p>${quote.h.toFixed(2)}</p></div>
                            <div><p className="text-sm text-text-secondary">Low</p><p>${quote.l.toFixed(2)}</p></div>
                            <div><p className="text-sm text-text-secondary">Prev. Close</p><p>${quote.pc.toFixed(2)}</p></div>
                            <div><p className="text-sm text-text-secondary">Market Cap</p><p>${profile.marketCapitalization.toLocaleString()}M</p></div>
                        </div>
                    </div>
                    <div className="bg-secondary p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-text-primary">Latest News</h3>
                         <div className="space-y-4">
                            {news.map(article => (
                                <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" className="block hover:bg-accent p-2 rounded">
                                    <p className="font-semibold">{article.headline}</p>
                                    <p className="text-xs text-text-secondary">{article.source} - {new Date(article.datetime).toLocaleDateString()}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-1">
                     <div className="bg-secondary p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-text-primary">Community Feed</h3>
                        {mockCommunityPosts[symbol] ? mockCommunityPosts[symbol].map(post => (
                             <div key={post.id} className="bg-accent p-3 rounded-lg flex space-x-3 mb-3">
                                <img src={post.author.photoURL} alt={post.author.name} className="w-8 h-8 rounded-full" />
                                <div>
                                    <p className="font-bold text-sm text-text-primary">{post.author.name}</p>
                                    <p className="mt-1 text-sm text-text-primary">{post.content}</p>
                                </div>
                            </div>
                        )) : <p className="text-text-secondary">No community posts for ${symbol} yet.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockDetail;
