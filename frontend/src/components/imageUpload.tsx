'use client'
import { useState } from "react";
import Image from 'next/image';
import { UploadDropzone } from "@/utils/uploadthing";
import { ResponseCard } from "./response-card";
import { useAuth } from '@clerk/nextjs'; 
import axios from "axios";

interface ImageUploadProps {
    lessonId?: string; 
}

const ImageUpload: React.FC<ImageUploadProps> = ({ lessonId }) => {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [evaluation, setEvaluation] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { userId } = useAuth(); 
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const handleUploadComplete = async (res: any) => {
        const url = res[0].url;
        setImageUrl(url);
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${backendUrl}/api/images`, {
                imageUrl: url,
                userId,
                lessonId
            });

            if (response.status === 201) {
                const { evaluation: evalResult } = response.data;
                setEvaluation(evalResult);
            } else {
                setError('Failed to get evaluation from the server');
            }
        } catch (error) {
            console.error('Error during image processing:', error);
            setError('An error occurred while processing the image.');
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <div className="flex flex-col items-center justify-center p-24 px-4 md:px-8 lg:px-16">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">Оцени свои фотографии</h2> 
            <p className="text-muted-foreground text-center text-sm md:text-base lg:text-lg mb-4 w-full max-w-full">
                Загрузи фото для получения подробного фидбэка
            </p>
            <div className="w-full max-w-lg md:max-w-xl lg:max-w-3xl mt-4 flex flex-col items-center"> 
                {!imageUrl && (
                    <UploadDropzone
                        endpoint='imageUploader'
                        onClientUploadComplete={handleUploadComplete}
                        onUploadError={(error: Error) => {
                            setError(`Upload error: ${error.message}`);
                        }}
                        className="bg-transparent backdrop-blur-lg shadow-l ut-label:text-orange-600 ut-button:bg-transparent ut-button:text-gray-700 ut-button:border-2 ut-button:border-gray-700 ut-button:rounded-full ut-button:transition ut-button:duration-300 hover:ut-button:bg-orange-500 hover:ut-button:text-gray-700 ut-button:ut-readying:bg-orange-500/50 w-full max-w-lg md:max-w-xl lg:max-w-3xl"
                    />
                )}

                {imageUrl && (
                    <div className="mt-8">
                        <Image src={imageUrl} alt='Uploaded image' width={400} height={300} className="rounded-lg" />
                    </div>
                )}

                {isLoading && (
                    <p className="mt-4">Оцениваем фотографию...</p>
                )}

                {evaluation && !isLoading && (
                    <div className="mt-8">
                        <ResponseCard evaluation={evaluation} />
                    </div>
                )}

                {error && (
                    <p className="text-red-500 mt-4">{error}</p>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;