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
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { astrologerLogin } from "@/redux/slices/authSlice";

const AstroLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get loading, error, and user from Redux state
  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      toast({
        title: "Login Successful!",
        description: "Welcome back to Astro Truth!",
      });
      setEmail("");
      setPassword("");
      navigate("/astro-dashboard", { replace: true });
    }
  }, [user, navigate, toast]);

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

    dispatch(astrologerLogin({ email, password }));
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
              {/* Email input */}
              <div className="space-y-2 relative">
                <Label htmlFor="email">Email Address</Label>
                <Mail
                  className="absolute left-3 top-10 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                  className="pl-10"
                />
              </div>

              {/* Password input with toggle */}
              <div className="space-y-2 relative">
                <Label htmlFor="password">Password</Label>
                <Lock
                  className="absolute left-3 top-10 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-label="Password"
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((show) => !show)}
                  className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Submit Button */}
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
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot your password?
            </Link>
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/astro-register"
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

export default AstroLogin;
