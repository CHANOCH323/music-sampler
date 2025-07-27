import { Router, Request, Response, NextFunction } from 'express';
import { ValidationError } from "../errors/CustomErrors";
import { SignupUser } from '../types/user';


export const validateLoginData = (req: Request, res: Response, next: NextFunction) => {
  const { emailOrUsername, password } = req.body;

  if (!emailOrUsername || !password) {
    return next(new ValidationError('Email or username and password are required'));
  }

  next();
};

export function signupValidationMiddleware(req: Request, res: Response, next: NextFunction) {
    const {
        email,
        password,
        fullName,
        language,
        gender,
        profilePhoto,
        dateOfBirth } = req.body as SignupUser

    if (!email || !password || !fullName || !dateOfBirth) {
        return next(new ValidationError('email, password, fullName, dateOfBirth are required'));
    }
    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return next(new ValidationError('invalid email'));
    }
    // password validation
    if (password.trim().length < 6) {
        return next(new ValidationError('password must be at least 6 characters'));
    }
    // full_name validation
    if (fullName.trim().length < 3) {
        return next(new ValidationError('fullName must be at least 3 characters'));
    }
    // date_of_birth validation
    if (dateOfBirth.trim().length < 10) {
        return next(new ValidationError('dateOfBirth must be at least 10 characters'));
    }
    // language validation
    if (language.trim().length < 2) {
        req.body.language = 'en';
    }
    // gender validation
    if (gender.trim().length < 2) {
        req.body.gender = 'not specified';
    }
    // profile_photo validation
    if (profilePhoto.trim().length < 2) {
        req.body.profilePhoto = '';
    }
    next();
}