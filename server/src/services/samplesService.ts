import { getInstrumentsWithBeats } from '../db/beatsRepository';

const getAllSamples = async () => {
  const instrumentsWithBeats = await getInstrumentsWithBeats();

  // נוודא שקיבלנו נתונים לפני שמנסים למפות
  if (!instrumentsWithBeats) return [];

  // כל כלי (instrument) הוא בעצם tool_type עם רשימת beat_files
  const samples = instrumentsWithBeats.flatMap(toolType =>
    (toolType.beat_files ?? []).map(beatFile => ({
      id: beatFile.id,
      label: beatFile.name,
      category: toolType.name, // שם סוג הכלי
      url: beatFile.file_url,
    }))
  );

  return samples;
};

export default {
  getAllSamples,
};
