import React, { useState } from "react";
import { Card, Button, List, Typography, Input, Row, Col, Divider } from "antd";

const { Title, Text } = Typography;

const CartPage = () => {
  // Mẫu dữ liệu sản phẩm trong giỏ hàng
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Sản phẩm 1",
      price: 500000,
      quantity: 1,
      image: "https://via.placeholder.com/100?text=Product+1",
    },
    {
      id: 2,
      name: "Sản phẩm 2",
      price: 300000,
      quantity: 2,
      image: "https://via.placeholder.com/100?text=Product+2",
    },
    {
      id: 2,
      name: "Sản phẩm 2",
      price: 300000,
      quantity: 2,
      image: "https://via.placeholder.com/100?text=Product+2",
    },
  ]);

  // Tính tổng giá trị giỏ hàng
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#fff",
        minHeight: "100vh",
      }}
    >
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        Giỏ Hàng Của Bạn
      </Title>
      <Row gutter={16}>
        <Col span={16}>
          <List
            itemLayout="horizontal"
            dataSource={cartItems}
            renderItem={(item) => (
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
                            setCartItems((prevItems) =>
                              prevItems.map((prevItem) =>
                                prevItem.id === item.id
                                  ? { ...prevItem, quantity: newQuantity }
                                  : prevItem
                              )
                            );
                          }}
                        />
                        <Text>{`Tổng: ${(
                          item.price * item.quantity
                        ).toLocaleString()} VNĐ`}</Text>
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
              style={{ width: "100%", marginBottom: 10, borderRadius: "5px" }}
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
    </div>
  );
};

export default CartPage;
