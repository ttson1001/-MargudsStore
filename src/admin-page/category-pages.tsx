import {
  Breadcrumb,
  Button,
  Input,
  Modal,
  Table,
  TableProps,
  Tooltip,
  Form,
} from "antd";
import "./category-page.css";
import {
  PlusOutlined,
  EditOutlined,
  CloseOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { createCategory, updateCategory } from "../api/admin-api";

interface DataType {
  categoryID: number;
  name: string;
}

const CategoryManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<DataType | null>(
    null
  );
  const [isLoad, setIsLoad] = useState<Boolean>(false);
  const [data, setData] = useState<DataType[]>([]);
  const [form] = Form.useForm();

  const { confirm } = Modal;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://marguds.azurewebsites.net/api/category/GetAllCategory"
        );
        setData(response.data.data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
    setIsLoad(false);
  }, [data, isLoad]);

  const showModal = () => {
    setIsModalOpen(true);
    setSelectedCategory(null);
    form.resetFields();
  };

  const handleEdit = (record: DataType) => {
    setSelectedCategory(record);
    setIsModalOpen(true);
    form.setFieldsValue(record);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (selectedCategory === null) {
        createCategory(values.name)
          .then((x) => {
            setIsLoad(true);
            setIsModalOpen(false);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        updateCategory(selectedCategory.categoryID, values.name).then((x) => {
          setIsLoad(true);
          setIsModalOpen(false);
        });
      }
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDeleteConfirm = (record: DataType) => {
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleFilled />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {},
    });
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "ID",
      dataIndex: "categoryID",
      key: "categoryID",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            key="edit"
            type="text"
            className="text-cyan-500"
            onClick={() => handleEdit(record)}
          >
            <EditOutlined />
          </Button>
          <Button
            key="delete"
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
        style={{ padding: 24, minHeight: "80vh" }}
      >
        <p className="text-3xl font-bold">Category Management</p>
        <div className="flex justify-end">
          <Tooltip title="Add Category">
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={showModal}
            />
          </Tooltip>
        </div>

        <Modal
          title={selectedCategory ? "Edit Category" : "Add Category"}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              {selectedCategory ? "Save" : "Add"}
            </Button>,
          ]}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please input the category name!" },
              ]}
            >
              <Input placeholder="Category Name" />
            </Form.Item>
          </Form>
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

export default CategoryManagement;
