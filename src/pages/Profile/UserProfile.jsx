import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Bell, LogOut, ArrowLeft } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) navigate("/user-login");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    navigate("/user-login");
  };

  // update feature 
  const [open, setOpen] = React.useState(false);
  const [openRechange,setOpenRecharge]=useState(false);

  const [formData, setFormData] = useState({
    user_name: user?.user_name || "",
    user_phone: user?.user_phone || "",
    dob: user?.dob || "",
    email: user?.email || "",
    _id: user?._id || "",
  });

  const [rechangeAmount,setrecharngeAmount]=useState({
    amount:0,
  });

  // handle change (generic for all inputs)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setrecharngeAmount((prev) => ({ ...prev, [name]: value }));
  };
  const handleModal = () => {
    setOpen(true);
  };

  const handleModalOfRechange=()=>{
    setOpenRecharge(true)
  }


  const handlePaymentRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/web/user/profile", {
        userData: formData,
      });
      if (response.data.status) {
        // alert("✅ Profile updated successfully!");
        setOpen(false);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        // window.location.reload();       
      } else {
        alert("❌ " + response.data.msg);
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Something went wrong");
    }
  };

  // Recharge of wallet
  const [loadingRechange,setLoadingRechange]=useState(false);
  const payNow =async (e) => {
    e.preventDefault();
    setLoadingRechange(true)
    try {
      const { data } = await axios.post("http://localhost:8000/web/user/recharge", {
        amount: rechangeAmount.amount,
        user_id: user?._id,
        customer_name: user?.user_name,    // Required by Cashfree
        customer_email: user?.email,  // Required by Cashfree
        customer_phone: user?.user_phone?.toString()  // Required by Cashfree
      },        
      );
      const payment_link = data.paymentData.link_url;
      setLoadingRechange(false);
      window.location.href = payment_link;
      if (!payment_link) {
        throw new Error("Payment link not received from server");
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      setLoadingRechange(false)
      // toast({
      //   title: "Error",
      //   description: error?.response?.data?.message || "Something went wrong. Try Again ! ",
      //   variant: "destructive",
      //   style: { backgroundColor: "#fff", color: "#000" }
      // });
    } 
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-rose-100 p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center md:text-left">
          Welcome, {user?.user_name || "User"}!
        </h1>
        <div className="flex flex-wrap gap-2 justify-center md:justify-end">
          <Button
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            onClick={() => navigate("/user-update")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Account Settings
          </Button>

          <Button
            variant="outline"
            className="border-gray-400 text-gray-600 hover:bg-gray-200"
            onClick={() => navigate("/user-dashboard")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-100">
            <Bell className="h-6 w-6" />
          </Button>

          <Button variant="destructive" size="lg" onClick={handleLogout}>
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <Card className="w-full max-w-2xl shadow-xl rounded-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800">
              User Profile
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Your personal information
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col items-center mb-6">
              {user?.user_img ? (
                <img
                  src={user.user_img}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center text-white text-3xl font-bold shadow-md">
                  {user?.user_name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
              <p className="mt-3 font-medium text-xl text-gray-700">
                {user?.user_name || "N/A"}
              </p>
              <p className="text-sm text-gray-500">{user?.email || "N/A"}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800 text-sm">
              <div><strong>Full Name:</strong> {user?.user_name || "N/A"}</div>
              <div><strong>Email:</strong> {user?.email || "N/A"}</div>
              <div><strong>Phone:</strong> {user?.user_phone || "N/A"}</div>
              <div><strong>Date of Birth:</strong> {user?.dob || "N/A"}</div>
              <div><strong>User ID:</strong> {user?._id || "N/A"}</div>
              <div  ><strong>Wallet Balance:</strong> ₹{user?.wallet ?? "0"} 
              {/* <Button onClick={() => payNow(user?.wallet)} >Add Fund</Button>  */}
              <Button onClick= {handleModalOfRechange} > Recharge </Button>
              </div>
              <div><strong>Status:</strong> {user?.status ? "Active" : "Inactive"}</div>
              <Button
                onClick={handleModal}
                className="cursor-pointer text-white bg-green-600 hover:bg-green-700 mt-4"
              >
                <strong>Update Profile:</strong>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ✅ Modal Section */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
          <Dialog.Content className="fixed left-1/2 top-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50">
            <Dialog.Title className="text-lg font-semibold mb-4">Update Wallet</Dialog.Title>

            <form onSubmit={handlePaymentRequest}>
              <div className="mb-4">
                <label
                  htmlFor="walletInput"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  id="walletInput"
                  type="text"
                  name="user_name"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.user_name}
                  onChange={handleChange}
                  placeholder="Enter new wallet name"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="walletInput"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  id="walletInput"
                  type="number"
                  name="user_phone"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.user_phone}
                  onChange={handleChange}
                  placeholder="Enter new wallet amount"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="walletInput"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date of Birth
                </label>
                <input
                  id="walletInput"
                  type="date"
                  name='dob'
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.dob}
                  onChange={handleChange}
                  placeholder="Enter  Date of Birth"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="walletInput"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="walletInput"
                  type="email"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter new email"
                />
              </div>


              <div className="flex justify-end gap-2">
                <Dialog.Close asChild>
                  <button type="button" className="bg-gray-200 px-4 py-2 rounded">
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>


      {/* ✅ Rechange modal */}
      <Dialog.Root open={openRechange} onOpenChange={setOpenRecharge}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
          <Dialog.Content className="fixed left-1/2 top-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50">
            <Dialog.Title className="text-lg font-semibold mb-4">Update Wallet Balance </Dialog.Title>
            <form onSubmit={payNow}>
              <div className="mb-4">
                <label
                  htmlFor="walletInput"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Amount
                </label>
                <input
                  id="walletInput"
                  type="text"
                  name="amount"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={rechangeAmount.amount}
                  onChange={handleChange}
                  placeholder="Enter new wallet name"
                />
              </div>                               
              <div className="flex justify-end gap-2">
                <Dialog.Close asChild>
                  <button type="button" className="bg-gray-200 px-4 py-2 rounded">
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  {loadingRechange ? ( <span className=" italic "> Please Wait ..... </span>) : "Pay Now"}
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default UserProfile;
