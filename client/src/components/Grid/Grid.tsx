import React, { useState, useEffect } from 'react';
import { BeatRow } from './BeatRow';
import { useSamples } from '../../contexts/SamplesContext';

interface GridProps {
  currentStep: number;
  onPlayStep?: (instrument: string) => void;
}

export const Grid: React.FC<GridProps> = ({ currentStep, onPlayStep }) => {
  const { selectedTool } = useSamples();
  const steps = 8;

  const instruments = selectedTool?.beat_files.map((beat) => beat.name) ?? [];

  const [grid, setGrid] = useState<boolean[][]>([]);

  useEffect(() => {
    if (instruments.length) {
      setGrid(instruments.map(() => Array(steps).fill(false)));
    }
  }, [selectedTool]);

  useEffect(() => {
    if (onPlayStep) {
      instruments.forEach((instrument, rowIndex) => {
        if (grid[rowIndex]?.[currentStep]) {
          onPlayStep(instrument);
        }
      });
    }
  }, [currentStep]);

  const toggleCell = (rowIndex: number, cellIndex: number) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);
      newGrid[rowIndex][cellIndex] = !newGrid[rowIndex][cellIndex];
      return newGrid;
    });
  };

  return (
    <div className="p-4 md:p-6 bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl overflow-x-auto"> {/* Added overflow-x-auto */}
      <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-4 md:mb-6">
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