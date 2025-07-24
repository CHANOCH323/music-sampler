import React from 'react';

interface BeatCellProps {
  isActive: boolean;
  isCurrentStep: boolean;
  onToggle: () => void;
}

export const BeatCell: React.FC<BeatCellProps> = ({ isActive, isCurrentStep, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`
        w-10 h-10 md:w-16 md:h-16 rounded-md transition-colors duration-200
        ${isActive ? 'bg-green-500' : 'bg-gray-400'}
        ${isCurrentStep ? 'ring-2 md:ring-4 ring-blue-400' : 'ring-1 md:ring-2 ring-gray-500'}
        hover:brightness-110
      `}
    />
  );
};