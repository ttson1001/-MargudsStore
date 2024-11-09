import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  List,
  Typography,
  Input,
  Row,
  Col,
  Divider,
  Modal,
  Form,
} from "antd";
import axios from "axios";
import { API_SERVER } from "../api/admin-api";
import useUserStore from "../api/store";
import { checkOut } from "../api/api-service";

const { Title, Text } = Typography;

const CartPage = () => {
  const [cartItems, setCartItems] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const [loading, setLoading] = useState(false); // Loading state for checkout
  const [form] = Form.useForm(); // Form instance for managing form state
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          API_SERVER + `api/Cart/` + user.userID
        );
        const cartData = response.data.data.cartItem;

        const updatedCartItems = cartData.map((item: any) => ({
          ...item,
          name: item.product.name,
          price: item.product.purchasePrice,
          image: item.product.imageProducts[0]?.image, // Assuming the first image is the main image
          description: item.product.description,
          quantity: item.quantity,
        }));

        setCartItems(updatedCartItems);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, [user]);

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total: any, item: any) => total + item.price * item.quantity,
      0
    );
  };

  const updateQuantity = (productID: string, quantity: number) => {
    setCartItems((prevItems: any) =>
      prevItems.map((item: any) =>
        item.productID === productID ? { ...item, quantity } : item
      )
    );
  };

  const showCheckoutModal = () => {
    setIsModalVisible(true); // Show the modal when user clicks checkout
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Hide the modal
  };

  const handleConfirmCheckout = async () => {
    setLoading(true); // Set loading state to true while processing

    // Get form data
    const formData = form.getFieldsValue();

    const shippingAddress = {
      detailAddress: formData.detailAddress,
      province: formData.province,
      provinceCode: formData.provinceCode,
      ward: formData.ward,
      district: formData.district,
      receiverName: formData.receiverName,
      phone: formData.phone,
    };

    try {
      const response = await checkOut(
        shippingAddress,
        user.userID,
        getTotalPrice(),
        -1
      ); // Assuming -1 for userVoucherId
      window.location.href = response;
      setIsModalVisible(false); // Close modal after successful checkout
      setLoading(false); // Reset loading state
      // Handle successful checkout (e.g., show success message or redirect to order page)
    } catch (error) {
      console.error("Checkout failed", error);
      setLoading(false); // Reset loading state on error
      // Handle checkout failure (e.g., show error message)
    }
  };

  const checkout = () => {
    showCheckoutModal(); // Show the modal when clicking checkout
  };

  // Render Cart Page with Modal for Checkout
  return (
    <div
      style={{ padding: "20px", backgroundColor: "#fff", minHeight: "100vh" }}
    >
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        Giỏ Hàng Của Bạn
      </Title>
      <Row gutter={16}>
        <Col span={16}>
          <List
            itemLayout="horizontal"
            dataSource={cartItems}
            renderItem={(item: any) => (
              <List.Item
                style={{
                  border: "1px solid #e8e8e8",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <List.Item.Meta
                  avatar={
                    <img
                      className="ml-5"
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: 100,
                        borderRadius: "8px",
                        marginRight: "16px",
                      }}
                    />
                  }
                  title={<Text strong>{item.name}</Text>}
                  description={
                    <>
                      <Text>{`Giá: ${item.price.toLocaleString()} VNĐ`}</Text>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: 10,
                        }}
                      >
                        <Button
                          type="default"
                          icon="minus"
                          style={{
                            marginRight: 5,
                            padding: "0 10px",
                            borderRadius: "5px",
                          }}
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateQuantity(item.productID, item.quantity - 1);
                            }
                          }}
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          min={1}
                          value={item.quantity}
                          style={{
                            width: 70,
                            marginRight: 10,
                            borderRadius: "5px",
                            boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
                          }}
                          onChange={(e) => {
                            const newQuantity = Number(e.target.value);
                            updateQuantity(item.productID, newQuantity);
                          }}
                        />
                        <Button
                          type="default"
                          icon="plus"
                          style={{
                            marginLeft: 5,
                            padding: "0 10px",
                            borderRadius: "5px",
                          }}
                          onClick={() =>
                            updateQuantity(item.productID, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                        <div className="flex justify-end">{`Tổng: ${(
                          item.price * item.quantity
                        ).toLocaleString()} VNĐ`}</div>
                      </div>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
        <Col span={8}>
          <Card
            title="Tóm Tắt Đơn Hàng"
            style={{
              width: "100%",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
          >
            <Title
              level={4}
            >{`Tổng giá: ${getTotalPrice().toLocaleString()} VNĐ`}</Title>
            <Divider />
            <Button
              type="primary"
              onClick={checkout}
              style={{ width: "100%", marginBottom: 10, borderRadius: "5px" }}
              loading={loading}
            >
              Thanh Toán
            </Button>
            <Button
              type="default"
              style={{ width: "100%", borderRadius: "5px" }}
            >
              Tiếp Tục Mua Sắm
            </Button>
          </Card>
        </Col>
      </Row>

      {/* Modal for Checkout */}
      <Modal
        title="Xác Nhận Thanh Toán"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleConfirmCheckout}
          >
            Xác Nhận
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Địa chỉ chi tiết"
            name="detailAddress"
            rules={[
              { required: true, message: "Vui lòng nhập địa chỉ chi tiết!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tỉnh/Thành Phố"
            name="province"
            rules={[{ required: true, message: "Vui lòng chọn tỉnh thành!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mã tỉnh"
            name="provinceCode"
            rules={[{ required: true, message: "Vui lòng nhập mã tỉnh!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phường/Xã"
            name="ward"
            rules={[{ required: true, message: "Vui lòng nhập phường/xã!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Quận/Huyện"
            name="district"
            rules={[{ required: true, message: "Vui lòng nhập quận/huyện!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên người nhận"
            name="receiverName"
            rules={[
              { required: true, message: "Vui lòng nhập tên người nhận!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CartPage;
