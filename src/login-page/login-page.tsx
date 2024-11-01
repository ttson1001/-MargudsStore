import React, { useState } from "react";
import { Form, Input, Button, Breadcrumb } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./login-page.css";
import { login } from "../api/api-service";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const rs = await login(username, password);

    console.log("Login attempted with:", { username, password });
    if (rs.roles.includes("Customer")) {
      navigate("../home/list");
    }
    if (rs.roles.includes("Admin") || rs.roles.includes("Manager")) {
      navigate("../dashboard");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <Form layout="vertical">
          <Form.Item label="Username">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </Form.Item>
          <Form.Item label="Password">
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleLogin}>
              Login
            </Button>
          </Form.Item>
          <Form.Item>
            <Link to="/register">Don't have an account? Register here</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
