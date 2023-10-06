import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // useEffect(()=>{
  //   fetchUser()
  // },[])

  // const fetchUser = () => {
  //   axios.get("http://localhost:3001/api/users/register").then((res) => {
  //     console.log(res.data);
  //   });
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/users/login", {
        email,
        password,
      });
      
      const token = response.data.token
      // console.log(`Token:${token}`)
      // const loginId=response.data.token.userName
      // console.log(loginId)
      // console.log(token)
      localStorage.setItem("token", token);
      // fetchUser(token)
      alert("Login successful");
      navigate("/");
      // localStorage.setItem("loginId",loginId)
      
    } catch (error) {
      console.log("Login Error");
    }
  };

  // const isLoggedIn=!!localStorage.getItem("token")

  // {isLoggedIn && }

  return (
    <div
      className="border-solid rounded-md border-2 mt-7 bg-grey bg-slate-50"
      style={{ width: "30%", marginLeft: "30%" }}
    >
      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
        Login
      </h1>
      <div className="p-4" >
        <form
          class="text-justify space-y-4 md:space-y-6"
          onSubmit={handleLogin}
        >
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Email
            </label>
            <input
              class="w-full"
              type="email"
              placeholder="Enter your Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              class="w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Login
          </button>
          <p>If you're new <Link className="hover:bg-[blue] hover:text-[white] border p-3 bg-[grey.500] rounded-lg" to="/register">Register</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
