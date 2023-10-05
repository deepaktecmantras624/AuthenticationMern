import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import Register from "../components/Register";
import EditForm from "../components/EditForm";

const AllRoutes = () => {
  const isLogin=!!localStorage.getItem("token")
  return (
    <div>
      <Routes>
        {isLogin && <Route path="/dashboard" element={<Dashboard />} />}
        
        
        <Route path="/" element={<Login />} />
        {/* {isLogin && <Route path="/addfile" element={<FileUpload />} /> } */}
        <Route path="/register" element={<Register />} />
        <Route path="/update/:id" element={<EditForm />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
