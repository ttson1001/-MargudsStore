import axios from "axios";

export const createCategory = async (name: string) => {
  try {
    const response = await axios.post(
      "https://marguds.azurewebsites.net/api/category/CreateCategory",
      { name }
    );

    return response;
  } catch (error: any) {
    console.error(
      "Error during login:",
      error.response ? error.response.data : error.message
    );
  }
};

export const updateCategory = async (categoryId: number, name: string) => {
  try {
    const response = await axios.put(
      `https://marguds.azurewebsites.net/api/category/UpdateCategory?id=${categoryId}`,
      {
        name,
      }
    );
    console.log("Category updated:", response.data);
  } catch (error) {
    console.error("Error updating category:", error);
  }
};

export const postProduct = async (newCategory: any) => {
  try {
    const response = await axios.post(
      "https://marguds.azurewebsites.net/api/Product/AddForManagement", // Đường dẫn API POST
      newCategory // Payload chứa dữ liệu gửi đi
    );
    console.log("Category created:", response.data); // Log kết quả nếu thành công
  } catch (error) {
    console.error("Error creating category:", error); // Log lỗi nếu có
  }
};

export const updateProduct = async (updateProduct: any, id: number) => {
  try {
    const response = await axios.put(
      `https://marguds.azurewebsites.net/api/Product/UpdateForManagement?id=${id}`, // Đường dẫn API POST
      updateProduct // Payload chứa dữ liệu gửi đi
    );
    console.log("Category created:", response.data); // Log kết quả nếu thành công
  } catch (error) {
    console.error("Error creating category:", error); // Log lỗi nếu có
  }
};

export const deleteProduct = async (productID: number) => {
  try {
    // Make the DELETE request
    await axios.delete(
      `https://marguds.azurewebsites.net/api/Product/${productID}`
    );

    // Update the state to remove the deleted product
    console.log("Deleted product with ID:", productID);
  } catch (error) {
    console.error("Error deleting product:", error);
    // Optionally, you can show an error message to the user
  }
};
