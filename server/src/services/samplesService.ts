import { getInstrumentsWithBeats } from '../db/beatsRepository';

const getAllSamples = async () => {
  const instrumentsWithBeats = await getInstrumentsWithBeats();

  if (!instrumentsWithBeats || instrumentsWithBeats.length === 0) {
    throw new Error('No instruments with beats found');
  }

  return instrumentsWithBeats;
};

export default {
  getAllSamples,
};
