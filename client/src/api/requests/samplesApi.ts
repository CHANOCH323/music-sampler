// src/api/samplesApi.ts
import { fetchRequest } from '../apiClient';

export const getAllSamples = () => {
    console.log('Fetching all samples');
  return fetchRequest('api/samples', 'GET');
};
