export interface Stock {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
    sparkline: number[];
}

export interface NewsArticle {
    id: number;
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
    currentPrice?: number;
}

export interface User {
    uid: string;
    name: string;
    photoURL: string;
    email: string;
}

export interface CommunityPost {
    id: string;
    author: Pick<User, 'name' | 'photoURL'>;
    content: string;
    timestamp: number;
    likes: number;
}

export interface FinnhubQuote {
    c: number; // current price
    d: number; // change
    dp: number; // percent change
    h: number; // high price of the day
    l: number; // low price of the day
    o: number; // open price of the day
    pc: number; // previous close price
    t: number; // timestamp
    symbol?: string; // custom added
    price?: number; // custom added
}
