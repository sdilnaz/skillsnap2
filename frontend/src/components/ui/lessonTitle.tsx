// // // components/lessonTitle.tsx
// // import React from "react";
// // import Link from "next/link";
// // import { ILesson } from "@/app/models/lessons";

// // interface LessonTitleProps {
// //   lesson: {
// //     _id: string;
// //     lessonNumber: number;
// //     title: string;
// //     content: string;
// //   };
// //   levelId: string;
// //   sublevelId: string;
// //   levelTitle: string;
// //   sublevelTitle: string;
// //   className?: string;
// // }

// // const LessonTitle = ({
// //   lesson,
// //   levelId,
// //   sublevelId,
// //   className,
// // }: LessonTitleProps) => {
// //   return (
// //     <Link
// //       href={`/lesson/[levelId]/[sublevelId]/[lessonId]`}
// //       as={`/lesson/${levelId}/${sublevelId}/${lesson._id}`}
// //     >
// //       <div
// //         className={`text-xs md:text-sm transition-all duration-200 hover:text-xs hover:rounded-full hover:border-black hover:border hover:px-4 hover:py-2 hover:shadow-md inline-block ${className} `}
// //       >
// //         {lesson.title}
// //       </div>
// //     </Link>
// //   );
// // };

// // export default LessonTitle;
// // components/lessonTitle.tsx
// import React from "react";
// import Link from "next/link";

// interface LessonTitleProps {
//   lesson: {
//     _id: string;
//     lessonNumber: number;
//     title: string;
//     content: string;
//   };
//   levelId: string;
//   sublevelId: string;
//   levelTitle: string;
//   sublevelTitle: string;
//   className?: string;
// }

// const LessonTitle = ({
//   lesson,
//   levelId,
//   sublevelId,
//   className,
// }: LessonTitleProps) => {
//   const { _id, title } = lesson;

//   // Determine styles and link behavior based on lesson ID
//   let linkProps: { href?: string; as?: string } = {};
//   let textStyle = "";

//   if (sublevelId === "66abc6d753be9fcf0d771a7e" || _id === "66abc6d753be9fcf0d771a98") {
//     textStyle = "text-black line-through";
//     linkProps = { href: `/lesson/[levelId]/[sublevelId]/[lessonId]`, as: `/lesson/${levelId}/${sublevelId}/${_id}` };
//   } else if (_id === "66abc6d753be9fcf0d771aa2") {
//     textStyle = "text-orange-500";
//     linkProps = { href: `/lesson/[levelId]/[sublevelId]/[lessonId]`, as: `/lesson/${levelId}/${sublevelId}/${_id}` };
//   } else {
//     textStyle = "text-gray-500";
//   }

//   return (
//     <div
//       className={`text-xs md:text-sm transition-all duration-200 hover:text-xs hover:rounded-full hover:border-black hover:border hover:px-4 hover:py-2 hover:shadow-md inline-block ${textStyle} ${className}`}
//     >
//       {linkProps.href ? (
//         <Link href={linkProps.href} as={linkProps.as}>
//           {title}
//         </Link>
//       ) : (
//         <span>{title}</span>
//       )}
//     </div>
//   );
// };

// export default LessonTitle;

import React from "react";
import Link from "next/link";

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
  sublevelTitle: string;
  className?: string;
}

const LessonTitle = ({
  lesson,
  levelId,
  sublevelId,
  className,
}: LessonTitleProps) => {
  const { _id, title } = lesson;

  // Determine styles and link behavior based on lesson ID
  let linkProps: { href?: string; as?: string } = {};
  let textStyle = "";
  if (sublevelId === "66abc6d753be9fcf0d771a7e" || _id === "66abc6d753be9fcf0d771a98") {
    textStyle = "text-black line-through";
    linkProps = { href: `/lesson/[levelId]/[sublevelId]/[lessonId]`, as: `/lesson/${levelId}/${sublevelId}/${_id}` };
  } else if (_id === "66abc6d753be9fcf0d771a9d") {
    textStyle = "text-orange-500 hover:boarder-orange";
    linkProps = { href: `/lesson/[levelId]/[sublevelId]/[lessonId]`, as: `/lesson/${levelId}/${sublevelId}/${_id}` };
  } else {
    textStyle = "text-gray-500 hover:border-transparent ";
  }

  return (
    <div
      className={`text-xs md:text-sm transition-all duration-200 hover:text-xs hover:rounded-full hover:border-black hover:border hover:px-4 hover:py-2 hover:shadow-md inline-block ${textStyle} ${className}`}
    >
      {linkProps.href ? (
        <Link href={linkProps.href} as={linkProps.as}>
          <div className={textStyle}>{title}</div>
        </Link>
      ) : (
        <span className={textStyle}>{title}</span>
      )}
    </div>
  );
};

export default LessonTitle;

