import NotFound from "./components/NotFound";
import { Endpoint } from "./constants/endpoint";
import PrivateRouter from "./containers/PrivateRouter";
import Branch from "./pages/Branch";
import Category from "./pages/Category";
import Color from "./pages/Color";
import Coupon from "./pages/Coupon";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Setting from "./pages/Setting";
import Specification from "./pages/Specification";
import Storage from "./pages/Storage";

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
    path: Endpoint.COLOR,
    element: <PrivateRouter component={Color} />,
  },
  {
    path: Endpoint.COUPON,
    element: <PrivateRouter component={Coupon} />,
  },
  {
    path: Endpoint.STORAGE,
    element: <PrivateRouter component={Storage} />,
  },
  {
    path: Endpoint.SPECIFICATION,
    element: <PrivateRouter component={Specification} />,
  },
  {
    path: Endpoint.PRODUCT,
    element: <PrivateRouter component={Product} />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
