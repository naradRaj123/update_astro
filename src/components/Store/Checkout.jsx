import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Settings, Bell, LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Checkout = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const product = location.state?.product;
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) navigate("/user-login");
  }, [navigate]);

  if (!product) {
    return (
      <div className="p-8 text-center text-red-600">
        ❌ No product found in checkout.
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
    setLoading(true);

    const sdkLoaded = await loadRazorpayScript();
    if (!sdkLoaded) {
      alert("❌ Razorpay SDK failed to load.");
      setLoading(false);
      return;
    }

    const astrologerId = product?.astrologerId || "default_astrologer_id";

    try {
      const token = localStorage.getItem("userToken");
      console.log("🔑 User token:", token);
      console.log("📦 Creating Razorpay order...");

      const { data } = await axios.post(
        "https://astro-talk-backend.onrender.com/web/create-order",
        {
          amount: product.price * 100, // paise
          astrologerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Razorpay Order created:", data);

      const { id: order_id, amount, currency } = data.order;

      const options = {
        key: "rzp_test_HC49LHGAmCT33i",
        amount: amount.toString(),
        currency,
        name: "Astrotruth Store",
        description: product.title,
        image: product.image,
        order_id,
        handler: function (response) {
          alert("✅ Payment Successful!");
          console.log("💳 Payment Response:", response);
          // TODO: Send response.razorpay_payment_id etc. to backend for confirmation
        },
        prefill: {
          name: user?.user_name || "User",
          email: user?.user_email || "email@example.com",
          contact: "9999999999",
        },
        notes: {
          product_id: product.id,
          astrologerId,
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: function () {
            alert("❌ Payment cancelled.");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("❌ Razorpay Payment Error:", err);
      console.error("❌ Error Response:", err?.response?.data);
      alert("❌ Payment failed: " + (err?.response?.data?.message || "Something went wrong"));
    }

    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    navigate("/user-login");
  };

  return (
    <section className="bg-white min-h-screen py-10">
      <div className="container mx-auto px-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            Welcome to Checkout, {user?.user_name || "User"}!
          </h1>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => navigate("/user-dashboard")}>
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="outline" onClick={() => navigate("/user-update")}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-6 w-6" />
            </Button>
            <Button variant="destructive" size="lg" onClick={handleLogout}>
              <LogOut className="mr-2 h-5 w-5" /> Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Your <span className="text-blue-600">Checkout</span>
          </h2>
          <p className="text-lg text-gray-600">
            Secure astrological booking via Razorpay
          </p>
        </div>

        <div className="max-w-xl mx-auto bg-white p-6 shadow-md rounded">
          <div className="flex items-center space-x-4">
            <img src={product.image} alt={product.title} className="w-32 h-32 rounded" />
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
              className="w-full p-3 border rounded mb-4"
              defaultValue={user?.user_name}
            />

            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded mb-4"
              defaultValue={user?.user_email}
            />

            <label className="block font-medium mb-1">Shipping Address</label>
            <textarea className="w-full p-3 border rounded mb-6" />

            <button
              onClick={handlePayment}
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {loading ? "Processing..." : "Confirm Order & Pay"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
