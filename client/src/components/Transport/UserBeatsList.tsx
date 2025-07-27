import React from "react";

interface UserBeatsListProps {
  beats: string[];
  onSelect: (beatId: string) => void;
}

export const UserBeatsList: React.FC<UserBeatsListProps> = ({ beats, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {beats.map((beatId) => (
        <button
          key={beatId}
          onClick={() => onSelect(beatId)}
          className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-xl px-3 py-1 text-xs"
        >
          {beatId}
        </button>
      ))}
    </div>
  );
};
