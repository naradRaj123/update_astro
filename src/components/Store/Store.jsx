// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ProductCard from "./ProductCard";
// import { Settings, Bell, LogOut, Home } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import axios from "axios";


// const Store = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   useEffect(() => {
//     const token = localStorage.getItem("userToken");
//     if (!token) {
//       navigate("/user-login");
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("userToken");
//     localStorage.removeItem("user");
//     navigate("/user-login");
//   };

//   // fetch all product 
//   const [products,setProducts]=useState([]);
//   const [imgPath,setPath]=useState('');
//   const fetchData = async () => {
//     try {
//       const res = await axios.get("https://astro-talk-backend.onrender.com/web/productlist");
//       setPath(res.data.staticPath);
//       setProducts(res.data.data)
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, [])


//   return (
//     <section className="bg-white min-h-screen py-10">
//       {/* Header */}
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6">
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-0">
//             Welcome to Store, {user?.user_name || "User"}!
//           </h1>
//           <div className="flex flex-wrap gap-2">
//             <Button
//               variant="outline"
//               className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
//               onClick={() => navigate("/user-dashboard")}
//             >
//               <Home className="mr-2 h-4 w-4" />
//               Go to Dashboard
//             </Button>
//             <Button
//               variant="outline"
//               className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
//               onClick={() => navigate("/user-update")}
//             >
//               <Settings className="mr-2 h-4 w-4" />
//               Account Settings
//             </Button>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="text-red-500 hover:bg-red-100"
//             >
//               <Bell className="h-6 w-6" />
//             </Button>
//             <Button variant="destructive" size="lg" onClick={handleLogout}>
//               <LogOut className="mr-2 h-5 w-5" /> Logout
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Store Title */}
//       <div className="text-center mb-12">
//         <h2 className="text-3xl md:text-4xl font-bold mb-4">
//           Our <span className="cosmic-text">Store</span>
//         </h2>
//         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//           Comprehensive astrological solutions for every aspect of your life
//         </p>
//       </div>

//       {/* Products */}
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* <h1 className="text-2xl font-bold mb-6 text-center">Bracelet Store</h1> */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {Array.isArray(products) && products.map((product) => (
//             <>
//             <ProductCard key={product._id} {...product} imgPath={imgPath} />
//             </>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Store;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Search,
  Filter,
  ShoppingCart,
  Heart,
  Star,
  Gem,
  Moon,
  Sun,
  Sparkles,
  BookOpen,
  Zap,
  Shield,
  Truck,
  ArrowRight,
  Plus,
  Minus,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border-0 overflow-hidden bg-white">
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <Badge className={cn(
              "text-xs font-semibold",
              product.badgeColor
            )}>
              {product.badge}
            </Badge>
          </div>
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
          >
            <Heart 
              className={cn(
                "h-4 w-4 transition-colors",
                isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
              )} 
            />
          </button>
        </div>

        <CardContent className="p-4">
          {/* Category */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-purple-600 font-medium">{product.category}</span>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
              <span className="text-xs text-gray-600">{product.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>

          {/* Description */}
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.description}</p>

          {/* Price & Actions */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-purple-600">{product.price}</p>
              {product.originalPrice && (
                <p className="text-xs text-gray-500 line-through">{product.originalPrice}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                size="sm"
                className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl px-3"
                onClick={() => onAddToCart(product, quantity)}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
              <Button 
                size="sm"
                variant="outline"
                className="border-purple-200 text-purple-600 hover:bg-purple-50 rounded-xl"
                onClick={() => onViewDetails(product)}
              >
                View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 hide-scrollbar">
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200",
            activeCategory === category.id 
              ? "bg-purple-500 text-white shadow-md" 
              : "bg-white text-gray-700 border border-gray-200 hover:border-purple-300"
          )}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <category.icon className="h-4 w-4" />
          <span>{category.name}</span>
        </motion.button>
      ))}
    </div>
  );
};

const Store = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState(3);

  // Mock categories
  const categories = [
    { id: 'all', name: 'All Items', icon: Sparkles },
    { id: 'crystals', name: 'Crystals', icon: Gem },
    { id: 'books', name: 'Books', icon: BookOpen },
    { id: 'yantras', name: 'Yantras', icon: Shield },
    { id: 'rudraksha', name: 'Rudraksha', icon: Moon },
    { id: 'incense', name: 'Incense', icon: Zap },
  ];

  // Mock products
  const products = [
    {
      id: 1,
      name: 'Natural Clear Quartz Crystal',
      description: 'Powerful healing crystal for energy cleansing and amplification',
      price: '₹1,299',
      originalPrice: '₹1,999',
      category: 'crystals',
      rating: '4.8',
      badge: 'Bestseller',
      badgeColor: 'bg-orange-500 text-white',
      image: 'https://images.unsplash.com/photo-1547044471-3ab8c6c49e0b?w=400'
    },
    {
      id: 2,
      name: 'Vedic Astrology Guide Book',
      description: 'Complete guide to Vedic astrology with practical examples',
      price: '₹899',
      category: 'books',
      rating: '4.6',
      badge: 'New',
      badgeColor: 'bg-green-500 text-white',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400'
    },
    {
      id: 3,
      name: 'Sri Yantra Copper Plate',
      description: 'Sacred geometry symbol for prosperity and spiritual growth',
      price: '₹2,499',
      originalPrice: '₹3,499',
      category: 'yantras',
      rating: '4.9',
      badge: 'Popular',
      badgeColor: 'bg-purple-500 text-white',
      image: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=400'
    },
    {
      id: 4,
      name: '5 Mukhi Rudraksha Mala',
      description: 'Authentic Nepalese rudraksha beads for meditation and peace',
      price: '₹1,799',
      category: 'rudraksha',
      rating: '4.7',
      badge: 'Authentic',
      badgeColor: 'bg-blue-500 text-white',
      image: 'https://images.unsplash.com/photo-1594736797933-d0e02164bf8e?w=400'
    },
    {
      id: 5,
      name: 'Sandalwood Incense Sticks',
      description: 'Pure sandalwood incense for meditation and positive vibes',
      price: '₹349',
      category: 'incense',
      rating: '4.5',
      badge: 'Sale',
      badgeColor: 'bg-red-500 text-white',
      image: 'https://images.unsplash.com/photo-1594736797933-d0e02164bf8e?w=400'
    },
    {
      id: 6,
      name: 'Amethyst Cluster',
      description: 'Natural amethyst cluster for spiritual growth and intuition',
      price: '₹3,299',
      category: 'crystals',
      rating: '4.9',
      badge: 'Premium',
      badgeColor: 'bg-pink-500 text-white',
      image: 'https://images.unsplash.com/photo-1547044471-3ab8c6c49e0b?w=400'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product, quantity) => {
    setCartItems(prev => prev + quantity);
    // Add to cart logic here
    console.log(`Added ${quantity} ${product.name} to cart`);
  };

  const handleViewDetails = (product) => {
    navigate(`/product/${product.id}`);
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
              <h1 className="text-2xl font-bold text-gray-800">Astro Shop</h1>
              <p className="text-gray-600 text-sm">Spiritual products for your journey</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-gray-600 hover:text-purple-600">
                <ShoppingCart className="h-6 w-6" />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search crystals, books, yantras..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-2xl border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
            <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-purple-500 hover:bg-purple-600 rounded-xl px-4">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto p-4">
        {/* Categories */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </motion.section>

        {/* Featured Banner */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl border-0 shadow-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-xl font-bold mb-2">Festive Sale! 🎉</h2>
                  <p className="text-purple-100 mb-3">Get 30% off on all spiritual products</p>
                  <Button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold rounded-xl">
                    Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-white">
                  <div className="text-center">
                    <div className="text-2xl font-bold">30%</div>
                    <div className="text-xs text-purple-100">OFF</div>
                  </div>
                  <Sparkles className="h-12 w-12 text-yellow-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Products Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {activeCategory === 'all' ? 'All Products' : 
               categories.find(cat => cat.id === activeCategory)?.name}
              <span className="text-gray-500 text-sm ml-2">({filteredProducts.length} items)</span>
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Sort by:</span>
              <select className="bg-transparent border-0 focus:ring-0 text-purple-600 font-medium">
                <option>Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
            </div>
          </div>

          <AnimatePresence>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Gem className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">Try changing your search or filter criteria</p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
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
          <button className="flex flex-col items-center text-purple-600">
            <Sparkles className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Shop</span>
          </button>
          <button className="flex flex-col items-center text-gray-500">
            <Search className="h-5 w-5 mb-1" />
            <span className="text-xs">Browse</span>
          </button>
          <button className="flex flex-col items-center text-gray-500">
            <Heart className="h-5 w-5 mb-1" />
            <span className="text-xs">Wishlist</span>
          </button>
          <button className="flex flex-col items-center text-gray-500">
            <User className="h-5 w-5 mb-1" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </motion.nav>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Store;