import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectToMongoDB from './database/connect';
import imageRouter from './routes/image';
import gptRouter from './gpt/gpt-router';
import cors from 'cors';
import levelRoutes from './routes/levelRoutes';
import sublevelRoutes from './routes/sublevelRoutes';
import lessonRoutes from './routes/lessonRoutes';
import authRouter from './auth/auth-router';
import authMiddleware from './user/auth/auth-middleware';
import generatedLessonRoutes from './routes/generatedLessonRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(verifyToken);

connectToMongoDB().catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
});

app.use('/api/images', imageRouter);
app.use('/api/gpt', gptRouter);


app.use('/api/levels', levelRoutes);
app.use('/api/levels/:levelId/sublevels', sublevelRoutes);
app.use('/api/levels/:levelId/sublevels/:sublevelId/lessons', lessonRoutes);
app.use('/api/generatedLessons', generatedLessonRoutes);

// app.use('/api/auth', authRouter);
// app.use('/api/levels', authMiddleware, levelRoutes);
// app.use('/api/levels/:levelId/sublevels', authMiddleware, sublevelRoutes);
// app.use('/api/levels/:levelId/sublevels/:sublevelId/lessons', authMiddleware, lessonRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

app.get('api/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
