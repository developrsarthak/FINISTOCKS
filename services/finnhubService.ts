import { FinnhubQuote } from "../types";

const FINNHUB_API_KEY = process.env.REACT_APP_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

if (!FINNHUB_API_KEY) {
    console.warn("Finnhub API key not found. Market data features will be limited.");
}

export const getQuote = async (symbol: string): Promise<FinnhubQuote | null> => {
    if (!FINNHUB_API_KEY) return null;
    try {
        const response = await fetch(`${BASE_URL}/quote?symbol=${symbol.toUpperCase()}&token=${FINNHUB_API_KEY}`);
        if (!response.ok) {
            console.error(`Error fetching quote for ${symbol}: ${response.statusText}`);
            return null;
        }
        const data: FinnhubQuote = await response.json();
        // Finnhub returns 'c' for current price, let's map it to a more intuitive name
        return { ...data, symbol: symbol, price: data.c };
    } catch (error) {
        console.error(`Error fetching quote for ${symbol}:`, error);
        return null;
    }
};

export const searchSymbols = async (query: string): Promise<any | null> => {
    if (!FINNHUB_API_KEY || !query) return null;
    try {
        const response = await fetch(`${BASE_URL}/search?q=${query}&token=${FINNHUB_API_KEY}`);
        if (!response.ok) {
            console.error(`Error searching symbols for "${query}": ${response.statusText}`);
            return null;
        }
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error(`Error searching symbols for "${query}":`, error);
        return null;
    }
}
