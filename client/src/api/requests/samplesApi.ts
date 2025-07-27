// src/api/samplesApi.ts
import { fetchRequest } from '../apiClient';

export const getAllSamples = () => {
  console.log('Fetching all samples');
  return fetchRequest('api/samples/getAllSamples', 'GET');
};

export const getUserBeats = (username: string) => {
  console.log('Fetching samples for user:', username);
  return fetchRequest(`api/samples/user/${username}`, 'GET');
};
export const saveUserBeat = async (beatData: { grid: boolean[][]; name?: string }) => {
  console.log('Saving user beat', beatData);
  return fetchRequest('api/beats', 'POST', beatData);
};
