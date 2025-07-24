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
      <h2 className="text-xl font-bold mb-2 text-white">Transport Controls</h2> {/* Added text-white for clarity */}

      <div className="flex flex-col md:flex-row justify-center items-center w-full px-4 gap-4 md:gap-8"> {/* Changed justify-between to justify-center and increased md:gap */}
        <BpmControl bpm={bpm} onChange={onChangeBpm} />
        <ToolSelector />
        <PlayButton isPlaying={isPlaying} onToggle={onTogglePlay} /> {/* Moved PlayButton to the center */}
      </div>
    </div>
  );
};