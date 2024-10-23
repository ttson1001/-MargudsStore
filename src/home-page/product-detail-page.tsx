import React, { useState } from "react";
import { Rate, Button, Input, List, Avatar, Carousel } from "antd";
import { idText } from "typescript";
import { fakeProductss } from "../data/fake-product";
import { useParams } from "react-router-dom";

// Định nghĩa kiểu cho review
interface Review {
  rating: number;
  text: string;
  avatar: string;
}

// Định nghĩa kiểu cho sản phẩm
interface Product {
  id: number;
  name: string;
  unitPrice: number;
  description: string;
  artist: string; // Thêm trường artist
  imageUrl: string[];
  createdAt: string; // Ngày tạo
  updatedAt: string; // Ngày cập nhật
  isAvailable: boolean; // Tình trạng có hàng
  rating: number; // Điểm đánh giá trung bình
}

const ProductDetail = () => {
  // Dữ liệu sản phẩm (mô phỏng từ JSON)

  const { id } = useParams();
  const product = fakeProductss.find((x) => x.id === Number(id));

  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");

  const handleReviewSubmit = () => {
    if (reviewText && rating) {
      const newReview: Review = {
        rating,
        text: reviewText,
        avatar: "https://via.placeholder.com/40",
      };
      setReviews([...reviews, newReview]);
      setReviewText("");
      setRating(0);
    }
  };

  return (
    <>
      <div className="flex w-full">
        <div style={{ flex: 1, marginRight: "20px" }}>
          {/* Giới hạn chiều cao của carousel */}
          <Carousel
            arrows
            autoplay
            dotPosition="left"
            infinite={true}
            style={{ maxHeight: "250px", overflow: "hidden" }}
          >
            {product?.imageUrl.map((x, index) => (
              <div key={index} style={{ flex: "1 0 50%", padding: "0 5px" }}>
                <img
                  src={x}
                  alt=""
                  style={{
                    width: "100%",
                    height: "300px", // Đặt chiều cao của ảnh trong carousel
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div style={{ flex: 1 }}>
          <h1>{product?.name}</h1>
          <p>Giá: {product?.purchasePrice.toLocaleString()} VNĐ</p>
          <p>Mô tả: {product?.description}</p>
          <p>Artist: {product?.supplier}</p>
          <p>Trạng thái: {product?.status ? "Có hàng" : "Hết hàng"}</p>
          <p>
            Điểm đánh giá: <Rate disabled value={5} />
          </p>

          <div style={{ margin: "10px 0" }}>
            <Button type="primary" style={{ marginRight: "10px" }}>
              Mua Ngay
            </Button>
            <Button type="default">Thêm Vào Giỏ Hàng</Button>
          </div>
        </div>
      </div>
      <div style={{ width: "100%", marginTop: "20px" }}>
        <h2>Đánh Giá Sản Phẩm</h2>
        <Rate onChange={setRating} value={rating} />
        <Input.TextArea
          rows={4}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Viết đánh giá của bạn..."
        />
        <Button
          type="primary"
          onClick={handleReviewSubmit}
          style={{ marginTop: "10px" }}
        >
          Gửi Đánh Giá
        </Button>

        <List
          itemLayout="horizontal"
          dataSource={reviews}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<Rate disabled value={item.rating} />}
                description={item.text}
              />
            </List.Item>
          )}
          style={{ marginTop: "20px" }}
        />
      </div>
    </>
  );
};

export default ProductDetail;
