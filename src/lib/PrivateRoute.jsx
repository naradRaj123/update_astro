import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const userToken = localStorage.getItem("userToken");
  const astroToken = localStorage.getItem("astroToken");
  const adminToken = localStorage.getItem("admin_token");

  if (location.pathname.startsWith("/user")) {
    return userToken ? children : <Navigate to="/user-login" replace />;
  }

  if (location.pathname.startsWith("/astro")) {
    return astroToken ? children : <Navigate to="/astro-login" replace />;
  }

  if (location.pathname.startsWith("/admin")) {
    return adminToken ? children : <navigate to="admin-login" replace />;
  }

  return <Navigate to="/" replace />;
};

export default PrivateRoute;
