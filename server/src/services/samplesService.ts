import { getInstrumentsWithBeats, saveBeatToDB ,getBeatsByUserIdFromDB} from '../db/beatsRepository';
import { verifyToken } from '../utils/jwt';
import { UnauthorizedError } from '../errors/CustomErrors';

const getAllSamples = async () => {
  const instrumentsWithBeats = await getInstrumentsWithBeats();

  if (!instrumentsWithBeats || instrumentsWithBeats.length === 0) {
    throw new Error('No instruments with beats found');
  }

  return instrumentsWithBeats;
};

const saveBeat = async (token: string, beatData: { grid: boolean[][]; toolTypeId: number; name?: string }) => {
  if (!token) {
    throw new UnauthorizedError('No token provided');
  }

  // מנסה לפענח את הטוקן
  const decoded = verifyToken(token);
  if (!decoded || !decoded.userId) {
    throw new UnauthorizedError('Invalid token');
  }
  const savedBeat = await saveBeatToDB(decoded.userId, beatData);

  return savedBeat;
};
const getUserBeats = async (token: string) => {
  if (!token) {
    throw new UnauthorizedError('No token provided');
  }

  const decoded = verifyToken(token);
  if (!decoded || !decoded.userId) {
    throw new UnauthorizedError('Invalid token');
  }

  const userId = decoded.userId;
  const beats = await getBeatsByUserIdFromDB(userId);

  return beats;
};

export default {
  getAllSamples,
  saveBeat,
  getUserBeats,  // הוספה של הפונקציה החדשה לייצוא
};
