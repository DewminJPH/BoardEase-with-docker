import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import FilterTabs from '../components/Home/FilterTabs';
import PropertyCards from '../components/Home/PropertyList';
import Services from '../components/Home/Services';
import Agents from '../components/Home/Agents';
import Feedback from '../components/Home/Feedback';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <HeroSection />
      <FilterTabs />
      <PropertyCards/>
      <Services/>
      <Agents/>
      <Feedback/>
      <Footer/>
    </>
  );
}
export default Home;