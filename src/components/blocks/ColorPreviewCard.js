import React, { useState } from 'react';
import { FiCopy } from 'react-icons/fi';

/**
 * ColorPreviewCard - Displays live RGB color visualization
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 */
const ColorPreviewCard = ({ r = 0, g = 0, b = 0 }) => {
    const [copied, setCopied] = useState(false);

    // Convert RGB to Hex
    const rgbToHex = (r, g, b) => {
        return `#${[r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('').toUpperCase()}`;
    };

    const hexColor = rgbToHex(r, g, b);
    const rgbColor = `rgb(${r}, ${g}, ${b})`;

    // Copy to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 overflow-hidden">
            {/* Header */}
            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Color Sensor Preview</h3>
                <p className="text-sm text-gray-600">Real-time RGB color visualization</p>
            </div>

            {/* Color Preview Box */}
            <div className="mb-8 text-center">
                <div
                    className="w-full h-40 rounded-xl shadow-xl mb-4 border-4 border-gray-100 transition-all duration-300"
                    style={{ backgroundColor: rgbColor }}
                ></div>

                {/* Color Details */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    {/* Red */}
                    <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                        <p className="text-xs text-red-600 font-semibold mb-1">RED</p>
                        <p className="text-2xl font-bold text-red-700">{r}</p>
                        <p className="text-xs text-red-500 mt-1">/{255}</p>
                    </div>

                    {/* Green */}
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                        <p className="text-xs text-green-600 font-semibold mb-1">GREEN</p>
                        <p className="text-2xl font-bold text-green-700">{g}</p>
                        <p className="text-xs text-green-500 mt-1">/{255}</p>
                    </div>

                    {/* Blue */}
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <p className="text-xs text-blue-600 font-semibold mb-1">BLUE</p>
                        <p className="text-2xl font-bold text-blue-700">{b}</p>
                        <p className="text-xs text-blue-500 mt-1">/{255}</p>
                    </div>
                </div>

                {/* Color Codes */}
                <div className="space-y-3">
                    {/* RGB */}
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <div>
                            <p className="text-xs text-gray-600 font-semibold mb-1">RGB Format</p>
                            <p className="text-sm font-mono text-gray-800">{rgbColor}</p>
                        </div>
                        <button
                            onClick={() => copyToClipboard(rgbColor)}
                            className="p-2 hover:bg-gray-200 rounded-lg transition text-gray-600"
                            title="Copy RGB"
                        >
                            <FiCopy size={18} />
                        </button>
                    </div>

                    {/* HEX */}
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <div>
                            <p className="text-xs text-gray-600 font-semibold mb-1">HEX Format</p>
                            <p className="text-sm font-mono text-gray-800">{hexColor}</p>
                        </div>
                        <button
                            onClick={() => copyToClipboard(hexColor)}
                            className="p-2 hover:bg-gray-200 rounded-lg transition text-gray-600"
                            title="Copy HEX"
                        >
                            <FiCopy size={18} />
                        </button>
                    </div>
                </div>

                {/* Copied notification */}
                {copied && (
                    <div className="mt-4 text-sm text-green-600 font-medium animate-pulse">
                        ✓ Copied to clipboard
                    </div>
                )}
            </div>

            {/* Color Palette */}
            <div className="border-t pt-6">
                <p className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wider">Color Intensity</p>
                <div className="space-y-2">
                    {/* Red Bar */}
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-red-600 w-6">R:</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-red-400 to-red-600 h-full transition-all duration-300"
                                style={{ width: `${(r / 255) * 100}%` }}
                            ></div>
                        </div>
                        <span className="text-xs text-gray-600 w-10 text-right">{Math.round((r / 255) * 100)}%</span>
                    </div>

                    {/* Green Bar */}
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-green-600 w-6">G:</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-green-400 to-green-600 h-full transition-all duration-300"
                                style={{ width: `${(g / 255) * 100}%` }}
                            ></div>
                        </div>
                        <span className="text-xs text-gray-600 w-10 text-right">{Math.round((g / 255) * 100)}%</span>
                    </div>

                    {/* Blue Bar */}
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-blue-600 w-6">B:</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-blue-400 to-blue-600 h-full transition-all duration-300"
                                style={{ width: `${(b / 255) * 100}%` }}
                            ></div>
                        </div>
                        <span className="text-xs text-gray-600 w-10 text-right">{Math.round((b / 255) * 100)}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColorPreviewCard;
