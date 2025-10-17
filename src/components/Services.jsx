
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Horoscope Reading",
    description: "Get detailed insights about your future based on your birth chart.",
    icon: "🌟",
  },
  {
    title: "Relationship Compatibility",
    description: "Find out if you and your partner are truly compatible for a long-term relationship.",
    icon: "❤️",
  },
  {
    title: "Career Guidance",
    description: "Discover the best career path aligned with your planetary positions.",
    icon: "💼",
  },
  {
    title: "Marriage Prediction",
    description: "Learn about your marriage prospects, timing, and compatibility.",
    icon: "💍",
  },
  {
    title: "Financial Forecast",
    description: "Get insights about your financial future and investment opportunities.",
    icon: "💰",
  },
  {
    title: "Vastu Consultation",
    description: "Optimize your living and working spaces for positive energy flow.",
    icon: "🏠",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-16 bg-white star-bg common-margin-top">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="cosmic-text">Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive astrological solutions for every aspect of your life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="service-card bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              {/* <Button variant="ghost" className="text-primary hover:text-primary/80 p-0 flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button> */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
