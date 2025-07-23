import React, { useState, useEffect, useRef } from 'react';
import { Grid } from '../components/Grid/Grid';
import { TransportControls } from '../components/Transport/TransportControls';
import { loadSounds, playSound } from '../services/soundService';
import '../index.css';


export const HomePage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const steps = 8;
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    loadSounds(); // נטען את הסאונדים בעת טעינת העמוד
  }, []);

  const togglePlay = () => setIsPlaying(!isPlaying);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps);
      }, 500);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setCurrentStep(0);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white p-4">
      <Grid currentStep={currentStep} onPlayStep={playSound} />
      <TransportControls isPlaying={isPlaying} onTogglePlay={togglePlay} />
    </div>
  );
};
