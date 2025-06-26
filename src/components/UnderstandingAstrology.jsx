import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";

const UnderstandingAstrology = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img  alt="Stylized image representing astrology concepts like planets, zodiac signs, and constellations." className="rounded-xl shadow-2xl w-full h-auto object-cover" src="https://images.unsplash.com/photo-1685478237361-a5b50d0eb76b" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block px-3 py-1 text-sm font-semibold text-yellow-700 bg-yellow-100 rounded-full mb-3">
              Unlock Cosmic Wisdom
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Understanding <span className="text-yellow-600">Astrology</span>
            </h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              Astrology is an ancient art and science that studies the movements and relative positions of celestial objects as a means for divining information about human affairs and terrestrial events. It offers profound insights into your personality, relationships, career, and life path.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our expert astrologers use these cosmic patterns to provide guidance, helping you make informed decisions and navigate life's challenges with greater clarity and confidence.
            </p>
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold">
              Learn More About Astrology <BookOpen className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UnderstandingAstrology;