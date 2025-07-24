import type { ToolType } from '../types/samplesTypes';

const audioBuffers: Record<string, HTMLAudioElement> = {};

export const loadSounds = (tool: ToolType) => {
  for (const beat of tool.beat_files) {
    const audio = new Audio(beat.file_url);
    audioBuffers[beat.name] = audio;
  }
};

export const playSound = (instrument: string) => {
  const audio = audioBuffers[instrument];
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
};
