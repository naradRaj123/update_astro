// pages/admin/Astrologers.jsx
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import * as Label from "@radix-ui/react-label";
import * as React from "react";
// import { title } from "process";

const AddProduct = () => {
  const [astrologerlist, setAstrologers] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchAstrologers = async () => {
    try {
      const res = await axios.get("https://astro-talk-backend.onrender.com/web/astro/astrolist");
      setAstrologers(res.data.data || []);
    } catch (error) {
      console.error("Error fetching astrologers:", error);
      setAstrologers([]);
    } finally {
      setLoading(false);
    }
  };


  // status change 
  

  // set charge modal (charge perSession)
  const [email, setEmail] = useState("");
  const [formData, setForm] = useState({
   title: "",
    shorttitle: "",
    description: "",
    price: "",
    discount: "",
    status: "",
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value)
  };

  // handle hcange
  const handleChange=(e)=>{
    const  {name,value}= e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
 

//   const handleChargeSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const res = await axios.post("https://astro-talk-backend.onrender.com/admin/astroChargeUpdate", {
//         astroId: astroId,
//         sessionCharge: chargeValue,
//         accountType:accountType
//       });

//       if (res.data.status) {
//         setChargeModalOpen(false);
//         fetchAstrologers();
//       } else {
//         alert("Update failed");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//     }
//   };

  

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-xl font-semibold mb-4">Add Product</h1>

        {/* add here form */}
        <div className="max-w-lg mx-auto  bg-white p-8 rounded-2xl shadow-xl border">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800"></h2>
      <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data" >
        {/* Title */}
        <div className="space-y-2">
          <Label.Root htmlFor="email" className="text-gray-700 font-medium">
            Product title
          </Label.Root>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Product title"
            
          />
        </div>

        {/* Product short title */}
        <div className="space-y-2">
          <Label.Root htmlFor="password" className="text-gray-700 font-medium">
            Product Short Title
          </Label.Root>
          <input
            name="shorttitle"
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.shorttitle}
            onChange={handleChange}
            placeholder="Short Title"
          />
        </div>

        {/* Product Description */}
        <div className="space-y-2">
          <Label.Root htmlFor="password" className="text-gray-700 font-medium">
            Product Description
          </Label.Root>
          <textarea
            id="shorttitle"
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            // onChange={(e) => setPassword(e.target.value)}
            placeholder="Short Title"
          >
            </textarea>
        </div>

        {/* Product Images */}
        <div className="space-y-2">
          <Label.Root htmlFor="password" className="text-gray-700 font-medium">
            Product Image
          </Label.Root>
          <input
            type="file"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            // onChange={(e) => setPassword(e.target.value)}
            placeholder="Short Title"
          />
        </div>

        {/* Product price */}
        <div className="space-y-2">
          <Label.Root htmlFor="password" className="text-gray-700 font-medium">
            Product Price
          </Label.Root>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            // onChange={(e) => setPassword(e.target.value)}
            placeholder="INR 200"
          />
        </div>

        {/* Product Discount */}
        <div className="space-y-2">
          <Label.Root htmlFor="password" className="text-gray-700 font-medium">
            Product Discount
          </Label.Root>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            // onChange={(e) => setPassword(e.target.value)}
            placeholder="INR 20"
          />
        </div>

        {/* Product Status */}
        <div className="space-y-2">
          <Label.Root htmlFor="password" className="text-gray-700 font-medium">
            Product Status
          </Label.Root>
          <br/>
          <input
            type="radio"
            name="status"
            value={1}
            className="ms-2 me-1"
          />
          Active

          <input
            type="radio"
            name="status"
            value={0}
            className="ms-2 me-1"
          />
          Deactive
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition duration-200"
        >
          Sign In
        </button>
      </form>
    </div>
        
        

        
        



      </div>
    </div>
  );
};

export default AddProduct;
