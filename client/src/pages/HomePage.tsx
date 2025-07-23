import React, { useState, useEffect, useRef } from 'react';
import { Grid } from '../components/Grid/Grid';
import { TransportControls } from '../components/Transport/TransportControls';
import { loadSounds, playSound } from '../services/soundService';

export const HomePage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [bpm, setBpm] = useState(120); // ברירת מחדל ל-BPM
  const steps = 8;
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    loadSounds(); // נטען את הסאונדים בעת טעינת העמוד
  }, []);

  const togglePlay = () => setIsPlaying(!isPlaying);

  useEffect(() => {
    if (isPlaying) {
      // מחשב את משך הזמן בין צעדים לפי BPM (BPM = פעימות לדקה)
      // משך צעד במילישניות = 60000 (ms בדקה) / BPM / 2 (כי 8 צעדים הם 2 פעימות)
      const interval = 60000 / bpm / 2;
      intervalRef.current = window.setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps);
      }, interval);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setCurrentStep(0);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, bpm]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white p-4">
      <Grid currentStep={currentStep} onPlayStep={playSound} />
      <TransportControls
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        bpm={bpm}
        onChangeBpm={setBpm}
      />
    </div>
  );
};
