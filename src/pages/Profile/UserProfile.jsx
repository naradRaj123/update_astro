import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';

const UserProfile = () => {
  const [user, setUser] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    user_password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  // Load user data on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(storedUser);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle update
  const handleUpdate = async () => {
    try {
      const response = await fetch('https://your-api.com/web/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...user,
          _id: user?.user_id || user?._id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.updatedUser));
        alert('Profile updated successfully!');
      } else {
        alert(data.message || 'Update failed');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <Card className="max-w-xl mx-auto shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-700">My Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="user_name">Full Name</Label>
            <Input
              id="user_name"
              name="user_name"
              value={user.user_name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="user_email">Email</Label>
            <Input
              id="user_email"
              name="user_email"
              value={user.user_email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="user_phone">Phone</Label>
            <Input
              id="user_phone"
              name="user_phone"
              value={user.user_phone}
              onChange={handleChange}
              type="tel"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="user_password">Password</Label>
            <div className="relative">
              <Input
                id="user_password"
                name="user_password"
                value={user.user_password}
                onChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Update Button */}
          <Button
            className="w-full bg-red-500 hover:bg-red-600 text-white"
            onClick={handleUpdate}
          >
            Update Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
