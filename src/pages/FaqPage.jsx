import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-yellow-200">
      <button
        className="flex justify-between items-center w-full py-4 px-2 text-left hover:bg-yellow-50 transition-colors"
        onClick={onClick}
      >
        <span className="text-md font-semibold text-gray-800">{question}</span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-yellow-600" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="px-2 pb-4 text-gray-700 leading-relaxed"
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
};

const FaqPage = () => {
  const [openIndex, setOpenIndex] = React.useState(null);

  const faqs = [
    {
      question: "What is Astrotruth?",
      answer: "Astrotruth is an online platform connecting users with experienced astrologers for personalized consultations, horoscope readings, kundli matching, and various other astrological services and products."
    },
    {
      question: "How do I get a consultation?",
      answer: "You can browse our list of live astrologers, choose one based on their expertise and rating, and then initiate a chat, call, or video session. You can also purchase detailed reports or ask a question."
    },
    {
      question: "Is my personal information safe?",
      answer: "Yes, we take your privacy very seriously. All personal information and consultation details are kept confidential. Please refer to our Privacy Policy for more details."
    },
    {
      question: "How accurate are the predictions?",
      answer: "Astrology is a guidance science. Our astrologers are experienced professionals who provide insights based on ancient astrological principles. However, predictions are subject to interpretation and individual free will."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept various payment methods including UPI, credit cards, debit cards, and popular digital wallets. All transactions are processed securely."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "Refund policies vary depending on the service or product. Generally, consultations once completed are non-refundable. For products, please check the specific return policy. Contact our support team for any issues."
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-yellow-50">
      <motion.div
        className="container mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="shadow-2xl rounded-xl overflow-hidden border-2 border-yellow-400">
          <CardHeader className="text-center p-8 bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-300">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="mx-auto bg-white rounded-full p-4 inline-block shadow-lg mb-4"
            >
              <HelpCircle className="h-16 w-16 text-yellow-600" />
            </motion.div>
            <CardTitle className="text-4xl font-bold text-gray-800">Frequently Asked Questions</CardTitle>
            <CardDescription className="text-lg text-gray-700 mt-2">
              Find answers to common questions about our services.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-10 bg-white">
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <FaqItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => handleToggle(index)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default FaqPage;