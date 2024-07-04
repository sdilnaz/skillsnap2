// components/Header.tsx
import React from 'react';
import '../../styles/fontStyle.css'

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* <h1 className="text-7xl font-bold leading-tight text-gray-900 font-zen-dots">PHOTOGRAPHY</h1> */}
        <p className="text-center text-orange-500">Enhance your photography skills</p>
      </div>
    </header>
  );
};

export default Header;
