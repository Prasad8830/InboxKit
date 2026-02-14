'use client';

import { Users, LogOut, Trash2 } from 'lucide-react';

interface HeaderProps {
  username: string;
  userColor: string;
  onlineCount: number;
  onLeaveGame: () => void;
  onClearGrid?: () => void;
}

export default function Header({
  username,
  userColor,
  onlineCount,
  onLeaveGame,
  onClearGrid,
}: HeaderProps) {
  return (
    <header className="bg-gray-800 shadow-lg border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">SG</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Shared Grid</h1>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          {/* User Info */}
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-gray-600 shadow-sm"
              style={{ backgroundColor: userColor }}
            />
            <span className="text-xs sm:text-sm font-medium text-gray-300 max-w-[100px] sm:max-w-none truncate">
              {username}
            </span>
          </div>

          {/* Online Count */}
          <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
            <Users size={16} className="text-purple-400 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-purple-400 whitespace-nowrap">
              {onlineCount}
            </span>
          </div>

          {/* Clear Grid Button - Admin Only */}
          {username === (process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'prasad') && onClearGrid && (
            <button
              onClick={onClearGrid}
              className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-orange-500/20 hover:bg-orange-500/30 rounded-lg border border-orange-500/30 hover:border-orange-500/50 transition-all duration-200 group"
              title="Clear Grid (Admin)"
            >
              <Trash2 size={16} className="text-orange-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-xs sm:text-sm font-semibold text-orange-400">
                Clear
              </span>
            </button>
          )}

          {/* Leave Game Button */}
          <button
            onClick={onLeaveGame}
            className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg border border-red-500/30 hover:border-red-500/50 transition-all duration-200 group"
            title="Leave Game"
          >
            <LogOut size={16} className="text-red-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline text-xs sm:text-sm font-semibold text-red-400">
              Leave
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
