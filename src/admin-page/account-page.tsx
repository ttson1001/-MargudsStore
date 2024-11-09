import {
  Breadcrumb,
  Button,
  Input,
  Modal,
  Select,
  Space,
  Table,
  TableProps,
  Tooltip,
  Form,
} from "antd";
import "./account-page.css";
import { PlusOutlined, EditOutlined, CloseOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_SERVER, createUser, updateUser } from "../api/admin-api";

interface DataType {
  userID: any;
  userName: string;
  email: string;
  name: string;
  address: string;
  phone: string;
  roles: string[];
  token: any;
  refreshToken: any;
  image: string;
}

const AccountManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DataType | null>(null);
  const [isLoad, setIsLoad] = useState<Boolean>(false);
  const [data, setData] = useState<DataType[]>([]);
  const [form] = Form.useForm(); // Initialize form

  const { confirm } = Modal;

  const showModal = () => {
    setIsModalOpen(true);
    setSelectedUser(null); // When adding a new user, no user should be selected
    form.resetFields(); // Reset form fields when adding a new user
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          API_SERVER + "api/account/Get-all-accounts"
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
    setIsLoad(false);
  }, [isLoad]);

  const handleEdit = (record: DataType) => {
    setSelectedUser(record);
    form.setFieldsValue(record); // Set form values to selected user data
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const formValues = await form.validateFields(); // Validate form before submit
      console.log(formValues.role);
      if (selectedUser) {
        // Updating user
        await updateUser(selectedUser.userID, formValues);
      } else {
        // Creating new user
        await createUser(formValues);
      }
      setIsLoad(true);
      setIsModalOpen(false);
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: TableProps<DataType>["columns"] = [
    { title: "User ID", dataIndex: "userID", key: "userID" },
    { title: "Username", dataIndex: "userName", key: "userName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Roles", dataIndex: "roles", key: "roles" },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <>
          <img src={record.image} alt="" width={50} />
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            type="text"
            className="text-cyan-500"
            onClick={() => handleEdit(record)}
          >
            <EditOutlined />
          </Button>
          <Button type="text" className="text-red-500">
            <CloseOutlined />
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>

      <div
        className="bg-white rounded-md"
        style={{ padding: 24, minHeight: "80vh" }}
      >
        <p className="text-3xl font-bold">User Management</p>
        <div className="flex justify-end">
          <Tooltip title="Add User">
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={showModal}
            />
          </Tooltip>
        </div>

        <Modal
          title={selectedUser ? "Edit User" : "Add User"}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              {selectedUser ? "Save" : "Add"}
            </Button>,
          ]}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Username"
              name="userName"
              rules={[
                { required: true, message: "Please input the username!" },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input a valid email!",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>

            {!selectedUser && (
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input the password!" },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
            )}

            <Form.Item label="Address" name="address">
              <Input placeholder="Address" />
            </Form.Item>

            <Form.Item label="Phone Number" name="phone">
              <Input placeholder="Phone Number" />
            </Form.Item>

            <Form.Item label="Role" name="roles">
              <Select
                defaultValue="Customer"
                options={[
                  { value: "Customer", label: "Customer" },
                  { value: "Admin", label: "Admin" },
                ]}
              />
            </Form.Item>

            <Form.Item label="Image" name="image">
              <Input placeholder="Image URL" />
            </Form.Item>
          </Form>
        </Modal>

        <Table
          columns={columns}
          dataSource={data}
          style={{ height: "400px" }}
          scroll={{ y: 400 }}
          pagination={{ pageSize: 10, total: data.length }}
        />
      </div>
    </>
  );
};

export default AccountManagement;
