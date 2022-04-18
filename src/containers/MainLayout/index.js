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
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

export default function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [margin, setMargin] = useState(200);
  const [marginRight, setMarginRight] = useState(200);
  const { width } = useWindowDimensions();
  const [selecedKey, setSelectedKey] = useState(0);

  useEffect(() => {
    width < 996 ? setCollapsed(true) : setCollapsed(false);
    width < 996 ? setMargin(80) : setMargin(200);
  }, [width]);

  const toggle = () => {
    setCollapsed(!collapsed);
    !collapsed ? setMargin(80) : setMargin(200);
    !collapsed ? setMarginRight(80) : setMarginRight(200);
  };

  // let resolved = useResolvedPath(to);
  // let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "hidden",
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
        <Menu theme="light" mode="inline" selectedKeys={[`${selecedKey}`]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/branch" onClick={() => setSelectedKey(1)}>
              Quản lý hãng
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <Link to="/category" onClick={() => setSelectedKey(2)}>
              Quản lý danh mục
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            <Link to="/setting" onClick={() => setSelectedKey(3)}>
              Cài đặt website
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: margin }}>
        <Header
          className="site-layout-background"
          style={{ padding: 0, position: "fixed", width: "100%", zIndex: 1000 }}
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
