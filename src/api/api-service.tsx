import axios from "axios";
import { API_SERVER } from "./admin-api";

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(API_SERVER + "api/account/login", {
      username,
      password,
    });

    // Lấy JWT token từ response
    const token = response.data.token;

    // Lưu JWT token vào localStorage (hoặc sessionStorage)
    localStorage.setItem("jwtToken", token);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error during login:",
      error.response ? error.response.data : error.message
    );
  }
};
