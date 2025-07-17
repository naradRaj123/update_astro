import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  Users,
  Share2,
  Phone,
  MessageSquare,
  Video,
  CalendarCheck2,
  BarChart2,
  Settings,
  Bell,
  Power,
  Gift,
  ShieldCheck,
  Edit,
  HelpCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// import CryptoJS from 'crypto-js';
import * as Dialog from '@radix-ui/react-dialog';
import axios from "axios";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

import { toast } from "@/components/ui/use-toast";


const StatBox = ({
  title,
  value,
  icon: IconComponent,
  bgColor = "bg-red-100",
  textColor = "text-red-700",
}) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className={`p-4 rounded-lg shadow ${bgColor}`}
  >
    <div className="flex items-center justify-between mb-1">
      <p className={`text-sm font-medium ${textColor}`}>{title}</p>
      {IconComponent && <IconComponent className={`h-5 w-5 ${textColor}`} />}
    </div>
    <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
  </motion.div>
);

const ActionButton = ({
  label,
  icon: IconComponent,
  onClick,
  variant = "default",
  className = "",
  disabled = false,
}) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      className={`w-full flex items-center justify-center py-3 ${className}`}
      disabled={disabled}
    >
      {IconComponent && <IconComponent className="mr-2 h-5 w-5" />}
      {label}
    </Button>
  );
};


const DashboardActionItem = ({ title, description, icon: IconComponent, onClick }) => (
  <motion.div
    className="p-4 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors cursor-pointer border border-rose-200"
    whileHover={{ scale: 1.03 }}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
    role="button"
    onClick={onClick}
  >
    <div className="flex items-center mb-2">
      {IconComponent && <IconComponent className="h-6 w-6 text-red-500 mr-3" />}
      <h3 className="text-md font-semibold text-gray-700">{title}</h3>
    </div>
    <p className="text-xs text-gray-600">{description}</p>
  </motion.div>
);

const AstrologerDashboard = () => {
  const [isCallEnabled, setIsCallEnabled] = useState(true);
  const [isChatEnabled, setIsChatEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("astroUser") || "{}");

  useEffect(() => {
    const token = localStorage.getItem("astroToken");
    if (!token) {
      setTimeout(() => {
        toast({
          title: "Session Expired",
          description: "Please login again.",
          variant: "destructive",
        });
        navigate("/astro-login");
      }, 1000);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("astroToken");
    localStorage.removeItem("astroUser");
    navigate("/astro-login");
  };



  const encryptedUser = localStorage.getItem("astroUser");
  const astroFilterData = JSON.parse(encryptedUser)


  // open withdrawal modal
  const [openModal, setOpenModal] = useState(false);
  const [walletInput, setWalletInput] = useState(astroFilterData.wallet);
  const handleModal=()=>{
    setOpenModal(true);
  }

  // request for payment


  // login astrologer id
  console.log(astroFilterData._id);
  
  const handlePaymentRequest=async(e)=>{
    e.preventDefault();
    
    // request create
    const paymentData=await axios.post('http://localhost:8000/create-order', 
      { amount:walletInput, astrologerId:astroFilterData._id })
    .then((res)=>{
        
        if(res.data.status){
          setOpenModal(false)
          toastr.success("Withdrawal request submitted successfully.")
        }
    })
    .catch((error)=>{
      setOpenModal(false)
          toastr.error("Withdrawal request submitted Failed.")
    })
    
  }


  const handleProfileSettingsClick = () => {
    navigate("/astro-update");
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-4 md:p-8">
      <motion.div
        className="container mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >

        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-0">
            Welcome, {user?.astroName || user?.name || "Astrologer"}
          </h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <img
              src={user?.profileimg || `https://ui-avatars.com/api/?name=${user?.astroName || "Astrologer"}`}
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-rose-300 shadow"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Welcome, {user?.astroName || "Astrologer"}
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="icon" className="text-red-500 border-red-300 hover:bg-red-100">
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              onClick={handleProfileSettingsClick}
            >
              <Settings className="mr-2 h-4 w-4" /> Profile Settings
            </Button>
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              <Power className="mr-1 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>


        <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div onClick={(handleModal)}>
          <StatBox
            title="Today's Earnings"
            value={`₹ ${astroFilterData.wallet}  `}
            icon={DollarSign}
            bgColor="bg-green-100"
            textColor="text-green-700"
            style={{ cursor: 'pointer' }}
            
          />
          </div>
          <StatBox title="Total Earnings" value="₹85,600" icon={DollarSign} />
          <StatBox title="Followers" value="1.2K" icon={Users} />
          <StatBox title="Profile Shares" value="350" icon={Share2} bgColor="bg-blue-100" textColor="text-blue-700" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-1 shadow-xl rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700">Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ActionButton
                label={isCallEnabled ? "Disable Calls" : "Enable Calls"}
                icon={Phone}
                onClick={() => setIsCallEnabled(!isCallEnabled)}
                variant={isCallEnabled ? "destructive" : "default"}
              />
              <ActionButton
                label={isChatEnabled ? "Disable Chat" : "Enable Chat"}
                icon={MessageSquare}
                onClick={() => setIsChatEnabled(!isChatEnabled)}
                variant={isChatEnabled ? "destructive" : "default"}
              />
              <ActionButton
                label={isVideoEnabled ? "Disable Video" : "Enable Video Call"}
                icon={Video}
                onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                variant={isVideoEnabled ? "destructive" : "default"}
              />
              <ActionButton label="Go Live" icon={CalendarCheck2} className="bg-red-500 hover:bg-red-600 text-white" />
              <ActionButton label="Boost My Profile" icon={ShieldCheck} variant="outline" className="text-red-500 border-red-500 hover:bg-red-50" />
            </CardContent>
          </Card>

          <Card className="md:col-span-2 shadow-xl rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700">Performance & Tools</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DashboardActionItem title="View Performance" description="Track your earnings and ratings." icon={BarChart2} />
              <DashboardActionItem title="Chat History" description="Review past client conversations." icon={MessageSquare} />
              <DashboardActionItem title="Call History" description="Access records of previous calls." icon={Video} />
              <DashboardActionItem title="Support Center" description="Get help and report issues." icon={HelpCircle} />
              <DashboardActionItem title="Edit Profile" description="Update your details and expertise." icon={Edit} onClick={() => navigate("/astro-profile")} />
              <DashboardActionItem title="Free Chat/Call Offers" description="Manage promotional offers." icon={Gift} />
              <DashboardActionItem title="Get Birth Details" description="Access client birth information." icon={Users} />
              <DashboardActionItem title="Set Your Rate" description="Adjust your consultation charges." icon={DollarSign} />
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">Recent Activity</CardTitle>
            <CardDescription className="text-sm text-gray-500">Latest interactions and notifications.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 flex items-center justify-center bg-gray-50 rounded-md">
              <p className="text-gray-400">No new activity.</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* withdrawal modal */}
      {openModal && (
        <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
          <Dialog.Trigger asChild>
            <button className="cursor-pointer bg-green-100 text-green-700 px-4 py-2 rounded">
              Update Wallet
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
            <Dialog.Content className="fixed left-1/2 top-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50">
              <Dialog.Title className="text-lg font-semibold mb-4">Update Wallet</Dialog.Title>

              <form onSubmit={handlePaymentRequest}>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  value={walletInput}
                  onChange={(e) => setWalletInput(e.target.value)}
                  placeholder="Enter new wallet amount"
                  name="paymentValue"
                />

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
      )
      }


    </div>
  );
};

export default AstrologerDashboard;
