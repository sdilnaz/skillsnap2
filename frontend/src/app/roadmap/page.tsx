
'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import LessonTitle from '@/components/ui/lessonTitle';

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

interface Sublevel {
    _id: string;
  title: string;
  lessons: Lesson[];
  tasks: Task[];
}

interface Level {
  _id: string;
  level: string;
  sublevels: Sublevel[];
}

const RoadmapPage = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Level[]>('http://localhost:5000/api/levels');
        setLevels(response.data);
      } catch (err: any) {
        setError('Failed to fetch levels');
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Photography Lessons Roadmap</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {levels.map((level) => (
          <div key={level._id}>
            <h2 className="text-xl font-bold mb-4">{level.level}</h2>
            <div className="space-y-4">
              {level.sublevels.map((sublevel) => (
                <div key={sublevel.title}>
                  <h3 className="text-lg font-semibold mb-2">{sublevel.title}</h3>
                  <div className="space-y-2">
                    {sublevel.lessons.map((lesson) => (
                       <LessonTitle
                       key={lesson.lessonNumber}
                       lesson={lesson}
                       levelId={level._id}
                       sublevelId={sublevel._id}
                       levelTitle={level.level}
                       sublevelTitle={sublevel.title}
                     />))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapPage;

