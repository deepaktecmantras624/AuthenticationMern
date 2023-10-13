import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/userSlice";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(createUser({ name, email, password }))
      .unwrap()
      .then((response) => {
        console.log("Register Successful:", response.error);
        // if (response.error === undefined) {
        //   alert("Registration Successfull");
        //   navigate("/login");
        // }
        alert("Register Successful")
        navigate("/login")
      })
      .catch((error) => {
        console.error("Registration Failed:", error);
        alert("registration Failed");
      });
    }


    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    
    //   try {
    //     await dispatch(createUser({ name, email, password }));
    //     alert("Registration Successful");
    //     navigate("/login");
    //   } catch (error) {
    //     console.error("Registration Failed:", error.message);
    //     alert(error.message); // Display the error message from the rejected promise
    //   }
    // };


    // axios
    //   .post("http://localhost:3001/api/users/register", { name, email, password })
    //   .then(() => {
    //     alert("Registration Successful")

    //     navigate("/")
    //   })
    //   .catch((err)=>{
    //     console.log("Unable to Register User")
    //   })
  // };

  return (
    <div
      className="border-solid rounded-md border-2 mt-7 bg-white p-8 w-full sm:w-96 mx-auto shadow-lg"
      // style={{ width: "30%", marginLeft: "30%" }}
    >
      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
        Register
      </h1>
      <div className="p-4">
        <form
          class="text-justify space-y-4 md:space-y-6"
          onSubmit={handleSubmit}
        >
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
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
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
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
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
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Register
          </button>
          <p>
            If you're already a user{" "}
            <Link
              className="hover:bg-[blue] hover:text-[white] border p-3 bg-[grey.500] rounded-lg"
              to="/login"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
