import React from "react";
import logo from "./logo.svg";
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
import TestPage from "./home-page/home-page";
import HomeLayout from "./home-page/home-layout";
import HomePage from "./home-page/home-page";
import ProductList from "./home-page/product-list";
import ProductDetail from "./home-page/product-detail-page";
import CartPage from "./home-page/cart-page";
import AboutContent from "./home-page/about-page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/test" element={<TestPage />}></Route>
        <Route path="/" element={<AdminPage />}>
          <Route path="report" element={<ReportManagement />}></Route>
          <Route path="dashboard" element={<DashboardPage />}></Route>
          <Route path="user" element={<AccountManagement />}></Route>
          <Route path="product/list" element={<ProductManagement />}></Route>
          <Route
            path="product/category"
            element={<CategoryManagement />}
          ></Route>
          <Route path="order" element={<OrderManagement />}></Route>
          {/* <Route path="film" element={<FilmPage />}></Route>
          <Route path="film/:id" element={<FilmDetailPage />}></Route>
          <Route path="booking" element={<BookingPage />}></Route>
          <Route path="dashboard" element={<DashboardPage />}></Route>
          <Route path="room" element={<RoomPage />}></Route>
          <Route path="xuatchieu" element={<XuatChieu />}></Route> */}
        </Route>
        {/* <Route path="register" element={<Register />}></Route> */}
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/home" element={<HomeLayout />}>
          <Route path="list" element={<HomePage />}></Route>
          <Route path="list/:category" element={<ProductList />}></Route>
          <Route path="product/:id" element={<ProductDetail />}></Route>
          <Route path="cart" element={<CartPage />}></Route>
          <Route path="about" element={<AboutContent />}></Route>
        </Route>
        {/* <Route path="" element={<TrangChu />}>
        <Route path="film/:id" element={<Film />}></Route>
        <Route path="home" element={<Home />}></Route>
        <Route path="ticket" element={<Ticket />}></Route>
        <Route path="films" element={<Films />}></Route>
        <Route path="booking/:id" element={<Booking />}></Route>
        <Route path="profile" element={<Profile />}></Route>
      </Route> */}
      </Routes>
    </>
  );
}

export default App;
