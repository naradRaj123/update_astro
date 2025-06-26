import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import HomePage from "@/pages/HomePage";
import { AuthProvider } from "@/contexts/AuthContext";
import UserDashboard from "./pages/UserDashboard";
import Layouts from "./pages/Layouts";
import AstrologerDashboard from "./pages/AstrologerDashboard";
import AstrologerRegistrationPage from "./pages/AstrologerRegistrationPage";
import AstroLogin from "./pages/AstroLogin";
// import Astrologers from "./components/Astrologers";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import ContactPage from "./pages/ContactPage";
import Services from "./components/Services";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import Karamkandi from "./pages/Karmkandi/Karamkandi";
import Store from "./components/Store/Store";
import ProductDetail from "./components/Store/ProductDetails";
import Checkout from "./components/Store/Checkout";
import KaramkandiDetail from "./pages/Karmkandi/KarmkandiDetail";
import Dashboard from "./pages/admin/Dashboard";
import Astrologer from "./pages/admin/Astrologer";
import Users from "./pages/admin/Users";
import Karmkandy from "./pages/admin/karmkandy";
import AdminLogin from "./pages/admin/AdminLogin";
import Astrologers from "./pages/Astrologer";
import KundliPage from "./pages/Kundalimatch";
import AddProduct from "./pages/admin/Addproduct";



function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Layouts>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user-login" element={<LoginPage />} />
            <Route path="/astro-login" element={<AstroLogin />} />
            <Route path="/user-register" element={<RegisterPage />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/astro-dashboard" element={<AstrologerDashboard />} />
            <Route path="/astro-register" element={<AstrologerRegistrationPage />} />
            <Route path="/astrologers" element={<Astrologers/>} />
            <Route path="/services" element={<Services />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsConditionsPage />} />
            <Route path="/privacy-policy" element={<TermsConditionsPage />} />
            <Route path="/karamkandi" element={<Karamkandi />} />
            <Route path="/store" element={<Store />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/karmkandidet/:id" element={<KaramkandiDetail />} />
            <Route path="/kundalimatch" element={<KundliPage />} />
            
            {/* admin routes */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/astrologer" element={<Astrologer />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/karmkandy" element={<Karmkandy />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin/addproduct" element={<AddProduct />} />


          </Routes>
        </Layouts>
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default App;
