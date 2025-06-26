
import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "I was skeptical at first, but the astrologer's predictions were incredibly accurate. The career guidance I received helped me make a life-changing decision.",
    image: "PS",
  },
  {
    name: "Rahul Verma",
    location: "Delhi",
    rating: 5,
    text: "The relationship compatibility reading was eye-opening. It helped me understand my partner better and improved our communication significantly.",
    image: "RV",
  },
  {
    name: "Ananya Patel",
    location: "Bangalore",
    rating: 4,
    text: "The financial forecast was spot on! Following the astrologer's advice, I made some investments that have already started showing positive returns.",
    image: "AP",
  },
  {
    name: "Vikram Singh",
    location: "Pune",
    rating: 5,
    text: "I consulted about my marriage prospects and within the predicted timeframe, I met my soulmate. The accuracy was astonishing!",
    image: "VS",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="cosmic-text">Clients Say</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from people who found guidance and clarity through our astrology services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="testimonial-card rounded-xl p-6 shadow-md"
            >
              <div className="flex items-center mb-4">
                <Avatar className="h-12 w-12 border-2 border-primary">
                  <AvatarFallback className="bg-primary text-white">
                    {testimonial.image}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-500" fill="currentColor" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <Star key={i + testimonial.rating} className="h-4 w-4 text-gray-300" fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700">{testimonial.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
