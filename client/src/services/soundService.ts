const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const soundFiles = {
  Kick: `${API_URL}/sounds/drums/kick.wav`,
  Snare: `${API_URL}/sounds/drums/snare.wav`,
  HiHat: `${API_URL}/sounds/drums/hihat.wav`,
};

const audioBuffers: Record<string, HTMLAudioElement> = {};

// טעינת הסאונדים מראש
export const loadSounds = () => {
  for (const [instrument, path] of Object.entries(soundFiles)) {
    const audio = new Audio(path);
    audioBuffers[instrument] = audio;
  }
};

// ניגון סאונד לפי שם הכלי
export const playSound = (instrument: string) => {
  const audio = audioBuffers[instrument];
  if (audio) {
    audio.currentTime = 0; // להתחיל את הסאונד מהתחלה
    audio.play();
  }
};
