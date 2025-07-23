import React from 'react';

interface PlayButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const PlayButton: React.FC<PlayButtonProps> = ({ isPlaying, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`px-6 py-2 rounded text-white text-lg transition-colors duration-200
        ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}
      `}
    >
      {isPlaying ? 'Stop' : 'Play'}
    </button>
  );
};
