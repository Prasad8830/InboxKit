'use client';

import { Tile } from '@/hooks/useSocket';

interface GridProps {
  tiles: Tile[];
  gridSize: number;
  onTileClick: (tileId: number) => void;
  userColor: string;
}

export default function Grid({
  tiles,
  gridSize,
  onTileClick,
  userColor,
}: GridProps) {
  return (
    <div className="flex justify-center items-center p-4 sm:p-6 w-full">
      <div
        className="bg-gray-700 p-2 sm:p-3 rounded-xl shadow-2xl border-4 border-gray-600"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          gap: '2px',
          width: 'min(700px, 95vw)',
          aspectRatio: '1/1',
        }}
      >
        {tiles.map((tile) => (
          <button
            key={tile.tileId}
            onClick={() => !tile.owner && onTileClick(tile.tileId)}
            className={`
              relative rounded-sm
              transition-all duration-150
              focus:outline-none focus:ring-1 focus:ring-purple-500
              ${tile.owner 
                ? 'cursor-default' 
                : 'cursor-pointer hover:scale-125 hover:z-10 hover:shadow-lg border border-gray-500 bg-gray-800'
              }
            `}
            style={{
              backgroundColor: tile.owner ? tile.color || '#374151' : '#374151',
              aspectRatio: '1/1',
            }}
            title={tile.owner ? `Claimed by ${tile.owner}` : 'Click to claim'}
            disabled={!!tile.owner}
          >
            {tile.owner && (
              <span className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                {tile.owner.charAt(0).toUpperCase()}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
