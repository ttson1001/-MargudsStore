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
import "./category-page.css";
import {
  PlusOutlined,
  EditOutlined,
  CloseOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useState } from "react";
import { fakeReports } from "../data/fake-report";
interface DataType {
  reportID: number;
  createAt: string;
  updateAt: string;
  reportText: string;
  responseText: string;
  accountID: string;
  orderID: number;
  productID: number;
  image: string;
}

const ReportManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DataType | null>(null); // Lưu trữ user cần chỉnh sửa

  const data: DataType[] = fakeReports;
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
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Report ID",
      dataIndex: "reportID",
      key: "reportID",
    },
    {
      title: "Create Date",
      dataIndex: "createAt",
      key: "createAt",
    },
    {
      title: "Update Date",
      key: "updateAt",
      dataIndex: "updateAt",
    },
    {
      title: "Report Text",
      key: "updateAt",
      dataIndex: "updateAt",
    },
    {
      title: "Response Text",
      key: "updateAt",
      dataIndex: "updateAt",
    },
    {
      title: "Account ID",
      key: "accountID",
      dataIndex: "accountID",
    },
    {
      title: "Order ID",
      key: "orderID",
      dataIndex: "orderID",
    },
    {
      title: "Product ID",
      key: "productID",
      dataIndex: "productID",
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
        <Breadcrumb.Item>Product</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="bg-white rounded-md"
        style={{
          padding: 24,
          minHeight: "80vh",
        }}
      >
        <p className="text-3xl font-bold">Report Management</p>
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
              //   value={selectedUser?.userName || ""}
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
              //   value={selectedUser?.email || ""}
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
              //   value={selectedUser?.name || ""}
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
              //   value={selectedUser?.address || ""}
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
              //   value={selectedUser?.phone || ""}
              onChange={handleInputChange}
              placeholder="Outlined"
            />
          </div>
          <div>
            <label htmlFor="" className="label">
              Role :
            </label>
            <Select
              //   defaultValue={selectedUser?.roles[0] || "1"}
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
              //   value={selectedUser?.image || ""}
              onChange={handleInputChange}
              placeholder="Outlined"
            />
          </div>
        </Modal>

        <Table
          columns={columns}
          dataSource={data}
          style={{ height: "500px" }}
          scroll={{ y: 300 }}
          pagination={{ pageSize: 10, total: data.length }}
        />
      </div>
    </>
  );
};

export default ReportManagement;
