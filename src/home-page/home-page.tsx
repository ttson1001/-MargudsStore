import React from "react";
import { Layout, Row, Col, Card, Button, Carousel } from "antd";
import "./home-page.css";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

const categoriesWithProducts = {
  "Móc khóa": [
    {
      id: 1,
      name: "Mô hình standee 8cm ORV Toàn Trí Độc Giả - Yoo Joonghyuk",
      price: 110000,
      originalPrice: 1299000,
      discount: "97%",
      image:
        "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lucdahvrykgvfb.webp",
    },
    {
      id: 2,
      name: "Mô hình standee 8cm ORV Toàn Trí Độc Giả - YooHanKim",
      price: 110000,
      originalPrice: 260000,
      discount: "70%",
      image:
        "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lucdahvrzz1b45.webp",
    },
    {
      id: 3,
      name: "Plushie bông My S Class Hunters có còi Han Yoohyun",
      price: 142000,
      originalPrice: 260000,
      discount: "70%",
      image:
        "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lytdudiqnm1962.webp",
    },
    {
      id: 4,
      name: "Plushie bông My S Class Hunters có còi Han Yoojin",
      price: 142000,
      originalPrice: 260000,
      discount: "70%",
      image:
        "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lytdudiq861tc0.webp",
    },
  ],
  "Truyện tranh": [
    {
      id: 3,
      name: "Spotify Premium 1 năm",
      price: 390000,
      originalPrice: 708000,
      discount: "45%",
      image: "https://path-to-image.com/product3.jpg",
    },
  ],
  "Mô hình": [
    {
      id: 4,
      name: "Zoom Pro ~1 tháng",
      price: 210000,
      originalPrice: 350000,
      discount: "40%",
      image: "https://path-to-image.com/product4.jpg",
    },
  ],
};

const HomePage = () => {
  const navigate = useNavigate();

  const handleClickCard = (value: number) => {
    navigate("../product/" + value);
  };
  const handleClick = (value: string) => {
    navigate("../list/" + value);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content className="custom-content">
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

        {Object.entries(categoriesWithProducts).map(([category, products]) => (
          <div key={category} style={{ marginBottom: "40px" }}>
            <div className="flex justify-between w-full mt-5 mb-5">
              <span className="text-3xl font-bold">{category}</span>
              <Button onClick={() => handleClick(category)} type="primary">
                Khám Phá
              </Button>
            </div>

            <Row gutter={[16, 16]} justify="start">
              {products.map((product) => (
                <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                  <Card
                    onClick={() => handleClickCard(product.id)}
                    hoverable
                    cover={
                      <img
                        style={{ objectFit: "contain" }}
                        alt={product.name}
                        src={product.image}
                      />
                    }
                    className="product-card"
                  >
                    <Card.Meta
                      title={product.name}
                      description={
                        <div>
                          <span style={{ fontWeight: "bold" }}>
                            {product.price}đ
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
