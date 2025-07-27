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
  const { isLoggedIn, username, userId } = useAuth();

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
      const initialGrid = instruments.map(() => Array(steps).fill(false));
      setGrid(initialGrid);
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
    if (isLoggedIn && username) {
      fetchSavedBeats();
    }
  }, [isLoggedIn, username, userId]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const saveBeat = async (name: string) => {
    if (!selectedTool) {
      alert("לא נבחר כלי");
      return;
    }
    try {
      await saveUserBeat({
        grid,
        name: name,
        toolTypeId: selectedTool.id,
      });
      alert("Beat saved!");
      fetchSavedBeats();
    } catch (err) {
      console.error("Error saving beat:", err);
      alert("Error saving beat");
    }
  };

  const fetchSavedBeats = async () => {
    try {
      if (!userId) {
        return;
      }
      const data = await getUserBeats(userId);

      const parsedData = data.map((beat: Beat) => {
        const parsedGrid = typeof beat.grid === "string" ? JSON.parse(beat.grid) : beat.grid;
        return {
          ...beat,
          grid: parsedGrid,
        };
      });
      setSavedBeats(parsedData);
    } catch (err) {
      console.error("Error fetching saved beats:", err);
    }
  };

  const loadBeatToGrid = (beatId: string) => {
    const beat = savedBeats.find((b) => b.id === beatId);

    if (beat && beat.grid) {
      if (typeof beat.grid === "string") {
        setGrid(JSON.parse(beat.grid));
      } else {
        setGrid(beat.grid);
      }
    }
  };

  return (
  <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white p-2 md:p-4">
    <div className="self-start ml-4 mb-4">
      <UserStatus />
    </div>

    <Grid
      currentStep={currentStep}
      onPlayStep={playSound}
      externalGrid={grid}
      setExternalGrid={setGrid}
    />

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