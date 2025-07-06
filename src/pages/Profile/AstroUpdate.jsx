import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Bell, LogOut, Settings, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const AstroUpdate = () => {
  const navigate = useNavigate();
  const astro = JSON.parse(localStorage.getItem("astroUser") || "{}");
  const { register, handleSubmit, setValue } = useForm();
  const [previewImage, setPreviewImage] = useState(astro?.profileimg || null);

  useEffect(() => {
    const token = localStorage.getItem("astroToken");
    if (!token) {
      navigate("/astro-login");
    }

    // Pre-fill form fields
    Object.keys(astro).forEach((key) => {
      if (astro[key] !== undefined) {
        setValue(key, astro[key]);
      }
    });
  }, [astro, navigate, setValue]);

  const handleLogout = () => {
    localStorage.removeItem("astroToken");
    localStorage.removeItem("astroUser");
    navigate("/astro-login");
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result); // for preview
      setValue("profileimg", reader.result); // set for submission
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    try {
      data.id = astro.id; // Required to identify astrologer
      const response = await axios.post(
        "https://astro-talk-backend.onrender.com/web/astro/update",
        data
      );

      // Update localStorage
      localStorage.setItem("astroUser", JSON.stringify(response.data));
      navigate("/astro-profile");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-rose-100 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center md:text-left">
          Welcome, {astro?.astroName || "Astrologer"}!
        </h1>
        <div className="flex flex-wrap gap-2 justify-center md:justify-end">
          <Button variant="outline" className="border-red-500 text-red-500 bg-red-200 cursor-not-allowed" disabled>
            <Settings className="mr-2 h-4 w-4" />
            Account Settings
          </Button>
          <Button variant="outline" className="border-gray-400 text-gray-600 hover:bg-gray-200" onClick={() => navigate("/astro-dashboard")}>
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
      <Card className="max-w-2xl mx-auto shadow-lg rounded-xl border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Update Astrologer Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Profile Image Upload */}
            <div>
              <Label>Profile Image</Label>
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full border my-2 object-cover"
                />
              )}
              <Input type="file" accept="image/*" onChange={handleImageChange} />
            </div>

            <div>
              <Label>Name</Label>
              <Input {...register("astroName")} />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" {...register("email")} />
            </div>
            <div>
              <Label>Phone</Label>
              <Input {...register("mobile")} />
            </div>
            <div>
              <Label>City</Label>
              <Input {...register("city")} />
            </div>
            <div>
              <Label>Experience (years)</Label>
              <Input type="number" {...register("experience")} />
            </div>
            <div>
              <Label>Charge per Session</Label>
              <Input type="number" {...register("chargePerSession")} />
            </div>

            {/* Hidden field to send base64 image */}
            <input type="hidden" {...register("profileimg")} />

            <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white">
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AstroUpdate;
