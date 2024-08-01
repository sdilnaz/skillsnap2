import React from 'react';
import PreviewMainPage from '../mainPage';

import Link from "next/link";
const Header: React.FC = () => {
  return (
    <header className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/images/main.jpg')",
          backgroundAttachment: 'fixed',
          zIndex: -20,
        }}
      />
      
      <div className="absolute inset-0 bg-black/50 z-10" />
    
      <div className="absolute top-20 left-8 space-y-2 z-20">
        <h1 className="text-2xl sm:text-center md:text-left font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl ">
          Мастерская фотографии
        </h1>
        <PreviewMainPage />
      </div>
  
      <div className="hidden md:block absolute bottom-12 right-20 w-80 bg-black bg-opacity-50 p-7 rounded-lg shadow-lg z-20">
        <p className="text-xl text-white">
          Персонализированные уроки в зависимости от вашего уровня и скиллов в фотографии. Выполняй задания после каждого урока и получай обратную связь за считанные секунды.
        </p>
        <div className="mt-4 text-center hidden sm:block">
            <Link
              href="#"
              className="block px-6 py-2 transition ease-in duration-200 uppercase text-white rounded-full hover:bg-orange-600 hover:border-orange-600 hover:text-white border-2 border-white focus:outline-none"
              prefetch={false}
            >
              Получить фидбэк
            </Link>
          </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full px-4 z-20 md:hidden">
        <div className="bg-black bg-opacity-50 p-4 rounded-lg shadow-lg">
          <p className="text-md  lg:text-xl text-white text-center">
            Персонализированные уроки в зависимости от вашего уровня и скиллов в фотографии. Выполняй задания после каждого урока и получай обратную связь за считанные секунды.
          </p>
          <div className="mt-4 text-center">
            <Link
              href="#"
              className="block px-6 py-2 transition ease-in duration-200 uppercase text-white rounded-full hover:bg-orange-600 hover:border-orange-600 hover:text-white border-2 border-white focus:outline-none"
              prefetch={false}
            >
              Получить фидбэк
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
