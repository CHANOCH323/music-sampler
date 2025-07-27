import React from "react";

interface UserBeatsListProps {
  beats: { id: string; name: string }[];
  onSelect: (beatId: string) => void;
}

export const UserBeatsList: React.FC<UserBeatsListProps> = ({ beats, onSelect }) => {
  return (
    <ul className="max-h-48 overflow-auto bg-gray-700 rounded-md p-2 space-y-1 w-full max-w-md mx-auto">
      {beats.map((beat) => (
        <li
          key={beat.id}
          onClick={() => onSelect(beat.id)}
          className="cursor-pointer px-3 py-1 rounded hover:bg-gray-600 text-white"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onSelect(beat.id);
            }
          }}
        >
          {beat.name}
        </li>
      ))}
    </ul>
  );
};
