export interface LoginUser {
    emailOrUsername: string;
    password: string;
}

export interface SignupUser {
    fullName: string;
    username: string;
    email: string;
    password: string;
    language: string;
    gender: string;
    profilePhoto: string;
    dateOfBirth: string;
}


export interface UserFromBE {
    id: string;
    username: string;
    profilePhoto: string | null;
  }


export interface UserFromDB {
    id: string;
    fullName: string;
    firstLogin: string;
    lastLogin: string;
    username: string;
    email: string;
    language: string;
    gender: string;
    profilePhoto: string;
    dateOfBirth: string;
}
export interface UpdateUserProfile {
    username: string;
    fullName: string;
    email: string;
    language: string;
    gender: string;
    dateOfBirth: string;  // תאריך הלידה בפורמט YYYY-MM-DD
    profilePhoto: string;
    id: string;
}










export interface UserForNotLoggedUsers {
    id: string;
    username: string;
    profilePhoto: string;
    followers: number; // מספר עוקבים
    following: number; // מספר עוקבים אחרי
  }
  
  export interface UserForLoggedUsers extends UserForNotLoggedUsers {
    isFollow: boolean;
  }
  
  export interface UserForSameUser extends UserForNotLoggedUsers {
    firstLogin: Date | null;
    fullName: string | null;
    email: string;
    language: string | null;
    gender: 'Male' | 'Female' | 'Other' | null; // בהתבסס על ערכים אפשריים
    dateOfBirth: Date | null;
    lastLogin: Date | null;
    role: 'Admin' | 'User' | 'Helper'; // בהתבסס על רול אפשרי
  }