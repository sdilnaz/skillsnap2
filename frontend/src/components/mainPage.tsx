import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PreviewMainPage() {
  return (
    <div className="flex items-center  ">
  <section className="w-1/3 py-2">
    <div className="bg-transparent">
      <div className="flex flex-col items-start gap-4">
        
        <p className="text-white">
          Совершенствуй свои навыки в фотографии и повышай качество своей работы благодаря детальной обратной связи. Загрузи свои фотографии для получения персональных рекомендаций.
        </p>
        <div className="mt-auto">
          <Link
            href="#"
            className="block px-6 py-1 mt-4 transition ease-in duration-200 uppercase text-white rounded-full hover:bg-orange-600 hover:border-orange-600 hover:text-white border-2 border-white focus:outline-none"
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
