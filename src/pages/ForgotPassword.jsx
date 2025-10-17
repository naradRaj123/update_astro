import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, KeyRound, Lock, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [countdown, setCountdown] = useState(0);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    reset();
  }, [step, reset]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const showMessage = (type, text, duration = 5000) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), duration);
  };

  // Step 1: Send OTP
  const sendOtp = async (data) => {
    const userEmail = data.email.trim().toLowerCase();
    if (!userEmail) {
      showMessage('error', "Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://astro-talk-backend.onrender.com/web/user/sendOtpUsers",
        { email: userEmail }
      );
      
      if (response.data.status) {
        setEmail(userEmail);
        showMessage('success', "OTP sent to your email successfully!");
        setStep(2);
        setCountdown(60); // 60 seconds countdown for OTP
      } else {
        showMessage('error', response.data.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error("Send OTP Error:", err.response?.data || err.message);
      showMessage('error', err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const verifyOtp = async (data) => {
    const otpValue = data.otp.trim();
    const userEmail = email.trim();
    
    if (!userEmail || !otpValue) {
      showMessage('error', "Please enter OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://astro-talk-backend.onrender.com/web/user/verifyOtpUsers",
        { email: userEmail, otp: otpValue }
      );
      
      if (response.data.status) {
        showMessage('success', "OTP verified successfully!");
        setStep(3);
      } else {
        showMessage('error', response.data.message || "Invalid OTP.");
      }
    } catch (err) {
      console.error("Verify OTP Error:", err.response?.data || err.message);
      showMessage('error', err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const resetPassword = async (data) => {
    const { newPassword, confirmPassword } = data;
    
    if (newPassword !== confirmPassword) {
      showMessage('error', "Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      showMessage('error', "Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://astro-talk-backend.onrender.com/web/user/resetPasswordUsers",
        {
          email,
          newPassword,
        }
      );
      
      if (response.data.status) {
        showMessage('success', "Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/user-login");
        }, 2000);
      } else {
        showMessage('error', response.data.message || "Failed to reset password.");
      }
    } catch (err) {
      console.error("Reset Password Error:", err.response?.data || err.message);
      showMessage('error', err.response?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (countdown > 0) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "https://astro-talk-backend.onrender.com/web/user/sendOtpUsers",
        { email }
      );
      
      if (response.data.status) {
        showMessage('success', "OTP resent to your email!");
        setCountdown(60);
      } else {
        showMessage('error', response.data.message || "Failed to resend OTP.");
      }
    } catch (err) {
      console.error("Resend OTP Error:", err.response?.data || err.message);
      showMessage('error', err.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: "Enter Email", description: "Provide your registered email" },
    { number: 2, title: "Verify OTP", description: "Enter OTP sent to your email" },
    { number: 3, title: "New Password", description: "Set your new password" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm">
          {/* Progress Steps */}
          <div className="px-6 pt-6">
            <div className="flex justify-between items-center mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/user-login")}
                className="text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </Button>
              <Badge variant="outline" className="text-purple-600 border-purple-200">
                Step {step}/3
              </Badge>
            </div>

            <div className="flex justify-between mb-8 relative">
              {steps.map((stepItem, index) => (
                <div key={stepItem.number} className="flex flex-col items-center z-10">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300",
                      step === stepItem.number
                        ? "bg-purple-500 border-purple-500 text-white shadow-lg"
                        : step > stepItem.number
                        ? "bg-green-500 border-green-500 text-white"
                        : "bg-white border-gray-300 text-gray-500"
                    )}
                  >
                    {step > stepItem.number ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      stepItem.number
                    )}
                  </div>
                  <div className="text-xs mt-2 text-center">
                    <div className={cn(
                      "font-medium",
                      step === stepItem.number ? "text-purple-600" : "text-gray-500"
                    )}>
                      {stepItem.title}
                    </div>
                  </div>
                </div>
              ))}
              <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-200 -z-10">
                <motion.div
                  className="h-full bg-purple-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((step - 1) / 2) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800">
              <AnimatePresence mode="wait">
                <motion.span
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {step === 1 && "Reset Your Password"}
                  {step === 2 && "Verify OTP"}
                  {step === 3 && "Create New Password"}
                </motion.span>
              </AnimatePresence>
            </CardTitle>
            <p className="text-gray-600 mt-2">
              {step === 1 && "Enter your email to receive a verification code"}
              {step === 2 && "Enter the 6-digit code sent to your email"}
              {step === 3 && "Create a strong new password for your account"}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Message Alert */}
            <AnimatePresence>
              {message.text && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={cn(
                    "p-3 rounded-lg text-sm font-medium",
                    message.type === 'success' 
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  )}
                >
                  {message.text}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 && (
                  <form onSubmit={handleSubmit(sendOtp)} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: "Please enter a valid email address",
                            },
                          })}
                          className="pl-10 h-11 rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm flex items-center">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="w-full h-11 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl shadow-lg transition-all duration-200"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Sending OTP...
                        </>
                      ) : (
                        "Send Verification Code"
                      )}
                    </Button>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={handleSubmit(verifyOtp)} className="space-y-5">
                    <div className="text-center mb-4">
                      <p className="text-sm text-gray-600">
                        Code sent to: <span className="font-semibold text-gray-800">{email}</span>
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
                        Verification Code
                      </Label>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Input
                          id="otp"
                          type="text"
                          placeholder="Enter 6-digit code"
                          maxLength={6}
                          {...register("otp", { 
                            required: "OTP is required",
                            minLength: {
                              value: 6,
                              message: "OTP must be 6 digits"
                            }
                          })}
                          className="pl-10 h-11 rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-center tracking-widest font-mono"
                        />
                      </div>
                      {errors.otp && (
                        <p className="text-red-500 text-sm">{errors.otp.message}</p>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setStep(1)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        Change Email
                      </Button>
                      
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={resendOtp}
                        disabled={loading || countdown > 0}
                        className="text-purple-600 hover:text-purple-700 disabled:text-gray-400"
                      >
                        {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : countdown > 0 ? (
                          `Resend in ${countdown}s`
                        ) : (
                          "Resend Code"
                        )}
                      </Button>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="w-full h-11 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl shadow-lg"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify Code"
                      )}
                    </Button>
                  </form>
                )}

                {step === 3 && (
                  <form onSubmit={handleSubmit(resetPassword)} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                        New Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="Enter new password"
                          {...register("newPassword", { 
                            required: "New password is required",
                            minLength: {
                              value: 6,
                              message: "Password must be at least 6 characters"
                            }
                          })}
                          className="pl-10 h-11 rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                      {errors.newPassword && (
                        <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm new password"
                          {...register("confirmPassword", { 
                            required: "Please confirm your password"
                          })}
                          className="pl-10 h-11 rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="w-full h-11 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl shadow-lg"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Resetting Password...
                        </>
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </form>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Help Text */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Need help?{" "}
                <Button variant="link" className="text-xs p-0 h-auto text-purple-600">
                  Contact support
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;