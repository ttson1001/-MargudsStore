import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Card, Button, Carousel } from "antd";
import "./home-page.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_SERVER } from "../api/admin-api";

const { Content } = Layout;

const HomePage = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const handleClickCard = (productID: number) => {
    navigate(`../product/${productID}`);
  };

  const handleClick = (categoryName: string) => {
    navigate(`../list/${categoryName}`);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          API_SERVER + "api/category/GetAllCategory"
        );
        setData(response.data.data); // Use the data field
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
    setLoad(false);
  }, [load]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content className="custom-content">
        {/* Carousel for banners */}
        <Carousel autoplay>
          <div>
            <img
              src="https://images.unsplash.com/photo-1553649033-3fbc8d0fa3cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D"
              alt="Banner 1"
              className="carousel-image"
            />
          </div>
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyyxCG0PKyUt0TCkPSvAKoax-vC2iuwW1p3g&s"
              alt="Banner 2"
              className="carousel-image"
            />
          </div>
        </Carousel>

        {/* Iterate over categories and products */}
        {data.map((categoryItem: any) => (
          <div key={categoryItem.categoryID} style={{ marginBottom: "40px" }}>
            <div className="flex justify-between w-full mt-5 mb-5">
              <span className="text-3xl font-bold">{categoryItem.name}</span>
              <Button
                onClick={() => handleClick(categoryItem.categoryID)}
                type="primary"
              >
                Khám Phá
              </Button>
            </div>

            <Row gutter={[16, 16]} justify="start">
              {categoryItem.products.map((product: any) => (
                <Col xs={24} sm={12} md={8} lg={6} key={product.productID}>
                  <Card
                    onClick={() => handleClickCard(product.productID)}
                    hoverable
                    cover={
                      <img
                        style={{ objectFit: "contain" }}
                        alt={product.name}
                        src={
                          product.imageProducts.length > 0
                            ? product.imageProducts[0].image // Assuming imageProducts has an array with a url field
                            : "https://via.placeholder.com/150" // Fallback image
                        }
                      />
                    }
                    className="product-card"
                  >
                    <Card.Meta
                      title={product.name}
                      description={
                        <div>
                          <span style={{ fontWeight: "bold" }}>
                            {product.purchasePrice}đ
                          </span>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Content>
    </Layout>
  );
};

export default HomePage;
