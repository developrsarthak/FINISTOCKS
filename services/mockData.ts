import { Stock, NewsArticle, PortfolioItem, CommunityPost, User } from '../types';

const generateSparkline = () => Array.from({ length: 20 }, () => Math.random() * 100);

export const mockStocks: Stock[] = [
  { symbol: 'AAPL', price: 172.48, change: 2.54, changePercent: 1.49, sparkline: generateSparkline() },
  { symbol: 'GOOGL', price: 140.21, change: -1.12, changePercent: -0.79, sparkline: generateSparkline() },
  { symbol: 'MSFT', price: 370.95, change: 0.45, changePercent: 0.12, sparkline: generateSparkline() },
  { symbol: 'AMZN', price: 138.12, change: -2.33, changePercent: -1.66, sparkline: generateSparkline() },
  { symbol: 'TSLA', price: 234.30, change: 5.60, changePercent: 2.45, sparkline: generateSparkline() },
  { symbol: 'NVDA', price: 467.65, change: -8.11, changePercent: -1.70, sparkline: generateSparkline() },
];

// FIX: Removed `likes` and `comments` properties from the news article objects below as they are not defined in the `NewsArticle` type.
export const mockNews: NewsArticle[] = [
  {
    id: 1,
    headline: "Tech Stocks Rally as Inflation Fears Subside",
    summary: "Major technology stocks saw significant gains today after the latest CPI report indicated a cooling of inflation, boosting investor confidence.",
    image: "https://picsum.photos/seed/news1/400/200",
    url: "#",
    source: "MarketWatch",
    datetime: Date.now() - 3600000,
  },
  {
    id: 2,
    headline: "Federal Reserve Holds Interest Rates Steady, Cites Economic Resilience",
    summary: "The Federal Reserve concluded its two-day meeting by announcing it will maintain the current federal funds rate, signaling a cautious but optimistic outlook.",
    image: "https://picsum.photos/seed/news2/400/200",
    url: "#",
    source: "Reuters",
    datetime: Date.now() - 7200000,
  },
  {
    id: 3,
    headline: "The Rise of AI in Portfolio Management: What Investors Need to Know",
    summary: "Artificial intelligence is revolutionizing how portfolios are managed, offering new tools for risk assessment and opportunity identification.",
    image: "https://picsum.photos/seed/news3/400/200",
    url: "#",
    source: "Bloomberg",
    datetime: Date.now() - 10800000,
  },
];

export const mockPortfolio: PortfolioItem[] = [
    { symbol: 'AAPL', quantity: 10, purchasePrice: 150.00 },
    { symbol: 'TSLA', quantity: 5, purchasePrice: 200.00 },
    { symbol: 'NVDA', quantity: 8, purchasePrice: 400.00 },
];

const mockUser1: Pick<User, 'name' | 'photoURL'> = { name: 'Jane Smith', photoURL: `https://i.pravatar.cc/150?u=janesmith` };
const mockUser2: Pick<User, 'name' | 'photoURL'> = { name: 'John Capital', photoURL: `https://i.pravatar.cc/150?u=johncapital` };

export const mockCommunityPosts: Record<string, CommunityPost[]> = {
    'AAPL': [
        { id: 'aapl1', author: mockUser1, content: "Apple's earnings report next week will be crucial. I'm expecting strong iPhone sales to beat expectations.", timestamp: Date.now() - 1800000, likes: 15 },
        { id: 'aapl2', author: mockUser2, content: "The Vision Pro is a long-term play. Don't underestimate its potential to create a new market segment.", timestamp: Date.now() - 3600000, likes: 42 },
    ],
    'TSLA': [
        { id: 'tsla1', author: mockUser2, content: "Cybertruck production ramp-up seems to be facing some headwinds. Watching delivery numbers closely.", timestamp: Date.now() - 900000, likes: 22 },
    ]
};