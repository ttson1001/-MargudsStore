import React, { useState } from "react";
import { Form, Input, Button, Breadcrumb } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./login-page.css";
import { login } from "../api/api-service";
import useUserStore from "../api/store";

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const setUser = useUserStore((state) => state.setUser);

  const onFinish = async (values: any) => {
    const rs = await login(values.username, values.password).catch((e) => {
      console.log(e.message);
    });
    if (rs?.roles) {
      setUser(rs);
    }

    if (rs?.roles?.includes("Customer")) {
      navigate("../home/list");
      return;
    }
    if (rs?.roles?.includes("Admin") || rs?.roles?.includes("Manager")) {
      navigate("../dashboard");
      return;
    }
    if (rs.includes("confirm email")) navigate("../verify");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username" // Add the name prop here
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password" // Add the name prop here
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
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
