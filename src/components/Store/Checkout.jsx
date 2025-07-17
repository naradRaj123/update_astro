import axios from "axios";
import React, { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Settings, Bell, LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const Checkout = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/user-login");
    }
  }, [navigate]);

  if (!product) {
    return (
      <div className="p-8 text-center text-red-600">
        No product found in checkout.
      </div>
    );
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:8000/paynow", {
        amount: product.price * 100,
      });

      if (!data.status) {
        alert("Failed to create order.");
        return;
      }

      const { amount, id: order_id, currency } = data.order;

      const options = {
        key: "rzp_test_HC49LHGAmCT33i",
        amount: amount.toString(),
        currency,
        name: "Astrotruth Store",
        description: product.title,
        image: product.image,
        order_id,
        handler: function (response) {
          alert("Payment successful!");
          console.log("Payment Response:", response);
        },
        prefill: {
          name: user?.user_name || "User",
          email: user?.user_email || "email@example.com",
          contact: "9999999999",
        },
        notes: {
          product_id: product.id,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    navigate("/user-login");
  };

  return (
    <section className="bg-white min-h-screen py-10">
      {/* Header same as Store */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-0">
            Welcome to Checkout, {user?.user_name || "User"}!
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
            <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-100">
              <Bell className="h-6 w-6" />
            </Button>
            <Button variant="destructive" size="lg" onClick={handleLogout}>
              <LogOut className="mr-2 h-5 w-5" /> Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="cosmic-text">Checkout</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive astrological solutions for every aspect of your life
          </p>
        </div>

        <div className="max-w-xl mx-auto bg-white p-6 shadow-md rounded">
          <div className="flex items-center space-x-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-32 h-32 object-cover rounded"
            />
            <div>
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <p className="text-red-600 font-bold text-lg">₹{product.price}</p>
              <p className="line-through text-gray-500 text-sm">₹{product.oldPrice}</p>
            </div>
          </div>

          <div className="mt-6">
            <label className="block font-medium mb-1">Your Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full p-3 border rounded mb-4"
            />

            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded mb-4"
            />

            <label className="block font-medium mb-1">Shipping Address</label>
            <textarea
              placeholder="Enter delivery address"
              className="w-full p-3 border rounded mb-6"
            ></textarea>

            <button
              onClick={handlePayment}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-all"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
