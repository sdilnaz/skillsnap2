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

export default function LevelsWrapper({
  levelId,
  sublevels,
}: LevelsWrapperProps) {
  return (
    <main className="flex flex-col">
      {sublevels.map((sublevel, index) => (
        <div
          key={sublevel._id}
          className={`min-h-[100px] py-3 px-4 my-11 mx-auto  shadow-md shadow-orange-950 rounded-xl ${
            index % 2 === 0
              ? "bg-transparent w-full sm:w-[200px] md:w-1/4 sm:h-[170px] md:h-[210px] md:min-w-[230px] mt-2 sm:ml-[30%] pl-5  md:mt-3"
              : "bg-transparent w-full sm:w-[200px] sm:h-[180px] md:h-[220px] md:w-1/4 md:min-w-[230px] sm:mr-[33%] pl-5"
           
          }`}
        >
          <h3 className="text-md md:text-xl font-semibold mb-0 xl:mb-2">
            {sublevel.title}
          </h3>
          <div className="flex flex-col xl:space-y-2 mb-11 ">
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
