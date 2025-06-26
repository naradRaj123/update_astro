import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PhoneCall, Users, ChevronRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="pt-20 md:pt-28 pb-10 md:pb-16  relative overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="absolute inset-0 z-0"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center main-title-color">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6  main-title-color drop-shadow-lg"
          >
            Your Trusted Guide to the Stars
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl mb-10 color-black max-w-3xl mx-auto drop-shadow-sm"
          >
            Connect with India’s Best Astrologers for instant guidance on love, career, and life's challenges. Personalized readings, 24/7 availability.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button size="lg" className=" common-btn-color font-semibold text-lg py-3 px-8 pulse">
              <PhoneCall className="mr-2 h-6 w-6" /> Talk with Astrologers
            </Button>
            <Button size="lg" variant="outline" className=" common-btn-color font-semibold text-lg py-3 px-8">
              <Users className="mr-2 h-6 w-6" /> View All Astrologers
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-white/90"
          >
            <div className="flex items-center color-black">
              <Star className="h-5 w-5  mr-1.5" fill="white" />
              <span>4.9/5 User Rating</span>
            </div>
            <div className="flex items-center color-black">
              <Users className="h-5 w-5  mr-1.5" />
              <span>500+ Verified Astrologers</span>
            </div>
            <div className="flex items-center color-black">
              <PhoneCall className="h-5 w-5  mr-1.5" />
              <span>24/7 Support</span>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent opacity-80"></div>
    </section>
  );
};

export default Hero;