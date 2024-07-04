// backend/src/gpt/gpt-router.ts
import { Router, Request, Response } from 'express';
import GptService from './gpt-service';

const gptRouter = Router();
const gptService = new GptService();

gptRouter.post('/evaluate', async (req: Request, res: Response) => {
    const { imageUrl } = req.body; 

    try {
        if (!imageUrl) {
            return res.status(400).json({ error: 'imageUrl is required' });
        }

        const evaluation = await gptService.evaluateImage(imageUrl);
        res.status(200).json(JSON.parse(evaluation));
    } catch (error) {
        console.error('Error evaluating image:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default gptRouter;
