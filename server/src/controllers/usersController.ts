import { loginService,signupService ,authStatusService} from '../services/usersService';
import { LoginUser,SignupUser } from '../types/user.d';
import { Request, Response, NextFunction } from 'express';



export async function loginController( req: Request, res: Response, next: NextFunction) {
    console.log("----------login controller----------");
    try {
        const userData: LoginUser = req.body

        
        const { token, user } = await loginService(userData as LoginUser);
        
        // Set JWT token in HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000,
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
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000,
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
export async function authStatusController(req: Request, res: Response, next: NextFunction) {
  console.log("----------auth status controller----------");
  try {
    const token = req.cookies.token;
    if (!token) {
      res.json({ isAuthenticated: false, username: null, userId: null });
      return;
    }

    const user = await authStatusService(token);

    if (!user) {
      res.json({ isAuthenticated: false, username: null, userId: null });
      return;
    }

    res.json({ isAuthenticated: true, username: user.username , userId: user.userId });
    return;
  } catch (error: any) {
    console.error('Auth status error:', error);
    next(error);
    return;
  }
}