import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import Dashboard from "../components/Dashboard";
// import Login from "../components/Login";
// import Register from "../components/Register";
// import EditForm from "../components/EditForm";
// import { publicRoutes } from "./PathReference";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import Register from "../components/Register";
import EditForm from "../components/EditForm";
// import { authRoutes, publicRoutes } from "./PathReference";
import AddAdminProduct from "../components/Admin/AddAdminProduct";
import AdminDashboard from "../components/Admin/AdminDashboard";
// import { useSelector } from "react-redux";

const AllRoutes = () => {
  const isLogin = localStorage.getItem("token");
  return (
    <>
      <Routes>
       
        <Route path="/" element={isLogin ? <AdminDashboard /> : <Login />} />
        <Route path="/update/:id" element={<EditForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addproduct" element={<AddAdminProduct />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
