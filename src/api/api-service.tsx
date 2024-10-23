import axios from "axios";

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      "https://marguds.azurewebsites.net/api/account/login",
      {
        username,
        password,
      }
    );

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
