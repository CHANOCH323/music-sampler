import { supabase } from '../db/supabaseClient';
import bcrypt from 'bcrypt';
import { UserFromDB, SignupUser } from '../types/user.d';

export async function findByEmailOrUsername(emailOrUsername: string): Promise<UserFromDB | null> {
  console.log('---------find By Email Or Username----------');

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .or(`email.ilike.${emailOrUsername},username.ilike.${emailOrUsername}`);

    if (error) {
      console.error('Supabase query error:', error.message);
      throw new Error(`Failed to fetch user: ${error.message}`);
    }

    const user = data && data[0] ? data[0] as UserFromDB : null;

    console.log('-------END find By Email Or Username--------');
    return user;

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error executing query:', error.message);
    } else {
      console.error('An unknown error occurred:', error);
    }
    throw new Error('Failed to fetch user. Please try again later.');
  }
}

export async function checkIfFieldValueExists(
  field: 'email' | 'username',
  value: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id') // מספיק לבדוק אם יש תוצאה עם ID
      .ilike(field, value); // בדיקה לא רגישה לרישיות

    if (error) {
      console.error(`Error checking ${field} existence:`, error.message);
      throw new Error(`Failed to check if ${field} exists`);
    }

    return data.length > 0;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Unexpected error checking ${field} existence:`, error.message);
    } else {
      console.error(`Unknown error checking ${field} existence:`, error);
    }
    throw new Error(`Unexpected error checking ${field} existence`);
  }
}




export const createUserInDB = async (userData: SignupUser): Promise<UserFromDB | null> => {
  console.log('----------create User In DB----------');
  const {
    fullName,
    email,
    password,
    language,
    gender,
    profilePhoto,
    username,
    dateOfBirth,
  } = userData;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          fullName,
          username,
          email,
          password: hashedPassword,
          language,
          gender,
          profilePhoto,
          dateOfBirth,
        }
      ])
      .select();

    if (error) {
      console.error('Error adding user:', error);
      throw new Error(`Error adding user: ${error.message}`);
    }

    const newUser = data?.[0] as UserFromDB;
    console.table(data);
    console.log('-------END create User In DB--------');
    return newUser;

  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};