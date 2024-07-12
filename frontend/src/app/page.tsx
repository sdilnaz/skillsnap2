import Head from 'next/head';
import Header from '@/components/ui/header';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import ImageUpload from "@/components/imageUpload";
import PreviewMainPage from '@/components/mainPage';
import LessonTitle from '@/components/ui/lessonTitle';
import TutorCard from '@/components/tutorCard';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>SkillSnap</title>
        <meta name="description" content="Enhance your photography skills" />
        
      </Head>

      <Navbar />
      <Header />
      {/* <FeatureSection />
      <PhotoSection /> */}
      <PreviewMainPage/>
     
      <ImageUpload />
      <TutorCard/>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;


// isCompleted={completedLessons.includes(lesson._id)}