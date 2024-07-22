// // //user/user-controller.ts
// // import { CreateUserDto } from './dtos/CreateUser.dto';
// // import UserService from './user-service';
// // import { Request, Response } from 'express';

// // // a user controller is a class that handles the user routes (incoming frontend requests)
// // class UserController {
// //   private userService: UserService;

// //   constructor(userService: UserService) {
// //     this.userService = userService;
// //   }

// //   createUser = (req: Request, res: Response) => {
// //     try {
// //       const user: CreateUserDto = req.body;
// //       const newUser = this.userService.createUser(user);
// //       res.status(201).json(newUser);
// //     } catch (error: any) {
// //       res.status(500).json({ error: error.message });
// //     }
// //   };

// //   getUsers = (req: Request, res: Response) => {
// //     try {
// //       const users = this.userService.getUsers();
// //       res.status(200).json(users);
// //     } catch (error: any) {
// //       res.status(500).json({ error: error.message });
// //     }
// //   };

// //   getUserById = (req: Request, res: Response) => {
// //     try {
// //       const params = req.params;
// //       const id = parseInt(params.id);
// //       const user = this.userService.getUserById(id);
// //       if (!user) {
// //         res.status(404).json({ error: 'User not found' });
// //       } else {
// //         res.status(200).json(user);
// //       }
// //     } catch (error: any) {
// //       res.status(500).json({ error: error.message });
// //     }
// //   };
// // }

// // export default UserController;
// // user-controller.ts
// import { Request, Response } from 'express';
// import UserService from './user-service';
// import { CreateUserDto } from './dtos/CreateUser.dto';

// class UserController {
//   private userService: UserService;

//   constructor(userService: UserService) {
//     this.userService = userService;
//   }

//   createUser = async (req: Request, res: Response) => {
//     try {
//       const user: CreateUserDto = req.body;
//       const newUser = await this.userService.createUser(user);
//       res.status(201).json(newUser);
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   };

//   getUsers = async (req: Request, res: Response) => {
//     try {
//       const users = await this.userService.getUsers();
//       res.status(200).json(users);
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   };

//   getUserById = async (req: Request, res: Response) => {
//     try {
//       const params = req.params;
//       const id = params.id;
//       const user = await this.userService.getUserById(id);
//       if (!user) {
//         res.status(404).json({ error: 'User not found' });
//       } else {
//         res.status(200).json(user);
//       }
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   };
// }

// export default UserController;


import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/userModel";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.session.userId).select("+email").exec();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

interface SignUpBody {
    username?: string,
    email?: string,
    password?: string,
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;

    try {
        if (!username || !email || !passwordRaw) {
            throw createHttpError(400, "Parameters missing");
        }

        const existingUsername = await UserModel.findOne({ username: username }).exec();

        if (existingUsername) {
            throw createHttpError(409, "Username already taken. Please choose a different one or log in instead.");
        }

        const existingEmail = await UserModel.findOne({ email: email }).exec();

        if (existingEmail) {
            throw createHttpError(409, "A user with this email address already exists. Please log in instead.");
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: passwordHashed,
        });

        req.session.userId = newUser._id;

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

interface LoginBody {
    username?: string,
    password?: string,
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!username || !password) {
            throw createHttpError(400, "Parameters missing");
        }

        const user = await UserModel.findOne({ username: username }).select("+password +email").exec();

        if (!user) {
            throw createHttpError(401, "Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials");
        }

        req.session.userId = user._id;
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            next(error);
        } else {
            res.sendStatus(200);
        }
    });
};