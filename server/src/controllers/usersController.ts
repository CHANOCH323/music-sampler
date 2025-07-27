import { loginService,signupService } from '../services/usersService';
import { LoginUser,SignupUser } from '../types/user.d';
import { Request, Response, NextFunction } from 'express';



export async function loginController( req: Request, res: Response, next: NextFunction) {
    console.log("----------login controller----------");
    try {
        const userData: LoginUser = req.body

        
        const { token, user } = await loginService(userData as LoginUser);
        
        // Set JWT token in HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: process.env.NODE_ENV === 'production',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
            // domain: process.env.DOMAIN
        });
        
        console.log('----------END login controller----------');
        res.json(user)
        return;
        
    } catch (error: any) {
        console.error('Login error:', error)
        next(error)
        return;
    }
}
export async function signupController(req: Request, res: Response, next: any) {
    console.log("----------signup controller----------");
    try {
        const userData: SignupUser = req.body
        
        const { token, newUser } = await signupService(userData as SignupUser);
        
        // Set JWT token in HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: process.env.NODE_ENV === 'production',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
            // domain: process.env.DOMAIN
        });

        console.log('----------END signup controller----------');
        res.json(newUser)
        return;

    } catch (error: any) {
        console.error('Signup error:', error)
        next(error)
        return;
    }
}