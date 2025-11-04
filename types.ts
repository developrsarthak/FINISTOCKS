
export interface User {
    uid: string;
    name: string;
    email: string;
    photoURL: string;
}

export interface Stock {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
    sparkline: number[];
}

export interface NewsArticle {
    id: number | string;
    headline: string;
    summary: string;
    image: string;
    url: string;
    source: string;
    datetime: number;
}

export interface PortfolioItem {
    symbol: string;
    quantity: number;
    purchasePrice: number;
}

export interface CommunityPost {
    id: string;
    author: Pick<User, 'name' | 'photoURL'>;
    content: string;
    timestamp: number;
    likes: number;
}

// Based on Finnhub API documentation
export interface FinnhubQuote {
    c: number; // Current price
    d: number; // Change
    dp: number; // Percent change
    h: number; // High price of the day
    l: number; // Low price of the day
    o: number; // Open price of the day
    pc: number; // Previous close price
}

export interface FinnhubProfile {
    country: string;
    currency: string;
    exchange: string;
    name: string;
    ticker: string;
    ipo: string;
    marketCapitalization: number;
    shareOutstanding: number;
    logo: string;
    phone: string;
    weburl: string;
    finnhubIndustry: string;
}
