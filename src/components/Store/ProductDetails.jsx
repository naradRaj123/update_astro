// pages/ProductDetail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import cadOne from  '../../assets/images/card1.jpg'
import cadTwo from '../../assets/images/card2.jpg'
import cadThree from '../../assets/images/card3.jpg'

const products = [
  {
    id: "1",
    image: cadThree,
    title: "Dhan Yog Bracelet",
    price: 599,
    oldPrice: 1499,
  },
  {
    id: "2",
    image: cadOne,
    title: "Raw Pyrite Bracelet",
    price: 599,
    oldPrice: 1499,
  },
  {
    id: "3",
    image: cadTwo,
    title: "Maha Dhan Yog Combo",
    price: 799,
    oldPrice: 5997,
  },
  {
    id: "4",
    image: cadThree,
    title: "Energised Dhan Yog Bracelet",
    price: 699,
    oldPrice: 1499,
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id);

  // const handleBuyNow = () => {
  //   navigate(`/checkout/${product.id}`, { state: { product } });
  // };

  const handleBuyNow = () => {
  const isLoggedIn = localStorage.getItem("token"); // Adjust key if different

  if (!isLoggedIn) {
    alert("Please login first to buy the product.");
    navigate("/user-login");
  } else {
    navigate(`/checkout/${product.id}`, { state: { product } });
  }
};

  if (!product) {
    return <div className="p-8 text-center text-red-600">Product Not Found</div>;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="cosmic-text">
              Product Details
              </span>
               
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive astrological solutions for every aspect of your life
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
          <img src={product.image} alt={product.title} className="w-full h-80 object-cover" />
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
            <p className="text-red-600 text-xl font-semibold">₹{product.price}</p>
            <p className="line-through text-gray-500">₹{product.oldPrice}</p>
            <p className="mt-4 text-gray-700">
              This powerful bracelet is designed to bring prosperity, good fortune, and positive energy.
            </p>

            <button
              onClick={handleBuyNow}
              className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
