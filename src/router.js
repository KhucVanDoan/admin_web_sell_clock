import NotFound from "./components/NotFound";
import { Endpoint } from "./constants/endpoint";
import PrivateRouter from "./containers/PrivateRouter";
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
