import React from 'react';
import { BeatRow } from './BeatRow';
import { useSamples } from '../../contexts/SamplesContext';

interface GridProps {
  currentStep: number;
  onPlayStep?: (instrument: string) => void;

  externalGrid: boolean[][];
  setExternalGrid: React.Dispatch<React.SetStateAction<boolean[][]>>;
}

export const Grid: React.FC<GridProps> = ({
  currentStep,
  onPlayStep,
  externalGrid,
  setExternalGrid,
}) => {
  const { selectedTool } = useSamples();
  const steps = 8;

  const instruments = selectedTool?.beat_files.map((beat) => beat.name) ?? [];

  // אין צורך להשתמש ב-state פנימי grid, כי עכשיו זה externalGrid שנשלח מבחוץ

  // כדי לאתחל את ה-grid כאשר משתנה ה-selectedTool
  React.useEffect(() => {
    if (instruments.length) {
      setExternalGrid(instruments.map(() => Array(steps).fill(false)));
    } else {
      setExternalGrid([]);
    }
  }, [selectedTool, instruments.length, setExternalGrid]);

  React.useEffect(() => {
    if (onPlayStep) {
      instruments.forEach((instrument, rowIndex) => {
        if (externalGrid[rowIndex] && externalGrid[rowIndex][currentStep]) {
          onPlayStep(instrument);
        }
      });
    }
  }, [currentStep, externalGrid, instruments, onPlayStep]);

  const toggleCell = (rowIndex: number, cellIndex: number) => {
    setExternalGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);
      newGrid[rowIndex][cellIndex] = !newGrid[rowIndex][cellIndex];
      return newGrid;
    });
  };

  const handlePlayInstrumentBeat = (instrumentName: string) => {
    if (onPlayStep) {
      onPlayStep(instrumentName);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl mx-auto overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-4 md:mb-6">
        Music Sampler
      </h2>
      <div className="overflow-x-auto custom-scrollbar pb-4">
        {externalGrid.map((row, rowIndex) => (
          <BeatRow
            key={rowIndex}
            instrumentName={instruments[rowIndex]}
            cells={row}
            currentStep={currentStep}
            onToggleCell={(cellIndex) => toggleCell(rowIndex, cellIndex)}
            onPlayInstrumentBeat={handlePlayInstrumentBeat}
          />
        ))}
      </div>
    </div>
  );
};
