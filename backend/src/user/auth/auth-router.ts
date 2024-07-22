// auth-router.ts
import { Router } from 'express';
import AuthController from './auth-controller';
import UserService from '../user-service';

const authRouter = Router();

const userService = new UserService();
const authController = new AuthController(userService);

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

export default authRouter;
