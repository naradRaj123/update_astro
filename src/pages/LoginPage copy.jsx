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
import { Mail, Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "@/redux/slices/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { loading, error, user } = useSelector((state) => state.auth);

  // Navigate & toast on successful login
  useEffect(() => {
    if (user) {
      toast({
        title: "Login Successful!",
        description: "Welcome back!",
      });
      navigate("/user-dashboard");
    }
  }, [user, navigate, toast]);

  // Show toast on login error
  useEffect(() => {
    if (error) {
      toast({
        title: "Login Failed",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Missing Fields",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    dispatch(userLogin({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-astro-indigo via-astro-purple to-astro-pink p-4 pt-24 star-bg">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold cosmic-text">
              Welcome Back!
            </CardTitle>
            <CardDescription>
              Log in to continue your cosmic journey.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Email */}
              <div className="space-y-2 relative">
                <Label htmlFor="email">Email Address</Label>
                <Mail className="absolute left-3 top-10 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
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

              {/* Password */}
              <div className="space-y-2 relative">
                <Label htmlFor="password">Password</Label>
                <Lock className="absolute left-3 top-10 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full cosmic-gradient text-white"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col items-center space-y-2">
            <Link to="#" className="text-sm text-primary hover:underline">
              Forgot your password?
            </Link>
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/register"
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
