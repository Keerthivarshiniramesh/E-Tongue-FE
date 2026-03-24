import React, { useContext } from 'react';
import { FiDownload, FiLogOut, FiUser } from 'react-icons/fi';
import { MdWifi, dSignalCellular4Bar } from 'react-icons/md';
import { DContext } from '../../context/Datacontext';

/**
 * DashboardHeader - Modern dashboard header with title, status, and user info
 * @param {function} onDownload - Callback for download button
 * @param {boolean} isConnected - Connection status
 */
const DashboardHeader = ({ onDownload, isConnected = true }) => {
    const { handleLogout, currentUser } = useContext(DContext);

    // Get user initials for avatar
    const getInitials = (name) => {
        if (!name) return 'U';
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const userInitials = getInitials(currentUser?.fullname || 'User');

    return (
        <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 border-b border-gray-100 shadow-sm">
            <div className="max-w-full mx-auto px-4 md:px-8 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Left: Title & Logo */}
                    <div className="flex items-center gap-3">
                        {/* Logo/Icon */}
                        <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-bold text-lg shadow-lg">
                            ET
                        </div>

                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                E-Tongue <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Analysis</span>
                            </h1>
                            <p className="text-xs text-gray-600 mt-1">Real-time Sensor Dashboard</p>
                        </div>
                    </div>

                    {/* Center: Status */}
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
                        {isConnected ? (
                            <>
                                <dSignalCellular4Bar className="w-5 h-5 text-green-500 animate-pulse" />
                                <span className="text-sm font-medium text-gray-700">
                                    <span className="text-green-600 font-semibold">Live</span> • Connected
                                </span>
                            </>
                        ) : (
                            <>
                                <MdWifi className="w-5 h-5 text-red-500" />
                                <span className="text-sm font-medium text-gray-700">
                                    <span className="text-red-600 font-semibold">Offline</span> • Disconnected
                                </span>
                            </>
                        )}
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Download Button */}
                        <button
                            onClick={onDownload}
                            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium text-sm md:text-base group"
                        >
                            <FiDownload className="w-4 h-4 group-hover:animate-bounce" />
                            <span className="hidden sm:inline">Export</span>
                        </button>

                        {/* User Menu */}
                        <div className="relative group">
                            {/* Avatar */}
                            <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-sm md:text-base flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                {userInitials}
                            </button>

                            {/* User Dropdown Menu */}
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                {/* User Info */}
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="text-sm font-semibold text-gray-900">{currentUser?.fullname || 'User'}</p>
                                    <p className="text-xs text-gray-600 mt-1">{currentUser?.email || 'user@example.com'}</p>
                                </div>

                                {/* Menu Items */}
                                <div className="py-2">
                                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                        <FiUser className="w-4 h-4" />
                                        Profile
                                    </button>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors border-t border-gray-100 mt-2 pt-2"
                                    >
                                        <FiLogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Status Badge */}
                <div className="md:hidden mt-3 flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 w-fit">
                    {isConnected ? (
                        <>
                            <dSignalCellular4Bar className="w-4 h-4 text-green-500 animate-pulse" />
                            <span className="text-xs font-medium text-gray-700">
                                <span className="text-green-600 font-semibold">Live</span> • Connected
                            </span>
                        </>
                    ) : (
                        <>
                            <MdWifi className="w-4 h-4 text-red-500" />
                            <span className="text-xs font-medium text-gray-700">
                                <span className="text-red-600 font-semibold">Offline</span>
                            </span>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
