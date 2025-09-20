import React from "react";
import { motion } from "framer-motion";
import { Star, Sun, Moon, Users } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-gray-800 mb-6"
        >
          About <span className="text-primary">AstroTruth</span>
        </motion.h1>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12"
        >
          At <span className="font-semibold text-primary">AstroTruth</span>, we believe in 
          combining ancient astrological wisdom with modern technology to guide you 
          towards clarity, self-discovery, and better decision-making. Whether it’s 
          understanding your kundali, matching horoscopes, or seeking advice from 
          expert astrologers, we bring cosmic insights to your fingertips.
        </motion.p>

        {/* Mission, Vision, Community */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-md rounded-2xl p-6 text-center"
          >
            <Star className="mx-auto h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h3>
            <p className="text-gray-600 text-sm">
              To empower individuals with accurate astrological insights and help 
              them navigate life’s journey with confidence and positivity.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-md rounded-2xl p-6 text-center"
          >
            <Sun className="mx-auto h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Vision</h3>
            <p className="text-gray-600 text-sm">
              To make astrology accessible, authentic, and trustworthy for everyone, 
              blending tradition with innovation.
            </p>
          </motion.div>

          {/* Community */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-md rounded-2xl p-6 text-center"
          >
            <Users className="mx-auto h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Community</h3>
            <p className="text-gray-600 text-sm">
              A trusted platform where users connect with certified astrologers and 
              experience meaningful guidance, anytime, anywhere.
            </p>
          </motion.div>
        </div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Moon className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Discover Your Cosmic Path
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            With AstroTruth, you don’t just get predictions — you gain meaningful 
            guidance rooted in truth, clarity, and authenticity. Explore your future, 
            find answers, and embrace your journey with confidence.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
