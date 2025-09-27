import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Settings, Bell, LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

import cadOne from "../../assets/images/card1.jpg";
import cadTwo from "../../assets/images/card2.jpg";
import cadThree from "../../assets/images/card3.jpg";
import axios from "axios";

// const products = [
//   {
//     id: "1",
//     image: cadThree,
//     title: "Dhan Yog Bracelet",
//     price: 599,
//     oldPrice: 1499,
//   },
//   {
//     id: "2",
//     image: cadOne,
//     title: "Raw Pyrite Bracelet",
//     price: 599,
//     oldPrice: 1499,
//   },
//   {
//     id: "3",
//     image: cadTwo,
//     title: "Maha Dhan Yog Combo",
//     price: 799,
//     oldPrice: 5997,
//   },
//   {
//     id: "4",
//     image: cadThree,
//     title: "Energised Dhan Yog Bracelet",
//     price: 699,
//     oldPrice: 1499,
//   },
// ];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [product, setProducts] = useState([]);

  const [imgPath, setPath] = useState('');
  const getProduct = async () => {
    try {
      const res = await axios.get("http://localhost:8000/web/productlist");
      setPath(res.data.staticPath);
      setProducts(res.data.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const products = product.find((p) => p._id === id);

  useEffect(() => {
    getProduct();
  }, [id])

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/user-login");
    }

  }, [navigate]);


  const [loading,setLoading]=useState(false);
  const handleBuyNow = async () => {
    setLoading(true);
    const isLoggedIn = localStorage.getItem("userToken");
    if (!isLoggedIn) {
      alert("Please login first to buy the product.");
      navigate("/user-login", { state: { from: `/product/${product.id}` } });
    }

    // buy online function
    // productid , userid , user phone , user email, username , product amount  
    try {
      const { data } = await axios.post("http://localhost:8000/web/product/order", {
        product_id:products?._id,
        amount: products?.productPrice,
        user_id: user?._id,
        customer_name: user?.user_name,    // Required by Cashfree
        customer_email: user?.email,  // Required by Cashfree
        customer_phone: user?.user_phone?.toString()  // Required by Cashfree
      },
      );
      const payment_link = data.paymentData.link_url;
      setLoading(false);
      console.log(payment_link);
      window.location.href = payment_link;
      if (!payment_link) {
        throw new Error("Payment link not received from server");
      }

    } catch (error) {
      console.log(error);
      alert(error);
    }


    console.log(user._id);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    navigate("/user-login");
  };

  if (!products) {
    return (
      <div className="p-8 text-center text-red-600">Product Not Found</div>
    );
  }
  return (
    <section className="bg-white min-h-screen py-10">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-0">
            Welcome, {user?.user_name || "User"}!
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

      {/* Product Details */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="cosmic-text">Product Details</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive astrological solutions for every aspect of your life
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
          <img
            src={`${imgPath}/${products?.productCoverImg}`}
            alt={products?.productName}
            className="w-full h-80 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{products?.productName}</h2>
            <p className="text-red-600 text-xl font-semibold">₹{products?.productPrice}</p>
            <p className="line-through text-gray-500">₹{products?.discount}</p>
            <p className="mt-4 text-gray-700">
              {products?.productSortTitle}
            </p>
            <p className="mt-4 text-gray-700">
              {products?.productDesc}
            </p>

            <button
              onClick={handleBuyNow}
              className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
              Buy Now
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
