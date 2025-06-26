// components/Sidebar.jsx
import { Users, Star, BookOpen, LayoutDashboard, ShoppingCart } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => 
    {
    return (
  <div className="w-64 h-screen bg-red-50 p-4">
    <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
    <nav className="flex flex-col gap-4">
      <NavLink to="/admin" className="flex items-center gap-2 text-gray-800"><LayoutDashboard /> Dashboard</NavLink>
      <NavLink to="/admin/astrologer" className="flex items-center gap-2 text-gray-800"><Star /> Astrologers</NavLink>
      <NavLink to="/admin/users" className="flex items-center gap-2 text-gray-800"><Users /> Users</NavLink>
      <NavLink to="/admin/karmkandy" className="flex items-center gap-2 text-gray-800"><BookOpen /> Karmkandi</NavLink>
      <NavLink to="/admin/addproduct" className="flex items-center gap-2 text-gray-800"><ShoppingCart /> Add Product</NavLink>
    </nav>
  </div>
)};

export default Sidebar;
