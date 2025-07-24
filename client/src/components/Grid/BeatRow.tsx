import React from 'react';
import { BeatCell } from './BeatCell';

interface BeatRowProps {
  instrumentName: string;
  cells: boolean[];
  currentStep: number;
  onToggleCell: (index: number) => void;
  onPlayInstrumentBeat?: (instrumentName: string) => void;
}

export const BeatRow: React.FC<BeatRowProps> = ({
  instrumentName,
  cells,
  currentStep,
  onToggleCell,
  onPlayInstrumentBeat,
}) => {
  return (
    <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4"> {/* Changed items-start to items-center for vertical alignment */}
      {/* Ensure instrument name doesn't shrink and has a defined width */}
      <span className="w-20 md:w-24 text-base md:text-lg font-semibold flex-shrink-0 text-white truncate">
        {instrumentName}
      </span>
      {/* Use flex-1 to allow the beat cells container to take available space
          and ensure horizontal scrolling is self-contained. */}
      <div className="flex flex-1 gap-1 md:gap-2 overflow-x-auto pb-2 custom-scrollbar"> {/* Added flex-1 */}
        {cells.map((isActive, index) => (
          <BeatCell
            key={index}
            isActive={isActive}
            isCurrentStep={currentStep === index}
            onToggle={() => onToggleCell(index)}
            onPlayBeat={() => onPlayInstrumentBeat?.(instrumentName)}
          />
        ))}
      </div>
    </div>
  );
};