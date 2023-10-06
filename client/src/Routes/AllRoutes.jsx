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

const AllRoutes = () => {
  const isLogin = localStorage.getItem("token");
  const isProtectedRoute = isLogin ? true : false;
  console.log(
    "🚀 ~ file: AllRoutes.jsx:17 ~ AllRoutes ~ isProtectedRoute:",
    isProtectedRoute
  );
  console.log(isProtectedRoute, isLogin);
  return (
    <>
      <Routes>
        <Route path="/" element={isLogin ? <Dashboard /> : <Login />} />
        <Route path="/update/:id" element={<EditForm />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
