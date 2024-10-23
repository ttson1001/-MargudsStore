import React from "react";
import { Card, Col, Row, Rate } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { fakeProductss } from "../data/fake-product";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: "$10",
    image: "https://via.placeholder.com/150",
    rating: 4,
  },
  {
    id: 2,
    name: "Product 2",
    price: "$20",
    image: "https://via.placeholder.com/150",
    rating: 5,
  },
  {
    id: 3,
    name: "Product 3",
    price: "$30",
    image: "https://via.placeholder.com/150",
    rating: 3,
  },
  {
    id: 4,
    name: "Product 4",
    price: "$40",
    image: "https://via.placeholder.com/150",
    rating: 4.5,
  },
  {
    id: 5,
    name: "Product 5",
    price: "$25",
    image: "https://via.placeholder.com/150",
    rating: 4,
  },
  {
    id: 6,
    name: "Product 6",
    price: "$35",
    image: "https://via.placeholder.com/150",
    rating: 5,
  },
  {
    id: 7,
    name: "Product 7",
    price: "$45",
    image: "https://via.placeholder.com/150",
    rating: 4,
  },
];

const ProductList = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const handleClickCard = (value: number) => {
    navigate("../product/" + value);
  };
  return (
    <div>
      {/* Banner Section */}
      <div
        style={{
          position: "relative",
          height: "200px",
          background: "#007bff",
          color: "white",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          {category}
        </h1>
      </div>

      {/* Product List Section */}
      <Row gutter={16} style={{ padding: "16px" }}>
        {fakeProductss.map((product) => (
          <Col span={8} key={product.id}>
            <Card
              onClick={() => handleClickCard(product.id)}
              hoverable
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                margin: "16px 0", // Add margin above and below the card
              }}
              cover={
                <img
                  alt={product.name}
                  src={product.imageUrl[0]}
                  style={{
                    borderRadius: "10px 10px 0 0",
                    height: "200px",
                    objectFit: "contain",
                  }}
                />
              }
            >
              <Card.Meta
                title={product.name}
                description={
                  <div>
                    <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      {product.purchasePrice}
                    </span>
                    <br />
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;
