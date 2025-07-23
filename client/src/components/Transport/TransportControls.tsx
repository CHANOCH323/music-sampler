import React from 'react';
import { PlayButton } from './PlayButton';

interface TransportControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const TransportControls: React.FC<TransportControlsProps> = ({ isPlaying, onTogglePlay }) => {
  return (
    <div className="flex flex-col gap-4 items-center bg-gray-800 p-4 rounded-md shadow-md mt-6">
      <h2 className="text-xl font-bold">Transport Controls</h2>
      <PlayButton isPlaying={isPlaying} onToggle={onTogglePlay} />
    </div>
  );
};
