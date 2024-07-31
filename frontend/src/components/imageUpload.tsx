// // 'use client'
// // import { useState } from "react";
// // import Image from 'next/image';
// // import { UploadDropzone } from "@/utils/uploadthing";
// // import { ResponseCard } from "./response-card";
// // import axios from 'axios';
// // import { useAuth } from '@clerk/nextjs'; 

// // interface ImageUploadProps {
// //     lessonId?: string; 
// // }

// // const ImageUpload: React.FC<ImageUploadProps> = ({ lessonId }) => {
// //     const [imageUrl, setImageUrl] = useState<string>('');
// //     const [evaluation, setEvaluation] = useState<any>(null);
// //     const [isLoading, setIsLoading] = useState<boolean>(false);
// //     const [error, setError] = useState<string | null>(null);
// //     const { userId } = useAuth(); 
// //     const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    
// //     const handleUploadComplete = async (res: any) => {
// //         const url = res[0].url;
// //         setImageUrl(url);
// //         setIsLoading(true); 

// //         try {
// //             // Save image URL and get evaluation from the backend
// //             const saveResponse = await axios.post(`${backendUrl}/api/images`, {
// //                 imageUrl: url,
// //                 userId,
// //                 lessonId
// //             });

// //             if (saveResponse.status === 200) {
// //                 const { evaluation: evalResult } = saveResponse.data;
// //                 setEvaluation(evalResult);
// //                 console.log("eval result : ", evaluation)
// //             } else {
// //                 setError('Failed to save image URL to MongoDB');
// //             }
// //         } catch (error) {
// //             console.error('Error during image processing:', error);
// //             setError('An error occurred while processing the image.');
// //         } finally {
// //             setIsLoading(false);
// //         }
// //     };

// //     return (
// //         <div className="flex flex-col items-center justify-center p-24">
// //             <h2 className="text-2xl font-bold mb-4">Оцени свои фотографии</h2> 
// //             <p className="text-muted-foreground text-md mb-4 text-left w-full max-w-full">
// //                 Загрузи фото для получения подробного фидбека
// //             </p>
// //             <div className="w-full max-w-full mt-4 flex flex-col items-center"> 
// //                 {!imageUrl && (
// //                     <UploadDropzone
// //                         endpoint='imageUploader'
// //                         onClientUploadComplete={handleUploadComplete}
// //                         onUploadError={(error: Error) => {
// //                             alert(`ERROR! ${error.message}`);
// //                         }}
// //                         className="bg-transparent backdrop-blur-lg shadow-l ut-label:text-orange-600 ut-button:bg-transparent ut-button:text-gray-700 ut-button:border-2 ut-button:border-gray-700 ut-button:rounded-full ut-button:transition ut-button:duration-300 hover:ut-button:bg-orange-500 hover:ut-button:text-gray-700 ut-button:ut-readying:bg-orange-500/50 w-full max-w-80% md:max-w-70% lg:max-w-60% xl:max-w-58.5% mt-4"
// //                     />
// //                 )}

// //                 {isLoading && <p>Uploading and processing image...</p>}

// //                 {imageUrl && !isLoading && (
// //                     <div className="mt-8">
// //                         <Image src={imageUrl} alt='my image' width={300} height={200} className="rounded-lg" />
// //                     </div>
// //                 )}

// //                 {!isLoading && evaluation && (
// //                     <div className="mt-8">
                        
// //                         <ResponseCard evaluation={evaluation} />
// //                     </div>
// //                 )}

            
// //             </div>
// //         </div>
// //     );
// // };

// // export default ImageUpload;
// 'use client'
// import { useState } from "react";
// import Image from 'next/image';
// import { UploadDropzone } from "@/utils/uploadthing";
// import { ResponseCard } from "./response-card";
// import axios from 'axios';
// import { useAuth } from '@clerk/nextjs'; 

// interface ImageUploadProps {
//     lessonId?: string; 
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({ lessonId }) => {
//     const [imageUrl, setImageUrl] = useState<string>('');
//     const [evaluation, setEvaluation] = useState<any>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);
//     const { userId } = useAuth(); 
//     const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    
//     const handleUploadComplete = async (res: any) => {
//         const url = res[0].url;
//         setImageUrl(url);
//         setIsLoading(true); 

//         try {
//             // Save image URL and get evaluation from the backend
//             const saveResponse = await axios.post(`${backendUrl}/api/images`, {
//                 imageUrl: url,
//                 userId,
//                 lessonId
//             });

//             if (saveResponse.status === 200) {
//                 const { evaluation: evalResult } = saveResponse.data;
//                 setEvaluation(evalResult);
//                 console.log("eval result : ", evaluation)
//             } else {
//                 setError('Failed to save image URL to MongoDB');
//             }
//         } catch (error) {
//             console.error('Error during image processing:', error);
//             setError('An error occurred while processing the image.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center p-24 px-4 md:px-8 lg:px-16">
//             <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 ">Оцени свои фотографии</h2> 
//             <p className="text-muted-foreground  text-center text-sm md:text-base lg:text-lg mb-4  w-full max-w-full">
//                 Загрузи фото для получения подробного фидбэка
//             </p>
//             <div className="w-full max-w-lg md:max-w-xl lg:max-w-3xl mt-4 flex flex-col items-center"> 
//                 {!imageUrl && (
//                     <UploadDropzone
//                         endpoint='imageUploader'
//                         onClientUploadComplete={handleUploadComplete}
//                         onUploadError={(error: Error) => {
//                             alert(`ERROR! ${error.message}`);
//                         }}
//                         className="bg-transparent backdrop-blur-lg shadow-l ut-label:text-orange-600 ut-button:bg-transparent ut-button:text-gray-700 ut-button:border-2 ut-button:border-gray-700 ut-button:rounded-full ut-button:transition ut-button:duration-300 hover:ut-button:bg-orange-500 hover:ut-button:text-gray-700 ut-button:ut-readying:bg-orange-500/50 w-full max-w-lg md:max-w-xl lg:max-w-3xl"
//                     />
//                 )}

//                 {isLoading && <p>Uploading and processing image...</p>}

//                 {imageUrl && !isLoading && (
//                     <div className="mt-8">
//                         <Image src={imageUrl} alt='my image' width={300} height={200} className="rounded-lg" />
//                     </div>
//                 )}

//                 {!isLoading && evaluation && (
//                     <div className="mt-8">
//                         <ResponseCard evaluation={evaluation} />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ImageUpload;
'use client'
import React, { useState, useRef, useEffect } from "react";
import Image from 'next/image';
import { UploadDropzone } from "@/utils/uploadthing";
import { ResponseCard } from "./response-card";
import axios from 'axios';
import { useAuth } from '@clerk/nextjs'; 

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

    const uploadRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Check if the page should scroll to the upload section
        const query = new URLSearchParams(window.location.search);
        if (query.get('scrollToUpload') === 'true' && uploadRef.current) {
            uploadRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const handleUploadComplete = async (res: any) => {
        const url = res[0].url;
        setImageUrl(url);
        setIsLoading(true); 

        try {
            // Save image URL and get evaluation from the backend
            const saveResponse = await axios.post(`${backendUrl}/api/images`, {
                imageUrl: url,
                userId,
                lessonId
            });

            if (saveResponse.status === 200) {
                const { evaluation: evalResult } = saveResponse.data;
                setEvaluation(evalResult);
            } else {
                setError('Failed to save image URL to MongoDB');
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
            <div className="w-full max-w-lg md:max-w-xl lg:max-w-3xl mt-4 flex flex-col items-center" ref={uploadRef}>
                {!imageUrl && (
                    <UploadDropzone
                        endpoint='imageUploader'
                        onClientUploadComplete={handleUploadComplete}
                        onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`);
                        }}
                        className="bg-transparent backdrop-blur-lg shadow-l ut-label:text-orange-600 ut-button:bg-transparent ut-button:text-gray-700 ut-button:border-2 ut-button:border-gray-700 ut-button:rounded-full ut-button:transition ut-button:duration-300 hover:ut-button:bg-orange-500 hover:ut-button:text-gray-700 ut-button:ut-readying:bg-orange-500/50 w-full max-w-lg md:max-w-xl lg:max-w-3xl"
                    />
                )}

                {isLoading && <p>Загрузка и обработка фотографии...</p>}

                {imageUrl && !isLoading && (
                    <div className="mt-8">
                        <Image src={imageUrl} alt='my image' width={300} height={200} className="rounded-lg" />
                    </div>
                )}

                {!isLoading && evaluation && (
                    <div className="mt-8">
                        <ResponseCard evaluation={evaluation} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
