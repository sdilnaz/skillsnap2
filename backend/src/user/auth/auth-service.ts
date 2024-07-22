// src/user/auth/auth-service.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel, { IUser } from '../../models/userModel';
import { CreateUserDto } from '../dtos/CreateUser.dto';

class AuthService {
  async register(userDto: CreateUserDto): Promise<IUser> {
    const { email, username, password } = userDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    return newUser;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });
    return token;
  }
}

export default AuthService;
