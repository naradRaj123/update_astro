import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle
} from '@/components/ui/card';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  UserPlus, Mail, KeyRound, User, Briefcase, Star,
  CalendarDays, MapPin, Phone
} from 'lucide-react';

const AstrologerRegistrationPage = () => {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const password = watch('password');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setServerError('');

    try {
      const payload = {
        astroName: data.astroName.trim(),
        astroDob: data.astroDob,
        mobile: data.mobile.trim(),
        email: data.email.trim(),
        password: data.password,
        city: data.city.trim(),
        experience: Number(data.experience),
        expertise: data.expertise.trim(),
        language: data.language.trim() || 'Hindi',
        shortBio: data.shortBio.trim(),
        chargePerSession: data.chargePerSession || '500',
        availableTime: data.availableTime || '10:00 AM - 6:00 PM',
        bankDetails: data.bankDetails.trim(),
      };

      await axios.post('https://astro-talk-backend.onrender.com/web/astro', payload, {
        headers: { 'Content-Type': 'application/json' },
        maxRedirects: 0,
      });

      alert('Astrologer registered successfully!');
      reset();
    } catch (error) {
      console.error('Submission error:', error);
      if (error.response?.status === 302) {
        setServerError('Request redirected. Please check the API endpoint or authentication.');
      } else {
        setServerError(error.response?.data?.message || error.message || 'Something went wrong.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-amber-50 to-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate className='register-m-t'>
          <Card className="shadow-2xl rounded-xl border border-yellow-300 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-yellow-400 to-amber-500 text-center p-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                className="mx-auto bg-white rounded-full p-4 inline-block shadow-lg"
              >
                <UserPlus className="h-14 w-14 text-yellow-600" />
              </motion.div>
              <CardTitle className="text-4xl font-extrabold text-gray-900 mt-5">Join as an Astrologer</CardTitle>
              <CardDescription className="text-amber-900 mt-1">
                Share your wisdom with the world. Register on Astrotruth!
              </CardDescription>
            </CardHeader>

            <CardContent className="bg-white p-8 space-y-6">
              {serverError && (
                <p className="text-center text-red-700 font-semibold mb-4">{serverError}</p>
              )}

              {/* Two-column grid for most inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="flex flex-col">
                  <Label htmlFor="astroName" className="flex items-center gap-2 text-yellow-600 font-semibold">
                    <User className="w-5 h-5" /> Full Name
                  </Label>
                  <Input
                    id="astroName"
                    placeholder="Enter Full Name"
                    {...register('astroName', { required: "Full name is required" })}
                    disabled={isSubmitting}
                    className="mt-1"
                  />
                  {errors.astroName && (
                    <p className="text-red-600 text-sm mt-1">{errors.astroName.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <Label htmlFor="email" className="flex items-center gap-2 text-yellow-600 font-semibold">
                    <Mail className="w-5 h-5" /> Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                    })}
                    disabled={isSubmitting}
                    className="mt-1"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Mobile */}
                <div className="flex flex-col">
                  <Label htmlFor="mobile" className="flex items-center gap-2 text-yellow-600 font-semibold">
                    <Phone className="w-5 h-5" /> Mobile Number
                  </Label>
                  <Input
                    id="mobile"
                    placeholder="Enter Mobile Number"
                    type="tel"
                    {...register('mobile', {
                      required: "Mobile number is required",
                      pattern: { value: /^[0-9]{10,15}$/, message: "Invalid mobile number" }
                    })}
                    disabled={isSubmitting}
                    className="mt-1"
                  />
                  {errors.mobile && (
                    <p className="text-red-600 text-sm mt-1">{errors.mobile.message}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="flex flex-col">
                  <Label htmlFor="astroDob" className="flex items-center gap-2 text-yellow-600 font-semibold">
                    <CalendarDays className="w-5 h-5" /> Date of Birth
                  </Label>
                  <Input
                    id="astroDob"
                    type="date"
                    {...register('astroDob', { required: "Date of birth is required" })}
                    disabled={isSubmitting}
                    className="mt-1"
                  />
                  {errors.astroDob && (
                    <p className="text-red-600 text-sm mt-1">{errors.astroDob.message}</p>
                  )}
                </div>

                {/* City */}
                <div className="flex flex-col">
                  <Label htmlFor="city" className="flex items-center gap-2 text-yellow-600 font-semibold">
                    <MapPin className="w-5 h-5" /> City
                  </Label>
                  <Input
                    id="city"
                    placeholder="Enter city Name"
                    {...register('city', { required: "City is required" })}
                    disabled={isSubmitting}
                    className="mt-1"
                  />
                  {errors.city && (
                    <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>

                {/* Experience */}
                <div className="flex flex-col">
                  <Label htmlFor="experience" className="flex items-center gap-2 text-yellow-600 font-semibold">
                    <Briefcase className="w-5 h-5" /> Experience (years)
                  </Label>
                  <Input
                    id="experience"
                    type="number"
                    min={0}
                    {...register('experience', { required: "Experience is required" })}
                    disabled={isSubmitting}
                    className="mt-1"
                  />
                  {errors.experience && (
                    <p className="text-red-600 text-sm mt-1">{errors.experience.message}</p>
                  )}
                </div>

                {/* Expertise */}
                <div className="flex flex-col">
                  <Label htmlFor="expertise" className="flex items-center gap-2 text-yellow-600 font-semibold">
                    <Star className="w-5 h-5" /> Expertise
                  </Label>
                  <Input
                    id="expertise"
                    {...register('expertise', { required: "Expertise is required" })}
                    placeholder="Vedic, Tarot, etc."
                    disabled={isSubmitting}
                    className="mt-1"
                  />
                  {errors.expertise && (
                    <p className="text-red-600 text-sm mt-1">{errors.expertise.message}</p>
                  )}
                </div>

                {/* Language */}
                <div className="flex flex-col">
                  <Label htmlFor="language" className="font-semibold text-yellow-600">Language</Label>
                  <Input
                    id="language"
                    {...register('language', { required: "Language is required" })}
                    placeholder="Hindi, English, etc."
                    disabled={isSubmitting}
                    className="mt-1"
                  />
                  {errors.language && (
                    <p className="text-red-600 text-sm mt-1">{errors.language.message}</p>
                  )}
                </div>
              </div>

              {/* Short Bio */}
              <div className="flex flex-col">
                <Label htmlFor="shortBio" className="font-semibold text-yellow-600">Short Bio</Label>
                <Textarea
                  id="shortBio"
                  rows={4}
                  {...register('shortBio')}
                  placeholder="Your approach and experience..."
                  disabled={isSubmitting}
                  className="mt-1"
                />
              </div>

              {/* Charge & Available Time side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <Label htmlFor="chargePerSession" className="font-semibold text-yellow-600">
                    Charge Per Session (₹)
                  </Label>
                  <Input
                    id="chargePerSession"
                    type="number"
                    min={0}
                    {...register('chargePerSession')}
                    placeholder="500"
                    disabled={isSubmitting}
                    className="mt-1"
                  />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="availableTime" className="font-semibold text-yellow-600">
                    Available Time
                  </Label>
                  <Input
                    id="availableTime"
                    {...register('availableTime')}
                    placeholder="10:00 AM - 6:00 PM"
                    disabled={isSubmitting}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Bank Details */}
              <div className="flex flex-col">
                <Label htmlFor="bankDetails" className="font-semibold text-yellow-600">Bank Details</Label>
                <Textarea
                  id="bankDetails"
                  rows={3}
                  {...register('bankDetails', { required: "Bank details are required" })}
                  placeholder="Bank Name, Account Number, IFSC, etc."
                  disabled={isSubmitting}
                  className="mt-1"
                />
                {errors.bankDetails && (
                  <p className="text-red-600 text-sm mt-1">{errors.bankDetails.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col">
                <Label htmlFor="password" className="flex items-center gap-2 text-yellow-600 font-semibold">
                  <KeyRound className="w-5 h-5" /> Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                  })}
                  disabled={isSubmitting}
                  className="mt-1"
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
            </CardContent>
            {/* User Type Selection  here*/}
                 <div className="flex flex-col mt-4 register-padding">
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="Karmkandi"
                    {...register('userType', { required: "Please select a type" })}
                    disabled={isSubmitting}
                  />
                  Karmkandi
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="Astrologer"
                    {...register('userType', { required: "Please select a type" })}
                    disabled={isSubmitting}
                  />
                  Astrologer
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="Both"
                    {...register('userType', { required: "Please select a type" })}
                    disabled={isSubmitting}
                  />
                  Both
                </label>
              </div>
              {errors.userType && (
                <p className="text-red-600 text-sm mt-1">{errors.userType.message}</p>
              )}
            </div>
            <div className="register-padding">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full cosmic-gradient text-white"
              >
                {isSubmitting ? 'Submitting...' : 'Register'}
              </Button>
            </div>
            <CardFooter className="bg-yellow-200 flex flex-col md:flex-row justify-between items-center gap-4 p-6">
              <Link
                to="/astro-login"
                className="text-yellow-700 hover:underline font-semibold"
              >
                Already have an account? Login
              </Link>
            </CardFooter>
          </Card>
        </form>
      </motion.div>
    </div>
  );
};

export default AstrologerRegistrationPage;
