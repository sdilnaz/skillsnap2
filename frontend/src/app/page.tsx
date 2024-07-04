import Head from 'next/head';
import Header from '@/components/ui/header';
import Navbar from '@/components/ui/navbar';
// import FeatureSection from '../components/FeatureSection';
// import PhotoSection from '../components/PhotoSection';
import Footer from '@/components/ui/footer';
import ImageUpload from "@/components/imageUpload";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>SkillSnap</title>
        <meta name="description" content="Enhance your photography skills" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Header />
      {/* <FeatureSection />
      <PhotoSection /> */}
      <ImageUpload />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
