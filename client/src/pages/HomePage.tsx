import React, { useState, useEffect, useRef } from "react";
import { Grid } from "../components/Grid/Grid";
import { TransportControls } from "../components/Transport/TransportControls";
import { UserStatus } from "../components/users/UserStatus";
import { loadSounds, playSound } from "../services/soundService";
import { useSamples } from "../contexts/SamplesContext";
import { useAuth } from "../contexts/AuthContext";
import { getUserBeats, saveUserBeat } from "../api/requests/samplesApi";

interface Beat {
  id: string;
  name: string;
  grid: boolean[][];
}

export const HomePage: React.FC = () => {
  const { selectedTool } = useSamples();
  const { isLoggedIn, username  } = useAuth(); // נניח ש־user מכיל את מזהה המשתמש

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [bpm, setBpm] = useState<number>(120);
  const steps: number = 8;
  const intervalRef = useRef<number | null>(null);

  const [grid, setGrid] = useState<boolean[][]>([]);
  const [savedBeats, setSavedBeats] = useState<Beat[]>([]);

  useEffect(() => {
    if (selectedTool) {
      loadSounds(selectedTool);
      const instruments = selectedTool.beat_files.map((b: any) => b.name);
      setGrid(instruments.map(() => Array(steps).fill(false)));
    }
  }, [selectedTool]);

  useEffect(() => {
    let interval: number | null = null;
    if (isPlaying) {
      const intervalTime: number = 60000 / bpm / 2;
      interval = window.setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps);
      }, intervalTime);
      intervalRef.current = interval;
    } else {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
      setCurrentStep(0);
    }
    return () => {
      if (interval !== null) {
        window.clearInterval(interval);
      }
    };
  }, [isPlaying, bpm, steps]);

  useEffect(() => {
    if (isLoggedIn && username ) {
      fetchSavedBeats();
    }
  }, [isLoggedIn, username ]);

  const togglePlay = () => setIsPlaying((prev) => !prev);

  const saveBeat = async () => {
    try {
      await saveUserBeat({ grid, name: "My Beat Name" }); // אפשר להוסיף שם לפי הצורך
      alert("Beat saved!");
      fetchSavedBeats(); // טען שוב אחרי שמירה
    } catch (err) {
      console.error(err);
      alert("Error saving beat");
    }
  };

  const fetchSavedBeats = async () => {
    try {
      if (!username ) return;
      const data = await getUserBeats(username );
      setSavedBeats(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadBeatToGrid = (beatId: string) => {
    const beat = savedBeats.find((b) => b.id === beatId);
    if (beat && beat.grid) {
      setGrid(beat.grid);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white p-2 md:p-4">
      <UserStatus />

      <Grid currentStep={currentStep} onPlayStep={playSound} externalGrid={grid} setExternalGrid={setGrid} />

      <TransportControls
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        bpm={bpm}
        onChangeBpm={setBpm}
        isLoggedIn={isLoggedIn}
        onSaveBeat={saveBeat}
        savedBeats={savedBeats}
        onSelectBeat={loadBeatToGrid}
      />
    </div>
  );
};
