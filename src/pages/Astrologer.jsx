import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle, Star, Phone, Video, Shield, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VideoCall from "./VideoCall/VideoCall";
import VoiceCall from "./VoiceCall/VoiceCall";
import { io } from 'socket.io-client';
import { cn } from "@/lib/utils";

const userData = localStorage.getItem("user")
const jsUserData = JSON.parse(userData)

const socket = io("https://astro-talk-backend.onrender.com/", {
  autoConnect: true,
});

const Astrologer = () => {
  const [astrologerList, setAstrologerList] = useState([]);
  const navigate = useNavigate();
  const [onlineAstrologers, setOnlineAstrologers] = useState([]);

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

    socket.on("onlineUsers", (data) => {
      console.log("✅ All Online users:", data);
    });

    socket.on("onlineAstrologers", (data) => {
      console.log("✅ All Online astrologers:", data);
    });

    socket.on("onlineAstrologers", (onlineAstrolist) => {
      console.log("🔮 Full Online Astrologers:", onlineAstrolist);
    });

    return () => {
      socket.off("onlineAstrologers");
    };
  }, []);

  useEffect(() => {
    socket.on("onlineAstrologers", (data) => {
      console.log("✅ All online astrologers:", data);
    })
  }, []);

  socket.on("onlineAstrologers", ({ onlineAstrolist }) => {
    console.log("🔮 Full Online Astrologers:", onlineAstrolist);
    setOnlineAstrologers(Object.keys(onlineAstrolist || {}));
  });

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return `₹${price || '25'}/min`;
  };

  const getStatusColor = (isOnline) => {
    return isOnline ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 py-8 mt-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-2">
              Our Expert <span className="cosmic-text">Astrologers</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Connect with India's most trusted astrologers for personalized guidance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {astrologerList.length > 0 ? (
              astrologerList.map((astrologer, index) => {
                const isOnline = onlineAstrologers.includes(astrologer._id);
                
                return (
                  <motion.div
                    key={astrologer._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl border-2 border-gray-100">
                      <CardContent className="p-4">
                        {/* Header Section */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start space-x-3 flex-1">
                            <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                              <AvatarImage 
                                src={astrologer.image || "https://via.placeholder.com/100?text=Astro"} 
                                alt={astrologer.astroName}
                              />
                              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold">
                                {astrologer.astroName?.split(' ').map(n => n[0]).join('') || "A"}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold text-gray-800 text-sm">
                                  {astrologer.astroName || "Astrologer"}
                                </h3>
                                <Shield className="h-3 w-3 text-blue-500" />
                              </div>
                              
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="flex items-center space-x-1">
                                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                  <span className="text-xs text-gray-600">{astrologer.rating || "4.5"}</span>
                                </div>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-600">{astrologer.experience || "5+ years"}</span>
                              </div>

                              <Badge className={cn("text-xs", getStatusColor(isOnline))}>
                                {isOnline ? "Online" : "Offline"}
                              </Badge>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-bold text-purple-600">
                              {formatPrice(astrologer.price)}
                            </p>
                            <p className="text-xs text-gray-500">Starts from</p>
                          </div>
                        </div>

                        {/* Astrologer Details */}
                        <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-gray-50 rounded-xl">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4 text-purple-500" />
                            <span className="truncate">{astrologer.experience || "5+ yrs"}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <User className="h-4 w-4 text-purple-500" />
                            <span className="truncate">{astrologer.specialty || "Vedic"}</span>
                          </div>
                          {astrologer.langauge && (
                            <div className="col-span-2 flex items-center space-x-2 text-sm text-gray-600">
                              <span className="font-medium">Languages:</span>
                              <span className="truncate">{astrologer.langauge}</span>
                            </div>
                          )}
                        </div>

                        {/* Expertise Tags */}
                        {astrologer.expertise && astrologer.expertise.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                              <Badge variant="outline" className="text-xs text-purple-600 border-purple-200">
                                {astrologer?.expertise}
                              </Badge>
                            {astrologer.expertise.length > 3 && (
                              <Badge variant="outline" className="text-xs text-gray-500 border-gray-200">
                                +{astrologer.expertise.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <Button 
                            size="sm"
                            className="flex-1 bg-purple-500 hover:bg-purple-600 text-white rounded-xl"
                            onClick={() => navigate("/user-chats", {
                              state: {
                                user: {
                                  id: astrologer._id,
                                  name: astrologer.astroName,
                                  img: astrologer.image,
                                },
                              }
                            })}
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Chat
                          </Button>
                          
                          <VoiceCall
                            channel={astrologer.agoraChannel}
                            token={astrologer.agoraToken}
                            uid={ Math.floor(Math.random() * 1000000)}
                            iconOnly={true}
                            className="rounded-xl"
                          />

                          <VideoCall
                            channel={astrologer.agoraChannel}
                            token={astrologer.agoraToken}
                            uid={ Math.floor(Math.random() * 1000000)}
                            iconOnly={true}
                            className="rounded-xl"
                          />
                        </div>

                        {/* Quick Stats */}
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                          <span>⭐ {astrologer.rating || "4.5"}/5</span>
                          <span>👥 1.2k+ sessions</span>
                          <span>💬 98% response</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="flex flex-col items-center justify-center">
                  <User className="h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Astrologers Found</h3>
                  <p className="text-gray-500">Please check back later for available astrologers.</p>
                </div>
              </div>
            )}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl shadow-md"
            >
              View All Astrologers
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <Card className="text-center p-6 bg-white shadow-sm border-0 rounded-2xl">
              <div className="text-2xl font-bold text-purple-600">50+</div>
              <div className="text-sm text-gray-600">Expert Astrologers</div>
            </Card>
            <Card className="text-center p-6 bg-white shadow-sm border-0 rounded-2xl">
              <div className="text-2xl font-bold text-green-600">10K+</div>
              <div className="text-sm text-gray-600">Sessions Done</div>
            </Card>
            <Card className="text-center p-6 bg-white shadow-sm border-0 rounded-2xl">
              <div className="text-2xl font-bold text-blue-600">98%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </Card>
            <Card className="text-center p-6 bg-white shadow-sm border-0 rounded-2xl">
              <div className="text-2xl font-bold text-orange-600">24/7</div>
              <div className="text-sm text-gray-600">Available</div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default Astrologer;