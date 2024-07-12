
// components/lessonTitle.tsx
import React from 'react';
import Link from 'next/link';
import {ILesson} from '@/app/models/lessons';// Assuming you have a types file containing interfaces

interface LessonTitleProps {
    lesson: {
      _id: string;
      lessonNumber: number;
      title: string;
      content: string;
    };
    levelId: string;
    sublevelId: string;
    levelTitle: string;
    sublevelTitle:string;
  }

  const LessonTitle = ({ lesson, levelId, sublevelId }: LessonTitleProps) => {
    return (
    <Link href={`/lesson/[levelId]/[sublevelId]/[lessonId]`} as={`/lesson/${levelId}/${sublevelId}/${lesson._id}`}>
        <div className="transition-all duration-200 group-hover:rounded-lg group-hover:border group-hover:border-primary group-hover:px-10 group-hover:py-0.5 inline-block w-full text-center">
        {lesson.title}
      </div>
    </Link>
  );
};

export default LessonTitle;
