// Step 1: Updated LoginPage.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Lock, Eye, EyeOff, X } from "lucide-react";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.cursor = isLoading ? "wait" : "default";
    return () => {
      document.body.style.cursor = "default";
    };
  }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Missing Fields",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);


 
   

    try {
      const response = await axios.post(
        "https://astro-talk-backend.onrender.com/web/login/",
        { email, password }
      );


      const data = response.data;

      if (data?.token) {
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user || {}));
        localStorage.setItem("userId", data.user?._id || "");

        toast({
          title: "Login Successful!",
          description: "Welcome back to Astro Truth!",
        });

        console.log("Login successful. Navigating...");
        navigate("/user-dashboard");
      } else {
        toast({
          title: "Invalid Credentials",
          description: data?.message || "Please check your email and password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login failed:", error.response || error);
      toast({
        title: "Login Failed",
        description:
          error.response?.data?.message ||
          "Server error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-astro-indigo via-astro-purple to-astro-pink p-4 pt-24 star-bg">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md shadow-2xl relative">
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold cosmic-text">
              Welcome Back!
            </CardTitle>
            <CardDescription>
              Log in to continue your cosmic journey.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full cosmic-gradient text-white"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log In"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col items-center space-y-2">
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot your password?
            </Link>
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link
                to="/user-register"
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
