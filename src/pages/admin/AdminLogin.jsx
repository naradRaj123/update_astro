import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Static admin credentials
    if (email === "admin@astrotruth.in" && password === "admin123") {
      const loginToken=Math.random().toString(36).substr(2) + Date.now().toString(36)
      localStorage.setItem("admin_token", loginToken);
      navigate("/admin");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-rose-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
        {error && <p className="text-red-600 mb-4 text-sm text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <div className="flex items-center border rounded px-3 py-2">
              <Mail className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="email"
                className="w-full outline-none"
                placeholder="admin@astro.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="flex items-center border rounded px-3 py-2">
              <Lock className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="password"
                className="w-full outline-none"
                placeholder="admin123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
