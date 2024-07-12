
import { Router, Request, Response } from 'express';
import connectToMongoDB from '../database/connect';
import Image from '../models/imageModel';

const imageRouter = Router();

imageRouter.post('/', async (req: Request, res: Response) => {
    const { imageUrl } = req.body;

    try {
        await connectToMongoDB();

        const newImage = new Image({ imageUrl });
        const result = await newImage.save();

        res.status(201).json({ message: 'Image URL saved', imageId: result._id });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default imageRouter;
