import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, TrendingUp, Users, Shield } from "lucide-react";

const benefits = [
  {
    icon: <CheckCircle className="h-8 w-8 text-yellow-500" />,
    title: "Accurate Predictions",
    description: "Leverage ancient wisdom and modern techniques for precise astrological insights.",
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-yellow-500" />,
    title: "Future Clarity",
    description: "Gain a clearer understanding of your future path in career, love, and life.",
  },
  {
    icon: <Users className="h-8 w-8 text-yellow-500" />,
    title: "Expert Astrologers",
    description: "Consult with a panel of highly experienced and verified astrologers.",
  },
  {
    icon: <Shield className="h-8 w-8 text-yellow-500" />,
    title: "Confidential & Secure",
    description: "Your consultations and personal data are always kept private and secure.",
  },
];

const AccurateAnswers = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-yellow-100 via-yellow-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Astrological Services for Accurate Answers & <span className="text-yellow-600">Better Future</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our comprehensive astrological services are designed to provide you with the clarity and guidance needed to make informed decisions and shape a brighter tomorrow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-yellow-400/30 transition-shadow border border-yellow-200 flex flex-col items-center text-center"
            >
              <div className="p-4 bg-yellow-100 rounded-full mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-yellow-700">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccurateAnswers;