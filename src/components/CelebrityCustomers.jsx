import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, UserCheck } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import video1 from "../assets/images/video1.mp4";
import video2 from "../assets/images/video2.mp4";
import video3 from "../assets/images/video3.mp4";
import video4 from "../assets/images/video4.mp4";
import video5 from "../assets/images/video5.mp4";
import video6 from "../assets/images/video6.mp4";

const celebrityReviews = [
  {
    name: "Aarav Sharma",
    profession: "Creator",
    reviewText: "AstroTruth's guidance has been invaluable for my career choices. Their astrologers are truly insightful!",
    avatarFallback: "AS",
    video: video1,
    thumbnail: "https://images.unsplash.com/photo-1495488170890-ee9e49ff335d",
  },
  {
    name: "Priya Singh",
    profession: "Creator",
    reviewText: "Whenever I face a dilemma, I turn to AstroTruth. Their predictions are accurate and advice practical.",
    avatarFallback: "PS",
    video: video2,
    thumbnail: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },
  {
    name: "Rohan Kapoor",
    profession: "Creator",
    reviewText: "The Vastu consultation for my new home was excellent. I feel a positive shift in energy already!",
    avatarFallback: "RK",
    video: video3,
    thumbnail: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  },
  {
    name: "Sikha Sharma",
    profession: "Creator",
    reviewText: "AstroTruth's guidance has been invaluable for my career choices. Their astrologers are truly insightful!",
    avatarFallback: "AS",
    video: video4,
    thumbnail: "https://images.unsplash.com/photo-1495488170890-ee9e49ff335d",
  },
  {
    name: "Reena Singh",
    profession: "Creator",
    reviewText: "Whenever I face a dilemma, I turn to AstroTruth. Their predictions are accurate and advice practical.",
    avatarFallback: "PS",
    video: video5,
    thumbnail: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },
  {
    name: "Tania Kapoor",
    profession: "Creator",
    reviewText: "The Vastu consultation for my new home was excellent. I feel a positive shift in energy already!",
    avatarFallback: "RK",
    video: video6,
    thumbnail: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  },
];

const CelebrityCustomers = () => {
  const [playingIndex, setPlayingIndex] = useState(null);
  const videoRefs = useRef([]); // array of refs for all videos

  const handlePlay = (index) => {
    setPlayingIndex(index);
    const video = videoRefs.current[index];
    if (video) {
      video.play();
    }
  };

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Our <span className="text-yellow-600">Celebrity Customers</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Hear from renowned personalities who trust AstroTruth for astrological guidance.
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
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    className="w-full h-56 object-cover"
                    src={review.video}
                    poster={review.poster}
                    controls={playingIndex === index}
                    playsInline
                  />

                  {playingIndex !== index && (
                    <div
                      className="absolute inset-0 bg-black/40 flex items-center justify-center"
                      onClick={() => handlePlay(index)}
                    >
                      <PlayCircle className="h-16 w-16 text-white/80 hover:text-white cursor-pointer transition-colors" />
                    </div>
                  )}
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
