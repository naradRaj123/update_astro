import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Astrologer = () => {
  const [astrologerList, setAstrologerList] = useState([]);
  const navigate = useNavigate();

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
  }, []);

  return (
    <>
    <Navbar/>
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">
            Our Expert <span className="cosmic-text">Astrologers</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Connect with India's most trusted astrologers for personalized guidance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {astrologerList.length > 0 ? astrologerList.map((astrologer, index) => (
            <motion.div
              key={astrologer._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden h-full shadow-sm">
                <div className="relative">
                  <img
                    src={astrologer.image || "https://via.placeholder.com/300x200?text=No+Image"}
                    alt={astrologer.astroName}
                    className="w-full h-48 object-cover"
                  />
                  <Badge
                    className="absolute top-3 right-3"
                    variant={astrologer.status === "Online" ? "cosmic" : "secondary"}
                  >
                    {astrologer.status || "Offline"}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{astrologer.astroName || "No Name"}</h3>
                      <p className="text-sm text-gray-500">{astrologer.specialty || "N/A"}</p>
                    </div>
                    <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                      <span className="text-sm font-semibold">{astrologer.rating || "4.5"}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Experience:</strong> {astrologer.experience || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Languages:</strong> {astrologer.langauge || "N/A"}
                  </p>

                  <div className="flex flex-wrap gap-1 my-2">
                    {Array.isArray(astrologer.expertise) && astrologer.expertise.length > 0
                      ? astrologer.expertise.map((topic, i) => (
                          <Badge key={i} variant="outline">{topic}</Badge>
                        ))
                      : <Badge variant="outline">No Expertise</Badge>}
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full"
                      onClick={() => navigate(`/karmkandidet/${astrologer._id}`)}
                    >
                      Book for Puja
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )) : (
            <div className="col-span-full text-center text-gray-500 text-lg">
              No Astrologers Found
            </div>
          )}
        </div>

        <div className="text-center mt-10">
          <Button size="lg" className="cosmic-gradient">
            View All Astrologers
          </Button>
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default Astrologer;
