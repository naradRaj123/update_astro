import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  User,
  Settings,
  Bell,
  ShoppingBag,
  Star,
  MessageSquare,
  Video,
  HelpCircle,
  LogOut,
  Zap,
  Heart
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const DashboardCard = ({ title, description, icon, actionText, onActionClick, bgColorClass = "bg-white" }) => {
  const IconComponent = icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={cn('shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl', bgColorClass)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold text-gray-700">{title}</CardTitle>
          {IconComponent && <IconComponent className="h-6 w-6 text-red-500" />}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          {actionText && onActionClick && (
            <Button onClick={onActionClick} className="w-full bg-red-500 hover:bg-red-600 text-white">
              {actionText}
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const UserDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Redirect if not logged in
  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-rose-100 p-4 md:p-8">
      <motion.div
        className="container mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-0">
            Welcome, {user?.user_name || "User"}!
          </h1>
          <div className="flex space-x-2">
            <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
              <Settings className="mr-2 h-4 w-4" /> Account Settings
            </Button>
            <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-100">
              <Bell className="h-6 w-6" />
            </Button>
            <Button variant="destructive" size="lg" onClick={handleLogout}>
              <LogOut className="mr-2 h-5 w-5" /> Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            title="My Profile"
            description="View and update your personal information and preferences."
            icon={User}
            actionText="View Profile"
            onActionClick={() => navigate("/user-profile")}
            bgColorClass="bg-red-50"
          />
          <DashboardCard
            title="Order History"
            description="Track your past consultations, reports, and product purchases."
            icon={ShoppingBag}
            actionText="View Orders"
            onActionClick={() => navigate("/orders")}
          />
          <DashboardCard
            title="Store"
            description="Access our store to get varities of product."
            icon={Star}
            actionText="Visit Store"
            onActionClick={() => navigate("/store")}
          />
          <DashboardCard
            title="Chat History"
            description="Review your past chat conversations with astrologers."
            icon={MessageSquare}
            actionText="View Chats"
            onActionClick={() => navigate("/user-chats", {
              state: {
                user: {
                  id: 1,
                  name: "Alice",
                  img: "https://i.pravatar.cc/50?img=1",
                  messages: [
                    { sender: "Alice", text: "Hi there!" },
                    { sender: "me", text: "Hello Alice 👋" },
                  ],
                },
              }
            }
            )}
          />
                   
        </div>

        <Card className="shadow-lg rounded-xl mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">Quick Actions</CardTitle>
            <CardDescription className="text-sm text-gray-500">Access common features quickly.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="w-full justify-start text-left py-3 border-red-300 hover:border-red-500 hover:bg-red-50"
              onClick={() => navigate("/kundli")}
            >
              <Zap className="mr-3 h-5 w-5 text-red-500" /> New Kundli
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-left py-3 border-red-300 hover:border-red-500 hover:bg-red-50"
              onClick={() => navigate("/matchmaking")}
            >
              <Heart className="mr-3 h-5 w-5 text-red-500" /> Matchmaking
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-left py-3 border-red-300 hover:border-red-500 hover:bg-red-50"
              onClick={() => navigate("/daily-horoscope")}
            >
              <Star className="mr-3 h-5 w-5 text-red-500" /> Daily Horoscope
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-left py-3 border-red-300 hover:border-red-500 hover:bg-red-50"
              onClick={() => navigate("/astrologers")}
            >
              <MessageSquare className="mr-3 h-5 w-5 text-red-500" /> Chat with Astrologer
            </Button>
          </CardContent>
        </Card>

        <div className="text-center mt-10">

        </div>
      </motion.div>

    </div>
  );
};

export default UserDashboard;