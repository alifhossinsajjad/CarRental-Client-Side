import React, { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivetRoutes = ({ children }) => {
  const { user, loading } = use(AuthContext);
  console.log(user, loading);
  const location = useLocation();

  if (loading) {
    return <p>loadingggg.</p>;
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/auth/login"} replace />;
};

export default PrivetRoutes;
