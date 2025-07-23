import React from 'react';
import { BeatCell } from './BeatCell';

interface BeatRowProps {
  instrumentName: string;
  cells: boolean[];
  currentStep: number;
  onToggleCell: (index: number) => void;
}

export const BeatRow: React.FC<BeatRowProps> = ({ instrumentName, cells, currentStep, onToggleCell }) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <span className="w-24 text-lg font-semibold">{instrumentName}</span>
      <div className="flex gap-2">
        {cells.map((isActive, index) => (
          <BeatCell
            key={index}
            isActive={isActive}
            isCurrentStep={currentStep === index}
            onToggle={() => onToggleCell(index)}
          />
        ))}
      </div>
    </div>
  );
};
