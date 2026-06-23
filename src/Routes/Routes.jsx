import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import AddCar from "../Pages/AddCar";
import Login from "../Pages/auth/Login";
import Registretion from "../Pages/auth/Registretion";
import BrowseCars from "../Pages/BrowseCars";
import CarDetails from "../Pages/CarDetails";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import MyBookings from "../Pages/MyBookings";
import MyListing from "../Pages/MyListing";
import PrivetRoutes from "./PrivetRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/add-car",
        element: (
          <PrivetRoutes>
            <AddCar />
          </PrivetRoutes>
        ),
      },
      {
        path: "/my-listings",
        element: (
          <PrivetRoutes>
            <MyListing />
          </PrivetRoutes>
        ),
      },
      {
        path: "/my-bookings",
        element: (
          <PrivetRoutes>
            <MyBookings />
          </PrivetRoutes>
        ),
      },
      {
        path: "/car-details/:id",
        element: (
          <PrivetRoutes>
            <CarDetails />
          </PrivetRoutes>
        ),
      },
      {
        path: "/browse-cars",
        element: <BrowseCars />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Registretion />,
      },
    ],
  },
]);

export default router;
