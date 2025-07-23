import React, { useState, useEffect } from 'react';
import { BeatRow } from './BeatRow';

interface GridProps {
  currentStep: number;
  onPlayStep?: (instrument: string) => void; // אופציונלי: השמעת סאונד
}

export const Grid: React.FC<GridProps> = ({ currentStep, onPlayStep }) => {
  const steps = 8;
  const instruments = ['Kick', 'Snare', 'HiHat', 'Tom', 'Crash', 'Clap'];

  // grid[rowIndex][stepIndex] = true/false
  const [grid, setGrid] = useState<boolean[][]>(
    instruments.map(() => Array(steps).fill(false))
  );

  // הפעלת סאונדים כש-step מתחלף
  useEffect(() => {
    if (onPlayStep) {
      instruments.forEach((instrument, rowIndex) => {
        if (grid[rowIndex][currentStep]) {
          onPlayStep(instrument);
        }
      });
    }
  }, [currentStep]);

  // שינוי מצב תא בגריד
  const toggleCell = (rowIndex: number, cellIndex: number) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);
      newGrid[rowIndex][cellIndex] = !newGrid[rowIndex][cellIndex];
      return newGrid;
    });
  };

  return (
    <div className="p-6 bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl">
      {/* כותרת מעל הגריד */}
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Music Sampler
      </h2>

      {grid.map((row, rowIndex) => (
        <BeatRow
          key={rowIndex}
          instrumentName={instruments[rowIndex]}
          cells={row}
          currentStep={currentStep}
          onToggleCell={(cellIndex) => toggleCell(rowIndex, cellIndex)}
        />
      ))}
    </div>
  );
};
