import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const videoData = [
  { id: 1, title: "Understanding Your Sun Sign", astrologer: "Dr. Ananya Sharma", duration: "12:35", views: "10.2K", thumbnail: "video_thumb_1", category: "Zodiac Basics" },
  { id: 2, title: "Impact of Saturn Transit", astrologer: "Pt. Rajesh Tripathi", duration: "15:50", views: "8.5K", thumbnail: "video_thumb_2", category: "Planetary Transits" },
  { id: 3, title: "Introduction to Tarot Reading", astrologer: "Ms. Priya Kaur", duration: "10:12", views: "12.1K", thumbnail: "video_thumb_3", category: "Tarot" },
  { id: 4, title: "Vastu Tips for Home Prosperity", astrologer: "Shri. Vikram Singh", duration: "18:20", views: "7.9K", thumbnail: "video_thumb_4", category: "Vastu Shastra" },
  { id: 5, title: "Numerology and Your Life Path", astrologer: "Mystic Meera", duration: "14:00", views: "9.3K", thumbnail: "video_thumb_5", category: "Numerology" },
  { id: 6, title: "Gemstones for Career Success", astrologer: "Guru Gyanesh", duration: "11:45", views: "6.5K", thumbnail: "video_thumb_6", category: "Gemology" },
];

const VideoCard = ({ video, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden border border-yellow-200 bg-white">
        <div className="relative">
          <img  alt={`Thumbnail for ${video.title}`} class="w-full h-48 object-cover" src="https://images.unsplash.com/photo-1516280440614-37939bb91594" />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <PlayCircle className="w-16 h-16 text-white opacity-80 hover:opacity-100 cursor-pointer" />
          </div>
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </span>
        </div>
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-md font-semibold text-yellow-700 leading-tight h-12 overflow-hidden">{video.title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-3 text-xs">
          <p className="text-gray-600 mb-1">By: {video.astrologer}</p>
          <p className="text-gray-500">{video.views} views • Category: {video.category}</p>
        </CardContent>
        <CardFooter className="p-3 pt-0">
          <Button variant="link" className="text-yellow-600 p-0 hover:text-yellow-700 text-sm">Watch Now &rarr;</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const VideosPage = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-yellow-50">
      <motion.div
        className="container mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-2xl rounded-xl overflow-hidden mb-8 border-2 border-yellow-400">
          <CardHeader className="text-center p-8 bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-300">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="mx-auto bg-white rounded-full p-4 inline-block shadow-lg mb-4"
            >
              <PlayCircle className="h-16 w-16 text-yellow-600" />
            </motion.div>
            <CardTitle className="text-4xl font-bold text-gray-800">Astro Videos</CardTitle>
            <CardDescription className="text-lg text-gray-700 mt-2">
              Explore insightful videos from our expert astrologers.
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="mb-8 p-4 bg-white rounded-lg shadow">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full sm:w-auto">
              <Input type="search" placeholder="Search videos..." className="pl-10 focus:ring-yellow-500 focus:border-yellow-500" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <Button variant="outline" className="border-yellow-500 text-yellow-600 hover:bg-yellow-100">
              <Filter className="mr-2 h-4 w-4" /> Filter by Category
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videoData.map((video, index) => (
            <VideoCard key={video.id} video={video} delay={index * 0.05} />
          ))}
        </div>
        
        {videoData.length === 0 && (
           <div className="text-center py-10 col-span-full">
            <PlayCircle className="w-24 h-24 mx-auto mb-4 text-gray-300" />
            <p className="text-xl text-gray-500">No videos available at the moment. Please check back soon!</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default VideosPage;