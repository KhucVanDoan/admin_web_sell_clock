import React, { useState, useEffect } from "react";
import "./main-layout.css";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useWindowDimensions } from "../../common/useWindowDimensions";

const { Header, Sider, Content } = Layout;

export default function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [margin, setMargin] = useState(200);
  const [marginRight, setMarginRight] = useState(200);
  const { width } = useWindowDimensions();

  useEffect(() => {
    width < 996 ? setCollapsed(true) : setCollapsed(false);
    width < 996 ? setMargin(80) : setMargin(200);
  }, [width]);

  const toggle = () => {
    setCollapsed(!collapsed);
    !collapsed ? setMargin(80) : setMargin(200);
    !collapsed ? setMarginRight(80) : setMarginRight(200);
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
        }}
      >
        <div className="logo">
          <img
            height="100%"
            width="100%"
            src="https://upload.wikimedia.org/wikipedia/vi/thumb/8/8d/The_gioi_di_dong_logo.svg/768px-The_gioi_di_dong_logo.svg.png"
            alt="Logo"
          />
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Quản lý abc
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            Quản lý xyz
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            Cài đặt
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: margin }}>
        <Header
          className="site-layout-background"
          style={{ padding: 0, position: "fixed", width: "100%" }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          <span className="profile" style={{ marginRight: marginRight }}>
            <UserOutlined />
          </span>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "80px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}