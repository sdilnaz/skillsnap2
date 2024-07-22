// auth-controller.ts
import { Request, Response } from 'express';
import UserService from '../user-service';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import jwt from 'jsonwebtoken';

class AuthController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  register = async (req: Request, res: Response) => {
    try {
      const user: CreateUserDto = req.body;
      const newUser = await this.userService.createUser(user);
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.authenticateUser(email, password);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default AuthController;
