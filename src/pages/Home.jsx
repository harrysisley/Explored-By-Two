import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import InteractiveGlobe from '../components/InteractiveGlobe';
import TravelInspirationGenerator from '../components/TravelInspirationGenerator';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <TravelInspirationGenerator />
      <InteractiveGlobe />
    </div>
  );
};

export default Home;
