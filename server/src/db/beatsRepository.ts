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

export async function saveBeatToDB(userId: string, beatData: {
  grid: boolean[][],
  name?: string,
  toolTypeId: number
}) {
  const gridJson = JSON.stringify(beatData.grid);

  const { data, error } = await supabase
    .from('beats')
    .insert([
      {
        user_id: userId,
        name: beatData.name || 'Untitled Beat',
        grid: gridJson,
        tool_type_id: beatData.toolTypeId,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getBeatsByUserIdFromDB(userId: string) {
  const { data, error } = await supabase
    .from('beats')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }
  console.log('Fetched user beats:', data);
  return data;
}

