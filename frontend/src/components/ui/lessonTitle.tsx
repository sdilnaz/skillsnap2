// components/lessonTitle.tsx
import React from 'react';
import Link from 'next/link';
import {ILesson} from '@/app/models/lessons';

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
    className?: string;
  }

  const LessonTitle = ({ lesson, levelId, sublevelId, className }: LessonTitleProps) => {
    return (
      <Link
      href={`/lesson/[levelId]/[sublevelId]/[lessonId]`}
      as={`/lesson/${levelId}/${sublevelId}/${lesson._id}`}
    >
      <div
        className={`text-sm transition-all duration-200 hover:text-xs hover:rounded-full hover:border-black hover:border hover:px-4 hover:py-2 hover:shadow-md inline-block ${className}`}
        >
        {lesson.title}
      </div>
    </Link>
  );
};

export default LessonTitle;
