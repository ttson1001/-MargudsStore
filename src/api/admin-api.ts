import axios from "axios";

export const API_SERVER = "https://localhost:7208/";
export const createCategory = async (name: string) => {
  try {
    const response = await axios.post(
      API_SERVER + "api/category/CreateCategory",
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
      API_SERVER + `api/category/UpdateCategory?id=${categoryId}`,
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
      API_SERVER + "api/Product/AddForManagement", // Đường dẫn API POST
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
      API_SERVER + `api/Product/UpdateForManagement?id=${id}`, // Đường dẫn API POST
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
    await axios.delete(API_SERVER + `api/Product/${productID}`);

    // Update the state to remove the deleted product
    console.log("Deleted product with ID:", productID);
  } catch (error) {
    console.error("Error deleting product:", error);
    // Optionally, you can show an error message to the user
  }
};

export const updateUser = async (userId: number, value: any) => {
  try {
    console.log("value", value);
    const response = await axios.put(
      API_SERVER + `api/account/Update-Account?userId=${userId}`,
      {
        username: value.userName,
        email: value.email,
        name: value.name,
        address: value.address,
        phone: value.phone,
        role: value.roles ?? "Customer",
        image: value.image,
      }
    );
    console.log("User updated:", response.data);
  } catch (error) {
    console.error("Error updating category:", error);
  }
};

export const createUser = async (value: any) => {
  try {
    console.log(value);
    const response = await axios.post(
      API_SERVER + `api/account/create account`,
      {
        username: value.userName,
        email: value.email,
        name: value.name,
        password: value.password,
        address: value.address,
        phone: value.phone,
        role: value.roles ?? "Customer",
        image: value.image,
      }
    );
    console.log("User updated:", response.data);
  } catch (error) {
    console.error("Error updating category:", error);
  }
};
