'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import LessonTitle from '@/components/ui/lessonTitle';
import Modal from 'react-modal';
import { GenerateLesson } from '@/components/generate-lesson';
import { Button } from '@/components/ui/button';
import { RoadmapTable } from '@/components/roadmap-table';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import LevelsWrapper from '@/components/levels-wrapper';


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
  const [generatedLessons, setGeneratedLessons] = useState<Lesson[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const userId = '1'; // Replace this with the actual user ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Level[]>('http://localhost:5000/api/levels');
        setLevels(response.data);
        console.log(levels)
      } catch (err: any) {
        setError('Failed to fetch levels');
        console.error(err);
      }
    };

    const fetchGeneratedLessons = async () => {
      try {
        const response = await axios.get<Lesson[]>(`http://localhost:5000/api/generatedLessons/user/${userId}`);
        setGeneratedLessons(response.data);
      } catch (err: any) {
        setError('Failed to fetch generated lessons');
        console.error(err);
      }
    };

    fetchData();
    fetchGeneratedLessons();
  }, [userId]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Photography Lessons Roadmap</h1>
        <div
          className="w-full h-90"
          style={{
            backgroundImage: "url('/images/roadmap.png')", 
            backgroundSize: 'contain', 
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat', 
            height: '100vh'
          }}
        >
            <div className="grid grid-cols-7 gap-2 pl-11 ml-6 ">
              {levels.map((level) => (
                <div key={level._id} className="col-span-6 md:col-span-2 lg:col-span-2 ">
                  <h2 className="text-xl font-bold mb-4 ">{level.level}</h2>
                  <div className="space-y-4 py-20">
                    <LevelsWrapper level={level.sublevels}/>
                  </div>
                </div>
              ))}
            </div>
        </div>
      <div className="mt-8 md:col-span-2 lg:col-span-1">
        <div className="text-left">
          <h2 className="text-xl font-bold mb-4">Generated Lessons</h2>
        </div>
        <div className="space-y-2">
          {generatedLessons.map((lesson) => (
            <div key={lesson._id} className="mb-2">
              <Link href={`/generatedLesson/${lesson._id}`}>
                <div className="block transition-all duration-200 hover:rounded-full hover:border-black hover:border hover:px-4 hover:py-1.5 hover:shadow-md w-1/3 text-left">
                  {lesson.title}
                </div>
              </Link>
            </div>
          ))}
        </div>
       </div>
        <Button onClick={openModal} className="mt-8">Сгенерировать Урок</Button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Generate Lesson"
          className="flex items-center justify-center"
        >
          <GenerateLesson onClose={closeModal} />
        </Modal>
    </div>
  );
};
export default RoadmapPage;
