import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare as MessageSquareText, Video, ShoppingBag, CalendarCheck } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const ConnectWithAstrologers = () => {

  const navigate = useNavigate();
  return (
    <section className="py-10 md:py-16 bg-gradient-to-r from-yellow-100 via-yellow-100 to-yellow-100 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl main-title-color md:text-4xl font-bold mb-6">
            Connect With Astrologers Instantly
          </h3>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto color-black">
            Choose your preferred way to connect and get immediate astrological guidance.
          </p>
          <div className="grid grid-cols-1 grid-cols-4 gap-8 max-w-8xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-md p-2 md:p-8 rounded-xl shadow-xl hover:bg-white/30 transition-all h-fit"
              onClick={() => navigate("/astrologers")}
            >
              <Phone className="h-8 w-10 mx-auto md:mb-4 text-black" />

              {/* Hide on mobile, show on md and above */}
              <h3 className="text-xl font-semibold hidden md:block">
                Talk to Astrologer
              </h3>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-md p-2 md:p-8 rounded-xl shadow-xl hover:bg-white/30 transition-all h-fit"
              onClick={() => navigate("/astrologers")}
            >
              <MessageSquareText className="h-8 w-10 mx-auto md:mb-4 color-black " />
              <h3 className="text-xl font-semibold hidden md:block">Chat with Astrologer</h3>
              {/* <p className="color-black /80 mb-6">Get your questions answered through a live chat session with an expert.</p>
              <Button size="lg" className="bg-white text-yellow-600 hover:bg-gray-100 w-full font-semibold">
                Start Chat
              </Button> */}
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-md p-2 md:p-8 rounded-xl shadow-xl hover:bg-white/30 transition-all h-fit"
              onClick={() => navigate("/store")}
            >
              <ShoppingBag className="h-8 w-10 mx-auto md:mb-4 color-black" />
              <h3 className="text-xl font-semibold hidden md:block">Astrotruth Shop</h3>
              {/* <p className="color-black mb-6">Connect face-to-face with astrologers for an immersive experience.</p>
              <Button size="lg" className="bg-white/50 text-yellow-700 w-full font-semibold cursor-not-allowed" disabled>
                Notify Me
              </Button> */}
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-md p-2 md:p-8 rounded-xl shadow-xl hover:bg-white/30 transition-all h-fit"
              onClick={() => navigate("/store")}
            >
              <CalendarCheck className="h-8 w-10 mx-auto md:mb-4 color-black" />
              <h3 className="text-xl font-semibold hidden md:block">Book a Puja</h3>
              {/* <p className="color-black mb-6">Connect face-to-face with astrologers for an immersive experience.</p>
              <Button size="lg" className="bg-white/50 text-yellow-700 w-full font-semibold cursor-not-allowed" disabled>
                Notify Me
              </Button> */}
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConnectWithAstrologers;