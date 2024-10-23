import React from "react";
import {
  Avatar,
  Badge,
  Breadcrumb,
  Col,
  Dropdown,
  Layout,
  Menu,
  Row,
  theme,
  Typography,
} from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import logo from "../access/images/LogoEXE-01.png";

const { Header, Content, Footer } = Layout;

const items = [
  { label: "Home", key: "home" },
  { label: "Blog", key: "blog" },
  { label: "About", key: "about" },
];
const { Text } = Typography;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const handleMenuClick = (e: { key: string }) => {
    switch (e.key) {
      case "profile":
        navigate("../profile");
        break;
      case "settings":
        navigate("../settings");
        break;
      case "logout":
        navigate("../login");
        break;
      case "home":
        navigate("/home/list");
        break;
      case "products":
        navigate("/home/blog");
        break;
      case "about":
        navigate("/home/about");
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="settings">Settings</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo Section */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            onClick={() => navigate("/home/list")}
            src={logo} // Use the imported logo
            alt="Logo"
            style={{ height: "60px", marginRight: "16px" }} // Adjust height and margin as needed
          />
        </div>
        {/* Navigation Menu */}
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          onClick={handleMenuClick}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <Badge count={5}>
            <ShoppingCartOutlined
              style={{ fontSize: "24px", color: "white", marginRight: "16px" }}
            />
          </Badge>
          <Dropdown overlay={menu} trigger={["click"]} className="ml-5">
            <Avatar
              size="large"
              src="https://via.placeholder.com/150"
              style={{ cursor: "pointer" }}
            />
          </Dropdown>
        </div>
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: "#001529",
          color: "#fff",
          padding: "10px 0",
        }}
      >
        <Row justify="center" align="middle">
          <Col>
            <Text style={{ color: "#fff" }}>
              © {new Date().getFullYear()} Công Ty XYZ
            </Text>
          </Col>
          <Col>
            <Text style={{ color: "#fff", margin: "0 10px" }}>
              | Địa chỉ: 123 ABC, TP XYZ
            </Text>
          </Col>
          <Col>
            <Text style={{ color: "#fff", margin: "0 10px" }}>
              | Liên hệ: contact@company.com
            </Text>
          </Col>
          <Col>
            <Text style={{ color: "#fff", margin: "0 10px" }}>
              |{" "}
              <a href="https://facebook.com" style={{ color: "#fff" }}>
                Facebook
              </a>
              <span style={{ margin: "0 5px" }}>|</span>
              <a href="https://twitter.com" style={{ color: "#fff" }}>
                Twitter
              </a>
            </Text>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};

export default App;
