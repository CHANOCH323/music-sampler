import React from "react";
import { PlayButton } from "./PlayButton";
import { BpmControl } from "./BpmControl";
import { ToolSelector } from "./ToolSelector";

interface Beat {
  id: string;
  name: string;
  grid: boolean[][];
}

interface TransportControlsProps {
  isPlaying: boolean;
  bpm: number;
  onTogglePlay: () => void;
  onChangeBpm: (value: number) => void;

  isLoggedIn: boolean;
  onSaveBeat: () => void;
  savedBeats: Beat[];
  onSelectBeat: (beatId: string) => void;
}

export const TransportControls: React.FC<TransportControlsProps> = ({
  isPlaying,
  bpm,
  onTogglePlay,
  onChangeBpm,
  isLoggedIn,
  onSaveBeat,
  savedBeats,
  onSelectBeat,
}) => {
  return (
    <div className="flex flex-col gap-4 items-center bg-gray-800 p-4 rounded-md shadow-md mt-6 w-full max-w-4xl">
      <h2 className="text-xl font-bold mb-2 text-white">Transport Controls</h2>

      <div className="flex flex-col md:flex-row justify-center items-center w-full px-4 gap-4 md:gap-8">
        <BpmControl bpm={bpm} onChange={onChangeBpm} />
        <ToolSelector />
        <PlayButton isPlaying={isPlaying} onToggle={onTogglePlay} />

        {isLoggedIn && (
          <>
            <button
              onClick={onSaveBeat}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              aria-label="Save current beat"
            >
              Save Beat
            </button>

            {savedBeats.length > 0 && (
              <div className="flex flex-col max-h-40 overflow-y-auto bg-gray-700 rounded-md p-2 w-48">
                <span className="text-white mb-2 font-semibold">Saved Beats:</span>
                {savedBeats.map((beat) => (
                  <button
                    key={beat.id}
                    onClick={() => onSelectBeat(beat.id)}
                    className="text-white text-left hover:bg-blue-500 rounded px-2 py-1"
                  >
                    {beat.name}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
