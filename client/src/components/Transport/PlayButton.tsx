import React from 'react';

interface PlayButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const PlayButton: React.FC<PlayButtonProps> = ({ isPlaying, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`w-16 h-16 flex items-center justify-center rounded-full text-white 
        transition-colors duration-200 shadow-lg
        ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}
      `}
    >
      {isPlaying ? (
        // אייקון "Stop"
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <rect x="6" y="6" width="12" height="12" />
        </svg>
      ) : (
        // אייקון "Play"
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
};
