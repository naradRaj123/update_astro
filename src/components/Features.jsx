
import React from "react";
import { motion } from "framer-motion";
import { Star, Shield, Clock, Phone, Users, Award } from "lucide-react";

const features = [
  {
    icon: <Star className="h-6 w-6 text-yellow-500" />,
    title: "Expert Astrologers",
    description: "Consult with India's most experienced and trusted astrologers.",
  },
  {
    icon: <Shield className="h-6 w-6 text-green-500" />,
    title: "100% Privacy",
    description: "Your personal information and consultations remain completely confidential.",
  },
  {
    icon: <Clock className="h-6 w-6 text-blue-500" />,
    title: "24/7 Availability",
    description: "Access astrological guidance anytime, day or night.",
  },
  {
    icon: <Phone className="h-6 w-6 text-purple-500" />,
    title: "Instant Connect",
    description: "No waiting time. Connect with an astrologer within seconds.",
  },
  {
    icon: <Users className="h-6 w-6 text-pink-500" />,
    title: "Verified Experts",
    description: "All astrologers are thoroughly vetted for authenticity and expertise.",
  },
  {
    icon: <Award className="h-6 w-6 text-amber-500" />,
    title: "Satisfaction Guarantee",
    description: "Not satisfied with your consultation? Get your money back.",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="cosmic-text">Astrotruth</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the difference with our premium astrology consultation services
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="bg-gray-50 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
