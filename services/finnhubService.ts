// FIX: Create content for finnhubService.ts to resolve module errors.
import { mockNews, mockStocks } from './mockData';
import { NewsArticle, Stock } from '../types';

// In a real app, you would fetch from the Finnhub API.
// For this project, we'll return mock data to ensure functionality.

export const getStockQuote = async (symbol: string): Promise<Stock | undefined> => {
    console.log(`Fetching quote for ${symbol}... (mocked)`);
    // Example of real implementation:
    // const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`);
    // const data = await response.json();
    // return { symbol, price: data.c, change: data.d, changePercent: data.dp, sparkline: [] };
    
    return mockStocks.find(stock => stock.symbol === symbol);
};

export const getMarketNews = async (): Promise<NewsArticle[]> => {
    console.log('Fetching market news... (mocked)');
     // Example of real implementation:
    // const response = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${process.env.REACT_APP_FINNHUB_API_KEY}`);
    // const data = await response.json();
    // return data.slice(0, 10).map(article => ({ ... adapt to NewsArticle type ... }));
    
    return mockNews;
};
