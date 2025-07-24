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
    } else {
      setGrid([]);
    }
  }, [selectedTool, instruments.length]);

  // useEffect זה מפעיל צלילים כאשר ה-currentStep מתקדם (קצב אוטומטי של הסקוונסר).
  useEffect(() => {
    if (onPlayStep) {
      instruments.forEach((instrument, rowIndex) => {
        if (grid[rowIndex] && grid[rowIndex][currentStep]) {
          onPlayStep(instrument); // מפעיל את הצליל אם התא פעיל בשלב הנוכחי
        }
      });
    }
  }, [currentStep, grid, instruments, onPlayStep]);

  // פונקציה זו אחראית אך ורק על שינוי מצב התא (פעיל/לא פעיל) ברשת.
  // היא לא מפעילה צלילים בעצמה.
  const toggleCell = (rowIndex: number, cellIndex: number) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);
      newGrid[rowIndex][cellIndex] = !newGrid[rowIndex][cellIndex];
      return newGrid;
    });
  };

  // פונקציה זו מופעלת כאשר לוחצים על תא בודד, והיא אחראית על הפעלת הצליל של אותו כלי ספציפי.
  const handlePlayInstrumentBeat = (instrumentName: string) => {
    if (onPlayStep) {
      onPlayStep(instrumentName); // מפעיל *רק* את הכלי הספציפי שנלחץ
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl mx-auto overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-4 md:mb-6">
        Music Sampler
      </h2>
      <div className="overflow-x-auto custom-scrollbar pb-4">
        {grid.map((row, rowIndex) => (
          <BeatRow
            key={rowIndex}
            instrumentName={instruments[rowIndex]}
            cells={row}
            currentStep={currentStep}
            onToggleCell={(cellIndex) => toggleCell(rowIndex, cellIndex)}
            onPlayInstrumentBeat={handlePlayInstrumentBeat} // העברת ה-handler לטיפול בלחיצה
          />
        ))}
      </div>
    </div>
  );
};