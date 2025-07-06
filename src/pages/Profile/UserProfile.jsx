import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Settings,
  Bell,
  LogOut,
  ArrowLeft,
} from "lucide-react";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/user-login");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/user-login");
  };

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
              <div><strong>Wallet Balance:</strong> ₹{user?.wallet ?? "0"}</div>
              <div><strong>Status:</strong> {user?.status ? "Active" : "Inactive"}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
