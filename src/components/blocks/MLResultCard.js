import React from 'react';
import { FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

const MLResultCard = ({
    result = 'Sample Status: Stable Composition',
    type = 'Unknown',   // ✅ ADDED TYPE
    confidence = 92,
    status = 'safe'
}) => {

    const statusConfig = {
        safe: {
            gradient: 'from-emerald-500 to-teal-600',
            bgLight: 'bg-emerald-50',
            textColor: 'text-emerald-700',
            borderColor: 'border-emerald-200',
            icon: FiCheckCircle,
            badge: 'Stable',
            badgeBg: 'bg-emerald-100',
        },
        warning: {
            gradient: 'from-yellow-500 to-orange-600',
            bgLight: 'bg-yellow-50',
            textColor: 'text-yellow-700',
            borderColor: 'border-yellow-200',
            icon: FiAlertTriangle,
            badge: 'Variation',
            badgeBg: 'bg-yellow-100',
        },
        unsafe: {
            gradient: 'from-red-500 to-pink-600',
            bgLight: 'bg-red-50',
            textColor: 'text-red-700',
            borderColor: 'border-red-200',
            icon: FiAlertTriangle,
            badge: 'Anomaly',
            badgeBg: 'bg-red-100',
        },
    };

    const config = statusConfig[status] || statusConfig.safe;
    const IconComponent = config.icon;

    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (confidence / 100) * circumference;

    return (
        <div className={`relative overflow-hidden rounded-2xl shadow-2xl p-8 border-2 ${config.bgLight} ${config.borderColor}`}>

            <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-5`}></div>

            <div className="relative z-10">

                {/* HEADER */}
                <div className="flex items-start justify-between mb-8">

                    <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-widest">
                            AI Analysis Result
                        </p>

                        {/* TASTE RESULT */}
                        <h2 className={`text-3xl md:text-4xl font-bold ${config.textColor}`}>
                            {result}
                        </h2>

                        {/* ✅ TYPE ADDED HERE */}
                        <p className="mt-2 text-sm text-gray-600">
                            Type: <span className={`font-bold ${config.textColor}`}>
                                {type}
                            </span>
                        </p>
                    </div>

                    <div className="p-4 rounded-full bg-white/80 shadow-lg">
                        <IconComponent className={`w-8 h-8 ${config.textColor}`} />
                    </div>

                </div>

                {/* MAIN SECTION */}
                <div className="flex items-center justify-between">

                    {/* CIRCLE */}
                    <div className="relative w-32 h-32">

                        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="8"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                className={`${config.textColor}`}
                            />
                        </svg>

                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-3xl font-bold ${config.textColor}`}>
                                {confidence}%
                            </span>
                            <span className="text-xs text-gray-600">Confidence</span>
                        </div>

                    </div>

                    {/* BADGE */}
                    <div className={`px-4 py-2 rounded-full ${config.badgeBg} ${config.textColor}`}>
                        {config.badge}
                    </div>

                </div>

            </div>

            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient}`}></div>
        </div>
    );
};

export default MLResultCard;