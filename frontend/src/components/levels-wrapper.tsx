// import LessonTitle from "./ui/lessonTitle"



// export default function LevelsWrapper({ level }: { level: any[] }) {
//     return (
//         <main className="flex flex-col ">
//         {level.map((sublevel: any, index: number) => (
//           <div
//             key={sublevel._id}
//             className={`px-4  min-h-[150px] rounded  ${
//               index % 2 === 0 ? 'bg-gray-100 w-full h-[350px] md:w-1/2' : 'bg-gray-200 w-full  md:w-1/2 md:ml-[50%] h-[350px]'
//             }`}
//           >
//             <h3 className="text-lg font-semibold mb-2 mt-3">{sublevel.title}</h3>
//             <div className="flex flex-col space-y-2">
//               {sublevel.lessons.map((lesson: any) => (
//                 <LessonTitle
//                   key={lesson._id}
//                   lesson={lesson}
//                   levelId={level._id}
//                   sublevelId={sublevel._id}
//                   levelTitle={level.level}
//                   sublevelTitle={sublevel.title}
//                   className="text-primary rounded-lg flex items-center p-2 break-words"
//                 />
//               ))}
//             </div>
//           </div>
//         ))}
//       </main>


//     );
//   }
import LessonTitle from "./ui/lessonTitle";

// Define TypeScript interfaces for props

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


export default function LevelsWrapper({ level }: { level: Sublevel[] }) {
  return (
    <main className="flex flex-col">
      {level.map((sublevel, index) => (
        <div
          key={sublevel._id}
          className={` min-h-[100px] rounded-md ${
            index % 2 === 0
              ? 'bg-transparent w-full md:w-1/3 md:ml-[50%] h-[250px] mt-3'
              : 'bg-transparent  w-full h-[300px] md:w-1/3 '
          }`}
        >
          <h3 className="text-md font-semibold mb-2">{sublevel.title}</h3>
          <div className="flex flex-col space-y-2">
            {sublevel.lessons.map((lesson) => (
              <LessonTitle
                key={lesson._id}
                lesson={lesson}
                levelId={sublevel._id} 
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
