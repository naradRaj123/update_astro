import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const OrderThankYou = ({ orderId, userName, productName }) => {
  const [confetti, setConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setConfetti(false), 5000); // 5 seconds confetti
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 relative">
      {confetti && <Confetti numberOfPieces={1000} gravity={0.3} recycle={true} friction={0.99}   width={window.innerWidth} height={window.innerHeight}  />}

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
          Order ID: {orderId}
        </motion.p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/products">
            <motion.button
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5, type: "spring" }}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Continue Shopping
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderThankYou;
