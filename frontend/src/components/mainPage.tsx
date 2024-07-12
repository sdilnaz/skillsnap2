import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PreviewMainPage() {
  return (
    <div className="flex items-center justify-center ">
  <section className="w-1/2 py-12">
    <div className="rounded-lg border bg-transparent backdrop-blur-sm p-6 shadow-md transition-all hover:shadow-xl md:p-8">
      <div className="flex flex-col items-start gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Персонализируй свои фотографии</h2>
        <p className="text-muted-foreground">
          Совершенствуй свои навыки в фотографии и повышай качество своей работы благодаря детальной обратной связи. Загрузи свои фотографии для получения персональных рекомендаций.
        </p>
        <div className="mt-auto">
          <Link
            href="#"
            className="block px-6 py-1 mt-4 transition ease-in duration-200 uppercase rounded-full hover:bg-orange-600 hover:border-orange-600 hover:text-white border-2 border-gray-900 focus:outline-none"
            prefetch={false}
          >
            Получить фидбэк
          </Link>
        </div>
      </div>
    </div>
  </section>
</div>

  );
}
