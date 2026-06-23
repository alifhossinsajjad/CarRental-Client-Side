import { use } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Loding from "../Pages/Loding";

const PrivetRoutes = ({ children }) => {
  const { user, loading } = use(AuthContext);
  console.log(user, loading);
  const location = useLocation();

  if (loading) {
    return (
      <div>
        <Loding />
      </div>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/auth/login"} replace />;
};

export default PrivetRoutes;
