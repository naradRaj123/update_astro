
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, PhoneCall, MessageCircle, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("https://astro-talk-backend.onrender.com/", {
  autoConnect: true,  
});

const Astrologers = () => {
  const [astrologerList, setAstrologerList] = useState([]);

  const fetchAstrologers = async () => {
    try {
      const res = await axios.get("https://astro-talk-backend.onrender.com/web/astro/astrolist");
      setAstrologerList(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching astrologers:", err);
    }
  };

  useEffect(() => {
    fetchAstrologers();

    // listen message from backend
    socket.on("onlineUsers", (data) => {
      console.log("✅ All Online users:", data);
    });
    socket.on('onlineAstrologers',(allAstro)=>{
      console.log(allAstro);
    })
  }, []);


  return (
    <section id="astrologers" className=" md:py-16 bg-gray-50 common-margin-top">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Our Expert <span className="cosmic-text">Astrologers</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with India's most trusted astrologers for personalized guidance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {astrologerList.map((astrologer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="astrologer-card overflow-hidden h-full">
                <div className="relative">
                  <img alt={`Astrologer ${astrologer.astroName}`} className="w-full h-48 object-cover" src="https://images.unsplash.com/photo-1457422373114-0d5cb3d0965b" />
                  <div className="absolute top-3 right-3">
                    {/* <Badge variant={astrologer.status === "Online" ? "cosmic" : "secondary"} className="font-medium">
                      {astrologer.status}
                    </Badge> */}
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{astrologer.astroName}</h3>
                      {/* <p className="text-sm text-gray-500">{astrologer.specialty}</p> */}
                    </div>
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                      {/* <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" /> */}
                      {/* <span className="text-sm font-medium">{astrologer.rating}</span> */}
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Experience:</span> {astrologer.experience} + Years
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Languages:</span> {astrologer.langauge}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">{astrologer.expertise}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      {/* <Button size="sm" className="cosmic-gradient rounded-full">
                        <MessageCircle className="h-4 w-4" />
                      </Button> */}
                      <Button size="sm" className="cosmic-gradient rounded-full">
                        <PhoneCall className="h-4 w-4 " />
                      </Button>
                      <Button size="sm" className="cosmic-gradient rounded-full">
                        <Video className="h-4 w-4 " />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button size="lg" className="cosmic-gradient">
            View All Astrologers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Astrologers;
