'use client'
import React, { useRef } from 'react';
import Head from 'next/head';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import ImageUpload from "@/components/imageUpload";
import PreviewMainPage from '@/components/mainPage';
import LessonTitle from '@/components/ui/lessonTitle';
import TutorCard from '@/components/tutorCard';

const Home: React.FC = () => {
  const imageUploadRef = useRef<HTMLDivElement>(null);

  const handleScrollToUpload = () => {
    if (imageUploadRef.current) {
      imageUploadRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Head>
        <title>SkillSnap</title>
        <meta name="description" content="Enhance your photography skills" />
        <link rel="icon" href="images/logo.png" />
      </Head>
      <Header onScrollToUpload={handleScrollToUpload} />
      <div ref={imageUploadRef}>
        <ImageUpload />
      </div>
      <TutorCard />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
