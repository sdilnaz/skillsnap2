// //user/user-service.ts
// import { CreateUserDto } from './dtos/CreateUser.dto';
// import { User } from './types/response';

// // this user service instance shows how to create a user, get a user by id, and get all users with in-memory data
// class UserService {
//   usersInDatabase: User[] = [
//     {
//       id: 1,
//       email: 'albkfil@gmail.com',
//       username: 'alibackend',
//     },
//     {
//       id: 2,
//       email: 'bazarjackson@gmail.com',
//       username: 'bazarjackson',
//     },
//     {
//       id: 3,
//       email: 'samaltman@gmail.com',
//       username: 'openaiceo',
//     },
//   ];

//   getUserById(id: number): User | null {
//     return this.usersInDatabase.find((user) => user.id === id) || null;
//   }
//   getUsers(): User[] {
//     return this.usersInDatabase;
//   }

//   createUser(userDto: CreateUserDto): User {
//     const newUser: User = {
//       id: 4,
//       email: userDto.email,
//       username: userDto.username || 'user',
//     };
//     this.usersInDatabase.push(newUser);
//     return newUser;
//   }
// }

// export default UserService;
// user-service.ts

// user-service.ts
import bcrypt from 'bcrypt';
import UserModel, { IUser } from '../models/userModel';
import { CreateUserDto } from './dtos/CreateUser.dto';

class UserService {
  async getUserById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id);
  }

  async getUsers(): Promise<IUser[]> {
    return await UserModel.find();
  }

  async createUser(userDto: CreateUserDto): Promise<IUser> {
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

  async authenticateUser(email: string, password: string): Promise<IUser | null> {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    return user;
  }
}

export default UserService;
