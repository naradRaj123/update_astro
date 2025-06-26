import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Users, Target, Eye, HeartHandshake as Handshake } from 'lucide-react';

const AboutPage = () => {
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
              <Users className="h-16 w-16 text-yellow-600" />
            </motion.div>
            <CardTitle className="text-4xl font-bold text-gray-800">About Astrotruth</CardTitle>
            <CardDescription className="text-lg text-gray-700 mt-2">
              Your trusted partner in navigating life's journey through astrology.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-10 space-y-8 bg-white">
            <section>
              <h2 className="text-2xl font-semibold text-yellow-600 mb-3">
                About Astrotruth
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Astrotruth is the best astrology website for online Astrology predictions. Talk to Astrologer on call and get answers to all your worries by seeing the future life through Astrology Kundli Predictions from the best Astrologers from India. Get best future predictions related to Marriage, love life, Career or Health over call, chat, query or report.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-yellow-600 mb-3 flex items-center">
                <Target className="mr-2 h-7 w-7" /> Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">
                At Astrotruth, our mission is to provide accessible, authentic, and insightful astrological guidance to everyone. We believe that astrology is a powerful tool for self-discovery, understanding, and making informed life decisions. We strive to connect you with genuine and experienced astrologers who can offer clarity and support.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-yellow-600 mb-3 flex items-center">
                <Eye className="mr-2 h-7 w-7" /> Our Vision
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We envision a world where individuals can easily access ancient wisdom to navigate modern challenges. Astrotruth aims to be the leading global platform for astrological services, fostering a community of seekers and guides, and promoting well-being through cosmic knowledge.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-yellow-600 mb-3 flex items-center">
                <Handshake className="mr-2 h-7 w-7" /> Our Values
              </h2>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
                <li><span className="font-semibold">Authenticity:</span> We partner with verified and experienced astrologers.</li>
                <li><span className="font-semibold">Accessibility:</span> Providing guidance anytime, anywhere, through various channels.</li>
                <li><span className="font-semibold">Integrity:</span> Upholding ethical practices and transparency in all our services.</li>
                <li><span className="font-semibold">Empowerment:</span> Helping individuals gain insights to make positive life choices.</li>
                <li><span className="font-semibold">Confidentiality:</span> Ensuring the privacy and security of our users' information.</li>
              </ul>
            </section>
            <section className="text-center mt-8">
              <p className="text-xl text-gray-800 font-semibold">
                Join us on a journey of discovery and enlightenment.
              </p>
              <img  alt="Team of astrologers smiling" class="w-full max-w-lg mx-auto mt-6 rounded-lg shadow-md" src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7" />
            </section>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AboutPage;