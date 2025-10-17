import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, LogOut, Settings, ArrowLeft } from 'lucide-react';

const AstroProfile = () => {
  const navigate = useNavigate();
  const astro = JSON.parse(localStorage.getItem("astroUser") || "{}"); // ✅ Correct key

  useEffect(() => {
    const token = localStorage.getItem("astroToken"); // ✅ Check token
    if (!token) navigate("/astro-login");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("astroToken");
    localStorage.removeItem("astroUser");
    navigate("/astro-login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-rose-100 p-4 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center md:text-left">
          Welcome, {astro?.astroName || "Astrologer"}!
        </h1>
        
      </div>

      {/* Profile Card */}
      <Card className="max-w-2xl mx-auto shadow-lg rounded-xl border border-gray-200 bg-white">
        <CardHeader className="text-center">
          <div className="flex flex-col items-center space-y-3">
            <img
              src={astro?.profileimg || "https://ui-avatars.com/api/?name=Astrologer"}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-red-300 shadow"
            />
            <CardTitle className="text-3xl font-bold text-gray-800">
              Astrologer Profile
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 text-gray-800 text-sm">
          <div><strong>Name:</strong> {astro?.astroName || "N/A"}</div>
          <div><strong>Email:</strong> {astro?.email || "N/A"}</div>
          <div><strong>Mobile:</strong> {astro?.mobile || "N/A"}</div>
          <div><strong>Experience:</strong> {astro?.experience || "N/A"} years</div>
          <div><strong>Languages:</strong> {astro?.language || "N/A"}</div>
          <div><strong>Expertise:</strong> {astro?.expertise || "N/A"}</div>
          <div><strong>Charge per Session:</strong> ₹{astro?.chargePerSession || "N/A"}</div>
          <div><strong>Available Time:</strong> {astro?.availableTime || "N/A"}</div>
          <div><strong>City:</strong> {astro?.city || "N/A"}</div>
          <div><strong>Short Bio:</strong> {astro?.shortBio || "N/A"}</div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2 justify-center md:justify-end mt-4">
          <Button
            variant="outline"
            onClick={() => navigate("/astro-update")}
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white w-full"
          >
            <Settings className="mr-2 h-4 w-4" />
            Account Settings
          </Button>
          <Button
            variant="outline"
            className="border-gray-400 text-gray-600 hover:bg-gray-200 w-full"
            onClick={() => navigate("/astro-dashboard")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          {/* <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-100 w-full">
            <Bell className="h-6 w-6" />
          </Button> */}
          <Button variant="destructive" size="lg" onClick={handleLogout} className="w-full">
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
    </div>
  );
};

export default AstroProfile;
