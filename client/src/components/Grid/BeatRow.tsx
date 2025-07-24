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
    // Changed to items-start for better alignment if instrumentName wraps
    <div className="flex items-start gap-2 md:gap-4 mb-2 md:mb-4">
      {/* Reduced width and font size for instrument name on mobile */}
      <span className="w-20 md:w-24 text-base md:text-lg font-semibold flex-shrink-0">
        {instrumentName}
      </span>
      {/* Ensures the cells stay in a single row and allow for scrolling */}
      <div className="flex gap-1 md:gap-2 flex-nowrap">
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