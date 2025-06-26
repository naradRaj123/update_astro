import React from "react";
import { motion } from "framer-motion";

const newsLogos = [
  { name: "The Cosmic Times", alt: "The Cosmic Times logo - a stylized star within a circle" },
  { name: "Astro Today", alt: "Astro Today logo - elegant script font with a crescent moon" },
  { name: "Stellar Insights Magazine", alt: "Stellar Insights Magazine logo - a telescope pointing towards a galaxy" },
  { name: "Celestial Chronicle", alt: "Celestial Chronicle logo - an open book with constellations" },
  { name: "Galaxy Gazette", alt: "Galaxy Gazette logo - a swirling galaxy icon" },
  { name: "Zodiac Weekly", alt: "Zodiac Weekly logo - all 12 zodiac symbols arranged in a circle" },
];

const InNews = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            InstaAstro <span className="text-yellow-600">In News</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Recognized by leading publications for our trusted astrological services.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center">
          {newsLogos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex justify-center"
            >
              <img  className="h-12 md:h-16 news-logo" alt={logo.alt} src="https://images.unsplash.com/photo-1485531865381-286666aa80a9" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InNews;