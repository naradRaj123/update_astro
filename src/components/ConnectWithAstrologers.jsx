import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare as MessageSquareText, Video } from 'lucide-react';

const ConnectWithAstrologers = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-yellow-100 via-yellow-100 to-yellow-100 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl main-title-color md:text-4xl font-bold mb-6">
            Connect With Astrologers Instantly
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto color-black">
            Choose your preferred way to connect and get immediate astrological guidance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-xl hover:bg-white/30 transition-all"
            >
              <Phone className="h-12 w-12 mx-auto mb-4 color-black " />
              <h3 className="text-2xl font-semibold mb-2">Call Astrologer</h3>
              <p className="color-black /80 mb-6">Speak directly with an astrologer for a personalized voice consultation.</p>
              <Button size="lg" className="bg-white text-yellow-600 hover:bg-gray-100 w-full font-semibold">
                Start Call
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-xl hover:bg-white/30 transition-all"
            >
              <MessageSquareText className="h-12 w-12 mx-auto mb-4 color-black " />
              <h3 className="text-2xl font-semibold mb-2">Chat with Astrologer</h3>
              <p className="color-black /80 mb-6">Get your questions answered through a live chat session with an expert.</p>
              <Button size="lg" className="bg-white text-yellow-600 hover:bg-gray-100 w-full font-semibold">
                Start Chat
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-xl hover:bg-white/30 transition-all"
            >
              <Video className="h-12 w-12 mx-auto mb-4 color-black" />
              <h3 className="text-2xl font-semibold mb-2">Video Call (Coming Soon)</h3>
              <p className="color-black mb-6">Connect face-to-face with astrologers for an immersive experience.</p>
              <Button size="lg" className="bg-white/50 text-yellow-700 w-full font-semibold cursor-not-allowed" disabled>
                Notify Me
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConnectWithAstrologers;