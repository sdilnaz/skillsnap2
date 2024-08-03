// pages/generatedLesson/[lessonId]/page.tsx
'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import ImageUpload from '@/components/imageUpload';

// interface Example {
//   description: string;
//   imageUrl: string;
// }

interface Task {
  taskNumber: number;
  description: string;
  maxPhotos: number;
}

interface GeneratedLesson {
  _id: string;
  lessonNumber: number;
  title: string;
  content: string;
  // examples: Example[];
  tasks: Task[];
}

interface GeneratedLessonPageProps {
  params: {
    lessonId: string;
  };
}

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

const GeneratedLessonPage = ({ params }: GeneratedLessonPageProps) => {
  const [lesson, setLesson] = useState<GeneratedLesson | null>(null);
  const [error, setError] = useState<string | null>(null);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get<GeneratedLesson>(`${backendUrl}/api/generatedLessons/${params.lessonId}`);
        setLesson(response.data);
      } catch (err: any) {
        setError('Failed to fetch lesson');
        console.error(err);
      }
    };

    fetchLesson();
  }, [params.lessonId]);

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
            {/* <p>{lesson.content}</p> */}
            <p>{parseResponseText(lesson.content)}</p>
          </div>
         

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

export default GeneratedLessonPage;
