import { supabase } from '../db/supabaseClient';

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
      file_url
    )
  `);


  if (error) {
  //console.error('Supabase error:', error);
  throw error;
}
//console.log('Fetched data:', data);
  return data;
}
