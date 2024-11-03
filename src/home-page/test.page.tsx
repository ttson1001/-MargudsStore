import React, { useState } from "react";

interface ImageData {
  base64String: string;
  url: string;
}

function Test() {
  const [imageList, setImageList] = useState<ImageData[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const newImages: ImageData[] = [];

      Array.from(files).forEach((file) => {
        const reader = new FileReader();

        // Đọc file dưới dạng Data URL để có dữ liệu Base64
        reader.readAsDataURL(file);

        reader.onload = () => {
          if (typeof reader.result === "string") {
            // Lấy phần Base64
            const base64String = reader.result.split(",")[1];

            // Tạo Blob từ file
            const blob = new Blob([file], { type: file.type });

            // Tạo URL từ Blob
            const url = URL.createObjectURL(blob);

            // Thêm ảnh mới vào mảng
            newImages.push({ base64String, url });

            // Cập nhật state với danh sách ảnh mới
            setImageList((prev) => [...prev, { base64String, url }]);
          }
        };
      });
    }
  };

  return (
    <div>
      <h2>Chọn nhiều ảnh và lưu vào danh sách</h2>
      <input type="file" multiple onChange={handleFileChange} />

      <h3>Danh sách hình ảnh:</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {imageList.map((image, index) => (
          <div key={index} style={{ margin: "10px" }}>
            <img
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              style={{ maxWidth: "100px" }} // Điều chỉnh kích thước theo nhu cầu
            />
            <textarea
              rows={3}
              readOnly
              value={image.base64String}
              style={{ width: "100px", marginTop: "5px" }} // Kích thước textarea
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Test;
