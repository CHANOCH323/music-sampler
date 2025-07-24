import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllSamples } from "../api/requests/samplesApi";
import type { ToolType } from "../types/samplesTypes";

type SamplesContextType = {
  tools: ToolType[];
  selectedTool: ToolType | null;
  setSelectedTool: (tool: ToolType) => void;
};

const SamplesContext = createContext<SamplesContextType | null>(null);

export const SamplesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tools, setTools] = useState<ToolType[]>([]);
  const [selectedTool, setSelectedTool] = useState<ToolType | null>(null);

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        console.log("SamplesProvider mounted");
        const fetchedTools = await getAllSamples();
        setTools(fetchedTools);
        setSelectedTool(fetchedTools[0] ?? null);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSamples();
  }, []);

  return (
    <SamplesContext.Provider value={{ tools, selectedTool, setSelectedTool }}>
      {children}
    </SamplesContext.Provider>
  );
};

export const useSamples = () => {
  const context = useContext(SamplesContext);
  if (!context) throw new Error("useSamples must be used within a SamplesProvider");
  return context;
};
