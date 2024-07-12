'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"

import ImageUpload from '@/components/imageUpload';

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
    lessonId: string,
    levelId: string, 
    sublevelId: string
  }
}

interface Sublevel {
  _id: string;
  title: string;
}

interface Level {
  _id: string;
  level: string;
}

const LessonPage = ({ params }: LessonPageProps) => {

  console.log(params)

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get<Lesson>(`http://localhost:5000/api/levels/${params.levelId}/sublevels/${params.sublevelId}/lessons/${params.lessonId}`);
        setLesson(response.data);
      } catch (err: any) {
        setError('Failed to fetch lesson');
        console.error(err);
      }
    };
    fetchLesson();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!lesson) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-10/12 mx-auto px-4 py-6 md:px-6 lg:py-12">
        <article className="prose prose-gray mx-auto dark:prose-invert">
          <div className="space-y-6 not-prose">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{lesson.title}</h1>
            <p className="text-lg text-muted-foreground">Начинающий</p>
            <p>{lesson.content}</p>
          </div>
          <Carousel className="w-full max-w-xs mt-8 ">
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

          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-bold">Tasks:</h3>
            <ul className="list-disc list-inside">
              {lesson.tasks.map((task, index) => (
                <li key={index}>
                  {task.description}
                  {task.maxPhotos > 0 && <span> (Максимальное кол-во фото: {task.maxPhotos})</span>}
                </li>
              ))}
            </ul>
            <ImageUpload />
          </div>
        </article>
      </div>
    </div>
  );
};

export default LessonPage;
