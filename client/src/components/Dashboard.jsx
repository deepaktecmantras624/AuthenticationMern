import axios from "axios";
// import axiosInstance from "./Axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import EditForm from "./EditForm";

const Dashboard = () => {
  const [data, setData] = useState([]);

  // Getting the User data
  const fetchUser = () => {
    const token=localStorage.getItem("token")
    console.log(token)
    
    axios
      .get("http://localhost:3001/api/users",{
        headers:{
          Authorization:`${token}`,
        }
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setData(res.data);
          
          throw new Error("Failed to fetch data");
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  // Deleting the User
  const deleteUser = (id) => {
    const token=localStorage.getItem("token")
    axios
      .delete(`http://localhost:3001/api/users/${id}`,{
        headers:{
          Authorization:`${token}`,
        }
      })
      .then((res) => {
        if (res.data) {
          window.confirm("Are you sure to delete");
        }
        console.log(res.data);
        fetchUser(data);
      })
      .catch((error) => {
        console.error("Error in Deletion", error);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div>
        <p className="text-4xl font-bold mx-center ml-[45%] text-red-400">
          Dashboard
        </p>
      </div>
      <div className="w-[45%]  ml-[25%] mt-[2%] h-auto">
        <p className="text-2xl font-semibold ">User list</p>
        <br />

        <div className="justify-center items-center h-screen">
          <div className="bg-gray-200 p-8 rounded-lg">
            <table className="table-auto w-full md:table-fixed">
              <thead>
                <tr>
                  <th className="text-right">S.No.</th>
                  <th className="text-right">Name</th>
                  <th className="text-right">Email</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((user, index) => {
                    return (
                      <tr>
                        <td className="text-right">{index + 1}.</td>
                        <td className="text-right">{user.name}</td>
                        <td className="text-right">{user.email}</td>
                        <td className="text-right">
                          <div className="gap-3">
                            <Link
                              to={`/update/${user._id}`}
                              className="p-2 border mr-2 hover:rounded-lg bg-amber-400  text-black"
                            >
                              Edit
                            </Link>

                            <button
                              onClick={() => deleteUser(user._id)}
                              className="border hover:rounded-lg bg-red-600 p-2 text-white"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
