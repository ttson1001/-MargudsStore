import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
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
import useUserStore from "../api/store";
import { API_SERVER } from "../api/admin-api";
import axios from "axios";

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

  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const [totalQuantity, setTotalQuantity] = useState();

  const handleMenuClick = (e: { key: string }) => {
    switch (e.key) {
      case "profile":
        navigate("/home/profile");
        break;
      case "settings":
        navigate("../settings");
        break;
      case "logout":
        clearUser();
        navigate("../login");
        break;
      case "home":
        navigate("/home/list");
        break;
      case "blog":
        navigate("/home/blog");
        break;
      case "about":
        navigate("/home/about");
        break;
      case "change password":
        navigate("/home/change-password");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          API_SERVER + `api/Cart/` + user.userID
        );
        const cartData = response.data.data.cartItem;

        console.log(cartData);
        setTotalQuantity(
          cartData.reduce((total: any, item: any) => total + item.quantity, 0)
        );
        console.log(totalQuantity);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, [user]);

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="change password">Change Password</Menu.Item>
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
        {user.userID !== "" ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Badge count={totalQuantity}>
              <ShoppingCartOutlined
                onClick={() => {
                  navigate("/home/cart");
                }}
                style={{
                  fontSize: "24px",
                  color: "white",
                  marginRight: "16px",
                }}
              />
            </Badge>
            <Dropdown overlay={menu} trigger={["click"]} className="ml-5">
              <Avatar
                size="large"
                src={user.image}
                style={{ cursor: "pointer" }}
              />
            </Dropdown>
          </div>
        ) : (
          <>
            <Button onClick={() => navigate("../login")}>Login</Button>
            <Button onClick={() => navigate("../register")}>Register</Button>
          </>
        )}
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <div
          style={{
            padding: 24,
            minHeight: "100vh",
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
          backgroundColor: "#001529",
          color: "#fff",
          padding: "10px 0",
          position: "relative",
          width: "100%",
          bottom: 0,
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
              <a
                href="https://www.facebook.com/permalink.php?story_fbid=pfbid02svH9vdWiyYGtr6sD2qCX2c5q9H323T2QSSFc4cJLhU6YDLsT4AJpcTisgaAiCxNxl&id=61566176232417"
                style={{ color: "#fff" }}
              >
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
