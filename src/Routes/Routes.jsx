import { createBrowserRouter } from "react-router";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import PrivetRoutes from "./PrivetRoutes";
import AddCar from "../Pages/AddCar";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/auth/Login";
import Registretion from "../Pages/auth/Registretion";
import MyListing from "../Pages/MyListing";
import MyBookings from "../Pages/MyBookings";
import BrowseCars from "../Pages/BrowseCars";
import CarDetails from "../Pages/CarDetails";
const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
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
            <MyListing/>
          </PrivetRoutes>
        ),
      },
      {
        path: "/my-bookings",
        element: (
          <PrivetRoutes>
            <MyBookings/>
          </PrivetRoutes>
        ),
      },
      {
        path: "/car-details/:id",
        element: (
          <PrivetRoutes>
            <CarDetails/>
          </PrivetRoutes>
        ),
      },
      {
        path:'/browse-cars',
        Component: BrowseCars
      },
     
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path:'/auth/register',
        Component: Registretion
      },
    ],
  },
]);

export default router;
