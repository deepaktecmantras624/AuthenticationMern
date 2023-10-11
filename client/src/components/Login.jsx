import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/userSlice";
// import { showProduct } from "../redux/productSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    // e.preventDefault();
    dispatch(loginUser({ email, password }));
    alert("Login Successful");
    navigate("/");
  };

  return (
    <div
      className="border-solid rounded-md border-2 mt-7 bg-white p-8 w-full sm:w-96 mx-auto shadow-lg"
      // style={{ width: "30%", marginLeft: "30%" }}
    >
      <h1 class="text-2xl font-bold mb-4 text-center text-gray-800">Login</h1>
      <div className="p-4 mx-auto">
        <form
          class="text-justify space-y-4  md:space-y-6"
          onSubmit={handleLogin}
        >
          <div>
            <label for="email" class="block text-sm font-medium text-gray-600">
              Your Email
            </label>
            <input
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="email"
              placeholder="Enter your Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-600"
            >
              Your Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
            
          >
            Login
          </button>
          <p className="text-center">
            {" "}
            If you're new{" "}
            <Link
              className="hover:bg-[blue] hover:text-[white] border p-3 bg-[grey.500] rounded-lg"
              to="/register"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
