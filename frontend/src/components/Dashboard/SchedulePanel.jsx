import React from 'react';
import { RiMoreLine, RiCalendarLine, RiVideoChatLine, RiCheckboxLine, RiMacbookLine } from 'react-icons/ri';

const SchedulePanel = ({ schedule = [] }) => {
    // Hardcoded dates for demo to match image
    const dates = [
        { day: '03', name: 'Mon', dots: ['bg-red-400', 'bg-blue-400', 'bg-green-400'] },
        { day: '04', name: 'Tue', dots: ['bg-red-400'] },
        { day: '05', name: 'Wed', active: true, dots: ['bg-red-400', 'bg-orange-400', 'bg-green-400'] },
        { day: '06', name: 'Thu', dots: ['bg-purple-400'] },
        { day: '07', name: 'Fri', dots: ['bg-red-400', 'bg-green-400'] },
    ];

    const getStyle = (type) => {
        switch (type) {
            case 'meeting': // Client Meeting -> Salmon/Red
                return {
                    bg: 'bg-[#FF8787]', // Salmon-ish
                    text: 'text-white',
                    iconBg: 'bg-white',
                    iconColor: 'text-[#FF8787]', // Icon matches card bg
                    descColor: 'text-red-100',
                    icon: RiVideoChatLine
                };
            case 'task': // Check List -> Dark Indigo
                return {
                    bg: 'bg-[#4B49AC]', // Dark Indigo
                    text: 'text-white',
                    iconBg: 'bg-white',
                    iconColor: 'text-[#4B49AC]',
                    descColor: 'text-indigo-200',
                    icon: RiCheckboxLine
                };
            case 'course': // Course -> Orange
                return {
                    bg: 'bg-[#FFB74D]', // Orange
                    text: 'text-white',
                    iconBg: 'bg-white',
                    iconColor: 'text-[#FFB74D]',
                    descColor: 'text-orange-100',
                    icon: RiMacbookLine
                };
            default:
                return {
                    bg: 'bg-gray-100',
                    text: 'text-gray-800',
                    iconBg: 'bg-white',
                    iconColor: 'text-gray-600',
                    descColor: 'text-gray-500',
                    icon: RiMoreLine
                };
        }
    };

    return (
        <div className="bg-white p-8 rounded-[32px] shadow-soft">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-800">Today, 05 March</h3>
            </div>

            {/* Date Picker Strip */}
            <div className="flex justify-between mb-10 overflow-x-auto pb-4 gap-2">
                {dates.map((d) => (
                    <div
                        key={d.day}
                        className={`flex flex-col items-center justify-center min-w-[3.5rem] h-20 rounded-[24px] cursor-pointer transition-all duration-300 relative
                            ${d.active
                                ? 'bg-[#1E1B39] text-white shadow-xl shadow-indigo-900/20 scale-105'
                                : 'bg-transparent text-gray-800 hover:bg-gray-50'
                            }`}
                    >
                        <span className="text-xl font-bold mb-1">{d.day}</span>
                        <span className={`text-[11px] font-medium tracking-wide ${d.active ? 'text-gray-300' : 'text-gray-400'}`}>{d.name}</span>

                        {/* Dots */}
                        <div className="flex gap-1 mt-2">
                            {d.dots && d.dots.map((dotClass, i) => (
                                <div key={i} className={`w-1.5 h-1.5 rounded-full ${dotClass}`}></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Timeline Events */}
            <div className="space-y-8">
                {schedule.map((item, index) => {
                    const style = getStyle(item.type);
                    const Icon = style.icon;
                    // Format time "08:00" -> "08"
                    const timeLabel = item.time ? item.time.split(':')[0] : '';

                    return (
                        <div key={index} className="flex gap-6 relative group">
                            {/* Time Column */}
                            <div className="w-14 pt-6 text-right flex-shrink-0">
                                <span className="text-sm font-medium text-gray-400">{timeLabel} am</span>
                                {/* Dotted line could go here if needed, but keeping clean for now */}
                            </div>

                            {/* Card Column */}
                            <div className={`flex-1 p-5 rounded-[24px] ${style.bg} ${style.text} shadow-sm transition-transform hover:scale-[1.02] cursor-pointer`}>
                                <div className="flex items-center gap-4">
                                    {/* Icon Box */}
                                    <div className={`w-12 h-12 rounded-full ${style.iconBg} flex items-center justify-center shadow-sm flex-shrink-0`}>
                                        <Icon className={`text-2xl ${style.iconColor}`} />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-base mb-0.5 truncate">{item.title}</h4>
                                        <p className={`text-xs ${style.descColor} leading-snug line-clamp-2`}>{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SchedulePanel;
