import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gem, Leaf, Sun, Moon, Star } from "lucide-react";

const remedies = [
  {
    icon: <Gem className="h-10 w-10 text-yellow-500" />,
    title: "Gemstone Therapy",
    description: "Harness the power of specific gemstones to balance energies and attract positivity.",
    color: "bg-pink-100",
    textColor: "text-pink-600"
  },
  {
    icon: <Leaf className="h-10 w-10 text-yellow-500" />,
    title: "Herbal Remedies",
    description: "Utilize traditional herbs and natural solutions to improve well-being and harmony.",
    color: "bg-green-100",
    textColor: "text-green-600"
  },
  {
    icon: <Sun className="h-10 w-10 text-yellow-500" />,
    title: "Planetary Poojas",
    description: "Perform specific rituals and poojas to appease planetary influences and gain blessings.",
    color: "bg-orange-100",
    textColor: "text-orange-600"
  },
  {
    icon: <Moon className="h-10 w-10 text-yellow-500" />,
    title: "Mantra Chanting",
    description: "Recite powerful mantras to create positive vibrations and overcome obstacles.",
    color: "bg-blue-100",
    textColor: "text-blue-600"
  },
];

const AstrologicalRemedies = () => {
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
            Astrological Remedies for a <span className="text-yellow-600">Better Life</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover effective astrological solutions to enhance your life, overcome challenges, and attract prosperity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {remedies.map((remedy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`shadow-lg hover:shadow-xl transition-shadow border-t-4 ${remedy.textColor.replace('text-', 'border-')}`}>
                <CardHeader>
                  <div className={`p-3 rounded-full inline-block mb-4 ${remedy.color}`}>
                    {React.cloneElement(remedy.icon, { className: `h-10 w-10 ${remedy.textColor}` })}
                  </div>
                  <CardTitle className={`text-xl font-semibold ${remedy.textColor}`}>{remedy.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{remedy.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AstrologicalRemedies;