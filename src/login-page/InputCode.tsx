import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Form, Input, Button } from "antd";
import { API_SERVER } from "../api/admin-api";
import { useNavigate } from "react-router-dom";

const InputCode: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; code: string }) => {
    try {
      const response = await axios.post(
        API_SERVER + `api/account/confirmation/` + email + "/" + code
      );

      // Kiểm tra trạng thái phản hồi
      if (response.status === 200) {
        toast.success("Mã xác nhận thành công!"); // Thông báo thành công
        navigate("../");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Lỗi từ máy chủ
        const errorData = error.response.data;
        toast.error("Có lỗi xảy ra: " + errorData.message); // Thông báo lỗi
      } else {
        // Lỗi không mong muốn
        console.error("Có lỗi xảy ra:", error);
        toast.error("Đã xảy ra lỗi không mong muốn.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-semibold mb-4">
        Xác Nhận Email
      </h2>
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded p-2"
          />
        </Form.Item>
        <Form.Item
          label="Mã Xác Nhận"
          name="code"
          rules={[{ required: true, message: "Vui lòng nhập mã xác nhận!" }]}
        >
          <Input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="border border-gray-300 rounded p-2"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Xác Nhận
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default InputCode;
