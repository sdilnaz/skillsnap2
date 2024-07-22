
import React from 'react';
import PreviewMainPage from '../mainPage';

const Header: React.FC = () => {
  return (
    <header className="relative h-[calc(100vh-16px)] w-full overflow-hidden">

      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed h-80%"
        style={{
          backgroundImage: "url('/images/main.jpg')",
          backgroundAttachment: 'fixed', 
          zIndex: -20, 
        }}
      />
     
      <div className="absolute inset-0 bg-black/50 z-10" />
 
      <div className="absolute top-20 left-[32px] space-y-2 z-20">
        <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Мастерская фотографии
        </h1>
        <PreviewMainPage />
      </div>
  
      <div className="absolute bottom-11 right-20 w-80 bg-black bg-opacity-50 p-7 rounded-lg shadow-lg z-20">
        <p className="text-xl text-white">
          Персонализированные уроки в зависимости от вашего уровня и скиллов в фотографии. Выполняй задания после каждого урока и получай обратную связь за считанные секунды.
        </p>
      </div>
    </header>
  );
};

export default Header;
