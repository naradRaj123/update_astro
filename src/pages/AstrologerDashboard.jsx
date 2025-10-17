import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Mail,
  Wallet,
  MessageSquare,
  Phone,
  Video,
  Settings,
  CreditCard,
  Banknote,
  Contact,
  HelpCircle,
  Star,
  Edit,
  Shield,
  LogOut,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import VideoCall from './VideoCall/VideoCall';
import AudioCall from './VoiceCall/VoiceCall';

const StatBox = ({ title, value, subtitle, icon, color = "blue" }) => {
  const IconComponent = icon;
  const colorClasses = {
    blue: "from-blue-500 to-cyan-500",
    green: "from-green-500 to-emerald-500",
    purple: "from-purple-500 to-pink-500",
    orange: "from-orange-500 to-red-500"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="shadow-md border-0 rounded-2xl overflow-hidden">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
              <p className="text-2xl font-bold text-gray-800 mb-1">{value}</p>
              {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
            </div>
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center",
              `bg-gradient-to-r ${colorClasses[color]}`
            )}>
              <IconComponent className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ToggleButton = ({ label, icon, isActive, onToggle, color = "blue", nav }) => {
  const IconComponent = icon;
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    red: "bg-red-500"
  };
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-md border"
      onClick={() => navigate(nav)}
    >
      <div className="flex items-center space-x-3">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          isActive ? colorClasses[color] : "bg-gray-300"
        )}>
          <IconComponent className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="font-semibold text-gray-800">{label}</p>
          <p className={cn(
            "text-sm font-medium",
            isActive ? "text-green-600" : "text-red-600"
          )}>
            {isActive ? "ACTIVE" : "INACTIVE"}
          </p>
        </div>
      </div>
      {/* <Button
        checked={isActive}
        onCheckedChange={onToggle}
        className={cn(
          isActive ? "bg-blue-500" : "bg-gray-300"
        )}
      /> */}
    </motion.div>
  );
};

const ActionButton = ({ label, icon, onClick, variant = "default" }) => {
  const IconComponent = icon;
  const variantClasses = {
    default: "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white",
    outline: "border-2 border-purple-500 text-purple-500 hover:bg-purple-50",
    ghost: "bg-gray-100 text-gray-700 hover:bg-gray-200"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "flex items-center justify-center space-x-2 p-4 rounded-2xl font-semibold transition-all duration-200 shadow-sm",
        variantClasses[variant]
      )}
    >
      <IconComponent className="h-5 w-5" />
      <span>{label}</span>
    </motion.button>
  );
};

const AstrologerDashboard = () => {
  const navigate = useNavigate();
  const astroData = JSON.parse(localStorage.getItem("astroUser") || "{}");
  console.log("userData", astroData);

  const [availability, setAvailability] = useState({
    call: true,
    chat: true,
    videoCall: false
  });

  const [stats, setStats] = useState({
    totalEarnings: "₹1,42,850",
    totalChats: "2,847",
    totalCalls: "1,562",
    monthlyEarnings: "₹24,500"
  });



  const handleToggle = (service) => {
    setAvailability(prev => ({
      ...prev,
      [service]: !prev[service]
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("astroToken");
    localStorage.removeItem("astroData");
    navigate("/astro-login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4 ">
      <motion.div
        className="max-w-4xl md:max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.header
          className="flex justify-between items-center mb-6"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <div className='w-full text-center'>
            <h1 className=" text-2xl md:text-3xl font-bold text-gray-800">Astro Panel</h1>
            {/* <p className="text-gray-600">Manage your astrology services</p> */}
          </div>

        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Astro Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-lg border-0 rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                    {/* Profile Image */}
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {astroData ? (astroData?.astroName.charAt(0)) : ("U")}
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Online
                      </div>
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <div>
                          <h2 className="text-xl font-bold text-gray-800">{astroData.name}</h2>
                          <div className="flex items-center justify-center md:justify-start space-x-2 mt-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium text-gray-700">{astroData.rating}</span>
                            <span className="text-sm text-gray-500">• {astroData.experience} experience</span>
                          </div>
                        </div>
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 mt-2 md:mt-0">
                          Verified
                        </Badge>
                      </div>

                      {/* Contact Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Mail className="h-4 w-4 text-purple-500" />
                          <span>{astroData.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <User className="h-4 w-4 text-purple-500" />
                          <span>ID: {astroData.agoraUID}</span>
                        </div>
                      </div>

                      {/* Specialization */}
                      {/* <div className="mt-3">
                        <p className="text-sm text-gray-600 mb-2">Specialization:</p>
                        <div className="flex flex-wrap gap-2">
                          {astroData.specialization.split(', ').map((spec, index) => (
                            <Badge key={index} variant="outline" className="text-purple-600 border-purple-200">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div> */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <StatBox
                title="Total Earnings"
                value={stats.totalEarnings}
                subtitle="Lifetime"
                icon={Wallet}
                color="green"
              />
              <StatBox
                title="Total Chats"
                value={stats.totalChats}
                subtitle="Sessions"
                icon={MessageSquare}
                color="blue"
              />
              <StatBox
                title="Total Calls"
                value={stats.totalCalls}
                subtitle="Voice & Video"
                icon={Phone}
                color="purple"
              />
              <StatBox
                title="This Month"
                value={stats.monthlyEarnings}
                subtitle="Current earnings"
                icon={TrendingUp}
                color="orange"
              />
            </motion.div>

            {/* Service Toggles */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-gray-800">Service Availability</h3>
              
              <AudioCall channel={astroData?.agoraChannel} uid={astroData?.agoraUID} />

              <ToggleButton
                label="Chat Sessions"
                icon={MessageSquare}
                isActive={availability.chat}
                onToggle={() => handleToggle('chat')}
                color="green"
                nav={"/astro-chathistory"}
              />

              <VideoCall channel={astroData?.agoraChannel} uid={astroData?.agoraUID} />
              
            </motion.div>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            {/* Set Your Rate */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-lg border-0 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                <CardContent className="p-6">
                  <CardTitle className="text-white mb-2">Set Your Rate</CardTitle>
                  <p className="text-purple-100 text-sm mb-4">
                    Update your consultation charges per minute
                  </p>
                  <div className="bg-white/20 rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-purple-100">Current Rate</span>
                      <span className="font-bold text-white">₹25/min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-100">Chat Rate</span>
                      <span className="font-bold text-white">₹15/min</span>
                    </div>
                  </div>
                  <Button className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                    <Edit className="h-4 w-4 mr-2" />
                    Update Rates
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Action Buttons Grid */}
            <motion.div
              className="grid grid-cols-1 gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <ActionButton
                label="Update Profile"
                icon={User}
                onClick={() => navigate('/astro-profile')}
              />
              <ActionButton
                label="Bank Details"
                icon={Banknote}
                onClick={() => navigate('/bank-details')}
                variant="outline"
              />
              <ActionButton
                label="Withdraw Money"
                icon={CreditCard}
                onClick={() => navigate('/withdraw')}
              />
              <ActionButton
                label="Call Support"
                icon={HelpCircle}
                onClick={() => navigate('/support')}
                variant="outline"
              />
              <ActionButton
                label="Manage Contacts"
                icon={Contact}
                onClick={() => navigate('/contacts')}
                variant="ghost"
              />
              <ActionButton
                label="Privacy Settings"
                icon={Shield}
                onClick={() => navigate('/privacy')}
                variant="ghost"
              />
            </motion.div>

            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-red-500 text-red-500 hover:bg-red-50 w-full "
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="shadow-md border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Today's Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pending Requests</span>
                    <Badge variant="outline" className="bg-orange-50 text-orange-600">12</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Completed Today</span>
                    <Badge variant="outline" className="bg-green-50 text-green-600">8</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Earnings Today</span>
                    <span className="font-semibold text-green-600">₹1,850</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AstrologerDashboard;




















//////////////////////////////////////////////////////////////////////////


// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   DollarSign,
//   Users,
//   Share2,
//   Phone,
//   MessageSquare,
//   Video,
//   CalendarCheck2,
//   BarChart2,
//   Settings,
//   Bell,
//   Power,
//   Gift,
//   ShieldCheck,
//   Edit,
//   HelpCircle,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// // import CryptoJS from 'crypto-js';
// import * as Dialog from '@radix-ui/react-dialog';
// import axios from "axios";
// import toastr from 'toastr';
// import 'toastr/build/toastr.min.css';
// import VideoCall from "./VideoCall/VideoCall";
// import { io } from "socket.io-client";
// import AudioCall from "./VoiceCall/VoiceCall";

// const socket = io("https://astro-talk-backend.onrender.com/", {
//   autoConnect: false,
// });

// const StatBox = ({
//   title,
//   value,
//   icon: IconComponent,
//   bgColor = "bg-red-100",
//   textColor = "text-red-700",
// }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 15 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       className={`p-4 rounded-lg shadow ${bgColor}`}
//       role="region"
//       aria-label={`${title} statistics`}
//     >
//       <div className="flex items-center justify-between mb-1">
//         <p className={`text-sm font-medium ${textColor}`}>{title}</p>
//         {IconComponent && <IconComponent className={`h-5 w-5 ${textColor}`} />}
//       </div>
//       <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
//     </motion.div>
//   );
// };

// const ActionButton = ({
//   label,
//   icon: IconComponent,
//   onClick,
//   variant = "default",
//   className = "",
//   disabled = false,
// }) => {
//   const isToggle = label.toLowerCase().includes("disable") || label.toLowerCase().includes("enable");
//   return (
//     <Button
//       onClick={onClick}
//       variant={variant}
//       className={`w-full flex items-center justify-center py-3 ${className}`}
//       disabled={disabled}
//       aria-pressed={isToggle ? (label.toLowerCase().includes("disable") ? true : false) : undefined}
//     >
//       {IconComponent && <IconComponent className="mr-2 h-5 w-5" />}
//       {label}
//     </Button>
//   );
// };

// const DashboardActionItem = ({ title, description, icon: IconComponent }) => {
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" || e.key === " ") {
//       e.preventDefault();
//       // Action on keyboard enter or space if needed
//     }
//   };

//   // astrologer all data

//   // console.log(astroFilterData)




//   return (
//     <motion.div
//       className="p-4 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors cursor-pointer border border-rose-200"
//       whileHover={{ scale: 1.03 }}
//       initial={{ opacity: 0, x: -10 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.3 }}
//       role="button"
//       tabIndex={0}
//       aria-label={`${title}: ${description}`}
//       onKeyDown={handleKeyDown}
//     >
//       <div className="flex items-center mb-2">
//         {IconComponent && <IconComponent className="h-6 w-6 text-red-500 mr-3" />}
//         <h3 className="text-md font-semibold text-gray-700">{title}</h3>
//       </div>
//       <p className="text-xs text-gray-600">{description}</p>
//     </motion.div>
//   );
// };

// const AstrologerDashboard = () => {
//   const [isCallEnabled, setIsCallEnabled] = useState(true);
//   const [isChatEnabled, setIsChatEnabled] = useState(true);
//   const [isVideoEnabled, setIsVideoEnabled] = useState(false);

//   const baseUrl = import.meta.env.VITE_BASE_URL;
//   console.log(baseUrl);

//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("astroUser") || "{}");



//   useEffect(() => {
//     const token = localStorage.getItem("astroToken");
//     socket.on("onlineAstrologers", (data) => {
//       console.log("✅ All Online astrologers:", data);
//     })
//     if (!token) {
//       navigate("/astro-login");
//     }

//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("astroToken");
//     localStorage.removeItem("astroUser");
//     navigate("/astro-login");
//   };


//   const encryptedUser = localStorage.getItem("astroUser");
//   const astroFilterData = JSON.parse(encryptedUser)


//   // open withdrawal modal
//   const [openModal, setOpenModal] = useState(false);
//   const [walletInput, setWalletInput] = useState(astroFilterData.wallet);
//   const handleModal = () => {
//     setOpenModal(true);
//   }

//   // request for payment


//   // login astrologer id
//   console.log("astrologer encripted data", astroFilterData._id);

//   const handlePaymentRequest = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('https://astro-talk-backend.onrender.com/create-order', {
//         amount: Number(walletInput),
//         astrologerId: astroFilterData._id
//       });
//       console.log(response)
//       if (response.data.status) {
//         setOpenModal(false);
//         toastr.success("Withdrawal request submitted successfully.");
//       } else {
//         setOpenModal(false);
//         toastr.error(response.data.message || "Request failed.");
//       }
//     } catch (error) {
//       setOpenModal(false);
//       console.error("Payment request error:", error);
//       toastr.error(error.response?.data?.message || "Withdrawal request submission failed.");
//     }
//   };



//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-4 md:p-8">
//       <motion.div
//         className="container mx-auto"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-0">
//             Welcome, {user?.astroName || user?.name || "Astrologer"}
//           </h1>
//           <div className="flex items-center space-x-3">
//             <Button
//               variant="outline"
//               size="icon"
//               className="text-red-500 border-red-300 hover:bg-red-100"
//               aria-label="Notifications"
//             >
//               <Bell className="h-5 w-5" />
//             </Button>
//             <Button
//               variant="outline"
//               className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
//               aria-label="Profile Settings"
//             >
//               <Settings className="mr-2 h-4 w-4" /> Profile Settings
//             </Button>
//             <Button
//               variant="destructive"
//               size="sm"
//               onClick={handleLogout}
//               aria-label="Logout"
//             >
//               <Power className="mr-1 h-4 w-4" /> Logout
//             </Button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           <div onClick={(handleModal)}>
//             <StatBox
//               title="Today's Earnings"
//               value={`₹ ${astroFilterData.wallet}  `}
//               icon={DollarSign}
//               bgColor="bg-green-100"
//               textColor="text-green-700"
//               style={{ cursor: 'pointer' }}

//             />
//           </div>
//           <StatBox title="Total Earnings" value="₹85,600" icon={DollarSign} />
//           <StatBox title="Followers" value="1.2K" icon={Users} />
//           <StatBox
//             title="Profile Shares"
//             value="350"
//             icon={Share2}
//             bgColor="bg-blue-100"
//             textColor="text-blue-700"
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <Card className="md:col-span-1 shadow-xl rounded-xl">
//             <CardHeader>
//               <CardTitle className="text-xl font-semibold text-gray-700">
//                 Controls
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {/* <ActionButton
//                 label={isCallEnabled ? "Disable Calls" : "Enable Calls"}
//                 icon={Phone}
//                 onClick={() => setIsCallEnabled(!isCallEnabled)}
//                 variant={isCallEnabled ? "destructive" : "default"}
//                 className={isCallEnabled ? "" : "bg-green-500 hover:bg-green-600"}
//               /> */}
//               <ActionButton
//                 label={"Open Chat"}
//                 icon={MessageSquare}
//                 onClick={() => navigate('/astro-chathistory')}
//                 variant={isChatEnabled ? "destructive" : "default"}
//                 className={"bg-green-500 hover:bg-green-600"}
//               />
//               {/* <ActionButton
//                 label={isVideoEnabled ? "Disable Video" : "Enable Video Call"}
//                 icon={Video}
//                 onClick={() => setIsVideoEnabled(!isVideoEnabled)}
//                 variant={isVideoEnabled ? "destructive" : "default"}
//                 className={isVideoEnabled ? "" : "bg-green-500 hover:bg-green-600"}
//               /> */}
//               <VideoCall channel={astroFilterData?.agoraChannel} uid={Math.floor(Math.random() * 1000000)} />

//               <AudioCall channel={astroFilterData?.agoraChannel} uid={astroFilterData?.agoraUID} />
//               {/* <ActionButton
//                 label="Go Live"
//                 icon={CalendarCheck2}
//                 className="bg-red-500 hover:bg-red-600 text-white"
//               /> */}
//               {/* <ActionButton
//                 label="Boost My Profile"
//                 icon={ShieldCheck}
//                 variant="outline"
//                 className="text-red-500 border-red-500 hover:bg-red-50"
//               /> */}
//             </CardContent>
//           </Card>

//           <Card className="md:col-span-2 shadow-xl rounded-xl">
//             <CardHeader>
//               <CardTitle className="text-xl font-semibold text-gray-700">
//                 Performance & Tools
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {/* <DashboardActionItem
//                 title="View Performance"
//                 description="Track your earnings and ratings."
//                 icon={BarChart2}
//               /> */}
//               <DashboardActionItem
//                 title="Chat History"
//                 description="Review past client conversations."
//                 icon={MessageSquare}
//                 onClick={() => {
//                   alert("click")
//                 }}
//               />
//               <DashboardActionItem
//                 title="Call History"
//                 description="Access records of previous calls."
//                 icon={Video}
//               />
//               {/* <DashboardActionItem
//                 title="Support Center"
//                 description="Get help and report issues."
//                 icon={HelpCircle}
//               /> */}
//               <DashboardActionItem
//                 title="Edit Profile"
//                 description="Update your details and expertise."
//                 icon={Edit}
//               />
//               {/* <DashboardActionItem
//                 title="Free Chat/Call Offers"
//                 description="Manage promotional offers."
//                 icon={Gift}
//               /> */}
//               {/* <DashboardActionItem
//                 title="Get Birth Details"
//                 description="Access client birth information."
//                 icon={Users}
//               /> */}
//               <DashboardActionItem
//                 title="Set Your Rate"
//                 description="Adjust your consultation charges."
//                 icon={DollarSign}
//               />
//             </CardContent>
//           </Card>
//         </div>

//         {/* <Card className="shadow-lg rounded-xl">
//           <CardHeader>
//             <CardTitle className="text-xl font-semibold text-gray-700">
//               Recent Activity
//             </CardTitle>
//             <CardDescription className="text-sm text-gray-500">
//               Latest interactions and notifications.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="h-40 flex items-center justify-center bg-gray-50 rounded-md">
//               <p className="text-gray-400">No new activity.</p>
//             </div>
//           </CardContent>
//         </Card> */}
//       </motion.div>

//       {/* withdrawal modal */}
//       {openModal && (
//         <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
//           <Dialog.Trigger asChild>
//             <button className="cursor-pointer bg-green-100 text-green-700 px-4 py-2 rounded">
//               Update Wallet
//             </button>
//           </Dialog.Trigger>

//           <Dialog.Portal>
//             <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
//             <Dialog.Content className="fixed left-1/2 top-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50">
//               <Dialog.Title className="text-lg font-semibold mb-4">Update Wallet</Dialog.Title>

//               <form onSubmit={handlePaymentRequest}>
//                 <input
//                   type="number"
//                   className="w-full p-2 border border-gray-300 rounded mb-4"
//                   value={walletInput}
//                   onChange={(e) => setWalletInput(e.target.value)}
//                   placeholder="Enter new wallet amount"
//                   name="paymentValue"
//                 />

//                 <div className="flex justify-end gap-2">
//                   <Dialog.Close asChild>
//                     <button type="button" className="bg-gray-200 px-4 py-2 rounded">
//                       Cancel
//                     </button>
//                   </Dialog.Close>
//                   <button
//                     type="submit"
//                     className="bg-green-600 text-white px-4 py-2 rounded"
//                   >
//                     Save
//                   </button>
//                 </div>
//               </form>
//             </Dialog.Content>
//           </Dialog.Portal>
//         </Dialog.Root>
//       )
//       }
//     </div>
//   );
// };

// export default AstrologerDashboard;













/////////////////////////////////////////////////////////////////////////////////////////////////////////



























































