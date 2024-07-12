import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="relative h-screen w-full">
      <Image
        src="/images/main.jpg" 
        alt="Hero Image"
        fill
        style={{ objectFit: 'cover' }}
        className="absolute inset-0 -z-10"
      />
      <div className="absolute inset-0 bg-black/50 -z-10" /> 
      <div className="absolute top-20 left-6 space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Мастерская фотографии
        </h1>
        <div className='mt-4'>
          <p className="text-lg text-white md:text-xl mt-4">
            Улучши свои навыки и раскрой свой потенциал
          </p>
        </div>
      </div>
      <div className="absolute bottom-1 left-20 w-80 bg-black bg-opacity-50 p-7 rounded-lg shadow-lg">
        <p className="text-m text-white">
          Персонализированные уроки в зависимости от вашего уровня и скиллов в фотографии. Выполняй задания после каждого урока и получай обратную связь за считанные секунды.
        </p>
      </div>
    </header>
  );
};

export default Header;
