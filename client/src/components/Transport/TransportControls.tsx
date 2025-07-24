import React from "react";
import { PlayButton } from "./PlayButton";
import { BpmControl } from "./BpmControl";
import { ToolSelector } from "./ToolSelector"; 

interface TransportControlsProps {
  isPlaying: boolean;
  bpm: number;
  onTogglePlay: () => void;
  onChangeBpm: (value: number) => void;
}

export const TransportControls: React.FC<TransportControlsProps> = ({
  isPlaying,
  bpm,
  onTogglePlay,
  onChangeBpm,
}) => {
  return (
    <div className="flex flex-col gap-4 items-center bg-gray-800 p-4 rounded-md shadow-md mt-6 w-full max-w-4xl">
      <h2 className="text-xl font-bold mb-2">Transport Controls</h2>


      <div className="flex justify-between items-center w-full px-4">
        <BpmControl bpm={bpm} onChange={onChangeBpm} />
        <ToolSelector />
        <PlayButton isPlaying={isPlaying} onToggle={onTogglePlay} />
      </div>
    </div>
  );
};
