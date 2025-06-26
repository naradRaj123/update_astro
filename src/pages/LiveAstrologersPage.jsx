import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, Video, Star, CheckCircle, RadioTower } from 'lucide-react';

const astrologerData = [
  { id: 1, name: "Astrologer Aarav", expertise: "Vedic, Tarot", experience: "12 Yrs", rating: 4.8, status: "Online", pricePerMinuteChat: 10, pricePerMinuteCall: 15, image: "astrologer_live_1" },
  { id: 2, name: "Mystic Meera", expertise: "Numerology, Palmistry", experience: "8 Yrs", rating: 4.9, status: "Busy", pricePerMinuteChat: 12, pricePerMinuteCall: 18, image: "astrologer_live_2" },
  { id: 3, name: "Guru Gyanesh", expertise: "Vastu, Face Reading", experience: "20 Yrs", rating: 4.7, status: "Online", pricePerMinuteChat: 8, pricePerMinuteCall: 12, image: "astrologer_live_3" },
  { id: 4, name: "Divya Drishti", expertise: "KP Astrology, Psychic", experience: "15 Yrs", rating: 4.6, status: "Offline", pricePerMinuteChat: 11, pricePerMinuteCall: 16, image: "astrologer_live_4" },
  { id: 5, name: "Rishi Raj", expertise: "Vedic, Gemology", experience: "10 Yrs", rating: 4.8, status: "Online", pricePerMinuteChat: 9, pricePerMinuteCall: 14, image: "astrologer_live_5" },
];

const LiveAstrologerCard = ({ astrologer, delay }) => {
  const statusColor = astrologer.status === "Online" ? "bg-green-500" : astrologer.status === "Busy" ? "bg-orange-500" : "bg-gray-500";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl overflow-hidden border border-red-100">
        <div className="relative">
          <img  alt={`Portrait of ${astrologer.name}`} class="w-full h-48 object-cover" src="https://images.unsplash.com/photo-1582744709859-2d89c6920cfb" />
          <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold text-white rounded-full flex items-center ${statusColor}`}>
            <RadioTower className="w-3 h-3 mr-1" /> {astrologer.status}
          </div>
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 text-xs rounded-md flex items-center">
            <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" /> {astrologer.rating}
          </div>
        </div>
        <CardContent className="p-4">
          <CardTitle className="text-xl font-bold text-primary-theme mb-1">{astrologer.name}</CardTitle>
          <p className="text-sm text-gray-600 mb-1">{astrologer.expertise}</p>
          <p className="text-xs text-gray-500 mb-3">{astrologer.experience} Experience</p>
          <div className="flex justify-between items-center text-xs text-gray-700 mb-3">
            <span>Chat: ₹{astrologer.pricePerMinuteChat}/min</span>
            <span>Call: ₹{astrologer.pricePerMinuteCall}/min</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button size="sm" variant="outline" className="flex-1 border-primary-theme text-primary-theme hover:btn-primary-theme hover:text-white" disabled={astrologer.status !== 'Online'}>
              <MessageSquare className="w-4 h-4 mr-1" /> Chat
            </Button>
            <Button size="sm" className="flex-1 btn-primary-theme text-white" disabled={astrologer.status !== 'Online'}>
              <Phone className="w-4 h-4 mr-1" /> Call
            </Button>
          </div>
           {astrologer.status === 'Online' && <Button size="sm" variant="outline" className="w-full mt-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white" > <Video className="w-4 h-4 mr-1" /> Video Call </Button>}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const LiveAstrologersPage = () => {
  return (
    <div className="min-h-screen p-4 md:p-8" style={{backgroundColor: 'hsl(var(--light-red-secondary))'}}>
      <motion.div
        className="container mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-2xl rounded-xl overflow-hidden mb-8 border-2 border-primary-theme">
          <CardHeader className="text-center p-8 bg-gradient-to-br from-red-400 via-pink-400 to-rose-300" style={{backgroundColor: 'hsl(var(--light-red-primary))'}}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="mx-auto bg-white rounded-full p-4 inline-block shadow-lg mb-4"
            >
              <RadioTower className="h-16 w-16 text-primary-theme" />
            </motion.div>
            <CardTitle className="text-4xl font-bold text-white">Live Astrologers</CardTitle>
            <CardDescription className="text-lg text-red-100 mt-2">
              Connect instantly with astrologers available for chat, call, or video consultation.
            </CardDescription>
          </CardHeader>
        </Card>
        
        {/* Filters - Placeholder */}
        <Card className="mb-8 p-4 bg-white rounded-lg shadow">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <span className="font-semibold text-gray-700">Filter by:</span>
            <Button variant="outline" size="sm" className="text-sm">Expertise</Button>
            <Button variant="outline" size="sm" className="text-sm">Language</Button>
            <Button variant="outline" size="sm" className="text-sm">Rating</Button>
            <Button variant="outline" size="sm" className="text-sm">Price</Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {astrologerData.map((astrologer, index) => (
            <LiveAstrologerCard key={astrologer.id} astrologer={astrologer} delay={index * 0.1} />
          ))}
        </div>

        {astrologerData.length === 0 && (
           <div className="text-center py-10 col-span-full">
            <img  src="/placeholder-no-astrologer.svg" alt="No astrologers available" class="w-40 h-40 mx-auto mb-4 text-gray-400" src="https://images.unsplash.com/photo-1685478237364-381739515f59" />
            <p className="text-xl text-gray-600">No astrologers currently live. Please check back soon!</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LiveAstrologersPage;