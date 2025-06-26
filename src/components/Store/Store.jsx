// pages/Store.jsx
import React from "react";
import ProductCard from "./ProductCard";
import malaImg from '../../assets/images/mala.jpeg'
import cadOne from '../../assets/images/card1.jpg'
import cadTwo from '../../assets/images/card2.jpg'
import cadThree from '../../assets/images/card3.jpg'
const products = [
  {
    id: "1",
    image: malaImg,
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
  {
    id: "5",
    image: cadOne,
    title: "Raw Pyrite Bracelet",
    price: 599,
    oldPrice: 1499,
  },
  {
    id: "6",
    image: cadTwo,
    title: "Maha Dhan Yog Combo",
    price: 799,
    oldPrice: 5997,
  },
  {
    id: "7",
    image: cadOne,
    title: "Raw Pyrite Bracelet",
    price: 599,
    oldPrice: 1499,
  },
  {
    id: "8",
    image: cadTwo,
    title: "Maha Dhan Yog Combo",
    price: 799,
    oldPrice: 5997,
  },
  {
    id: "9",
    image: cadThree,
    title: "Energised Dhan Yog Bracelet",
    price: 699,
    oldPrice: 1499,
  },
  {
    id: "10",
    image: cadOne,
    title: "Raw Pyrite Bracelet",
    price: 599,
    oldPrice: 1499,
  },
  {
    id: "11",
    image: cadThree,
    title: "Energised Dhan Yog Bracelet",
    price: 699,
    oldPrice: 1499,
  },
  {
    id: "12",
    image: cadOne,
    title: "Raw Pyrite Bracelet",
    price: 599,
    oldPrice: 1499,
  },
];


const Store = () => {
  return (
    <section  className="py-16 bg-white star-bg common-margin-top">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="cosmic-text">Store</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive astrological solutions for every aspect of your life
          </p>
        </div>
    
    <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Bracelet Store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, idx) => (
          <ProductCard key={idx} {...product} />
        ))}
      </div>
    </div>
    </div>
    </section>
  );
};

export default Store;
