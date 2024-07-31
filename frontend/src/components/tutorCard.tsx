import Link from "next/link";

export default function TutorCard() {
  return (
    <div className="flex items-center justify-center px-4 md:px-8 lg:px-16">
      <section className="w-full max-w-lg md:max-w-xl lg:max-w-3xl py-12">
        <div className="rounded-lg border bg-transparent backdrop-blur-sm p-6 shadow-md transition-all hover:shadow-xl md:p-8">
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">
              Персонализированные уроки
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
              Расширьте возможности вашего путешествия в мире фотографии с персональным ментором, который подбирает уроки в соответствии с вашим уровнем, дает задания после каждого занятия и подбирает будущие уроки в зависимости от вашего прогресса.
            </p>
            <div className="mt-4 md:mt-6 lg:mt-8">
              <Link
                href="/roadmap"
                className="block px-4 py-1 md:px-6 md:py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-orange-600 hover:border-orange-600 hover:text-white border-2 border-gray-900 focus:outline-none"
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
