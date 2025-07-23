export const soundFiles = {
  Kick: '/sounds/kick.wav',
  Snare: '/sounds/snare.wav',
  HiHat: '/sounds/hihat.wav',
};

const audioBuffers: Record<string, HTMLAudioElement> = {};

export const loadSounds = () => {
  for (const [instrument, path] of Object.entries(soundFiles)) {
    const audio = new Audio(path);
    audioBuffers[instrument] = audio;
  }
};

export const playSound = (instrument: string) => {
  const audio = audioBuffers[instrument];
  if (audio) {
    audio.currentTime = 0; // להתחיל מהתחלה
    audio.play();
  }
};
