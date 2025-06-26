import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does online astrology consultation work?",
    answer: "Our online astrology consultation connects you with expert astrologers via call or chat. You can discuss your concerns, share your birth details, and receive personalized guidance based on your astrological chart.",
  },
  {
    question: "What information do I need to provide for an accurate reading?",
    answer: "For the most accurate reading, you should provide your date of birth, time of birth, and place of birth. This information helps the astrologer create your precise birth chart for analysis.",
  },
  {
    question: "How long does a typical consultation last?",
    answer: "A typical consultation lasts between 15 to 30 minutes, depending on the complexity of your questions and the package you choose. You can always extend the session if needed.",
  },
  {
    question: "Are the consultations confidential?",
    answer: "Absolutely. We maintain strict confidentiality for all consultations. Your personal information and the details discussed during the session remain private and secure.",
  },
  {
    question: "Can astrology really predict my future?",
    answer: "Astrology provides insights into potential future trends based on planetary positions and their influence on your birth chart. While it can indicate possibilities and tendencies, remember that you always have free will to make choices.",
  },
  {
    question: "What if I'm not satisfied with my consultation?",
    answer: "We have a satisfaction guarantee policy. If you're not satisfied with your consultation, please contact our customer support within 24 hours, and we'll arrange another session with a different astrologer or provide a refund.",
  },
];

const FAQ = () => {
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
            Most Trusted <span className="text-yellow-600">Astrology Platform</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Find answers to common questions about our astrology services. Your peace of mind is our priority.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-yellow-200">
                <AccordionTrigger className="text-left font-medium text-lg hover:text-yellow-600 text-gray-800">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;