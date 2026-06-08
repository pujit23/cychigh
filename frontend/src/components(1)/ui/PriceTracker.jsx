import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const PriceTracker = ({ priceHistory, currentPrice }) => {
    // Generate mock graph data if none exists
    const mockData = [
        { name: 'Jan', price: currentPrice * 1.05 },
        { name: 'Feb', price: currentPrice * 1.02 },
        { name: 'Mar', price: currentPrice * 1.00 },
        { name: 'Apr', price: currentPrice * 1.03 },
        { name: 'May', price: currentPrice * 0.98 },
        { name: 'Jun', price: currentPrice },
    ];

    const data = priceHistory && priceHistory.length > 0 ? priceHistory : mockData;

    return (
        <div className="glass-panel p-6 rounded-xl mt-8">
            <h3 className="heading-md mb-6">Price Tracker</h3>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <XAxis 
                            dataKey="name" 
                            stroke="#A0A0A0" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false}
                        />
                        <YAxis 
                            stroke="#A0A0A0" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false}
                            tickFormatter={(val) => `₹${(val/1000).toFixed(0)}k`}
                        />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,215,0,0.2)', borderRadius: '4px' }}
                            formatter={(value) => [formatCurrency(value), "Price"]}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="price" 
                            stroke="#FFD700" 
                            strokeWidth={3}
                            dot={{ fill: '#FFD700', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, fill: '#D22B2B', stroke: '#fff' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PriceTracker;
