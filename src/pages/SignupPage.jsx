import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Mail, KeyRound, User, CalendarDays, MapPin } from 'lucide-react';

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-amber-50 to-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-lg shadow-2xl rounded-xl overflow-hidden border border-yellow-300">
          <CardHeader className="bg-gradient-to-r from-yellow-400 to-amber-500 text-center p-8">
             <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="mx-auto bg-white rounded-full p-3 inline-block shadow-lg"
            >
              <UserPlus className="h-12 w-12 text-yellow-600" />
            </motion.div>
            <CardTitle className="text-3xl font-bold text-gray-800 mt-4">Create Your Account</CardTitle>
            <CardDescription className="text-amber-800">Join Astrotruth and start your astrological journey today!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6 md:p-8 bg-white">
            <div className="space-y-1">
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 flex items-center">
                <User className="mr-2 h-4 w-4 text-yellow-500" /> Full Name
              </Label>
              <Input id="fullName" type="text" placeholder="Your Name" className="focus:ring-yellow-500 focus:border-yellow-500" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
                <Mail className="mr-2 h-4 w-4 text-yellow-500" /> Email Address
              </Label>
              <Input id="email" type="email" placeholder="you@example.com" className="focus:ring-yellow-500 focus:border-yellow-500" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="dob" className="text-sm font-medium text-gray-700 flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4 text-yellow-500" /> Date of Birth
                </Label>
                <Input id="dob" type="date" className="focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="birthPlace" className="text-sm font-medium text-gray-700 flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-yellow-500" /> Birth Place
                </Label>
                <Input id="birthPlace" type="text" placeholder="City, Country" className="focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center">
                <KeyRound className="mr-2 h-4 w-4 text-yellow-500" /> Password
              </Label>
              <Input id="password" type="password" placeholder="••••••••" className="focus:ring-yellow-500 focus:border-yellow-500" />
            </div>
             <div className="space-y-1">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 flex items-center">
                <KeyRound className="mr-2 h-4 w-4 text-yellow-500" /> Confirm Password
              </Label>
              <Input id="confirmPassword" type="password" placeholder="••••••••" className="focus:ring-yellow-500 focus:border-yellow-500" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 p-6 md:p-8 pt-0 bg-white">
            <Button className="w-full btn-primary-theme text-gray-800 text-lg py-3">
              <UserPlus className="mr-2 h-5 w-5" /> Sign Up
            </Button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-yellow-600 hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignupPage;