import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, UserCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const celebrityReviews = [
  {
    name: "Aarav Sharma",
    profession: "Film Actor",
    reviewText: "InstaAstro's guidance has been invaluable for my career choices. Their astrologers are truly insightful!",
    avatarFallback: "AS",
    videoThumbnailAlt: "Video thumbnail of Aarav Sharma giving a testimonial",
  },
  {
    name: "Priya Singh",
    profession: "Playback Singer",
    reviewText: "Whenever I face a dilemma, I turn to InstaAstro. Their predictions are accurate and advice practical.",
    avatarFallback: "PS",
    videoThumbnailAlt: "Video thumbnail of Priya Singh sharing her experience",
  },
  {
    name: "Rohan Kapoor",
    profession: "TV Personality",
    reviewText: "The Vastu consultation for my new home was excellent. I feel a positive shift in energy already!",
    avatarFallback: "RK",
    videoThumbnailAlt: "Video thumbnail of Rohan Kapoor discussing Vastu consultation",
  },
];

const CelebrityCustomers = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-yellow-600">Celebrity Customers</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Hear from renowned personalities who trust InstaAstro for astrological guidance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {celebrityReviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-yellow-200">
                <div className="relative">
                  <img 
                    className="w-full h-56 object-cover"
                    alt={review.videoThumbnailAlt}
                   src="https://images.unsplash.com/photo-1495488170890-ee9e49ff335d" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <PlayCircle className="h-16 w-16 text-white/80 hover:text-white cursor-pointer transition-colors" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <Avatar className="h-12 w-12 mr-3 border-2 border-yellow-500">
                      <AvatarFallback className="bg-yellow-500 text-white">
                        {review.avatarFallback}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-700">{review.name}</h3>
                      <p className="text-sm text-gray-500">{review.profession}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm italic">"{review.reviewText}"</p>
                  <div className="flex items-center mt-4 text-xs text-green-600">
                    <UserCheck className="h-4 w-4 mr-1" /> Verified Customer
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

export default CelebrityCustomers;