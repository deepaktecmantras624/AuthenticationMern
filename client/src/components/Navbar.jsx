import React from "react";
import { Link,useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate=useNavigate()
  const isLogin=!!localStorage.getItem("token")

  const handleSignout=()=>{
    localStorage.removeItem("token")
    navigate("/login")
  }
  return (
    <div style={{ width: "100%", height: "50px", textAlign:"center", wordSpacing:"5px", background: "orange"}}>
      <Link className=" bg-orange-500 hover:bg-[white] hover:text-[black] text-[white]"  to="/">Dashboard</Link>

      {isLogin ? (
        <>  
        <Link className=" bg-orange-500 hover:bg-[white] hover:text-[black] text-[white] mx-6 text-[2xl]" to="/addfile">Add File</Link>
        <button onClick={handleSignout} className="btn p-4 gap-7 text-white">SignOut</button>
        </>
      ): (
        <>
      <Link className=" bg-orange-500 hover:bg-[white] hover:text-[black] text-[white] mx-6" to="/register">Register</Link>
      <Link className=" bg-orange-500 hover:bg-[white] hover:text-[black] text-[white] mx-6" to="/login">Login</Link>
        </>
      )}
      {/* <Link style={{color:"white", marginLeft:"50px"}} to="/addfile">Add File</Link> */}
    </div>
  );
};

export default Navbar;
