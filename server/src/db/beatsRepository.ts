import { supabase } from '../db/supabaseClient';

const SUPABASE_STORAGE_BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;

export async function getInstrumentsWithBeats() {
  console.log('Fetching instruments with beats from Supabase');

  const { data, error } = await supabase
    .from('tool_types')
    .select(`
      id,
      name,
      beat_files (
        id,
        name,
        file_path
      )
    `);

  if (error) {
    throw error;
  }

  // המרת הנתיב לקישור מלא
  const updatedData = data.map(instrument => ({
    ...instrument,
    beat_files: instrument.beat_files.map(beat => ({
      ...beat,
      file_url: `${SUPABASE_STORAGE_BASE_URL}${beat.file_path}`
    }))
  }));

  return updatedData;
}
