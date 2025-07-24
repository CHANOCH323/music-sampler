import React from 'react';

interface BeatCellProps {
  isActive: boolean;
  isCurrentStep: boolean;
  onToggle: () => void;
  // New prop: Function to call when the beat cell is clicked,
  // allowing an optional action like playing a sound.
  onPlayBeat?: () => void;
}

export const BeatCell: React.FC<BeatCellProps> = ({ isActive, isCurrentStep, onToggle, onPlayBeat }) => {
  const handleClick = () => {
    onToggle(); // Toggle the cell's active state
    if (onPlayBeat) {
      onPlayBeat(); // Play the beat if the prop is provided
    }
  };

  return (
    <button
      onClick={handleClick} // Use the new handleClick function
      className={`
        w-10 h-10 md:w-16 md:h-16 rounded-md transition-colors duration-200
        ${isActive ? 'bg-green-500' : 'bg-gray-400'}
        ${isCurrentStep ? 'ring-2 md:ring-4 ring-blue-400' : 'ring-1 md:ring-2 ring-gray-500'}
        hover:brightness-110
        focus:outline-none focus:ring-opacity-75 // Add focus styles for accessibility
      `}
      aria-pressed={isActive} // Improve accessibility
      aria-label={`Toggle beat ${isActive ? 'on' : 'off'}`} // More descriptive label
    />
  );
};