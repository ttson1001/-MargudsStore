import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">404</h1>
        <p className="text-xl">Trang không tồn tại!</p>
        <p className="mt-4 text-gray-600">
          Xin vui lòng quay lại trang chủ hoặc kiểm tra lại URL.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
