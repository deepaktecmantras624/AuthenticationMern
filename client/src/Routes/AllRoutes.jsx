import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
// import Dashboard from "../components/Dashboard";
// import Login from "../components/Login";
// import Register from "../components/Register";
// import EditForm from "../components/EditForm";
// import { publicRoutes } from "./PathReference";
// import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import Register from "../components/Register";
import EditForm from "../components/EditForm";
// import { authRoutes, publicRoutes } from "./PathReference";
import AddAdminProduct from "../components/Admin/AddAdminProduct";
import AdminDashboard from "../components/Admin/AdminDashboard";
// import { useSelector } from "react-redux";

// const AllRoutes = () => {
//     const isLogin = !!localStorage.getItem("token");
//   return (
//     <>
//       <Routes>
       
//         <Route path="/" element={isLogin ? <AdminDashboard /> : <Login />} />
//         <Route path="/update/:id" element={<EditForm />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/addproduct" element={<AddAdminProduct />} />
//         {/* <Route path="/login" element={<Login />} /> */}
        
//       </Routes>
//     </>
//   );
// };
const AllRoutes = () => {
  const navigate = useNavigate();
  const isLogin = !!localStorage.getItem("token");

  useEffect(() => {
    
    if (!isLogin && window.location.pathname !== "/register") {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/update/:id" element={<EditForm />} />
      <Route path="/register" element={<Register />} />
      <Route path="/addproduct" element={<AddAdminProduct />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AllRoutes;
