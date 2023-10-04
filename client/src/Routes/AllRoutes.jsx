import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import FileUpload from "../components/FileUpload";
import Login from "../components/Login";
import Register from "../components/Register";

const AllRoutes = () => {
  const isLogin=!!localStorage.getItem("token")
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        
        <Route path="/login" element={<Login />} />
        {isLogin && <Route path="/addfile" element={<FileUpload />} /> }
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
