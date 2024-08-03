"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import LessonTitle from "@/components/ui/lessonTitle";
import Modal from "react-modal";
import { GenerateLesson } from "@/components/generate-lesson";
import { Button } from "@/components/ui/button";
import LevelsWrapper from "@/components/levels-wrapper";
import { useAuth } from "@clerk/nextjs";

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
  const { userId } = useAuth();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Level[]>(`${backendUrl}/api/levels`);
        setLevels(response.data);
        console.log(levels);
      } catch (err: any) {
        setError("Failed to fetch levels");
        console.error(err);
      }
    };

    const fetchGeneratedLessons = async () => {
      try {
        const response = await axios.get<Lesson[]>(
          `${backendUrl}/api/generatedLessons/user/${userId}`
        );
        setGeneratedLessons(response.data);
      } catch (err: any) {
        setError("Failed to fetch generated lessons");
        console.error(err);
      }
    };

    const initializeUser = async () => {
      try {
        await axios.post(`${backendUrl}/api/users`, { userId });
      } catch (err: any) {
        console.error("Failed to initialize user:", err);
      }
    };

    if (userId) {
      initializeUser();
    }

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
    <div className="container max-w-5xl py-12 px-4 sm:px-6 xl:px-8 relative">
      <h1 className="text-3xl font-bold mb-11 text-center pb-10">
        План уроков фотографии
      </h1>
      <div
        className="w-full  boarder boarder-black 
            sm:bg-[url('/images/roadmap-vertical1.png')] 
            sm:bg-contain sm:bg-center sm:bg-no-repeat "
      >
        <div className="grid ml-6">
          {levels.map((level) => (
            <div key={level._id} className={`  mt-2 ${
              level._id === '66abc6d753be9fcf0d771ab7'
              ? "mt-6"
              : ""
              
            }`}>
              <div className="pl-11">
                
              </div>
              <h2 className="text-xl text-center font-bold pl-11  ">
                {level.level}
              </h2>
              
              <div className="space-y-4">
                <LevelsWrapper
                  levelId={level._id}
                  sublevels={level.sublevels}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 md:col-span-2 xl:col-span-1">
        <div className="text-left">
          <h2 className="text-xl font-bold mb-4">Персональные уроки</h2>
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
      <Button onClick={openModal} className="mt-8">
        Сгенерировать Урок
      </Button>
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
