// server/controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/userModel';

// Login Controller
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ status: 'error', message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        });
        res.status(200).json({ status: 'success', token });
    } catch (error:any) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Signup Controller
export const signup = async (req: Request, res: Response) => {
    const { email, password, passwordConfirm } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'User already exists' });
        }

        if (password !== passwordConfirm) {
            return res.status(400).json({ status: 'error', message: 'Passwords do not match' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({ email, password: hashedPassword });

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        });
        res.status(201).json({ status: 'success', token });
    } catch (error:any) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Check if user is logged in Controller
export const isLoggedIn = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ status: 'error', message: 'Not authenticated' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        const user = await UserModel.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        res.status(200).json({ status: 'success', data: user });
    } catch (error:any) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
