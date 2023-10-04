import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()


  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    axios.get("http://localhost:3001/register").then((res) => {
      console.log(res.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:3001/register", { name, email, password })
      .then(() => {
        alert("Registration Successful")
        // setEmail("");
        // setName("");
        // setPassword("");
        fetchUser()
        navigate("/login")
      })
      .catch((err)=>{
        console.log("Unable to Register User")
      })
  };

  return (
    <div
      className="border-solid rounded-md border-2 mt-7 bg-grey bg-slate-50"
      style={{ width: "30%", marginLeft: "30%" }}
    >
      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
        Register
      </h1>
      <div  className="p-4">
        <form class="text-justify space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Name
            </label>
            <input
              type="text"
              placeholder="Enter your Name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              class="w-full"
            />
          </div>

          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Email
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              class="w-full"
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
              onChange={(e) => setPassword(e.target.value)}
              class="w-full"
            />
          </div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Register
          </button>
          <p>If you're already a user <Link className="hover:bg-[blue] hover:text-[white] border p-3 bg-[grey.500] rounded-lg" to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
