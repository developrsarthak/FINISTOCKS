// FIX: Create content for Portfolio.tsx view.
import React from 'react';
import { mockPortfolio } from '../../services/mockData';
import { mockStocks } from '../../services/mockData';
import { PortfolioItem } from '../../types';

interface EnrichedPortfolioItem extends PortfolioItem {
    currentPrice: number;
    currentValue: number;
    totalGainLoss: number;
    totalGainLossPercent: number;
}

const Portfolio: React.FC = () => {
    const enrichedPortfolio: EnrichedPortfolioItem[] = mockPortfolio.map(item => {
        const stockInfo = mockStocks.find(s => s.symbol === item.symbol);
        const currentPrice = stockInfo?.price || item.purchasePrice;
        const purchaseValue = item.quantity * item.purchasePrice;
        const currentValue = item.quantity * currentPrice;
        const totalGainLoss = currentValue - purchaseValue;
        const totalGainLossPercent = (totalGainLoss / purchaseValue) * 100;

        return {
            ...item,
            currentPrice,
            currentValue,
            totalGainLoss,
            totalGainLossPercent,
        };
    });

    const totalValue = enrichedPortfolio.reduce((acc, item) => acc + item.currentValue, 0);
    const totalPurchaseValue = enrichedPortfolio.reduce((acc, item) => acc + (item.purchasePrice * item.quantity), 0);
    const totalGainLoss = totalValue - totalPurchaseValue;

    return (
        <div className="bg-secondary p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-text-primary">My Portfolio</h2>
            
            <div className="mb-6">
                <p className="text-lg text-text-secondary">Total Value</p>
                <p className="text-4xl font-bold text-text-primary">${totalValue.toFixed(2)}</p>
                <p className={`text-lg font-semibold ${totalGainLoss >= 0 ? 'text-gain' : 'text-loss'}`}>
                    {totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toFixed(2)}
                </p>
            </div>

            <div className="space-y-4">
                {enrichedPortfolio.map(item => (
                    <div key={item.symbol} className="bg-accent p-4 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                        <div>
                            <p className="font-bold text-xl">{item.symbol}</p>
                            <p className="text-sm text-text-secondary">{item.quantity} Shares</p>
                        </div>
                        <div>
                             <p className="text-sm text-text-secondary">Current Price</p>
                             <p className="font-semibold">${item.currentPrice.toFixed(2)}</p>
                        </div>
                        <div>
                             <p className="text-sm text-text-secondary">Total Value</p>
                             <p className="font-semibold">${item.currentValue.toFixed(2)}</p>
                        </div>
                        <div>
                             <p className="text-sm text-text-secondary">Gain/Loss</p>
                             <p className={`font-semibold ${item.totalGainLoss >= 0 ? 'text-gain' : 'text-loss'}`}>
                                {item.totalGainLoss >= 0 ? '+' : ''}${item.totalGainLoss.toFixed(2)} ({item.totalGainLossPercent.toFixed(2)}%)
                             </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Portfolio;
