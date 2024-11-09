import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminPage from "./admin-page/admin-page";
import AccountManagement from "./admin-page/account-page";
import ProductManagement from "./admin-page/product-page";
import CategoryManagement from "./admin-page/category-pages";
import ReportManagement from "./admin-page/report-page";
import DashboardPage from "./admin-page/dashborad-page";
import OrderManagement from "./admin-page/order-page";
import LoginPage from "./login-page/login-page";
import RegisterPage from "./login-page/register-page";
import HomeLayout from "./home-page/home-layout";
import HomePage from "./home-page/home-page";
import ProductList from "./home-page/product-list";
import ProductDetail from "./home-page/product-detail-page";
import CartPage from "./home-page/cart-page";
import AboutContent from "./home-page/about-page";
import Test from "./home-page/test.page";
import InputCode from "./login-page/InputCode";
import "react-toastify/dist/ReactToastify.css";
import PaymentSuccessPage from "./home-page/PaymentSuccessPage";
import OrderHistory from "./home-page/orderHistory";
import UserProfile from "./home-page/userProfile";
import ChangePassword from "./home-page/changePassword";
import NotFoundPage from "./home-page/NotFoundPage";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <title>Margudsstore</title> {/* Thay đổi title động */}
      </Helmet>
      <Routes>
        {/* Route gốc sẽ dẫn đến trang Login */}
        <Route path="/" element={<LoginPage />} />

        {/* Các route khác */}
        <Route path="/test" element={<Test />} />
        <Route path="/verify" element={<InputCode />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/home" element={<HomeLayout />}>
          <Route path="list" element={<HomePage />} />
          <Route path="list/:category" element={<ProductList />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="order" element={<OrderHistory />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="paymentSuccessPage" element={<PaymentSuccessPage />} />
          <Route path="about" element={<AboutContent />} />
        </Route>

        <Route path="/admin" element={<AdminPage />}>
          <Route path="report" element={<ReportManagement />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="user" element={<AccountManagement />} />
          <Route path="product/list" element={<ProductManagement />} />
          <Route path="product/category" element={<CategoryManagement />} />
          <Route path="order" element={<OrderManagement />} />
        </Route>

        {/* Route mặc định cho trang 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
