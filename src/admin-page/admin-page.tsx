import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  InboxOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../access/images/LogoEXE-01.png";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

// Menu items with key values corresponding to the routes you want to navigate to
const items: MenuItem[] = [
  getItem("Dashboard", "/admin/dashboard", <PieChartOutlined />),
  getItem("Report", "/admin/report", <DesktopOutlined />),
  getItem("User", "/admin/user", <UserOutlined />),
  getItem("Product", "", <InboxOutlined />, [
    getItem("List", "/admin/product/list"),
    getItem("Category", "/admin/product/category"),
  ]),
  getItem("Order", "/admin/order", <FileOutlined />),
];

const AdminPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div style={{ height: 60 }} className="flex justify-between">
            <div className="flex items-center">
              <img style={{ height: "60px" }} src={logo} alt="" />
              <span className="text-3xl font-bold">Wellcome TNTO</span>
            </div>

            <div>
              <Button
                type="text"
                className="text-red-500"
                onClick={() => {
                  navigate("../");
                }}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Outlet /> {/* This will render the child route component */}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by My Team
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
