import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import axios from "axios";

const OrderThankYou = ({ orderId, userName, productName }) => {
  const [confetti, setConfetti] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState(false);
  const { id: order_Id } = useParams();


  const getConfirmOrder = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`https://astro-talk-backend.onrender.com/web/verifyOrder/${order_Id}`)
      if (data?.status) {
        console.log(data?.status)
        // setLoading(false)
        setTimeout(() => setLoading(false), 5000);
      }

    } catch (error) {
      console.log(error)
      setError(true)
    }
  }

  useEffect(() => {
    getConfirmOrder();
  }, [order_Id])

  useEffect(() => {
    const timer = setTimeout(() => setConfetti(false), 5000); // 5 seconds confetti

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 relative">
      {confetti && <Confetti numberOfPieces={1000} gravity={0.3} recycle={true} friction={0.99} width={window.innerWidth} height={window.innerHeight} />}

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center"
      >
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
          className="text-4xl font-bold text-green-600 mb-4"
        >
          🎉 Order Placed!
        </motion.h1>

        <motion.p
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-gray-700 mb-2 text-lg"
        >
          Thank you, <span className="font-semibold">{userName}</span>!
        </motion.p>

        <motion.p
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-gray-700 mb-4 text-lg"
        >
          Your order for <span className="font-semibold">{productName}</span> has been successfully placed.
        </motion.p>

        <motion.p
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-gray-500 mb-6 font-mono text-sm"
        >
          Order ID: 
          {loading ? (<span className="italic"> Please Wait... </span>) : order_Id}
        </motion.p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/store">
            <motion.button
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5, type: "spring" }}
              className={`
              relative flex items-center justify-center w-full p-3 font-bold text-white bg-green-600 
              rounded-xl shadow-lg transform transition-all duration-300 
              hover:-translate-y-1 hover:shadow-2xl
              active:translate-y-0 active:shadow-lg
              `}
            >
              {loading ? (
                <span className="flex items-center space-x-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  <span className="italic" >Placing Order...</span>
                </span>
              ) : (
                <span>Continue Shopping </span>
              )}
              {/* Continue Shopping */}
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderThankYou;
