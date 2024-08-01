import LessonTitle from "./ui/lessonTitle";

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
}

interface Level {
  _id: string;
  level: string;
  sublevels: Sublevel[];
}

interface LevelsWrapperProps {
  levelId: string;
  sublevels: Sublevel[];
}

export default function LevelsWrapper({ levelId, sublevels }: LevelsWrapperProps) {
  return (
    <main className="flex flex-col">
      {sublevels.map((sublevel, index) => (
        <div
          key={sublevel._id}
          className={`min-h-[100px]  rounded-md ${
            index % 2 === 0
              ? 'bg-transparent w-full md:w-1/3 lg:ml-[50%] h-[250px] mt-3 md:ml-[20%]'
              : 'bg-transparent w-full h-[300px] md:w-1/3 md:ml-[50%] lg:ml-0'
          }`}
        >
          <h3 className="text-md font-semibold mb-2">{sublevel.title}</h3>
          <div className="flex flex-col space-y-2">
            {sublevel.lessons.map((lesson) => (
              <LessonTitle
                key={lesson._id}
                lesson={lesson}
                levelId={levelId} 
                sublevelId={sublevel._id}
                levelTitle="Placeholder for Level Title"
                sublevelTitle={sublevel.title}
                className="text-primary rounded-full flex items-center p-1 break-words"
              />
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
