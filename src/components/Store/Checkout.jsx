// pages/Checkout.jsx
import axios from "axios";
import React from "react";
import { useParams, useLocation } from "react-router-dom";

const Checkout = () => {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return <div className="p-8 text-center text-red-600">No product found in checkout.</div>;
  }

  // dynamic razorpay function
  const loadRazorpayScript=()=>{
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    })
  }

  const handlePayment= async ()=>{
    const res=await loadRazorpayScript();
    
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    try {
      // Call your backend API to create an order
      const { data } = await axios.post("http://localhost:8000/paynow"); // Replace with live URL if hosted

      if (!data.status) {
        alert("Failed to create order. Please try again.");
        return;
      }

      const { amount, id: order_id, currency } = data.order;

      const options = {
        key: "rzp_test_HC49LHGAmCT33i", // Replace with your Razorpay key_id
        amount: amount.toString(),
        currency,
        name: "Your App Name",
        description: "Test Payment",
        order_id: order_id,
        handler: function (response) {
          // Handle successful payment here
          alert("Payment successful!");
          console.log("Payment Response:", response);
          // You can POST this response to your server for verification
        },
        prefill: {
          name: "Narad Bhardwaj",
          email: "narad@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  }


  return (

    <section  className="py-16 bg-white star-bg common-margin-top">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
               Our <span className="cosmic-text"> Checkout</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive astrological solutions for every aspect of your life
          </p>
        </div>
        
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white p-6 shadow-md rounded">
        <div className="flex items-center space-x-4">
          <img src={product.image} alt={product.title} className="w-32 h-32 object-cover rounded" />
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

          <button onClick={handlePayment} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold">
            Confirm Order
          </button>
        </div>
      </div>
    </div>
    
    </div>
    </section>




  );
};

export default Checkout;
