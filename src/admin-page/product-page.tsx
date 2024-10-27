import {
  Breadcrumb,
  Button,
  Input,
  Modal,
  Select,
  Table,
  Tooltip,
  Form,
  Row,
  Col,
} from "antd";
import "./product-page.css";
import {
  PlusOutlined,
  EditOutlined,
  CloseOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  API_SERVER,
  deleteProduct,
  postProduct,
  updateCategory,
  updateProduct,
} from "../api/admin-api";

interface DataType {
  productID: number;
  name: string;
  inventoryQuantity: number;
  description: string;
  unitPrice: number;
  purchasePrice: number;
  supplier: string;
  original: string;
  status: boolean;
  weight: number;
  height: number;
  width: number;
  length: number;
  imageProducts: ImageProduct[];
  category: Category;
  ratings: Rating;
}

interface ImageProduct {
  image: string; // Each image product has an image URL
}

interface Rating {
  ratingID: number; // Unique identifier for the rating
  rate: number; // Numeric rating value (e.g., 0-5 stars)
}

// Interface for Category
interface Category {
  categoryID: number; // Unique identifier for the category
  name: string; // Name of the category
}

const ProductManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<DataType | null>(null);
  const [data, setData] = useState<DataType[]>([]);
  const [isLoad, setIsLoad] = useState<Boolean>(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
    setSelectedProduct(null);
    form.resetFields(); // Reset the form for a new product
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          API_SERVER + "api/Product/GetForManagement"
        );
        setData(response.data.data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
    setIsLoad(false);
  }, [isLoad]);

  const handleEdit = (record: DataType) => {
    setSelectedProduct(record);
    const imageString = record.imageProducts
      .map((item: any) => item.image)
      .join(";");
    const select = {
      ...record,
      categoryID: record.category?.categoryID,
      imageProducts: imageString,

      // Optional chaining to prevent runtime error
    };
    console.log(record);
    setIsModalOpen(true);
    form.setFieldsValue(select); // Populate the form fields for editing
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const imageProducts: ImageProduct[] = values.imageProducts
        ? values.imageProducts.split(";").map((url: string) => ({
            image: url.trim(), // Remove whitespace
          }))
        : [];
      if (selectedProduct) {
        updateProduct({ ...values, imageProducts }, selectedProduct.productID);
        console.log("Updating product:", { ...selectedProduct, ...values });
        setIsLoad(true);
        setIsModalOpen(false);
      } else {
        console.log(values);
        postProduct({ ...values, imageProducts });
        setIsLoad(true);
        setIsModalOpen(false);
      }
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDeleteConfirm = (record: DataType) => {
    Modal.confirm({
      title: "Are you sure delete this product?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteProduct(record.productID);
        setIsLoad(true);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "productID",
      key: "productID",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "inventoryQuantity",
      key: "inventoryQuantity",
    },
    {
      title: "Des.",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
    {
      title: "Purchase Price",
      dataIndex: "purchasePrice",
      key: "purchasePrice",
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      key: "supplier",
    },
    {
      title: "Original",
      dataIndex: "original",
      key: "original",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => (status ? "Active" : "Inactive"),
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Height",
      dataIndex: "height",
      key: "height",
    },
    {
      title: "Width",
      dataIndex: "width",
      key: "width",
    },
    {
      title: "Length",
      dataIndex: "length",
      key: "length",
    },
    // {
    //   title: "Images",
    //   dataIndex: "imageProducts",
    //   key: "imageProducts",
    // },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: Category) => category.name, // Display the category name
    },
    {
      title: "Ratings",
      dataIndex: "ratings",
      key: "ratings",
      render: (ratings: Rating[]) => (
        <>
          {ratings.map((rating, index) => (
            <div key={index}>
              Rating ID: {rating.ratingID}, Rate: {rating.rate}
            </div>
          ))}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <>
          <Button
            type="text"
            className="text-cyan-500"
            onClick={() => handleEdit(record)}
          >
            <EditOutlined />
          </Button>
          <Button
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
        <p className="text-3xl font-bold">Product Management</p>
        <div className="flex justify-end">
          <Tooltip title="Add Product">
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={showModal}
            />
          </Tooltip>
        </div>

        <Modal
          title={selectedProduct ? "Edit Product" : "Add Product"}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              {selectedProduct ? "Save" : "Add"}
            </Button>,
          ]}
          width={800} // Adjust the width of the modal as needed
          style={{ top: 20 }} // Move the modal closer to the top of the screen
        >
          <Form form={form} layout="vertical" style={{ padding: "16px" }}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Product Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input the product name!",
                    },
                  ]}
                >
                  <Input placeholder="Enter product name" />
                </Form.Item>

                <Form.Item
                  label="Supplier"
                  name="supplier"
                  rules={[
                    { required: true, message: "Please input the supplier!" },
                  ]}
                >
                  <Input placeholder="Enter supplier name" />
                </Form.Item>

                <Form.Item
                  label="Unit Price"
                  name="unitPrice"
                  rules={[
                    { required: true, message: "Please input the unit price!" },
                  ]}
                >
                  <Input type="number" placeholder="Enter unit price" />
                </Form.Item>

                <Form.Item
                  label="Purchase Price"
                  name="purchasePrice"
                  rules={[
                    {
                      required: true,
                      message: "Please input the purchase price!",
                    },
                  ]}
                >
                  <Input type="number" placeholder="Enter purchase price" />
                </Form.Item>

                <Form.Item
                  label="Inventory Quantity"
                  name="inventoryQuantity"
                  rules={[
                    {
                      required: true,
                      message: "Please input the inventory quantity!",
                    },
                  ]}
                >
                  <Input type="number" placeholder="Enter inventory quantity" />
                </Form.Item>

                <Form.Item
                  label="Status"
                  name="status"
                  rules={[
                    { required: true, message: "Please select a status!" },
                  ]}
                >
                  <Select
                    options={[
                      { value: true, label: "Active" },
                      { value: false, label: "Inactive" },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Category"
                  name="categoryID"
                  rules={[
                    { required: true, message: "Please input the category!" },
                  ]}
                >
                  <Input placeholder="Enter product category" />
                </Form.Item>

                <Form.Item
                  label="Image"
                  name="imageProducts"
                  rules={[
                    { required: true, message: "Please upload an image!" },
                  ]}
                >
                  <Input placeholder="Enter image URL" />
                </Form.Item>

                <Form.Item
                  label="Original"
                  name="original"
                  rules={[
                    { required: true, message: "Please input the original!" },
                  ]}
                >
                  <Input placeholder="Enter original" />
                </Form.Item>

                {/* Row for Weight, Height, Width, and Length */}
                <Row gutter={16} style={{ marginTop: "16px" }}>
                  <Col span={6}>
                    <Form.Item
                      label="Weight (kg)"
                      name="weight"
                      rules={[
                        { required: true, message: "Please input the weight!" },
                      ]}
                    >
                      <Input type="number" placeholder="Enter weight" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      label="Height (cm)"
                      name="height"
                      rules={[
                        { required: true, message: "Please input the height!" },
                      ]}
                    >
                      <Input type="number" placeholder="Enter height" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      label="Width (cm)"
                      name="width"
                      rules={[
                        { required: true, message: "Please input the width!" },
                      ]}
                    >
                      <Input type="number" placeholder="Enter width" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      label="Length (cm)"
                      name="length"
                      rules={[
                        { required: true, message: "Please input the length!" },
                      ]}
                    >
                      <Input type="number" placeholder="Enter length" />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* Description field at the end */}
            <Form.Item label="Description" name="description">
              <Input.TextArea
                placeholder="Enter product description"
                rows={4}
              />
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

export default ProductManagement;
