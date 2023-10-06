import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
// import axios from "axios";

const Header = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));


  useEffect(() => {
       setIsLogin(!!localStorage.getItem("token"));
  }, []);

  const handleSignout = (e) => {
    
    localStorage.removeItem("token");
    setIsLogin(false)
    navigate("/");
  };
  return (
    <div className="bg-[#2699fb] p-4">
      <div className="max-w-[1240px] items-center py-[16px] flex justify-between  mx-auto">
        <div className="text-3xl font-bold">Tec Mantras</div>

        {toggle ? (
          <AiOutlineClose
            onClick={() => setToggle(!toggle)}
            className="text-white text-2xl md:hidden block"
          />
        ) : (
          <GiHamburgerMenu
            onClick={() => setToggle(!toggle)}
            className="text-white text-3xl md:hidden block"
          />
        )}

        <ul className="hidden md:flex text-white gap-5 ">
          {isLogin ? (
            <>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              {data &&
                data.map((item) => {
                  return (
                    <>
                      <p>{`Welcome ${item.name}`}</p>
                    </>
                  );
                })}
              <li>
                <button onClick={handleSignout}>SignOut</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>

        {/* Responsive Menu */}
        <ul
          className={`md:hidden w-full h-screen text-white fixed bg-black ${
            toggle ? "left-0" : "left-[-100%]"
          } top-[92px]`}
        >
          {isLogin ? (
            <>
              <li className="p-6">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="p-6">
                <button onClick={handleSignout}>SignOut</button>
              </li>
            </>
          ) : (
            <>
              <li className="p-6">
                <Link to="/">Login</Link>
              </li>
              <li className="p-6">
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
