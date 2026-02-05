import { createBrowserRouter } from "react-router";
import Login from "../pages/LoginForm";
import Register from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Welcome To MEAN Integration</h1>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default router;
