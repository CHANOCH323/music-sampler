import { Router, Request, Response, NextFunction } from 'express';
import { signupValidationMiddleware , validateLoginData} from '../middleware/usersValidationsMiddlewares';
import { loginController , signupController, authStatusController} from '../controllers/usersController';


const usersRoutes = Router();



usersRoutes.post("/login", validateLoginData, loginController);
usersRoutes.post("/signup", signupValidationMiddleware, signupController);
usersRoutes.get("/status", authStatusController );

// ייצוא בשם של כל מה שצריך
export { usersRoutes };
