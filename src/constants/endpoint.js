export const Endpoint = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  BRANCH: "/branch",
  SETTING: "/setting",
  CATEGORY: "/category",
  COLOR: "/color",
  COUPON: "/coupon",
  STORAGE: "/storage",
  SPECIFICATION: "/specification",
  PRODUCT: "/product",
};

export const routers = [
  {
    endpoint: Endpoint.DASHBOARD,
    text: "Dashboard",
  },
  {
    endpoint: Endpoint.BRANCH,
    text: "Quản lý thương hiệu",
  },
  {
    endpoint: Endpoint.CATEGORY,
    text: "Quản lý danh mục",
  },
  {
    endpoint: Endpoint.PRODUCT,
    text: "Quản lý sản phẩm",
  },
  {
    endpoint: Endpoint.COLOR,
    text: "Quản lý màu sắc",
  },
  {
    endpoint: Endpoint.STORAGE,
    text: "Quản lý bộ nhớ",
  },
  {
    endpoint: Endpoint.SPECIFICATION,
    text: "Quản lý thông số kỹ thuật",
  },
  {
    endpoint: Endpoint.COUPON,
    text: "Quản lý mã giảm giá",
  },
  {
    endpoint: Endpoint.SETTING,
    text: "Cài đặt website",
  },
];
