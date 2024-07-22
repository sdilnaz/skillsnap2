'use client'
import { useState } from "react";
import Image from 'next/image';
import { UploadDropzone } from "@/utils/uploadthing";
import { ResponseCard } from "./response-card";
import axios from 'axios';

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
            });

            setEvaluation(evaluatedResponse.data.evaluation);
            console.log(evaluation);

        } catch (error) {
            console.error('Error during image processing:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center  p-24">
            <h2 className="text-2xl font-bold mb-4">Оцени свои фотографии</h2> 
            <p className="text-muted-foreground text-md mb-4 text-left w-[full] max-w-[100%]">
            Загрузи фото для получения подробного фидбека
            </p>
            <div className="w-full max-w-[100%] mt-4 flex flex-col items-center"> 
                {!imageUrl && (
                    <UploadDropzone
                        endpoint='imageUploader'
                        onClientUploadComplete={handleUploadComplete}
                        onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`);
                        }}
                        className="bg-transparent backdrop-blur-lg shadow-l ut-label:text-orange-600 ut-button:bg-transparent ut-button:text-gray-700 ut-button:border-2 ut-button:border-gray-700 ut-button:rounded-full ut-button:transition ut-button:duration-300 hover:ut-button:bg-orange-500 hover:ut-button:text-gray-700 ut-button:ut-readying:bg-orange-500/50 w-full max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[58.5%] mt-4"
                        />
                )}

                {imageUrl && (
                    <div className="mt-8">
                        <Image src={imageUrl} alt='my image' width={500} height={300} className="rounded-lg" />
                    </div>
                )}

                {evaluation && (
                    <div className="mt-8">
                        <ResponseCard evaluation={evaluation} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
