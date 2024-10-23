import { Breadcrumb, Button, Modal, Table } from "antd";
import "./order-page.css";
import { EditOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useState } from "react";
import { fakeOrder } from "../data/fake-order";

export interface DataType {
  orderID: number;
  orderDate: string;
  status: number;
  total: number;
  reportID: number;
  shippingInfo: ShippingInfo;
}

export interface ShippingInfo {
  detailAddress: string;
  province: string;
  ward: string;
  district: string;
  receiverName: string;
  phone: string;
  shippingCost: number;
}

const OrderManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DataType | null>(null); // Lưu trữ user cần chỉnh sửa

  const data = fakeOrder;
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
    if (selectedUser) {
      console.log("Updating user:", selectedUser);
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

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure you want to delete this order?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("Order deleted");
      },
      onCancel() {
        console.log("Delete canceled");
      },
    });
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderID",
      key: "orderID",
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Shipping Address",
      key: "shippingAddress",
      render: (record: DataType) => (
        <>
          {record.shippingInfo.detailAddress}, {record.shippingInfo.ward},{" "}
          {record.shippingInfo.district}, {record.shippingInfo.province}
        </>
      ),
    },
    {
      title: "Receiver",
      dataIndex: ["shippingInfo", "receiverName"],
      key: "receiverName",
    },
    {
      title: "Phone",
      dataIndex: ["shippingInfo", "phone"],
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (record: DataType) => (
        <>
          <Button
            type="text"
            className="text-cyan-500"
            onClick={() => handleEdit(record)}
          >
            <EditOutlined />
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
        <p className="text-3xl font-bold">Order Management</p>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="orderID"
          style={{ height: "500px" }}
          scroll={{ y: 300 }}
          pagination={{ pageSize: 10, total: data.length }}
        />
      </div>
    </>
  );
};

export default OrderManagement;
