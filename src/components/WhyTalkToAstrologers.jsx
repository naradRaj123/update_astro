import React from "react";
import { motion } from "framer-motion";
import { Award, BookOpen, Heart, TrendingUp, MessageCircle } from "lucide-react";

const reasons = [
  {
    icon: <Award className="h-8 w-8 text-yellow-600" />,
    title: "Expert Guidance",
    description: "Receive insights from seasoned astrologers with years of experience.",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-yellow-600" />,
    title: "Personalized Readings",
    description: "Get detailed predictions and advice tailored to your unique birth chart.",
  },
  {
    icon: <Heart className="h-8 w-8 text-yellow-600" />,
    title: "Relationship Clarity",
    description: "Understand your love life, compatibility, and future with your partner.",
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-yellow-600" />,
    title: "Career & Finance Solutions",
    description: "Navigate your professional path and financial decisions with confidence.",
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-yellow-600" />,
    title: "Instant & Confidential",
    description: "Connect instantly and discuss your concerns in a private, secure environment.",
  },
];

const WhyTalkToAstrologers = () => {
  return (
    <section className="py-16 bg-yellow-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Talk To Our <span className="text-yellow-600">Astrologers?</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover the benefits of connecting with our trusted astrology experts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-yellow-100 rounded-full mr-4">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-semibold text-yellow-700">{reason.title}</h3>
              </div>
              <p className="text-gray-600">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTalkToAstrologers;