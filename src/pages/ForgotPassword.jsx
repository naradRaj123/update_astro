import React, { useState } from "react";
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
import { Mail, KeyRound, Lock } from "lucide-react";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const { register, handleSubmit, reset } = useForm();

  // Step 1: Send OTP
  const sendOtp = async (data) => {
    const userEmail = data.email.trim().toLowerCase();
    try {
      await axios.post(
        "https://astro-talk-backend.onrender.com/web/astro/sendOtp",
        { email: userEmail }
      );
      setEmail(userEmail); // store lowercase email
      alert("OTP sent to your email.");
      setStep(2);
    } catch (err) {
      console.error("Send OTP Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to send OTP.");
    }
  };

  // Step 2: Verify OTP
  const verifyOtp = async (data) => {
    const otpValue = data.otp.trim();
    try {
      await axios.post(
        "https://astro-talk-backend.onrender.com/web/astro/verifyOtp",
        { email, otp: otpValue }
      );
      alert("OTP verified successfully.");
      setStep(3);
    } catch (err) {
      console.error("Verify OTP Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Invalid OTP.");
    }
  };

  // Step 3: Reset Password
  const resetPassword = async (data) => {
    const { newPassword, confirmPassword } = data;
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await axios.post(
        "https://astro-talk-backend.onrender.com/web/astro/resetPassword",
        {
          email,
          newPassword,
        }
      );
      alert("Password reset successfully! Please login.");
      window.location.href = "/astro-login";
    } catch (err) {
      console.error("Reset Password Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-rose-200 p-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center text-gray-800">
            {step === 1 && "Forgot Password"}
            {step === 2 && "Verify OTP"}
            {step === 3 && "Reset Password"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <form onSubmit={handleSubmit(sendOtp)} className="space-y-5">
              <div>
                <Label>Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-2 top-2.5 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", { required: true })}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-red-500 text-white hover:bg-red-600">
                Send OTP
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit(verifyOtp)} className="space-y-5">
              <div>
                <Label>Enter OTP</Label>
                <div className="relative">
                  <KeyRound className="absolute left-2 top-2.5 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Enter OTP"
                    {...register("otp", { required: true })}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-green-600 text-white hover:bg-green-700">
                Verify OTP
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full text-gray-600 hover:text-red-500"
                onClick={() => setStep(1)}
              >
                Change Email
              </Button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit(resetPassword)} className="space-y-5">
              <div>
                <Label>New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-2 top-2.5 w-5 h-5 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="New password"
                    {...register("newPassword", { required: true })}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label>Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-2 top-2.5 w-5 h-5 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    {...register("confirmPassword", { required: true })}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                Reset Password
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
