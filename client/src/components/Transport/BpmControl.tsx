import React from 'react';

interface BpmControlProps {
  bpm: number;
  onChange: (value: number) => void;
}

export const BpmControl: React.FC<BpmControlProps> = ({ bpm, onChange }) => {
  return (
    <div className="flex flex-col items-center text-white">
      <label className="mb-2 font-semibold">BPM</label>
      <input
        type="range"
        min={60}
        max={180}
        value={bpm}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-32 accent-green-500"
      />
      <span className="mt-1 text-sm">{bpm} BPM</span>
    </div>
  );
};
