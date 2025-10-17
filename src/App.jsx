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

import PaymentRequestList from "./pages/admin/Paymentrequestlist";
import DashakootPage from "./pages/Dashakoot";
import AshtakootPage from "./pages/Ashtakoot";
import UserProfile from "./pages/Profile/UserProfile";
import AstroProfile from "./pages/Profile/AstroProfile";
import UserUpdate from "./pages/Profile/UserUpdate";
import AstroUpdate from "./pages/Profile/AstroUpdate";
import PrivateRoute from "./lib/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import JoinCall from "./pages/VideoCall/JoinCall";

import ChatPage from "./pages/chat";

import ChatComponent from "./pages/ChatComponent";
import AboutUs from "./pages/AboutUs";
import ChatComponentAstro from "./pages/ChatComponentAstro";
import ThankYouPage from "./pages/Profile/Thank";
import OrderThankYou from "./components/Store/OrderPlace";
import OrderList from "./components/Store/OrderList";
import LoveCalculator from "./pages/LoveCalculator";
import NumerologyCalculator from "./pages/Numerology";
import Compatibility from "./pages/Compatiblity";
import KundaliMatching from "./pages/KundaliMatching";


// ✅ Import PrivateRoute


function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Layouts>
          <Routes>
            <Route path="/chat" element={<ChatPage />} />
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/user-login" element={<LoginPage />} />
            <Route path="/astro-login" element={<AstroLogin />} />
            <Route path="/user-register" element={<RegisterPage />} />
            <Route path="/astro-register" element={<AstrologerRegistrationPage />} />
            <Route path="/astrologers" element={<Astrologers />} />
            <Route path="/joinCall" element={<JoinCall />} />
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
            <Route path="/kundali" element={<KundliPage />} />
            <Route path="/horoscope" element={<HoroscopePage />} />
            <Route path="/kundalimatching" element={<KundaliMatching />} />
            <Route path="/dashakoot" element={<DashakootPage />} />
            <Route path="/ashtakoot" element={<AshtakootPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/love-calculator" element={<LoveCalculator /> } />
            <Route path="/numerology" element={<NumerologyCalculator /> } />
            <Route path="/compatibility" element={<Compatibility /> } />

            {/* admin routes */}

            <Route path="/admin/paymentrequest" element={<PaymentRequestList />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />


            <Route path="/order-placed/:id"
              element={
                <OrderThankYou />
              }
            />

            <Route path="/orders"
              element={
                <OrderList />
              }
            />


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
              path="/user-chats"
              element={
                <PrivateRoute>
                  <ChatComponent />
                </PrivateRoute>
              }
            />

            <Route
              path="/thank/:id"
              element={
                <ThankYouPage />
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
              path="/astro-chathistory"
              element={
                <PrivateRoute>
                  <ChatComponentAstro />
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
