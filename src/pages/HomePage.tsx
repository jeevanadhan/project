import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import UploadSection from '../components/UploadSection';

const HomePage = () => {
  return (
    <main>
      <Hero />
      <Features />
      <UploadSection />
    </main>
  );
};

export default HomePage;