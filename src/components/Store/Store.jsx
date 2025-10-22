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


import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  ShoppingCart, Search, Filter, Heart, Star, ArrowRight, Sparkles, User, Gem 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const ProductCard = ({ product, onAddToCart, onViewDetails, image }) => {
  console.log(product)
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
            src={ `${product?.image}`}
            alt={product.productName}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {product.badge && (
            <div className="absolute top-3 left-3">
              <Badge className={cn("text-xs font-semibold", product.badgeColor)}>
                {product.badge}
              </Badge>
            </div>
          )}
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
          {/* Category & Rating */}
         

          {/* Product Name */}
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.productName}</h3>

          {/* Description */}
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.productDesc}</p>

          {/* Price & Actions */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-purple-600">₹{product.productPrice}</p>
              {/* {product.productPrice && (
                <p className="text-xs text-gray-500 line-through">₹{product.discount}</p>
              )} */}
            </div>
            
            <div className="flex items-center space-x-2">
              {/* <Button 
                size="sm"
                className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl px-3"
                onClick={() => onAddToCart(product, quantity)}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button> */}
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

const Store = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [path, setPath] = useState("");
  const [cartItems, setCartItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [staticPath,setStaticPath]=useState('')
  // Fetch data from API
  const fetchData = async () => {
    try {
      const res = await axios.get("https://astro-talk-backend.onrender.com/web/productlist");
      setPath(res.data.staticPath);
      setProducts(res.data.data || []);
      setStaticPath(res.data.staticPath)
      // console.log(res.data.staticPath)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Search filter
  const filteredProducts = products.filter(product =>
    product.productName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.productDesc?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product, quantity) => {
    setCartItems(prev => prev + quantity);
    console.log(`Added ${quantity} ${product.name} to cart`);
  };

  const handleViewDetails = (product) => {
    navigate(`/product/${product._id || product.id}`);
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
           
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products..."
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

      

      {/* Product Grid */}
      <div className="container mx-auto p-4">
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              All Products <span className="text-gray-500 text-sm ml-2">({filteredProducts.length})</span>
            </h2>
          </div>

          <AnimatePresence>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product._id || product.id}
                  product={{
                    ...product,
                    image: staticPath ? `${staticPath}${product?.productCoverImg}` : product.image
                  }}
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
              <p className="text-gray-500 mb-4">Try changing your search</p>
              <Button 
                onClick={() => setSearchQuery('')}
                className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </motion.section>
      </div>

      {/* Bottom Nav */}
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
