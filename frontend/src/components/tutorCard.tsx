
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TutorCard() {
  return (
    <div className="flex items-center justify-center ">
      
      <section className="w-1/2 py-12">
        
        <div className="rounded-lg border bg-transparent backdrop-blur-sm p-6 shadow-md transition-all hover:shadow-xl md:p-8">
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Персонализированные уроки</h2>
            <p className="text-muted-foreground">
            Расширьте возможности вашего путешествия в мире фотографии с персональным ментором, который подбирает уроки в соответствии с вашим уровнем, дает задания после каждого занятия и подбирает будущие уроки в зависимости от вашего прогресса.
            </p>
            <div className="mt-auto">
              <Link
                href="/roadmap"
                className="block px-6 py-1 mt-4 transition ease-in duration-200 uppercase rounded-full hover:bg-orange-600 hover:border-orange-600 hover:text-white border-2 border-gray-900 focus:outline-none "
                prefetch={false}
              >
                Перейти к урокам
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
