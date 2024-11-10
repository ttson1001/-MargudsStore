import { Breadcrumb, Button, Modal, Table, Select, Form, Tooltip } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_SERVER } from "../api/admin-api";
import { getOrderStatus } from "../api/api-service";
import "./order-page.css";
import { fakeOrder } from "../data/fake-order";

const { Option } = Select;

export interface DataType {
  orderID: number;
  orderDate: string;
  status: number;
  total: number;
  reportID: number;
  shippingInfo: ShippingInfo;
  paymentMethod: number;
  orderDetails: any[]; // Assuming order details are here
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
  const [data, setData] = useState<DataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<DataType | null>(null);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await axios.get(
          API_SERVER + "api/Order/get-all-orders"
        );
        setData(response.data.data.concat(fakeOrder));
      } catch (error) {
        console.error(error);
      }
    };

    getAllOrders();
  }, []);

  const openModal = (record: DataType) => {
    setCurrentRecord(record);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentRecord(null);
  };

  const openDetailModal = (record: DataType) => {
    setCurrentRecord(record);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setCurrentRecord(null);
  };

  const handleSave = async () => {
    if (currentRecord) {
      await axios
        .put(
          API_SERVER +
            `api/Order/update-order-status?orderId=${currentRecord.orderID}&status=${currentRecord.status}`
        )
        .then(() => {
          closeModal();
        });
    }
  };

  const handleFieldChange = (field: keyof DataType, value: any) => {
    setCurrentRecord((prev) => (prev ? { ...prev, [field]: value } : prev));
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
      render: (orderDate: string) => {
        const date = new Date(orderDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
        const year = date.getFullYear();
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");

        return `${day}/${month}/${year} ${hour}:${minute}`;
      },
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
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (paymentMethod: any) => (
        <>{paymentMethod === 0 ? "COD" : "VnPay"}</>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: number) => <span>{getOrderStatus(status)}</span>,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total: number) => (
        <span>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(total)}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: DataType) => (
        <>
          <Tooltip title="Edit Order">
            <Button icon={<EditOutlined />} onClick={() => openModal(record)} />
          </Tooltip>
          <Tooltip title="View Details">
            <Button
              icon={<EyeOutlined />}
              onClick={() => openDetailModal(record)}
              style={{ marginLeft: "10px" }}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  const detailColumns = [
    {
      title: "Product Name",
      dataIndex: ["product", "name"],
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (price: number) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(price),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount: number) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(amount),
    },
    {
      title: "Images",
      dataIndex: ["product", "imageProducts"],
      key: "images",
      render: (images: { image: string }[]) =>
        images.map((img, index) => (
          <img
            key={index}
            src={img.image}
            alt="Product"
            style={{ width: "50px", marginRight: "5px" }}
          />
        )),
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
        style={{ padding: 24, minHeight: "80vh" }}
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

      {/* Modal to Edit Order */}
      <Modal
        title="Update Order"
        visible={isModalOpen}
        onOk={handleSave}
        onCancel={closeModal}
      >
        {currentRecord && (
          <Form layout="vertical">
            <Form.Item label="Status">
              <Select
                value={currentRecord.status}
                onChange={(value) => handleFieldChange("status", value)}
              >
                <Option value={0}>To Pay</Option>
                <Option value={1}>To Confirm</Option>
                <Option value={2}>To Ship</Option>
                <Option value={3}>To Receive</Option>
                <Option value={4}>Completed</Option>
                <Option value={5}>Cancelled</Option>
                <Option value={6}>Return/Refund</Option>
                <Option value={7}>Request Return</Option>
              </Select>
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* Modal to View Order Details */}
      <Modal
        title="Order Details"
        visible={isDetailModalOpen}
        onOk={closeDetailModal}
        onCancel={closeDetailModal}
        width={800}
      >
        {currentRecord && (
          <Table
            columns={detailColumns}
            dataSource={currentRecord.orderDetails}
            rowKey="productID"
            pagination={false}
          />
        )}
      </Modal>
    </>
  );
};

export default OrderManagement;
