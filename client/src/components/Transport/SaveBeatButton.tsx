import React, { useState } from "react";

interface SaveBeatButtonProps {
  onSave: (beatName: string) => void;
}

export const SaveBeatButton: React.FC<SaveBeatButtonProps> = ({ onSave }) => {
  const [beatName, setBeatName] = useState("");
  const [error, setError] = useState(false);

  const handleClick = () => {
    if (!beatName.trim()) {
      setError(true);
      return;
    }

    setError(false);
    onSave(beatName);
    setBeatName("");
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleClick}
        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-2xl shadow-md text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 6.75v-1.5A2.25 2.25 0 0015 3H6.75A2.25 2.25 0 004.5 5.25v13.5A2.25 2.25 0 006.75 21h10.5a2.25 2.25 0 002.25-2.25V9l-2.25-2.25z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 3v4.125c0 .621-.504 1.125-1.125 1.125H9.75A1.125 1.125 0 018.625 7.125V3"
          />
        </svg>
        Save
      </button>

      <input
        type="text"
        value={beatName}
        onChange={(e) => {
          setBeatName(e.target.value);
          setError(false);
        }}
        placeholder={error ? "Please enter a name!" : "Enter beat name"}
        className={`border px-3 py-1 rounded-xl text-sm w-40 
          ${error ? "border-red-500 placeholder-red-500" : "border-gray-300"}
          bg-gray-700 text-white`}
      />
    </div>
  );
};
