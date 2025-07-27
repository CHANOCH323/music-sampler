import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { SpecialError } from '../errors/CustomErrors';
dotenv.config();
// מפתח סודי מאובטח מתוך משתנה סביבה
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; 

// פונקציה ליצירת טוקן
export const generateToken = (userId: string, email: string): string => {
    console.log('----------generate token----------');
    if (!JWT_SECRET_KEY) {
        console.error('JWT_SECRET_KEY is not defined');
        throw new SpecialError('JWT_SECRET_KEY is not defined');
    }
    console.log('Try to generate a new token...');
    const token = jwt.sign(
        {
            userId: userId,
            email: email
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
export const verifyToken = (token: string): { userId: string; email: string } | null => {
    if (!JWT_SECRET_KEY) {
        console.error('JWT_SECRET_KEY is not defined');
        throw new SpecialError('JWT_SECRET_KEY is not defined');
    }
    try {
        // אימות הטוקן
        const decoded = jwt.verify(token, JWT_SECRET_KEY) as { userId: string; email: string };
        // החזרת הנתונים מתוך הטוקן
        return decoded;
    } catch (error) {
        console.error("Token verification failed, probably expired or invalid!");
        console.error("Token verification failed:", error);
        return null;
    }
};
