import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Settings, Bell, LogOut, ArrowLeft } from "lucide-react";

const UserUpdate = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [formData, setFormData] = useState({
    _id: user?._id || "",
    user_name: user?.user_name || "",
    email: user?.email || "",
    user_phone: user?.user_phone || "",
    dob: user?.dob || "",
    password: "",
    user_image: user?.user_image || "", // base64 string
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/user-login");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/user-login");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        user_image: reader.result, // base64 image string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://astro-talk-backend.onrender.com/web/user/update",
        formData
      );

      if (response?.data?.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        alert("✅ Profile Updated Successfully!");
        navigate("/user-profile");
      } else {
        toast({
          title: "Update Failed",
          description: "Something went wrong. Try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Server error.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-rose-100 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center md:text-left">
          Welcome, {user?.user_name || "User"}!
        </h1>
        <div className="flex flex-wrap gap-2 justify-center md:justify-end">
          <Button
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            onClick={() => navigate("/user-profile")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Back to Profile
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

      {/* Form */}
      <div className="flex justify-center">
        <Card className="w-full max-w-2xl shadow-xl rounded-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800">
              Update Profile
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Modify your information and save the changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="text-center">
                {formData.user_image ? (
                  <img
                    src={formData.user_image}
                    alt="Preview"
                    className="w-24 h-24 mx-auto rounded-full border-4 object-cover border-white shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 mx-auto rounded-full bg-gray-300 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                    {formData.user_name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
              </div>

              <div>
                <Label>Upload Photo</Label>
                <Input type="file" accept="image/*" onChange={handleImageChange} />
              </div>

              <div>
                <Label>Name</Label>
                <Input
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  name="user_phone"
                  value={formData.user_phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Date of Birth</Label>
                <Input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-500 hover:bg-red-600 text-white"
              >
                {isLoading ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserUpdate;
