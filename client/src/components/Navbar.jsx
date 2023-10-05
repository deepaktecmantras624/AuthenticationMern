import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLogin = !!localStorage.getItem("token");

  const handleSignout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="w-[100%] h-[50px] bg-slate-900 text-center">
      <div className="justify-items-center">
        {isLogin ? (
          <>
            <Link
              className=" hover:bg-[grey] hover:text-[black] text-[white] text-2xl px-2"
              to="/dashboard"
            >
              Dashboard
            </Link>
            {/* <Link
              className="hover:bg-[grey] hover:text-[black]  text-[white] mx-6 text-2xl px-2"
              to="/addfile"
            >
              Add File
            </Link> */}
            <button
              onClick={handleSignout}
              className="btn p-4 gap-7 text-white"
            >
              SignOut
            </button>
          </>
        ) : (
          <>
            <Link
              className="hover:bg-[grey] hover:text-[black] text-[white] mx-6 text-2xl px-2"
              to="/register"
            >
              Register
            </Link>
            <Link
              className="hover:bg-[grey] hover:text-[black] text-[white] mx-6 text-2xl px-2"
              to="/"
            >
              Login
            </Link>
          </>
        )}
      </div>

      {/* <Link style={{color:"white", marginLeft:"50px"}} to="/addfile">Add File</Link> */}
    </div>
  );
};

export default Navbar;
