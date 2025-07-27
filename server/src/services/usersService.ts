import bcrypt from 'bcryptjs';
import { findByEmailOrUsername ,checkIfFieldValueExists,createUserInDB} from '../db/usersRepository';
import { generateToken, verifyToken } from '../utils/jwt';
import { ValidationError ,NotFoundError, UnauthorizedError ,DBError, BadRequestError} from '../errors/CustomErrors';
import { UserFromDB ,LoginUser,SignupUser,AuthStatusResponse} from '../types/user.d';


export async function loginService(userData: LoginUser):
 Promise<{ token: string; user: UserFromDB }> {
    console.log('----------login service----------');

    // Destructure user data
    const { emailOrUsername, password } = userData;
    // Find user by email
    const user = await findByEmailOrUsername(emailOrUsername.trim());
    if (!user || !user.password) {
        throw new NotFoundError('User not found');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password.trim(), user.password);
    if (!isPasswordValid) {
        throw new UnauthorizedError('Invalid password');
    }

    // Remove sensitive data
    delete user.password;
    
    // Handle token
    const token = generateToken(user.id, user.username);
    if (!token) {
        throw new ValidationError('Token is required but missing');
    }
    
    const decoded = verifyToken(token);
        if (!decoded) {
        throw new ValidationError('Invalid token generated');
    }
    console.log('----------END login service----------');
    return {
        token,
        user: user as UserFromDB
    };
}

export async function signupService(userData: SignupUser):
  Promise<{ token: string, newUser: UserFromDB }> {
  console.log('----------signup service----------');

  try {
    // בדיקה אם המשתמש כבר קיים
    const isEmailExists = await checkIfFieldValueExists('email',userData.email);
    if (isEmailExists) {
      throw new BadRequestError('User with this email already exists');
    }

    if (!userData.username  || await checkIfFieldValueExists('username',userData.username)) {
      throw new BadRequestError('User with this username already exists');
    }
    // ניסיון ליצור משתמש במסד הנתונים
    const newUserFromDB = await createUserInDB(userData);
    if (!newUserFromDB) {
      throw new DBError('Failed to create user in the database');
    }

    const token = generateToken(newUserFromDB.id, newUserFromDB.username);
    if (!token) {
      throw new ValidationError('Token is required but missing');
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      throw new ValidationError('Invalid token generated');
    }
    return {
      token,
      newUser: newUserFromDB
    };

  } catch (error) {
    console.error('Signup error:', error); 
    throw new DBError('An unexpected error occurred');
  }
};
export async function authStatusService(token?: string): Promise<AuthStatusResponse> {
  if (!token) {
    return { isAuthenticated: false, username: null, userId: null };
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId || !decoded.username ) {
      return { isAuthenticated: false, username: null, userId: null };

    }

    return {
      isAuthenticated: true,
      username: decoded.username,
      userId: decoded.userId
    };
  } catch (error) {
    console.error('authStatusService error:', error);
    return { isAuthenticated: false, username: null , userId: null };
  }
}
