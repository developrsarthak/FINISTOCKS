import React, { useState, useEffect, useMemo } from 'react';
import { PortfolioItem } from '../../types';
import { mockPortfolio } from '../../services/mockData';
import { getQuote } from '../../services/finnhubService';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PlusCircleIcon, TrashIcon } from '../icons/Icons';

const COLORS = ['#38b2ac', '#4299e1', '#9f7aea', '#ed8936', '#f56565', '#48bb78'];

const Portfolio: React.FC = () => {
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>(mockPortfolio);
    const [newSymbol, setNewSymbol] = useState('');
    const [newQuantity, setNewQuantity] = useState('');
    const [newPrice, setNewPrice] = useState('');

    useEffect(() => {
        const fetchCurrentPrices = async () => {
            const pricePromises = portfolio.map(item => getQuote(item.symbol));
            const quotes = await Promise.all(pricePromises);
            
            setPortfolio(currentPortfolio => 
                currentPortfolio.map(item => {
                    const quote = quotes.find(q => q?.symbol === item.symbol);
                    return { ...item, currentPrice: quote ? quote.price : item.purchasePrice };
                })
            );
        };

        if (portfolio.length > 0) {
            fetchCurrentPrices();
        }
    }, []);

    const handleAddStock = async (e: React.FormEvent) => {
        e.preventDefault();
        if(newSymbol && newQuantity && newPrice) {
            const quote = await getQuote(newSymbol.toUpperCase());
            const newItem: PortfolioItem = {
                symbol: newSymbol.toUpperCase(),
                quantity: parseFloat(newQuantity),
                purchasePrice: parseFloat(newPrice),
                currentPrice: quote ? quote.price : parseFloat(newPrice),
            };
            setPortfolio([...portfolio, newItem]);
            setNewSymbol('');
            setNewQuantity('');
            setNewPrice('');
        }
    };

    const handleRemoveStock = (symbol: string) => {
        setPortfolio(portfolio.filter(item => item.symbol !== symbol));
    };

    const portfolioData = useMemo(() => {
        const data = portfolio.map(item => {
            const currentValue = (item.currentPrice || item.purchasePrice) * item.quantity;
            const totalCost = item.purchasePrice * item.quantity;
            const pl = currentValue - totalCost;
            const plPercent = totalCost > 0 ? (pl / totalCost) * 100 : 0;
            return { ...item, currentValue, pl, plPercent };
        });

        const totalValue = data.reduce((acc, item) => acc + item.currentValue, 0);
        const totalCost = data.reduce((acc, item) => acc + (item.purchasePrice * item.quantity), 0);
        const totalPL = totalValue - totalCost;
        const totalPLPercent = totalCost > 0 ? (totalPL / totalCost) * 100 : 0;

        return { data, totalValue, totalPL, totalPLPercent };
    }, [portfolio]);

    const chartData = portfolioData.data.map(item => ({
        name: item.symbol,
        value: item.currentValue,
    }));
    
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold mb-2 text-text-primary">My Portfolio</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="bg-secondary p-4 rounded-lg shadow-lg">
                        <h3 className="text-sm font-medium text-text-secondary">Total Value</h3>
                        <p className="text-2xl font-semibold text-white">${portfolioData.totalValue.toFixed(2)}</p>
                    </div>
                     <div className="bg-secondary p-4 rounded-lg shadow-lg">
                        <h3 className="text-sm font-medium text-text-secondary">Total P/L</h3>
                        <p className={`text-2xl font-semibold ${portfolioData.totalPL >= 0 ? 'text-gain' : 'text-loss'}`}>
                            ${portfolioData.totalPL.toFixed(2)}
                        </p>
                    </div>
                     <div className="bg-secondary p-4 rounded-lg shadow-lg">
                        <h3 className="text-sm font-medium text-text-secondary">Total P/L %</h3>
                        <p className={`text-2xl font-semibold ${portfolioData.totalPL >= 0 ? 'text-gain' : 'text-loss'}`}>
                            {portfolioData.totalPLPercent.toFixed(2)}%
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-secondary p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Add New Stock</h3>
                    <form onSubmit={handleAddStock} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <input value={newSymbol} onChange={(e) => setNewSymbol(e.target.value)} placeholder="Symbol (e.g. AAPL)" className="bg-accent p-2 rounded text-white placeholder-text-secondary"/>
                        <input value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)} type="number" placeholder="Quantity" className="bg-accent p-2 rounded text-white placeholder-text-secondary"/>
                        <input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} type="number" placeholder="Purchase Price" className="bg-accent p-2 rounded text-white placeholder-text-secondary"/>
                        <button type="submit" className="bg-highlight text-white p-2 rounded flex items-center justify-center hover:bg-teal-500 transition-colors">
                            <PlusCircleIcon /> <span className="ml-2">Add</span>
                        </button>
                    </form>
                </div>
                <div className="lg:col-span-1 bg-secondary p-6 rounded-lg shadow-lg">
                     <h3 className="text-xl font-bold mb-4 text-center">Asset Allocation</h3>
                     <div className="w-full h-64">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                                </Pie>
                                <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                     </div>
                </div>
            </div>
            
            <div className="bg-secondary p-4 sm:p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">Holdings</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-accent">
                            <tr>
                                <th className="p-3">Symbol</th>
                                <th className="p-3">Quantity</th>
                                <th className="p-3">Purchase Price</th>
                                <th className="p-3">Current Price</th>
                                <th className="p-3">Current Value</th>
                                <th className="p-3">P/L</th>
                                <th className="p-3">P/L %</th>
                                <th className="p-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {portfolioData.data.map(item => (
                                <tr key={item.symbol} className="border-b border-accent last:border-b-0 hover:bg-accent">
                                    <td className="p-3 font-bold">{item.symbol}</td>
                                    <td className="p-3">{item.quantity}</td>
                                    <td className="p-3">${item.purchasePrice.toFixed(2)}</td>
                                    <td className="p-3">${(item.currentPrice || 0).toFixed(2)}</td>
                                    <td className="p-3">${item.currentValue.toFixed(2)}</td>
                                    <td className={`p-3 font-semibold ${item.pl >= 0 ? 'text-gain' : 'text-loss'}`}>${item.pl.toFixed(2)}</td>
                                    <td className={`p-3 font-semibold ${item.plPercent >= 0 ? 'text-gain' : 'text-loss'}`}>{item.plPercent.toFixed(2)}%</td>
                                    <td className="p-3">
                                        <button onClick={() => handleRemoveStock(item.symbol)} className="text-loss hover:text-red-400">
                                            <TrashIcon />
                                        </button>
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