import { FinnhubProfile, FinnhubQuote, NewsArticle } from '../types';

// The API key is made available on the window object from the script in index.html
const API_KEY = (window as any).VITE_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

if (!API_KEY) {
    console.error("Finnhub API key is not found. Please add it to index.html");
}

/**
 * Fetches the latest quote for a given stock symbol.
 * @param symbol - The stock symbol (e.g., 'AAPL').
 * @returns A promise that resolves to a FinnhubQuote object.
 */
export const getQuote = async (symbol: string): Promise<FinnhubQuote> => {
    try {
        const response = await fetch(`${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Finnhub returns c: 0 when a symbol is not found
        if (data.c === 0 && data.d === null) {
            throw new Error(`Symbol ${symbol} not found.`);
        }
        return data as FinnhubQuote;
    } catch (error) {
        console.error(`Error fetching quote for ${symbol}:`, error);
        throw error;
    }
};

/**
 * Fetches the company profile for a given stock symbol.
 * @param symbol - The stock symbol (e.g., 'AAPL').
 * @returns A promise that resolves to a FinnhubProfile object.
 */
export const getCompanyProfile2 = async (symbol: string): Promise<FinnhubProfile> => {
    try {
        const response = await fetch(`${BASE_URL}/stock/profile2?symbol=${symbol}&token=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (Object.keys(data).length === 0) {
           throw new Error(`No profile data found for symbol ${symbol}.`);
        }
        return data as FinnhubProfile;
    } catch (error) {
        console.error(`Error fetching profile for ${symbol}:`, error);
        throw error;
    }
};

/**
 * Fetches news articles for a specific company within a date range.
 * @param symbol - The stock symbol (e.g., 'AAPL').
 * @returns A promise that resolves to an array of NewsArticle objects.
 */
export const getCompanyNews = async (symbol: string): Promise<NewsArticle[]> => {
    const to = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const from = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 30 days ago
    
    try {
        const response = await fetch(`${BASE_URL}/company-news?symbol=${symbol}&from=${from}&to=${to}&token=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return (data as any[])
            .slice(0, 10) // Limit to 10 articles
            .map(article => ({
                id: article.id,
                headline: article.headline,
                summary: article.summary,
                image: article.image || `https://picsum.photos/seed/${article.id}/400/200`,
                url: article.url,
                source: article.source,
                datetime: article.datetime * 1000, // Convert UNIX timestamp to ms
            }));
    } catch (error) {
        console.error(`Error fetching company news for ${symbol}:`, error);
        throw error;
    }
};

/**
 * Fetches general market news.
 * @returns A promise that resolves to an array of NewsArticle objects.
 */
export const getMarketNews = async (): Promise<NewsArticle[]> => {
    try {
        const response = await fetch(`${BASE_URL}/news?category=general&token=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return (data as any[])
            .slice(0, 10) // Limit to 10 articles
            .map(article => ({
                id: article.id,
                headline: article.headline,
                summary: article.summary,
                image: article.image || `https://picsum.photos/seed/${article.id}/400/200`,
                url: article.url,
                source: article.source,
                datetime: article.datetime * 1000,
            }));
    } catch (error) {
        console.error('Error fetching market news:', error);
        throw error;
    }
};