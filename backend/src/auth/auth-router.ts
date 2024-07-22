// server/routes/auth.ts
import express from 'express';
import { login, signup, isLoggedIn } from './auth-controller';
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/isLoggedIn', isLoggedIn);

export default router;
