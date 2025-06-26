
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PhoneCall, MessageCircle } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-16 cosmic-gradient text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Discover Your Cosmic Path?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Connect with our expert astrologers now and get answers to life's most pressing questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              <PhoneCall className="mr-2 h-5 w-5" /> Talk to Astrologer
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <MessageCircle className="mr-2 h-5 w-5" /> Chat Consultation
            </Button>
          </div>
          <p className="mt-6 text-white/80">
            First-time users get 5 minutes free consultation!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
