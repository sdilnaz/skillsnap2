'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import ImageUpload from '@/components/imageUpload';
import { ResponseCard } from '@/components/response-card';

interface Example {
  description: string;
  imageUrl: string;
}

interface Task {
  taskNumber: number;
  description: string;
  maxPhotos: number;
}

interface Lesson {
  _id: string;
  lessonNumber: number;
  title: string;
  content: string;
  examples: Example[];
  tasks: Task[];
}

interface LessonPageProps {
  params: {
    lessonId: string;
    levelId: string;
    sublevelId: string;
  };
}

interface UploadedImage {
  url: string;
  evaluation: any;
}

interface UserLesson {
  lessonId: string;
  images: UploadedImage[];
}

interface User {
  lessons: UserLesson[];
}
const LessonPage = ({ params }: LessonPageProps) => {
  const { userId } = useAuth();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleted, setDeleted] = useState<boolean>(false); // State to manage deletion feedback
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const lessonResponse = await axios.get<Lesson>(`${backendUrl}/api/levels/${params.levelId}/sublevels/${params.sublevelId}/lessons/${params.lessonId}`);
        setLesson(lessonResponse.data);

        if (userId) {
          const userResponse = await axios.get<User>(`${backendUrl}/api/users/${userId}`);
          setUser(userResponse.data);
        }
      } catch (err: any) {
        setError('Failed to fetch data');
        console.error(err);
      }
    };
    fetchData();
  }, [params, userId]);

  const handleDeleteImage = async () => {
    if (!userId || !lesson?._id || !user?.lessons.find(l => l.lessonId === params.lessonId)?.images[0]) return;

    try {
      await axios.delete(`${backendUrl}/api/images`, {
        data: {
          userId,
          imageUrl: user.lessons.find(l => l.lessonId === params.lessonId)?.images[0].url,
          lessonId: params.lessonId
        }
      });

      // Update state after deletion
      setUser(prevUser => {
        if (!prevUser) return prevUser;
        return {
          ...prevUser,
          lessons: prevUser.lessons.map(l => {
            if (l.lessonId === params.lessonId) {
              return {
                ...l,
                images: l.images.filter(img => img.url !== user.lessons.find(l => l.lessonId === params.lessonId)?.images[0].url)
              };
            }
            return l;
          })
        };
      });
      setDeleted(true);
    } catch (err: any) {
      setError('Failed to delete image');
      console.error(err);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!lesson) {
    return <div>Loading...</div>;
  }


  
  const userLesson = user?.lessons.find(lesson => lesson.lessonId === params.lessonId);
  const uploadedImage = userLesson?.images[0];



const parseResponseText = (text: string) => {
  const parts = text.split('\n');

  return parts.map((part, index) => {
    const trimmedPart = part.trim();
  
    // Handle empty strings
    if (trimmedPart === '') {
      return <br key={index} />;
    } else {
      const boldSplit = part.split('###');
      const elements = [];
  
      for (let i = 0; i < boldSplit.length; i++) {
        if (i % 2 === 1) {
          elements.push(
            <strong key={index + '-' + i} className="font-bold">
              {boldSplit[i]}
            </strong>
          );
        } else {
          const boldWithinText = boldSplit[i].split('**');
  
          for (let j = 0; j < boldWithinText.length; j++) {
            if (j % 2 === 1) {
              elements.push(
                <strong key={index + '-' + i + '-' + j} className="font-bold">
                  {boldWithinText[j]}
                </strong>
              );
            } else {
              elements.push(boldWithinText[j]);
            }
          }
        }
      }
  
      return (
        <p key={index} className="mb-2">
          {elements}
        </p>
      );
    }
  });
};

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-10/12 mx-auto px-4 py-6 md:px-6 lg:py-12">
        <article className="prose prose-gray mx-auto dark:prose-invert">
          <div className="space-y-6 not-prose">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{lesson.title}</h1>
            <p className="text-lg text-muted-foreground">Начинающий</p>
            <p>{parseResponseText(lesson.content)}</p>
          </div>
          
          {/* Conditional rendering for Carousel */}
          {/* {lesson.examples.length > 0 && (
            <Carousel className="w-full max-w-xs mt-8">
              <CarouselContent>
                {lesson.examples.map((example, index) => (
                  <CarouselItem key={index} className="flex flex-col items-center">
                    <img
                      src={example.imageUrl}
                      alt={`Example ${index + 1}`}
                      className="w-full h-auto object-cover rounded-md"
                    />
                    <p className="mt-2 text-center">{example.description}</p>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )} */}

          
          <div className="mt-8 space-y-4">
          <hr className="border-t border-gray-300 my-4"></hr>
            <h3 className="text-xl font-bold">Задания:</h3>
            <ul className="list-disc list-inside">
              {lesson.tasks.map((task, index) => (
                <li key={index}>
                  {task.description}
                  {task.maxPhotos > 0 && <span> (Максимальное кол-во фото: {task.maxPhotos})</span>}
                </li>
              ))}
            </ul>

            {uploadedImage ? (
              <div className='pt-11'>
                <h3 className='text-2xl font-semibold leading-none tracking-tight mb-11 text-center'>Анализ фотографии</h3>
                <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                  <div className="mt-8 lg:mt-0 lg:col-span-1 ">
                    <Image
                      src={uploadedImage.url}
                      alt="Uploaded Image"
                      width={300}
                      height={200}
                      className="rounded-lg w-full max-w-md "
                    />
                  </div>
                  <div className="mt-8 lg:mt-0 lg:col-span-1">
                    <ResponseCard evaluation={uploadedImage.evaluation} />
                    <button
                  onClick={handleDeleteImage}
                  className="mt-4 border border-red-500 text-red-500 px-4 py-2 rounded-full transition-colors duration-300 hover:bg-red-500 hover:text-white"
                >
                  Delete Image
                </button>
                {deleted && <p className="text-green-500 mt-2">Фотография успешно удалена</p>}
                  </div>
                </div>
               
              </div>
            ) : (
              <ImageUpload lessonId={lesson._id} />
            )}
            {/* <ImageUpload lessonId={lesson._id} /> */}
          </div>
        </article>
      </div>
    </div>
  );
};

export default LessonPage;
