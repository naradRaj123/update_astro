
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserCheck, BarChart2, Settings, DollarSign, MessageCircle, Video, FileText, Bell, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, trend, trendColor = "text-green-500" }) => {
  const IconComponent = icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
          {IconComponent && <IconComponent className="h-5 w-5 text-red-500" />}
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-gray-800">{value}</div>
          {trend && <p className={`text-xs ${trendColor} mt-1`}>{trend}</p>}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const AdminDashboard = () => {
  const quickActions = [
    { label: "Manage Users", icon: Users, path: "/admin/users" },
    { label: "Manage Astrologers", icon: UserCheck, path: "/admin/astrologers" },
    { label: "View Reports", icon: FileText, path: "/admin/reports" },
    { label: "System Settings", icon: Settings, path: "/admin/settings" },
    { label: "Broadcast Message", icon: Bell, path: "/admin/broadcast" },
    { label: "Content Moderation", icon: ShieldAlert, path: "/admin/moderation" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-stone-100 p-4 md:p-8">
      <motion.div 
        className="container mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-0">Admin Dashboard</h1>
          <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
            <Settings className="mr-2 h-4 w-4" /> Site Configuration
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Users" value="10,254" icon={Users} trend="+150 this week" />
          <StatCard title="Active Astrologers" value="238" icon={UserCheck} trend="+5 new applications" />
          <StatCard title="Total Revenue" value="$75,890" icon={DollarSign} trend="+5.2% this month" trendColor="text-green-500" />
          <StatCard title="Support Tickets" value="12" icon={MessageCircle} trend="3 new, 9 pending" trendColor="text-orange-500" />
        </div>

        {/* Quick Actions */}
        <Card className="shadow-lg rounded-xl mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">Quick Actions</CardTitle>
            <CardDescription className="text-sm text-gray-500">Perform common administrative tasks.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {quickActions.map(action => {
              const Icon = action.icon;
              return (
                <Button 
                  key={action.label} 
                  variant="outline" 
                  className="w-full justify-start text-left py-4 text-base hover:border-red-500 hover:bg-red-50"
                  onClick={() => console.log(`Navigate to ${action.path}`)}
                >
                  <Icon className="mr-3 h-5 w-5 text-red-500" /> {action.label}
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Activity or Reports Placeholder */}
        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">Recent Activity</CardTitle>
            <CardDescription className="text-sm text-gray-500">Overview of recent platform events.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for a list or chart */}
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
              <BarChart2 className="h-16 w-16 text-gray-300" />
              <p className="ml-4 text-gray-400">Activity data will be displayed here.</p>
            </div>
          </CardContent>
        </Card>

      </motion.div>
    </div>
  );
};

export default AdminDashboard;
  