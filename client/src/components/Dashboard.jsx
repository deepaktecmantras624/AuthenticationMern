import React from "react";
import { useSelector } from "react-redux";


const Dashboard = () => {

  const product=useSelector((state)=>state.app.product)


  return (
    <>
      <div>
        <p className="text-4xl font-bold mx-center ml-[45%] text-red-400">
         User Dashboard
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
                  <th className="text-right">Title</th>
                  <th className="text-right">Description</th>
                  <th className="text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {product &&
                  product.map((item, index) => {
                    return (
                      <tr>
                        <td className="text-right">{index + 1}.</td>
                        <td className="text-right">{item.title}</td>
                        <td className="text-right">{item.description}</td>
                        <td className="text-right">{item.price}</td>
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
