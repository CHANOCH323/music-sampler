// src/api/samplesApi.ts
import { fetchRequest } from '../apiClient';

export const getAllSamples = () => {
  console.log('Fetching all samples');
  return fetchRequest('api/samples/getAllSamples', 'GET');
};

export const getUserBeats = (userId: string) => {
  console.log('Fetching samples for user:', userId);
  return fetchRequest(`api/samples/user/${userId}`, 'GET');
};
export const saveUserBeat = async (beatData: { grid: boolean[][]; name?: string ;toolTypeId: number;}) => {
  console.log('Saving user beat', beatData);
  return fetchRequest('api/samples/saveUserBeat', 'POST', beatData);
};
