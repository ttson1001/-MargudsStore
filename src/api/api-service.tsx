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
    return error.response.data;
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

export const addTocart = async (accountId: any, productId: any) => {
  try {
    const response = await axios.post(API_SERVER + "api/Cart", {
      accountId,
      productId,
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error during login:",
      error.response ? error.response.data : error.message
    );
  }
};

export const changePassword = async (value: any) => {
  try {
    const response = await axios.post(
      API_SERVER + "api/account/Change-Password",
      {
        userName: value.userName,
        currentPassword: value.currentPassword,
        newPassword: value.newPassword,
        confirmNewPassword: value.confirmNewPassword,
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error during login:",
      error.response ? error.response.data : error.message
    );
  }
};

export const checkOut = async (
  value: any,
  accountId: any,
  totals: any,
  userVoucherId: any
) => {
  try {
    const response = await axios.post(
      API_SERVER +
        `api/Checkout/createOrder?accountId=${accountId}&totals=${
          totals + 50000
        }&userVoucherId=${(userVoucherId = -1)}`,
      {
        detailAddress: value.detailAddress,
        province: value.detailAddress,
        provinceCode: value.provinceCode,
        ward: value.ward,
        district: value.district,
        receiverName: value.receiverName,
        phone: value.phone,
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error during login:",
      error.response ? error.response.data : error.message
    );
  }
};

export const getOrderStatus = (status: any) => {
  console.log(status);
  switch (status) {
    case 0:
      return "To Pay";
    case 1:
      return "To Confirm";
    case 2:
      return "To Ship";
    case 3:
      return "To Receive";
    case 4:
      return "Completed";
    case 5:
      return "Cancelled";
    case 6:
      return "Return/Refund";
    case 7:
      return "Request Return";
    default:
      return "Unknown Status";
  }
};
