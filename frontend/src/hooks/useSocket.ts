import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export interface Tile {
  tileId: number;
  owner: string | null;
  color: string | null;
  claimedAt: string | null;
}

export interface User {
  username: string;
  color: string;
}

export function useSocket(username: string, color: string, enabled: boolean) {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [onlineCount, setOnlineCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
    
    const socket = io(backendUrl, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    // Join game with username and color
    socket.emit('join', { username, color });

    // Receive initial board state
    socket.on('initBoard', (initialTiles: Tile[]) => {
      setTiles(initialTiles);
      setLoading(false);
    });

    // Receive tile claims in real-time
    socket.on('tileClaimed', (updatedTile: Tile) => {
      setTiles((prev) =>
        prev.map((tile) =>
          tile.tileId === updatedTile.tileId ? updatedTile : tile
        )
      );
    });

    // Receive grid cleared event
    socket.on('gridCleared', (clearedTiles: Tile[]) => {
      setTiles(clearedTiles);
      console.log('Grid has been cleared by admin');
    });

    // Receive user list updates
    socket.on('users', (userList: User[]) => {
      setUsers(userList);
    });

    // Receive online count updates
    socket.on('onlineCount', (count: number) => {
      setOnlineCount(count);
    });

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.disconnect();
    };
  }, [enabled, username, color]);

  const claimTile = (tileId: number) => {
    if (!socketRef.current) return;

    socketRef.current.emit(
      'claimTile',
      { tileId, username, color },
      (response: { success: boolean; message?: string; tile?: Tile }) => {
        if (!response.success) {
          console.warn('Failed to claim tile:', response.message);
        }
      }
    );
  };

  return {
    tiles,
    users,
    onlineCount,
    loading,
    claimTile,
  };
}
