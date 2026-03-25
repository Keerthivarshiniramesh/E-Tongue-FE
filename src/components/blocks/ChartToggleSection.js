import React, { useState } from 'react';
import CustomApexChart from './LiveChart';

/**
 * ChartToggleSection - Enhanced chart display with line toggles
 * @param {array} data - Chart data array
 * @param {array} toggleOptions - Default toggle states
 */
const ChartToggleSection = ({ data, toggleOptions = ['R', 'G', 'B', 'Frequency'] }) => {
    const [toggles, setToggles] = useState({
        R: true,
        G: true,
        B: true,
        Frequency: true,
    });

    // Filter data based on toggles
    const filteredData = data.filter(item => toggles[item.seriesName]);

    const handleToggle = (name) => {
        setToggles(prev => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

    // Color mapping for legend
    const colorMap = {
        R: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', color: '#ef4444' },
        G: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', color: '#22c55e' },
        B: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', color: '#3b82f6' },
        Frequency: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300', color: '#a855f7' },
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
            {/* Header */}
            <div className="mb-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                    Color Sensor Signals
                </h3>
                <p className="text-sm text-gray-600">Real-time monitoring of R, G, B intensity and frequency</p>
            </div>

            {/* Toggle Controls */}
            <div className="mb-6 flex flex-wrap gap-2 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider mr-auto">
                    Show/Hide:
                </span>
                <div className="flex flex-wrap gap-2">
                    {toggleOptions.map(option => (
                        <button
                            key={option}
                            onClick={() => handleToggle(option)}
                            className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-200 border-2 flex items-center gap-2 ${toggles[option]
                                ? `${colorMap[option].bg} ${colorMap[option].text} ${colorMap[option].border} border-2 scale-105`
                                : 'bg-gray-200 text-gray-500 border-gray-300 opacity-50'
                                }`}
                        >
                            <span className={`w-2 h-2 rounded-full ${toggles[option] ? 'opacity-100' : 'opacity-30'}`}
                                style={{ backgroundColor: colorMap[option].color }}
                            ></span>
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                {toggleOptions.map(option => (
                    <div
                        key={option}
                        className={`p-3 rounded-lg border-l-4 transition-all ${toggles[option]
                            ? `bg-white border-gray-300 border-l-4`
                            : `bg-gray-50 border-l-gray-300 opacity-50`
                            }`}
                        style={toggles[option] ? { borderLeftColor: colorMap[option].color } : {}}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: colorMap[option].color }}
                            ></span>
                            <span className="font-semibold text-sm text-gray-900">{option}</span>
                        </div>
                        <p className="text-xs text-gray-600">
                            {option === 'Frequency' ? 'Hz' : 'Intensity (0-255)'}
                        </p>
                    </div>
                ))}
            </div>

            {/* Chart */}
            {filteredData.length > 0 ? (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <CustomApexChart
                        data={filteredData}
                        title="RGB"
                        lineStyle="smooth"
                        lineWidth={2}
                        chartType="line"
                        controls={{
                            show: true,
                            download: true,
                            zoom: true,
                            zoomin: true,
                            zoomout: true,
                            pan: true,
                            reset: true,
                        }}
                    />
                </div>
            ) : (
                <div className="flex items-center justify-center h-80 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                    <div className="text-center">
                        <p className="text-gray-600 font-medium mb-2">Select a sensor to view</p>
                        <p className="text-xs text-gray-500">Enable at least one line to display the chart</p>
                    </div>
                </div>
            )}

            {/* Chart Info */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs font-semibold text-blue-900 mb-1">💡 Tip:</p>
                <p className="text-xs text-blue-800">
                    Use the toolbar to zoom, pan, and download chart data. Toggle sensors above to focus on specific readings.
                </p>
            </div>
        </div>
    );
};

export default ChartToggleSection;
