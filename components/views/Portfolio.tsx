
import React from 'react';
import { mockPortfolio } from '../../services/mockData';
import { mockStocks } from '../../services/mockData';
import { ArrowUpIcon, ArrowDownIcon } from '../icons/Icons';

const Portfolio: React.FC = () => {
    // In a real app, this data would be fetched and joined.
    const portfolioWithCurrentData = mockPortfolio.map(item => {
        const stockInfo = mockStocks.find(s => s.symbol === item.symbol);
        const currentValue = stockInfo ? stockInfo.price * item.quantity : 0;
        const purchaseValue = item.purchasePrice * item.quantity;
        const gainLoss = currentValue - purchaseValue;
        const gainLossPercent = (gainLoss / purchaseValue) * 100;
        return {
            ...item,
            currentPrice: stockInfo?.price || 0,
            currentValue,
            gainLoss,
            gainLossPercent
        };
    });

    const totalValue = portfolioWithCurrentData.reduce((acc, item) => acc + item.currentValue, 0);
    const totalPurchaseValue = portfolioWithCurrentData.reduce((acc, item) => acc + (item.purchasePrice * item.quantity), 0);
    const totalGainLoss = totalValue - totalPurchaseValue;
    const totalGainLossPercent = (totalGainLoss / totalPurchaseValue) * 100;

    const isTotalGain = totalGainLoss >= 0;

    return (
        <div className="space-y-8">
            <div className="bg-secondary p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-text-primary">My Portfolio</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                        <p className="text-sm text-text-secondary">Total Value</p>
                        <p className="text-2xl font-bold text-text-primary">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div>
                        <p className="text-sm text-text-secondary">Total Gain/Loss</p>
                        <div className={`flex items-center justify-center text-2xl font-bold ${isTotalGain ? 'text-gain' : 'text-loss'}`}>
                           {isTotalGain ? <ArrowUpIcon className="h-5 w-5" /> : <ArrowDownIcon className="h-5 w-5" />}
                           <span>${Math.abs(totalGainLoss).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                     <div>
                        <p className="text-sm text-text-secondary">Total Gain/Loss %</p>
                        <div className={`flex items-center justify-center text-2xl font-bold ${isTotalGain ? 'text-gain' : 'text-loss'}`}>
                           {isTotalGain ? <ArrowUpIcon className="h-5 w-5" /> : <ArrowDownIcon className="h-5 w-5" />}
                           <span>{Math.abs(totalGainLossPercent).toFixed(2)}%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-secondary p-6 rounded-lg shadow-lg">
                 <h3 className="text-xl font-bold mb-4 text-text-primary">Holdings</h3>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-accent">
                                <th className="p-2">Symbol</th>
                                <th className="p-2">Quantity</th>
                                <th className="p-2">Avg. Cost</th>
                                <th className="p-2">Current Price</th>
                                <th className="p-2">Total Value</th>
                                <th className="p-2">Gain/Loss</th>
                            </tr>
                        </thead>
                        <tbody>
                            {portfolioWithCurrentData.map(item => (
                                <tr key={item.symbol} className="border-b border-accent last:border-b-0">
                                    <td className="p-2 font-bold">${item.symbol}</td>
                                    <td className="p-2">{item.quantity}</td>
                                    <td className="p-2">${item.purchasePrice.toFixed(2)}</td>
                                    <td className="p-2">${item.currentPrice.toFixed(2)}</td>
                                    <td className="p-2">${item.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                    <td className={`p-2 font-semibold ${item.gainLoss >= 0 ? 'text-gain' : 'text-loss'}`}>
                                       {item.gainLoss.toFixed(2)} ({item.gainLossPercent.toFixed(2)}%)
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
            </div>
        </div>
    );
};

export default Portfolio;
