import React from "react";
import { motion } from "framer-motion";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    name: "Priya S.",
    location: "Mumbai",
    rating: 5,
    title: "Incredibly Accurate!",
    text: "The career guidance I received was spot on and helped me make a crucial decision. Highly recommend!",
    avatarFallback: "PS",
  },
  {
    name: "Rajesh K.",
    location: "Delhi",
    rating: 5,
    title: "Life-Changing Insights",
    text: "My relationship reading provided so much clarity. I understand my partner better now. Thank you, InstaAstro!",
    avatarFallback: "RK",
  },
  {
    name: "Anita V.",
    location: "Bangalore",
    rating: 4,
    title: "Very Helpful",
    text: "The astrologer was patient and listened to all my concerns. The remedies suggested were simple and effective.",
    avatarFallback: "AV",
  },
  {
    name: "Vikram C.",
    location: "Chennai",
    rating: 5,
    title: "Best Astrology Platform",
    text: "I've tried a few platforms, but InstaAstro has the most genuine and knowledgeable astrologers. 24/7 support is a plus!",
    avatarFallback: "VC",
  },
];

const CustomerReviews = () => {
  return (
    <section id="testimonials" className="py-16 bg-yellow-50 star-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            CUSTOMERS <span className="text-yellow-600">REVIEWS</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Hear what our valued clients have to say about their experiences with InstaAstro.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="testimonial-card rounded-xl p-6 shadow-lg border-yellow-300 hover:shadow-yellow-400/30 transition-shadow">
                <CardContent className="flex flex-col">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-14 w-14 border-2 border-yellow-500">
                       <AvatarFallback className="bg-yellow-500 text-white text-xl">
                        {review.avatarFallback}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <h4 className="font-semibold text-lg text-gray-800">{review.name}</h4>
                      <p className="text-sm text-gray-500">{review.location}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500" fill="currentColor" />
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <Star key={i + review.rating} className="h-5 w-5 text-gray-300" />
                    ))}
                  </div>
                  <h5 className="font-semibold text-md text-gray-700 mb-2">{review.title}</h5>
                  <p className="text-gray-600 leading-relaxed">{review.text}</p>
                  <div className="flex items-center mt-4 space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1 text-green-500" /> Helpful
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1 text-blue-500" /> Reply
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;