import { fetchRequest } from '../apiClient'; 
import type { LoginUser, SignupUser } from '../../types/user.d'; 

// ממשק (interface) עבור התשובה הצפויה מנקודת קצה של בדיקת סטטוס אימות
interface AuthStatusResponse {
  isAuthenticated: boolean;
  userId: string | null; 
  username: string | null;
  
}

export const registerUser = async (userData: SignupUser) => {
  const url = 'api/users/signup';
  const method = 'POST';
  return await fetchRequest(url, method, userData);
};

export const loginUser = async (credentials: LoginUser) => {
  const url = 'api/users/login';
  const method = 'POST';
  return await fetchRequest(url, method, credentials);
};

export const checkAuthStatus = async (): Promise<AuthStatusResponse> => {
  const url = 'api/users/status';
  const method = 'GET';
  return await fetchRequest(url, method);
};