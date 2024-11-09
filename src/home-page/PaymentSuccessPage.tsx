import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const navigateHome = () => {
    // Navigate to the home page or a relevant page
    navigate("../list");
  };

  return (
    <div
      className="h-full"
      style={{ padding: "50px", backgroundColor: "#f7f7f7", height: "85vh" }}
    >
      <Result
        status="success"
        title="Thanh Toán Thành Công"
        subTitle="Cảm ơn bạn đã mua sắm tại cửa hàng chúng tôi!"
        extra={[
          <Button type="primary" key="home" onClick={navigateHome}>
            Về Trang Chủ
          </Button>,
        ]}
      />
    </div>
  );
};

export default PaymentSuccessPage;
