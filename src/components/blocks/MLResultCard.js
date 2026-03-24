import React from 'react';
import { FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

/**
 * MLResultCard - Highlights ML analysis results with confidence indicator
 * @param {string} result - The ML result (generic E-Tongue output)
 * @param {number} confidence - Confidence percentage (0-100)
 * @param {string} status - Result status (safe, warning, unsafe)
 */
const MLResultCard = ({
    result = 'Sample Status: Stable Composition',
    confidence = 92,
    status = 'safe'
}) => {

    // ✅ Status configuration (UPDATED LABELS)
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

    // ✅ Circular progress calculation
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (confidence / 100) * circumference;

    return (
        <div
            className={`relative overflow-hidden rounded-2xl shadow-2xl p-8 border-2 ${config.bgLight} ${config.borderColor} transition-all duration-300`}
        >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-5 animate-pulse`}></div>

            {/* Glow effect */}
            <div className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br ${config.gradient} opacity-10 rounded-full blur-3xl`}></div>

            <div className="relative z-10">

                {/* HEADER */}
                <div className="flex items-start justify-between mb-8">
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-widest">
                            AI Analysis Result
                        </p>

                        <h2 className={`text-3xl md:text-4xl font-bold ${config.textColor} mb-3`}>
                            {result}
                        </h2>
                    </div>

                    {/* ICON */}
                    <div className="p-4 rounded-full bg-white/80 backdrop-blur-sm shadow-lg animate-bounce">
                        <IconComponent className={`w-8 h-8 ${config.textColor}`} />
                    </div>
                </div>

                {/* MAIN SECTION */}
                <div className="flex items-center justify-between mb-8">

                    {/* CIRCLE */}
                    <div className="flex flex-col items-center">
                        <div className="relative w-32 h-32 mb-4">
                            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    stroke="#e5e7eb"
                                    strokeWidth="8"
                                />

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
                                    className={`transition-all duration-1000 ${config.textColor}`}
                                />
                            </svg>

                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className={`text-3xl font-bold ${config.textColor}`}>
                                    {confidence}%
                                </span>
                                <span className="text-xs text-gray-600 mt-1">
                                    Confidence
                                </span>
                            </div>
                        </div>

                        {/* BADGE */}
                        <div className={`px-4 py-2 rounded-full ${config.badgeBg} ${config.textColor} font-semibold text-sm`}>
                            {config.badge}
                        </div>
                    </div>

                    {/* DETAILS */}
                    <div className="flex-1 ml-8 space-y-4">

                        {/* BAR */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <p className="text-sm font-semibold text-gray-700">
                                    Model Confidence
                                </p>
                                <p className={`text-sm font-bold ${config.textColor}`}>
                                    {confidence}%
                                </p>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div
                                    className={`bg-gradient-to-r ${config.gradient} h-full transition-all duration-1000`}
                                    style={{ width: `${confidence}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* ANALYSIS TEXT */}
                        <div className={`p-4 rounded-lg ${config.bgLight} border ${config.borderColor}`}>
                            <p className="text-xs text-gray-600 mb-2 font-semibold">
                                Analysis Insight:
                            </p>

                            <p className={`text-sm font-medium ${config.textColor}`}>
                                {status === 'safe'
                                    ? 'Sensor readings indicate stable chemical composition with no significant variation.'
                                    : status === 'warning'
                                        ? 'Minor variations detected in sensor patterns. Monitor for possible changes.'
                                        : 'Abnormal sensor patterns detected. Indicates unusual composition or contamination.'}
                            </p>
                        </div>

                    </div>
                </div>

                {/* BOTTOM LINE */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient}`}></div>
            </div>
        </div>
    );
};

export default MLResultCard;