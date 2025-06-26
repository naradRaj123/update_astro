import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LifeBuoy, MessageSquare, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const SupportOptionCard = ({ icon, title, description, actionText, actionLink, isExternal = false }) => {
  const Icon = icon;
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl h-full flex flex-col border border-yellow-200">
        <CardHeader className="items-center text-center pt-6">
          <div className="p-3 bg-yellow-100 rounded-full mb-3">
            <Icon className="h-10 w-10 text-yellow-600" />
          </div>
          <CardTitle className="text-xl font-semibold text-gray-800">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center flex-grow">
          <p className="text-gray-600 text-sm mb-4">{description}</p>
        </CardContent>
        <div className="p-4 mt-auto">
          {isExternal ? (
            <a href={actionLink} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button className="w-full btn-primary-theme text-gray-800">{actionText}</Button>
            </a>
          ) : (
            <Link to={actionLink} className="w-full">
              <Button className="w-full btn-primary-theme text-gray-800">{actionText}</Button>
            </Link>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

const SupportPage = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-yellow-50">
      <motion.div
        className="container mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="shadow-2xl rounded-xl overflow-hidden border-2 border-yellow-400 mb-10">
          <CardHeader className="text-center p-8 bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-300">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="mx-auto bg-white rounded-full p-4 inline-block shadow-lg mb-4"
            >
              <LifeBuoy className="h-16 w-16 text-yellow-600" />
            </motion.div>
            <CardTitle className="text-4xl font-bold text-gray-800">Help & Support</CardTitle>
            <CardDescription className="text-lg text-gray-700 mt-2">
              We're here to help! Choose a support option below.
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SupportOptionCard
            icon={MessageSquare}
            title="Live Chat Support"
            description="Chat with our support team for immediate assistance during business hours."
            actionText="Start Live Chat"
            actionLink="/live-chat-support" 
          />
          <SupportOptionCard
            icon={Mail}
            title="Email Support"
            description="Send us an email with your query, and we'll get back to you within 24 hours."
            actionText="Send an Email"
            actionLink="mailto:support@astrotruth.com"
            isExternal={true}
          />
          <SupportOptionCard
            icon={Phone}
            title="Phone Support"
            description="Call us directly for any urgent issues or complex queries. Available Mon-Fri, 9am-6pm."
            actionText="Call +1 (234) 567-8900"
            actionLink="tel:+12345678900"
            isExternal={true}
          />
        </div>
        <div className="mt-12 text-center">
          <Link to="/faq">
            <Button variant="outline" size="lg" className="border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white">
              Check our FAQs
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SupportPage;