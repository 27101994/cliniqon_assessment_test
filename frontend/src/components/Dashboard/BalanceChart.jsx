import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const BalanceChart = ({ withdraw = 0, balance = 0 }) => {
    const data = [
        { name: 'Withdraw Amount', value: withdraw, color: '#FF8A8A' }, // Coral
        { name: 'Balance Amount', value: balance, color: '#3D3D66' },   // Indigo/Navy
    ];

    const backgroundData = [{ value: 100 }];

    const total = withdraw + balance;
    const percentage = total > 0 ? ((balance / total) * 100).toFixed(1) : 0;

    return (
        <div className="bg-white p-6 rounded-[32px] shadow-soft h-[320px] relative flex flex-col justify-between border border-gray-100/50">
            <div className="flex justify-between items-center mb-1">
                <h3 className="text-xl font-bold text-[#1E1E2D]">Chart</h3>
            </div>

            <div className="flex items-center gap-6 h-full">
                {/* Legend (Left Side) */}
                <div className="flex flex-col gap-6 min-w-[110px]">
                    {data.map((entry, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <span className="w-3.5 h-3.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: entry.color }}></span>
                            <span className="text-[14px] font-bold text-[#1E1E2D] leading-tight">
                                {entry.name.split(' ')[0]}
                                <br />
                                <span className="text-gray-300 font-medium text-[12px] uppercase tracking-wider">Amount</span>
                            </span>
                        </div>
                    ))}
                </div>

                {/* Chart (Right Side) */}
                <div className="relative flex-1 h-[220px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            {/* Background Track (Thicker) */}
                            <Pie
                                data={backgroundData}
                                cx="50%"
                                cy="50%"
                                innerRadius={65}
                                outerRadius={90}
                                dataKey="value"
                                stroke="none"
                                fill="#F5F6FA"
                                isAnimationActive={false}
                            />
                            {/* Actual Data (Thicker) */}
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={65}
                                outerRadius={90}
                                startAngle={90}
                                endAngle={-270}
                                dataKey="value"
                                stroke="none"
                                cornerRadius={30}
                                paddingAngle={0}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    {/* NEW: Nested Inner Circle with Shadow (The "Floating" effect) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[98px] h-[98px] bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-4 border-gray-50 flex items-center justify-center">
                        <div className="flex items-baseline justify-center">
                            <span className="text-3xl font-black text-[#1E1E2D] tracking-tighter">{Math.floor(percentage)}</span>
                            <span className="text-sm font-bold text-gray-300 ml-0.5">.{percentage.toString().split('.')[1] || '0'}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BalanceChart;
