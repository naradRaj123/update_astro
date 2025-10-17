// import React from "react";
// import { motion } from "framer-motion";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

// const faqs = [
//   {
//     question: "How does online astrology consultation work?",
//     answer: "Our online astrology consultation connects you with expert astrologers via call or chat. You can discuss your concerns, share your birth details, and receive personalized guidance based on your astrological chart.",
//   },
//   {
//     question: "What information do I need to provide for an accurate reading?",
//     answer: "For the most accurate reading, you should provide your date of birth, time of birth, and place of birth. This information helps the astrologer create your precise birth chart for analysis.",
//   },
//   {
//     question: "How long does a typical consultation last?",
//     answer: "A typical consultation lasts between 15 to 30 minutes, depending on the complexity of your questions and the package you choose. You can always extend the session if needed.",
//   },
//   {
//     question: "Are the consultations confidential?",
//     answer: "Absolutely. We maintain strict confidentiality for all consultations. Your personal information and the details discussed during the session remain private and secure.",
//   },
//   {
//     question: "Can astrology really predict my future?",
//     answer: "Astrology provides insights into potential future trends based on planetary positions and their influence on your birth chart. While it can indicate possibilities and tendencies, remember that you always have free will to make choices.",
//   },
//   {
//     question: "What if I'm not satisfied with my consultation?",
//     answer: "We have a satisfaction guarantee policy. If you're not satisfied with your consultation, please contact our customer support within 24 hours, and we'll arrange another session with a different astrologer or provide a refund.",
//   },
// ];

// const FAQ = () => {
//   return (
//     <section className="py-8 md:py-16 bg-white">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-2xl md:text-4xl font-bold mb-4">
//             Most Trusted <span className="text-yellow-600">Astrology Platform</span>
//           </h2>
//           <p className="text-lg text-gray-700 max-w-2xl mx-auto">
//             Find answers to common questions about our astrology services. Your peace of mind is our priority.
//           </p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           viewport={{ once: true }}
//           className="max-w-3xl mx-auto"
//         >
//           <Accordion type="single" collapsible className="w-full">
//             {faqs.map((faq, index) => (
//               <AccordionItem key={index} value={`item-${index}`} className="border-b border-yellow-200">
//                 <AccordionTrigger className="text-left font-medium text-lg hover:text-yellow-600 text-gray-800">
//                   {faq.question}
//                 </AccordionTrigger>
//                 <AccordionContent className="text-gray-600 pt-2 pb-4">
//                   {faq.answer}
//                 </AccordionContent>
//               </AccordionItem>
//             ))}
//           </Accordion>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default FAQ;










import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Progress } from '@/components/ui/progress';
import {
  Search,
  Filter,
  Calendar,
  Clock,
  Video,
  Phone,
  MessageSquare,
  Star,
  User,
  Zap,
  Shield,
  Award,
  Users,
  BookOpen,
  TrendingUp,
  Heart,
  Clock4,
  CheckCircle2,
  XCircle,
  PlayCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const ConsultationCard = ({ consultation, onJoin, onReschedule, onCancel }) => {
  const getStatusConfig = (status) => {
    const config = {
      scheduled: { color: 'bg-blue-100 text-blue-800', label: 'Scheduled' },
      ongoing: { color: 'bg-green-100 text-green-800', label: 'Live Now' },
      completed: { color: 'bg-gray-100 text-gray-800', label: 'Completed' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
      pending: { color: 'bg-orange-100 text-orange-800', label: 'Pending' }
    };
    return config[status] || config.pending;
  };

  const getTypeIcon = (type) => {
    const icons = {
      video: Video,
      audio: Phone,
      chat: MessageSquare
    };
    return icons[type] || MessageSquare;
  };

  const statusConfig = getStatusConfig(consultation.status);
  const TypeIcon = getTypeIcon(consultation.type);

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl border-2 border-gray-100">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start space-x-3 flex-1">
              <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                <AvatarImage src={consultation.astrologer.avatar} />
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold">
                  {consultation.astrologer.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-gray-800">{consultation.astrologer.name}</h3>
                  {consultation.astrologer.isVerified && (
                    <Shield className="h-3 w-3 text-blue-500" />
                  )}
                </div>
                
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-600">{consultation.astrologer.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">•</span>
                  <TypeIcon className="h-3 w-3 text-purple-500" />
                  <span className="text-xs text-gray-600 capitalize">{consultation.type}</span>
                </div>

                <Badge className={cn("text-xs", statusConfig.color)}>
                  {statusConfig.label}
                </Badge>
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-purple-600">{consultation.price}</p>
              <p className="text-xs text-gray-500">{consultation.duration} min</p>
            </div>
          </div>

          {/* Consultation Details */}
          <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4 text-purple-500" />
              <span>{formatDate(consultation.date)}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4 text-purple-500" />
              <span>{formatTime(consultation.date)}</span>
            </div>
            {consultation.topic && (
              <div className="col-span-2 flex items-center space-x-2 text-sm text-gray-600">
                <BookOpen className="h-4 w-4 text-purple-500" />
                <span className="truncate">Topic: {consultation.topic}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            {consultation.status === 'scheduled' && (
              <>
                <Button 
                  size="sm"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-xl"
                  onClick={() => onJoin(consultation)}
                >
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Join Session
                </Button>
                <Button 
                  size="sm"
                  variant="outline"
                  className="flex-1 rounded-xl"
                  onClick={() => onReschedule(consultation)}
                >
                  Reschedule
                </Button>
                <Button 
                  size="sm"
                  variant="outline"
                  className="flex-1 text-red-500 border-red-200 hover:bg-red-50 rounded-xl"
                  onClick={() => onCancel(consultation)}
                >
                  Cancel
                </Button>
              </>
            )}
            
            {consultation.status === 'ongoing' && (
              <Button 
                size="sm"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-xl"
                onClick={() => onJoin(consultation)}
              >
                <Zap className="h-4 w-4 mr-2" />
                Join Now
              </Button>
            )}
            
            {consultation.status === 'completed' && (
              <>
                <Button 
                  size="sm"
                  variant="outline"
                  className="flex-1 rounded-xl"
                  onClick={() => onJoin(consultation)}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  View Summary
                </Button>
                <Button 
                  size="sm"
                  className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl"
                >
                  Book Again
                </Button>
              </>
            )}
            
            {consultation.status === 'cancelled' && (
              <Button 
                size="sm"
                className="flex-1 bg-purple-500 hover:bg-purple-600 text-white rounded-xl"
              >
                Rebook Session
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const AstrologerCard = ({ astrologer, onBook }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border-0 overflow-hidden bg-white">
        <CardContent className="p-0">
          {/* Header with Image */}
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-purple-500 to-blue-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-3 left-3">
                <Badge className="bg-white/90 text-purple-600 backdrop-blur-sm">
                  {astrologer.experience} exp
                </Badge>
              </div>
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
              >
                <Heart 
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                  )} 
                />
              </button>
            </div>
            
            {/* Avatar */}
            <div className="absolute -bottom-6 left-4">
              <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
                <AvatarImage src={astrologer.avatar} />
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold">
                  {astrologer.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Content */}
          <div className="pt-8 pb-4 px-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">{astrologer.name}</h3>
                <p className="text-sm text-gray-600">{astrologer.specialization}</p>
              </div>
              {astrologer.isVerified && (
                <Shield className="h-4 w-4 text-blue-500 mt-1" />
              )}
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-semibold text-gray-800">{astrologer.rating}</span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-600">{astrologer.reviews} reviews</span>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1 mb-3">
              {astrologer.skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs text-purple-600 border-purple-200">
                  {skill}
                </Badge>
              ))}
              {astrologer.skills.length > 3 && (
                <Badge variant="outline" className="text-xs text-gray-500 border-gray-200">
                  +{astrologer.skills.length - 3}
                </Badge>
              )}
            </div>

            {/* Availability & Pricing */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Clock4 className="h-4 w-4 text-green-500" />
                <span>Available Now</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-purple-600">{astrologer.price}/min</p>
                <p className="text-xs text-gray-500">Starts from</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <Button 
                size="sm" 
                variant="outline"
                className="text-blue-600 border-blue-200 hover:bg-blue-50 rounded-xl"
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="text-green-600 border-green-200 hover:bg-green-50 rounded-xl"
              >
                <Phone className="h-4 w-4" />
              </Button>
              <Button 
                size="sm"
                className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl"
                onClick={() => onBook(astrologer)}
              >
                <Video className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const FAQ = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [consultations, setConsultations] = useState([]);
  const [astrologers, setAstrologers] = useState([]);

  // Mock consultations data
  const mockConsultations = [
    {
      id: 1,
      astrologer: {
        name: 'Pandit Ravi Shankar',
        avatar: '',
        rating: 4.9,
        isVerified: true
      },
      type: 'video',
      status: 'scheduled',
      date: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
      duration: 30,
      price: '₹750',
      topic: 'Career Guidance'
    },
    {
      id: 2,
      astrologer: {
        name: 'Dr. Priya Sharma',
        avatar: '',
        rating: 4.8,
        isVerified: true
      },
      type: 'audio',
      status: 'ongoing',
      date: new Date().toISOString(),
      duration: 45,
      price: '₹600',
      topic: 'Relationship Advice'
    },
    {
      id: 3,
      astrologer: {
        name: 'Acharya Kumar',
        avatar: '',
        rating: 4.7,
        isVerified: true
      },
      type: 'chat',
      status: 'completed',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      duration: 60,
      price: '₹900'
    }
  ];

  // Mock astrologers data
  const mockAstrologers = [
    {
      id: 1,
      name: 'Pandit Ravi Shankar',
      specialization: 'Vedic Astrology',
      rating: 4.9,
      reviews: 1274,
      experience: '12+ years',
      skills: ['Kundli', 'Career', 'Marriage'],
      price: '₹25/min',
      isVerified: true,
      languages: ['Hindi', 'English']
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      specialization: 'Numerology & Tarot',
      rating: 4.8,
      reviews: 892,
      experience: '8+ years',
      skills: ['Tarot', 'Love', 'Business'],
      price: '₹20/min',
      isVerified: true,
      languages: ['English', 'Tamil']
    },
    {
      id: 3,
      name: 'Acharya Kumar',
      specialization: 'Palmistry & Vastu',
      rating: 4.7,
      reviews: 645,
      experience: '15+ years',
      skills: ['Palmistry', 'Vastu', 'Health'],
      price: '₹30/min',
      isVerified: true,
      languages: ['Hindi', 'Bengali']
    }
  ];

  useEffect(() => {
    setConsultations(mockConsultations);
    setAstrologers(mockAstrologers);
  }, []);

  const filteredConsultations = consultations.filter(consultation => {
    if (activeTab === 'upcoming') {
      return consultation.status === 'scheduled' || consultation.status === 'ongoing';
    } else if (activeTab === 'past') {
      return consultation.status === 'completed' || consultation.status === 'cancelled';
    }
    return true;
  });

  const handleJoinSession = (consultation) => {
    console.log('Joining session:', consultation);
    // Implement join session logic
  };

  const handleReschedule = (consultation) => {
    console.log('Rescheduling:', consultation);
    // Implement reschedule logic
  };

  const handleCancel = (consultation) => {
    console.log('Canceling:', consultation);
    // Implement cancel logic
  };

  const handleBookAstrologer = (astrologer) => {
    console.log('Booking astrologer:', astrologer);
    navigate('/book-consultation', { state: { astrologer } });
  };

  const stats = {
    totalSessions: 45,
    completed: 38,
    upcoming: 5,
    hoursSpent: 28
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 pb-20">
      {/* Header */}
      <motion.header 
        className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Personal Consulting</h1>
              <p className="text-gray-600 text-sm">Get personalized astrology guidance</p>
            </div>
            <Button 
              className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl"
              onClick={() => navigate('/find-astrologer')}
            >
              <Users className="h-4 w-4 mr-2" />
              Find Astrologer
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search astrologers, topics, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-300 focus:border-purple-500 focus:ring-purple-500 bg-white"
            />
            <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-purple-500 hover:bg-purple-600 rounded-xl px-4">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto p-4">
        {/* Stats Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-white shadow-sm border-0 rounded-2xl text-center p-4">
              <div className="text-2xl font-bold text-purple-600">{stats.totalSessions}</div>
              <div className="text-xs text-gray-600">Total Sessions</div>
            </Card>
            <Card className="bg-white shadow-sm border-0 rounded-2xl text-center p-4">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-xs text-gray-600">Completed</div>
            </Card>
            <Card className="bg-white shadow-sm border-0 rounded-2xl text-center p-4">
              <div className="text-2xl font-bold text-blue-600">{stats.upcoming}</div>
              <div className="text-xs text-gray-600">Upcoming</div>
            </Card>
            <Card className="bg-white shadow-sm border-0 rounded-2xl text-center p-4">
              <div className="text-2xl font-bold text-orange-600">{stats.hoursSpent}h</div>
              <div className="text-xs text-gray-600">Hours Spent</div>
            </Card>
          </div>
        </motion.section>

        {/* Consultation Tabs */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-2xl mb-6">
            {['upcoming', 'past'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 py-3 px-4 rounded-xl text-sm font-medium capitalize transition-all duration-200",
                  activeTab === tab
                    ? "bg-white text-purple-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                )}
              >
                {tab === 'upcoming' ? 'Upcoming Sessions' : 'Past Sessions'}
              </button>
            ))}
          </div>

          <AnimatePresence>
            <div className="space-y-4">
              {filteredConsultations.map((consultation, index) => (
                <ConsultationCard
                  key={consultation.id}
                  consultation={consultation}
                  onJoin={handleJoinSession}
                  onReschedule={handleReschedule}
                  onCancel={handleCancel}
                />
              ))}
            </div>
          </AnimatePresence>

          {filteredConsultations.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                {activeTab === 'upcoming' ? 'No upcoming sessions' : 'No past sessions'}
              </h3>
              <p className="text-gray-500 mb-4">
                {activeTab === 'upcoming' 
                  ? 'Book a consultation to get started with personalized guidance'
                  : 'Your completed sessions will appear here'
                }
              </p>
              <Button 
                className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl"
                onClick={() => navigate('/find-astrologer')}
              >
                Browse Astrologers
              </Button>
            </motion.div>
          )}
        </motion.section>

        {/* Recommended Astrologers */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recommended Astrologers</h2>
            <Button variant="ghost" className="text-purple-600 hover:text-purple-700">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {astrologers.map((astrologer, index) => (
              <AstrologerCard
                key={astrologer.id}
                astrologer={astrologer}
                onBook={handleBookAstrologer}
              />
            ))}
          </div>
        </motion.section>

        {/* Quick Booking Options */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0 text-center md:text-left">
                  <h2 className="text-xl font-bold mb-2">Need Immediate Guidance?</h2>
                  <p className="text-purple-100 mb-3">Connect with available astrologers instantly</p>
                  <div className="flex space-x-3">
                    <Button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold rounded-xl">
                      <Zap className="h-4 w-4 mr-2" />
                      Instant Call
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white/20 rounded-xl">
                      Schedule Later
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-xs text-purple-100">Available</div>
                  </div>
                  <TrendingUp className="h-12 w-12 text-yellow-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>

      {/* Bottom Navigation */}
      <motion.nav 
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <button className="flex flex-col items-center text-gray-500">
            <User className="h-5 w-5 mb-1" />
            <span className="text-xs">Profile</span>
          </button>
          <button className="flex flex-col items-center text-purple-600">
            <Video className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Consulting</span>
          </button>
          <button className="flex flex-col items-center text-gray-500">
            <Calendar className="h-5 w-5 mb-1" />
            <span className="text-xs">Schedule</span>
          </button>
          <button className="flex flex-col items-center text-gray-500">
            <BookOpen className="h-5 w-5 mb-1" />
            <span className="text-xs">History</span>
          </button>
        </div>
      </motion.nav>
    </div>
  );
};

export default FAQ;