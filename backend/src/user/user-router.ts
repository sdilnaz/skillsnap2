// user-router.ts
import { Router } from 'express';
import UserController from './user-controller';
import UserService from './user-service';
import authMiddleware from './auth/auth-middleware';

const userRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

userRouter.get('/users/', authMiddleware, userController.getUsers);
userRouter.post('/users/', authMiddleware, userController.createUser);
userRouter.get('/users/:id', authMiddleware, userController.getUserById);

export default userRouter;
