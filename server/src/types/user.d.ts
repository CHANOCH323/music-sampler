

export interface LoginUser {
  emailOrUsername: string;
  password: string;
}

export interface SignupUser {
  fullName: string;
  email: string;
  password: string;
  language: string;
  gender: string;
  profilePhoto: string;
  dateOfBirth: string;
  username: string;
}

export interface NewUserForDB extends SignupUser {
}

export interface UserFromDB {
  id: string;
  fullName: string;
  role: 'Admin' | 'Helper' | 'User';
  firstLogin: string;
  lastLogin: string;
  username: string;
  email: string;
  password?: string
  language: string;
  gender: string;
  profilePhoto: string;
  dateOfBirth: string;
}

export interface UpdateUserProfile {
  fullName: string;
  username: string;
  email: string;
  language: string;
  gender: string;
  dateOfBirth: string;  
  profilePhoto: string;
  role: string;
  id: string;
}



