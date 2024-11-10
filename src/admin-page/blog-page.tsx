import {
  Breadcrumb,
  Button,
  Input,
  Modal,
  Table,
  TableProps,
  Tooltip,
  Form,
  Select,
} from "antd";
import { PlusOutlined, EditOutlined, CloseOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_SERVER } from "../api/admin-api";

interface BlogDataType {
  blogID: number;
  accountID: string;
  title: string;
  content: string;
  author: string;
  createAt: string;
  updateAt: string;
  status: boolean;
  imageBlogs: string[];
}

const BlogManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogDataType | null>(null);
  const [isLoad, setIsLoad] = useState(false);
  const [data, setData] = useState<BlogDataType[]>([]);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
    setSelectedBlog(null);
    form.resetFields();
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(API_SERVER + "api/Blog/GetAllBlogs");
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
    setIsLoad(false);
  }, [isLoad]);

  const handleEdit = (record: BlogDataType) => {
    setSelectedBlog(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const formValues = await form.validateFields();
      if (selectedBlog) {
        await axios.put(`/api/blog/${selectedBlog.blogID}`, formValues);
      } else {
        await axios.post("/api/blog", formValues);
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

  const columns: TableProps<BlogDataType>["columns"] = [
    { title: "Blog ID", dataIndex: "blogID", key: "blogID" },
    { title: "Account ID", dataIndex: "accountID", key: "accountID" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Content", dataIndex: "content", key: "content" },
    { title: "Author", dataIndex: "author", key: "author" },
    { title: "Created At", dataIndex: "createAt", key: "createAt" },
    { title: "Updated At", dataIndex: "updateAt", key: "updateAt" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? "Active" : "Inactive"),
    },
    {
      title: "Images",
      dataIndex: "imageBlogs",
      key: "imageBlogs",
      render: (images) =>
        images.length > 0
          ? images?.map((img: any) => <img src={img} alt="" width={50} />)
          : "No images",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="text" onClick={() => handleEdit(record)}>
            <EditOutlined />
          </Button>
          <Button type="text">
            <CloseOutlined />
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Blog</Breadcrumb.Item>
        <Breadcrumb.Item>Manage</Breadcrumb.Item>
      </Breadcrumb>

      <div style={{ padding: 24, minHeight: "80vh" }}>
        <p className="text-3xl font-bold">Blog Management</p>
        <div className="flex justify-end">
          <Tooltip title="Add Blog">
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={showModal}
            />
          </Tooltip>
        </div>

        <Modal
          title={selectedBlog ? "Edit Blog" : "Add Blog"}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              {selectedBlog ? "Save" : "Add"}
            </Button>,
          ]}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input the title!" }]}
            >
              <Input placeholder="Title" />
            </Form.Item>

            <Form.Item
              label="Content"
              name="content"
              rules={[{ required: true, message: "Please input the content!" }]}
            >
              <Input.TextArea placeholder="Content" rows={4} />
            </Form.Item>

            <Form.Item
              label="Author"
              name="author"
              rules={[{ required: true, message: "Please input the author!" }]}
            >
              <Input placeholder="Author" />
            </Form.Item>

            <Form.Item label="Status" name="status">
              <Select
                options={[
                  { value: true, label: "Active" },
                  { value: false, label: "Inactive" },
                ]}
              />
            </Form.Item>

            <Form.Item label="Images" name="imageBlogs">
              <Input placeholder="Image URLs (comma separated)" />
            </Form.Item>
          </Form>
        </Modal>

        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10, total: data.length }}
        />
      </div>
    </>
  );
};

export default BlogManagement;
