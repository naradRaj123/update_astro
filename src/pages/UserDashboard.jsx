// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import {
//   User,
//   Settings,
//   Bell,
//   ShoppingBag,
//   Star,
//   MessageSquare,
//   Video,
//   HelpCircle,
//   LogOut,
//   Zap,
//   Heart
// } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { cn } from '@/lib/utils';

// const DashboardCard = ({ title, description, icon, actionText, onActionClick, bgColorClass = "bg-white" }) => {
//   const IconComponent = icon;
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <Card className={cn('shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl', bgColorClass)}>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-lg font-semibold text-gray-700">{title}</CardTitle>
//           {IconComponent && <IconComponent className="h-6 w-6 text-red-500" />}
//         </CardHeader>
//         <CardContent>
//           <p className="text-sm text-gray-600 mb-4">{description}</p>
//           {actionText && onActionClick && (
//             <Button onClick={onActionClick} className="w-full bg-red-500 hover:bg-red-600 text-white">
//               {actionText}
//             </Button>
//           )}
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// };

// const UserDashboard = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   // Redirect if not logged in
//   useEffect(() => {
//     const token = localStorage.getItem("userToken");
//     if (!token) {
//       navigate("/user-login");
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/user-login");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-rose-100 p-4 md:p-8 mt-16">
//       <motion.div
//         className="container mx-auto"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-0">
//             Welcome, {user?.user_name || "User"}!
//           </h1>
//           <div className="flex space-x-2">
//             <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
//               <Settings className="mr-2 h-4 w-4" /> Account Settings
//             </Button>
//             <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-100">
//               <Bell className="h-6 w-6" />
//             </Button>
//             <Button variant="destructive" size="lg" onClick={handleLogout}>
//               <LogOut className="mr-2 h-5 w-5" /> Logout
//             </Button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           <DashboardCard
//             title="My Profile"
//             description="View and update your personal information and preferences."
//             icon={User}
//             actionText="View Profile"
//             onActionClick={() => navigate("/user-profile")}
//             bgColorClass="bg-red-50"
//           />
//           <DashboardCard
//             title="Order History"
//             description="Track your past consultations, reports, and product purchases."
//             icon={ShoppingBag}
//             actionText="View Orders"
//             onActionClick={() => navigate("/orders")}
//           />
//           <DashboardCard
//             title="Store"
//             description="Access our store to get varities of product."
//             icon={Star}
//             actionText="Visit Store"
//             onActionClick={() => navigate("/store")}
//           />
//           <DashboardCard
//             title="Chat History"
//             description="Review your past chat conversations with astrologers."
//             icon={MessageSquare}
//             actionText="View Chats"
//             onActionClick={() => navigate("/user-chats")}
//           />
                   
//         </div>

//         <Card className="shadow-lg rounded-xl mb-8">
//           <CardHeader>
//             <CardTitle className="text-xl font-semibold text-gray-700">Quick Actions</CardTitle>
//             <CardDescription className="text-sm text-gray-500">Access common features quickly.</CardDescription>
//           </CardHeader>
//           <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//             <Button
//               variant="outline"
//               className="w-full justify-start text-left py-3 border-red-300 hover:border-red-500 hover:bg-red-50"
//               onClick={() => navigate("/kundli")}
//             >
//               <Zap className="mr-3 h-5 w-5 text-red-500" /> New Kundli
//             </Button>
//             <Button
//               variant="outline"
//               className="w-full justify-start text-left py-3 border-red-300 hover:border-red-500 hover:bg-red-50"
//               onClick={() => navigate("/matchmaking")}
//             >
//               <Heart className="mr-3 h-5 w-5 text-red-500" /> Matchmaking
//             </Button>
//             <Button
//               variant="outline"
//               className="w-full justify-start text-left py-3 border-red-300 hover:border-red-500 hover:bg-red-50"
//               onClick={() => navigate("/daily-horoscope")}
//             >
//               <Star className="mr-3 h-5 w-5 text-red-500" /> Daily Horoscope
//             </Button>
//             <Button
//               variant="outline"
//               className="w-full justify-start text-left py-3 border-red-300 hover:border-red-500 hover:bg-red-50"
//               onClick={() => navigate("/astrologers")}
//             >
//               <MessageSquare className="mr-3 h-5 w-5 text-red-500" /> Chat with Astrologer
//             </Button>
//           </CardContent>
//         </Card>

//         <div className="text-center mt-10">

//         </div>
//       </motion.div>

//     </div>
//   );
// };

// export default UserDashboard;







import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  User,
  Settings,
  ShoppingBag,
  History,
  LogOut,
  Wallet,
  CreditCard,
  Zap,
  MessageSquare,
  Star,
  Gem,
  Clock,
  Shield,
  HelpCircle,
  Phone,
  Mail
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const FeatureCard = ({ 
  title, 
  icon, 
  onClick, 
  description,
  badge,
  badgeColor = "bg-purple-500",
  gradient = "from-purple-500 to-blue-500"
}) => {
  const IconComponent = icon;
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border-0  h-full"
        onClick={onClick}
      >
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center mb-3",
            `bg-gradient-to-r ${gradient}`
          )}>
            <IconComponent className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-sm font-semibold text-gray-800 mb-1">
            {title}
          </CardTitle>
          {description && (
            <p className="text-xs text-gray-600 mb-2">{description}</p>
          )}
          {badge && (
            <span className={cn(
              "text-xs text-white px-2 py-1 rounded-full",
              badgeColor
            )}>
              {badge}
            </span>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [walletBalance, setWalletBalance] = useState(250);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);
    
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/user-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/user-login");
  };

  const features = [
    {
      title: "My Profile",
      icon: User,
      description: "Personal & astro details",
      gradient: "from-blue-500 to-cyan-500",
      onClick: () => navigate("/profile")
    },
    {
      title: "My Orders",
      icon: ShoppingBag,
      description: "Consultations & products",
      badge: "3 pending",
      badgeColor: "bg-orange-500",
      gradient: "from-orange-500 to-red-500",
      onClick: () => navigate("/orders")
    },
    {
      title: "Wallet",
      icon: Wallet,
      description: `Balance: ₹${walletBalance}`,
      badge: "Low",
      badgeColor: "bg-red-500",
      gradient: "from-green-500 to-emerald-500",
      onClick: () => navigate("/wallet")
    },
    {
      title: "Astrology Assists",
      icon: MessageSquare,
      description: "24/7 support",
      badge: "Live",
      badgeColor: "bg-green-500",
      gradient: "from-purple-500 to-pink-500",
      onClick: () => navigate("/astrology-assist")
    },
    {
      title: "Card Recharge",
      icon: CreditCard,
      description: "Recharge your card",
      gradient: "from-indigo-500 to-purple-500",
      onClick: () => navigate("/card-recharge")
    },
    {
      title: "Top Up",
      icon: Zap,
      description: "Instant wallet topup",
      gradient: "from-yellow-500 to-amber-500",
      onClick: () => navigate("/topup")
    },
    {
      title: "Shop",
      icon: Gem,
      description: "Gems & products",
      badge: "New",
      badgeColor: "bg-pink-500",
      gradient: "from-pink-500 to-rose-500",
      onClick: () => navigate("/shop")
    },
    {
      title: "History",
      icon: History,
      description: "Past consultations",
      gradient: "from-gray-500 to-slate-600",
      onClick: () => navigate("/history")
    },
    {
      title: "Settings",
      icon: Settings,
      description: "App preferences",
      gradient: "from-slate-600 to-gray-700",
      onClick: () => navigate("/settings")
    },
    {
      title: "Help & Support",
      icon: HelpCircle,
      description: "Get help",
      gradient: "from-teal-500 to-cyan-500",
      onClick: () => navigate("/support")
    },
    {
      title: "Privacy",
      icon: Shield,
      description: "Data security",
      gradient: "from-blue-600 to-indigo-600",
      onClick: () => navigate("/privacy")
    },
    {
      title: "Logout",
      icon: LogOut,
      description: "Sign out safely",
      gradient: "from-red-500 to-rose-500",
      onClick: handleLogout
    }
  ];

  // Quick actions for top section
  const quickActions = [
    {
      title: "Chat Now",
      icon: MessageSquare,
      color: "from-green-500 to-teal-500",
      onClick: () => navigate("/user-chats")
    },
    {
      title: "Call Expert",
      icon: Phone,
      color: "from-blue-500 to-indigo-500",
      onClick: () => navigate("/call")
    },
    {
      title: "Live Session",
      icon: Star,
      color: "from-purple-500 to-pink-500",
      onClick: () => navigate("/live")
    },
    {
      title: "Email Report",
      icon: Mail,
      color: "from-orange-500 to-red-500",
      onClick: () => navigate("/email-report")
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 p-4 mt-[6rem] mb-[3.5rem] ">
      <motion.div
        className="max-w-md md:max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.header 
          className="text-center mb-6"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <div className="flex items-center justify-center mb-3">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {user?.user_name?.charAt(0) || "U"}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {user?.user_name || "User"}!
          </h1>
          <p className="text-gray-600 text-sm mt-1">Pisces • Moon in Cancer</p>
          <div className="flex justify-center space-x-2 mt-3">
            <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
              Balance: ₹{walletBalance}
            </span>
            <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
              12 Orders
            </span>
          </div>
        </motion.header>

        {/* Quick Actions */}
        <motion.div 
          className="grid grid-cols-4 gap-2 md:gap-10 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {quickActions.map((action, index) => (
            <motion.button
              key={action.title}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={action.onClick}
              className={cn(
                "flex flex-col items-center justify-center p-3 md:p-6 rounded-xl text-white font-medium text-xs md:text-base",
                `bg-gradient-to-r ${action.color} shadow-md`
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <action.icon className="h-5 w-5 md:h-8 md:w-8 mb-1" />
              <span>{action.title}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Main Features Grid */}
        <motion.div 
          className="grid grid-cols-3 gap-3 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div 
          className="grid grid-cols-3 gap-3 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white shadow-md rounded-xl text-center p-3">
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-xs text-gray-600">Sessions</div>
          </Card>
          <Card className="bg-white shadow-md rounded-xl text-center p-3">
            <div className="text-2xl font-bold text-green-600">8</div>
            <div className="text-xs text-gray-600">Reports</div>
          </Card>
          <Card className="bg-white shadow-md rounded-xl text-center p-3">
            <div className="text-2xl font-bold text-blue-600">4.8</div>
            <div className="text-xs text-gray-600">Rating</div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserDashboard;