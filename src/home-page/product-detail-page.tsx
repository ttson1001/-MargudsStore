import React, { useEffect, useState } from "react";
import { Rate, Button, Input, List, Avatar, Carousel, Pagination } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { API_SERVER } from "../api/admin-api";
import axios from "axios";
import useUserStore from "../api/store";
import { addTocart } from "../api/api-service";

// Define review type
interface Review {
  rating: number;
  avatar: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [reviews, setReviews] = useState<Review[]>([]); // All reviews
  const [rating, setRating] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1); // Track current page
  const reviewsPerPage = 5; // Number of reviews per page

  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  // Function to handle review submission
  const handleReviewSubmit = () => {
    if (rating) {
      const newReview: Review = {
        rating,
        avatar: user.image, // Placeholder avatar
      };
      setReviews([...reviews, newReview]); // Add new review to the list
      setRating(0); // Reset rating after submission
    }
  };

  // Function to handle buying now
  const buyNow = async () => {
    const rs = await addTocart(user.userID, data.productID)
      .then(() => {
        navigate("../cart");
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  // Function to add to cart
  const addToCart = async () => {
    const rs = await addTocart(user.userID, data.productID).catch((e) => {
      console.log(e.message);
    });
  };

  // Fetch product details
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          API_SERVER + `api/Product/productDetails/` + id
        );
        setData(response.data.data); // Set product data
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, [id]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate the current reviews to be shown based on the current page
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  return (
    <>
      <div className="flex w-full h-full">
        <div style={{ flex: 1, marginRight: "20px" }}>
          {/* Product image carousel */}
          <Carousel
            arrows
            autoplay
            dotPosition="left"
            infinite={true}
            style={{ maxHeight: "200px", overflow: "hidden" }}
            slidesToShow={1} // Default for small screens
            responsive={[
              {
                breakpoint: 600, // For mobile and small screens
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: true,
                  arrows: false,
                },
              },
              {
                breakpoint: 1200, // For medium screens
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  infinite: true,
                  arrows: true,
                },
              },
              {
                breakpoint: 1500, // For large screens
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  arrows: true,
                },
              },
            ]}
          >
            {data?.imageProducts.map((x: any, index: any) => (
              <div key={index} style={{ padding: "0 5px" }}>
                <img
                  src={x.image}
                  alt="Product"
                  style={{
                    width: "100%",
                    height: "300px", // Ensure consistent height
                    objectFit: "contain", // Keep images proportional
                  }}
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div style={{ flex: 1 }}>
          <p className="text-3xl">{data?.name}</p>
          <div>
            <span className="font-bold">Giá: </span>
            {data?.purchasePrice.toLocaleString()} VNĐ
          </div>
          <div>
            <span className="font-bold">Mô tả: </span>
            <p dangerouslySetInnerHTML={{ __html: data?.description }}></p>
          </div>
          <div>
            <span className="font-bold">Họa sĩ: </span>
            {data?.supplier}
          </div>
          <div>
            <span className="font-bold">Xuất xứ: </span>
            {data?.original}
          </div>
          <div>
            <span className="font-bold">Nặng: </span>
            {data?.weight} kg
            <span className="ml-1 font-bold">Cao: </span>
            {data?.height} cm
            <span className="ml-1 font-bold">Rộng: </span>
            {data?.width} cm
            <span className="ml-1 font-bold">Dài: </span>
            {data?.length} cm
          </div>

          <p>
            Điểm đánh giá: <Rate disabled value={5} />
          </p>

          <div style={{ margin: "10px 0" }}>
            <Button
              color="primary"
              variant="solid"
              style={{ marginRight: "10px" }}
              onClick={buyNow}
            >
              Mua Ngay
            </Button>
            <Button onClick={addToCart} color="danger" variant="solid">
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </div>

      <div style={{ width: "100%", marginTop: "20px" }}>
        <h2>Đánh Giá Sản Phẩm</h2>
        <div>
          <div className="flex justify-center">
            <Rate onChange={setRating} value={rating} />
          </div>
          <div className="flex justify-center mt-4">
            <Button type="primary" onClick={handleReviewSubmit}>
              Gửi Đánh Giá
            </Button>
          </div>
        </div>

        <List
          itemLayout="horizontal"
          dataSource={currentReviews} // Display only current page reviews
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<Rate disabled value={item.rating} />}
              />
            </List.Item>
          )}
          style={{ marginTop: "20px" }}
        />

        {/* Pagination */}
        <div className="w-full flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={reviewsPerPage}
            total={reviews.length}
            onChange={handlePageChange}
            style={{ marginTop: "20px", textAlign: "center" }}
          />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
