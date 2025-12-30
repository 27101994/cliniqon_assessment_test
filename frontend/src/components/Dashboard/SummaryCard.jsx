import React from 'react';

const SummaryCard = ({ icon: Icon, title, value, growth }) => {
    // Format value to have leading zero if it's a small number like '3' -> '03'
    const displayValue = (!isNaN(value) && value < 10 && value > -1) ? `0${value}` : value;

    return (
        <div className="bg-white p-5 rounded-2xl shadow-soft flex items-center gap-4 hover:shadow-lg transition-all duration-300 border border-gray-100/50">
            {/* Icon Container (Deep Indigo) */}
            <div className="w-14 h-14 rounded-full bg-[#3D3D66] flex items-center justify-center shrink-0 shadow-sm border-2 border-white">
                <Icon className="text-2xl text-white" />
            </div>

            <div className="flex flex-col">
                <p className="text-gray-300 text-[11px] font-bold uppercase tracking-wider mb-1">{title}</p>
                <div className="flex flex-col">
                    <h3 className="text-2xl font-bold text-[#1E1E2D] leading-tight">{displayValue}</h3>
                    {growth && (
                        <span className="text-[10px] font-bold text-gray-300">
                            {growth.startsWith('+') || growth.startsWith('-') ? growth : `+${growth}`}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SummaryCard;
