import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showProduct } from "../../redux/productSlice";
import { Link, useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.app);
  console.log({product, loading})

  useEffect(() => {
    dispatch(showProduct());
  }, []);

  if(loading){
    return <p className="text-2xl">...Loading</p>
  }
  console.log("Products is coming or not", product)


  return (
    <>
    <div className="flex space-x-4 justify-evenly ml-7 border border-black">
    <div>
        <p className="text-4xl  font-bold mx-center ml-[45%] text-red-400">
         Admin Dashboard
        </p>
      </div>
      <div className="mt-5 ">
     <Link className="p-3 bg-[#2699fb] text-white hover:bg-teal-600 border border-spacing-1 border-black" to="/addproduct">Add Product</Link>
      </div>
    </div>
      
      <div className="w-[45%]  ml-[25%] mt-[2%] h-auto">
        <p className="text-2xl font-semibold">Product list</p>
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
                  product.map((p, index) => {
                    return (
                      <tr>
                        <td className="text-right">{index + 1}.</td>
                        <td className="text-right">{p.title}</td>
                        <td className="text-right">{p.description}</td>
                        <td className="text-right">{p.price}</td>
                        {/* <td className="text-right">
                        <div className="gap-3">
                          <Link
                            to={`/update/${p._id}`}
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
                      </td> */}
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

export default AdminDashboard;
