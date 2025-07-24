export interface BeatFile {
  id: number;
  name: string;
  file_url: string;
  tool_type_id: number ; 
}

export interface ToolType {
  id: number;
  name: string;
  beat_files: BeatFile[];
}
// samplesTypes.ts


