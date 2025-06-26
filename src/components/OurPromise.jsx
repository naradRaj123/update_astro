import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Headphones, Smile } from "lucide-react";

const promises = [
  {
    icon: <ShieldCheck className="h-10 w-10 text-yellow-500" />,
    title: "Verified Astrologers",
    description: "Connect with genuine, highly experienced, and rigorously vetted astrologers.",
  },
  {
    icon: <Users className="h-10 w-10 text-yellow-500" />,
    title: "Top Astrologers",
    description: "Access a wide network of India's best astrologers, available at your fingertips.",
  },
  {
    icon: <Headphones className="h-10 w-10 text-yellow-500" />,
    title: "24x7 Customer Support",
    description: "Our dedicated support team is always ready to assist you with any queries.",
  },
  {
    icon: <Smile className="h-10 w-10 text-yellow-500" />,
    title: "Happy to Help",
    description: "Your satisfaction is our priority. We strive to provide a positive and insightful experience.",
  },
];

const OurPromise = () => {
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
            Our <span className="text-yellow-600">Promise</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We are committed to providing you with the best astrological guidance and support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {promises.map((promise, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-yellow-50 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-yellow-200"
            >
              <div className="flex justify-center mb-4">
                {promise.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-yellow-700">{promise.title}</h3>
              <p className="text-gray-600">{promise.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPromise;