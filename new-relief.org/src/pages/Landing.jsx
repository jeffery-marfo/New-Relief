import React from "react";
import HeroSection from "../components/HeroSection";
import InfoSection from "../components/InfoSection";
import AboutUs from "../components/AboutUs";
import OurMinistries from "../components/OurMinistries";
import OurCommunity from "../components/OurCommunity";
import ChurchFeed from "../components/ChurchFeed";


const Landing = () => {
  return (
    <div>
      <HeroSection />
      <AboutUs />
      <InfoSection />
      <OurMinistries />
      <OurCommunity/>
      <ChurchFeed/>
      
    </div>
  );
};

export default Landing;
