import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PreviewMainPage() {
  return (
    <div className="hidden lg:flex items-center">
      <section className="w-1/3 py-2">
        <div className="bg-transparent">
          <div className="flex-col items-start gap-4 hidden lg:flex">
            <p className="text-white">
              Совершенствуй свои навыки в фотографии и повышай качество своей работы благодаря детальной обратной связи. Загрузи свои фотографии для получения персональных рекомендаций.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
