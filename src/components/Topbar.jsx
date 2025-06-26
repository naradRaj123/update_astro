// components/Topbar.jsx
import { Bell, LogOut, UserCircle } from "lucide-react";

const Topbar = ({ userName = "Admin", onLogout }) => {
  return (
    <div className="w-full flex items-center justify-between px-6 py-3 bg-white shadow-md z-10">
      <div className="text-xl font-bold text-gray-800">Admin Panel</div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <UserCircle className="w-6 h-6" />
          <span>{userName}</span>
        </div>
        <button className="text-gray-600 hover:text-red-500">
          <Bell className="w-6 h-6" />
        </button>
        <button onClick={onLogout} className="text-gray-600 hover:text-red-500">
          <LogOut className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
