// import { fetchRequest } from '../apiClient';
// import { LoginUser, SignupUser, UpdateUserProfile } from '../../types/user.d';

// export const registerUser = async (userData: SignupUser) => {
//   const url = '/api/signup';
//   const method = 'POST';
//   return await fetchRequest(url, method, userData);
// };

// export const loginUser = async (credentials: LoginUser) => {
//   const url = '/api/login';
//   const method = 'POST';
//   return await fetchRequest(url, method, credentials);
// };

// export const registerWithGoogle = async (googleToken: string): Promise<string> => {
//   const url = '/api/signup/google';
//   const method = 'POST';
//   const body = { googleToken };
//   return await fetchRequest(url, method, body);
// };

// export const loginWithGoogle = async (googleToken: string): Promise<string> => {
//   const url = '/api/login/google';
//   const method = 'POST';
//   const body = { googleToken };
//   return await fetchRequest(url, method, body);
// };

// export const toggleFollowUserByUserId = async (userId: string): Promise<boolean> => {
//   const url = `/api/users/toggleFollow/${userId}`; // Replace with your API endpoint for following a user by user ID
//   const method = 'POST'; // Use the appropriate HTTP method (e.g., POST, GET, etc.
//   return await fetchRequest(url, method);
// };

// export const checkUserName = async (userName: string): Promise<{ available: boolean; suggestions?: string[] }> => {
//   const url = '/api/users/checkUserName';
//   const method = 'POST';
//   return await fetchRequest(url, method, {userName});
// };


// export const isFollowingByUserId = async (userId: string): Promise<boolean> => {
//   const url = `/api/users/isFollowing/${userId}`; // Replace with your API endpoint for checking if a user is following another user by user ID
//   const method = 'POST'; // Use the appropriate HTTP method (e.g., POST, GET, etc.
//   return await fetchRequest(url, method);
// };


// export const updateUser = async (userData: UpdateUserProfile) => {
//   console.log(userData);
  
//   const url = '/api/users/updateUser';
//   const method = 'POST';
//   return await fetchRequest(url, method, {userData});
// };

// // Check if the token is valid.
// export const checkToken = async (): Promise<boolean> => {
//   const url = '/api/checkToken';
//   return await fetchRequest(url);
// };

// // logout
// export const logout = async (): Promise<boolean> => {
//   const url = '/api/logout';
//   return await fetchRequest(url);
// };





















// // Ori's functions
// export async function getUserByUserIdFromBE(userIdTarget: string) {
//   const url = `/api/users/getUserByUserId`;
//   const method = 'POST';
//   const params = { userIdTarget };
//   return await fetchRequest(url, method, params);
// }