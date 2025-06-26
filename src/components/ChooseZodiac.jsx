import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const zodiacSigns = [
  { name: "Aries", icon: "♈", date: "Mar 21 - Apr 19" },
  { name: "Taurus", icon: "♉", date: "Apr 20 - May 20" },
  { name: "Gemini", icon: "♊", date: "May 21 - Jun 20" },
  { name: "Cancer", icon: "♋", date: "Jun 21 - Jul 22" },
  { name: "Leo", icon: "♌", date: "Jul 23 - Aug 22" },
  { name: "Virgo", icon: "♍", date: "Aug 23 - Sep 22" },
  { name: "Libra", icon: "♎", date: "Sep 23 - Oct 22" },
  { name: "Scorpio", icon: "♏", date: "Oct 23 - Nov 21" },
  { name: "Sagittarius", icon: "♐", date: "Nov 22 - Dec 21" },
  { name: "Capricorn", icon: "♑", date: "Dec 22 - Jan 19" },
  { name: "Aquarius", icon: "♒", date: "Jan 20 - Feb 18" },
  { name: "Pisces", icon: "♓", date: "Feb 19 - Mar 20" },
];

const ChooseZodiac = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-yellow-50 via-yellow-100 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your <span className="text-yellow-600">Zodiac Sign</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Select your zodiac sign to get personalized insights and daily horoscopes.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {zodiacSigns.map((sign, index) => (
            <motion.div
              key={sign.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="zodiac-card"
            >
              <Card className="text-center p-4 bg-white shadow-lg hover:shadow-yellow-500/30 border-yellow-400 border-2">
                <CardContent className="flex flex-col items-center justify-center">
                  <div className="text-6xl mb-3">{sign.icon}</div>
                  <h3 className="text-xl font-semibold text-yellow-700">{sign.name}</h3>
                  <p className="text-xs text-gray-500">{sign.date}</p>
                  <Button variant="ghost" size="sm" className="mt-3 text-yellow-600 hover:bg-yellow-100">
                    View Details <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChooseZodiac;