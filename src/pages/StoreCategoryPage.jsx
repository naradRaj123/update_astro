import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Gem, BookHeart, ScrollText, ShieldCheck, Star, Zap, Tag, Info } from 'lucide-react';

// Mock data - replace with API call
const storeItemsData = {
  courses: [
    { id: 'course1', name: "Advanced Tarot Reading", price: 4999, description: "Master the art of Tarot with advanced techniques.", image: "course_tarot", categoryIcon: BookHeart },
    { id: 'course2', name: "Vedic Astrology Basics", price: 2999, description: "Learn the fundamentals of Vedic Astrology.", image: "course_vedic", categoryIcon: BookHeart },
  ],
  gemstones: [
    { id: 'gem1', name: "Natural Blue Sapphire", price: 15000, description: "Certified authentic Blue Sapphire for Saturn.", image: "gem_sapphire", categoryIcon: Gem },
    { id: 'gem2', name: "Emerald Gemstone", price: 12000, description: "High-quality Emerald for Mercury.", image: "gem_emerald", categoryIcon: Gem },
  ],
  rudraksha: [
    { id: 'rudrak1', name: "5 Mukhi Rudraksha Mala", price: 1500, description: "Authentic 5 Mukhi Rudraksha for overall well-being.", image: "rudraksha_5mukhi", categoryIcon: ShieldCheck },
  ],
  pendants: [
    { id: 'pendant1', name: "Leo Zodiac Pendant", price: 2500, description: "Beautifully crafted Leo zodiac sign pendant.", image: "pendant_leo", categoryIcon: Star },
  ],
  rituals: [
    { id: 'ritual1', name: "Lakshmi Kubera Homa", price: 5100, description: "Online Homa for wealth and prosperity.", image: "ritual_lakshmi", categoryIcon: Zap },
  ],
  reports: [
    { id: 'report1', name: "Detailed Career Report", price: 1999, description: "Personalized astrological career analysis.", image: "report_career", categoryIcon: ScrollText },
  ],
};

const categoryDetails = {
  courses: { title: "Astro/Tarot Courses", icon: BookHeart },
  gemstones: { title: "Gemstones", icon: Gem },
  rudraksha: { title: "Rudraksha", icon: ShieldCheck },
  pendants: { title: "Zodiac Pendants", icon: Star },
  rituals: { title: "Online Rituals & Puja", icon: Zap },
  reports: { title: "Astrology Reports", icon: ScrollText },
  default: { title: "Insta Store", icon: ShoppingCart }
};

const ProductCard = ({ item, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden flex flex-col h-full border border-red-100">
        <div className="relative h-52 overflow-hidden">
          <img  alt={item.name} class="w-full h-full object-cover transition-transform duration-300 hover:scale-110" src="https://images.unsplash.com/photo-1646193186132-7976c1670e81" />
        </div>
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-lg font-semibold text-primary-theme leading-tight h-12 overflow-hidden">{item.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow pb-3">
          <p className="text-xs text-gray-500 mb-2 h-10 overflow-hidden">{item.description}</p>
          <p className="text-xl font-bold text-gray-800">₹{item.price.toLocaleString()}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 border-t border-red-100 mt-auto">
          <Button className="w-full btn-primary-theme text-white hover:bg-red-700">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};


const StoreCategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const items = storeItemsData[category] || [];
  const currentCategory = categoryDetails[category] || categoryDetails.default;
  const CategoryIcon = currentCategory.icon;

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
              <CategoryIcon className="h-16 w-16 text-primary-theme" />
            </motion.div>
            <CardTitle className="text-4xl font-bold text-white">{currentCategory.title}</CardTitle>
            <CardDescription className="text-lg text-red-100 mt-2">
              Browse our collection of {currentCategory.title.toLowerCase()}.
            </CardDescription>
          </CardHeader>
        </Card>
        
        {/* Filters - Placeholder */}
        <Card className="mb-8 p-4 bg-white rounded-lg shadow">
           <div className="flex flex-wrap gap-4 items-center justify-center">
            <span className="font-semibold text-gray-700">Sort by:</span>
            <Button variant="outline" size="sm" className="text-sm">Popularity</Button>
            <Button variant="outline" size="sm" className="text-sm">Price: Low to High</Button>
            <Button variant="outline" size="sm" className="text-sm">Price: High to Low</Button>
            <Button variant="outline" size="sm" className="text-sm">Newest Arrivals</Button>
          </div>
        </Card>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item, index) => (
              <ProductCard key={item.id} item={item} delay={index * 0.05} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Info className="w-24 h-24 mx-auto mb-6 text-gray-400" />
            <p className="text-2xl text-gray-600 font-semibold mb-2">No items found in this category yet.</p>
            <p className="text-gray-500">Please check back later or explore other categories.</p>
            <Button onClick={() => navigate(-1)} className="mt-6 btn-primary-theme text-white">Go Back</Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default StoreCategoryPage;