
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

const LessonPage = ({params}: LessonPageProps) => {

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
      


      <div className="px-4 py-6 md:px-6 lg:py-12">
      <article className="prose prose-gray mx-auto dark:prose-invert">
        <div className="space-y-2 not-prose">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{lesson.title}</h1>
          <p className="text-muted-foreground">Beginner</p>
        </div>
        <p>
            {lesson.content}
        </p>
        
        <Carousel className="w-full max-w-4xl">
          <CarouselContent>
            <CarouselItem>
              <img
                src="/placeholder.svg"
                width={1024}
                height={576}
                alt="Landscape Photo 1"
                className="aspect-video object-cover rounded-md"
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="/placeholder.svg"
                width={1024}
                height={576}
                alt="Landscape Photo 2"
                className="aspect-video object-cover rounded-md"
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="/placeholder.svg"
                width={1024}
                height={576}
                alt="Landscape Photo 3"
                className="aspect-video object-cover rounded-md"
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="/placeholder.svg"
                width={1024}
                height={576}
                alt="Landscape Photo 4"
                className="aspect-video object-cover rounded-md"
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="/placeholder.svg"
                width={1024}
                height={576}
                alt="Landscape Photo 5"
                className="aspect-video object-cover rounded-md"
              />
            </CarouselItem>
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
