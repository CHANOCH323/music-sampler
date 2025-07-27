import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import{ DecodedToken } from '../types/user.d';
import { SpecialError } from '../errors/CustomErrors';
dotenv.config();
// מפתח סודי מאובטח מתוך משתנה סביבה
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; 

// פונקציה ליצירת טוקן
export const generateToken = (userId: string,username: string): string => {
    console.log('----------generate token----------');
    if (!JWT_SECRET_KEY) {
        console.error('JWT_SECRET_KEY is not defined');
        throw new SpecialError('JWT_SECRET_KEY is not defined');
    }
    console.log('Try to generate a new token...');
    const token = jwt.sign(
        {
            userId: userId,
            username: username
        },
        JWT_SECRET_KEY,  
        { expiresIn: '24h' } // הגבלת זמן התוקף ל-1 שעות
    );
    console.log('----------END generate token----------');
    return token;
};

/**
 * This function verifies a JWT token and returns the userId and email from the token
 * @param {string} token - The token to verify
 * @returns {Object} | null - The userId and email from the token
 * @throws {Error} - If the JWT_SECRET_KEY is not defined
 */
export const verifyToken = (token: string): DecodedToken | null => {
    if (!JWT_SECRET_KEY) {
        console.error('JWT_SECRET_KEY is not defined');
        throw new SpecialError('JWT_SECRET_KEY is not defined');
    }
    try {
        // אימות הטוקן
        const decoded = jwt.verify(token, JWT_SECRET_KEY) as { userId: string; username: string };
        // החזרת הנתונים מתוך הטוקן
        return decoded;
    } catch (error) {
        console.error("Token verification failed, probably expired or invalid!");
        console.error("Token verification failed:", error);
        return null;
    }
};
