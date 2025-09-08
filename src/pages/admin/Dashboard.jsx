// pages/admin/Dashboard.jsx
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

import { Star, Users, BookOpen, CalendarCheck } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/admin-login";
  };

  // ✅ Static data for dashboard summary
  const dashboardData = [
    {
      title: "Total Astrologers",
      value: 32,
      icon: Star,
      color: "bg-red-200",
    },
    {
      title: "Total Users",
      value: 120,
      icon: Users,
      color: "bg-green-200",
    },
    {
      title: "Karmkandi Services",
      value: 15,
      icon: BookOpen,
      color: "bg-yellow-200",
    },
    {
      title: "Appointments Today",
      value: 7,
      icon: CalendarCheck,
      color: "bg-blue-200",
    },
  ];


  // check location 
  const location = useLocation();
  console.log(location.pathname)

  // get token from localstorage
  // const loginToken=localStorage.getItem('admin_token');
  //   if(loginToken==""){
  //     window.location.href='/admin-login';
  //   }




  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen bg-gray-50">
        <Topbar userName="Admin" onLogout={handleLogout} />
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

          {/* Loop through static data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardData.map((item, index) => (
              <DashboardCard
                key={index}
                title={item.title}
                value={item.value}
                icon={item.icon}
                color={item.color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
