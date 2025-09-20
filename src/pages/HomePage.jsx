import React from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Astrologers from "@/components/Astrologers";
import Services from "@/components/Services";
import CustomerReviews from "@/components/CustomerReviews";
import FAQ from "@/components/FAQ";
import Blog from "@/components/Blog";
import CallToAction from "@/components/CallToAction";
import ChooseZodiac from "@/components/ChooseZodiac";
import InNews from "@/components/InNews";
import OurPromise from "@/components/OurPromise";
import WhyTalkToAstrologers from "@/components/WhyTalkToAstrologers";
import ConnectWithAstrologers from "@/components/ConnectWithAstrologers";
import UnderstandingAstrology from "@/components/UnderstandingAstrology";
import AstrologicalRemedies from "@/components/AstrologicalRemedies";
import CelebrityCustomers from "@/components/CelebrityCustomers";
import AccurateAnswers from "@/components/AccurateAnswers";
import VideosPage from "./VideosPage";
import VideoCall from "./VideoCall/VideoCall";
import AboutUs from "./AboutUs";


const HomePage = () => {
  return (
    <>
      <Hero />
      <ConnectWithAstrologers />
      <Astrologers />
      <Features />
      <ChooseZodiac /> 
      <OurPromise />
      <AstrologicalRemedies />
      <CelebrityCustomers />
      <AccurateAnswers />
      <Services />
      <WhyTalkToAstrologers />
      <CustomerReviews />
      <InNews />
      <UnderstandingAstrology />
      {/* <VideosPage /> */}
      <FAQ />
      <Blog />
      <AboutUs />
      {/* <CallToAction /> */}
      {/* <VideoCall /> */}
    </>
  );
};

export default HomePage;