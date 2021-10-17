import { Endpoint } from "./constants/endpoint";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const routes = [
  {
    path: Endpoint.HOME,
    element: <Login />,
  },
  {
    path: Endpoint.DASHBOARD,
    element: <Dashboard />,
  },
];

export default routes;
