
import React from "react";
import { motion } from "framer-motion";
import { 
  Star, 
  Users, 
  Target, 
  Heart, 
  Globe, 
  Award,
  Shield,
  Sparkles,
  Clock,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Dr. Priya Sharma",
      role: "Founder & Head Astrologer",
      experience: "15+ years",
      specialization: "Vedic Astrology & Numerology",
      image: "https://images.unsplash.com/photo-1551836026-d5c88ac5d4fa?w=200",
      bio: "PhD in Vedic Studies with expertise in birth chart analysis and spiritual guidance."
    },
    {
      name: "Rajesh Kumar",
      role: "Technical Director",
      experience: "12+ years",
      specialization: "Platform Development",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
      bio: "Technology expert passionate about making astrology accessible through modern platforms."
    },
    {
      name: "Anjali Patel",
      role: "Lead Astrologer",
      experience: "10+ years",
      specialization: "Relationship & Career Astrology",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
      bio: "Specialized in love compatibility and career path analysis with proven accuracy."
    },
    {
      name: "Amit Singh",
      role: "Customer Experience Manager",
      experience: "8+ years",
      specialization: "Client Relations",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
      bio: "Dedicated to ensuring every client receives personalized attention and support."
    }
  ];

  const milestones = [
    { year: "2015", event: "Platform Founded", description: "Started with a vision to make authentic astrology accessible" },
    { year: "2017", event: "10K Users", description: "Reached our first 10,000 satisfied customers" },
    { year: "2019", event: "Mobile App Launch", description: "Launched our dedicated mobile application" },
    { year: "2021", event: "50+ Astrologers", description: "Expanded our team of expert astrologers" },
    { year: "2023", event: "100K Sessions", description: "Completed over 100,000 successful consultations" },
    { year: "2024", event: "Global Reach", description: "Serving clients across 25+ countries worldwide" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Authenticity",
      description: "We provide genuine, time-tested astrological guidance based on ancient wisdom and modern insights."
    },
    {
      icon: Heart,
      title: "Compassion",
      description: "Every consultation is handled with empathy, understanding, and genuine care for your wellbeing."
    },
    {
      icon: Target,
      title: "Accuracy",
      description: "Our predictions and analyses are backed by deep research and proven methodologies."
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making authentic astrology available to everyone, everywhere through our digital platform."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a supportive community where people can share experiences and grow together."
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "Combining ancient wisdom with modern technology to enhance your astrological journey."
    }
  ];

  const stats = [
    { number: "50+", label: "Expert Astrologers", icon: Users },
    { number: "100K+", label: "Sessions Completed", icon: Heart },
    { number: "25+", label: "Countries Served", icon: Globe },
    { number: "98%", label: "Satisfaction Rate", icon: Star },
    { number: "15+", label: "Years Experience", icon: Clock },
    { number: "24/7", label: "Support Available", icon: Phone }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-purple-100 text-purple-800 hover:bg-purple-200 text-lg font-medium px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              Trusted Since 2015
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Guiding Lives Through <span className="text-purple-600">Cosmic Wisdom</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              For nearly a decade, we've been helping people find clarity, purpose, and direction 
              through the ancient science of astrology combined with modern technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl px-8">
                Book Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-purple-500 text-purple-600 hover:bg-purple-50 rounded-xl">
                Meet Our Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div key={index} variants={itemVariants} className="text-center">
                  <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6">
                      <IconComponent className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-gray-800 mb-1">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800">Our Journey</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                From Ancient Wisdom to <span className="text-blue-600">Modern Guidance</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2015 by Dr. Priya Sharma, our platform began as a simple mission: 
                  to make authentic Vedic astrology accessible to everyone in the digital age. 
                  What started as a small consultation service has grown into a trusted platform 
                  serving thousands worldwide.
                </p>
                <p>
                  We combine centuries-old astrological principles with modern technology to 
                  provide accurate, personalized guidance that helps people navigate life's 
                  challenges and opportunities.
                </p>
                <p>
                  Today, we're proud to have a team of 50+ expert astrologers who have 
                  collectively conducted over 100,000 successful sessions, helping people 
                  find clarity in relationships, career, health, and spiritual growth.
                </p>
              </div>
            </div>
            <div className="relative">
              <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  <img 
                    src="https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="Astrology Consultation" 
                    className="w-full h-64 md:h-96 object-cover"
                  />
                </CardContent>
              </Card>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">Trusted Platform</div>
                    <div className="text-sm text-gray-600">Rated 4.9/5 by 10,000+ clients</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-green-100 text-green-800">Our Values</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Guides <span className="text-green-600">Everything We Do</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our core principles ensure that every interaction with our platform is meaningful, authentic, and transformative.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group hover:scale-105">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-pink-100 text-pink-800">Meet Our Experts</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our <span className="text-pink-600">Dream Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate astrologers and professionals dedicated to your spiritual and personal growth.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-bold text-lg">{member.name}</h3>
                        <p className="text-sm opacity-90">{member.role}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge variant="outline" className="text-purple-600 border-purple-200">
                          {member.experience}
                        </Badge>
                        <Badge variant="outline" className="text-blue-600 border-blue-200">
                          {member.specialization}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-orange-100 text-orange-800">Our Journey</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Milestones & <span className="text-orange-600">Achievements</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-500 to-blue-500 h-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={cn(
                    "relative flex items-center",
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  )}
                >
                  {/* Content */}
                  <div className={cn(
                    "w-5/12",
                    index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                  )}>
                    <Card className="border-0 shadow-lg rounded-2xl">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-purple-600 mb-2">{milestone.year}</div>
                        <h3 className="font-bold text-gray-800 text-lg mb-2">{milestone.event}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-white shadow-lg"></div>

                  {/* Empty space for alignment */}
                  <div className="w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-blue-500">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Begin Your <span className="text-yellow-300">Astrological Journey</span>?
            </h2>
            <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
              Join thousands of satisfied clients who have found clarity, purpose, and direction through our guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 rounded-xl px-8">
                Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 rounded-xl">
                Contact Our Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg rounded-2xl text-center">
              <CardContent className="p-8">
                <Phone className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-800 text-lg mb-2">Call Us</h3>
                <p className="text-gray-600">+91 1800-123-4567</p>
                <p className="text-sm text-gray-500">24/7 Customer Support</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-2xl text-center">
              <CardContent className="p-8">
                <Mail className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-800 text-lg mb-2">Email Us</h3>
                <p className="text-gray-600">support@astropro.com</p>
                <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-2xl text-center">
              <CardContent className="p-8">
                <MapPin className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-800 text-lg mb-2">Visit Us</h3>
                <p className="text-gray-600">Mumbai, India</p>
                <p className="text-sm text-gray-500">Global digital services</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
