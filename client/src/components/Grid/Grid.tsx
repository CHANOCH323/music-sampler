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

  // מיון הסאונדים לפי סדר אלפביתי
  const instruments = React.useMemo(() => {
    return selectedTool?.beat_files
      ?.map((beat) => beat.name)
      .sort((a, b) => a.localeCompare(b)) ?? [];
  }, [selectedTool]);

  // טעינה מחדש של הגריד כאשר משתנה הכלי
  React.useEffect(() => {
    if (instruments.length) {
      setExternalGrid(instruments.map(() => Array(steps).fill(false)));
    } else {
      setExternalGrid([]);
    }
  }, [selectedTool, instruments.length, setExternalGrid]);

  // הפעלת הסאונד בשלב הנוכחי
  React.useEffect(() => {
    if (onPlayStep) {
      instruments.forEach((instrument, rowIndex) => {
        if (externalGrid[rowIndex] && externalGrid[rowIndex][currentStep]) {
          onPlayStep(instrument);
        }
      });
    }
  }, [currentStep, externalGrid, instruments, onPlayStep]);

  // החלפת מצב תא
  const toggleCell = (rowIndex: number, cellIndex: number) => {
    setExternalGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);
      newGrid[rowIndex][cellIndex] = !newGrid[rowIndex][cellIndex];
      return newGrid;
    });
  };

  // הפעלת צליל בלחיצה
  const handlePlayInstrumentBeat = (instrumentName: string) => {
    if (onPlayStep) {
      onPlayStep(instrumentName);
    }
  };

  // אם הסאונדים לא נטענו עדיין – נציג אנימציית טעינה
  if (!instruments.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-400 mb-4"></div>
        <p className="text-lg font-semibold">טוען סאונדים...</p>
      </div>
    );
  }

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
