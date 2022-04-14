import NotFound from "./components/NotFound";
import { Endpoint } from "./constants/endpoint";
import PrivateRouter from "./containers/PrivateRouter";
import Branch from "./pages/Branch";
import Category from "./pages/Category";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Setting from "./pages/Setting";

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
    path: Endpoint.BRANCH,
    element: <PrivateRouter component={Branch} />,
  },
  {
    path: Endpoint.SETTING,
    element: <PrivateRouter component={Setting} />,
  },
  {
    path: Endpoint.CATEGORY,
    element: <PrivateRouter component={Category} />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
