import axios from 'axios';
import type { AxiosRequestConfig, Method } from 'axios';




const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';




export const fetchRequest = async (
  url: string, 
  method: string = 'GET', 
  body: object | string | null = null, 
  headers: Record<string, string> = {}, 
  isFormData: boolean = false
) => {
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  const config: AxiosRequestConfig = {
    method: method as Method,
    url: fullUrl,
    data: body || {}, // במקרה של null, שלח אובייקט ריק
    headers: isFormData 
      ? {} 
      : { 'Content-Type': 'application/json', ...headers },
    withCredentials: true,  // אם יש צורך בקוקיז
  };

  try {
    const response = await axios(config);
    console.log(`Response status: ${response.status}`);

    return response.data;
  } catch (error: unknown) {
    console.error('Request failed',  error);
    throw new Error('Request failed');
  }
};
