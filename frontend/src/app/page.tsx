"use client";

import { useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import Header from "@/components/Header";
import Grid from "@/components/Grid";

const GRID_SIZE = 20;

function generateRandomColor(): string {
  const colors = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8",
    "#F7DC6F", "#BB8FCE", "#85C1E2", "#F8B739", "#52B788",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default function Home() {
  const [username, setUsername] = useState("");
  const [userColor, setUserColor] = useState("");
  const [joinedGame, setJoinedGame] = useState(false);

  const { tiles, onlineCount, loading, claimTile } = useSocket(
    username,
    userColor,
    joinedGame
  );

  const handleJoin = () => {
    if (username.trim()) {
      const color = generateRandomColor();
      setUserColor(color);
      setJoinedGame(true);
    }
  };

  const handleLeaveGame = () => {
    setJoinedGame(false);
    setUsername("");
    setUserColor("");
  };

  const handleClearGrid = async () => {
    if (username !== 'prasad') return;
    
    const confirmed = confirm('Are you sure you want to clear the entire grid? This cannot be undone.');
    if (!confirmed) return;

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
      const url = `${backendUrl}/api/tiles/clear`;
      
      console.log('Attempting to clear grid at:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert(`Success! ${data.message}`);
        // Grid will update automatically via socket
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Clear grid error:', error);
      alert('Failed to connect to backend. Make sure the backend server is running on port 4000.');
    }
  };

  if (!joinedGame) {
    return (
      <div className="flex min-h-screen bg-gray-900">
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&q=80"
              alt="Gaming background"
              className="w-full h-full object-cover opacity-60"
            />
          </div>
          <div className="relative z-10 flex flex-col justify-center items-center text-center px-12 w-full">
            <div className="mb-8">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-6">
                <span className="text-white font-bold text-4xl">SG</span>
              </div>
            </div>
            <h2 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
              Capturing Moments,<br />Creating Memories
            </h2>
            <p className="text-xl text-white/90 max-w-md">
              Join thousands of players collaborating on a shared pixel canvas in real-time
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-900">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8 flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-white font-bold text-2xl">SG</span>
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
              Shared Grid
            </h1>
            <p className="text-gray-400 mb-10 text-base">
              Real-time collaborative pixel board
            </p>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                className="w-full px-5 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-600"
                maxLength={20}
                autoFocus
              />
              <button
                onClick={handleJoin}
                disabled={!username.trim()}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl active:scale-95 transform"
              >
                Join Game
              </button>
            </div>

            <p className="mt-8 text-sm text-gray-500 flex items-center gap-2">
              <span className="text-xl">🎨</span>
              Claim tiles in real-time with other players
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-700 border-t-purple-500 mb-4"></div>
          <p className="text-xl font-semibold text-white">Loading game...</p>
          <p className="text-sm text-gray-400 mt-2">Connecting to server</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header 
        username={username} 
        userColor={userColor} 
        onlineCount={onlineCount} 
        onLeaveGame={handleLeaveGame}
        onClearGrid={handleClearGrid}
      />
      <main className="flex-1 flex items-center justify-center py-8">
        {tiles.length > 0 ? (
          <Grid
            tiles={tiles}
            gridSize={GRID_SIZE}
            onTileClick={claimTile}
            userColor={userColor}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-700 border-t-purple-500 mb-4"></div>
            <p className="text-gray-300 font-medium">Loading tiles...</p>
          </div>
        )}
      </main>
    </div>
  );
}
