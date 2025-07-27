import React from "react";
import { PlayButton } from "./PlayButton";
import { BpmControl } from "./BpmControl";
import { ToolSelector } from "./ToolSelector";
import { SaveBeatButton } from "./SaveBeatButton";
import { UserBeatsList } from "./UserBeatsList";

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
          <div className="flex flex-col gap-2 items-center">
            <SaveBeatButton onClick={onSaveBeat} />

            {savedBeats.length > 0 && (
              <div className="flex flex-col max-h-40 overflow-y-auto bg-gray-700 rounded-md p-2 w-48">
                <span className="text-white mb-2 font-semibold">Saved Beats:</span>
                <UserBeatsList
                  beats={savedBeats.map((beat) => beat.id)}
                  onSelect={onSelectBeat}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
