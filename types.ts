// FIX: Create content for types.ts to define shared types.
export interface User {
    uid: string;
    name: string | null;
    email: string | null;
    photoURL: string | null;
}

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
}

export interface CommunityPost {
    id: string;
    author: {
        name: string;
        photoURL: string;
    };
    content: string;
    timestamp: number;
    likes: number;
}

export type View = 'dashboard' | 'portfolio' | 'discover' | 'community';
