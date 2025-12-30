import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-primary text-white p-3 rounded-lg shadow-xl text-xs">
                <p className="font-bold mb-1">{label}</p>
                <p className="text-coral-500">Earnings: ${payload[0].value}</p>
            </div>
        );
    }
    return null;
};

const AccountingChart = ({ data }) => {
    // Demo data if none provided (to prevent crash)
    const chartData = data && data.length > 0 ? data : Array.from({ length: 12 }, (_, i) => ({
        month: new Date(2023, i).toLocaleString('default', { month: 'short' }),
        income: Math.floor(Math.random() * 2000) + 500
    }));

    return (
        <div className="bg-white p-6 rounded-3xl shadow-soft h-[350px] relative">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">Accounting</h3>
                    <p className="text-xs text-gray-400 font-medium">Overall Earning</p>
                </div>
                <select className="bg-gray-50 border-none text-xs text-gray-500 font-medium py-2 px-4 rounded-lg focus:ring-0 cursor-pointer hover:bg-gray-100">
                    <option>Sort by: Monthly</option>
                    <option>Sort by: Weekly</option>
                </select>
            </div>

            <ResponsiveContainer width="100%" height="80%">
                <BarChart data={chartData} barSize={12}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#9ca3af' }}
                        dy={10}
                        tickFormatter={(value) => {
                            // Ensure value is a string (Month Name)
                            return value.substring(0, 3);
                        }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#9ca3af' }}
                        domain={[0, 'auto']}
                        dx={-10}
                    />
                    <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
                    <Bar
                        dataKey="income"
                        fill="url(#colorGradient)"
                        radius={[10, 10, 10, 10]}
                    />
                    <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#1E1E2D" stopOpacity={1} />
                            <stop offset="100%" stopColor="#1E1E2D" stopOpacity={0.6} />
                        </linearGradient>
                    </defs>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AccountingChart;
