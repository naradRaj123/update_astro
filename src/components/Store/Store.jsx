import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { Settings, Bell, LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

import malaImg from "../../assets/images/mala.jpeg";
import cadOne from "../../assets/images/card1.jpg";
import cadTwo from "../../assets/images/card2.jpg";
import cadThree from "../../assets/images/card3.jpg";
import axios from "axios";

// const products = [
//   { id: "1", image: malaImg, title: "Dhan Yog Bracelet", price: 599, oldPrice: 1499 },
//   { id: "2", image: cadOne, title: "Raw Pyrite Bracelet", price: 599, oldPrice: 1499 },
//   { id: "3", image: cadTwo, title: "Maha Dhan Yog Combo", price: 799, oldPrice: 5997 },
//   { id: "4", image: cadThree, title: "Energised Dhan Yog Bracelet", price: 699, oldPrice: 1499 },
//   { id: "5", image: cadOne, title: "Raw Pyrite Bracelet", price: 599, oldPrice: 1499 },
//   { id: "6", image: cadTwo, title: "Maha Dhan Yog Combo", price: 799, oldPrice: 5997 },
//   { id: "7", image: cadOne, title: "Raw Pyrite Bracelet", price: 599, oldPrice: 1499 },
//   { id: "8", image: cadTwo, title: "Maha Dhan Yog Combo", price: 799, oldPrice: 5997 },
//   { id: "9", image: cadThree, title: "Energised Dhan Yog Bracelet", price: 699, oldPrice: 1499 },
//   { id: "10", image: cadOne, title: "Raw Pyrite Bracelet", price: 599, oldPrice: 1499 },
//   { id: "11", image: cadThree, title: "Energised Dhan Yog Bracelet", price: 699, oldPrice: 1499 },
//   { id: "12", image: cadOne, title: "Raw Pyrite Bracelet", price: 599, oldPrice: 1499 },
// ];

const Store = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/user-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    navigate("/user-login");
  };

  // fetch all product 
  const [products,setProducts]=useState([]);
  const [imgPath,setPath]=useState('');
  const fetchData = async () => {
    try {
      const res = await axios.get("https://astro-talk-backend.onrender.com/web/productlist");
      setPath(res.data.staticPath);
      setProducts(res.data.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])


  return (
    <section className="bg-white min-h-screen py-10">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-0">
            Welcome to Store, {user?.user_name || "User"}!
          </h1>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              onClick={() => navigate("/user-dashboard")}
            >
              <Home className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Button>
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              onClick={() => navigate("/user-update")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Account Settings
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:bg-red-100"
            >
              <Bell className="h-6 w-6" />
            </Button>
            <Button variant="destructive" size="lg" onClick={handleLogout}>
              <LogOut className="mr-2 h-5 w-5" /> Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Store Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Our <span className="cosmic-text">Store</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Comprehensive astrological solutions for every aspect of your life
        </p>
      </div>

      {/* Products */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* <h1 className="text-2xl font-bold mb-6 text-center">Bracelet Store</h1> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(products) && products.map((product) => (
            <>
            <ProductCard key={product._id} {...product} imgPath={imgPath} />
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Store;
