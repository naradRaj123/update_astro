import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import ProductList from "./pages/admin/Productlist";
import UpdateProduct from "./pages/admin/UpdateProduct";
import HoroscopePage from "./pages/HoroscopePage";
import UserProfile from "./pages/Profile/UserProfile";
import AstroProfile from "./pages/Profile/AstroProfile";
import UserUpdate from "./pages/Profile/UserUpdate";
import AstroUpdate from "./pages/Profile/AstroUpdate";
import PrivateRoute from "./lib/PrivateRoute";

// ✅ Import PrivateRoute


function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Layouts>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/user-login" element={<LoginPage />} />
            <Route path="/astro-login" element={<AstroLogin />} />
            <Route path="/user-register" element={<RegisterPage />} />
            <Route path="/astro-register" element={<AstrologerRegistrationPage />} />
            <Route path="/astrologers" element={<Astrologers />} />
            <Route path="/services" element={<Services />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsConditionsPage />} />
            <Route path="/karamkandi" element={<Karamkandi />} />
            <Route path="/store" element={<Store />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/karmkandidet/:id" element={<KaramkandiDetail />} />
            <Route path="/kundalimatch" element={<KundliPage />} />
            <Route path="/horoscope" element={<HoroscopePage />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/astrologer"
              element={
                <PrivateRoute>
                  <Astrologer />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/karmkandy"
              element={
                <PrivateRoute>
                  <Karmkandy />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/addproduct"
              element={
                <PrivateRoute>
                  <AddProduct />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/productlist"
              element={
                <PrivateRoute>
                  <ProductList />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/update/:id"
              element={
                <PrivateRoute>
                  <UpdateProduct />
                </PrivateRoute>
              }
            />

            {/* Protected User & Astro Profile Routes */}
            <Route
              path="/user-dashboard"
              element={
                <PrivateRoute>
                  <UserDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/astro-dashboard"
              element={
                <PrivateRoute>
                  <AstrologerDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/user-profile"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/user-update"
              element={
                <PrivateRoute>
                  <UserUpdate />
                </PrivateRoute>
              }
            />
            <Route
              path="/astro-profile"
              element={
                <PrivateRoute>
                  <AstroProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/astro-update"
              element={
                <PrivateRoute>
                  <AstroUpdate />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layouts>
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default App;
