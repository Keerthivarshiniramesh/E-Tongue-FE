import React from 'react';
import { FiDroplet, FiSettings, FiWind } from 'react-icons/fi';

/**
 * ChemicalSensorCard - Displays individual chemical sensor readings
 * @param {string} label - Sensor label (pH, DTS, VOC)
 * @param {number} value - Current sensor reading
 * @param {string} unit - Unit of measurement
 * @param {string} status - Status (normal, warning, danger)
 * @param {string} icon - Icon type (ph, dts, voc)
 */
const ChemicalSensorCard = ({ label, value, unit, status = 'normal', icon = 'ph' }) => {
    // Status color mapping
    const statusColors = {
        normal: 'from-blue-500 to-cyan-500',
        warning: 'from-yellow-500 to-orange-500',
        danger: 'from-red-500 to-pink-500',
    };

    const statusBgLight = {
        normal: 'bg-blue-50',
        warning: 'bg-yellow-50',
        danger: 'bg-red-50',
    };

    const statusBorder = {
        normal: 'border-blue-200',
        warning: 'border-yellow-200',
        danger: 'border-red-200',
    };

    const statusTextColor = {
        normal: 'text-blue-600',
        warning: 'text-yellow-600',
        danger: 'text-red-600',
    };

    // Icon selection
    const IconComponent = () => {
        switch (icon) {
            case 'ph':
                return <FiDroplet className="w-6 h-6" />;
            case 'dts':
                return <FiSettings className="w-6 h-6" />;
            case 'voc':
                return <FiWind className="w-6 h-6" />;
            default:
                return <FiDroplet className="w-6 h-6" />;
        }
    };

    return (
        <div
            className={`relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer ${statusBgLight[status]} ${statusBorder[status]} border-2`}
        >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${statusColors[status]} opacity-10`}></div>

            {/* Content */}
            <div className="relative p-6 z-10">
                {/* Header with Icon */}
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">{label}</h3>
                    <div className={`p-2 rounded-lg ${statusTextColor[status]} bg-white/50 backdrop-blur-sm`}>
                        <IconComponent />
                    </div>
                </div>

                {/* Value Display */}
                <div className="mb-4">
                    <p className="text-4xl font-bold text-gray-900">{value.toFixed(2)}</p>
                    <p className="text-sm text-gray-600 mt-1">{unit}</p>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${statusTextColor[status]}`}></span>
                    <span className={`text-xs font-medium ${statusTextColor[status]} uppercase`}>
                        {status === 'normal' && 'Normal'}
                        {status === 'warning' && 'Warning'}
                        {status === 'danger' && 'Alert'}
                    </span>
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${statusColors[status]}`}></div>
            </div>
        </div>
    );
};

export default ChemicalSensorCard;
