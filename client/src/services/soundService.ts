import type { ToolType } from '../types/samplesTypes';

// שימוש ב-Map במקום Record עבור גמישות וביצועים טובים יותר לטווח ארוך
const audioBuffers: Map<string, HTMLAudioElement> = new Map();

export const loadSounds = (tool: ToolType) => {
  // נקה את הבאפרים הקיימים לפני טעינה חדשה כדי למנוע כפילויות
  audioBuffers.clear();
  for (const beat of tool.beat_files) {
    // ודא שאתה יוצר מופע חדש של Audio לכל צליל
    const audio = new Audio(beat.file_url);
    audioBuffers.set(beat.name, audio);
  }
};

export const playSound = (instrument: string) => {
  const audio = audioBuffers.get(instrument); // שימוש ב-get עבור Map
  if (audio) {
    // חשוב: עצור את הנגינה הנוכחית לפני הפעלה מחדש
    // זה מבטיח שאם נלחץ שוב מהר על אותו ביט, הוא לא ימשיך לנגן את הפעם הקודמת
    audio.pause();
    audio.currentTime = 0; // אחזר לנקודת ההתחלה
    audio.play().catch(error => console.error("Error playing audio:", error)); // הוספת טיפול בשגיאות
  }
};