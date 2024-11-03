import axios from "axios";
import { API_SERVER } from "./admin-api";

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post<any>(API_SERVER + "api/account/login", {
      username,
      password,
    });

    // Lấy JWT token từ response
    const token = response.data.token;

    // Lưu JWT token vào localStorage (hoặc sessionStorage)
    localStorage.setItem("jwtToken", token);

    return response.data;
  } catch (error: any) {
    return error.response.data
  }
};

export const register = async (value: any) => {
  try {
    const response = await axios.post(API_SERVER + "api/account/register", {
      username: value.username,
      email: value.email,
      name: value.name,
      phone: value.phone,
      password: value.password,
      address: value.password,
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error during login:",
      error.response ? error.response.data : error.message
    );
  }
};
