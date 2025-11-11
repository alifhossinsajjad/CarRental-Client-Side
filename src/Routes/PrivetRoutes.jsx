import React, { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, useLocation } from "react-router";
import Loding from "../Pages/Loding";

const PrivetRoutes = ({ children }) => {
  const { user, loading } = use(AuthContext);
  // console.log(user, loading);
  const location = useLocation();

  if (loading) {
    return <div><Loding/></div>
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/auth/login"} replace />;
};

export default PrivetRoutes;
