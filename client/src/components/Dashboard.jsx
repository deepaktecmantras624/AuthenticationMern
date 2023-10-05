import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState([]);


  // Getting the User data
  const fetchUser = () => {
    axios
      .get("http://localhost:3001/api/users/register")
      .then((res) => {
        if (res.status === 200) {
          setData(res.data); // Set data in state
        } else {
          throw new Error("Failed to fetch data");
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };


  // Deleting the User
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:3001/api/users/${id}`)
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

  
  const updateUser = (id, newData) => {
    axios
      .put(`http://localhost:3001/api/users/${id}`, newData)
      .then((res) => {
        console.log("Data Successfully Updated", res.data);
        fetchUser();
      })
      .catch((err) => {
        console.log("User Update failed");
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log("Data:", data);

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
            <table className="table-auto w-full">
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
                            <button className="p-2 border btn btn-warning mr-2 hover:rounded-lg bg-amber-400  text-black">
                              Edit
                            </button>

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
