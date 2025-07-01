// pages/admin/Astrologers.jsx
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import * as Label from "@radix-ui/react-label";
import * as React from "react";
// import { title } from "process";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { useRef } from "react";


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




  // set charge modal (charge perSession)
  const [formData, setForm] = useState({
    title: "",
    shorttitle: "",
    description: "",
    price: "",
    discount: "",
    status: "",
    image: null,
  });

  // handle change value in input box
  const handleChange = (e) => {
    const { name, value,files } = e.target;
    console.log(e.target)
    if (name === "image") {
    setForm((prev) => ({
      ...prev,
      image: files[0], // 👈 this must be a File object
    }));
  } else {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  }


  // validate form
  const validateForm = () => {
    const requiredFields = [
      { key: 'title', label: 'Title' },
      { key: 'shorttitle', label: 'Short Title' },
      { key: 'description', label: 'Description' },
      { key: 'price', label: 'Price' },
      { key: 'discount', label: 'Discount' },
      { key: 'status', label: 'Status' },
      { key: 'image', label: 'Image' },
    ];

    for (let field of requiredFields) {
      const value = formData[field.key];
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        toastr.error(`${field.label} is required`, 'Validation Error');
        return false;
      }
    }

    return true;
  };


  // submit form
 const formRef=useRef(null);
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) {
    return;
  }
  setLoading(true)
  // toastr.info("");

  // ✅ Create FormData object for file upload
  const data = new FormData();
  data.append("title", formData.title);
  data.append("shorttitle", formData.shorttitle);
  data.append("description", formData.description);
  data.append("price", formData.price);
  data.append("discount", formData.discount);
  data.append("status", formData.status);
  data.append("image", formData.image); // important: File object

  try {
    const res = await axios.post(
      `https://astro-talk-backend.onrender.com/web/addproduct`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.data?.status) {
      setLoading(false)
      toastr.success(res.data.msg || "Product added successfully!");
      setForm({
        title: "",
        shorttitle: "",
        description: "",
        price: "",
        discount: "",
        status: "",
        image: null,
      });
      formRef.current.reset();
      window.location.href='/admin/productlist'
    } else {
      toastr.error(res.data.msg || "Something went wrong");
    }
  } catch (error) {
    console.error("Upload Error:", error);
    if (error.response) {
      toastr.error(error.response.data?.msg || "Server error", "Server Error");
    } else if (error.request) {
      toastr.error("No response from server", "Network Error");
    } else {
      toastr.error(error.message || "Unexpected error", "Error");
    }
  }
};





  


  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-xl font-semibold mb-4">Add Product</h1>

        {/* add here form */}
        <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-xl border">
          <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data" ref={formRef}>

            <div className="flex flex-col md:flex-row gap-4">
              {/* Product Title */}
              <div className=" w-full space-y-2">
                <Label.Root htmlFor="title" className="text-gray-700 font-medium">
                  Product Title
                </Label.Root>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Product title"
                />
              </div>
              {/* Product Short Title */}
              <div className="w-full space-y-2">
                <Label.Root htmlFor="shorttitle" className="text-gray-700 font-medium">
                  Product Short Title
                </Label.Root>
                <input
                  type="text"
                  name="shorttitle"
                  value={formData.shorttitle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Short Title"
                />
              </div>
            </div>




            {/* Product Description */}
            <div className="space-y-2">
              <Label.Root htmlFor="description" className="text-gray-700 font-medium">
                Product Description
              </Label.Root>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product description"
              />
            </div>

            {/* Product Image */}
            <div className="space-y-2">
              <Label.Root htmlFor="image" className="text-gray-700 font-medium">
                Product Image
              </Label.Root>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>


            <div className="flex flex-col md:flex-row gap-4">
              {/* Product Price */}
              <div className="w-full space-y-2">
                <Label.Root htmlFor="price" className="text-gray-700 font-medium">
                  Product Price
                </Label.Root>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="INR 200"
                />
              </div>
              {/* Product Discount */}
              <div className="w-full space-y-2">
                <Label.Root htmlFor="discount" className="text-gray-700 font-medium">
                  Product Discount
                </Label.Root>
                <input
                  type="text"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="INR 20"
                />
              </div>
            </div>

            {/* Product Status */}
            <div className="space-y-2">
              <Label.Root className="text-gray-700 font-medium">
                Product Status
              </Label.Root>
              <div className="flex items-center gap-6 mt-1">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="1"
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Active
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="0"
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Deactive
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition duration-200"
            >
              Submit Product
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AddProduct;
