import React, { useEffect, useState } from "react";
import { Card, Col, Row, Rate } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { fakeProductss } from "../data/fake-product";
import axios from "axios";
import { API_SERVER } from "../api/admin-api";

const ProductList = () => {
  const { category } = useParams();
  const [data, setData] = useState<any>([]);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const handleClickCard = (value: number) => {
    navigate("../product/" + value);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          API_SERVER + `api/category/GetCategory/` + category
        );
        setData(response.data.data.products); // Use the data field
        console.log(response.data.data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
    setLoad(false);
  }, [load]);

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
        {data.map((product: any) => (
          <Col span={8} key={product?.id}>
            <Card
              onClick={() => handleClickCard(product?.productID)}
              hoverable
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                margin: "16px 0", // Add margin above and below the card
              }}
              cover={
                <img
                  alt={product?.name}
                  src={product?.imageProducts[0]}
                  style={{
                    borderRadius: "10px 10px 0 0",
                    height: "200px",
                    objectFit: "contain",
                  }}
                />
              }
            >
              <Card.Meta
                title={product?.name}
                description={
                  <div>
                    <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      {product?.purchasePrice}
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
