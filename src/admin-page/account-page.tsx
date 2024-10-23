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
} from "antd";
import "./account-page.css";
import {
  PlusOutlined,
  EditOutlined,
  CloseOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useState } from "react";
import { fakeUsers } from "../data/fake-data";
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
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DataType | null>(null); // Lưu trữ user cần chỉnh sửa

  let data: DataType[] = fakeUsers;
  const { confirm } = Modal;

  const showModal = () => {
    setIsModalOpen(true);
    setSelectedUser(null); // Khi thêm mới, không có user nào được chọn
  };

  const handleEdit = (record: DataType) => {
    setSelectedUser(record);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // Nếu đang chỉnh sửa user, thực hiện logic lưu user đã chỉnh sửa ở đây
    if (selectedUser) {
      console.log("Updating user:", selectedUser);
      // Cập nhật dữ liệu fakeUsers hoặc gọi API để cập nhật dữ liệu thực tế
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedUser) {
      setSelectedUser({
        ...selectedUser,
        [e.target.name]: e.target.value,
      });
    }
  };

  const showDeleteConfirm = (e: any) => {
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        data = data.filter((x) => x.userID === e.userId);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "User ID",
      dataIndex: "userID",
      key: "userID",
    },
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Roles",
      key: "roles",
      dataIndex: "roles",
    },
    {
      title: "Image",
      key: "image",
      dataIndex: "image",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            key="back"
            type="text"
            className="text-cyan-500"
            onClick={() => handleEdit(record)}
          >
            <EditOutlined />
          </Button>
          <Button
            key="submit"
            type="text"
            className="text-red-500"
            onClick={() => showDeleteConfirm(record)}
          >
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
        style={{
          padding: 24,
          minHeight: "80vh",
        }}
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
          title={selectedUser ? "Edit User" : "Add User"} // Thay đổi tiêu đề modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              {selectedUser ? "Save" : "Add"}{" "}
              {/* Nút thay đổi tùy theo hành động */}
            </Button>,
          ]}
        >
          <div>
            <label htmlFor="" className="label">
              Username :
            </label>
            <Input
              name="userName"
              value={selectedUser?.userName || ""}
              onChange={handleInputChange}
              placeholder="Outlined"
              className="label"
            />
          </div>
          <div>
            <label htmlFor="" className="label">
              Email :
            </label>
            <Input
              name="email"
              value={selectedUser?.email || ""}
              onChange={handleInputChange}
              placeholder="Outlined"
            />
          </div>
          <div>
            <label htmlFor="" className="label">
              Name :
            </label>
            <Input
              name="name"
              value={selectedUser?.name || ""}
              onChange={handleInputChange}
              placeholder="Outlined"
            />
          </div>
          <div>
            <label htmlFor="" className="label">
              Pasword :
            </label>
            <div>
              <Space direction="horizontal">
                <Input.Password
                  className="w-full"
                  placeholder="input password"
                  visibilityToggle={{
                    visible: passwordVisible,
                    onVisibleChange: setPasswordVisible,
                  }}
                />
                <Button
                  style={{ width: 80 }}
                  onClick={() => setPasswordVisible((prevState) => !prevState)}
                >
                  {passwordVisible ? "Hide" : "Show"}
                </Button>
              </Space>
            </div>
          </div>
          <div>
            <label htmlFor="" className="label">
              Address :
            </label>
            <Input
              name="address"
              value={selectedUser?.address || ""}
              onChange={handleInputChange}
              placeholder="Outlined"
            />
          </div>
          <div>
            <label htmlFor="" className="label">
              Phone Number :
            </label>
            <Input
              name="phone"
              value={selectedUser?.phone || ""}
              onChange={handleInputChange}
              placeholder="Outlined"
            />
          </div>
          <div>
            <label htmlFor="" className="label">
              Role :
            </label>
            <Select
              defaultValue={selectedUser?.roles[0] || "1"}
              className="w-full"
              options={[
                { value: "1", label: "User" },
                { value: "2", label: "Admin" },
              ]}
            />
          </div>
          <div>
            <label htmlFor="" className="label">
              Image :
            </label>
            <Input
              name="image"
              value={selectedUser?.image || ""}
              onChange={handleInputChange}
              placeholder="Outlined"
            />
          </div>
        </Modal>

        <Table
          columns={columns}
          dataSource={data}
          style={{ height: "400px" }}
          scroll={{ y: 400 }}
          pagination={{ pageSize: 10, total: fakeUsers.length }}
        />
      </div>
    </>
  );
};

export default AccountManagement;
