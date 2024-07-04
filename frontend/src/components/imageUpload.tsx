'use client'
import { useState } from "react";
import Image from 'next/image';
import { UploadDropzone } from "@/utils/uploadthing";
import  {ResponseCard} from "./response-card";
import axios from 'axios'
import { headers } from "next/headers";

const ImageUpload = () => {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [evaluation, setEvaluation] = useState<any>(null);

    const handleUploadComplete = async (res: any) => {
        const url = res[0].url;
        setImageUrl(url);

        try {
            const saveResponse = await fetch('http://localhost:5000/api/images', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageUrl: url }),
            });

            if (saveResponse.ok) {
                console.log('Image URL saved to MongoDB');
            } else {
                console.error('Failed to save image URL to MongoDB');
            }

            const evaluatedResponse = await axios.post('http://localhost:5000/api/gpt/evaluate', JSON.stringify({ imageUrl: url }), {
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            setEvaluation(evaluatedResponse.data.evaluation);

        } catch (error) {
            console.error('Error during image processing:', error);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <UploadDropzone
                endpoint='imageUploader'
                onClientUploadComplete={handleUploadComplete}
                onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                }}
            />

            {imageUrl && (
                <div>
                    <Image src={imageUrl} alt='my image' width={500} height={300} />
                </div>
            )}

            {evaluation && (
                <div>
                    <h1>Evaluation:</h1>
                    <h2>Composition:</h2>
                    <p>Feedback: {evaluation.composition.feedback}</p>
                    <p>Suggestions: {evaluation.composition.suggestions_for_improvement}</p>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
