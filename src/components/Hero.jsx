import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PhoneCall, Users, ChevronRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import bgImg from "../assets/images/bannerAstro.jpg";
import bannerPhone from "../assets/images/bannerPhone.png"

const Hero = () => {
  return (
    <section className="mt-[5.5rem] pt-8 pb-0 md:pb-6 relative overflow-hidden min-h-[35vh] md:min-h-screen flex flex-col justify-center">
  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <>
  {/* Mobile image */}
  <img
    src={bannerPhone}
    alt="Astrology Background Mobile"
    className="w-full h-full object-contain block md:hidden"
  />

  {/* Desktop image */}
  <img
    src={bgImg}
    alt="Astrology Background Desktop"
    className="w-full h-full object-cover hidden md:block"
  />
</>
  </div>

  {/* Content */}
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center text-white">
      {/* Heading */}
      {/* <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 drop-shadow-lg"
      >
        Your Trusted Guide to the Stars
      </motion.h1> */}

      {/* Subtext */}
      {/* <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-10 drop-shadow-sm"
      >
        Connect with India’s Best Astrologers for instant guidance on love, career, and life's challenges. Personalized readings, 24/7 availability.
      </motion.p> */}

      {/* Buttons */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
      >
        <Button size="lg" className="bg-yellow-500 text-black font-semibold py-3 px-8 rounded-lg hover:scale-105 transition-transform">
          <PhoneCall className="mr-2 h-6 w-6" /> Talk with Astrologers
        </Button>
        <Button size="lg" variant="outline" className="border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-black transition-colors">
          <Users className="mr-2 h-6 w-6" /> View All Astrologers
        </Button>
      </motion.div> */}

      {/* Stats */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-white/90"
      >
        <div className="flex items-center">
          <Star className="h-5 w-5 mr-1.5" fill="white" />
          <span>4.9/5 User Rating</span>
        </div>
        <div className="flex items-center">
          <Users className="h-5 w-5 mr-1.5" />
          <span>500+ Verified Astrologers</span>
        </div>
        <div className="flex items-center">
          <PhoneCall className="h-5 w-5 mr-1.5" />
          <span>24/7 Support</span>
        </div>
      </motion.div> */}
    </div>
  </div>

  {/* Gradient Overlay */}
  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent opacity-80"></div>
</section>

  );
};

export default Hero;