
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause,
  Sparkles,
  Heart
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      text: "The guidance I received from Pandit Ravi Shankar completely transformed my career path. His predictions were incredibly accurate and the remedies suggested worked wonders!",
      location: "Mumbai, India",
      date: "2 weeks ago",
      category: "career",
      astrologer: "Pandit Ravi Shankar",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      rating: 5,
      text: "I was skeptical at first, but the love compatibility analysis helped me understand my relationship better. Now we're happily married! Thank you for the wonderful guidance.",
      location: "Delhi, India",
      date: "1 month ago",
      category: "relationship",
      astrologer: "Dr. Priya Verma",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
    {
      id: 3,
      name: "Anita Patel",
      rating: 4,
      text: "The birth chart analysis was incredibly detailed and accurate. It helped me understand my strengths and weaknesses better. Highly recommended!",
      location: "Ahmedabad, India",
      date: "3 days ago",
      category: "kundli",
      astrologer: "Acharya Kumar",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    },
    {
      id: 4,
      name: "Suresh Menon",
      rating: 5,
      text: "The financial astrology consultation helped me make better investment decisions. The predictions about market trends were surprisingly accurate!",
      location: "Bangalore, India",
      date: "2 months ago",
      category: "finance",
      astrologer: "Jyotish Rahul",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    },
    {
      id: 5,
      name: "Meera Desai",
      rating: 5,
      text: "I was going through a tough phase in life, and the spiritual guidance I received brought me peace and clarity. The astrologer was very compassionate.",
      location: "Pune, India",
      date: "1 week ago",
      category: "spiritual",
      astrologer: "Swami Nand Kishore",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    },
    {
      id: 6,
      name: "Arjun Singh",
      rating: 4,
      text: "The health predictions and remedies suggested really helped improve my family's wellbeing. The astrologer took time to understand our complete situation.",
      location: "Kolkata, India",
      date: "3 weeks ago",
      category: "health",
      astrologer: "Dr. Sunita Roy",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    }
  ];

  const categories = [
    { id: 'all', label: 'All Reviews', count: testimonials.length },
    { id: 'career', label: 'Career', count: testimonials.filter(t => t.category === 'career').length },
    { id: 'relationship', label: 'Relationship', count: testimonials.filter(t => t.category === 'relationship').length },
    { id: 'finance', label: 'Finance', count: testimonials.filter(t => t.category === 'finance').length },
    { id: 'health', label: 'Health', count: testimonials.filter(t => t.category === 'health').length },
    { id: 'spiritual', label: 'Spiritual', count: testimonials.filter(t => t.category === 'spiritual').length },
  ];

  const filteredTestimonials = selectedCategory === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === selectedCategory);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => 
        prev === filteredTestimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, filteredTestimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => 
      prev === filteredTestimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? filteredTestimonials.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "h-4 w-4",
              star <= rating 
                ? "text-yellow-500 fill-current" 
                : "text-gray-300"
            )}
          />
        ))}
      </div>
    );
  };

  const getCategoryColor = (category) => {
    const colors = {
      career: "bg-blue-100 text-blue-800",
      relationship: "bg-pink-100 text-pink-800",
      finance: "bg-green-100 text-green-800",
      health: "bg-orange-100 text-orange-800",
      spiritual: "bg-purple-100 text-purple-800",
      kundli: "bg-indigo-100 text-indigo-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getCategoryLabel = (category) => {
    const labels = {
      career: "Career Guidance",
      relationship: "Relationship",
      finance: "Financial",
      health: "Health",
      spiritual: "Spiritual",
      kundli: "Kundli Analysis"
    };
    return labels[category] || category;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200 text-sm font-medium">
            <Sparkles className="h-3 w-3 mr-1" />
            Client Love & Stories
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            What Our <span className="text-purple-600">Clients Say</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how our astrological guidance has transformed lives and brought positive changes to our clients worldwide.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <div className="text-2xl md:text-3xl font-bold text-purple-600">4.9/5</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </Card>
          <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <div className="text-2xl md:text-3xl font-bold text-green-600">2.5K+</div>
            <div className="text-sm text-gray-600">Happy Clients</div>
          </Card>
          <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <div className="text-2xl md:text-3xl font-bold text-blue-600">98%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </Card>
          <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <div className="text-2xl md:text-3xl font-bold text-orange-600">50+</div>
            <div className="text-sm text-gray-600">Expert Astrologers</div>
          </Card>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setCurrentIndex(0);
              }}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                selectedCategory === category.id
                  ? "bg-purple-500 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-purple-300 hover:shadow-sm"
              )}
            >
              <span>{category.label}</span>
              <Badge 
                variant="secondary" 
                className={cn(
                  "text-xs",
                  selectedCategory === category.id 
                    ? "bg-white text-purple-600" 
                    : "bg-gray-100 text-gray-600"
                )}
              >
                {category.count}
              </Badge>
            </button>
          ))}
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="p-8 md:p-12"
              >
                {filteredTestimonials.length > 0 ? (
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* Testimonial Content */}
                    <div className="flex-1 text-center lg:text-left">
                      <div className="flex justify-center lg:justify-start mb-4">
                        <Quote className="h-8 w-8 text-purple-500 rotate-180" />
                      </div>
                      
                      <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                        "{filteredTestimonials[currentIndex].text}"
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center justify-center lg:justify-start space-x-4">
                          <Avatar className="h-14 w-14 border-2 border-purple-200 shadow-md">
                            <AvatarImage src={filteredTestimonials[currentIndex].image} />
                            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold">
                              {filteredTestimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-gray-800 text-lg">
                              {filteredTestimonials[currentIndex].name}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {filteredTestimonials[currentIndex].location}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-600">
                          <StarRating rating={filteredTestimonials[currentIndex].rating} />
                          <Badge className={getCategoryColor(filteredTestimonials[currentIndex].category)}>
                            {getCategoryLabel(filteredTestimonials[currentIndex].category)}
                          </Badge>
                          <span>•</span>
                          <span>{filteredTestimonials[currentIndex].date}</span>
                          <span>•</span>
                          <span>With {filteredTestimonials[currentIndex].astrologer}</span>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Element */}
                    <div className="hidden lg:flex items-center justify-center">
                      <div className="relative">
                        <div className="w-48 h-48 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                          <Heart className="h-16 w-16 text-white" fill="currentColor" />
                        </div>
                        <div className="absolute -top-2 -right-2">
                          <Sparkles className="h-8 w-8 text-yellow-500" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No testimonials found for this category.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            {filteredTestimonials.length > 1 && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-700" />
                </button>

                {/* Play/Pause */}
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
                >
                  {isAutoPlaying ? (
                    <Pause className="h-5 w-5 text-gray-700" />
                  ) : (
                    <Play className="h-5 w-5 text-gray-700" />
                  )}
                </button>

                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            )}
          </div>

          {/* Dots Indicator */}
          {filteredTestimonials.length > 1 && (
            <div className="flex justify-center space-x-2 mt-8">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "bg-purple-500 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  )}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* CTA Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left mb-6 md:mb-0">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    Ready to Transform Your Life?
                  </h3>
                  <p className="text-purple-100 text-lg">
                    Join thousands of satisfied clients who found clarity and purpose
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-gray-100 font-semibold rounded-xl shadow-lg"
                  >
                    Book Consultation
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline" 
                    className="border-white text-white hover:bg-white/20 rounded-xl"
                  >
                    Read More Stories
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div> */}
      </div>
    </section>
  );
};

export default Testimonials;