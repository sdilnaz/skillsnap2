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

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

connectToMongoDB().catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
});

app.use('/api/images', imageRouter);
app.use('/api/gpt', gptRouter);

// Corrected route paths with leading slash
app.use('/api/levels', levelRoutes);
app.use('/api/levels/:levelId/sublevels', sublevelRoutes);
app.use('/api/levels/:levelId/sublevels/:sublevelId/lessons', lessonRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
