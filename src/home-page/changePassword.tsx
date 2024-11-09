import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { changePassword } from "../api/api-service";
import { useNavigate } from "react-router-dom";
import useUserStore from "../api/store";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Xử lý thay đổi dữ liệu form
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const user = useUserStore((state) => state.user);

  const handleSubmit = async (values: any) => {
    // Kiểm tra mật khẩu
    if (values.newPassword !== values.confirmNewPassword) {
      setError("Mật khẩu mới và mật khẩu xác nhận không khớp");
      return;
    }

    if (values.newPassword.length < 12) {
      setError("Mật khẩu mới phải dài ít nhất 12 ký tự");
      return;
    }
    try {
      // Gọi API thay đổi mật khẩu và kiểm tra status code
      const response = await changePassword({
        ...values,
        userName: user.userName,
      }); // Gọi API thực tế
      console.log(response);
      // Kiểm tra status code là 200
      if (response?.username) {
        setError("");
        message.success("Mật khẩu đã được thay đổi thành công!");
        navigate("../profile"); // Điều hướng người dùng đến trang Profile
      } else {
        message.error("Đã xảy ra lỗi, vui lòng thử lại.");
      }
    } catch (err) {
      message.error("Đã xảy ra lỗi, vui lòng thử lại.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Đổi mật khẩu</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <Form
        onFinish={handleSubmit}
        initialValues={formData}
        layout="vertical"
        className="space-y-4"
      >
        <Form.Item
          label="Mật khẩu hiện tại"
          name="currentPassword"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu hiện tại!" },
          ]}
        >
          <Input.Password
            placeholder="Nhập mật khẩu hiện tại"
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu mới!" },
            {
              min: 12,
              message: "Mật khẩu mới phải dài ít nhất 12 ký tự",
            },
          ]}
        >
          <Input.Password
            placeholder="Nhập mật khẩu mới"
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu mới"
          name="confirmNewPassword"
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
          ]}
        >
          <Input.Password
            placeholder="Xác nhận mật khẩu mới"
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
