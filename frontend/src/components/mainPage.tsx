/**
 * v0 by Vercel.
 * @see https://v0.dev/t/jcllLCBGA3Y
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PreviewMainPage() {
  return (
    <div className="w-full">
      <section className="container grid grid-cols-1 gap-6 py-12 md:grid-cols-2 md:gap-8 lg:py-16">
        <div className="rounded-lg border bg-transparent backdrop-blur-sm p-6 shadow-sm transition-all hover:shadow-md md:p-8">
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Evaluate Your Images</h2>
            <p className="text-muted-foreground">
              Refine your photography skills and elevate your work with expert feedback by uploading your photos for personalized guidance.
            </p>
            <div className="mt-auto">
              <Link
                href="#"
                className="block px-6 py-1 mt-4 transition ease-in duration-200 uppercase rounded-full hover:bg-orange-600 hover:border-orange-600 hover:text-white border-2 border-gray-900 focus:outline-none"
                prefetch={false}
              >
                Get Feedback
              </Link>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-transparent backdrop-blur-sm p-6 shadow-sm transition-all hover:shadow-md md:p-8">
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Personal Tutor</h2>
            <p className="text-muted-foreground">
              Empower your photography journey with a personal tutor that tailors lessons to your skill level, provides tasks after each session, and adjusts future lessons based on your progress.
            </p>
            <div className="mt-auto">
              <Link
                href="#"
                className="block px-6 py-1 mt-4 transition ease-in duration-200 uppercase rounded-full hover:bg-orange-600 hover:border-orange-600 hover:text-white border-2 border-gray-900 focus:outline-none "
                prefetch={false}
              >
                Explore Lessons
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
