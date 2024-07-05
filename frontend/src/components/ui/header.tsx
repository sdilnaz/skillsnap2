// components/Header.tsx
import React from 'react';
import '../../styles/fontStyle.css'


const Header: React.FC = () => {
  return (
    <header className="bg-transparent shadow flex justify-center items-center ">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-gray-900 font-custom">
          PHOTOGRAPHY
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-orange-500 mt-4">
          Enhance your photography skills
        </p>
      </div>
    </header>
  );
};

export default Header;