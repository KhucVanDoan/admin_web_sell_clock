import PrivateRouter from "./components/PrivateRouter";
import NotFound from "./components/NotFound";
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
    element: <PrivateRouter component={Dashboard} />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
