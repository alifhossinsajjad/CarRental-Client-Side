import { createBrowserRouter } from "react-router";
import ErrorPage from "../Pages/ErrorPage";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home";



const router = createBrowserRouter([
    {
        path :'/',
        Component: RootLayout,
        errorElement:<ErrorPage/>,
        children : [
            {
                index: true,
                Component: Home
            },

        ]
    }
])

export default router;