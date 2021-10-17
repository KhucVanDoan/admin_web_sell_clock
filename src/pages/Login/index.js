import React from "react";
import { Form, Input, Button, Checkbox, Card } from "antd";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/auth.action";
import { Navigate } from "react-router";

export default function Login() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);

  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(
      login({
        phone: values.username,
        password: values.password,
      })
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (state.user) return <Navigate to="/dashboard" />;

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url('https://www.utihouse.com/wp-content/uploads/2015/10/Thi%E1%BA%BFt-k%E1%BA%BF-shop-%C4%91i%E1%BB%87n-tho%E1%BA%A1i-13.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Card className="login-form">
        <div className="header">
          <img
            src="https://upload.wikimedia.org/wikipedia/vi/thumb/8/8d/The_gioi_di_dong_logo.svg/768px-The_gioi_di_dong_logo.svg.png"
            height="48px"
            alt="Đăng nhập"
          />
          <h1>ĐĂNG NHẬP HỆ THỐNG</h1>
          <p>Trang dành cho quản trị viên</p>
        </div>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tài khoản"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tài khoản.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Nhớ tài khoản</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
